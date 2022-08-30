"use strict";(self.webpackChunkreact_xr_ui=self.webpackChunkreact_xr_ui||[]).push([[547],{228:function(e,t,n){n.d(t,{Z:function(){return f}});var o=n(462),r=n(294),i=n(477),a=n(561),c=n.n(a);let u=-1;var s=n(513),l=n(71);const d=r.createContext({parentUuid:null,currentChildren:[],addChild(){},removeChild(){}}),m=[0,0];function h(e,t){let{zIndex:n=0,resolution:a=1024,visible:h=!0,autoLayout:p=!0,width:f=1,height:v=1,opacity:g=1,backgroundColor:b="transparent",backgroundImage:w,backgroundSize:y,backgroundPosition:M=m,borderRadius:x=0,borderWidth:E=0,borderColor:P="transparent",flexDirection:k="row",alignItems:C="center",justifyContent:j="center",gap:S=0,textContent:D,textAlign:F="left",justifyText:I=!1,verticalAlign:U="top",color:O="white",fontFamily:Z="system-ui, sans-serif",fontSize:L=.1,fontWeight:T="normal",lineHeight:z=null,childIndex:R,children:A,onPointerMove:W,onPointerOver:B,onPointerOut:H,onPointerDown:_,onPointerUp:G,...N}=e;const V=r.useMemo((()=>++u),[]),q=r.useRef(null),J=r.useRef(null),K=r.useRef(null);r.useEffect((()=>{const e=J.current;null!==e&&(e.blending=i.CustomBlending)}),[]),(0,r.useImperativeHandle)(t,(()=>({group:q.current,test(){console.log("Test")}})));const Q=r.useContext(d),X=r.useMemo((()=>i.MathUtils.generateUUID()),[]);r.useEffect((()=>{if(null!==Q.parentUuid)return Q.addChild({width:f,height:v,index:R,autoLayout:p,uuid:X}),()=>{Q.removeChild(X)}}),[f,v,R,p,Q.parentUuid]),r.useEffect((()=>{l.Z.add({uuid:X,object:q.current,onPointerMove:W,onPointerOver:B,onPointerOut:H,onPointerDown:_,onPointerUp:G})}),[X,W,B,H,_,G]),r.useEffect((()=>()=>{l.Z.remove(X)}),[X]);const Y=r.useMemo((()=>document.createElement("canvas").getContext("2d")),[]);r.useMemo((()=>{Y.canvas.width=Math.max(1,Math.floor(f*a)),Y.canvas.height=Math.max(1,Math.floor(v*a))}),[Y.canvas,f,v,a]);const $=r.useMemo((()=>{const e=new i.CanvasTexture(Y.canvas);return e.anisotropy=16,e.premultiplyAlpha=!0,e}),[Y.canvas,f,v]),ee=r.useMemo((()=>({backgroundImage:new Image})),[]);r.useMemo((()=>{w&&(ee.backgroundImage.src=w)}),[ee.backgroundImage,w]);const te=r.useCallback((()=>{const e=Y.canvas.width,t=Y.canvas.height,n=Math.PI/180,o=Math.min(e,t),{mapLinear:r}=i.MathUtils;Y.globalCompositeOperation="source-over",Y.clearRect(0,0,e,t);{const r=Array.isArray(x),i=x,a=x;let[c=0,u=0,s=0,l=0]=r?i:[a,a,a,a];c*=o,u*=o,s*=o,l*=o,Y.beginPath(),Y.moveTo(c,0),Y.lineTo(e-u,0),Y.arc(e-u,u,u,270*n,360*n),Y.lineTo(e,t-s),Y.arc(e-s,t-s,s,0,90*n),Y.lineTo(l,t),Y.arc(l,t-l,l,90*n,180*n),Y.lineTo(0,c),Y.arc(c,c,c,180*n,270*n),Y.closePath()}Y.globalAlpha=g,Y.fillStyle=b,Y.lineWidth=E*o*2,Y.fill();const a=E*o,u=E*o;if(void 0!==w){const n=M[0],o=M[1],i=0,c=0,s=Math.max(1,ee.backgroundImage.width),l=Math.max(1,ee.backgroundImage.height),d=s/l,m=e/t;let h=s,p=l;switch(y){case"stretch":h=e,p=t;break;case"contain":h=e-2*a,p=t-2*u,d>=m?p=h/d:h=p*d;break;case"cover":h=e-2*a,p=t-2*u,d<=m?p=h/d:h=p*d}const f=a+r(n,0,1,0,e-2*a-h),v=u+r(o,0,1,0,t-2*u-p);Y.save(),Y.clip(),Y.drawImage(ee.backgroundImage,i,c,s,l,f,v,h,p),Y.restore()}void 0!==D&&(c().font=Z,c().fontSize=L*Math.min(e,t),c().lineHeight=z*c().fontSize,c().align=F,c().vAlign=U,c().justify=I,c().fontWeight=T,Y.textBaseline="bottom",Y.fillStyle=O,c().drawText(Y,D,a,u,e-2*a,t-2*u)),Y.globalCompositeOperation="destination-out",Y.stroke(),Y.globalCompositeOperation="source-over",Y.save(),Y.clip(),Y.strokeStyle=P,Y.stroke(),Y.restore(),$.needsUpdate=!0}),[Y,ee,E,x,P,w,b,M,y,$,T,L,Z,L,z,j,U,F,D,O]);r.useEffect((()=>(s.Z.add(X,te),()=>s.Z.remove(X))),[X,te]);const[ne,oe]=r.useState([]),re=r.useMemo((()=>ne.map((()=>r.createRef()))),[ne]);r.useEffect((()=>{const e={width:f,height:v},t=Math.min(f,v);e.width-=t*E*2,e.height-=t*E*2,re.forEach(((t,n)=>{let[o,r]=function(e){let{currentChildren:t,index:n,flexDirection:o,alignItems:r,justifyContent:i,gap:a,size:c}=e;const u=t.reduce(((e,t)=>t.autoLayout?e+t.width:e),0),s=t.reduce(((e,t)=>t.autoLayout?e+t.height:e),0);let l=0,d=0,m=u,h="width",p="height";["column","column-reverse"].includes(o)&&(h="height",p="width",m=s),t.length>0&&!["space-between","space-around"].includes(i)&&(m+=a*(t.length-1)),["space-between","space-around"].includes(i)&&(a=0);const f=["row-reverse","column-reverse"].includes(o);let v=1;switch(["column","column-reverse"].includes(o)&&(v=-1),i){case"start":l=(.5*(c[h]-t[n][h])-(c[h]-m))*v;break;case"end":l=(.5*c[h]-.5*t[n][h])*v;break;case"center":l=(.5*m-.5*t[n][h])*v;break;case"space-between":case"space-around":t.length>1&&(l=(.5*c[h]-.5*t[n][h])*v)}let g=0;if(t.length>1&&("space-between"===i&&(g=Math.max(0,c[h]-m)/Math.max(1,t.length-1)),"space-around"===i&&(g=Math.max(0,c[h]-m)/Math.max(1,t.length+1))),"space-around"===i&&(l-=g*v),f)for(let e=1;e<=n;e++){const n=t[e-1];n.autoLayout&&(l-=(n[h]+g+a)*v)}else for(let e=t.length-2;e>=n;e--)t[e+1].autoLayout&&(l-=(t[e+1][h]+g+a)*v);switch(r){case"start":d=(.5*c[p]-.5*t[n][p])*v;break;case"end":d=(.5*t[n][p]-.5*c[p])*v;break;case"center":d=0}return["column","column-reverse"].includes(o)?[d,l]:[l,d]}({currentChildren:ne,index:n,flexDirection:k,alignItems:C,justifyContent:j,gap:S,size:e});ne[n].autoLayout||(o=0,r=0),t.current.position.x=o,t.current.position.y=r}))}),[re,ne,f,v,k,C,j,E,S]);const ie=r.useMemo((()=>({currentChildren:ne,parentUuid:X,addChild(e){oe((t=>{const n=[...t],o=t.findIndex((t=>t.uuid===e.uuid));return-1===o?n.push({...e}):n[o]={...e},n.sort(((e,t)=>e.index-t.index))}))},removeChild(e){oe((t=>t.filter((t=>t.uuid!==e))))}})),[ne,X]);return r.useEffect((()=>{const e=K.current;null!==e&&e.traverse((e=>{e instanceof i.Mesh&&e.material instanceof i.Material&&(e.material.transparent=!0,e.material.opacity=g,e.material.needsUpdate=!0)}))}),[g]),r.createElement(d.Provider,{value:ie},r.createElement("group",(0,o.Z)({ref:q},N,{visible:h}),r.createElement("mesh",{renderOrder:V+n},r.createElement("planeBufferGeometry",{args:[f,v]}),r.createElement("meshBasicMaterial",{ref:J,side:i.FrontSide,opacity:g,transparent:!0,depthWrite:!1,map:$})),r.createElement("group",{renderOrder:V+n+1,ref:K},r.Children.map(A,((e,t)=>r.isValidElement(e)?r.createElement("group",{key:t,ref:re[t]},r.cloneElement(e,{...e.props,childIndex:t})):e)))))}const p=r.forwardRef(h);p.displayName="layer";var f=p},71:function(e,t,n){const o=new(n(477).Matrix4);function r(e){if(e.object)return!u.interactionsState[e.object.uuid].overFired}function i(e){if(!e.object)return;const t=u.interactionsState[e.object.uuid];return t.overFired&&!t.outFired}function a(e){return!!u.pointerDown&&(e.object?!u.interactionsState[e.object.uuid].downFired:void 0)}function c(e){if(u.pointerDown)return!1;if(!e.object)return;const t=u.interactionsState[e.object.uuid];return t.downFired&&!t.upFired}const u={disabled:!1,enabled:!0,lastInteractionUuid:"",interactions:[],interactionsState:{},pointerDown:!1,cleanUp:!1,cleanDown:!1,cleanMove:!1,create(){function e(){u.enabled=!0,u.cleanMove=!0}function t(){u.enabled=!0,u.pointerDown=!0,u.cleanDown=!0}function n(){u.pointerDown=!1,u.cleanUp=!0}return window.addEventListener("pointermove",e),window.addEventListener("pointerdown",t),window.addEventListener("pointerup",n),()=>{window.removeEventListener("pointermove",e),window.removeEventListener("pointerdown",t),window.removeEventListener("pointerup",n)}},add(e){(function(e){return void 0!==e.onPointerMove||void 0!==e.onPointerOver||void 0!==e.onPointerOut||void 0!==e.onPointerDown||void 0!==e.onPointerUp})(e)&&-1===u.interactions.findIndex((t=>{var n,o;return(null===(n=t.object)||void 0===n?void 0:n.uuid)===(null===(o=e.object)||void 0===o?void 0:o.uuid)}))&&e.object&&(u.interactionsState[e.object.uuid]={downFired:!1,upFired:!1,overFired:!1,outFired:!1},u.interactions.push(e))},remove(e){const t=u.interactions.findIndex((t=>t.uuid===e));t>-1&&(u.interactions.splice(t,1),document.body.style.cursor="auto")},handle(e,t){for(let e=0,n=u.interactions.length;e<n;e++){const n=u.interactions[e];if(!n.object)continue;const o=t.intersectObject(n.object,!0);if(0===o.length){i(n)&&(u.interactionsState[n.object.uuid].outFired=!0,u.interactionsState[n.object.uuid].overFired=!1,void 0!==n.onPointerOut&&(n.onPointerOut(),document.body.style.cursor="auto"));continue}const s=o[0];r(n)&&(u.interactionsState[n.object.uuid].overFired=!0,u.interactionsState[n.object.uuid].outFired=!1,void 0!==n.onPointerOver&&(n.onPointerOver(s),document.body.style.cursor="pointer")),a(n)&&(u.interactionsState[n.object.uuid].downFired=!0,void 0!==n.onPointerDown&&n.onPointerDown(s)),c(n)&&(u.interactionsState[n.object.uuid].upFired=!0,void 0!==n.onPointerUp&&(n.onPointerUp(s),document.body.style.cursor="auto")),void 0!==n.onPointerMove&&n.onPointerMove(s)}},update(e,t,n){if(u.enabled&&!u.disabled){if(n.length>0){for(let e=0,r=n.length;e<r;e++){if("right"!==n[e].inputSource.handedness)continue;const r=n[e].controller;o.identity().extractRotation(r.matrixWorld),t.ray.origin.setFromMatrixPosition(r.matrixWorld),t.ray.direction.set(0,0,-1).applyMatrix4(o)}u.handle(e,t)}else u.handle(e,t);if(u.cleanUp&&!u.pointerDown){u.cleanUp=!1;for(const e in u.interactionsState)u.interactionsState.hasOwnProperty(e)&&(u.interactionsState[e].upFired=!1,u.interactionsState[e].downFired=!1)}u.cleanDown&&u.pointerDown&&(u.cleanDown=!1)}}};t.Z=u},513:function(e,t,n){n.d(t,{Z:function(){return i}});var o=n(71);const r=new Map;function i(e,t){r.forEach((t=>t(e))),o.Z.update(e.camera,e.raycaster,t)}i.add=(e,t)=>{r.set(e,t)},i.remove=e=>{r.has(e)&&r.delete(e)}},291:function(e,t,n){n.d(t,{Z:function(){return p}});var o=n(294),r=n(369),i=n(149),a=n(972),c=n(96),u=n(846),s=n(989),l=n(581),d=n(513),m=n(71);function h(e){let{children:t}=e;const n=(0,a.nH)((e=>e.controllers));return(0,i.x)((e=>{(0,d.Z)(e,n)})),o.useEffect((()=>m.Z.create()),[]),(0,c.c)("selectstart",(()=>{m.Z.enabled=!0,m.Z.pointerDown=!0,m.Z.cleanDown=!0})),(0,c.c)("selectend",(()=>{m.Z.pointerDown=!1,m.Z.cleanUp=!0})),o.createElement(o.Fragment,null,t)}function p(e){let{children:t}=e;const n=o.useMemo((()=>new r.d(6,6,6,10,10,10).translate(0,3,0)),[]);return o.createElement(a.de,{legacy:!0,flat:!0,linear:!0,gl:{alpha:!1}},o.createElement("color",{args:["#333333"],attach:"background"}),o.createElement("lineSegments",{geometry:n},o.createElement("lineBasicMaterial",{color:"#c0c0c0"})),o.createElement(s.c,{makeDefault:!0,position:[0,1.6,0]}),o.createElement(l.z,{makeDefault:!0,target:[0,1,-1.8]}),o.createElement("ambientLight",null),o.createElement(u.M,null),o.createElement(h,null,o.createElement("group",{position:[0,1,-1.88]},t)))}}}]);
//# sourceMappingURL=547.4b242efe.chunk.js.map