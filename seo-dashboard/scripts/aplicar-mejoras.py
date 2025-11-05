"""
🔧 APLICAR MEJORAS AUTOMÁTICAS
Script para aplicar las mejoras generadas al archivo index.html
"""

import json
import re
from pathlib import Path
from datetime import datetime
import shutil

class ImprovementApplicator:
    def __init__(self, improvements_file, landing_page_path):
        self.improvements_file = Path(improvements_file)
        self.landing_page_path = Path(landing_page_path)
        self.improvements_data = self.load_improvements()
        self.backup_path = None
        
    def load_improvements(self):
        """Cargar archivo de mejoras"""
        with open(self.improvements_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def create_backup(self):
        """Crear backup del archivo original"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_dir = Path('backups')
        backup_dir.mkdir(exist_ok=True)
        
        self.backup_path = backup_dir / f"index_backup_{timestamp}.html"
        shutil.copy2(self.landing_page_path, self.backup_path)
        
        print(f"✅ Backup creado: {self.backup_path}")
        return self.backup_path
    
    def read_landing_page(self):
        """Leer contenido del archivo"""
        with open(self.landing_page_path, 'r', encoding='utf-8') as f:
            return f.read()
    
    def write_landing_page(self, content):
        """Escribir contenido al archivo"""
        with open(self.landing_page_path, 'w', encoding='utf-8') as f:
            f.write(content)
    
    def apply_title_improvement(self, improvement, content):
        """Aplicar mejora al <title>"""
        old_title = improvement['current']
        new_title = improvement['suggested']
        
        # Buscar y reemplazar el title
        pattern = r'<title>.*?</title>'
        new_tag = f'<title>{new_title}</title>'
        
        if re.search(pattern, content, re.IGNORECASE):
            content = re.sub(pattern, new_tag, content, flags=re.IGNORECASE)
            print(f"  ✅ Title actualizado")
            print(f"     Antes: {old_title[:60]}...")
            print(f"     Ahora: {new_title[:60]}...")
            return content, True
        else:
            print(f"  ❌ No se encontró el tag <title>")
            return content, False
    
    def apply_meta_description_improvement(self, improvement, content):
        """Aplicar mejora a meta description"""
        new_description = improvement['suggested']
        
        # Buscar meta description existente
        pattern = r'<meta\s+name=["\']description["\']\s+content=["\'][^"\']*["\']'
        new_tag = f'<meta name="description" content="{new_description}"'
        
        if re.search(pattern, content, re.IGNORECASE):
            content = re.sub(pattern, new_tag, content, flags=re.IGNORECASE)
            print(f"  ✅ Meta description actualizada")
            print(f"     Nuevo: {new_description[:60]}...")
            return content, True
        else:
            # Si no existe, agregarla en el <head>
            head_pattern = r'</head>'
            insertion = f'  <meta name="description" content="{new_description}">\n</head>'
            content = re.sub(head_pattern, insertion, content, flags=re.IGNORECASE)
            print(f"  ✅ Meta description agregada")
            return content, True
    
    def apply_add_heading_improvement(self, improvement, content):
        """Agregar un nuevo H2"""
        new_heading = improvement['suggested']
        
        # Encontrar el primer H2 y agregar después de él
        pattern = r'(<h2[^>]*>.*?</h2>)'
        
        match = re.search(pattern, content, re.IGNORECASE | re.DOTALL)
        if match:
            insert_position = match.end()
            content = content[:insert_position] + '\n\n' + new_heading + content[insert_position:]
            print(f"  ✅ Heading agregado")
            print(f"     {new_heading}")
            return content, True
        else:
            print(f"  ⚠️  No se encontró ubicación para agregar heading")
            return content, False
    
    def apply_add_section_improvement(self, improvement, content):
        """Agregar una nueva sección de contenido"""
        new_section = improvement['suggested']
        
        # Buscar el footer o el final del body para insertar antes
        pattern = r'(<footer|</body>)'
        
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            insert_position = match.start()
            content = content[:insert_position] + '\n' + new_section + '\n' + content[insert_position:]
            print(f"  ✅ Sección agregada")
            keyword = improvement.get('id', '').replace('add_section_', '').replace('_', ' ')
            print(f"     Sección para: {keyword}")
            return content, True
        else:
            print(f"  ⚠️  No se encontró ubicación para agregar sección")
            return content, False
    
    def apply_improvement(self, improvement, content):
        """Aplicar una mejora específica según su tipo"""
        improvement_type = improvement['type']
        
        if improvement_type == 'title':
            return self.apply_title_improvement(improvement, content)
        elif improvement_type == 'meta_description':
            return self.apply_meta_description_improvement(improvement, content)
        elif improvement_type == 'add_heading':
            return self.apply_add_heading_improvement(improvement, content)
        elif improvement_type == 'add_section':
            return self.apply_add_section_improvement(improvement, content)
        else:
            print(f"  ⚠️  Tipo de mejora no soportado: {improvement_type}")
            return content, False
    
    def apply_all_improvements(self, priorities=['high']):
        """Aplicar todas las mejoras de las prioridades especificadas"""
        print("="*60)
        print("🔧 APLICANDO MEJORAS AUTOMÁTICAS")
        print("="*60)
        
        # Crear backup
        self.create_backup()
        
        # Leer contenido
        content = self.read_landing_page()
        print(f"✅ Archivo leído: {self.landing_page_path}")
        print(f"   Tamaño: {len(content):,} caracteres")
        
        # Filtrar mejoras por prioridad
        improvements = [
            imp for imp in self.improvements_data['improvements']
            if imp['priority'] in priorities
        ]
        
        print(f"\n📋 Mejoras a aplicar: {len(improvements)}")
        print(f"   Prioridades: {', '.join(priorities)}")
        print()
        
        applied_count = 0
        failed_count = 0
        
        for i, improvement in enumerate(improvements, 1):
            print(f"\n{'='*60}")
            print(f"🔄 MEJORA #{i}/{len(improvements)}")
            print(f"   ID: {improvement['id']}")
            print(f"   Tipo: {improvement['type']}")
            print(f"   Prioridad: {improvement['priority']}")
            print(f"   Razón: {improvement['reason']}")
            
            content, success = self.apply_improvement(improvement, content)
            
            if success:
                applied_count += 1
            else:
                failed_count += 1
        
        # Guardar cambios
        if applied_count > 0:
            self.write_landing_page(content)
            print(f"\n{'='*60}")
            print(f"✅ CAMBIOS GUARDADOS")
            print(f"{'='*60}")
            print(f"✅ Mejoras aplicadas: {applied_count}")
            print(f"❌ Mejoras fallidas: {failed_count}")
            print(f"📄 Archivo actualizado: {self.landing_page_path}")
            print(f"💾 Backup disponible: {self.backup_path}")
        else:
            print(f"\n⚠️  No se aplicaron cambios")
        
        return applied_count, failed_count
    
    def show_improvements_summary(self):
        """Mostrar resumen de mejoras disponibles"""
        print("="*60)
        print("📊 RESUMEN DE MEJORAS DISPONIBLES")
        print("="*60)
        
        improvements = self.improvements_data['improvements']
        
        by_priority = {'high': [], 'medium': [], 'low': []}
        for imp in improvements:
            by_priority[imp['priority']].append(imp)
        
        print(f"\n🔴 Alta Prioridad: {len(by_priority['high'])} mejoras")
        for imp in by_priority['high']:
            print(f"   - {imp['type']}: {imp['reason'][:60]}...")
        
        print(f"\n🟡 Media Prioridad: {len(by_priority['medium'])} mejoras")
        for imp in by_priority['medium']:
            print(f"   - {imp['type']}: {imp['reason'][:60]}...")
        
        print(f"\n🟢 Baja Prioridad: {len(by_priority['low'])} mejoras")
        for imp in by_priority['low']:
            print(f"   - {imp['type']}: {imp['reason'][:60]}...")


# =============================================================================
# EJECUCIÓN PRINCIPAL
# =============================================================================

if __name__ == "__main__":
    import sys
    
    print("="*60)
    print("🤖 APLICADOR DE MEJORAS AUTOMÁTICAS")
    print("="*60)
    print()
    
    improvements_file = "data/improvements.json"
    landing_page_path = "../index.html"
    
    # Verificar que existan los archivos
    if not Path(improvements_file).exists():
        print(f"❌ No se encontró {improvements_file}")
        print("   Ejecuta primero: python scripts/generar-mejoras-automaticas.py")
        sys.exit(1)
    
    if not Path(landing_page_path).exists():
        print(f"❌ No se encontró {landing_page_path}")
        sys.exit(1)
    
    # Crear aplicador
    applicator = ImprovementApplicator(improvements_file, landing_page_path)
    
    # Mostrar resumen
    applicator.show_improvements_summary()
    
    print()
    print("="*60)
    print("⚠️  IMPORTANTE: Se creará un backup antes de aplicar cambios")
    print("="*60)
    print()
    
    # Preguntar al usuario
    print("¿Qué mejoras quieres aplicar?")
    print("1. Solo Alta Prioridad (recomendado)")
    print("2. Alta + Media Prioridad")
    print("3. Todas las mejoras")
    print("4. Cancelar")
    print()
    
    choice = input("Selecciona una opción (1-4): ").strip()
    
    if choice == '1':
        applied, failed = applicator.apply_all_improvements(priorities=['high'])
    elif choice == '2':
        applied, failed = applicator.apply_all_improvements(priorities=['high', 'medium'])
    elif choice == '3':
        applied, failed = applicator.apply_all_improvements(priorities=['high', 'medium', 'low'])
    elif choice == '4':
        print("\n❌ Operación cancelada")
        sys.exit(0)
    else:
        print("\n❌ Opción inválida")
        sys.exit(1)
    
    print()
    print("="*60)
    print("✅ PROCESO COMPLETADO")
    print("="*60)
    print()
    
    if applied > 0:
        print("🎯 Próximos pasos:")
        print("1. Revisa los cambios en tu archivo index.html")
        print("2. Prueba tu sitio web localmente")
        print(f"3. Si algo sale mal, restaura el backup: {applicator.backup_path}")
        print("4. Sube los cambios a producción")
        print()
        print("💡 Consejo: Ejecuta el script de actualización de datos para ver el impacto")
        print("   python scripts/actualizar-datos-manual.py")
