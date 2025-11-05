"""
Script de Prueba Rápida - Análisis Completo de Keywords
Ejecuta el análisis sin necesidad del servidor API
"""

import json
import os
from datetime import datetime, timedelta
from collections import defaultdict
import statistics

try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
except ImportError:
    print("❌ ERROR: Librerías de Google no instaladas")
    print("Ejecuta: pip install google-api-python-client google-auth")
    exit(1)

def load_config():
    """Cargar configuración"""
    with open('config.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def get_credentials(credentials_dict):
    """Obtener credenciales"""
    return service_account.Credentials.from_service_account_info(
        credentials_dict,
        scopes=['https://www.googleapis.com/auth/webmasters.readonly']
    )

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

def calculate_priority(position, impressions, ctr, conversion_potential):
    """Calcular prioridad general (0-100)"""
    priority = (
        conversion_potential * 0.4 +
        (100 - position) * 0.3 +
        min(impressions / 10, 100) * 0.2 +
        ctr * 2 * 0.1
    )
    return min(round(priority, 1), 100)

def main():
    print("=" * 60)
    print("🚀 ANÁLISIS COMPLETO DE KEYWORDS - VERSIÓN EMPRESARIAL")
    print("=" * 60)
    print()
    
    # Cargar configuración
    print("📁 Cargando configuración...")
    config = load_config()
    property_url = config['propertyUrl']
    credentials_dict = config['serviceAccountJson']
    
    print(f"✅ Propiedad: {property_url}")
    print()
    
    # Crear servicio
    print("🔐 Autenticando con Google Search Console...")
    credentials = get_credentials(credentials_dict)
    service = build('searchconsole', 'v1', credentials=credentials)
    print("✅ Autenticación exitosa")
    print()
    
    # Definir período
    days = 90  # Últimos 90 días para mayor dataset
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=days)
    
    print(f"📅 Período: {start_date} a {end_date} ({days} días)")
    print()
    
    # Obtener datos
    print("🔍 Obteniendo keywords desde Google Search Console...")
    print("   (Esto puede tomar 30-60 segundos para 25,000 keywords)")
    print()
    
    request_body = {
        'startDate': start_date.strftime('%Y-%m-%d'),
        'endDate': end_date.strftime('%Y-%m-%d'),
        'dimensions': ['query', 'page', 'device', 'country'],
        'rowLimit': 25000,  # Máximo
        'dataState': 'all'
    }
    
    try:
        response = service.searchanalytics().query(
            siteUrl=property_url,
            body=request_body
        ).execute()
        
        rows = response.get('rows', [])
        print(f"✅ Se obtuvieron {len(rows)} filas de datos")
        print()
        
        # Procesar keywords
        print("⚙️  Procesando y analizando keywords...")
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
        keywords = []
        for query, data in keywords_dict.items():
            avg_position = statistics.mean(data['positions']) if data['positions'] else 0
            ctr = (data['clicks'] / data['impressions'] * 100) if data['impressions'] > 0 else 0
            
            conversion_potential = calculate_conversion_potential(
                avg_position, ctr, data['impressions'], data['clicks']
            )
            
            improvement_opportunity = calculate_improvement_opportunity(
                avg_position, ctr, data['impressions']
            )
            
            priority = calculate_priority(avg_position, data['impressions'], ctr, conversion_potential)
            
            keywords.append({
                'keyword': query,
                'impressions': data['impressions'],
                'clicks': data['clicks'],
                'ctr': round(ctr, 2),
                'avg_position': round(avg_position, 1),
                'best_position': round(min(data['positions']), 1) if data['positions'] else 0,
                'worst_position': round(max(data['positions']), 1) if data['positions'] else 0,
                'total_pages': len(data['pages']),
                'conversion_potential': conversion_potential,
                'improvement_opportunity': improvement_opportunity,
                'priority': priority
            })
        
        # Ordenar por prioridad
        keywords.sort(key=lambda x: x['priority'], reverse=True)
        
        print(f"✅ {len(keywords)} keywords únicas analizadas")
        print()
        
        # Generar resumen
        print("=" * 60)
        print("📊 RESUMEN EJECUTIVO")
        print("=" * 60)
        print()
        
        high_priority = len([k for k in keywords if k['priority'] >= 70])
        medium_priority = len([k for k in keywords if 40 <= k['priority'] < 70])
        low_priority = len([k for k in keywords if k['priority'] < 40])
        top_3 = len([k for k in keywords if k['avg_position'] <= 3])
        top_10 = len([k for k in keywords if k['avg_position'] <= 10])
        total_impressions = sum(k['impressions'] for k in keywords)
        total_clicks = sum(k['clicks'] for k in keywords)
        avg_ctr = round(statistics.mean([k['ctr'] for k in keywords]), 2)
        avg_position = round(statistics.mean([k['avg_position'] for k in keywords]), 1)
        high_conversion = len([k for k in keywords if k['conversion_potential'] >= 70])
        
        print(f"Total Keywords: {len(keywords):,}")
        print(f"Total Impresiones: {total_impressions:,}")
        print(f"Total Clics: {total_clicks:,}")
        print(f"CTR Promedio: {avg_ctr}%")
        print(f"Posición Promedio: {avg_position}")
        print()
        print(f"Por Prioridad:")
        print(f"  🔴 Alta (≥70):   {high_priority:,} keywords")
        print(f"  🟡 Media (40-69): {medium_priority:,} keywords")
        print(f"  🟢 Baja (<40):    {low_priority:,} keywords")
        print()
        print(f"Por Posición:")
        print(f"  🥇 Top 3:  {top_3} keywords")
        print(f"  🥈 Top 10: {top_10} keywords")
        print()
        print(f"Alto Potencial de Conversión: {high_conversion} keywords")
        print()
        
        # Top 20 keywords
        print("=" * 60)
        print("🏆 TOP 20 KEYWORDS POR PRIORIDAD")
        print("=" * 60)
        print()
        
        for i, kw in enumerate(keywords[:20], 1):
            print(f"{i}. {kw['keyword']}")
            print(f"   📊 Posición: {kw['avg_position']} (Mejor: {kw['best_position']}, Peor: {kw['worst_position']})")
            print(f"   👁️  Impresiones: {kw['impressions']:,} | 🖱️  Clics: {kw['clicks']} | 📈 CTR: {kw['ctr']}%")
            print(f"   🎯 Prioridad: {kw['priority']}/100")
            print(f"   💰 Potencial Conversión: {kw['conversion_potential']}/100")
            print(f"   ⚡ Oportunidad Mejora: {kw['improvement_opportunity']}/100")
            print(f"   📄 Páginas: {kw['total_pages']}")
            print()
        
        # Guardar en archivo
        print("=" * 60)
        print("💾 GUARDANDO RESULTADOS")
        print("=" * 60)
        print()
        
        output_data = {
            'last_update': datetime.now().isoformat(),
            'period': {
                'start_date': start_date.strftime('%Y-%m-%d'),
                'end_date': end_date.strftime('%Y-%m-%d'),
                'days': days
            },
            'summary': {
                'total_keywords': len(keywords),
                'high_priority': high_priority,
                'medium_priority': medium_priority,
                'low_priority': low_priority,
                'top_3_positions': top_3,
                'top_10_positions': top_10,
                'total_impressions': total_impressions,
                'total_clicks': total_clicks,
                'avg_ctr': avg_ctr,
                'avg_position': avg_position,
                'high_conversion_potential': high_conversion
            },
            'keywords': keywords
        }
        
        with open('keywords-database.json', 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Guardado en: keywords-database.json")
        print(f"   Tamaño: {len(keywords)} keywords con análisis completo")
        print()
        
        print("=" * 60)
        print("✅ ANÁLISIS COMPLETADO EXITOSAMENTE")
        print("=" * 60)
        
    except HttpError as e:
        print(f"❌ ERROR HTTP: {e.status_code} - {e.reason}")
        if e.status_code == 403:
            print("   Verifica permisos en Search Console")
        elif e.status_code == 404:
            print("   Verifica la URL de la propiedad")
    except Exception as e:
        print(f"❌ ERROR: {e}")

if __name__ == '__main__':
    main()
