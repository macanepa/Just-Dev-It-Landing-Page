# ==========================================
# Script de Inicio de Servidor Local
# Just Dev It - Landing Page
# ==========================================

Write-Host "`n🚀 Just Dev It - Servidor de Desarrollo`n" -ForegroundColor Cyan

$port = 8000

# Verificar si el puerto está en uso
$portInUse = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($portInUse) {
    Write-Host "⚠️  Puerto $port ya está en uso" -ForegroundColor Yellow
    Write-Host "   Abre el navegador en: http://localhost:$port`n" -ForegroundColor Green
    exit
}

# Cambiar al directorio src
Set-Location -Path "$PSScriptRoot\src"

Write-Host "📂 Sirviendo archivos desde: src/" -ForegroundColor Green
Write-Host "🌐 URL Local: http://localhost:$port" -ForegroundColor Green
Write-Host "🌐 URL Red: http://$(Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias 'Ethernet*','Wi-Fi*' | Select-Object -First 1 -ExpandProperty IPAddress):$port" -ForegroundColor Green
Write-Host "`n💡 Consejos:" -ForegroundColor Yellow
Write-Host "   • Presiona Ctrl+C para detener el servidor" -ForegroundColor White
Write-Host "   • Usa Ctrl+F5 en el navegador para recargar sin caché`n" -ForegroundColor White

# Abrir el navegador automáticamente
Start-Process "http://localhost:$port"

# Iniciar servidor Python
Write-Host "🔄 Iniciando servidor...`n" -ForegroundColor Cyan
python -m http.server $port
