# 🌐 GitHub Pages Deployment

Die App ist automatisch deployed auf GitHub Pages!

## 🔗 Live URL

**https://brenneisen-e.github.io/EikeCase/**

## 🚀 Automatisches Deployment

Bei jedem Push auf den Branch `claude/separate-base44-project-011CULkKep7rsZkySzBrRxdj` wird die App automatisch gebaut und deployed.

### Workflow:
1. Code wird gepusht
2. GitHub Actions baut die App
3. Deploy zu GitHub Pages
4. App ist sofort verfügbar!

## ⚙️ GitHub Pages Einstellungen

Um GitHub Pages zu aktivieren:

1. Gehe zu: **Repository → Settings → Pages**
2. Unter "Build and deployment":
   - Source: **GitHub Actions**
3. Speichern

Nach dem nächsten Push wird die App automatisch deployed.

## 🔧 Manuelles Deployment

Falls nötig, kann das Deployment manuell gestartet werden:

1. Gehe zu: **Actions → Deploy to GitHub Pages**
2. Klicke auf **Run workflow**
3. Wähle den Branch
4. Klicke auf **Run workflow**

## 📦 Build-Prozess

Der Build-Prozess:
```bash
npm ci --legacy-peer-deps
GITHUB_PAGES=true npm run build
```

Die `GITHUB_PAGES` Environment-Variable sorgt dafür, dass der richtige base path (`/EikeCase/`) verwendet wird.

## 🎯 Lokale Nutzung vs. GitHub Pages

**Lokal (mit relativen Pfaden):**
```bash
npm run build
# → base: './'
```

**GitHub Pages (mit Repository-Pfad):**
```bash
GITHUB_PAGES=true npm run build
# → base: '/EikeCase/'
```

## 🔄 Deployment-Status

Status des letzten Deployments:
- **Actions**: https://github.com/brenneisen-e/EikeCase/actions
- **Pages**: https://github.com/brenneisen-e/EikeCase/settings/pages

## 📝 Hinweise

- Der erste Deploy kann 2-5 Minuten dauern
- Änderungen sind nach dem Build sofort live
- GitHub Pages cached statische Inhalte (kann bis zu 10 Minuten dauern bis Änderungen sichtbar sind)
- Bei Cache-Problemen: Hard-Refresh im Browser (Ctrl+Shift+R)
