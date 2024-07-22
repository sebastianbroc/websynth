# Welche Technologie wird genutzt, um das Frontend-Framework umzusetzen?
* Datum: 2024-05-12

## Kontext und Problematik

Für die Entwicklung der Anwendung wird ein geeignetes Frontend-Framework benötigt. Die Anwendung muss eine hohe Interaktivität und Reaktionsfähigkeit bieten, da sie in Echtzeit auf Benutzeraktionen mehrerer Nutzer reagieren muss. Gleichzeitig soll das Framework die Entwicklung effizient gestalten und eine gute Wartbarkeit des Codes gewährleisten.


## Optionen

* React
* Vue.Js
* Kein Frontend-Framework

## Entscheidung

Nach Abwägung der Anforderungen und Optionen fiel die Entscheidung auf Vue.js als Frontend-Framework für die Entwicklung des Projekts.

## Vor- und Nachteile der Optionen

### React

#### Vorteile:
* Große und aktive Community mit umfangreicher Unterstützung.
* Hohe Flexibilität und Modularität.
* Weit verbreitet und gut dokumentiert.

#### Nachteile:
* Benötigt oft zusätzliche Bibliotheken für umfassende Lösungen (z.B. Redux für State Management).
* Die Lernkurve kann aufgrund der vielen verfügbaren Optionen steil sein.
* Kann zu komplexen Projektstrukturen führen, wenn nicht sorgfältig geplant.
* Bisher keine praktische Erfahrung mit der Entwicklung


### Vue.Js

#### Vorteile:
* Durch Erfahrung in der Entwicklung voraussichtlich unkomplizierte, schnelle Einbindung.
* State Management durch Vuex standardmäßig mit dabei.
* Reaktives Datenbindungssystem, das dynamische Benutzeroberflächen unterstützt.
* Strukturierte und modulare Codebasis erleichtert die Wartung.
* Hohe Performance und schnelle Rendering-Geschwindigkeit.

#### Nachteile:
* Kleinere Community im Vergleich zu React - daher eventuell weniger Ressourcen, was ein solch spezifisches Thema wie in diesem Projekt betrifft.

### Kein Frontend-Framework

#### Vorteile:
* Maximale Flexibilität bei der Umsetzung.
* Keine zusätzlichen Abhängigkeiten.
* Volle Kontrolle über den Code.

#### Nachteile:
* Höherer Entwicklungsaufwand, da viele Funktionen selbst implementiert werden müssen.
* Erhöhte Komplexität und längere Entwicklungszeit.
* Fehlende Standardisierung und potenziell schlechtere Wartbarkeit.
* Schwieriger, reaktive Benutzeroberflächen und State Management ohne ein Framework effizient umzusetzen.
