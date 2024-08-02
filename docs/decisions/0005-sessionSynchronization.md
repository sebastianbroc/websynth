# Welche Technologie wird genutzt, um Sessions für die Zusammenarbeit zu synchronisieren?

* Datum: 2024-07-06

## Kontext und Problematik

Um die Echtzeit-Kollaboration durch mehrere Nutzer zu ermöglichen, muss eine Technologie gewählt werden, anhand welcher Daten bidirektional zwischen mehreren Instanzen der Anwendung ausgetauscht werden können. Dabei ist eine niedrige Latenz besonders wichtig. Außerdem sollte die Möglichkeit bestehen, eine "Single Source of Truth" abzubilden.


## Optionen

* WebRTC
* WebSockets
* HTTP Long Polling

## Entscheidung

Für die Synchronisierung von Patches werden WebSockets verwendet. Da alle Nachrichten über den Server geleitet werden, kann dort die Single Source of Truth umgesetzt werden. Außerdem ist es ein weitverbreiteter, erprobter Standard in anderen Web-Anwendungen, welche Echtzeit-Kommunikation in einem kollaborativen Kontext erfordern.

## Vor- und Nachteile der Optionen

### WebRTC

#### Vorteile:
* Durch direkte Peer-to-Peer Kommunikation sehr niedrige Latenz
* Keine kontinuierliche Serverauslastung und -Abhängigkeit, da Server nur zum Herstellen einer Session benötigt wird

#### Nachteile:
* Vergleichsweise hohe Einstiegsschwelle in der Entwicklung durch komplexere Implementierung
* "Single Source of Truth" schwierig umzusetzen, da es durch Peer-to-Peer keine übergeordnete Verwaltung gibt


### WebSockets

#### Vorteile:
* Durch Nutzung von Standard-HTTP-Ports Blockierung durch z.B. Firewall unwahrscheinlich
* Vollduplex-Verbindung ermöglicht gleichzeitiges Senden und Empfangen von Nachrichten
* Einfache Implementierung
* Da der Server immer zwischen der Kommunikation von zwei Clients steht, kann dort die "Single Source of Truth" verwaltet werden.

#### Nachteile:
* Erfordert eine persistente Verbindung und Neuanmeldung auf dem Server bei Verbindungsunterbrechung
* Höhere Serverauslastung und ergo eventuelle Kosten, da Server die gesamte Abwicklung von Nachrichten übernimmt

### HTTP Long Polling

#### Vorteile:
* Long Polling basiert auf XMLHttpRequests, welches beinahe-universell verfügbar ist und dadurch keine Geräteabhängige Verfügbarkeit riskiert
* Da die Kommunikation immer über den Server verwaltet wird, könnte dort die "Single Source of Truth" verwaltet werden.

#### Nachteile:
* Höhere Ressourcennutzung im Vergleich zu anderen Optionen
* In der Regel höhere Latenz im Vergleich zu anderen Optionen
