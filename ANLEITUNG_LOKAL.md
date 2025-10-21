# 🚀 EikeCase Lokal Starten - EINFACHE ANLEITUNG

Die App kann **NICHT direkt durch Doppelklick** auf index.html geöffnet werden (Browser-Sicherheit).
Du brauchst einen kleinen lokalen Server.

## ⚡ SCHNELLSTE METHODE (Windows)

### Option 1: Mit Python (falls installiert)

1. **Doppelklick auf:** `START_SERVER.bat`
2. **Browser öffnen:** http://localhost:8000
3. **Fertig!**

### Option 2: Mit VS Code Live Server

1. Installiere die Extension "Live Server" in VS Code
2. Rechtsklick auf `dist/index.html`
3. Wähle "Open with Live Server"
4. **Fertig!**

### Option 3: Mit npx (Node.js)

```bash
# Im dist/ Ordner:
npx serve
```

Dann Browser öffnen: http://localhost:3000

---

## 🐧 FÜR LINUX/MAC

1. **Im Terminal:**
   ```bash
   ./START_SERVER.sh
   ```

2. **Browser öffnen:** http://localhost:8000

---

## 🔧 ALTERNATIVE: Mit Node.js/npm

Wenn du npm hast (empfohlen für Entwickler):

```bash
# Im Hauptordner:
npm install
npm run dev
```

Dann Browser öffnen: http://localhost:5173

---

## ❓ WARUM FUNKTIONIERT DOPPELKLICK NICHT?

Moderne Browser blockieren JavaScript-Module aus Sicherheitsgründen beim `file://` Protokoll.
Du brauchst einen HTTP-Server (`http://`), auch wenn er lokal läuft.

---

## 📦 WAS DU BRAUCHST

**Mindestens eine dieser Optionen:**

✅ Python (meistens schon installiert)
✅ VS Code mit Live Server Extension
✅ Node.js mit npm

**Python prüfen:**
```bash
python --version
# oder
python3 --version
```

**Node.js prüfen:**
```bash
node --version
```

---

## 🎯 SCHNELL-CHECK

1. ✅ Hast du Python? → `START_SERVER.bat` starten
2. ✅ Hast du VS Code? → Live Server Extension nutzen
3. ✅ Hast du Node.js? → `npm run dev` nutzen
4. ❌ Nichts davon? → Installiere Python (einfachste Option)

---

## 💡 PYTHON INSTALLIEREN (falls nötig)

Windows: https://www.python.org/downloads/
- Beim Installieren: **"Add Python to PATH"** ankreuzen!

Nach Installation: `START_SERVER.bat` ausführen.
