@echo off
title SEO Dashboard - Servidor con Datos Reales
color 0A

echo.
echo ============================================================
echo       SEO DASHBOARD CON DATOS REALES DE GOOGLE APIs
echo ============================================================
echo.

cd /d "%~dp0"

echo [1/3] Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python no esta instalado
    echo Descarga Python desde: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo [OK] Python instalado
echo.

echo [2/3] Iniciando API Server en puerto 5000...
echo      (Este servidor maneja las llamadas a Google APIs)
echo.
start "API Server - Google APIs" cmd /k "python api-server-realtime.py"
timeout /t 3 >nul

echo [3/3] Iniciando Dashboard en puerto 8001...
echo      (Este es el servidor web del dashboard)
echo.
start "Dashboard SEO" cmd /k "python -m http.server 8001"
timeout /t 2 >nul

echo.
echo ============================================================
echo [OK] Servidores iniciados correctamente
echo ============================================================
echo.
echo  API Server:  http://localhost:5000
echo  Dashboard:   http://localhost:8001
echo.
echo ============================================================
echo.
echo Abriendo dashboard en el navegador...
timeout /t 2 >nul

start http://localhost:8001

echo.
echo ============================================================
echo INSTRUCCIONES:
echo ============================================================
echo.
echo 1. El dashboard se abrio en tu navegador
echo 2. Presiona el boton "Actualizar Datos"
echo 3. Los datos se actualizaran desde Google APIs
echo 4. Los archivos JSON se guardaran automaticamente
echo.
echo VENTANAS ABIERTAS:
echo  - API Server (puerto 5000)
echo  - Dashboard (puerto 8001)
echo  - Navegador con el dashboard
echo.
echo [!] NO CIERRES las ventanas de los servidores
echo     mientras uses el dashboard
echo.
echo ============================================================
echo.
pause
