@echo off
title EikeCase - Impact Navigator
cls

echo ========================================
echo  EikeCase - Impact Navigator
echo ========================================
echo.
echo Server wird gestartet...
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [FEHLER] Python ist nicht installiert!
    echo.
    echo Bitte installiere Python von: https://www.python.org/downloads/
    echo Wichtig: "Add Python to PATH" ankreuzen!
    echo.
    pause
    exit /b 1
)

REM Start Python HTTP server in background
cd dist
start /B python -m http.server 8000 >nul 2>&1

echo Warte 2 Sekunden...
timeout /t 2 /nobreak >nul

echo Browser wird geoeffnet...
start http://localhost:8000

echo.
echo ========================================
echo  App laeuft auf: http://localhost:8000
echo ========================================
echo.
echo Zum Beenden:
echo 1. Dieses Fenster schliessen
echo 2. Im Task-Manager "python.exe" beenden
echo.
echo Oder druecke eine Taste zum Beenden...
pause >nul

REM Kill Python server
taskkill /F /IM python.exe >nul 2>&1
echo Server beendet.
timeout /t 1 >nul
