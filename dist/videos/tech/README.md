# Tech Explorer Videos

Laden Sie hier Ihre Tech Explorer Videos hoch!

## Anleitung:

1. Videos in diesen Ordner hochladen (z.B. via GitHub Web Interface)
2. Erforderliche Dateinamen:
   - `private.mp4` (Video für "Private" - Mein Inventar)
   - `business.mp4` (Video für "Business" - Deloitte Platform)

3. Empfohlene Einstellungen:
   - **Format:** MP4 (H.264 Codec für beste Browser-Kompatibilität)
   - **Auflösung:** 1280x720 oder 1920x1080
   - **Dateigröße:** < 10 MB pro Video (für schnelles Laden)
   - **Länge:** 5-15 Sekunden (kurze Demo-Clips)

## Funktionsweise:

- Videos werden bei **Mouse-Over** automatisch abgespielt
- Bei **Mouse-Leave** wird das Video pausiert
- Loop: Videos laufen in Schleife während Hover
- Kein Ton: Videos werden stumm abgespielt (autoplay-konform)

## Tipps für gute Videos:

- Zeigen Sie die wichtigsten Features der jeweiligen Plattform
- Kurze, prägnante Clips funktionieren am besten
- Nutzen Sie Screen-Recording Software wie OBS, QuickTime, oder Windows Game Bar
- Komprimieren Sie die Videos für Web (z.B. mit HandBrake)

## Video-Kompression:

Für optimale Dateigröße:
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart output.mp4
```
