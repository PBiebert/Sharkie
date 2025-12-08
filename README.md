# Sharkie – Änderungsdokumentation / Patch Notes

Diese README dokumentiert alle vorgenommenen Änderungen, Bugfixes und
Ergänzungen am Projekt **Sharkie**.

---

## Bugfixes & funktionale Anpassungen

### Verbesserte Kollisionserkennung

**`isCollidingCollectableObjects()`**

- Ein `pickupOffset = -20` wurde ergänzt, um Kollisionen mit Collectables
  präziser zu erkennen.

**`isColliding()`**

- Ein Fehler wurde behoben: Sharkie erhält nun korrekt Schaden, auch wenn er
  **links** mit einem Gegner kollidiert.

---

## Soundanpassungen

- Lautstärken aller Soundeffekte wurden **halbiert**.
- Der Ansatz, Sound-Einstellungen im `localStorage` zu speichern, wurde **nicht
  übernommen**, da Browser Audio ohne Nutzeraktion blockieren und die Änderung
  daher keine Wirkung gehabt hätte.

---

## Inhaltliche Aktualisierungen

- Das zuvor geprüfte Projekt basierte auf einem älteren Stand.  
  In der aktuellen Version wurden ergänzt:
  - **Story**
  - **Favicon**

---

## Verbesserungen für mobile Endgeräte

### Mobile Steuerung

- Mobile Buttons können jetzt zusätzlich **mit der Maus** gesteuert werden.

### Hinweis zum Drehen des Geräts

- Das Problem mit der Aufforderung „Handy drehen“ konnte **nicht reproduziert**
  werden.
- Die Orientierung wird aktuell über `screen.orientation.type` geprüft
  (`portrait-primary`), was stabil funktioniert.

### Kontextmenü deaktiviert

- Das **Contextmenü** auf mobilen Buttons wurde deaktiviert, um ungewollte
  Browser-Popups zu verhindern.

---

## Gameplay-Anpassungen

- Wenn **toxic Bubbles** leer sind, können **normale Bubbles** geschossen
  werden.  
  Diese verursachen **weniger Schaden**, sorgen aber für flüssiges Gameplay.
