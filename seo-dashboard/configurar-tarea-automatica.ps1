# ==============================================================
# SCRIPT PARA CREAR TAREA AUTOMÁTICA EN WINDOWS
# ==============================================================
# Este script crea automáticamente la tarea programada
# ==============================================================

$TaskName = "SEO Dashboard - Actualización Semanal"
$Description = "Actualiza automáticamente los datos del dashboard SEO desde Google Search Console"
$ScriptPath = Join-Path $PSScriptRoot "actualizar-seo-automatico.bat"
$WorkingDirectory = $PSScriptRoot

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Configurando Tarea Programada en Windows" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que el script existe
if (-not (Test-Path $ScriptPath)) {
    Write-Host "[ERROR] No se encuentra el script:" -ForegroundColor Red
    Write-Host "   $ScriptPath" -ForegroundColor Red
    exit 1
}

Write-Host "[OK] Script: $ScriptPath" -ForegroundColor Green
Write-Host "[OK] Carpeta: $WorkingDirectory" -ForegroundColor Green
Write-Host ""

# Verificar si la tarea ya existe
$ExistingTask = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue

if ($ExistingTask) {
    Write-Host "[AVISO] La tarea '$TaskName' ya existe." -ForegroundColor Yellow
    $Response = Read-Host "Deseas reemplazarla? (S/N)"
    
    if ($Response -eq "S" -or $Response -eq "s") {
        Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
        Write-Host "[OK] Tarea anterior eliminada" -ForegroundColor Green
    } else {
        Write-Host "[CANCELADO] Operacion cancelada" -ForegroundColor Red
        exit 0
    }
}

Write-Host ""
Write-Host "Creando tarea programada..." -ForegroundColor Cyan

# Crear la acción (qué ejecutar)
$Action = New-ScheduledTaskAction `
    -Execute "cmd.exe" `
    -Argument "/c `"$ScriptPath`"" `
    -WorkingDirectory $WorkingDirectory

# Crear el desencadenador (cuándo ejecutar)
# Cada lunes a las 9:00 AM
$Trigger = New-ScheduledTaskTrigger `
    -Weekly `
    -DaysOfWeek Monday `
    -At 9:00AM

# Configuración adicional
$Settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Hours 1)

# Obtener el usuario actual
$Principal = New-ScheduledTaskPrincipal `
    -UserId $env:USERNAME `
    -LogonType Interactive `
    -RunLevel Limited

# Registrar la tarea
try {
    Register-ScheduledTask `
        -TaskName $TaskName `
        -Description $Description `
        -Action $Action `
        -Trigger $Trigger `
        -Settings $Settings `
        -Principal $Principal `
        -Force | Out-Null
    
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "[EXITO] Tarea programada creada exitosamente!" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Detalles de la tarea:" -ForegroundColor Cyan
    Write-Host "   Nombre: $TaskName" -ForegroundColor White
    Write-Host "   Programacion: Cada lunes a las 9:00 AM" -ForegroundColor White
    Write-Host "   Script: actualizar-seo-automatico.bat" -ForegroundColor White
    Write-Host ""
    Write-Host "Para ver la tarea:" -ForegroundColor Yellow
    Write-Host "   1. Presiona Windows + R" -ForegroundColor White
    Write-Host "   2. Escribe: taskschd.msc" -ForegroundColor White
    Write-Host "   3. Busca: '$TaskName'" -ForegroundColor White
    Write-Host ""
    Write-Host "Para probar ahora:" -ForegroundColor Yellow
    Write-Host "   Get-ScheduledTask -TaskName '$TaskName' | Start-ScheduledTask" -ForegroundColor White
    Write-Host ""
    
    # Preguntar si quiere ejecutarla ahora
    $RunNow = Read-Host "Deseas ejecutar la tarea ahora para probarla? (S/N)"
    
    if ($RunNow -eq "S" -or $RunNow -eq "s") {
        Write-Host ""
        Write-Host "Ejecutando tarea..." -ForegroundColor Cyan
        Start-ScheduledTask -TaskName $TaskName
        Start-Sleep -Seconds 3
        Write-Host "[OK] Tarea ejecutada. Revisa el archivo actualizacion-log.txt" -ForegroundColor Green
    }
    
} catch {
    Write-Host ""
    Write-Host "[ERROR] Error al crear la tarea:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Intenta ejecutar PowerShell como Administrador" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Configuracion completada!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
