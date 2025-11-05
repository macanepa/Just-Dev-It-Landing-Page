@echo off
REM ====================================================================
REM Script de Actualizacion Automatica - SEO Dashboard Just Dev It
REM ====================================================================
REM Este script actualiza automaticamente los datos del dashboard SEO
REM ejecutando el servidor API y guardando los datos
REM ====================================================================

echo.
echo ========================================
echo  SEO Dashboard - Actualizacion Automatica
echo ========================================
echo.
echo Iniciando actualizacion... %date% %time%
echo.

REM Cambiar al directorio del dashboard
cd /d "%~dp0"

REM Verificar que Python esta instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python no esta instalado o no esta en PATH
    echo Por favor instala Python desde https://www.python.org
    exit /b 1
)

REM Activar el entorno virtual si existe
if exist "venv\Scripts\activate.bat" (
    echo Activando entorno virtual...
    call venv\Scripts\activate.bat
)

REM Verificar que las dependencias estan instaladas
echo Verificando dependencias...
pip show flask >nul 2>&1
if errorlevel 1 (
    echo Instalando dependencias...
    pip install -r requirements.txt
)

REM Ejecutar el script de actualizacion
echo.
echo Obteniendo datos de Google Search Console...
python actualizar-datos-auto.py

REM Verificar si hubo errores
if errorlevel 1 (
    echo.
    echo ERROR: Fallo la actualizacion
    echo Revisa el archivo log: actualizacion-log.txt
    exit /b 1
) else (
    echo.
    echo ========================================
    echo  Actualizacion completada exitosamente!
    echo ========================================
    echo Fecha: %date% %time%
    echo Los datos estan actualizados en el dashboard
)

echo.
exit /b 0
