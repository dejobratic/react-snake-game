(this["webpackJsonpreact-snake-game"]=this["webpackJsonpreact-snake-game"]||[]).push([[0],[,,,,,,,function(e,t,n){e.exports=n.p+"static/media/snake-graphics.f20532e3.png"},function(e,t,n){e.exports=n(15)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(4),i=n.n(c),o=n(5),u=n(1),l=Object(a.createContext)({}),s=function(e){var t=e.children;return r.a.createElement(l.Provider,{value:{levelSettings:{size:[640,640],tileSize:32}}},t)},f=n(6),v=n.n(f),m=function(e,t,n,a,r,c){for(var i=0;i<c.length;i++){var o=c[i],u=o[0],l=o[1],s=u*t,f=l*t,v=0,m=0;if(0===i)l<(b=c[i+1])[1]?(v=3,m=0):u>b[0]?(v=4,m=0):l>b[1]?(v=4,m=1):u<b[0]&&(v=3,m=1);else if(i===c.length-1){(d=c[i-1])[1]<l?(v=3,m=2):d[0]>u?(v=4,m=2):d[1]>l?(v=4,m=3):d[0]<u&&(v=3,m=3)}else{var d=c[i-1],b=c[i+1];d[0]<u&&b[0]>u||b[0]<u&&d[0]>u?(v=1,m=0):d[0]<u&&b[1]>l||b[0]<u&&d[1]>l?(v=2,m=0):d[1]<l&&b[1]>l||b[1]<l&&d[1]>l?(v=2,m=1):d[1]<l&&b[0]<u||b[1]<l&&d[0]<u?(v=2,m=2):d[0]>u&&b[1]<l||b[0]>u&&d[1]<l?(v=0,m=1):(d[1]>l&&b[0]>u||b[1]>l&&d[0]>u)&&(v=0,m=0)}n&&r.drawImage(n,v*a,m*a,a,a,s/t,f/t,1,1)}},d=function(e,t,n,a,r,c){n&&r.drawImage(n,0,3*a,a,a,c[0],c[1],1,1)},b=n(7),h=n.n(b),g=function(e,t){var n=v()(h.a),a=Object(u.a)(n,1)[0];return[m.bind(void 0,e,t,a,64),d.bind(void 0,e,t,a,64)]},O=function(e,t,n){var r=Object(a.useRef)();return Object(a.useEffect)((function(){var a=r.current.getContext("2d");a.setTransform(t,0,0,t,0,0),a.clearRect(0,0,e[0],e[1]),n(a)}),[e,t,n]),r},p=function(e){var t=e.snake,n=e.apple,c=Object(a.useContext)(l).levelSettings,i=g(c.size,c.tileSize),o=Object(u.a)(i,2),s=o[0],f=o[1],v=O(c.size,c.tileSize,(function(e){f(e,n),s(e,t)}));return r.a.createElement(r.a.Fragment,null,r.a.createElement("canvas",{ref:v,width:"".concat(c.size[0],"px"),height:"".concat(c.size[1],"px")}))},j=function(e,t){var n=Object(a.useRef)();Object(a.useEffect)((function(){n.current=e}),[e]),Object(a.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])},S={38:[0,-1],40:[0,1],37:[-1,0],39:[1,0]},z=[[8,10],[8,11]],E=[8,3],w=S[38],k=function(){var e=Object(a.useContext)(l).levelSettings,t=Object(a.useState)(z),n=Object(u.a)(t,2),c=n[0],i=n[1],s=Object(a.useState)(E),f=Object(u.a)(s,2),v=f[0],m=f[1],d=Object(a.useState)(w),b=Object(u.a)(d,2),h=b[0],g=b[1],O=Object(a.useState)(null),k=Object(u.a)(O,2),x=k[0],y=k[1],C=Object(a.useState)(!1),I=Object(u.a)(C,2),N=I[0],R=I[1],J=function(e){var t=e.keyCode;t<37||t>40||h===S[38]&&40===t||h===S[40]&&38===t||h===S[37]&&39===t||h===S[39]&&37===t||g(S[t])},T=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c,a=Object(o.a)(n);try{for(a.s();!(t=a.n()).done;){var r=t.value;if(e[0]===r[0]&&e[1]===r[1])return!0}}catch(i){a.e(i)}finally{a.f()}},M=function(){var t,n,a,r=(t=c,JSON.parse(JSON.stringify(t))),o=[r[0][0]+h[0],r[0][1]+h[1]];if(r.unshift(o),((n=o)[0]*e.tileSize>=e.size[0]||n[0]<0||n[1]*e.tileSize>=e.size[1]||n[1]<0||T(o))&&(y(null),R(!1)),(a=r)[0][0]===v[0]&&a[0][1]===v[1]){var u=function(t){var n=null;do{n=v.map((function(t,n){return Math.floor(Math.random()*e.size[n]/e.tileSize)}))}while(T(n,t));return n}(r);m(u)}else r.pop();i(r)};return j((function(){return M()}),x),r.a.createElement("div",{className:"game-container",tabIndex:"0",role:"button",onKeyDown:function(e){var t=e.keyCode;N?J({keyCode:t}):(i(z),m(E),g(w),y(100),R(!0))},style:{width:"".concat(e.size[0]+20,"px"),height:"".concat(e.size[1]+20,"px")}},r.a.createElement(p,{snake:c,apple:v}),!N&&r.a.createElement("div",{className:"game-message"},"PRESS ANY KEY TO START!"))},x=(n(13),function(){return r.a.createElement(s,null,r.a.createElement(k,null))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(14);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.453035f6.chunk.js.map