"""
Script para crear config.json desde el archivo de credenciales descargado
"""
import json
import os
import sys

def create_config():
    """Crear config.json desde las credenciales descargadas"""
    
    # Ruta al archivo de credenciales (ahora en la carpeta local)
    credentials_path = "credentials.json"
    
    print("=" * 60)
    print("Creando config.json para el dashboard SEO")
    print("=" * 60)
    print()
    
    # Verificar que existe el archivo de credenciales
    if not os.path.exists(credentials_path):
        print(f"❌ ERROR: No se encuentra el archivo de credenciales:")
        print(f"   {credentials_path}")
        print()
        print("Por favor verifica que el archivo credentials.json existe")
        print("en la carpeta seo-dashboard.")
        return False
    
    # Leer las credenciales
    print(f"✅ Leyendo credenciales desde:")
    print(f"   {credentials_path}")
    print()
    
    try:
        with open(credentials_path, 'r', encoding='utf-8') as f:
            service_account_json = json.load(f)
    except Exception as e:
        print(f"❌ ERROR al leer el archivo: {e}")
        return False
    
    # Crear la configuración completa
    # IMPORTANTE: La propiedad es de tipo dominio, usa el formato sc-domain:
    config = {
        "propertyUrl": "sc-domain:justdev.it",
        "serviceAccountJson": service_account_json,
        "analyticsPropertyId": "G-E47YX9JYCS",
        "measurementId": "G-E47YX9JYCS"
    }
    
    # Guardar en config.json
    config_file = 'config.json'
    
    try:
        with open(config_file, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Archivo config.json creado exitosamente!")
        print()
        print(f"   Ubicación: {os.path.abspath(config_file)}")
        print()
        print("Configuración guardada:")
        print(f"  - Property URL: {config['propertyUrl']}")
        print(f"  - Service Account: {service_account_json.get('client_email', 'N/A')}")
        print(f"  - Analytics ID: {config['analyticsPropertyId']}")
        print()
        print("=" * 60)
        print("✅ Configuración completada!")
        print("=" * 60)
        print()
        print("Ahora puedes ejecutar:")
        print("  .\\actualizar-seo-automatico.bat")
        print()
        
        return True
        
    except Exception as e:
        print(f"❌ ERROR al guardar config.json: {e}")
        return False

if __name__ == '__main__':
    success = create_config()
    sys.exit(0 if success else 1)
