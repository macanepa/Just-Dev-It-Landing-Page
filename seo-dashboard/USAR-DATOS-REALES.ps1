# ============================================
# 🚀 GUÍA DE USO - DASHBOARD CON DATOS REALES
# ============================================

Write-Host "`n"
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🚀 DASHBOARD SEO CON DATOS REALES DE GOOGLE APIs" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "📋 DESCRIPCIÓN:" -ForegroundColor Yellow
Write-Host "   El dashboard ahora puede actualizar datos en TIEMPO REAL" -ForegroundColor White
Write-Host "   desde las APIs de Google cuando presiones 'Actualizar Datos'" -ForegroundColor White
Write-Host "`n"

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "⚙️  CONFIGURACIÓN INICIAL (Solo primera vez)" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "1️⃣  Instalar dependencias de Python:" -ForegroundColor Green
Write-Host "   pip install flask flask-cors google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client requests" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "2️⃣  Configurar credenciales de Google:" -ForegroundColor Green
Write-Host "   python scripts/crear-config.py" -ForegroundColor Cyan
Write-Host "   (Te pedirá el JSON de Service Account de Google Cloud)" -ForegroundColor Gray
Write-Host "`n"

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🎮 USO DIARIO" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "PASO 1: Iniciar el servidor API Backend" -ForegroundColor Green
Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "   En una terminal PowerShell:" -ForegroundColor White
Write-Host "   cd seo-dashboard" -ForegroundColor Cyan
Write-Host "   python api-server-realtime.py" -ForegroundColor Cyan
Write-Host "`n   ✅ Verás: 'Servidor corriendo en: http://localhost:5000'" -ForegroundColor Gray
Write-Host "   ⚠️  Deja esta terminal abierta mientras uses el dashboard" -ForegroundColor Yellow
Write-Host "`n"

Write-Host "PASO 2: Iniciar el servidor HTTP del Dashboard" -ForegroundColor Green
Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "   En OTRA terminal PowerShell:" -ForegroundColor White
Write-Host "   cd seo-dashboard" -ForegroundColor Cyan
Write-Host "   python -m http.server 8001" -ForegroundColor Cyan
Write-Host "`n   ✅ Verás: 'Serving HTTP on 0.0.0.0 port 8001'" -ForegroundColor Gray
Write-Host "`n"

Write-Host "PASO 3: Abrir el Dashboard" -ForegroundColor Green
Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "   Abre tu navegador en:" -ForegroundColor White
Write-Host "   http://localhost:8001" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "PASO 4: Actualizar Datos desde Google" -ForegroundColor Green
Write-Host "────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "   En el dashboard, haz click en:" -ForegroundColor White
Write-Host "   🔄 'Actualizar Datos' (botón principal)" -ForegroundColor Cyan
Write-Host "`n   O en cada sección:" -ForegroundColor White
Write-Host "   • Keywords: botón 'Actualizar'" -ForegroundColor Gray
Write-Host "   • Performance: botón 'Actualizar'" -ForegroundColor Gray
Write-Host "`n   💡 Cada vez que presiones actualizar:" -ForegroundColor Yellow
Write-Host "   ✅ Consulta las APIs de Google en tiempo real" -ForegroundColor Green
Write-Host "   ✅ Descarga los datos más recientes" -ForegroundColor Green
Write-Host "   ✅ Guarda en archivos JSON (keywords-database.json)" -ForegroundColor Green
Write-Host "   ✅ Actualiza la visualización del dashboard" -ForegroundColor Green
Write-Host "`n"

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 FLUJO DE DATOS" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "1. CARGA INICIAL (al abrir el dashboard):" -ForegroundColor Green
Write-Host "   Dashboard → keywords-database.json (datos estáticos guardados)" -ForegroundColor Gray
Write-Host "   📁 Muestra los últimos datos guardados" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "2. AL PRESIONAR 'ACTUALIZAR':" -ForegroundColor Green
Write-Host "   Dashboard → API Server → Google APIs → Datos nuevos" -ForegroundColor Gray
Write-Host "   📥 Descarga datos frescos de Google" -ForegroundColor Cyan
Write-Host "   💾 Guarda en keywords-database.json" -ForegroundColor Cyan
Write-Host "   🔄 Recarga el dashboard con datos nuevos" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🔧 ARQUITECTURA" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "┌─────────────────┐" -ForegroundColor White
Write-Host "│   NAVEGADOR     │  http://localhost:8001" -ForegroundColor White
Write-Host "│   (Dashboard)   │  index.html" -ForegroundColor White
Write-Host "└────────┬────────┘" -ForegroundColor White
Write-Host "         │" -ForegroundColor White
Write-Host "         │ fetch('http://localhost:5000/api/...')" -ForegroundColor Cyan
Write-Host "         ▼" -ForegroundColor White
Write-Host "┌─────────────────┐" -ForegroundColor White
Write-Host "│   API SERVER    │  http://localhost:5000" -ForegroundColor White
Write-Host "│   Flask/Python  │  api-server-realtime.py" -ForegroundColor White
Write-Host "└────────┬────────┘" -ForegroundColor White
Write-Host "         │" -ForegroundColor White
Write-Host "         │ Google API SDK" -ForegroundColor Cyan
Write-Host "         ▼" -ForegroundColor White
Write-Host "┌─────────────────┐" -ForegroundColor White
Write-Host "│  GOOGLE APIs    │  Search Console, PageSpeed" -ForegroundColor White
Write-Host "│  (Cloud)        │  Datos reales de tu sitio" -ForegroundColor White
Write-Host "└─────────────────┘" -ForegroundColor White
Write-Host "`n"

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🎯 ENDPOINTS DE LA API" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "POST /api/update-search-console" -ForegroundColor Cyan
Write-Host "     Actualiza keywords desde Google Search Console" -ForegroundColor Gray
Write-Host "     Guarda en: keywords-database.json" -ForegroundColor DarkGray
Write-Host "`n"

Write-Host "POST /api/update-pagespeed" -ForegroundColor Cyan
Write-Host "     Analiza performance con Google PageSpeed Insights" -ForegroundColor Gray
Write-Host "     Guarda en: data/performance-opportunities.json" -ForegroundColor DarkGray
Write-Host "`n"

Write-Host "GET  /api/status" -ForegroundColor Cyan
Write-Host "     Verifica que el servidor esté corriendo" -ForegroundColor Gray
Write-Host "`n"

Write-Host "GET  /api/get-keywords" -ForegroundColor Cyan
Write-Host "     Obtiene keywords actuales sin actualizar" -ForegroundColor Gray
Write-Host "`n"

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "⚠️  SOLUCIÓN DE PROBLEMAS" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "❌ Error: 'API Server no está corriendo'" -ForegroundColor Red
Write-Host "   Solución: Inicia el servidor API:" -ForegroundColor White
Write-Host "   python api-server-realtime.py" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "❌ Error: 'Configuración no encontrada'" -ForegroundColor Red
Write-Host "   Solución: Configura las credenciales:" -ForegroundColor White
Write-Host "   python scripts/crear-config.py" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "❌ Error: 'Credenciales inválidas'" -ForegroundColor Red
Write-Host "   Solución: Verifica que config/config.json tenga:" -ForegroundColor White
Write-Host "   • Service Account JSON correcto" -ForegroundColor Gray
Write-Host "   • propertyUrl de tu sitio" -ForegroundColor Gray
Write-Host "`n"

Write-Host "❌ Dashboard muestra datos antiguos" -ForegroundColor Red
Write-Host "   Solución: Presiona Ctrl+Shift+R (recarga forzada)" -ForegroundColor White
Write-Host "   O borra caché del navegador" -ForegroundColor Gray
Write-Host "`n"

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ COMANDOS RÁPIDOS" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "# Instalar todo de una vez" -ForegroundColor Green
Write-Host "pip install flask flask-cors google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client requests" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "# Iniciar API Server (Terminal 1)" -ForegroundColor Green
Write-Host "cd seo-dashboard ; python api-server-realtime.py" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "# Iniciar Dashboard (Terminal 2)" -ForegroundColor Green
Write-Host "cd seo-dashboard ; python -m http.server 8001" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "# Verificar que API funciona" -ForegroundColor Green
Write-Host "curl http://localhost:5000/api/status" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "# Actualizar datos manualmente desde terminal" -ForegroundColor Green
Write-Host "curl -X POST http://localhost:5000/api/update-search-console" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🎉 ¡LISTO! Ahora tienes datos en tiempo real" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "📖 Documentación completa:" -ForegroundColor Yellow
Write-Host "   • docs/API-REALTIME-GUIDE.md" -ForegroundColor Cyan
Write-Host "   • README.md" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "🆘 Soporte:" -ForegroundColor Yellow
Write-Host "   • GitHub Issues: https://github.com/tu-repo/issues" -ForegroundColor Cyan
Write-Host "`n`n"
