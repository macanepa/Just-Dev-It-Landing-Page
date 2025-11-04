"""
Script de verificación y configuración para SEO Dashboard
Ejecuta este script para verificar tu configuración paso a paso
"""

import sys
import os
import json

def print_header(text):
    print("\n" + "=" * 60)
    print(f"  {text}")
    print("=" * 60 + "\n")

def print_step(number, text):
    print(f"[{number}/6] {text}")

def print_success(text):
    print(f"  ✓ {text}")

def print_error(text):
    print(f"  ✗ {text}")

def print_warning(text):
    print(f"  ⚠ {text}")

def check_python_version():
    """Verificar versión de Python"""
    print_step(1, "Verificando Python...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print_success(f"Python {version.major}.{version.minor}.{version.micro} instalado")
        return True
    else:
        print_error(f"Python {version.major}.{version.minor} es muy antiguo")
        print_warning("Se requiere Python 3.8 o superior")
        return False

def check_dependencies():
    """Verificar que las dependencias estén instaladas"""
    print_step(2, "Verificando dependencias...")
    
    required = {
        'flask': 'Flask',
        'flask_cors': 'Flask-CORS',
        'google.auth': 'Google Auth',
        'google.oauth2': 'Google OAuth2',
        'googleapiclient': 'Google API Client'
    }
    
    all_installed = True
    for module, name in required.items():
        try:
            __import__(module)
            print_success(f"{name} instalado")
        except ImportError:
            print_error(f"{name} no instalado")
            all_installed = False
    
    if not all_installed:
        print_warning("\nInstala las dependencias con:")
        print_warning("  pip install -r requirements.txt")
    
    return all_installed

def check_config_file():
    """Verificar si existe archivo de configuración"""
    print_step(3, "Verificando configuración...")
    
    if os.path.exists('config.json'):
        try:
            with open('config.json', 'r') as f:
                config = json.load(f)
            
            if config.get('credentials'):
                print_success("Archivo config.json encontrado")
                print_success("Credenciales configuradas")
                
                # Verificar contenido de credenciales
                try:
                    creds = json.loads(config['credentials'])
                    if creds.get('type') == 'service_account':
                        print_success(f"Service Account: {creds.get('client_email', 'N/A')}")
                    else:
                        print_warning("El tipo de credencial no es service_account")
                except:
                    print_warning("Las credenciales no son JSON válido")
                
                return True
            else:
                print_warning("config.json existe pero sin credenciales")
                return False
        except Exception as e:
            print_error(f"Error al leer config.json: {e}")
            return False
    else:
        print_warning("No se encontró config.json")
        print_warning("Necesitas configurar el dashboard desde la web")
        return False

def check_search_console_access():
    """Verificar acceso a Search Console (requiere config)"""
    print_step(4, "Verificando acceso a Search Console...")
    
    if not os.path.exists('config.json'):
        print_warning("Primero configura el dashboard")
        return False
    
    try:
        with open('config.json', 'r') as f:
            config = json.load(f)
        
        property_url = config.get('property_url', 'N/A')
        print(f"  Propiedad configurada: {property_url}")
        
        # Intentar importar y verificar
        try:
            from google.oauth2 import service_account
            from googleapiclient.discovery import build
            
            credentials_json = config.get('credentials')
            if not credentials_json:
                print_warning("No hay credenciales configuradas")
                return False
            
            credentials_dict = json.loads(credentials_json)
            credentials = service_account.Credentials.from_service_account_info(
                credentials_dict,
                scopes=['https://www.googleapis.com/auth/webmasters.readonly']
            )
            
            service = build('searchconsole', 'v1', credentials=credentials)
            print_success("Credenciales válidas")
            
            # Intentar hacer una query simple
            from datetime import datetime, timedelta
            
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
            
            print_success("Conexión exitosa con Search Console")
            
            if response.get('rows'):
                print_success(f"Se encontraron datos para {property_url}")
            else:
                print_warning("No hay datos disponibles todavía")
                print_warning("Espera 2-3 días después de agregar el sitio a Search Console")
            
            return True
            
        except Exception as e:
            print_error(f"Error al conectar con Search Console: {str(e)}")
            
            if "403" in str(e):
                print_warning("Error 403: El Service Account no tiene permisos")
                print_warning("Agrega el email del Service Account en Search Console:")
                print_warning("  1. Ve a Search Console → Settings")
                print_warning("  2. Users and permissions → Add user")
                print_warning(f"  3. Email: {credentials_dict.get('client_email', 'N/A')}")
            elif "404" in str(e):
                print_warning("Error 404: Propiedad no encontrada")
                print_warning(f"Verifica que la URL sea correcta: {property_url}")
            
            return False
            
    except Exception as e:
        print_error(f"Error: {e}")
        return False

def check_server_running():
    """Verificar si el servidor API está corriendo"""
    print_step(5, "Verificando servidor API...")
    
    try:
        import requests
        response = requests.get('http://localhost:5000/api/health', timeout=2)
        if response.status_code == 200:
            data = response.json()
            print_success("Servidor API corriendo en http://localhost:5000")
            print_success(f"Google libs disponibles: {data.get('google_libs')}")
            return True
        else:
            print_warning("Servidor responde pero con error")
            return False
    except:
        print_warning("Servidor API no está corriendo")
        print_warning("Inicia con: python api-server.py")
        return False

def print_summary():
    """Imprimir resumen y próximos pasos"""
    print_step(6, "Resumen y próximos pasos")
    
    if not os.path.exists('config.json'):
        print("\n📋 CONFIGURACIÓN INICIAL NECESARIA:\n")
        print("1. Abre el dashboard en tu navegador:")
        print("   → Doble clic en: index.html")
        print("")
        print("2. Ve a la pestaña 'Configuración'")
        print("")
        print("3. Sigue estos pasos:")
        print("   a) Ve a: https://console.cloud.google.com")
        print("   b) Crea un proyecto nuevo")
        print("   c) Habilita 'Google Search Console API'")
        print("   d) Crea un Service Account")
        print("   e) Descarga el archivo JSON")
        print("   f) Copia el contenido y pégalo en el dashboard")
        print("")
        print("4. En Search Console:")
        print("   a) Ve a: https://search.google.com/search-console")
        print("   b) Settings → Users and permissions")
        print("   c) Agrega el email del Service Account")
        print("")
        print("5. Guarda la configuración y prueba la conexión")
        print("")
        print("📚 Guía detallada: Ver SETUP-GUIDE.md")
    else:
        print("\n✅ CONFIGURACIÓN ENCONTRADA\n")
        print("Próximos pasos:")
        print("")
        print("1. Inicia el servidor API:")
        print("   python api-server.py")
        print("")
        print("2. Abre el dashboard:")
        print("   start index.html")
        print("")
        print("3. Haz clic en 'Actualizar Datos'")
        print("")
        print("4. Si hay errores, revisa:")
        print("   - Que el Service Account esté agregado en Search Console")
        print("   - Que la URL de la propiedad sea correcta")
        print("   - Que haya datos disponibles (espera 2-3 días si es nuevo)")

def main():
    print_header("🔍 Verificación de Configuración - SEO Dashboard")
    
    results = []
    
    # Ejecutar verificaciones
    results.append(check_python_version())
    results.append(check_dependencies())
    results.append(check_config_file())
    
    # Solo verificar acceso si hay config
    if results[2]:
        results.append(check_search_console_access())
    else:
        print_step(4, "Verificando acceso a Search Console...")
        print_warning("Primero configura el dashboard")
        results.append(False)
    
    results.append(check_server_running())
    
    # Resumen
    print_summary()
    
    # Estadísticas
    print_header("📊 Resumen de Verificación")
    passed = sum(results)
    total = len(results)
    
    print(f"Verificaciones pasadas: {passed}/{total}")
    
    if passed == total:
        print("\n🎉 ¡Todo configurado correctamente!")
        print("Puedes usar el dashboard con datos reales")
    elif passed >= 3:
        print("\n⚠️  Configuración parcial")
        print("Revisa los puntos marcados con ⚠️ o ✗")
    else:
        print("\n❌ Se requiere configuración")
        print("Sigue los pasos en 'Próximos pasos'")
    
    print("\n" + "=" * 60)

if __name__ == '__main__':
    main()
