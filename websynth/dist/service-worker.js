if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,r)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let o={};const l=e=>n(e,i),u={module:{uri:i},exports:o,require:l};s[i]=Promise.all(t.map((e=>u[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-6567b62a"],(function(e){"use strict";e.setCacheNameDetails({prefix:"websynth"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/websynth/css/app.10555fc7.css",revision:null},{url:"/websynth/index.html",revision:"4b57064885bb26a622be1b29f6b9ebce"},{url:"/websynth/js/about.2fad42c8.js",revision:null},{url:"/websynth/js/app.60524327.js",revision:null},{url:"/websynth/js/chunk-vendors.76e481ba.js",revision:null},{url:"/websynth/manifest.json",revision:"bbee2277b7ca6d77d7482dfff75fa310"},{url:"/websynth/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
