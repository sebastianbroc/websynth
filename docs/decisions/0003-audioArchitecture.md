# Wie werden die vorhandenen Audioquellen verwaltet und miteinander verbunden?

* Datum: 2024-05-26

## Kontext und Problematik

Perspektivisch wird es eine große Anzahl an virtuellen Audioquellen und -Verarbeitungsmodulen geben. Diese müssen verwaltet und miteinander verbunden werden, um Signalketten herstellen zu können. Eine optimale Leistung und Wartbarkeit sollten dabei in Betracht gezogen werden.


## Optionen

* Zentrale Verwaltung: Eine zentrale Liste führt alle Audioquellen und Module und verwaltet deren Verbindungen und Interaktionen von einer Vue-Komponente aus.
* Dezentrale Verwaltung: Jedes Modul (Vue-Komponente) verwaltet seine eigenen Audioquellen und Verbindungen unabhängig.

## Entscheidung

Die Audioquellen werden zentral in einer Frontend-Komponente verwaltet. Voraussichtlich verspricht dieser Ansatz eine höhere Übersichtlichkeit über alle aktiven Audio-Komponenten und ein leichteres Verständnis über die aktive Konfiguration.

## Vor- und Nachteile der Optionen

### Zentrale Verwaltung

#### Vorteile:
* Potenziell höhere Performance, da die Audioketten nicht über weitere Umwege hergestellt werden müssen.
* Bessere Übersichtlichkeit und generell niedrigere Komplexität.
* Einfacher zu skalieren und zu optimieren.
* Vereinfachte Kommunikation zwischen Modulen.
* Größere Flexibilität für zukünftige Erweiterungen.

#### Nachteile:
* Potenzieller Single Point of Failure.
* Kann größer und komplexer werden, wenn die Anwendung wächst und eventuell sehr viele Module vorhanden sind.


### Dezentrale Verwaltung

#### Vorteile:
* Komponenten sind eigenständig - der Code ist jeweils abgegrenzt und leichter einzeln zu verstehen.
* Fehlerquellen sind auf die Module verteilt.

#### Nachteile:
* Schwieriger, den Zustand in der gesamten Anwendung zu verwalten.
* Erhöhte Komplexität bei der Verwaltung der Kommunikation zwischen Modulen.
* Potenzial für Inkonsistenzen und schwierigeres Debugging.
* Skalierbarkeit und Leistungsoptimierungen sind schwieriger.
