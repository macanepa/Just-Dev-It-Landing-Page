# Script para configurar tarea automatica cada lunes
# Ejecutar como Administrador

$taskName = "SEO-Dashboard-Actualizar-Lunes"
$scriptPath = "$PSScriptRoot\actualizar-datos-manual.py"
$workingDir = Split-Path -Parent $PSScriptRoot
$pythonPath = (Get-Command python).Source

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "CONFIGURANDO TAREA AUTOMATICA CADA LUNES" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Script a ejecutar: $scriptPath" -ForegroundColor Green
Write-Host "Directorio de trabajo: $workingDir" -ForegroundColor Green
Write-Host "Python: $pythonPath" -ForegroundColor Green
Write-Host ""

# Eliminar tarea existente si existe
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existingTask) {
    Write-Host "Eliminando tarea existente..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# Crear acción: ejecutar Python con el script
$action = New-ScheduledTaskAction -Execute $pythonPath `
    -Argument "`"$scriptPath`"" `
    -WorkingDirectory $workingDir

# Crear trigger: cada lunes a las 8:00 AM
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At 8:00AM

# Configuración de la tarea
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" `
    -LogonType Interactive `
    -RunLevel Highest

$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable

# Registrar la tarea
Register-ScheduledTask -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -Principal $principal `
    -Settings $settings `
    -Description "Actualiza datos de SEO Dashboard desde Google Search Console cada lunes a las 8:00 AM"

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "TAREA CONFIGURADA CORRECTAMENTE" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Detalles de la tarea:" -ForegroundColor Cyan
Write-Host "   Nombre: $taskName" -ForegroundColor White
Write-Host "   Frecuencia: Cada lunes a las 8:00 AM" -ForegroundColor White
Write-Host "   Script: actualizar-datos-manual.py" -ForegroundColor White
Write-Host ""
Write-Host "Comandos utiles:" -ForegroundColor Cyan
Write-Host "   Ver tarea: Get-ScheduledTask -TaskName '$taskName'" -ForegroundColor White
Write-Host "   Ejecutar ahora: Start-ScheduledTask -TaskName '$taskName'" -ForegroundColor White
Write-Host "   Ver historial: Get-ScheduledTaskInfo -TaskName '$taskName'" -ForegroundColor White
Write-Host "   Eliminar tarea: Unregister-ScheduledTask -TaskName '$taskName'" -ForegroundColor White
Write-Host ""
Write-Host "Listo! Los datos se actualizaran automaticamente cada lunes." -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
