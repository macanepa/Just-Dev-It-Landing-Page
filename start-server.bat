@echo off
echo.
echo ========================================
echo Just Dev It - Servidor de Desarrollo
echo ========================================
echo.
echo Iniciando servidor en puerto 8000...
echo.
cd src
start http://localhost:8000
python -m http.server 8000
