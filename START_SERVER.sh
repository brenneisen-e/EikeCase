#!/bin/bash

echo "========================================"
echo " EikeCase - Impact Navigator"
echo " Lokaler Server wird gestartet..."
echo "========================================"
echo ""
echo "Öffne deinen Browser und gehe zu:"
echo "http://localhost:8000"
echo ""
echo "Drücke Strg+C zum Beenden"
echo ""

cd dist
python3 -m http.server 8000
