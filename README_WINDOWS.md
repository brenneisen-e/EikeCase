# 🚀 EikeCase - Windows Schnellstart

## ⚡ SO EINFACH GEHT'S (Doppelklick!)

### **Schritt 1: Python installieren** (einmalig, falls noch nicht vorhanden)

1. Lade Python herunter: https://www.python.org/downloads/
2. **WICHTIG:** Bei Installation ✅ **"Add Python to PATH"** ankreuzen!
3. Python installieren

**Python schon installiert?** Prüfe in der Eingabeaufforderung:
```
python --version
```

### **Schritt 2: App starten** (jedes Mal)

**Einfach Doppelklick auf:**
```
APP_STARTEN.bat
```

Das wars! 🎉
- Der Server startet automatisch
- Der Browser öffnet sich automatisch
- Die App läuft auf http://localhost:8000

## 🖱️ Desktop-Verknüpfung erstellen (Optional)

1. **Rechtsklick** auf `APP_STARTEN.bat`
2. Wähle **"Verknüpfung erstellen"**
3. Ziehe die Verknüpfung auf den Desktop
4. Jetzt kannst du die App vom Desktop starten!

## 🛑 App beenden

- Einfach das schwarze Fenster (Konsole) schließen
- ODER im Task-Manager "python.exe" beenden

## ❓ Problemlösung

### Problem: "python wird nicht erkannt"
**Lösung:** Python ist nicht installiert oder nicht im PATH
- Python neu installieren
- Beim Installieren **"Add Python to PATH"** ankreuzen!

### Problem: "Port 8000 already in use"
**Lösung:** Ein anderer Server läuft schon
- Im Task-Manager alle "python.exe" Prozesse beenden
- Oder PC neu starten

### Problem: Browser öffnet sich nicht automatisch
**Lösung:** Manuell öffnen
- Browser starten
- Gehe zu: http://localhost:8000

## 🎯 Alternative: Ohne Python

Falls du Python nicht installieren willst:

### Option 1: VS Code + Live Server
1. VS Code installieren
2. Extension "Live Server" installieren
3. Rechtsklick auf `dist/index.html`
4. "Open with Live Server" wählen

### Option 2: Node.js
```bash
npm install
npm run dev
```

---

## 📝 Technischer Hintergrund

**Warum kann ich die HTML-Datei nicht direkt öffnen?**

Moderne Browser blockieren ES-Module aus Sicherheitsgründen beim `file://` Protokoll.
Die App muss über einen HTTP-Server (`http://`) laufen, auch wenn dieser lokal ist.

Die `APP_STARTEN.bat` Datei:
1. Startet einen kleinen Python HTTP-Server
2. Öffnet automatisch den Browser
3. Macht alles mit einem Klick!
