# 🔄 Flujo de Trabajo - Desarrollo y Producción

## 📁 Estructura del Proyecto

```
Just-Dev-It-Landing-Page/
├── index.html              # ⚠️ NO EDITAR - Generado automáticamente para GitHub Pages
├── about-us.html           # ⚠️ NO EDITAR - Generado automáticamente para GitHub Pages
├── src/                    # ✅ EDITA AQUÍ - Código fuente
│   ├── index.html          # ← Archivo principal para editar
│   ├── about-us.html       # ← Archivo secundario para editar
│   ├── css/
│   ├── js/
│   └── assets/
└── scripts/
```

## 🎯 Flujo de Trabajo

### 1️⃣ Desarrollo Local

**Trabaja siempre en la carpeta `src/`:**

```bash
# Opción A: Live Server (VS Code)
# Click derecho en src/index.html → "Open with Live Server"

# Opción B: Script automático
.\start-server.bat
# o
.\start-server.ps1

# Opción C: Servidor manual
cd src
python -m http.server 8000
```

**URL local:** http://localhost:8000

### 2️⃣ Sincronizar con GitHub Pages

Después de hacer cambios en `src/`, ejecuta:

```powershell
.\sync-github-pages.ps1
```

Este script:
- ✅ Copia `src/index.html` → raíz `index.html`
- ✅ Copia `src/about-us.html` → raíz `about-us.html`
- ✅ Actualiza rutas para apuntar a `src/css/`, `src/js/`, `src/assets/`
- ✅ Preserva encoding UTF-8 correcto

### 3️⃣ Deploy a Producción

```bash
git add .
git commit -m "Descripción de cambios"
git push origin main
```

**Espera 2-5 minutos** y tu sitio estará actualizado en:
- 🌐 https://justdev.it
- 🌐 https://macanepa.github.io/Just-Dev-It-Landing-Page

## ⚠️ Reglas Importantes

### ✅ HACER:
- ✅ Editar archivos en `src/`
- ✅ Probar localmente antes de sincronizar
- ✅ Ejecutar `sync-github-pages.ps1` antes de hacer push
- ✅ Verificar que las rutas funcionen localmente

### ❌ NO HACER:
- ❌ Editar `index.html` o `about-us.html` en la raíz directamente
- ❌ Hacer push sin ejecutar `sync-github-pages.ps1`
- ❌ Usar `Get-Content` para modificar archivos (corrompe UTF-8)
- ❌ Cambiar la estructura de carpetas sin actualizar rutas

## 🔧 Solución de Problemas

### Las imágenes no se ven en producción
```powershell
# Ejecuta el script de sincronización
.\sync-github-pages.ps1
git add .
git commit -m "Corregir rutas de imágenes"
git push origin main
```

### El sitio local no carga recursos
```bash
# Asegúrate de estar sirviendo desde src/
cd src
python -m http.server 8000
```

### Caracteres especiales corruptos
```powershell
# Usa siempre este método para modificar archivos:
$content = [System.IO.File]::ReadAllText("src\index.html", [System.Text.Encoding]::UTF8)
# ... modificaciones ...
[System.IO.File]::WriteAllText("src\index.html", $content, [System.Text.Encoding]::UTF8)
```

## 📝 Comandos Útiles

```powershell
# Iniciar servidor local
.\start-server.bat

# Sincronizar con GitHub Pages
.\sync-github-pages.ps1

# Ver cambios pendientes
git status

# Verificar encoding
.\scripts\build\verify-encoding.ps1
```

## 🎯 Resumen

1. **Desarrolla** en `src/`
2. **Prueba** localmente con `.\start-server.bat`
3. **Sincroniza** con `.\sync-github-pages.ps1`
4. **Deploy** con `git push`

¡Eso es todo! 🚀
