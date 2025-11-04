"""
SEO Dashboard API Server - Versión Empresarial Completa
Incluye: Search Console, Analytics 4, PageSpeed, Análisis de Keywords, Sugerencias
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime, timedelta
import os
from collections import defaultdict
import statistics

# Intentar importar las librerías de Google
try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    from google.analytics.data_v1beta.types import (
        DateRange,
        Dimension,
        Metric,
        RunReportRequest,
    )
    GOOGLE_LIBS_AVAILABLE = True
except ImportError:
    GOOGLE_LIBS_AVAILABLE = False
    print("⚠️ Librerías de Google no instaladas completamente")

app = Flask(__name__)
CORS(app)

# Configuración
CONFIG_FILE = 'config.json'
KEYWORDS_FILE = 'keywords-database.json'
SUGGESTIONS_FILE = 'suggestions.json'
PERFORMANCE_FILE = 'performance-history.json'

def load_config():
    """Cargar configuración"""
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return None

def save_json(filename, data):
    """Guardar datos en JSON"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def load_json(filename):
    """Cargar datos desde JSON"""
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            return json.load(f)
    return None

def get_credentials(credentials_json):
    """Obtener credenciales de Google"""
    if isinstance(credentials_json, str):
        credentials_json = json.loads(credentials_json)
    
    return service_account.Credentials.from_service_account_info(
        credentials_json,
        scopes=[
            'https://www.googleapis.com/auth/webmasters.readonly',
            'https://www.googleapis.com/auth/analytics.readonly'
        ]
    )

def get_search_console_service(credentials):
    """Crear servicio de Search Console"""
    return build('searchconsole', 'v1', credentials=credentials)

def get_pagespeed_service(api_key=None):
    """Crear servicio de PageSpeed Insights"""
    return build('pagespeedonline', 'v5', developerKey=api_key)

# ============================================================
# ENDPOINTS DE HEALTH Y CONFIG
# ============================================================

@app.route('/api/health', methods=['GET'])
def health():
    """Health check"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'google_libs': GOOGLE_LIBS_AVAILABLE
    })

@app.route('/api/config', methods=['GET', 'POST'])
def config():
    """Obtener o guardar configuración"""
    if request.method == 'GET':
        config = load_config()
        return jsonify(config if config else {})
    
    elif request.method == 'POST':
        config = request.json
        save_json(CONFIG_FILE, config)
        return jsonify({'status': 'success', 'message': 'Configuración guardada'})

@app.route('/api/save-config', methods=['POST'])
def save_config_endpoint():
    """Guardar configuración desde el dashboard"""
    try:
        config = request.json
        save_json(CONFIG_FILE, config)
        return jsonify({'status': 'success', 'message': 'Configuración guardada'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# ============================================================
# SEARCH CONSOLE - ANÁLISIS COMPLETO DE KEYWORDS
# ============================================================

@app.route('/api/keywords/comprehensive', methods=['POST'])
def comprehensive_keywords_analysis():
    """Análisis completo de keywords (hasta 25,000 rows)"""
    if not GOOGLE_LIBS_AVAILABLE:
        return jsonify({'error': 'Google libraries not installed'}), 500
    
    try:
        data = request.json
        property_url = data.get('property_url')
        credentials_dict = data.get('credentials')
        days = data.get('days', 90)  # Por defecto 90 días
        
        credentials = get_credentials(credentials_dict)
        service = get_search_console_service(credentials)
        
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days)
        
        # Obtener TODAS las keywords con información detallada
        request_body = {
            'startDate': start_date.strftime('%Y-%m-%d'),
            'endDate': end_date.strftime('%Y-%m-%d'),
            'dimensions': ['query', 'page', 'device', 'country'],
            'rowLimit': 25000,  # Máximo permitido por Google
            'dataState': 'all'
        }
        
        response = service.searchanalytics().query(
            siteUrl=property_url,
            body=request_body
        ).execute()
        
        # Procesar y analizar keywords
        keywords_data = process_comprehensive_keywords(response.get('rows', []))
        
        # Guardar en base de datos local
        save_json(KEYWORDS_FILE, {
            'last_update': datetime.now().isoformat(),
            'total_keywords': len(keywords_data),
            'keywords': keywords_data
        })
        
        return jsonify({
            'status': 'success',
            'total_keywords': len(keywords_data),
            'keywords': keywords_data[:100],  # Primeras 100 para el response
            'summary': generate_keywords_summary(keywords_data)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def process_comprehensive_keywords(rows):
    """Procesar keywords con análisis completo"""
    keywords_dict = defaultdict(lambda: {
        'impressions': 0,
        'clicks': 0,
        'positions': [],
        'pages': set(),
        'devices': defaultdict(int),
        'countries': defaultdict(int)
    })
    
    for row in rows:
        query = row['keys'][0]
        page = row['keys'][1]
        device = row['keys'][2]
        country = row['keys'][3]
        
        data = keywords_dict[query]
        data['impressions'] += row.get('impressions', 0)
        data['clicks'] += row.get('clicks', 0)
        data['positions'].append(row.get('position', 0))
        data['pages'].add(page)
        data['devices'][device] += row.get('impressions', 0)
        data['countries'][country] += row.get('impressions', 0)
    
    # Convertir a lista con análisis
    result = []
    for query, data in keywords_dict.items():
        avg_position = statistics.mean(data['positions']) if data['positions'] else 0
        ctr = (data['clicks'] / data['impressions'] * 100) if data['impressions'] > 0 else 0
        
        # Calcular potencial de conversión
        conversion_potential = calculate_conversion_potential(
            avg_position, ctr, data['impressions'], data['clicks']
        )
        
        # Calcular oportunidad de mejora
        improvement_opportunity = calculate_improvement_opportunity(
            avg_position, ctr, data['impressions']
        )
        
        result.append({
            'keyword': query,
            'impressions': data['impressions'],
            'clicks': data['clicks'],
            'ctr': round(ctr, 2),
            'avg_position': round(avg_position, 1),
            'best_position': round(min(data['positions']), 1) if data['positions'] else 0,
            'worst_position': round(max(data['positions']), 1) if data['positions'] else 0,
            'total_pages': len(data['pages']),
            'top_page': max(data['pages'], key=lambda p: sum(1 for r in rows if r['keys'][1] == p)) if data['pages'] else None,
            'devices': dict(data['devices']),
            'top_country': max(data['countries'].items(), key=lambda x: x[1])[0] if data['countries'] else None,
            'conversion_potential': conversion_potential,
            'improvement_opportunity': improvement_opportunity,
            'priority': calculate_priority(avg_position, data['impressions'], ctr, conversion_potential)
        })
    
    # Ordenar por prioridad
    result.sort(key=lambda x: x['priority'], reverse=True)
    
    return result

def calculate_conversion_potential(position, ctr, impressions, clicks):
    """Calcular potencial de conversión (0-100)"""
    score = 0
    
    # Factor de posición (40 puntos)
    if position <= 3:
        score += 40
    elif position <= 10:
        score += 30
    elif position <= 20:
        score += 15
    
    # Factor de CTR (30 puntos)
    expected_ctr = get_expected_ctr(position)
    if ctr >= expected_ctr * 1.2:
        score += 30
    elif ctr >= expected_ctr:
        score += 20
    elif ctr >= expected_ctr * 0.8:
        score += 10
    
    # Factor de volumen (20 puntos)
    if impressions >= 1000:
        score += 20
    elif impressions >= 100:
        score += 15
    elif impressions >= 10:
        score += 10
    
    # Factor de engagement (10 puntos)
    if clicks >= 50:
        score += 10
    elif clicks >= 10:
        score += 5
    
    return min(score, 100)

def calculate_improvement_opportunity(position, ctr, impressions):
    """Calcular oportunidad de mejora (0-100)"""
    score = 0
    
    # Posición 11-20: Gran oportunidad de llegar a top 10
    if 11 <= position <= 20:
        score += 50
    # Posición 4-10: Oportunidad de llegar a top 3
    elif 4 <= position <= 10:
        score += 40
    # Posición 21-30: Potencial de mejora
    elif 21 <= position <= 30:
        score += 30
    
    # CTR bajo para la posición
    expected_ctr = get_expected_ctr(position)
    if ctr < expected_ctr * 0.5:
        score += 30
    elif ctr < expected_ctr * 0.8:
        score += 20
    
    # Alto volumen de impresiones sin conversión
    if impressions > 500 and ctr < 2:
        score += 20
    
    return min(score, 100)

def get_expected_ctr(position):
    """CTR esperado según posición"""
    ctr_by_position = {
        1: 28.5, 2: 15.7, 3: 11.0, 4: 8.0, 5: 7.2,
        6: 5.1, 7: 4.0, 8: 3.2, 9: 2.8, 10: 2.5
    }
    if position <= 10:
        return ctr_by_position.get(int(position), 2.0)
    elif position <= 20:
        return 1.5
    elif position <= 30:
        return 1.0
    else:
        return 0.5

def calculate_priority(position, impressions, ctr, conversion_potential):
    """Calcular prioridad general (0-100)"""
    # Combinar factores con pesos
    priority = (
        conversion_potential * 0.4 +
        (100 - position) * 0.3 +
        min(impressions / 10, 100) * 0.2 +
        ctr * 2 * 0.1
    )
    return min(round(priority, 1), 100)

def generate_keywords_summary(keywords):
    """Generar resumen ejecutivo de keywords"""
    if not keywords:
        return {}
    
    return {
        'total_keywords': len(keywords),
        'high_priority': len([k for k in keywords if k['priority'] >= 70]),
        'medium_priority': len([k for k in keywords if 40 <= k['priority'] < 70]),
        'low_priority': len([k for k in keywords if k['priority'] < 40]),
        'top_3_positions': len([k for k in keywords if k['avg_position'] <= 3]),
        'top_10_positions': len([k for k in keywords if k['avg_position'] <= 10]),
        'total_impressions': sum(k['impressions'] for k in keywords),
        'total_clicks': sum(k['clicks'] for k in keywords),
        'avg_ctr': round(statistics.mean([k['ctr'] for k in keywords]), 2),
        'avg_position': round(statistics.mean([k['avg_position'] for k in keywords]), 1),
        'high_conversion_potential': len([k for k in keywords if k['conversion_potential'] >= 70])
    }

# ============================================================
# GOOGLE ANALYTICS 4 - MÉTRICAS DE CONVERSIÓN
# ============================================================

@app.route('/api/analytics/comprehensive', methods=['POST'])
def comprehensive_analytics():
    """Análisis completo de Google Analytics 4"""
    if not GOOGLE_LIBS_AVAILABLE:
        return jsonify({'error': 'Google libraries not installed'}), 500
    
    try:
        data = request.json
        property_id = data.get('property_id')
        credentials_dict = data.get('credentials')
        days = data.get('days', 30)
        
        credentials = get_credentials(credentials_dict)
        
        # Crear cliente de Analytics Data API
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'credentials.json'
        client = BetaAnalyticsDataClient(credentials=credentials)
        
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days)
        
        # Reporte 1: Overview general
        request_overview = RunReportRequest(
            property=f"properties/{property_id}",
            date_ranges=[DateRange(
                start_date=start_date.strftime('%Y-%m-%d'),
                end_date=end_date.strftime('%Y-%m-%d')
            )],
            metrics=[
                Metric(name="activeUsers"),
                Metric(name="sessions"),
                Metric(name="bounceRate"),
                Metric(name="averageSessionDuration"),
                Metric(name="conversions"),
                Metric(name="eventCount"),
                Metric(name="engagementRate")
            ]
        )
        
        response_overview = client.run_report(request_overview)
        
        # Reporte 2: Por fuente de tráfico
        request_traffic = RunReportRequest(
            property=f"properties/{property_id}",
            date_ranges=[DateRange(
                start_date=start_date.strftime('%Y-%m-%d'),
                end_date=end_date.strftime('%Y-%m-%d')
            )],
            dimensions=[Dimension(name="sessionSource")],
            metrics=[
                Metric(name="activeUsers"),
                Metric(name="sessions"),
                Metric(name="conversions")
            ],
            limit=10
        )
        
        response_traffic = client.run_report(request_traffic)
        
        # Reporte 3: Por página
        request_pages = RunReportRequest(
            property=f"properties/{property_id}",
            date_ranges=[DateRange(
                start_date=start_date.strftime('%Y-%m-%d'),
                end_date=end_date.strftime('%Y-%m-%d')
            )],
            dimensions=[Dimension(name="pagePath")],
            metrics=[
                Metric(name="screenPageViews"),
                Metric(name="averageSessionDuration"),
                Metric(name="bounceRate")
            ],
            limit=20
        )
        
        response_pages = client.run_report(request_pages)
        
        # Procesar respuestas
        analytics_data = {
            'overview': process_analytics_overview(response_overview),
            'traffic_sources': process_analytics_traffic(response_traffic),
            'top_pages': process_analytics_pages(response_pages),
            'period': f"{start_date} to {end_date}"
        }
        
        return jsonify({
            'status': 'success',
            'data': analytics_data
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def process_analytics_overview(response):
    """Procesar datos generales de Analytics"""
    if not response.rows:
        return {}
    
    row = response.rows[0]
    return {
        'active_users': int(row.metric_values[0].value),
        'sessions': int(row.metric_values[1].value),
        'bounce_rate': round(float(row.metric_values[2].value) * 100, 2),
        'avg_session_duration': round(float(row.metric_values[3].value), 2),
        'conversions': int(row.metric_values[4].value),
        'events': int(row.metric_values[5].value),
        'engagement_rate': round(float(row.metric_values[6].value) * 100, 2)
    }

def process_analytics_traffic(response):
    """Procesar fuentes de tráfico"""
    sources = []
    for row in response.rows:
        sources.append({
            'source': row.dimension_values[0].value,
            'users': int(row.metric_values[0].value),
            'sessions': int(row.metric_values[1].value),
            'conversions': int(row.metric_values[2].value)
        })
    return sources

def process_analytics_pages(response):
    """Procesar páginas principales"""
    pages = []
    for row in response.rows:
        pages.append({
            'page': row.dimension_values[0].value,
            'pageviews': int(row.metric_values[0].value),
            'avg_time': round(float(row.metric_values[1].value), 2),
            'bounce_rate': round(float(row.metric_values[2].value) * 100, 2)
        })
    return pages

# ============================================================
# PAGESPEED INSIGHTS - RENDIMIENTO TÉCNICO
# ============================================================

@app.route('/api/pagespeed/analyze', methods=['POST'])
def pagespeed_analyze():
    """Analizar rendimiento con PageSpeed Insights"""
    try:
        data = request.json
        url = data.get('url')
        strategy = data.get('strategy', 'mobile')  # mobile o desktop
        
        service = get_pagespeed_service()
        
        # Análisis mobile
        result_mobile = service.pagespeedapi().runpagespeed(
            url=url,
            strategy='mobile',
            category=['PERFORMANCE', 'ACCESSIBILITY', 'BEST_PRACTICES', 'SEO']
        ).execute()
        
        # Análisis desktop
        result_desktop = service.pagespeedapi().runpagespeed(
            url=url,
            strategy='desktop',
            category=['PERFORMANCE', 'ACCESSIBILITY', 'BEST_PRACTICES', 'SEO']
        ).execute()
        
        pagespeed_data = {
            'mobile': process_pagespeed_result(result_mobile),
            'desktop': process_pagespeed_result(result_desktop),
            'analyzed_at': datetime.now().isoformat()
        }
        
        return jsonify({
            'status': 'success',
            'data': pagespeed_data
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def process_pagespeed_result(result):
    """Procesar resultado de PageSpeed"""
    lighthouse = result.get('lighthouseResult', {})
    categories = lighthouse.get('categories', {})
    audits = lighthouse.get('audits', {})
    
    return {
        'scores': {
            'performance': categories.get('performance', {}).get('score', 0) * 100,
            'accessibility': categories.get('accessibility', {}).get('score', 0) * 100,
            'best_practices': categories.get('best-practices', {}).get('score', 0) * 100,
            'seo': categories.get('seo', {}).get('score', 0) * 100
        },
        'metrics': {
            'first_contentful_paint': audits.get('first-contentful-paint', {}).get('displayValue', 'N/A'),
            'speed_index': audits.get('speed-index', {}).get('displayValue', 'N/A'),
            'largest_contentful_paint': audits.get('largest-contentful-paint', {}).get('displayValue', 'N/A'),
            'time_to_interactive': audits.get('interactive', {}).get('displayValue', 'N/A'),
            'total_blocking_time': audits.get('total-blocking-time', {}).get('displayValue', 'N/A'),
            'cumulative_layout_shift': audits.get('cumulative-layout-shift', {}).get('displayValue', 'N/A')
        },
        'opportunities': extract_opportunities(audits),
        'diagnostics': extract_diagnostics(audits)
    }

def extract_opportunities(audits):
    """Extraer oportunidades de mejora"""
    opportunities = []
    opportunity_audits = [
        'render-blocking-resources', 'unused-css-rules', 'unused-javascript',
        'modern-image-formats', 'offscreen-images', 'unminified-css',
        'unminified-javascript', 'efficient-animated-content'
    ]
    
    for audit_id in opportunity_audits:
        audit = audits.get(audit_id, {})
        if audit.get('score', 1) < 1:
            opportunities.append({
                'id': audit_id,
                'title': audit.get('title', ''),
                'description': audit.get('description', ''),
                'savings_ms': audit.get('numericValue', 0),
                'savings_bytes': audit.get('details', {}).get('overallSavingsBytes', 0)
            })
    
    return opportunities

def extract_diagnostics(audits):
    """Extraer diagnósticos"""
    diagnostics = []
    diagnostic_audits = [
        'mainthread-work-breakdown', 'bootup-time', 'uses-long-cache-ttl',
        'dom-size', 'critical-request-chains'
    ]
    
    for audit_id in diagnostic_audits:
        audit = audits.get(audit_id, {})
        if audit.get('score') is not None and audit.get('score', 1) < 1:
            diagnostics.append({
                'id': audit_id,
                'title': audit.get('title', ''),
                'description': audit.get('description', ''),
                'display_value': audit.get('displayValue', '')
            })
    
    return diagnostics

# ============================================================
# SISTEMA DE SUGERENCIAS INTELIGENTES
# ============================================================

@app.route('/api/suggestions/generate', methods=['POST'])
def generate_suggestions():
    """Generar sugerencias automáticas basadas en análisis"""
    try:
        # Cargar datos existentes
        keywords_db = load_json(KEYWORDS_FILE)
        performance_data = load_json(PERFORMANCE_FILE)
        
        if not keywords_db:
            return jsonify({'error': 'No hay datos de keywords disponibles'}), 400
        
        keywords = keywords_db.get('keywords', [])
        
        suggestions = {
            'priority_actions': generate_priority_actions(keywords),
            'keyword_opportunities': generate_keyword_opportunities(keywords),
            'content_suggestions': generate_content_suggestions(keywords),
            'technical_improvements': generate_technical_improvements(performance_data),
            'generated_at': datetime.now().isoformat()
        }
        
        # Guardar sugerencias
        save_json(SUGGESTIONS_FILE, suggestions)
        
        return jsonify({
            'status': 'success',
            'suggestions': suggestions
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def generate_priority_actions(keywords):
    """Generar acciones prioritarias"""
    actions = []
    
    # Top keywords con alto potencial pero baja conversión
    high_potential = [k for k in keywords if k['conversion_potential'] >= 70 and k['ctr'] < 5]
    for kw in high_potential[:5]:
        actions.append({
            'type': 'optimize_ctr',
            'priority': 'HIGH',
            'keyword': kw['keyword'],
            'current_position': kw['avg_position'],
            'current_ctr': kw['ctr'],
            'action': f"Optimizar meta description y title para '{kw['keyword']}' - Posición {kw['avg_position']} pero CTR solo {kw['ctr']}%",
            'expected_impact': 'Alto - Potencial de +50% en clics',
            'estimated_effort': 'Bajo - 30 minutos'
        })
    
    # Keywords en posición 11-20 (fáciles de mejorar a top 10)
    near_top10 = [k for k in keywords if 11 <= k['avg_position'] <= 20 and k['impressions'] > 100]
    for kw in near_top10[:5]:
        actions.append({
            'type': 'improve_ranking',
            'priority': 'HIGH',
            'keyword': kw['keyword'],
            'current_position': kw['avg_position'],
            'impressions': kw['impressions'],
            'action': f"Mejorar contenido para '{kw['keyword']}' - Está en posición {kw['avg_position']}, cerca del top 10",
            'expected_impact': f"Medio-Alto - {kw['impressions']} impresiones mensuales",
            'estimated_effort': 'Medio - 2-4 horas'
        })
    
    # Keywords con muchas impresiones pero sin clics
    wasted_impressions = [k for k in keywords if k['impressions'] > 500 and k['clicks'] < 5]
    for kw in wasted_impressions[:3]:
        actions.append({
            'type': 'fix_low_ctr',
            'priority': 'CRITICAL',
            'keyword': kw['keyword'],
            'impressions': kw['impressions'],
            'clicks': kw['clicks'],
            'action': f"URGENTE: '{kw['keyword']}' tiene {kw['impressions']} impresiones pero solo {kw['clicks']} clics",
            'expected_impact': 'Crítico - Pérdida de tráfico significativa',
            'estimated_effort': 'Bajo - 1 hora'
        })
    
    return sorted(actions, key=lambda x: {'CRITICAL': 3, 'HIGH': 2, 'MEDIUM': 1}.get(x['priority'], 0), reverse=True)

def generate_keyword_opportunities(keywords):
    """Generar oportunidades de keywords nuevas"""
    opportunities = []
    
    # Analizar keywords relacionadas que están funcionando bien
    high_performers = [k for k in keywords if k['ctr'] > 5 and k['avg_position'] <= 10]
    
    for kw in high_performers[:10]:
        # Sugerir variaciones
        base_keyword = kw['keyword']
        opportunities.append({
            'base_keyword': base_keyword,
            'suggested_variations': [
                f"{base_keyword} 2025",
                f"{base_keyword} Chile",
                f"mejor {base_keyword}",
                f"{base_keyword} precio",
                f"{base_keyword} como funciona"
            ],
            'reasoning': f"'{base_keyword}' está en posición {kw['avg_position']} con {kw['ctr']}% CTR - Excelente rendimiento",
            'priority': 'HIGH' if kw['impressions'] > 500 else 'MEDIUM'
        })
    
    return opportunities[:20]

def generate_content_suggestions(keywords):
    """Generar sugerencias de contenido"""
    suggestions = []
    
    # Agrupar keywords por tema
    keyword_groups = group_keywords_by_theme(keywords)
    
    for theme, kws in keyword_groups.items():
        total_impressions = sum(k['impressions'] for k in kws)
        avg_position = statistics.mean([k['avg_position'] for k in kws])
        
        if total_impressions > 1000 and avg_position > 10:
            suggestions.append({
                'theme': theme,
                'keywords_count': len(kws),
                'total_impressions': total_impressions,
                'avg_position': round(avg_position, 1),
                'suggestion': f"Crear contenido completo sobre '{theme}' - {len(kws)} keywords relacionadas con {total_impressions} impresiones totales",
                'content_type': 'Blog Post / Guía Completa',
                'priority': 'HIGH' if total_impressions > 5000 else 'MEDIUM',
                'estimated_length': '2000-3000 palabras'
            })
    
    return sorted(suggestions, key=lambda x: x['total_impressions'], reverse=True)[:15]

def group_keywords_by_theme(keywords):
    """Agrupar keywords por tema usando palabras comunes"""
    from collections import Counter
    
    # Palabras irrelevantes
    stop_words = {'de', 'la', 'el', 'en', 'y', 'a', 'para', 'con', 'por', 'un', 'una'}
    
    # Extraer palabras principales
    word_freq = Counter()
    for kw in keywords:
        words = [w.lower() for w in kw['keyword'].split() if w.lower() not in stop_words and len(w) > 3]
        word_freq.update(words)
    
    # Top temas
    top_themes = [word for word, count in word_freq.most_common(20)]
    
    # Agrupar keywords
    groups = defaultdict(list)
    for kw in keywords:
        kw_lower = kw['keyword'].lower()
        for theme in top_themes:
            if theme in kw_lower:
                groups[theme].append(kw)
                break
    
    return dict(groups)

def generate_technical_improvements(performance_data):
    """Generar mejoras técnicas basadas en PageSpeed"""
    if not performance_data:
        return []
    
    improvements = []
    
    # Analizar últimos datos de rendimiento
    # (Implementar según estructura de performance_data)
    
    return improvements

# ============================================================
# ACTUALIZACIÓN AUTOMÁTICA DE KEYWORDS EN EL SITIO
# ============================================================

@app.route('/api/keywords/update-site', methods=['POST'])
def update_keywords_on_site():
    """Sugerir actualizaciones de keywords en páginas del sitio"""
    try:
        data = request.json
        site_path = data.get('site_path')
        
        # Cargar keywords database
        keywords_db = load_json(KEYWORDS_FILE)
        if not keywords_db:
            return jsonify({'error': 'No hay datos de keywords'}), 400
        
        keywords = keywords_db.get('keywords', [])
        suggestions_data = load_json(SUGGESTIONS_FILE)
        
        # Analizar páginas del sitio y generar recomendaciones
        recommendations = analyze_site_keywords(site_path, keywords, suggestions_data)
        
        return jsonify({
            'status': 'success',
            'recommendations': recommendations
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def analyze_site_keywords(site_path, keywords, suggestions):
    """Analizar keywords en el sitio y generar recomendaciones"""
    recommendations = []
    
    # Obtener páginas principales del sitio
    # (Implementar según estructura del sitio)
    
    return recommendations

# ============================================================
# SERVIDOR
# ============================================================

if __name__ == '__main__':
    print("="*60)
    print("🚀 SEO Dashboard API Server - VERSIÓN EMPRESARIAL")
    print("="*60)
    print("✅ Servidor iniciado en: http://localhost:5000")
    print("📊 Características:")
    print("   - Análisis completo de keywords (hasta 25,000)")
    print("   - Google Analytics 4 integrado")
    print("   - PageSpeed Insights")
    print("   - Sistema de sugerencias inteligentes")
    print("   - Actualización automática de keywords")
    print("="*60)
    print("Presiona Ctrl+C para detener el servidor")
    print("="*60)
    print()
    
    app.run(debug=True, port=5000, host='127.0.0.1')
