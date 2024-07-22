# Welche Technologie wird genutzt, um Audio zu generieren?

* Datum: 2024-05-13

## Kontext und Problematik

Für das System wird ein geeignetes Framework zur Tonerzeugung benötigt. Das Framework muss eine präzise und flexible Klangerzeugung ermöglichen und in der Lage sein, in Echtzeit auf Benutzerinteraktionen zu reagieren. Eine nahtlose Integration in die bestehende Web-Technologie und eine gute Performance sind ebenfalls wichtig.



## Optionen

* Tone.Js
* Pizzicato.js
* Web Audio API (keine Library)

## Entscheidung

Für die Klangerzeugung des Systems wird keine Library genutzt, sondern auf die zugrundeliegende Web Audio API zurückgegriffen.

## Vor- und Nachteile der Optionen

### Tone.Js

#### Vorteile:
* Umfangreiche Funktionen für Synthesizer und Audioeffekte.
* Einfache und intuitive API, die speziell für Web-Audio-Anwendungen entwickelt wurde.
* Gute Dokumentation und aktive Community.
* Abstraktion der Web Audio API, was die Entwicklung erleichtern kann.

#### Nachteile:
* Zusätzliche Abstraktionsschicht, die potenziell zu Performance-Einbußen führen kann.
* Möglicherweise eingeschränkte Flexibilität bei sehr spezifischen Anforderungen, die nur mit der nativen Web Audio API realisierbar sind.
* Abhängigkeit von einer externen Bibliothek, die gewartet und aktualisiert werden muss.


### Pizzicato.Js

#### Vorteile:
* Einfach zu verwenden und praktische Abstraktion der Web Audio API.
* Unterstützt grundlegende Synthese und Effekte. 
* Gut geeignet für einfache Audioanwendungen.

#### Nachteile:
* Weniger umfangreiche Funktionen und Flexibilität im Vergleich zu Tone.js und Web Audio API.
* Kleinere Community und weniger Ressourcen verfügbar.
* Möglicherweise nicht leistungsfähig genug für komplexe Syntheseanforderungen eines Modular-Synthesizers.


### Web Audio API (keine Library)

#### Vorteile:
* Maximale Flexibilität und Kontrolle über die Audiowiedergabe und -verarbeitung.
* Native Unterstützung in modernen Webbrowsern, ohne zusätzliche Abhängigkeiten.
* Hohe Performance und niedrige Latenzzeiten, da keine zusätzliche Abstraktionsschicht verwendet wird.
* Ermöglicht die Implementierung spezifischer und komplexer Audioverarbeitungstechniken.
* "Built to be built upon" - und damit wie geschaffen für ein Projekt wie dieses, in welchem ein komplettes, neuartiges System geschaffen werden soll. 

#### Nachteile:
* Komplexe und umfangreiche API, die eine steilere Lernkurve erfordert.
* Erfordert mehr Entwicklungsaufwand und tiefes Verständnis der Audioprogrammierung.
* Weniger abstrahiert und daher weniger "out-of-the-box"-Funktionen im Vergleich zu Tone.js.

