"""
🤖 SISTEMA DE MEJORAS AUTOMÁTICAS PARA LANDING PAGE
Analiza tu sitio web y genera optimizaciones SEO automáticas
"""

import json
import os
from datetime import datetime
from pathlib import Path
import re
import unicodedata

class LandingPageOptimizer:
    def __init__(self, landing_page_path, keywords_data_path):
        self.landing_page_path = Path(landing_page_path)
        self.keywords_data_path = Path(keywords_data_path)
        self.keywords_data = self.load_keywords()
        self.improvements = []
        self.landing_content = None  # Cache del contenido
        
    def load_keywords(self):
        """Cargar datos de keywords"""
        with open(self.keywords_data_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def normalize_text(self, text):
        """Normalizar texto para comparaciones (sin alterar el original)"""
        # Convertir a NFD (descomponer caracteres con tildes)
        nfd = unicodedata.normalize('NFD', text)
        # Remover marcas diacríticas
        without_accents = ''.join(c for c in nfd if unicodedata.category(c) != 'Mn')
        return without_accents.lower()
    
    def validate_grammar(self, text):
        """Validar gramática exhaustiva: mayúsculas, tildes, puntuación"""
        issues = []
        
        # 1. Verificar primera letra mayúscula en oraciones
        sentences = re.split(r'[.!?]\s+', text)
        for i, sentence in enumerate(sentences):
            if sentence and not sentence[0].isupper():
                issues.append(f"Oración {i+1} debe empezar con mayúscula: '{sentence[:30]}...'")
        
        # 2. Verificar que nombres propios comunes estén capitalizados
        proper_nouns = ['fintech', 'proptech', 'energía', 'santiago', 'chile', 'justdev', 'just dev it']
        text_lower = text.lower()
        for noun in proper_nouns:
            if noun in text_lower:
                # Buscar si está correctamente capitalizado
                pattern = r'\b' + re.escape(noun) + r'\b'
                if re.search(pattern, text, re.IGNORECASE):
                    capitalized = noun.title()
                    if capitalized not in text and noun.upper() not in text:
                        issues.append(f"'{noun}' debería estar capitalizado como '{capitalized}'")
        
        # 3. Verificar tildes en palabras comunes
        common_words = {
            'energia': 'energía',
            'tecnologia': 'tecnología',
            'solucion': 'solución',
            'informacion': 'información',
            'mas': 'más',
            'rapido': 'rápido',
            'codigo': 'código',
            'automatico': 'automático'
        }
        for wrong, correct in common_words.items():
            if wrong in text.lower() and correct not in text.lower():
                issues.append(f"Falta tilde: '{wrong}' → '{correct}'")
        
        # 4. Verificar puntuación correcta
        if text and not text[-1] in '.!?':
            issues.append("Falta puntuación final (. ! ?)")
        
        # Verificar espacios antes de puntuación
        if re.search(r'\s+[.,;!?]', text):
            issues.append("No debe haber espacio antes de puntuación")
        
        return issues
    
    def detect_visibility(self, improvement_type, target_element):
        """
        Detectar si un cambio es VISIBLE o INVISIBLE para el usuario
        
        INVISIBLE: title, meta tags, alt text, comentarios HTML
        VISIBLE: contenido en <p>, <h1-h6>, <span>, <div> con texto visible, data-i18n
        """
        invisible_types = [
            'title',           # <title> tag
            'meta_description', # meta description
            'alt_text',        # atributos alt de imágenes
            'schema_markup',   # structured data
            'canonical_url',   # canonical link
            'og_tags',         # Open Graph tags
            'twitter_cards'    # Twitter meta tags
        ]
        
        visible_types = [
            'add_section',     # Nueva sección de contenido
            'add_heading',     # Nuevos títulos H2/H3
            'modify_text',     # Modificar texto visible
            'add_paragraph',   # Agregar párrafos
            'i18n_content'     # Contenido con data-i18n
        ]
        
        if improvement_type in invisible_types:
            return 'invisible'
        elif improvement_type in visible_types:
            return 'visible'
        else:
            # Analizar el target_element si contiene data-i18n o es contenido visible
            if target_element:
                if 'data-i18n' in target_element:
                    return 'visible-i18n'  # Visible y necesita traducción
                elif any(tag in target_element for tag in ['<p', '<h', '<span', '<div']):
                    return 'visible'
            return 'invisible'
    
    def extract_i18n_keys(self, html_element):
        """Extraer keys de data-i18n de un elemento HTML"""
        matches = re.findall(r'data-i18n(?:-html)?=["\']([^"\']+)["\']', html_element)
        return matches
    
    def analyze_landing_page(self):
        """Analizar la landing page actual"""
        if not self.landing_page_path.exists():
            print(f"❌ No se encontró la landing page en: {self.landing_page_path}")
            return None
            
        with open(self.landing_page_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        analysis = {
            'title': self.extract_title(content),
            'meta_description': self.extract_meta_description(content),
            'h1_tags': self.extract_h1_tags(content),
            'h2_tags': self.extract_h2_tags(content),
            'content_length': len(content),
            'keywords_in_content': self.find_keywords_in_content(content),
            'missing_keywords': self.find_missing_keywords(content)
        }
        
        return analysis
    
    def extract_title(self, content):
        """Extraer el <title> actual"""
        match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
        return match.group(1) if match else None
    
    def extract_meta_description(self, content):
        """Extraer la meta description"""
        match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']+)["\']', content, re.IGNORECASE)
        return match.group(1) if match else None
    
    def extract_h1_tags(self, content):
        """Extraer todos los H1"""
        return re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
    
    def extract_h2_tags(self, content):
        """Extraer todos los H2"""
        return re.findall(r'<h2[^>]*>(.*?)</h2>', content, re.IGNORECASE | re.DOTALL)
    
    def find_keywords_in_content(self, content):
        """Encontrar qué keywords están presentes"""
        content_lower = content.lower()
        found = []
        
        for kw_data in self.keywords_data['keywords']:
            keyword = kw_data['keyword'].lower()
            count = content_lower.count(keyword)
            if count > 0:
                found.append({
                    'keyword': kw_data['keyword'],
                    'count': count,
                    'position': kw_data['position'],
                    'impressions': kw_data['impressions'],
                    'clicks': kw_data['clicks']
                })
        
        return found
    
    def find_missing_keywords(self, content):
        """Encontrar keywords con buena posición que NO están en el contenido"""
        content_lower = content.lower()
        missing = []
        
        for kw_data in self.keywords_data['keywords']:
            keyword = kw_data['keyword'].lower()
            
            # Filtrar keywords sin sentido gramatical
            if any(pattern in keyword for pattern in ['devs it', 'dev it', 'it just it', 'just it']):
                continue
            
            # Si tiene buena posición (top 20) pero no está en el contenido
            if kw_data['position'] <= 20 and content_lower.count(keyword) == 0:
                # Verificar que sea una keyword útil (2+ palabras o sustantivo claro)
                if len(keyword.split()) >= 2 or keyword in ['justdev', 'desarrollo', 'software']:
                    missing.append({
                        'keyword': kw_data['keyword'],
                        'position': kw_data['position'],
                        'impressions': kw_data['impressions'],
                        'opportunity': 'high' if kw_data['position'] <= 10 else 'medium'
                    })
        
        return missing
    
    def generate_improvements(self):
        """Generar lista de mejoras recomendadas"""
        print("\n" + "="*60)
        print("🔍 ANALIZANDO LANDING PAGE")
        print("="*60)
        
        analysis = self.analyze_landing_page()
        if not analysis:
            return
        
        print(f"✅ Página: {self.landing_page_path.name}")
        print(f"📄 Tamaño: {analysis['content_length']:,} caracteres")
        print(f"🔤 Title actual: {analysis['title']}")
        print(f"📝 Meta description: {analysis['meta_description'][:80]}..." if analysis['meta_description'] else "❌ Sin meta description")
        print(f"📌 H1 tags: {len(analysis['h1_tags'])}")
        print(f"📌 H2 tags: {len(analysis['h2_tags'])}")
        print(f"✅ Keywords encontradas: {len(analysis['keywords_in_content'])}")
        print(f"⚠️  Keywords faltantes: {len(analysis['missing_keywords'])}")
        
        print("\n" + "="*60)
        print("💡 GENERANDO MEJORAS RECOMENDADAS")
        print("="*60)
        
        self.improvements = []
        
        # MEJORA 1: Optimizar Title (INVISIBLE - no se ve en la página)
        if analysis['title']:
            top_keyword = self.get_top_keyword()
            if top_keyword and top_keyword['keyword'].lower() not in analysis['title'].lower():
                current_title = analysis['title']
                suggested_title = f"{top_keyword['keyword']} - {analysis['title']}"
                
                # Validar gramática del title sugerido
                grammar_issues = self.validate_grammar(suggested_title)
                
                self.improvements.append({
                    'id': 'improve_title',
                    'type': 'title',
                    'priority': 'high',
                    'visibility': 'invisible',  # Title no se ve en la página
                    'current': current_title,
                    'suggested': suggested_title,
                    'reason': f"Incluir keyword '{top_keyword['keyword']}' (posición #{top_keyword['position']:.1f}) en el title",
                    'impact': 'high',
                    'grammar_valid': len(grammar_issues) == 0,
                    'grammar_issues': grammar_issues if grammar_issues else None
                })
        
        # MEJORA 2: Agregar/Mejorar Meta Description (INVISIBLE - meta tag)
        if not analysis['meta_description'] or len(analysis['meta_description']) < 120:
            top_keywords = self.get_top_keywords(3)
            keywords_text = ", ".join([kw['keyword'] for kw in top_keywords])
            suggested_meta = f"Desarrollo web profesional con {keywords_text}. Soluciones tecnológicas innovadoras para tu negocio. ¡Contacta ahora!"
            
            # Validar gramática
            grammar_issues = self.validate_grammar(suggested_meta)
            
            self.improvements.append({
                'id': 'improve_meta_description',
                'type': 'meta_description',
                'priority': 'high',
                'visibility': 'invisible',  # Meta description no se ve en la página
                'current': analysis['meta_description'] or 'Sin meta description',
                'suggested': suggested_meta,
                'reason': 'Meta description muy corta o inexistente',
                'impact': 'high',
                'grammar_valid': len(grammar_issues) == 0,
                'grammar_issues': grammar_issues if grammar_issues else None
            })
        
        # MEJORA 3: Agregar keywords faltantes en H2 (VISIBLE - títulos en la página)
        for missing in analysis['missing_keywords'][:3]:  # Top 3 missing
            suggested_h2 = f"<h2>Servicios de {missing['keyword'].title()}</h2>"
            grammar_issues = self.validate_grammar(missing['keyword'].title())
            
            self.improvements.append({
                'id': f"add_h2_{missing['keyword'].replace(' ', '_')}",
                'type': 'add_heading',
                'priority': 'medium' if missing['opportunity'] == 'high' else 'low',
                'visibility': 'visible',  # H2 es visible en la página
                'requires_i18n': True,    # Necesita traducción
                'current': 'N/A',
                'suggested': suggested_h2,
                'reason': f"Keyword '{missing['keyword']}' en posición #{missing['position']:.1f} pero no está en el contenido",
                'impact': 'medium',
                'grammar_valid': len(grammar_issues) == 0,
                'grammar_issues': grammar_issues if grammar_issues else None
            })
        
        # MEJORA 4: Agregar secciones de contenido (VISIBLE - contenido en la página)
        for kw in self.get_high_opportunity_keywords():
            suggested_section = self.generate_section_content(kw['keyword'])
            
            # Validar gramática del contenido generado
            grammar_issues = self.validate_grammar(kw['keyword'])
            
            self.improvements.append({
                'id': f"add_section_{kw['keyword'].replace(' ', '_')}",
                'type': 'add_section',
                'priority': 'medium',
                'visibility': 'visible',  # Sección es visible
                'requires_i18n': True,    # Necesita traducción
                'current': 'N/A',
                'suggested': suggested_section,
                'reason': f"Keyword con {kw['impressions']} impresiones pero sin clicks - necesita contenido",
                'impact': 'medium',
                'grammar_valid': len(grammar_issues) == 0,
                'grammar_issues': grammar_issues if grammar_issues else None
            })
        
        # Mostrar resumen
        print(f"\n✅ Total de mejoras generadas: {len(self.improvements)}")
        print(f"   🔴 Alta prioridad: {len([i for i in self.improvements if i['priority'] == 'high'])}")
        print(f"   🟡 Media prioridad: {len([i for i in self.improvements if i['priority'] == 'medium'])}")
        print(f"   🟢 Baja prioridad: {len([i for i in self.improvements if i['priority'] == 'low'])}")
        print(f"\n   👁️  Cambios INVISIBLES (seguros): {len([i for i in self.improvements if i.get('visibility') == 'invisible'])}")
        print(f"   👀 Cambios VISIBLES (revisar): {len([i for i in self.improvements if i.get('visibility') == 'visible'])}")
        
        return self.improvements
    
    def get_top_keyword(self):
        """Obtener la keyword #1 con mejor posición Y que tenga sentido"""
        keywords = sorted(self.keywords_data['keywords'], key=lambda x: x['position'])
        
        # Filtrar keywords que no tienen sentido gramatical
        valid_keywords = []
        for kw in keywords:
            keyword_lower = kw['keyword'].lower()
            # Excluir keywords sin sentido o muy cortas sin verbo/sustantivo claro
            if (len(keyword_lower.split()) >= 2 or  # 2+ palabras OK
                keyword_lower in ['justdev', 'just dev', 'desarrollo', 'software']):  # Excepciones válidas
                # Excluir patterns sin sentido como "devs it", "dev it", etc
                if not any(pattern in keyword_lower for pattern in ['devs it', 'dev it', 'it just it', 'just it']):
                    valid_keywords.append(kw)
        
        return valid_keywords[0] if valid_keywords else None
    
    def get_top_keywords(self, n=3):
        """Obtener las top N keywords con sentido gramatical"""
        keywords = sorted(self.keywords_data['keywords'], key=lambda x: x['position'])
        
        # Filtrar keywords válidas
        valid_keywords = []
        for kw in keywords:
            keyword_lower = kw['keyword'].lower()
            # Excluir keywords sin sentido
            if not any(pattern in keyword_lower for pattern in ['devs it', 'dev it', 'it just it', 'just it']):
                # Preferir keywords con sustantivos claros
                if len(keyword_lower.split()) >= 2 or keyword_lower in ['justdev', 'desarrollo', 'software', 'programación']:
                    valid_keywords.append(kw)
        
        return valid_keywords[:n]
    
    def get_high_opportunity_keywords(self):
        """Keywords con impresiones pero sin clicks Y que tengan sentido"""
        candidates = [kw for kw in self.keywords_data['keywords'] 
                     if kw['impressions'] > 0 and kw['clicks'] == 0]
        
        # Filtrar keywords válidas
        valid = []
        for kw in candidates:
            keyword_lower = kw['keyword'].lower()
            # Excluir keywords sin sentido
            if not any(pattern in keyword_lower for pattern in ['devs it', 'dev it', 'it just it', 'just it']):
                # Preferir keywords descriptivas
                if len(keyword_lower.split()) >= 2 or keyword_lower in ['justdev', 'desarrollo', 'software']:
                    valid.append(kw)
        
        return valid[:3]
    
    def generate_section_content(self, keyword):
        """Generar contenido relevante para una sección"""
        keyword_title = keyword.title()
        
        # Personalizar según la keyword
        if 'deploy' in keyword.lower():
            return f"""
<section class="service-section">
    <h2>Deployment Profesional con {keyword_title}</h2>
    <p>¿Necesitas implementar tu proyecto en producción? En Just Dev It ofrecemos servicios 
    especializados de deployment y DevOps para asegurar que tu aplicación esté siempre disponible.</p>
    <div class="features-grid">
        <div class="feature">
            <i class="fas fa-rocket"></i>
            <h3>CI/CD Automatizado</h3>
            <p>Pipeline de deployment continuo con GitHub Actions, Jenkins o GitLab CI</p>
        </div>
        <div class="feature">
            <i class="fas fa-server"></i>
            <h3>Infraestructura Cloud</h3>
            <p>AWS, Azure, Google Cloud - Configuración optimizada para tu proyecto</p>
        </div>
        <div class="feature">
            <i class="fas fa-shield-alt"></i>
            <h3>Monitoreo 24/7</h3>
            <p>Alertas automáticas, logs centralizados y respuesta rápida ante incidentes</p>
        </div>
    </div>
    <a href="#contacto" class="btn-primary">Consultar Deployment</a>
</section>
"""
        elif 'dev' in keyword.lower() and 'just' in keyword.lower():
            return f"""
<section class="service-section">
    <h2>Desarrollo a Medida con {keyword_title}</h2>
    <p>Transformamos tus ideas en soluciones digitales robustas y escalables. Nuestro equipo 
    especializado en Fintech, Energía y PropTech está listo para impulsar tu proyecto.</p>
    <div class="benefits">
        <div class="benefit">
            <i class="fas fa-code"></i>
            <strong>Código de Calidad</strong>
            <p>Arquitectura limpia, pruebas automatizadas y documentación completa</p>
        </div>
        <div class="benefit">
            <i class="fas fa-clock"></i>
            <strong>Entregas Ágiles</strong>
            <p>Metodología Scrum, sprints de 2 semanas y feedback continuo</p>
        </div>
        <div class="benefit">
            <i class="fas fa-users"></i>
            <strong>Equipo Experto</strong>
            <p>Desarrolladores senior con experiencia en proyectos complejos</p>
        </div>
    </div>
    <a href="#contacto" class="btn-primary">Iniciar Proyecto</a>
</section>
"""
        else:
            return f"""
<section class="service-section">
    <h2>Soluciones en {keyword_title}</h2>
    <p>En Just Dev It desarrollamos software a medida para empresas que buscan innovar. 
    Especializados en Fintech, Energía y PropTech, entregamos soluciones que generan valor real.</p>
    <ul class="service-list">
        <li><i class="fas fa-check"></i> Desarrollo Full Stack (React, Node.js, Python)</li>
        <li><i class="fas fa-check"></i> Arquitectura Cloud y Microservicios</li>
        <li><i class="fas fa-check"></i> Integración con APIs y Sistemas Legacy</li>
        <li><i class="fas fa-check"></i> Mantenimiento y Soporte Continuo</li>
    </ul>
    <a href="#contacto" class="btn-primary">Solicitar Cotización</a>
</section>
"""
    
    def save_improvements(self):
        """Guardar mejoras en JSON para el dashboard"""
        output = {
            'generated_at': datetime.now().isoformat(),
            'landing_page': str(self.landing_page_path),
            'total_improvements': len(self.improvements),
            'improvements': self.improvements
        }
        
        output_path = Path('data/improvements.json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output, f, indent=2, ensure_ascii=False)
        
        print(f"\n💾 Mejoras guardadas en: {output_path}")
        return output_path
    
    def display_improvements(self):
        """Mostrar mejoras en consola"""
        print("\n" + "="*60)
        print("📋 LISTA DE MEJORAS RECOMENDADAS")
        print("="*60)
        
        for i, improvement in enumerate(self.improvements, 1):
            priority_icon = "🔴" if improvement['priority'] == 'high' else "🟡" if improvement['priority'] == 'medium' else "🟢"
            
            print(f"\n{priority_icon} MEJORA #{i} - {improvement['type'].upper()}")
            print(f"   Prioridad: {improvement['priority'].upper()}")
            print(f"   Razón: {improvement['reason']}")
            print(f"   Impacto: {improvement['impact'].upper()}")
            print(f"   Actual: {improvement['current'][:100]}...")
            print(f"   Sugerido: {improvement['suggested'][:100]}...")


# =============================================================================
# EJECUCIÓN PRINCIPAL
# =============================================================================

if __name__ == "__main__":
    print("="*60)
    print("🤖 SISTEMA DE MEJORAS AUTOMÁTICAS - JUSTDEV.IT")
    print("="*60)
    
    # Rutas
    landing_page_path = "../index.html"  # Ajustar según ubicación
    keywords_data_path = "data/keywords-database.json"
    
    # Crear optimizador
    optimizer = LandingPageOptimizer(landing_page_path, keywords_data_path)
    
    # Generar mejoras
    improvements = optimizer.generate_improvements()
    
    if improvements:
        # Mostrar mejoras
        optimizer.display_improvements()
        
        # Guardar para dashboard
        optimizer.save_improvements()
        
        print("\n" + "="*60)
        print("✅ PROCESO COMPLETADO")
        print("="*60)
        print("🎯 Siguiente paso: Revisa las mejoras en el dashboard")
        print("📊 Archivo: data/improvements.json")
        print("🌐 Dashboard: http://localhost:5000")
    else:
        print("\n❌ No se pudieron generar mejoras")
