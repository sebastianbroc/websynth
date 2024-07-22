# Welche Technologie wird genutzt, um die Arbeitsfläche des Modular-Synthesizers umzusetzen?
* Datum: 2024-05-12

## Kontext und Problematik

Für die Umsetzung der Arbeitsfläche wird eine geeignete Library benötigt. Diese Library muss es ermöglichen, Module (Synthesizer-Komponenten) visuell darzustellen, zu verschieben, zu verbinden und deren Einstellungen zu ändern. Da die Architektur der Library die Struktur und Verwaltung der Daten beeinflusst, ist die Auswahl einer passenden Library entscheidend für die Effizienz und Wartbarkeit des Projekts.


## Optionen

* JointJS
* GoJS
* Vue Flow

## Entscheidung

Nach Abwägung der Anforderungen und Optionen fiel die Entscheidung auf Vue Flow.

## Vor- und Nachteile der Optionen

### JointJS

#### Vorteile:
* Umfangreiche Funktionen für die Erstellung von Diagrammen und interaktiven Elementen.
* Hohe Flexibilität und Anpassbarkeit.

#### Nachteile:
* Steile Lernkurve und komplexe API.
* Kann bei umfangreichen Anwendungen performanceprobleme aufweisen.
* Integration in Vue.js erfordert zusätzlichen Aufwand.


### GoJS

#### Vorteile:
* Leistungsstark und bietet viele eingebaute Features für Diagramme und Visualisierungen.
* Gute Performance auch bei großen Diagrammen.

#### Nachteile:
* Kostenpflichtig für kommerzielle Projekte, was das Budget unter Umständen belasten könnte.
* Integration in Vue.js nicht so nahtlos wie bei anderen Optionen.
* Lernkurve steiler als bei anderen Optionen.

### Vue Flow

#### Vorteile:
* Nahtlose Integration in Vue.js, da es speziell für dieses Framework entwickelt wurde.
* Durch Entwicklung für Vue 3 auf neuestem Stand der Technik.
* Einfache und intuitive API, die die Implementierung erleichtert.
* Unterstützt Echtzeit-Updates und interaktive Manipulation von Elementen.
* Gute Dokumentation und wachsende Community.

#### Nachteile:
* Kleinere Community im Vergleich zu etablierten, allgemeinen Libraries wie JointJS.
* Weniger Funktionen out-of-the-box als einige spezialisierte Libraries, jedoch ausreichend für die Anforderungen des Projekts.
