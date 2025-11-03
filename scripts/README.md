# 📁 Scripts Directory

Esta carpeta contiene todos los scripts de desarrollo, corrección y optimización del proyecto.

## 📂 Estructura

### `/fixes`
Scripts de corrección y mantenimiento:
- `fix-*.ps1` - Scripts PowerShell para correcciones de encoding y otros fixes
- `fix-*.py` - Scripts Python para correcciones
- `fix-*.js` - Scripts JavaScript para correcciones

### `/optimization`
Scripts de optimización de assets:
- `convert-images-to-webp.ps1` - Conversión de imágenes a formato WebP
- `optimize-images-balanced.ps1` - Optimización balanceada de imágenes
- `download-fonts.ps1` - Descarga y gestión de fuentes

### `/build`
Scripts de compilación y deployment (para uso futuro)

## 🚀 Uso

Ejecuta los scripts desde la raíz del proyecto:

```powershell
# Ejemplo: Optimizar imágenes
.\scripts\optimization\optimize-images-balanced.ps1

# Ejemplo: Corregir encoding
.\scripts\fixes\fix-encoding.ps1
```

## ⚠️ Notas
- Todos los scripts están diseñados para ejecutarse desde la raíz del proyecto
- Asegúrate de tener los permisos necesarios antes de ejecutar scripts PowerShell
