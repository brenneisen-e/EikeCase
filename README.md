# EikeCase - Standalone Application

Dieses Projekt ist eine eigenständige React-Anwendung, die ursprünglich von base44 stammte und nun vollständig unabhängig läuft.

## Änderungen von base44

Das Projekt wurde von der base44-Plattform entkoppelt und nutzt nun:

- **Lokale Datenspeicherung**: Alle Daten werden im Browser-LocalStorage gespeichert
- **Mock-Integrationen**: API-Aufrufe werden simuliert (z.B. LLM-Anfragen)
- **Keine externen Backend-Abhängigkeiten**: Die Anwendung läuft komplett im Frontend

## Projekt-Struktur

```
src/
├── api/
│   ├── base44Client.js      # Lokaler Client (ersetzt @base44/sdk)
│   ├── localStorage.js      # Lokale Datenspeicherung
│   ├── mockIntegrations.js  # Mock-API-Funktionen
│   ├── entities.js          # Entity-Exporte
│   └── integrations.js      # Integration-Exporte
├── components/
│   ├── case/               # Case-Präsentations-Komponenten
│   ├── manager/            # Manager-Dashboard-Komponenten
│   └── ui/                 # UI-Komponenten (shadcn/ui)
├── pages/                  # Seiten-Komponenten
├── hooks/                  # Custom React Hooks
└── lib/                    # Utility-Funktionen
```

## Standalone Nutzung (ohne npm/Node.js)

Die einfachste Art, die App zu nutzen:

1. **Öffne einfach die fertige App:**
   - Gehe in den `dist/` Ordner
   - Öffne `index.html` direkt im Browser
   - Fertig! Keine Installation nötig

Der `dist/` Ordner enthält alles Notwendige und kann kopiert/verschickt werden.

## Entwicklung (für Entwickler)

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Die Anwendung läuft dann auf `http://localhost:5173`

### Production Build erstellen

```bash
npm run build
```

Dies erstellt einen `dist/` Ordner mit allen optimierten Dateien.

## Features

- **Interaktive Weltkarte**: Besuchte Länder markieren
- **Dashboard**: Datenanalyse und Visualisierung
- **AI-Assistent**: Mock-LLM-Integration (kann mit echter API ersetzt werden)
- **Responsive Design**: Optimiert für Desktop und Mobile

## Datenspeicherung

Alle Daten werden im Browser-LocalStorage unter dem Schlüssel `eikecase_db` gespeichert. Die Daten umfassen:

- Länder und besuchte Länder
- Firmenlogos
- Systemverbindungen
- Diagramm-Daten
- API-Schlüssel
- Dashboard-Daten

## Echte AI-Integration hinzufügen

Um die Mock-LLM-Funktion durch eine echte API zu ersetzen, bearbeiten Sie:

`src/api/mockIntegrations.js` - Funktion `InvokeLLM`

Beispiel für eine echte Claude API-Integration:

```javascript
InvokeLLM: async ({ prompt, add_context_from_internet = false }) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'YOUR_API_KEY',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  return { response: data.content[0].text };
}
```

## Lizenz

Privat
