(function(){"use strict";var e={7082:function(e,t,n){var o=n(5130),a=n(6768);function i(e,t){const n=(0,a.g2)("router-view");return(0,a.uX)(),(0,a.Wv)(n)}var l=n(1241);const s={},r=(0,l.A)(s,[["render",i]]);var u=r,d=n(4458);(0,d.k)("/websynth/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var c=n(1387),p=n(4232);const f={class:"main"},v={id:"audioNodeList"};function h(e,t,n,o,i,l){const s=(0,a.g2)("NavBar"),r=(0,a.g2)("WorkSpace");return(0,a.uX)(),(0,a.CE)("div",f,[(0,a.bF)(s),(0,a.Lk)("p",v,(0,p.v_)(i.audioNodeList),1),(0,a.bF)(r,{onUpdateElements:l.updateElements},null,8,["onUpdateElements"])])}n(4114);var g=n(144),m=n(6805);let y=0;function b(){return"dndnode_"+y++}const k={draggedType:(0,g.KR)(null),isDragOver:(0,g.KR)(!1),isDragging:(0,g.KR)(!1)};function L(){const{draggedType:e,isDragOver:t,isDragging:n}=k,{addNodes:o,screenToFlowCoordinate:i,onNodesInitialized:l,updateNode:s}=(0,m.Id)();function r(t,o){t.dataTransfer&&(t.dataTransfer.setData("application/vueflow",o),t.dataTransfer.effectAllowed="move"),e.value=o,n.value=!0,document.addEventListener("drop",c)}function u(n){n.preventDefault(),e.value&&(t.value=!0,n.dataTransfer&&(n.dataTransfer.dropEffect="move"))}function d(){t.value=!1}function c(){n.value=!1,t.value=!1,e.value=null,document.removeEventListener("drop",c)}function p(t){const n=i({x:t.clientX,y:t.clientY}),a=b(),r={id:a,type:e.value,position:n,label:`[${a}]`},{off:u}=l((()=>{s(a,(e=>({position:{x:e.position.x-e.dimensions.width/2,y:e.position.y-e.dimensions.height/2}}))),u()}));o(r)}return(0,a.wB)(n,(e=>{document.body.style.userSelect=e?"none":""})),{draggedType:e,isDragOver:t,isDragging:n,onDragStart:r,onDragLeave:d,onDragOver:u,onDrop:p}}const w=e=>((0,a.Qi)("data-v-8b0ac6fe"),e=e(),(0,a.jt)(),e),C={class:"synth_module"},N={class:"module_label"},E=w((()=>(0,a.Lk)("h3",null,"Oscillator",-1))),O={class:"controls"},_=w((()=>(0,a.Lk)("span",null,"Hz",-1))),R=w((()=>(0,a.Lk)("option",{value:"sine",selected:""},"Sine",-1))),x=w((()=>(0,a.Lk)("option",{value:"sawtooth"},"Saw",-1))),F=w((()=>(0,a.Lk)("option",{value:"square"},"Square",-1))),M=w((()=>(0,a.Lk)("option",{value:"triangle"},"Triangle",-1))),D=[R,x,F,M];var T={__name:"OscillatorModule",props:["id","label"],emits:["nodesChange"],setup(e,{emit:t}){const{updateNodeData:n}=(0,m.Id)(),o=t,i=e;let l=e=>{n(i.id,{frequency:e}),o("moduleChanged")},s=e=>{n(i.id,{waveform:e}),o("moduleChanged")},r=(e,t)=>{n(i.id,{frequency:e,waveform:t})};return(0,a.sV)((()=>{r(400,"sine")})),(t,n)=>((0,a.uX)(),(0,a.CE)("div",C,[(0,a.bF)((0,g.R1)(m.h7),{type:"target",position:(0,g.R1)(m.yX).Top},null,8,["position"]),(0,a.bF)((0,g.R1)(m.h7),{type:"source",position:(0,g.R1)(m.yX).Bottom},null,8,["position"]),(0,a.Lk)("div",N,[E,(0,a.Lk)("p",null,(0,p.v_)(e.label),1)]),(0,a.Lk)("div",O,[(0,a.Lk)("div",null,[(0,a.Lk)("input",{type:"text",onInput:n[0]||(n[0]=e=>(0,g.R1)(l)(e.target.value)),value:"400"},null,32),_]),(0,a.Lk)("select",{onInput:n[1]||(n[1]=e=>(0,g.R1)(s)(e.target.value))},D,32)])]))}};const q=(0,l.A)(T,[["__scopeId","data-v-8b0ac6fe"]]);var I=q;const j={class:"synth_module"},A={class:"module_label"};var S={__name:"OutputModule",props:["id","label"],setup(e){const t=e,n=(0,m.Nn)({type:"target"}),o=(0,m.j7)((()=>n.value[0]?.source));return(e,n)=>((0,a.uX)(),(0,a.CE)("div",j,[(0,a.bF)((0,g.R1)(m.h7),{type:"target",position:(0,g.R1)(m.yX).Left},null,8,["position"]),(0,a.Lk)("div",A,(0,p.v_)(t.label),1),(0,a.eW)(" "+(0,p.v_)((0,g.R1)(o)&&(0,g.R1)(o).data.frequency?(0,g.R1)(o).data.frequency:null),1)]))}};const B=S;var V=B;const X=e=>((0,a.Qi)("data-v-c74f0644"),e=e(),(0,a.jt)(),e),P={class:"synth_module"},W={class:"module_label"},H=X((()=>(0,a.Lk)("h3",null,"Filter",-1))),G={class:"controls"},K=X((()=>(0,a.Lk)("span",null,"Hz",-1))),z=(0,a.Fv)('<option value="lowpass" selected data-v-c74f0644>Low-Pass</option><option value="highpass" data-v-c74f0644>High-Pass</option><option value="bandpass" data-v-c74f0644>Band-Pass</option><option value="lowshelf" data-v-c74f0644>Low-Shelf</option><option value="highshelf" data-v-c74f0644>High-Shelf</option><option value="notch" data-v-c74f0644>Notch</option>',6),$=[z],Q={data(){return{frequency:null,waveform:"sine"}}};var U=Object.assign(Q,{__name:"FilterModule",props:["id","label"],emits:["nodesChange"],setup(e,{emit:t}){const{updateNodeData:n}=(0,m.Id)(),o=t,i=e;let l=e=>{n(i.id,{type:e}),o("moduleChanged")},s=e=>{n(i.id,{frequency:e}),o("moduleChanged")},r=(e,t)=>{n(i.id,{type:e,frequency:t})};return(0,a.sV)((()=>{r("lowpass",400)})),(t,n)=>((0,a.uX)(),(0,a.CE)("div",P,[(0,a.bF)((0,g.R1)(m.h7),{type:"target",position:(0,g.R1)(m.yX).Top},null,8,["position"]),(0,a.bF)((0,g.R1)(m.h7),{type:"source",position:(0,g.R1)(m.yX).Bottom},null,8,["position"]),(0,a.Lk)("div",W,[H,(0,a.Lk)("p",null,(0,p.v_)(e.label),1)]),(0,a.Lk)("div",G,[(0,a.Lk)("div",null,[(0,a.Lk)("input",{type:"text",onInput:n[0]||(n[0]=e=>(0,g.R1)(s)(e.target.value)),value:"400"},null,32),K]),(0,a.Lk)("select",{onInput:n[1]||(n[1]=e=>(0,g.R1)(l)(e.target.value))},$,32)])]))}});const Y=(0,l.A)(U,[["__scopeId","data-v-c74f0644"]]);var J=Y,Z=n(2647),ee=n(4039);const te=(0,a.Lk)("p",null,(0,p.v_)("<"),-1),ne=[te],oe={class:"modulebar-content"},ae=(0,a.Lk)("div",{class:"description"},"Modules",-1),ie={class:"nodes"},le={name:"ModuleBar",data(){return{expanded:!1}},methods:{toggleExpansion(){this.expanded=!this.expanded}}};var se=Object.assign(le,{setup(e){const{onDragStart:t}=L();return(e,n)=>((0,a.uX)(),(0,a.CE)("div",{class:(0,p.C4)(["modulebar",{expanded:e.expanded}])},[(0,a.Lk)("button",{class:"pulltab",onClick:n[0]||(n[0]=(...t)=>e.toggleExpansion&&e.toggleExpansion(...t))},ne),(0,a.Lk)("div",oe,[(0,a.Lk)("aside",null,[ae,(0,a.Lk)("div",ie,[(0,a.Lk)("div",{class:"node vue-flow__node-oscillator",draggable:!0,onDragstart:n[1]||(n[1]=e=>(0,g.R1)(t)(e,"oscillator"))},"Oscillator",32),(0,a.Lk)("div",{class:"node vue-flow__node-filter",draggable:!0,onDragstart:n[2]||(n[2]=e=>(0,g.R1)(t)(e,"filter"))},"Filter",32)])])])],2))}});const re=se;var ue=re;const de={name:"WorkSpace",data(){return{vueFlowInstance:null,moduleList:[]}},components:{VueFlow:m.nO,MiniMap:ee.of,Background:Z.V,ModuleBar:ue},methods:{setInstance(e){console.log("instance has been set"),this.vueFlowInstance=e,this.getModules()},getModules(){this.vueFlowInstance&&this.$emit("updateElements",this.vueFlowInstance.getElements)}}};var ce=Object.assign(de,{setup(e){const{onConnect:t,addEdges:n}=(0,m.Id)(),{onDragOver:o,onDrop:i,onDragLeave:l}=L();t(n);const s={oscillator:(0,g.IG)(I),output:(0,g.IG)(V),filter:(0,g.IG)(J)},r=(0,g.KR)([{id:"3",type:"oscillator",label:"Oscillator",position:{x:400,y:200}},{id:"4",type:"output",label:"Output",position:{x:500,y:300}}]);return(e,t)=>((0,a.uX)(),(0,a.CE)("div",{class:"workspace",onDrop:t[0]||(t[0]=(...e)=>(0,g.R1)(i)&&(0,g.R1)(i)(...e))},[(0,a.bF)(ue),(0,a.bF)((0,g.R1)(m.nO),{nodes:r.value,"node-types":s,"snap-to-grid":!0,"snap-grid":[20,20],onNodesChange:e.getModules,onEdgesChange:e.getModules,onPaneReady:e.setInstance,onDragover:(0,g.R1)(o),onDragleave:(0,g.R1)(l)},{"node-oscillator":(0,a.k6)((t=>[(0,a.bF)(I,(0,a.v6)(t,{onModuleChanged:e.getModules}),null,16,["onModuleChanged"])])),"node-filter":(0,a.k6)((t=>[(0,a.bF)(J,(0,a.v6)(t,{onModuleChanged:e.getModules}),null,16,["onModuleChanged"])])),"node-output":(0,a.k6)((e=>[(0,a.bF)(V,(0,p._B)((0,a.Ng)(e)),null,16)])),default:(0,a.k6)((()=>[(0,a.bF)((0,g.R1)(Z.V)),(0,a.bF)((0,g.R1)(ee.of))])),_:1},8,["nodes","onNodesChange","onEdgesChange","onPaneReady","onDragover","onDragleave"])],32))}});const pe=ce;var fe=pe;const ve={class:"navbar"},he=(0,a.Lk)("div",{class:"navbar-content"},[(0,a.Lk)("a",null,[(0,a.Lk)("b",null,"websynth"),(0,a.eW)(" //")]),(0,a.Lk)("a",null,"home"),(0,a.Lk)("a",null,"files"),(0,a.Lk)("a",null,"view"),(0,a.Lk)("a",null,"options")],-1),ge=[he];function me(e,t,n,o,i,l){return(0,a.uX)(),(0,a.CE)("div",ve,ge)}var ye={name:"NavBar"};const be=(0,l.A)(ye,[["render",me]]);var ke=be,Le={name:"HomeView",components:{WorkSpace:fe,NavBar:ke},data(){return{audioContext:null,mainVolume:null,elements:null,audioNodeList:[]}},mounted(){this.initAudio()},methods:{initAudio(){this.audioContext=new AudioContext,this.mainVolume=this.audioContext.createGain(),this.mainVolume.connect(this.audioContext.destination),this.mainVolume.gain.value=1},updateElements(e){this.elements=e,this.elements.forEach((e=>{this.handleNodeList(e),this.buildConnection(e)}))},getModuleChild(e){return this.elements.find((t=>"default"==t.type&&t.sourceNode.id===e))},buildConnection(e){let t=this.getModuleChild(e.id);if(t){let o=this.audioNodeList.find((t=>t.id===e.id)),a=this.audioNodeList.find((e=>e.id===t.target));if(t&&!o.connected){"output"===t.targetNode.type?(o.module.connect(this.mainVolume),console.log("connected to main volume")):o.module.connect(a.module),o.connected=!0;try{o.module.start()}catch(n){}}}else try{let t=this.audioNodeList.find((t=>t.id===e.id));t.connected=!1,t.module.disconnect()}catch(n){}},handleNodeList(e){if("output"!==e.type&&"default"!==e.type){let t=this.audioNodeList.find((t=>t.id===e.id)),n=!t,o=!1;switch(t&&(t=t.module),e.type){case"filter":e.data&&e.data.frequency&&(n&&(t=this.audioContext.createBiquadFilter()),t.frequency.setValueAtTime(e.data.frequency,this.audioContext.currentTime+.01),t.type=e.data.type,o=!0);break;case"oscillator":n&&(t=this.audioContext.createOscillator()),e.data.frequency&&(t.frequency.value=e.data.frequency,t.type=e.data.waveform,n&&(t.start(),console.log("started oscillator")),o=!0);break}n&&o&&this.audioNodeList.push({id:e.id,module:t,connected:!1})}},handleOscillator(e,t,n){let o=!1;if(this.audioNodeList.forEach((a=>{if(a.id===e)if(a.module.frequency.value=t,a.module.type=n,o=!0,this.getModuleChild(e)&&"output"===this.getModuleChild(e).targetNode.type)console.log("connected to main output"),a.module.connect(this.mainVolume),a.connected=!0;else if(a.connected)try{a.module.disconnect(this.mainVolume),a.connected=!1}catch(i){a.connected=!1}})),!o){const o=this.audioContext.createOscillator();this.getModuleChild(e)&&"output"===this.getModuleChild(e).targetNode.type&&(console.log("added to osc list and connected to main output"),o.connect(this.mainVolume)),o.type=n,o.frequency.value=t,o.start(),this.audioNodeList.push({id:e,module:o,connected:!0})}}}};const we=(0,l.A)(Le,[["render",h]]);var Ce=we;const Ne=[{path:"/",name:"home",component:Ce},{path:"/about",name:"about",component:()=>n.e(594).then(n.bind(n,603))}],Ee=(0,c.aE)({history:(0,c.Bt)(),routes:Ne});var Oe=Ee,_e=n(782),Re=(0,_e.y$)({state:{},getters:{},mutations:{},actions:{},modules:{}});(0,o.Ef)(u).use(Re).use(Oe).mount("#app")}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,o,a,i){if(!o){var l=1/0;for(d=0;d<e.length;d++){o=e[d][0],a=e[d][1],i=e[d][2];for(var s=!0,r=0;r<o.length;r++)(!1&i||l>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[r])}))?o.splice(r--,1):(s=!1,i<l&&(l=i));if(s){e.splice(d--,1);var u=a();void 0!==u&&(t=u)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[o,a,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/about.2fad42c8.js"}}(),function(){n.miniCssF=function(e){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="websynth:";n.l=function(o,a,i,l){if(e[o])e[o].push(a);else{var s,r;if(void 0!==i)for(var u=document.getElementsByTagName("script"),d=0;d<u.length;d++){var c=u[d];if(c.getAttribute("src")==o||c.getAttribute("data-webpack")==t+i){s=c;break}}s||(r=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+i),s.src=o),e[o]=[a];var p=function(t,n){s.onerror=s.onload=null,clearTimeout(f);var a=e[o];if(delete e[o],s.parentNode&&s.parentNode.removeChild(s),a&&a.forEach((function(e){return e(n)})),t)return t(n)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),r&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/websynth/"}(),function(){var e={524:0};n.f.j=function(t,o){var a=n.o(e,t)?e[t]:void 0;if(0!==a)if(a)o.push(a[2]);else{var i=new Promise((function(n,o){a=e[t]=[n,o]}));o.push(a[2]=i);var l=n.p+n.u(t),s=new Error,r=function(o){if(n.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var i=o&&("load"===o.type?"missing":o.type),l=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+l+")",s.name="ChunkLoadError",s.type=i,s.request=l,a[1](s)}};n.l(l,r,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,i,l=o[0],s=o[1],r=o[2],u=0;if(l.some((function(t){return 0!==e[t]}))){for(a in s)n.o(s,a)&&(n.m[a]=s[a]);if(r)var d=r(n)}for(t&&t(o);u<l.length;u++)i=l[u],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(d)},o=self["webpackChunkwebsynth"]=self["webpackChunkwebsynth"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(7082)}));o=n.O(o)})();
//# sourceMappingURL=app.d7c53123.js.map