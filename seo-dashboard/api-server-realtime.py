"""
API Server para actualizar datos en tiempo real desde Google APIs
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build
import requests

app = Flask(__name__)
CORS(app)  # Permitir CORS para que el dashboard pueda hacer fetch

# Cargar configuración
def load_config():
    config_path = 'config/config.json'
    if os.path.exists(config_path):
        with open(config_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    else:
        print("⚠️  config/config.json no encontrado")
        return None

# Crear credenciales de Google
def get_google_credentials(config):
    if not config or 'serviceAccountJson' not in config:
        return None
    
    credentials = service_account.Credentials.from_service_account_info(
        config['serviceAccountJson'],
        scopes=['https://www.googleapis.com/auth/webmasters.readonly']
    )
    return credentials

# ============================================
# ENDPOINT: Actualizar datos de Search Console
# ============================================
@app.route('/api/update-search-console', methods=['POST'])
def update_search_console():
    try:
        print("\n🔄 Actualizando datos de Google Search Console...")
        
        config = load_config()
        if not config:
            return jsonify({
                'success': False,
                'error': 'Configuración no encontrada. Ejecuta: python scripts/crear-config.py'
            }), 400
        
        credentials = get_google_credentials(config)
        if not credentials:
            return jsonify({
                'success': False,
                'error': 'Credenciales inválidas'
            }), 400
        
        # Crear servicio de Search Console
        service = build('searchconsole', 'v1', credentials=credentials)
        
        # Configurar fechas (últimos 90 días)
        end_date = datetime.now()
        start_date = end_date - timedelta(days=90)
        
        # Solicitar datos
        request_body = {
            'startDate': start_date.strftime('%Y-%m-%d'),
            'endDate': end_date.strftime('%Y-%m-%d'),
            'dimensions': ['query', 'page', 'device', 'country'],
            'rowLimit': 25000,
            'startRow': 0
        }
        
        print(f"📅 Período: {start_date.strftime('%Y-%m-%d')} a {end_date.strftime('%Y-%m-%d')}")
        
        response = service.searchanalytics().query(
            siteUrl=config['propertyUrl'],
            body=request_body
        ).execute()
        
        # Procesar resultados
        keywords = []
        if 'rows' in response:
            for row in response['rows']:
                keyword_data = {
                    'keyword': row['keys'][0],
                    'page': row['keys'][1] if len(row['keys']) > 1 else config['propertyUrl'],
                    'device': row['keys'][2] if len(row['keys']) > 2 else 'DESKTOP',
                    'country': row['keys'][3] if len(row['keys']) > 3 else 'all',
                    'clicks': row['clicks'],
                    'impressions': row['impressions'],
                    'ctr': round(row['ctr'] * 100, 2),
                    'position': round(row['position'], 1)
                }
                keywords.append(keyword_data)
        
        # Guardar en JSON
        output_data = {
            'keywords': keywords,
            'metadata': {
                'lastUpdate': datetime.now().isoformat(),
                'period': {
                    'start': start_date.strftime('%Y-%m-%d'),
                    'end': end_date.strftime('%Y-%m-%d')
                },
                'totalKeywords': len(keywords)
            }
        }
        
        with open('keywords-database.json', 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ {len(keywords)} keywords guardadas en keywords-database.json")
        
        return jsonify({
            'success': True,
            'message': f'Datos actualizados: {len(keywords)} keywords',
            'data': output_data,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============================================
# ENDPOINT: Actualizar datos de PageSpeed Insights
# ============================================
@app.route('/api/update-pagespeed', methods=['POST'])
def update_pagespeed():
    try:
        print("\n🔄 Actualizando datos de PageSpeed Insights...")
        
        data = request.get_json()
        url = data.get('url', 'https://justdev.it')
        api_key = data.get('apiKey', '')  # Opcional
        
        opportunities = []
        
        # Analizar mobile
        print(f"📱 Analizando versión móvil de {url}...")
        mobile_url = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&strategy=mobile"
        if api_key:
            mobile_url += f"&key={api_key}"
        
        mobile_response = requests.get(mobile_url, timeout=60)
        if mobile_response.status_code == 200:
            mobile_data = mobile_response.json()
            lighthouse_result = mobile_data.get('lighthouseResult', {})
            audits = lighthouse_result.get('audits', {})
            
            # Extraer oportunidades de mejora
            for audit_key, audit_data in audits.items():
                if audit_data.get('score') is not None and audit_data.get('score') < 0.9:
                    if audit_data.get('details', {}).get('type') == 'opportunity':
                        opportunity = {
                            'id': audit_key,
                            'title': audit_data.get('title', ''),
                            'description': audit_data.get('description', ''),
                            'savings': audit_data.get('displayValue', ''),
                            'impact': 'high' if audit_data.get('score', 1) < 0.5 else 'medium',
                            'device': 'mobile'
                        }
                        opportunities.append(opportunity)
        
        # Analizar desktop
        print(f"🖥️  Analizando versión desktop de {url}...")
        desktop_url = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&strategy=desktop"
        if api_key:
            desktop_url += f"&key={api_key}"
        
        desktop_response = requests.get(desktop_url, timeout=60)
        if desktop_response.status_code == 200:
            desktop_data = desktop_response.json()
            lighthouse_result = desktop_data.get('lighthouseResult', {})
            audits = lighthouse_result.get('audits', {})
            
            for audit_key, audit_data in audits.items():
                if audit_data.get('score') is not None and audit_data.get('score') < 0.9:
                    if audit_data.get('details', {}).get('type') == 'opportunity':
                        # Evitar duplicados
                        if not any(o['id'] == audit_key and o['device'] == 'desktop' for o in opportunities):
                            opportunity = {
                                'id': audit_key,
                                'title': audit_data.get('title', ''),
                                'description': audit_data.get('description', ''),
                                'savings': audit_data.get('displayValue', ''),
                                'impact': 'high' if audit_data.get('score', 1) < 0.5 else 'medium',
                                'device': 'desktop'
                            }
                            opportunities.append(opportunity)
        
        # Guardar en JSON
        output_data = {
            'opportunities': opportunities,
            'metadata': {
                'lastUpdate': datetime.now().isoformat(),
                'url': url,
                'totalOpportunities': len(opportunities)
            }
        }
        
        # Crear directorio data si no existe
        os.makedirs('data', exist_ok=True)
        
        with open('data/performance-opportunities.json', 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ {len(opportunities)} oportunidades guardadas en data/performance-opportunities.json")
        
        return jsonify({
            'success': True,
            'message': f'Datos actualizados: {len(opportunities)} oportunidades',
            'data': output_data,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============================================
# ENDPOINT: Estado del servidor
# ============================================
@app.route('/api/status', methods=['GET'])
def status():
    config = load_config()
    return jsonify({
        'status': 'online',
        'timestamp': datetime.now().isoformat(),
        'config_loaded': config is not None,
        'endpoints': {
            'search_console': '/api/update-search-console',
            'pagespeed': '/api/update-pagespeed',
            'status': '/api/status'
        }
    })

# ============================================
# ENDPOINT: Obtener datos actuales
# ============================================
@app.route('/api/get-keywords', methods=['GET'])
def get_keywords():
    try:
        if os.path.exists('keywords-database.json'):
            with open('keywords-database.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
            return jsonify({
                'success': True,
                'data': data
            })
        else:
            return jsonify({
                'success': False,
                'error': 'No hay datos disponibles. Actualiza primero.'
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/get-performance', methods=['GET'])
def get_performance():
    try:
        if os.path.exists('data/performance-opportunities.json'):
            with open('data/performance-opportunities.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
            return jsonify({
                'success': True,
                'data': data
            })
        else:
            return jsonify({
                'success': False,
                'error': 'No hay datos disponibles. Actualiza primero.'
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 API SERVER - SEO Dashboard")
    print("="*60)
    print("\n📡 Endpoints disponibles:")
    print("   • POST /api/update-search-console - Actualizar datos de Search Console")
    print("   • POST /api/update-pagespeed - Actualizar datos de PageSpeed")
    print("   • GET  /api/get-keywords - Obtener keywords actuales")
    print("   • GET  /api/get-performance - Obtener datos de performance")
    print("   • GET  /api/status - Estado del servidor")
    print("\n🌍 Servidor corriendo en: http://localhost:5000")
    print("="*60 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
