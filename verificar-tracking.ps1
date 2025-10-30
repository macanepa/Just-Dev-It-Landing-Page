#!/usr/bin/env pwsh
# Script de Verificación de Tracking - Just Dev It
# Verifica que todos los sistemas de tracking estén correctamente configurados

Write-Host "🔍 VERIFICACIÓN DE TRACKING - Just Dev It" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Leer el archivo index.html
$indexPath = Join-Path $PSScriptRoot "..\index.html"
$indexContent = Get-Content $indexPath -Raw

# Contadores
$issues = 0
$warnings = 0
$success = 0

# 1. Verificar Google Tag Manager
Write-Host "1️⃣  Google Tag Manager (GTM)" -ForegroundColor Yellow
if ($indexContent -match 'GTM-N67BW2PN') {
    Write-Host "   ✅ GTM ID configurado: GTM-N67BW2PN" -ForegroundColor Green
    $success++
    
    # Verificar que está en ambos lugares
    $gtmMatches = ([regex]::Matches($indexContent, 'GTM-N67BW2PN')).Count
    if ($gtmMatches -ge 3) {
        Write-Host "   ✅ GTM configurado en $gtmMatches ubicaciones" -ForegroundColor Green
        $success++
    } else {
        Write-Host "   ⚠️  GTM solo encontrado en $gtmMatches ubicaciones (esperado: 3+)" -ForegroundColor Yellow
        $warnings++
    }
} else {
    Write-Host "   ❌ GTM ID no configurado" -ForegroundColor Red
    $issues++
}
Write-Host ""

# 2. Verificar Google Analytics
Write-Host "2️⃣  Google Analytics 4 (GA4)" -ForegroundColor Yellow
if ($indexContent -match 'G-E47YX9JYCS') {
    Write-Host "   ✅ GA4 ID configurado: G-E47YX9JYCS" -ForegroundColor Green
    $success++
    
    # Verificar enhanced conversions
    if ($indexContent -match 'allow_enhanced_conversions.*true') {
        Write-Host "   ✅ Enhanced Conversions habilitado" -ForegroundColor Green
        $success++
    } else {
        Write-Host "   ⚠️  Enhanced Conversions no detectado" -ForegroundColor Yellow
        $warnings++
    }
} elseif ($indexContent -match 'G-XXXXXXXXXX') {
    Write-Host "   ❌ GA4 ID es placeholder (G-XXXXXXXXXX)" -ForegroundColor Red
    Write-Host "      Acción: Reemplazar con ID real en index.html" -ForegroundColor Red
    $issues++
} else {
    Write-Host "   ❌ GA4 no configurado" -ForegroundColor Red
    $issues++
}
Write-Host ""

# 3. Verificar Facebook Pixel
Write-Host "3️⃣  Facebook Pixel" -ForegroundColor Yellow
if ($indexContent -match 'fbq\("init",\s*"(\d{15,16})"') {
    $pixelId = $Matches[1]
    Write-Host "   ✅ Facebook Pixel configurado: $pixelId" -ForegroundColor Green
    $success++
} elseif ($indexContent -match 'PENDING_FACEBOOK_PIXEL_ID|XXXXXXXXXXXXXXXXX') {
    Write-Host "   ⚠️  Facebook Pixel pendiente de configuración" -ForegroundColor Yellow
    Write-Host "      Acción: Obtener Pixel ID desde Events Manager" -ForegroundColor Yellow
    Write-Host "      URL: https://business.facebook.com/events_manager2/list/pixel/1119285710374562" -ForegroundColor Cyan
    $warnings++
} else {
    Write-Host "   ⚠️  Facebook Pixel comentado o no encontrado" -ForegroundColor Yellow
    $warnings++
}
Write-Host ""

# 4. Verificar LinkedIn Insight Tag
Write-Host "4️⃣  LinkedIn Insight Tag" -ForegroundColor Yellow
if ($indexContent -match '_linkedin_partner_id\s*=\s*"(\d{5,8})"') {
    $partnerId = $Matches[1]
    Write-Host "   ✅ LinkedIn Insight Tag configurado: $partnerId" -ForegroundColor Green
    $success++
} elseif ($indexContent -match 'PENDING_LINKEDIN_PARTNER_ID|XXXXXXX') {
    Write-Host "   ⚠️  LinkedIn Insight Tag pendiente de configuración" -ForegroundColor Yellow
    Write-Host "      Acción: Obtener Partner ID desde Campaign Manager" -ForegroundColor Yellow
    Write-Host "      URL: https://www.linkedin.com/campaignmanager/accounts/516571441" -ForegroundColor Cyan
    $warnings++
} else {
    Write-Host "   ⚠️  LinkedIn Insight Tag comentado o no encontrado" -ForegroundColor Yellow
    $warnings++
}
Write-Host ""

# 5. Verificar conversion-tracking.js
Write-Host "5️⃣  Sistema de Tracking de Conversiones" -ForegroundColor Yellow
$trackingJsPath = Join-Path $PSScriptRoot "..\js\conversion-tracking.js"
if (Test-Path $trackingJsPath) {
    Write-Host "   ✅ Archivo conversion-tracking.js existe" -ForegroundColor Green
    $success++
    
    $trackingContent = Get-Content $trackingJsPath -Raw
    
    # Contar eventos configurados
    $events = [regex]::Matches($trackingContent, 'CONVERSION_EVENTS\.').Count
    Write-Host "   ℹ️  Eventos configurados: $events" -ForegroundColor Cyan
    
    # Verificar funciones clave
    if ($trackingContent -match 'function trackConversion') {
        Write-Host "   ✅ Función trackConversion() disponible" -ForegroundColor Green
        $success++
    }
    
    if ($trackingContent -match 'IntersectionObserver') {
        Write-Host "   ✅ IntersectionObserver implementado (mejor performance)" -ForegroundColor Green
        $success++
    }
} else {
    Write-Host "   ❌ Archivo conversion-tracking.js no encontrado" -ForegroundColor Red
    $issues++
}
Write-Host ""

# 6. Verificar Sitemap
Write-Host "6️⃣  SEO y Sitemap" -ForegroundColor Yellow
$sitemapPath = Join-Path $PSScriptRoot "..\sitemap.xml"
if (Test-Path $sitemapPath) {
    Write-Host "   ✅ sitemap.xml existe" -ForegroundColor Green
    $success++
    
    $sitemapContent = Get-Content $sitemapPath -Raw
    if ($sitemapContent -match '2025-10-30') {
        Write-Host "   ✅ Sitemap actualizado (30/10/2025)" -ForegroundColor Green
        $success++
    } else {
        Write-Host "   ⚠️  Sitemap podría estar desactualizado" -ForegroundColor Yellow
        $warnings++
    }
} else {
    Write-Host "   ❌ sitemap.xml no encontrado" -ForegroundColor Red
    $issues++
}
Write-Host ""

# 7. Verificar robots.txt
$robotsPath = Join-Path $PSScriptRoot "..\robots.txt"
if (Test-Path $robotsPath) {
    Write-Host "   ✅ robots.txt existe" -ForegroundColor Green
    $success++
    
    $robotsContent = Get-Content $robotsPath -Raw
    if ($robotsContent -match 'Sitemap:.*sitemap\.xml') {
        Write-Host "   ✅ Sitemap referenciado en robots.txt" -ForegroundColor Green
        $success++
    }
} else {
    Write-Host "   ❌ robots.txt no encontrado" -ForegroundColor Red
    $issues++
}
Write-Host ""

# Resumen
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "📊 RESUMEN" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "✅ Configuraciones exitosas: $success" -ForegroundColor Green
Write-Host "⚠️  Advertencias: $warnings" -ForegroundColor Yellow
Write-Host "❌ Problemas críticos: $issues" -ForegroundColor Red
Write-Host ""

# Recomendaciones
Write-Host "📋 PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host ""

if ($warnings -gt 0 -or $issues -gt 0) {
    if ($indexContent -match 'PENDING_FACEBOOK_PIXEL_ID|XXXXXXXXXXXXXXXXX') {
        Write-Host "1. 🔧 Configurar Facebook Pixel:" -ForegroundColor Yellow
        Write-Host "   - Ve a: https://business.facebook.com/events_manager2/list/pixel/1119285710374562" -ForegroundColor White
        Write-Host "   - Obtén el Pixel ID (15-16 dígitos)" -ForegroundColor White
        Write-Host "   - Actualiza en index.html y descomenta el código" -ForegroundColor White
        Write-Host ""
    }
    
    if ($indexContent -match 'PENDING_LINKEDIN_PARTNER_ID|XXXXXXX') {
        Write-Host "2. 🔧 Configurar LinkedIn Insight Tag:" -ForegroundColor Yellow
        Write-Host "   - Ve a: https://www.linkedin.com/campaignmanager/accounts/516571441" -ForegroundColor White
        Write-Host "   - Obtén el Partner ID (7 dígitos)" -ForegroundColor White
        Write-Host "   - Actualiza en index.html y descomenta el código" -ForegroundColor White
        Write-Host ""
    }
    
    Write-Host "3. ✅ Verificar en Google Search Console:" -ForegroundColor Yellow
    Write-Host "   - Ve a: https://search.google.com/search-console" -ForegroundColor White
    Write-Host "   - Agrega la propiedad justdev.it" -ForegroundColor White
    Write-Host "   - Envía el sitemap: https://justdev.it/sitemap.xml" -ForegroundColor White
    Write-Host ""
    
    Write-Host "4. 📊 Configurar Conversiones en GA4:" -ForegroundColor Yellow
    Write-Host "   - Ve a: https://analytics.google.com/" -ForegroundColor White
    Write-Host "   - Admin > Events > Marcar como conversión:" -ForegroundColor White
    Write-Host "     * lead_form_submit" -ForegroundColor White
    Write-Host "     * quote_button_click" -ForegroundColor White
    Write-Host "     * direct_contact" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "🎉 ¡Todo está configurado correctamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Verifica que todo funcione:" -ForegroundColor Cyan
    Write-Host "1. Abre https://justdev.it en tu navegador" -ForegroundColor White
    Write-Host "2. Abre DevTools (F12) > Network" -ForegroundColor White
    Write-Host "3. Filtra por 'analytics', 'gtm', 'facebook'" -ForegroundColor White
    Write-Host "4. Recarga y verifica que se envíen los requests" -ForegroundColor White
    Write-Host ""
}

Write-Host "📚 Para más información, consulta:" -ForegroundColor Cyan
Write-Host "   docs/GUIA-CONFIGURACION-TRACKING-ACTUALIZADA.md" -ForegroundColor White
Write-Host ""

# Exit code basado en issues
if ($issues -gt 0) {
    exit 1
} elseif ($warnings -gt 0) {
    exit 0
} else {
    exit 0
}
