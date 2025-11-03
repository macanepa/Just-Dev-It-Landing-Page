# SCRIPT PARA DESCARGAR GOOGLE FONTS (Self-Hosted)
# Elimina los 760ms de latencia de fonts.googleapis.com

$fontsDir = "assets\fonts"

Write-Host "`n🔤 DESCARGANDO GOOGLE FONTS LOCALMENTE...`n" -ForegroundColor Cyan

# URLs de descarga directa (Google Fonts Helper)
$fonts = @(
    @{
        Name = "Poppins 300"
        Url = "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2"
        File = "poppins-v20-latin-300.woff2"
    },
    @{
        Name = "Poppins 400"
        Url = "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2"
        File = "poppins-v20-latin-regular.woff2"
    },
    @{
        Name = "Poppins 500"
        Url = "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2"
        File = "poppins-v20-latin-500.woff2"
    },
    @{
        Name = "Poppins 600"
        Url = "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2"
        File = "poppins-v20-latin-600.woff2"
    },
    @{
        Name = "Poppins 700"
        Url = "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2"
        File = "poppins-v20-latin-700.woff2"
    },
    @{
        Name = "Poppins 800"
        Url = "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4Z1xlFQ.woff2"
        File = "poppins-v20-latin-800.woff2"
    }
)

Write-Host "📦 Descargando fuentes..." -ForegroundColor Yellow

$downloaded = 0
$failed = 0

foreach ($font in $fonts) {
    try {
        $output = Join-Path $fontsDir $font.File
        
        Write-Host "  Descargando: $($font.Name)..." -NoNewline
        
        Invoke-WebRequest -Uri $font.Url -OutFile $output -ErrorAction Stop
        
        $size = [math]::Round((Get-Item $output).Length / 1KB, 2)
        Write-Host " ✅ ($size KB)" -ForegroundColor Green
        
        $downloaded++
    }
    catch {
        Write-Host " ❌ Error" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n📊 RESUMEN:" -ForegroundColor Cyan
Write-Host "  ✅ Descargadas: $downloaded fuentes" -ForegroundColor Green
if ($failed -gt 0) {
    Write-Host "  ❌ Fallidas: $failed fuentes" -ForegroundColor Red
}

$totalSize = (Get-ChildItem -Path $fontsDir -Filter "*.woff2" | Measure-Object -Property Length -Sum).Sum / 1KB
Write-Host "  📦 Tamaño total: $([math]::Round($totalSize, 2)) KB`n" -ForegroundColor White

Write-Host "🚀 PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host "  1. Actualizar typography.css para usar fonts locales" -ForegroundColor White
Write-Host "  2. Preload critical fonts en index.html" -ForegroundColor White
Write-Host "  3. Deploy y test (-760ms de latencia esperados)`n" -ForegroundColor White
