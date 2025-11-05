"""
Script interactivo para configurar las credenciales de Google APIs
"""
import json
import os

def create_config_interactive():
    """Crear config.json de forma interactiva"""
    
    print("\n" + "="*70)
    print("🔧 CONFIGURACIÓN DE GOOGLE APIs - Dashboard SEO")
    print("="*70)
    print()
    
    print("Este script te ayudará a configurar las credenciales de Google.")
    print()
    
    # Opción 1: Archivo credentials.json
    print("📋 OPCIÓN 1: Usar archivo credentials.json")
    print("-" * 70)
    
    credentials_path = "credentials.json"
    if os.path.exists(credentials_path):
        print(f"✅ Archivo encontrado: {credentials_path}")
        use_file = input("\n¿Deseas usar este archivo? (s/n): ").lower()
        
        if use_file == 's':
            try:
                with open(credentials_path, 'r', encoding='utf-8') as f:
                    service_account_json = json.load(f)
                
                print("✅ Credenciales cargadas desde el archivo")
                
                # Pedir URL del sitio
                print("\n" + "="*70)
                print("📍 Configuración del sitio")
                print("-" * 70)
                
                site_url = input("Ingresa la URL de tu sitio (ej: https://justdev.it): ").strip()
                if not site_url:
                    site_url = "https://justdev.it"
                
                # Crear config
                config = {
                    "propertyUrl": site_url + "/" if not site_url.endswith("/") else site_url,
                    "serviceAccountJson": service_account_json,
                    "analyticsPropertyId": "G-E47YX9JYCS",
                    "measurementId": "G-E47YX9JYCS"
                }
                
                save_config(config)
                return True
                
            except Exception as e:
                print(f"❌ Error al leer el archivo: {e}")
                print()
    else:
        print(f"⚠️  No se encontró el archivo: {credentials_path}")
        print()
    
    # Opción 2: Pegar JSON manualmente
    print("\n📋 OPCIÓN 2: Pegar JSON de Service Account manualmente")
    print("-" * 70)
    print()
    print("Pasos para obtener las credenciales:")
    print()
    print("1. Ve a Google Cloud Console:")
    print("   https://console.cloud.google.com")
    print()
    print("2. Selecciona tu proyecto o crea uno nuevo")
    print()
    print("3. Ve a 'IAM y administración' > 'Cuentas de servicio'")
    print()
    print("4. Crea una cuenta de servicio (o usa una existente)")
    print()
    print("5. Genera una clave JSON:")
    print("   - Click en la cuenta de servicio")
    print("   - Pestaña 'Claves'")
    print("   - 'Agregar clave' > 'Crear clave nueva' > JSON")
    print()
    print("6. Copia TODO el contenido del archivo JSON descargado")
    print()
    print("7. Pégalo aquí (presiona Enter dos veces cuando termines):")
    print("-" * 70)
    
    # Leer JSON línea por línea
    json_lines = []
    print("(Pega el JSON y presiona Enter dos veces)")
    print()
    
    while True:
        try:
            line = input()
            if not line and json_lines:  # Si hay línea vacía y ya hay contenido
                break
            if line:
                json_lines.append(line)
        except EOFError:
            break
    
    if not json_lines:
        print("\n❌ No se ingresó ningún JSON")
        return False
    
    # Parsear JSON
    json_str = '\n'.join(json_lines)
    try:
        service_account_json = json.loads(json_str)
        print("\n✅ JSON parseado correctamente")
        
        # Verificar campos requeridos
        required_fields = ['type', 'project_id', 'private_key_id', 'private_key', 'client_email']
        missing_fields = [f for f in required_fields if f not in service_account_json]
        
        if missing_fields:
            print(f"❌ Faltan campos requeridos: {', '.join(missing_fields)}")
            return False
        
        print(f"✅ Service Account: {service_account_json.get('client_email')}")
        print(f"✅ Project ID: {service_account_json.get('project_id')}")
        
    except json.JSONDecodeError as e:
        print(f"\n❌ Error al parsear JSON: {e}")
        print("Asegúrate de copiar TODO el contenido del archivo JSON")
        return False
    
    # Pedir URL del sitio
    print("\n" + "="*70)
    print("📍 Configuración del sitio")
    print("-" * 70)
    print()
    
    site_url = input("Ingresa la URL de tu sitio (ej: https://justdev.it): ").strip()
    if not site_url:
        site_url = "https://justdev.it"
    
    # Normalizar URL
    if not site_url.startswith('http'):
        site_url = 'https://' + site_url
    if not site_url.endswith('/'):
        site_url += '/'
    
    # Crear config
    config = {
        "propertyUrl": site_url,
        "serviceAccountJson": service_account_json,
        "analyticsPropertyId": "G-E47YX9JYCS",
        "measurementId": "G-E47YX9JYCS"
    }
    
    save_config(config)
    return True

def save_config(config):
    """Guardar configuración en archivo JSON"""
    
    # Crear carpeta config si no existe
    os.makedirs('config', exist_ok=True)
    
    config_path = 'config/config.json'
    
    try:
        with open(config_path, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
        
        print("\n" + "="*70)
        print("✅ CONFIGURACIÓN GUARDADA EXITOSAMENTE")
        print("="*70)
        print()
        print(f"📁 Archivo creado: {config_path}")
        print()
        print("📊 Configuración:")
        print(f"   • Sitio: {config['propertyUrl']}")
        print(f"   • Service Account: {config['serviceAccountJson'].get('client_email')}")
        print(f"   • Project ID: {config['serviceAccountJson'].get('project_id')}")
        print()
        print("="*70)
        print()
        print("🎯 PRÓXIMOS PASOS:")
        print()
        print("1. Asegúrate de que la cuenta de servicio tenga permisos en:")
        print("   • Google Search Console (propietario o editor)")
        print("   • Google Analytics (si usas Analytics)")
        print()
        print("2. Inicia el API Server:")
        print("   python api-server-realtime.py")
        print()
        print("3. Inicia el Dashboard:")
        print("   python -m http.server 8001")
        print()
        print("4. Abre http://localhost:8001 y presiona 'Actualizar Datos'")
        print()
        print("="*70)
        
        return True
        
    except Exception as e:
        print(f"\n❌ Error al guardar config.json: {e}")
        return False

if __name__ == "__main__":
    try:
        success = create_config_interactive()
        if not success:
            print("\n⚠️  La configuración no se completó correctamente")
            exit(1)
    except KeyboardInterrupt:
        print("\n\n⚠️  Configuración cancelada por el usuario")
        exit(1)
    except Exception as e:
        print(f"\n❌ Error inesperado: {e}")
        exit(1)
