"""
Script de diagnóstico para verificar la conexión con Search Console
"""
import json
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

def test_connection():
    """Probar conexión y listar propiedades disponibles"""
    
    print("=" * 60)
    print("Diagnóstico de conexión con Google Search Console")
    print("=" * 60)
    print()
    
    # Cargar configuración
    try:
        with open('config.json', 'r', encoding='utf-8') as f:
            config = json.load(f)
    except Exception as e:
        print(f"❌ Error al leer config.json: {e}")
        return False
    
    service_account_json = config.get('serviceAccountJson')
    property_url = config.get('propertyUrl')
    
    print(f"📧 Service Account: {service_account_json.get('client_email')}")
    print(f"🌐 Property URL configurada: {property_url}")
    print()
    
    # Crear servicio
    try:
        credentials = service_account.Credentials.from_service_account_info(
            service_account_json,
            scopes=['https://www.googleapis.com/auth/webmasters.readonly']
        )
        service = build('searchconsole', 'v1', credentials=credentials)
        print("✅ Credenciales válidas")
        print()
    except Exception as e:
        print(f"❌ Error al crear servicio: {e}")
        return False
    
    # Listar sitios disponibles
    print("🔍 Listando propiedades disponibles en Search Console:")
    print("-" * 60)
    
    try:
        sites_response = service.sites().list().execute()
        sites = sites_response.get('siteEntry', [])
        
        if not sites:
            print("❌ No se encontraron propiedades.")
            print("   Verifica que agregaste la cuenta de servicio en Search Console")
            return False
        
        print(f"✅ Se encontraron {len(sites)} propiedad(es):")
        print()
        
        for i, site in enumerate(sites, 1):
            site_url = site.get('siteUrl', 'N/A')
            permission = site.get('permissionLevel', 'N/A')
            print(f"  {i}. URL: {site_url}")
            print(f"     Permisos: {permission}")
            print()
        
        # Verificar si la URL configurada coincide
        property_urls = [site.get('siteUrl') for site in sites]
        
        if property_url in property_urls:
            print("✅ La URL configurada existe en Search Console!")
            print()
            
            # Intentar obtener datos de prueba
            print("🔍 Intentando obtener datos de prueba...")
            try:
                from datetime import datetime, timedelta
                end_date = datetime.now().date()
                start_date = end_date - timedelta(days=7)
                
                request = {
                    'startDate': start_date.strftime('%Y-%m-%d'),
                    'endDate': end_date.strftime('%Y-%m-%d'),
                    'dimensions': ['query'],
                    'rowLimit': 5
                }
                
                response = service.searchanalytics().query(
                    siteUrl=property_url,
                    body=request
                ).execute()
                
                rows = response.get('rows', [])
                print(f"✅ Conexión exitosa! Se obtuvieron {len(rows)} resultados")
                
                if rows:
                    print()
                    print("📊 Muestra de datos:")
                    for row in rows[:3]:
                        query = row['keys'][0]
                        clicks = row.get('clicks', 0)
                        impressions = row.get('impressions', 0)
                        print(f"   - {query}: {impressions} impresiones, {clicks} clics")
                
                return True
                
            except HttpError as e:
                print(f"❌ Error al obtener datos: {e.status_code} - {e.reason}")
                if e.status_code == 403:
                    print("   El servicio account no tiene permisos suficientes")
                    print("   Ve a Search Console y asegúrate de dar permisos de 'Propietario'")
                return False
            except Exception as e:
                print(f"❌ Error inesperado: {e}")
                return False
        
        else:
            print("⚠️ La URL configurada NO coincide con ninguna propiedad")
            print()
            print("URL configurada:")
            print(f"  {property_url}")
            print()
            print("URLs disponibles:")
            for url in property_urls:
                print(f"  {url}")
            print()
            print("💡 Actualiza el archivo config.json con la URL correcta")
            print("   O crea el archivo manualmente con:")
            print(f'   "propertyUrl": "{property_urls[0]}"')
            return False
    
    except HttpError as e:
        print(f"❌ Error HTTP: {e.status_code} - {e.reason}")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == '__main__':
    import sys
    success = test_connection()
    print()
    print("=" * 60)
    if success:
        print("✅ DIAGNÓSTICO EXITOSO")
    else:
        print("❌ DIAGNÓSTICO FALLIDO - Revisa los mensajes arriba")
    print("=" * 60)
    sys.exit(0 if success else 1)
