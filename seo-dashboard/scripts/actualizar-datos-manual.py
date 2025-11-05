"""
Script para actualizar datos manualmente desde Google Search Console
"""
import json
from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Cargar configuración
with open('config/config.json', 'r', encoding='utf-8') as f:
    config = json.load(f)

print("=" * 60)
print("🔄 ACTUALIZANDO DATOS DE SEARCH CONSOLE")
print("=" * 60)
print(f"✅ Sitio: {config['propertyUrl']}")
print(f"✅ Service Account: {config['serviceAccountJson']['client_email']}")
print()

# Crear credenciales
credentials = service_account.Credentials.from_service_account_info(
    config['serviceAccountJson'],
    scopes=['https://www.googleapis.com/auth/webmasters.readonly']
)

# Crear servicio de Search Console
service = build('searchconsole', 'v1', credentials=credentials)

# Configurar fechas (últimos 90 días)
end_date = datetime.now()
start_date = end_date - timedelta(days=90)

print(f"📅 Período: {start_date.strftime('%Y-%m-%d')} a {end_date.strftime('%Y-%m-%d')}")
print()
print("⏳ Obteniendo datos de Google Search Console...")

try:
    # Solicitar datos
    request = {
        'startDate': start_date.strftime('%Y-%m-%d'),
        'endDate': end_date.strftime('%Y-%m-%d'),
        'dimensions': ['query', 'page', 'device', 'country'],
        'rowLimit': 25000,
        'startRow': 0
    }
    
    response = service.searchanalytics().query(
        siteUrl=config['propertyUrl'],
        body=request
    ).execute()
    
    # Procesar resultados
    if 'rows' in response:
        keywords = []
        total_impressions = 0
        total_clicks = 0
        
        for row in response['rows']:
            keyword_data = {
                'keyword': row['keys'][0],
                'page': row['keys'][1] if len(row['keys']) > 1 else '',
                'device': row['keys'][2] if len(row['keys']) > 2 else '',
                'country': row['keys'][3] if len(row['keys']) > 3 else '',
                'clicks': row.get('clicks', 0),
                'impressions': row.get('impressions', 0),
                'ctr': row.get('ctr', 0) * 100,
                'position': row.get('position', 0)
            }
            keywords.append(keyword_data)
            total_impressions += keyword_data['impressions']
            total_clicks += keyword_data['clicks']
        
        # Guardar datos
        output_file = 'data/keywords-database.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump({
                'keywords': keywords,
                'updated_at': datetime.now().isoformat(),
                'property_url': config['propertyUrl'],
                'period': {
                    'start': start_date.strftime('%Y-%m-%d'),
                    'end': end_date.strftime('%Y-%m-%d')
                },
                'summary': {
                    'total_keywords': len(keywords),
                    'total_impressions': total_impressions,
                    'total_clicks': total_clicks,
                    'average_ctr': (total_clicks / total_impressions * 100) if total_impressions > 0 else 0
                }
            }, f, indent=2, ensure_ascii=False)
        
        print()
        print("=" * 60)
        print("✅ DATOS ACTUALIZADOS CORRECTAMENTE")
        print("=" * 60)
        print(f"📊 Keywords encontradas: {len(keywords)}")
        print(f"👁️  Impresiones totales: {total_impressions:,}")
        print(f"🖱️  Clics totales: {total_clicks:,}")
        print(f"📈 CTR promedio: {(total_clicks / total_impressions * 100) if total_impressions > 0 else 0:.2f}%")
        print(f"💾 Guardado en: {output_file}")
        print()
        print("🔄 Ahora recarga el dashboard en tu navegador (F5)")
        print("=" * 60)
        
    else:
        print("⚠️  No se encontraron datos para este período")
        print("Verifica que:")
        print("  1. El sitio está verificado en Search Console")
        print("  2. El Service Account tiene permisos")
        print("  3. Hay datos disponibles para las fechas seleccionadas")

except Exception as e:
    print()
    print("=" * 60)
    print("❌ ERROR AL OBTENER DATOS")
    print("=" * 60)
    print(f"Error: {str(e)}")
    print()
    print("Posibles causas:")
    print("  1. El Service Account no tiene permisos en Search Console")
    print("  2. La URL del sitio es incorrecta")
    print("  3. No hay datos disponibles para el período")
    print("=" * 60)
