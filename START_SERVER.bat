@echo off
echo ========================================
echo  EikeCase - Impact Navigator
echo  Lokaler Server wird gestartet...
echo ========================================
echo.
echo Oeffne deinen Browser und gehe zu:
echo http://localhost:8000
echo.
echo Druecke Strg+C zum Beenden
echo.

cd dist
python -m http.server 8000
