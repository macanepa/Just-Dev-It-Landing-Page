# ==========================================
# Script de Sincronización para GitHub Pages
# Just Dev It - Landing Page
# ==========================================
# Este script copia los archivos de src/ a la raíz
# y actualiza las rutas para GitHub Pages

Write-Host "`n🔄 Sincronizando archivos para GitHub Pages...`n" -ForegroundColor Cyan

# Copiar archivos HTML
Write-Host "📄 Copiando archivos HTML..." -ForegroundColor Yellow
Copy-Item -Path "src\index.html" -Destination "index.html" -Force
Copy-Item -Path "src\about-us.html" -Destination "about-us.html" -Force

# Actualizar rutas en index.html
Write-Host "🔧 Actualizando rutas en index.html..." -ForegroundColor Yellow
$content = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$content = $content -replace 'href="css/', 'href="src/css/' `
                    -replace 'src="assets/', 'src="src/assets/' `
                    -replace 'href="assets/', 'href="src/assets/' `
                    -replace 'src="js/', 'src="src/js/'
[System.IO.File]::WriteAllText("index.html", $content, [System.Text.Encoding]::UTF8)

# Actualizar rutas en about-us.html
Write-Host "🔧 Actualizando rutas en about-us.html..." -ForegroundColor Yellow
$content = [System.IO.File]::ReadAllText("about-us.html", [System.Text.Encoding]::UTF8)
$content = $content -replace 'href="css/', 'href="src/css/' `
                    -replace 'src="assets/', 'src="src/assets/' `
                    -replace 'href="assets/', 'href="src/assets/' `
                    -replace 'src="js/', 'src="src/js/'
[System.IO.File]::WriteAllText("about-us.html", $content, [System.Text.Encoding]::UTF8)

# Copiar archivos de configuración
Write-Host "⚙️  Copiando archivos de configuración..." -ForegroundColor Yellow
Copy-Item -Path "src\robots.txt" -Destination "robots.txt" -Force -ErrorAction SilentlyContinue
Copy-Item -Path "src\sitemap.xml" -Destination "sitemap.xml" -Force -ErrorAction SilentlyContinue
Copy-Item -Path "src\_headers" -Destination "_headers" -Force -ErrorAction SilentlyContinue
Copy-Item -Path "src\CNAME" -Destination "CNAME" -Force -ErrorAction SilentlyContinue

Write-Host "`n✅ Sincronización completada!`n" -ForegroundColor Green
Write-Host "💡 Ahora puedes hacer commit y push:" -ForegroundColor Yellow
Write-Host "   git add ." -ForegroundColor White
Write-Host "   git commit -m 'Actualizar GitHub Pages'" -ForegroundColor White
Write-Host "   git push origin main`n" -ForegroundColor White
