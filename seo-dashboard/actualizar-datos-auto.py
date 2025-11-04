"""
Script de Actualización Automática para SEO Dashboard
Obtiene datos de Google Search Console y los guarda para el dashboard
"""

import json
import os
from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Configuración
CONFIG_FILE = 'config.json'
OUTPUT_FILE = 'datos-actualizados.json'
LOG_FILE = 'actualizacion-log.txt'

def log_message(message):
    """Registra mensajes en el log y en consola"""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    log_entry = f"[{timestamp}] {message}"
    print(log_entry)
    
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(log_entry + '\n')

def load_config():
    """Carga la configuración del dashboard"""
    try:
        with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        log_message("ERROR: No se encontró config.json")
        log_message("Por favor configura el dashboard primero desde la interfaz web")
        return None
    except json.JSONDecodeError:
        log_message("ERROR: config.json está corrupto")
        return None

def get_search_console_service(credentials_dict):
    """Crea el servicio de Google Search Console"""
    try:
        credentials = service_account.Credentials.from_service_account_info(
            credentials_dict,
            scopes=['https://www.googleapis.com/auth/webmasters.readonly']
        )
        service = build('searchconsole', 'v1', credentials=credentials)
        return service
    except Exception as e:
        log_message(f"ERROR al crear servicio: {str(e)}")
        return None

def fetch_search_console_data(service, property_url, days=7):
    """Obtiene datos de Search Console"""
    try:
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days)
        
        request = {
            'startDate': start_date.strftime('%Y-%m-%d'),
            'endDate': end_date.strftime('%Y-%m-%d'),
            'dimensions': ['query', 'date'],
            'rowLimit': 100
        }
        
        log_message(f"Consultando datos desde {start_date} hasta {end_date}...")
        response = service.searchanalytics().query(
            siteUrl=property_url,
            body=request
        ).execute()
        
        return response
    except HttpError as e:
        log_message(f"ERROR HTTP: {e.status_code} - {e.reason}")
        if e.status_code == 403:
            log_message("Verifica que la cuenta de servicio tiene permisos en Search Console")
        elif e.status_code == 404:
            log_message("Verifica que la URL de la propiedad es correcta")
        return None
    except Exception as e:
        log_message(f"ERROR: {str(e)}")
        return None

def process_data(raw_data):
    """Procesa los datos crudos para el dashboard"""
    if not raw_data or 'rows' not in raw_data:
        log_message("No hay datos disponibles")
        return None
    
    # Agregar datos por keyword
    keywords_data = {}
    daily_data = {}
    
    for row in raw_data['rows']:
        query = row['keys'][0]
        date = row['keys'][1]
        clicks = row.get('clicks', 0)
        impressions = row.get('impressions', 0)
        ctr = row.get('ctr', 0)
        position = row.get('position', 0)
        
        # Agregar por keyword
        if query not in keywords_data:
            keywords_data[query] = {
                'clicks': 0,
                'impressions': 0,
                'ctr': 0,
                'position': 0,
                'count': 0
            }
        
        keywords_data[query]['clicks'] += clicks
        keywords_data[query]['impressions'] += impressions
        keywords_data[query]['position'] += position
        keywords_data[query]['count'] += 1
        
        # Agregar por día
        if date not in daily_data:
            daily_data[date] = {
                'clicks': 0,
                'impressions': 0
            }
        
        daily_data[date]['clicks'] += clicks
        daily_data[date]['impressions'] += impressions
    
    # Calcular promedios
    keywords_list = []
    for query, data in keywords_data.items():
        avg_position = data['position'] / data['count'] if data['count'] > 0 else 0
        avg_ctr = (data['clicks'] / data['impressions'] * 100) if data['impressions'] > 0 else 0
        
        keywords_list.append({
            'keyword': query,
            'position': round(avg_position, 1),
            'impressions': data['impressions'],
            'clicks': data['clicks'],
            'ctr': round(avg_ctr, 2)
        })
    
    # Ordenar por impresiones
    keywords_list.sort(key=lambda x: x['impressions'], reverse=True)
    
    # Calcular totales
    total_clicks = sum(k['clicks'] for k in keywords_list)
    total_impressions = sum(k['impressions'] for k in keywords_list)
    avg_ctr = (total_clicks / total_impressions * 100) if total_impressions > 0 else 0
    avg_position = sum(k['position'] * k['impressions'] for k in keywords_list) / total_impressions if total_impressions > 0 else 0
    
    # Preparar datos de tendencia
    trend_data = []
    for date in sorted(daily_data.keys()):
        trend_data.append({
            'date': date,
            'impressions': daily_data[date]['impressions'],
            'clicks': daily_data[date]['clicks']
        })
    
    processed_data = {
        'summary': {
            'total_impressions': total_impressions,
            'total_clicks': total_clicks,
            'avg_ctr': round(avg_ctr, 2),
            'avg_position': round(avg_position, 1)
        },
        'keywords': keywords_list[:50],  # Top 50
        'trend': trend_data,
        'last_updated': datetime.now().isoformat()
    }
    
    log_message(f"Datos procesados: {len(keywords_list)} keywords, {total_impressions} impresiones")
    return processed_data

def save_data(data):
    """Guarda los datos procesados"""
    try:
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        log_message(f"Datos guardados en {OUTPUT_FILE}")
        return True
    except Exception as e:
        log_message(f"ERROR al guardar datos: {str(e)}")
        return False

def main():
    """Función principal"""
    log_message("=" * 60)
    log_message("Iniciando actualización automática de SEO Dashboard")
    log_message("=" * 60)
    
    # Cargar configuración
    config = load_config()
    if not config:
        return False
    
    property_url = config.get('propertyUrl')
    credentials = config.get('serviceAccountJson')
    
    if not property_url or not credentials:
        log_message("ERROR: Configuración incompleta")
        return False
    
    log_message(f"Propiedad: {property_url}")
    
    # Crear servicio
    service = get_search_console_service(credentials)
    if not service:
        return False
    
    # Obtener datos
    raw_data = fetch_search_console_data(service, property_url, days=7)
    if not raw_data:
        return False
    
    # Procesar datos
    processed_data = process_data(raw_data)
    if not processed_data:
        return False
    
    # Guardar datos
    if not save_data(processed_data):
        return False
    
    log_message("=" * 60)
    log_message("✅ Actualización completada exitosamente")
    log_message("=" * 60)
    return True

if __name__ == '__main__':
    try:
        success = main()
        exit(0 if success else 1)
    except Exception as e:
        log_message(f"ERROR CRÍTICO: {str(e)}")
        exit(1)
