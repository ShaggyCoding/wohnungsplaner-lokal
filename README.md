# Raumplaner Lokal

Eine vollständig lokale, deutschsprachige Desktop-Web-App zur maßstabsgetreuen Wohnungsplanung. Sie benötigt weder Cloud noch Konto oder API-Schlüssel. Projekte und persönliche Möbel werden im lokalen Browser-Speicher abgelegt.

## Start unter Windows

1. `start.bat` doppelklicken.
2. Der Standardbrowser öffnet `http://localhost:8765`.
3. Das Konsolenfenster während der Nutzung geöffnet lassen; zum Beenden schließen.

Voraussetzung ist Node.js. Es werden keine Pakete installiert. Alternativ im Ordner `node server.js` ausführen. Die App lässt sich über die Browser-Funktion „App installieren“ wie eine eigenständige Desktop-App an Startmenü und Taskleiste anheften.

## Bedienung

- Projektübersicht: Projekte erstellen, öffnen, umbenennen oder löschen.
- Wand: Start- und Endpunkt klicken/ziehen; die aktuelle Länge wird eingeblendet. Danach ist die Länge rechts exakt in Zentimetern einstellbar.
- Wandlängen werden direkt am Grundriss angezeigt. Ausgewählte Wandendpunkte lassen sich an ihren Griffen verschieben; Eckverbindungen werden geschlossen dargestellt.
- Tür/Fenster: Werkzeug wählen und auf eine Wand klicken.
- Raum: Werkzeug wählen, Position anklicken und rechts benennen.
- Möbel: Bibliothek öffnen und Möbel anklicken oder auf den Grundriss ziehen.
- Auswahl: Linksklick wählt, Ziehen verschiebt. Eigenschaften und Maße stehen rechts.
- Die Eckgriffe eines ausgewählten Möbels ändern Breite und Tiefe. Der runde Griff darüber dreht das Möbel in 5°-Schritten.
- Navigation: Mausrad zoomt; mittlere Maustaste oder Leertaste + Ziehen verschiebt die Ansicht.
- Tastatur: `Entf` löscht, `Strg+Z` macht rückgängig, `Strg+Y` wiederholt, `Esc` wechselt zur Auswahl.
- Einrasten: Rastergröße rechts einstellen. Beim Ziehen `Alt` halten, um den Fang vorübergehend auszuschalten.
- Varianten: Oben eine Variante auswählen oder die aktuelle über „+ Variante“ duplizieren.
- Export: „PNG exportieren“ speichert die aktuelle Ansicht als Bild.

### 3D-Ansicht und Dekoration

- Mit **2D / 3D** in der oberen Leiste wird zwischen Bearbeitung und räumlicher Vorschau gewechselt.
- In der 3D-Ansicht dreht Ziehen die Kamera; das Mausrad zoomt. Möbel, Dekorationen, Wände, Türen und Fenster werden räumlich dargestellt.
- Leertaste plus Ziehen oder die mittlere Maustaste verschiebt die 3D-Kamera. „Ansicht“ zentriert die Szene erneut.
- Fenster und Türen sind echte Aussparungen in den 3D-Wänden. Fenster besitzen Glas und Rahmen; Wandteile über und unter Öffnungen werden getrennt aufgebaut.
- Standardmöbel verwenden eigene 2D-Symbole und zusammengesetzte 3D-Geometrie, beispielsweise Matratze und Kissen beim Bett oder Platte und Beine beim Tisch.
- Unter **3D-Darstellung** stehen fünf Wandmodi bereit: automatischer Schnitt, alle Wände, ausgewählte Wand ausblenden, niedrige Wände und alle Wände ausblenden. Wandhöhe und Bodenraster sind ebenfalls einstellbar.
- Um gezielt eine Wand auszublenden: in 2D die Wand auswählen, zu 3D wechseln und „Ausgewählte ausblenden“ wählen.
- Zusätzlich kann eine Wand in ihrem 2D-Eigenschaftenbereich dauerhaft für 3D aus- oder wieder eingeblendet werden. „Alle anzeigen“ übergeht diese individuellen Ausblendungen vorübergehend.
- Das Werkzeug **Deko** öffnet Pflanzen, Teppiche, Lampen, Wandbilder, Spiegel und Wandleuchten.
- Bodenobjekte werden wie Möbel platziert. Wandbilder, Spiegel und Wandleuchten müssen direkt auf eine Wand geklickt werden und bleiben beim Verschieben an einer Wand gebunden.
- Fenster werden mit realistischen Standardmaßen (120 cm breit, 120 cm hoch, 90 cm Brüstung) erzeugt und erscheinen in 2D und 3D.
- Der PNG-Export funktioniert sowohl für die 2D- als auch für die 3D-Ansicht.

Kollidierende Möbel werden rot umrandet. Ein `≈` kennzeichnet Möbel mit nicht bestätigten, geschätzten Maßen.

## Eigenes Möbel

„+ Eigenes“ öffnet den Importdialog. Dort lassen sich Referenzfotos auswählen, Name, Kategorie, Farbe und reale Breite/Tiefe/Höhe eingeben. Die App erzeugt daraus eine maßstabsgetreue Grundrissbox für die persönliche Bibliothek. Die Fotos selbst werden in Version 1 aus Datenschutz- und Speichergründen nur als lokale Importreferenz geführt, nicht dauerhaft kopiert.

Das Möbelmodell enthält bereits `modelPath`, `pivot`, `orientation`, `source`, `confirmed` sowie ein versioniertes `reconstruction`-Objekt. Eine spätere Fotogrammetrie- oder KI-Rekonstruktion kann damit einen Modellpfad und Ergebnisstatus ergänzen, ohne den Grundrisseditor zu verändern. Unbestätigte Schätzmaße bleiben ausdrücklich markiert.

## Projektstruktur

- `index.html` – Oberfläche und Dialoge
- `style.css` – responsives, helles Erscheinungsbild
- `app.js` – Datenmodell, Projektverwaltung, Canvas-Editor, Undo/Redo und Export
- `server.js` – kleiner lokaler HTTP-Server ohne Abhängigkeiten
- `manifest.json` – installierbare PWA-Metadaten
- `start.bat` – Windows-Start

## Lokale Daten und Sicherung

Projekte liegen im Local Storage des Browsers unter `raumplaner.projects.v1`, eigene Möbel unter `raumplaner.library.v1`. Das ist offline und lokal, aber an das Browserprofil gebunden. Das Löschen der Website-Daten entfernt Projekte. Eine dateibasierte Projekt-Sicherung (`.json`) ist der wichtigste nächste Ausbauschritt.

## Technischer Hinweis

Godot 4 war in der lokalen Umgebung nicht installiert. Deshalb ist Version 1 als dependency-freie Canvas-PWA umgesetzt: sofort startbar, offline, lokal und auf Windows installierbar. Die Daten sind bewusst engine-unabhängig in Zentimetern strukturiert, sodass eine spätere Godot-Ansicht oder 3D-Schicht ergänzt werden kann.
