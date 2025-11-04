"""
SEO Dashboard API Server
Servidor local para conectar con Google Search Console y Analytics
SOLO para uso local - NO exponerlo a internet
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime, timedelta
import os

# Intentar importar las librerías de Google
try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    GOOGLE_LIBS_AVAILABLE = True
except ImportError:
    GOOGLE_LIBS_AVAILABLE = False
    print("⚠️ Librerías de Google no instaladas. Instala con: pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client")

app = Flask(__name__)
CORS(app)  # Permitir CORS para localhost

# Configuración
CONFIG_FILE = 'config.json'

def load_config():
    """Cargar configuración desde archivo"""
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, 'r') as f:
            return json.load(f)
    return None

def save_config(config):
    """Guardar configuración en archivo"""
    with open(CONFIG_FILE, 'w') as f:
        json.dump(config, f, indent=2)

def get_search_console_service(credentials_json):
    """Crear servicio de Search Console"""
    if not GOOGLE_LIBS_AVAILABLE:
        return None
    
    credentials_dict = json.loads(credentials_json)
    credentials = service_account.Credentials.from_service_account_info(
        credentials_dict,
        scopes=['https://www.googleapis.com/auth/webmasters.readonly']
    )
    
    service = build('searchconsole', 'v1', credentials=credentials)
    return service

def get_analytics_service(credentials_json):
    """Crear servicio de Analytics"""
    if not GOOGLE_LIBS_AVAILABLE:
        return None
    
    credentials_dict = json.loads(credentials_json)
    credentials = service_account.Credentials.from_service_account_info(
        credentials_dict,
        scopes=['https://www.googleapis.com/auth/analytics.readonly']
    )
    
    service = build('analyticsdata', 'v1beta', credentials=credentials)
    return service

@app.route('/api/health', methods=['GET'])
def health_check():
    """Verificar que el servidor está funcionando"""
    return jsonify({
        'status': 'ok',
        'google_libs': GOOGLE_LIBS_AVAILABLE,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/config', methods=['GET', 'POST'])
def config():
    """Obtener o guardar configuración"""
    if request.method == 'GET':
        config = load_config()
        return jsonify(config if config else {})
    
    elif request.method == 'POST':
        config = request.json
        save_config(config)
        return jsonify({'status': 'success', 'message': 'Configuración guardada'})

@app.route('/api/save-config', methods=['POST'])
def save_config_endpoint():
    """Guardar configuración desde el dashboard"""
    try:
        config = request.json
        save_config(config)
        return jsonify({'status': 'success', 'message': 'Configuración guardada en config.json'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/search-console/query', methods=['POST'])
def search_console_query():
    """Obtener datos de Search Console"""
    if not GOOGLE_LIBS_AVAILABLE:
        return jsonify({
            'error': 'Google libraries not installed',
            'message': 'Instala: pip install google-auth google-api-python-client'
        }), 500
    
    try:
        data = request.json
        property_url = data.get('property_url')
        credentials_json = data.get('credentials')
        start_date = data.get('start_date', (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d'))
        end_date = data.get('end_date', datetime.now().strftime('%Y-%m-%d'))
        
        # Crear servicio
        service = get_search_console_service(credentials_json)
        
        # Query Search Console
        request_body = {
            'startDate': start_date,
            'endDate': end_date,
            'dimensions': ['query'],
            'rowLimit': 25,
            'aggregationType': 'auto'
        }
        
        response = service.searchanalytics().query(
            siteUrl=property_url,
            body=request_body
        ).execute()
        
        # Procesar resultados
        keywords = []
        for row in response.get('rows', []):
            keywords.append({
                'keyword': row['keys'][0],
                'impressions': row.get('impressions', 0),
                'clicks': row.get('clicks', 0),
                'ctr': round(row.get('ctr', 0) * 100, 2),
                'position': round(row.get('position', 0), 1)
            })
        
        # Obtener datos agregados
        request_body_summary = {
            'startDate': start_date,
            'endDate': end_date,
            'aggregationType': 'auto'
        }
        
        summary_response = service.searchanalytics().query(
            siteUrl=property_url,
            body=request_body_summary
        ).execute()
        
        summary = summary_response.get('rows', [{}])[0] if summary_response.get('rows') else {}
        
        return jsonify({
            'summary': {
                'impressions': summary.get('impressions', 0),
                'clicks': summary.get('clicks', 0),
                'ctr': round(summary.get('ctr', 0) * 100, 2) if summary.get('ctr') else 0,
                'position': round(summary.get('position', 0), 1) if summary.get('position') else 0
            },
            'keywords': keywords,
            'period': {
                'start_date': start_date,
                'end_date': end_date
            }
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Error al consultar Search Console'
        }), 500

@app.route('/api/search-console/trend', methods=['POST'])
def search_console_trend():
    """Obtener tendencia de los últimos 7 días"""
    if not GOOGLE_LIBS_AVAILABLE:
        return jsonify({
            'error': 'Google libraries not installed'
        }), 500
    
    try:
        data = request.json
        property_url = data.get('property_url')
        credentials_json = data.get('credentials')
        
        service = get_search_console_service(credentials_json)
        
        # Obtener datos día por día
        trend_data = []
        for i in range(7, 0, -1):
            date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
            
            request_body = {
                'startDate': date,
                'endDate': date,
                'aggregationType': 'auto'
            }
            
            response = service.searchanalytics().query(
                siteUrl=property_url,
                body=request_body
            ).execute()
            
            row = response.get('rows', [{}])[0] if response.get('rows') else {}
            
            trend_data.append({
                'date': date,
                'impressions': row.get('impressions', 0),
                'clicks': row.get('clicks', 0),
                'ctr': round(row.get('ctr', 0) * 100, 2) if row.get('ctr') else 0,
                'position': round(row.get('position', 0), 1) if row.get('position') else 0
            })
        
        return jsonify({'trend': trend_data})
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Error al obtener tendencia'
        }), 500

@app.route('/api/analytics/overview', methods=['POST'])
def analytics_overview():
    """Obtener resumen de Google Analytics"""
    if not GOOGLE_LIBS_AVAILABLE:
        return jsonify({
            'error': 'Google libraries not installed'
        }), 500
    
    try:
        data = request.json
        property_id = data.get('property_id')
        credentials_json = data.get('credentials')
        
        service = get_analytics_service(credentials_json)
        
        # Query Analytics Data API
        request_body = {
            'dateRanges': [{'startDate': '7daysAgo', 'endDate': 'today'}],
            'metrics': [
                {'name': 'sessions'},
                {'name': 'totalUsers'},
                {'name': 'bounceRate'},
                {'name': 'averageSessionDuration'}
            ],
            'dimensions': [{'name': 'date'}]
        }
        
        response = service.properties().runReport(
            property=f'properties/{property_id}',
            body=request_body
        ).execute()
        
        return jsonify({
            'response': response,
            'message': 'Datos de Analytics obtenidos'
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Error al consultar Analytics'
        }), 500

@app.route('/api/test-connection', methods=['POST'])
def test_connection():
    """Probar conexión con las APIs"""
    if not GOOGLE_LIBS_AVAILABLE:
        return jsonify({
            'status': 'error',
            'message': 'Librerías de Google no instaladas',
            'google_libs': False
        }), 500
    
    try:
        data = request.json
        credentials_json = data.get('credentials')
        property_url = data.get('property_url')
        
        # Intentar crear servicio
        service = get_search_console_service(credentials_json)
        
        # Hacer una query simple
        request_body = {
            'startDate': (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d'),
            'endDate': datetime.now().strftime('%Y-%m-%d'),
            'aggregationType': 'auto',
            'rowLimit': 1
        }
        
        response = service.searchanalytics().query(
            siteUrl=property_url,
            body=request_body
        ).execute()
        
        return jsonify({
            'status': 'success',
            'message': 'Conexión exitosa con Google Search Console',
            'has_data': len(response.get('rows', [])) > 0
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error al conectar: {str(e)}'
        }), 500

@app.route('/api/mock-data', methods=['GET'])
def mock_data():
    """Generar datos de prueba (para desarrollo)"""
    import random
    
    # Generar keywords de ejemplo
    keywords_examples = [
        'desarrollo de software fintech Santiago',
        'web scraping selenium Chile',
        'desarrollo a medida Ruby Santiago',
        'metabase Chile',
        'data engineering Chile',
        'proptech Chile',
        'AWS Chile',
        'Azure Chile',
        'desarrolladores ruby Santiago',
        'automatización RPA Chile'
    ]
    
    keywords = []
    for kw in keywords_examples[:10]:
        keywords.append({
            'keyword': kw,
            'position': random.randint(5, 25),
            'impressions': random.randint(100, 500),
            'clicks': random.randint(5, 30),
            'ctr': round(random.uniform(1.5, 4.0), 2),
            'trend': random.choice(['up', 'down', 'neutral'])
        })
    
    # Generar tendencia
    trend = []
    for i in range(7, 0, -1):
        date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
        base_impressions = 400
        trend.append({
            'date': date,
            'impressions': base_impressions + random.randint(-50, 100),
            'clicks': random.randint(15, 35),
            'ctr': round(random.uniform(2.0, 4.0), 2),
            'position': round(random.uniform(8.0, 15.0), 1)
        })
    
    # Resumen
    summary = {
        'impressions': sum([k['impressions'] for k in keywords]),
        'clicks': sum([k['clicks'] for k in keywords]),
        'ctr': round(sum([k['clicks'] for k in keywords]) / sum([k['impressions'] for k in keywords]) * 100, 2),
        'position': round(sum([k['position'] for k in keywords]) / len(keywords), 1)
    }
    
    return jsonify({
        'summary': summary,
        'keywords': keywords,
        'trend': trend,
        'timestamp': datetime.now().isoformat(),
        'note': 'Estos son datos de ejemplo. Configura tus APIs para ver datos reales.'
    })

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 SEO Dashboard API Server")
    print("=" * 60)
    print(f"✅ Servidor iniciado en: http://localhost:5000")
    print(f"📊 Dashboard: Abre seo-dashboard/index.html en tu navegador")
    print(f"🔒 Solo accesible desde localhost (seguro)")
    
    if not GOOGLE_LIBS_AVAILABLE:
        print("\n⚠️  ADVERTENCIA:")
        print("    Librerías de Google no instaladas.")
        print("    Instala con:")
        print("    pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client flask flask-cors")
        print("\n    Por ahora puedes usar datos de ejemplo en: http://localhost:5000/api/mock-data")
    
    print("\n" + "=" * 60)
    print("Presiona Ctrl+C para detener el servidor")
    print("=" * 60 + "\n")
    
    app.run(debug=True, host='127.0.0.1', port=5000)
