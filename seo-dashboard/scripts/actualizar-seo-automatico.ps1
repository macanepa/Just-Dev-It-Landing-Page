# ====================================================================
# Script PowerShell de Actualización Automática - SEO Dashboard
# ====================================================================
# Versión más robusta con manejo de errores y logging
# ====================================================================

param(
    [switch]$Silent = $false
)

# Configuración
$DashboardPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$LogFile = Join-Path $DashboardPath "actualizacion-log.txt"
$LockFile = Join-Path $DashboardPath "update.lock"

# Función de logging
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogMessage = "[$Timestamp] [$Level] $Message"
    
    if (-not $Silent) {
        Write-Host $LogMessage
    }
    
    Add-Content -Path $LogFile -Value $LogMessage -Encoding UTF8
}

# Verificar que no haya otra instancia corriendo
if (Test-Path $LockFile) {
    Write-Log "Ya hay una actualización en progreso. Abortando..." "WARN"
    exit 1
}

try {
    # Crear archivo de bloqueo
    New-Item -Path $LockFile -ItemType File -Force | Out-Null
    
    Write-Log "======================================================"
    Write-Log "Iniciando actualización automática del SEO Dashboard"
    Write-Log "======================================================"
    
    # Cambiar al directorio del dashboard
    Set-Location $DashboardPath
    Write-Log "Directorio: $DashboardPath"
    
    # Verificar Python
    $PythonVersion = python --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Log "ERROR: Python no está instalado o no está en PATH" "ERROR"
        exit 1
    }
    Write-Log "Python detectado: $PythonVersion"
    
    # Verificar configuración
    if (-not (Test-Path "config.json")) {
        Write-Log "ERROR: No existe config.json. Configura el dashboard primero." "ERROR"
        exit 1
    }
    
    # Verificar dependencias
    Write-Log "Verificando dependencias..."
    $FlaskInstalled = pip show flask 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Log "Instalando dependencias..."
        pip install -r requirements.txt 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
            Write-Log "ERROR: Falló la instalación de dependencias" "ERROR"
            exit 1
        }
    }
    
    # Ejecutar actualización
    Write-Log "Obteniendo datos de Google Search Console..."
    python actualizar-datos-auto.py
    
    if ($LASTEXITCODE -ne 0) {
        Write-Log "ERROR: Falló la actualización de datos" "ERROR"
        exit 1
    }
    
    Write-Log "======================================================"
    Write-Log "✅ Actualización completada exitosamente" "SUCCESS"
    Write-Log "======================================================"
    
    # Limpiar logs antiguos (mantener últimos 30 días)
    $CutoffDate = (Get-Date).AddDays(-30)
    if (Test-Path $LogFile) {
        $Lines = Get-Content $LogFile
        $FilteredLines = $Lines | Where-Object {
            if ($_ -match '^\[(\d{4}-\d{2}-\d{2})') {
                $LogDate = [DateTime]::ParseExact($matches[1], "yyyy-MM-dd", $null)
                return $LogDate -gt $CutoffDate
            }
            return $true
        }
        $FilteredLines | Set-Content $LogFile -Encoding UTF8
    }
    
    exit 0
    
} catch {
    Write-Log "ERROR CRÍTICO: $($_.Exception.Message)" "ERROR"
    Write-Log $_.ScriptStackTrace "ERROR"
    exit 1
    
} finally {
    # Eliminar archivo de bloqueo
    if (Test-Path $LockFile) {
        Remove-Item $LockFile -Force
    }
}
