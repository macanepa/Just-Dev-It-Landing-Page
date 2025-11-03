#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Script para corregir caracteres UTF-8 mal codificados"""

import sys

# Definir los reemplazos
replacements = {
    'BÃSICAS': 'BÁSICAS',
    'mediciÃ³n': 'medición',
    'obtÃ©n': 'obtén',
    'UbicaciÃ³n': 'Ubicación',
    'conversiÃ³n': 'conversión',
    'âœ…': '✅',
    'âš ï¸': '⚠️',
    'bÃ¡sico': 'básico',
    'ðŸ'¡': '💡',
    'CUÃNDO': 'CUÁNDO',
    'ðŸ"': '📝',
    'CÃ"MO': 'CÓMO',
    'AutomatizaciÃ³n': 'Automatización',
    'EnergÃ­a': 'Energía',
    'automatizaciÃ³n': 'automatización',
    'transformaciÃ³n': 'transformación',
    'consultorÃ­a': 'consultoría',
    'tecnolÃ³gica': 'tecnológica',
}

def fix_file(filename):
    """Corrige el encoding de un archivo"""
    try:
        # Leer el archivo con UTF-8
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Aplicar los reemplazos
        for old, new in replacements.items():
            content = content.replace(old, new)
        
        # Guardar con UTF-8
        with open(filename, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        
        print(f"✅ Archivo {filename} corregido exitosamente")
        return True
    
    except Exception as e:
        print(f"❌ Error al procesar {filename}: {e}")
        return False

if __name__ == '__main__':
    files = ['index.html']
    
    success_count = 0
    for file in files:
        if fix_file(file):
            success_count += 1
    
    print(f"\n✅ {success_count}/{len(files)} archivos corregidos")
