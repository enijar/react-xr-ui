"use strict";(self.webpackChunkreact_xr_ui=self.webpackChunkreact_xr_ui||[]).push([[547],{228:function(e,t,n){n.d(t,{Z:function(){return v}});var o=n(462),r=n(294),i=n(477),a=n(561),c=n.n(a),s=n(149);let u=-1;var l=n(513),d=n(71);const m=r.createContext({parentUuid:null,currentChildren:[],addChild(){},removeChild(){}}),h=[0,0];function p(e,t){let{zIndex:n=0,resolution:a=2048,visible:p=!0,autoLayout:f=!0,width:v=1,height:g=1,opacity:b=1,backgroundColor:w="transparent",backgroundImage:y,backgroundSize:x,backgroundPosition:M=h,borderRadius:E=0,borderWidth:P=0,borderColor:k="transparent",flexDirection:j="row",alignItems:C="center",justifyContent:S="center",gap:D=0,textContent:F,textAlign:I="left",justifyText:U=!1,verticalAlign:O="top",color:Z="white",fontFamily:L="system-ui, sans-serif",fontSize:T=.1,fontWeight:z="normal",lineHeight:R=null,childIndex:W,children:A,onPointerMove:B,onPointerOver:H,onPointerOut:_,onPointerDown:G,onPointerUp:N,...V}=e;const q=r.useMemo((()=>++u),[]),J=r.useRef(null),K=r.useRef(null),Q=r.useRef(null);(0,r.useImperativeHandle)(t,(()=>({group:J.current,test(){console.log("Test")}})));const X=r.useContext(m),Y=r.useMemo((()=>i.MathUtils.generateUUID()),[]);r.useEffect((()=>{if(null!==X.parentUuid)return X.addChild({width:v,height:g,index:W,autoLayout:f,uuid:Y}),()=>{X.removeChild(Y)}}),[v,g,W,f,X.parentUuid]),r.useEffect((()=>{d.Z.add({uuid:Y,object:J.current,onPointerMove:B,onPointerOver:H,onPointerOut:_,onPointerDown:G,onPointerUp:N})}),[Y,B,H,_,G,N]),r.useEffect((()=>()=>{d.Z.remove(Y)}),[Y]);const $=r.useMemo((()=>document.createElement("canvas").getContext("2d")),[]);r.useMemo((()=>{$.canvas.width=Math.max(1,Math.floor(v*a)),$.canvas.height=Math.max(1,Math.floor(g*a))}),[$.canvas,v,g,a]);const ee=r.useMemo((()=>{const e=new i.CanvasTexture($.canvas);return e.anisotropy=16,e}),[$.canvas,v,g]),te=r.useMemo((()=>({backgroundImage:new Image})),[]);r.useMemo((()=>{y&&(te.backgroundImage.src=y)}),[te.backgroundImage,y]);const ne=r.useCallback((()=>{const e=$.canvas.width,t=$.canvas.height,n=Math.PI/180,o=Math.min(e,t),{mapLinear:r}=i.MathUtils;$.globalCompositeOperation="source-over",$.clearRect(0,0,e,t);{const r=Array.isArray(E),i=E,a=E;let[c=0,s=0,u=0,l=0]=r?i:[a,a,a,a];c*=o,s*=o,u*=o,l*=o,$.beginPath(),$.moveTo(c,0),$.lineTo(e-s,0),$.arc(e-s,s,s,270*n,360*n),$.lineTo(e,t-u),$.arc(e-u,t-u,u,0,90*n),$.lineTo(l,t),$.arc(l,t-l,l,90*n,180*n),$.lineTo(0,c),$.arc(c,c,c,180*n,270*n),$.closePath()}$.globalAlpha=b,$.fillStyle=w,$.lineWidth=P*o*2,$.fill();const a=P*o,s=P*o;if(void 0!==y){const n=M[0],o=M[1],i=0,c=0,u=Math.max(1,te.backgroundImage.width),l=Math.max(1,te.backgroundImage.height),d=u/l,m=e/t;let h=u,p=l;switch(x){case"stretch":h=e,p=t;break;case"contain":h=e-2*a,p=t-2*s,d>=m?p=h/d:h=p*d;break;case"cover":h=e-2*a,p=t-2*s,d<=m?p=h/d:h=p*d}const f=a+r(n,0,1,0,e-2*a-h),v=s+r(o,0,1,0,t-2*s-p);$.save(),$.clip(),$.drawImage(te.backgroundImage,i,c,u,l,f,v,h,p),$.restore()}void 0!==F&&(c().font=L,c().fontSize=T*Math.min(e,t),c().lineHeight=R*c().fontSize,c().align=I,c().vAlign=O,c().justify=U,c().fontWeight=z,$.textBaseline="bottom",$.fillStyle=Z,c().drawText($,F,a,s,e-2*a,t-2*s)),$.globalCompositeOperation="destination-out",$.stroke(),$.globalCompositeOperation="source-over",$.save(),$.clip(),$.strokeStyle=k,$.stroke(),$.restore(),ee.needsUpdate=!0}),[$,te,P,E,k,y,w,M,x,ee,z,T,L,T,R,S,O,I,F,Z]);(0,s.x)((()=>{ne()})),r.useEffect((()=>(l.Z.add(Y,ne),()=>l.Z.remove(Y))),[Y,ne]);const[oe,re]=r.useState([]),ie=r.useMemo((()=>oe.map((()=>r.createRef()))),[oe]);r.useEffect((()=>{const e={width:v,height:g},t=Math.min(v,g);e.width-=t*P*2,e.height-=t*P*2,ie.forEach(((t,n)=>{let[o,r]=function(e){let{currentChildren:t,index:n,flexDirection:o,alignItems:r,justifyContent:i,gap:a,size:c}=e;const s=t.reduce(((e,t)=>t.autoLayout?e+t.width:e),0),u=t.reduce(((e,t)=>t.autoLayout?e+t.height:e),0);let l=0,d=0,m=s,h="width",p="height";["column","column-reverse"].includes(o)&&(h="height",p="width",m=u),t.length>0&&!["space-between","space-around"].includes(i)&&(m+=a*(t.length-1)),["space-between","space-around"].includes(i)&&(a=0);const f=["row-reverse","column-reverse"].includes(o);let v=1;switch(["column","column-reverse"].includes(o)&&(v=-1),i){case"start":l=(.5*(c[h]-t[n][h])-(c[h]-m))*v;break;case"end":l=(.5*c[h]-.5*t[n][h])*v;break;case"center":l=(.5*m-.5*t[n][h])*v;break;case"space-between":case"space-around":t.length>1&&(l=(.5*c[h]-.5*t[n][h])*v)}let g=0;if(t.length>1&&("space-between"===i&&(g=Math.max(0,c[h]-m)/Math.max(1,t.length-1)),"space-around"===i&&(g=Math.max(0,c[h]-m)/Math.max(1,t.length+1))),"space-around"===i&&(l-=g*v),f)for(let e=1;e<=n;e++){const n=t[e-1];n.autoLayout&&(l-=(n[h]+g+a)*v)}else for(let e=t.length-2;e>=n;e--)t[e+1].autoLayout&&(l-=(t[e+1][h]+g+a)*v);switch(r){case"start":d=(.5*c[p]-.5*t[n][p])*v;break;case"end":d=(.5*t[n][p]-.5*c[p])*v;break;case"center":d=0}return["column","column-reverse"].includes(o)?[d,l]:[l,d]}({currentChildren:oe,index:n,flexDirection:j,alignItems:C,justifyContent:S,gap:D,size:e});oe[n].autoLayout||(o=0,r=0),t.current.position.x=o,t.current.position.y=r}))}),[ie,oe,v,g,j,C,S,P,D]);const ae=r.useMemo((()=>({currentChildren:oe,parentUuid:Y,addChild(e){re((t=>{const n=[...t],o=t.findIndex((t=>t.uuid===e.uuid));return-1===o?n.push({...e}):n[o]={...e},n.sort(((e,t)=>e.index-t.index))}))},removeChild(e){re((t=>t.filter((t=>t.uuid!==e))))}})),[oe,Y]);return r.useEffect((()=>{const e=Q.current;null!==e&&e.traverse((e=>{e instanceof i.Mesh&&e.material instanceof i.Material&&(e.material.transparent=!0,e.material.opacity=b,e.material.needsUpdate=!0)}))}),[b]),r.createElement(m.Provider,{value:ae},r.createElement("group",(0,o.Z)({ref:J},V,{visible:p}),r.createElement("mesh",{renderOrder:q+n},r.createElement("planeBufferGeometry",{args:[v,g]}),r.createElement("meshBasicMaterial",{ref:K,side:i.FrontSide,opacity:b,transparent:!0,depthWrite:!1,map:ee})),r.createElement("group",{renderOrder:q+n+1,ref:Q},r.Children.map(A,((e,t)=>r.isValidElement(e)?r.createElement("group",{key:t,ref:ie[t]},r.cloneElement(e,{...e.props,childIndex:t})):e)))))}const f=r.forwardRef(p);f.displayName="layer";var v=f},71:function(e,t,n){const o=new(n(477).Matrix4);function r(e){if(e.object)return!s.interactionsState[e.object.uuid].overFired}function i(e){if(!e.object)return;const t=s.interactionsState[e.object.uuid];return t.overFired&&!t.outFired}function a(e){return!!s.pointerDown&&(e.object?!s.interactionsState[e.object.uuid].downFired:void 0)}function c(e){if(s.pointerDown)return!1;if(!e.object)return;const t=s.interactionsState[e.object.uuid];return t.downFired&&!t.upFired}const s={disabled:!1,enabled:!0,lastInteractionUuid:"",interactions:[],interactionsState:{},pointerDown:!1,cleanUp:!1,cleanDown:!1,cleanMove:!1,create(){function e(){s.enabled=!0,s.cleanMove=!0}function t(){s.enabled=!0,s.pointerDown=!0,s.cleanDown=!0}function n(){s.pointerDown=!1,s.cleanUp=!0}return window.addEventListener("pointermove",e),window.addEventListener("pointerdown",t),window.addEventListener("pointerup",n),()=>{window.removeEventListener("pointermove",e),window.removeEventListener("pointerdown",t),window.removeEventListener("pointerup",n)}},add(e){(function(e){return void 0!==e.onPointerMove||void 0!==e.onPointerOver||void 0!==e.onPointerOut||void 0!==e.onPointerDown||void 0!==e.onPointerUp})(e)&&-1===s.interactions.findIndex((t=>{var n,o;return(null===(n=t.object)||void 0===n?void 0:n.uuid)===(null===(o=e.object)||void 0===o?void 0:o.uuid)}))&&e.object&&(s.interactionsState[e.object.uuid]={downFired:!1,upFired:!1,overFired:!1,outFired:!1},s.interactions.push(e))},remove(e){const t=s.interactions.findIndex((t=>t.uuid===e));t>-1&&(s.interactions.splice(t,1),document.body.style.cursor="auto")},handle(e,t){for(let e=0,n=s.interactions.length;e<n;e++){const n=s.interactions[e];if(!n.object)continue;const o=t.intersectObject(n.object,!0);if(0===o.length){i(n)&&(s.interactionsState[n.object.uuid].outFired=!0,s.interactionsState[n.object.uuid].overFired=!1,void 0!==n.onPointerOut&&(n.onPointerOut(),document.body.style.cursor="auto"));continue}const u=o[0];r(n)&&(s.interactionsState[n.object.uuid].overFired=!0,s.interactionsState[n.object.uuid].outFired=!1,void 0!==n.onPointerOver&&(n.onPointerOver(u),document.body.style.cursor="pointer")),a(n)&&(s.interactionsState[n.object.uuid].downFired=!0,void 0!==n.onPointerDown&&n.onPointerDown(u)),c(n)&&(s.interactionsState[n.object.uuid].upFired=!0,void 0!==n.onPointerUp&&(n.onPointerUp(u),document.body.style.cursor="auto")),void 0!==n.onPointerMove&&n.onPointerMove(u)}},update(e,t,n){if(s.enabled&&!s.disabled){if(n.length>0){for(let e=0,r=n.length;e<r;e++){if("right"!==n[e].inputSource.handedness)continue;const r=n[e].controller;o.identity().extractRotation(r.matrixWorld),t.ray.origin.setFromMatrixPosition(r.matrixWorld),t.ray.direction.set(0,0,-1).applyMatrix4(o)}s.handle(e,t)}else s.handle(e,t);if(s.cleanUp&&!s.pointerDown){s.cleanUp=!1;for(const e in s.interactionsState)s.interactionsState.hasOwnProperty(e)&&(s.interactionsState[e].upFired=!1,s.interactionsState[e].downFired=!1)}s.cleanDown&&s.pointerDown&&(s.cleanDown=!1)}}};t.Z=s},513:function(e,t,n){n.d(t,{Z:function(){return i}});var o=n(71);const r=new Map;function i(e,t){o.Z.update(e.camera,e.raycaster,t)}i.add=(e,t)=>{r.set(e,t)},i.remove=e=>{r.has(e)&&r.delete(e)}},291:function(e,t,n){n.d(t,{Z:function(){return p}});var o=n(294),r=n(369),i=n(149),a=n(972),c=n(96),s=n(846),u=n(989),l=n(581),d=n(513),m=n(71);function h(e){let{children:t}=e;const n=(0,a.nH)((e=>e.controllers));return(0,i.x)((e=>{(0,d.Z)(e,n)})),o.useEffect((()=>m.Z.create()),[]),(0,c.c)("selectstart",(()=>{m.Z.enabled=!0,m.Z.pointerDown=!0,m.Z.cleanDown=!0})),(0,c.c)("selectend",(()=>{m.Z.pointerDown=!1,m.Z.cleanUp=!0})),o.createElement(o.Fragment,null,t)}function p(e){let{children:t}=e;const n=o.useMemo((()=>new r.d(6,6,6,10,10,10).translate(0,3,0)),[]);return o.createElement(a.de,{legacy:!0,flat:!0,linear:!0,gl:{alpha:!1}},o.createElement("color",{args:["#333333"],attach:"background"}),o.createElement("lineSegments",{geometry:n},o.createElement("lineBasicMaterial",{color:"#c0c0c0"})),o.createElement(u.c,{makeDefault:!0,position:[0,1.6,0]}),o.createElement(l.z,{makeDefault:!0,target:[0,1,-1.8]}),o.createElement("ambientLight",null),o.createElement(s.M,null),o.createElement(h,null,o.createElement("group",{position:[0,1,-1.88]},t)))}}}]);
//# sourceMappingURL=547.82dc9eac.chunk.js.map