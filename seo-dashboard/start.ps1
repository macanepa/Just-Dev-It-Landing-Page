# Script de inicio rápido para SEO Dashboard
# Uso: .\start.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  SEO Dashboard - Just Dev It" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Python
Write-Host "[1/4] Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "  ✓ Python instalado: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Python no encontrado" -ForegroundColor Red
    Write-Host "  Instala Python desde: https://www.python.org/downloads/" -ForegroundColor Red
    exit 1
}

# Verificar dependencias
Write-Host ""
Write-Host "[2/4] Verificando dependencias..." -ForegroundColor Yellow

$dependencies = @("flask", "google-auth", "google-api-python-client")
$missingDeps = @()

foreach ($dep in $dependencies) {
    $result = pip show $dep 2>&1
    if ($LASTEXITCODE -ne 0) {
        $missingDeps += $dep
    }
}

if ($missingDeps.Count -gt 0) {
    Write-Host "  ⚠ Faltan dependencias: $($missingDeps -join ', ')" -ForegroundColor Yellow
    Write-Host "  Instalando..." -ForegroundColor Yellow
    pip install -r requirements.txt
    Write-Host "  ✓ Dependencias instaladas" -ForegroundColor Green
} else {
    Write-Host "  ✓ Todas las dependencias están instaladas" -ForegroundColor Green
}

# Verificar configuración
Write-Host ""
Write-Host "[3/4] Verificando configuración..." -ForegroundColor Yellow

if (Test-Path "config.json") {
    Write-Host "  ✓ Configuración encontrada" -ForegroundColor Green
    $hasConfig = $true
} else {
    Write-Host "  ⚠ No hay configuración. Configura desde el dashboard." -ForegroundColor Yellow
    $hasConfig = $false
}

# Iniciar servidor
Write-Host ""
Write-Host "[4/4] Iniciando servidor..." -ForegroundColor Yellow
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "  ✓ Servidor iniciado" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Dashboard: " -NoNewline
Write-Host "Abre index.html en tu navegador" -ForegroundColor Cyan
Write-Host "🌐 API Server: " -NoNewline
Write-Host "http://localhost:5000" -ForegroundColor Cyan
Write-Host ""

if (-not $hasConfig) {
    Write-Host "⚠️  IMPORTANTE:" -ForegroundColor Yellow
    Write-Host "   1. Abre index.html en tu navegador" -ForegroundColor Yellow
    Write-Host "   2. Ve a la pestaña 'Configuración'" -ForegroundColor Yellow
    Write-Host "   3. Pega tus credenciales de Google Cloud" -ForegroundColor Yellow
    Write-Host "   4. Haz clic en 'Guardar Configuración'" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Gray
Write-Host ""

# Abrir dashboard en el navegador
Start-Process "index.html"

# Iniciar servidor Python
python api-server.py
