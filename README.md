# Willkommen!
<img width="300" align="right" src="https://github.com/sebastianbroc/websynth/assets/63352229/8a731d5a-95dc-42da-81fe-cc67ab6baa50"> 
Willkommen im GitHub-Repository des modularen, web-basierten Synthesizers <b>"Websynth"</b>. Diese Webanwendung entstand im Rahmen meiner Masterarbeit mit dem Thema "Explorative Konzeption und Implementierung einer Web-basierten Plattform zur musikalischen Echtzeit-Kollaboration an Modular-Synthesizern" im Sommersemester 2024 im Studiengang Medieninformatik an der TH Köln.

Das Projekt wird von [Prof. Christian Noss](https://www.th-koeln.de/personen/christian.noss/) und [Prof. Dr. Christian Faubel](https://www.th-koeln.de/personen/christian.faubel/) betreut.
<br clear="both">


# Warum ein Modular-Synthesizer im Web?
Modular-Synthesizer sind Instrumente, welche ein einzigartiges Level an Anpassungsfähigkeit an den Besitzer verfügen. Wie der Name schon sagt, besteht der Synthesizer aus einzelnen Modulen - in sich abgeschlossenen, elektronischen Bauteilen, welche nach Belieben angeordnet werden können. Dadurch kann der Synthesizer genauestens auf die Bedürfnisse des Besitzers zugeschnitten werden, dieser Umstand birgt jedoch auch Nachteile.

Wenn beispielsweise mehr als eine Person gleichzeitig an dem Synthesizer arbeiten möchte, können sich mehrere Hände schnell in die Quere kommen. Außerdem ist das gemeinsame Arbeiten über Distanz nahezu unmöglich - ein Modular-Synthesizer gleicht keinem anderen, sodass für die Zusammenarbeit stets ein örtlicher Bezug nötig ist.

Das Web bietet durch seine geräteunabhängige Zugänglichkeit viele Vorteile, welche es attraktiv für die Nachbildung eines Modular-Synthesizers im Web machen. Besonders unter dem Gesichtspunkt der Kollaboration über Distanz besteht Potenzial, den beschriebenen Nachteilen eines physischen Synthesizers entgegenzuwirken.

# Wie funktioniert das System?
Die Generierung von Audio erfolgt über die [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), welches als Standard von einer Arbeitsgruppe der [W3C](https://www.w3.org/) entwickelt wird und somit eine Grundlage mit starkem Backing bietet. Detailliertere Informationen über den Tech-Stack und die Systemarchitektur sind dem [Wiki](https://github.com/sebastianbroc/websynth/wiki) zu entnehmen. 

Während des Projekts getroffene Architekturentscheidungen wurden anhand von [Architectural Decision Records (ADRS)](https://adr.github.io/) im Markdown-Format dokumentiert und sind [hier](https://github.com/sebastianbroc/websynth/tree/main/docs/decisions) zu finden.

# Wo kann es genutzt werden?
Das System ist via GitHub Pages unter diesem Link verfügbar: https://sebastianbroc.github.io/websynth/
