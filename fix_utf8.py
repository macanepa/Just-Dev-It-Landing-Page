#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script definitivo para corregir encoding UTF-8 en index.html
Funciona correctamente porque Python maneja UTF-8 nativamente
"""

import codecs
import sys

def fix_encoding(input_file, output_file):
    """Corrige todos los caracteres UTF-8 mal codificados"""
    
    # Leer el archivo con diferentes encodings para manejar la corrupción
    try:
        with codecs.open(input_file, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
    except:
        print(f"Error leyendo {input_file}")
        return False
    
    # Mapa de reemplazos
    replacements = {
        # Vocales minúsculas con acento
        'Ã³': 'ó',
        'Ã­': 'í',
        'Ã©': 'é',
        'Ã¡': 'á',
        'Ãº': 'ú',
        
        # Vocales mayúsculas con acento  
        'Ã"': 'Ó',
        'Ã': 'Í',
        'Ã‰': 'É',
        'Ã': 'Á',
        'Ãš': 'Ú',
        
        # Ñ y ñ
        'Ã±': 'ñ',
        'Ã'': 'Ñ',
        
        # Emojis
        'âœ…': '✅',
        'âš ï¸': '⚠️',
        'ðŸ'¡': '💡',
        'ðŸ"': '📝',
        'ðŸš€': '🚀',
        'ðŸ"§': '🔧',
        'ðŸ'¼': '💼',
        'ðŸ"Š': '📊',
        'ðŸ'»': '💻',
        
        # Símbolos
        'â€"': '—',
        'â€œ': '"',
        'â€': '"',
        'â€™': ''',
        'â€¢': '•',
        'Â°': '°',
        'Â©': '©',
        'Â®': '®',
    }
    
    # Aplicar reemplazos
    total = 0
    for old, new in replacements.items():
        count = content.count(old)
        if count > 0:
            content = content.replace(old, new)
            total += count
            print(f"  ✓ Reemplazado {count} ocurrencias de '{old}' -> '{new}'")
    
    # Guardar con UTF-8 limpio
    try:
        with codecs.open(output_file, 'w', encoding='utf-8', errors='replace') as f:
            f.write(content)
        print(f"\n✅ Archivo corregido: {output_file}")
        print(f"📊 Total de reemplazos: {total}")
        return True
    except Exception as e:
        print(f"❌ Error escribiendo {output_file}: {e}")
        return False

if __name__ == '__main__':
    input_file = 'index.html'
    output_file = 'index-CORREGIDO.html'
    
    print("=" * 60)
    print(" 🔧 CORRECCIÓN DE ENCODING UTF-8")
    print("=" * 60)
    print(f"\n📁 Procesando: {input_file}")
    print("-" * 60)
    
    if fix_encoding(input_file, output_file):
        print("-" * 60)
        print(f"\n✅ LISTO!")
        print(f"   Archivo corregido guardado como: {output_file}")
        print(f"   Ahora reemplaza index.html con este archivo.")
        print("\n" + "=" * 60)
    else:
        print("\n❌ Hubo un error durante la corrección")
        sys.exit(1)
