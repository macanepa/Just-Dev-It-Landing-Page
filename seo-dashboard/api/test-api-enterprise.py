"""
Script de prueba para el servidor API empresarial
Prueba los nuevos endpoints con datos reales
"""
import requests
import json

# URL del servidor
BASE_URL = "http://localhost:5000"

def test_health():
    """Probar endpoint de salud"""
    print("=" * 60)
    print("TEST 1: Health Check")
    print("=" * 60)
    
    response = requests.get(f"{BASE_URL}/api/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    print()

def test_comprehensive_keywords():
    """Probar análisis completo de keywords"""
    print("=" * 60)
    print("TEST 2: Análisis Completo de Keywords")
    print("=" * 60)
    
    # Cargar configuración
    with open('config.json', 'r', encoding='utf-8') as f:
        config = json.load(f)
    
    data = {
        'property_url': config['propertyUrl'],
        'credentials': config['serviceAccountJson'],
        'days': 30  # Últimos 30 días
    }
    
    print("Enviando petición... (puede tomar 10-30 segundos)")
    response = requests.post(
        f"{BASE_URL}/api/keywords/comprehensive",
        json=data,
        timeout=60
    )
    
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n✅ ÉXITO!")
        print(f"Total keywords analizadas: {result['total_keywords']}")
        print(f"\nResumen:")
        summary = result['summary']
        print(f"  - High Priority: {summary['high_priority']}")
        print(f"  - Medium Priority: {summary['medium_priority']}")
        print(f"  - Low Priority: {summary['low_priority']}")
        print(f"  - Top 3: {summary['top_3_positions']}")
        print(f"  - Top 10: {summary['top_10_positions']}")
        print(f"  - Total Impressions: {summary['total_impressions']:,}")
        print(f"  - Total Clicks: {summary['total_clicks']}")
        print(f"  - Avg CTR: {summary['avg_ctr']}%")
        print(f"  - Avg Position: {summary['avg_position']}")
        
        print(f"\nTop 10 Keywords por Prioridad:")
        for i, kw in enumerate(result['keywords'][:10], 1):
            print(f"\n{i}. {kw['keyword']}")
            print(f"   Posición: {kw['avg_position']} | CTR: {kw['ctr']}% | Impressions: {kw['impressions']}")
            print(f"   Prioridad: {kw['priority']}/100 | Potencial: {kw['conversion_potential']}/100")
            print(f"   Oportunidad: {kw['improvement_opportunity']}/100")
    else:
        print(f"❌ Error: {response.text}")
    
    print()

def test_suggestions():
    """Probar generación de sugerencias"""
    print("=" * 60)
    print("TEST 3: Generación de Sugerencias Inteligentes")
    print("=" * 60)
    
    print("Generando sugerencias...")
    response = requests.post(
        f"{BASE_URL}/api/suggestions/generate",
        json={},
        timeout=30
    )
    
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        suggestions = result['suggestions']
        
        print(f"\n✅ ÉXITO!")
        print(f"\nAcciones Prioritarias: {len(suggestions['priority_actions'])}")
        for i, action in enumerate(suggestions['priority_actions'][:5], 1):
            print(f"\n{i}. [{action['priority']}] {action['type']}")
            print(f"   Keyword: {action['keyword']}")
            print(f"   Acción: {action['action']}")
            print(f"   Impacto: {action['expected_impact']}")
            print(f"   Esfuerzo: {action['estimated_effort']}")
        
        print(f"\n\nOportunidades de Keywords: {len(suggestions['keyword_opportunities'])}")
        for i, opp in enumerate(suggestions['keyword_opportunities'][:3], 1):
            print(f"\n{i}. Base: {opp['base_keyword']}")
            print(f"   Variaciones sugeridas: {', '.join(opp['suggested_variations'][:3])}")
        
        print(f"\n\nSugerencias de Contenido: {len(suggestions['content_suggestions'])}")
        for i, content in enumerate(suggestions['content_suggestions'][:3], 1):
            print(f"\n{i}. Tema: {content['theme']}")
            print(f"   Keywords: {content['keywords_count']} | Impressions: {content['total_impressions']:,}")
            print(f"   Tipo: {content['content_type']} | Longitud: {content['estimated_length']}")
    else:
        print(f"❌ Error: {response.text}")
    
    print()

if __name__ == '__main__':
    print("\n🧪 PRUEBAS DEL SERVIDOR API EMPRESARIAL\n")
    
    try:
        # Test 1: Health check
        test_health()
        
        # Test 2: Análisis completo de keywords
        test_comprehensive_keywords()
        
        # Test 3: Sugerencias inteligentes
        test_suggestions()
        
        print("=" * 60)
        print("✅ TODAS LAS PRUEBAS COMPLETADAS")
        print("=" * 60)
        
    except requests.exceptions.ConnectionError:
        print("❌ ERROR: No se puede conectar al servidor.")
        print("Asegúrate de que el servidor esté corriendo: python api-server-enterprise.py")
    except Exception as e:
        print(f"❌ ERROR: {e}")
