"use strict";(self.webpackChunkreact_xr_ui=self.webpackChunkreact_xr_ui||[]).push([[541],{228:function(e,t,n){n.d(t,{Z:function(){return f}});var r=n(462),a=n(294),o=n(477),i=n(149),l=n(561),c=n.n(l);let s=-1;const u=a.createContext({parentUuid:null,currentChildren:[],addChild(){},removeChild(){}}),d=[0,0];function m(e,t){let{zIndex:n=0,resolution:l=2048,visible:m=!0,autoLayout:h=!0,width:f=1,height:g=1,opacity:p=1,backgroundColor:v="transparent",backgroundImage:b,backgroundSize:x,backgroundPosition:w=d,borderRadius:C=0,borderWidth:M=0,borderColor:E="transparent",flexDirection:k="row",alignItems:y="center",justifyContent:I="center",gap:U=0,textContent:S,textAlign:R="left",justifyText:T=!1,verticalAlign:z="top",color:A="white",fontFamily:D="system-ui, sans-serif",fontSize:P=.1,fontWeight:W="normal",childIndex:j,children:O,...Z}=e;const B=a.useMemo((()=>++s),[]),L=(0,i.w)((e=>e.gl)),_=a.useRef(null),F=a.useRef(null),G=a.useContext(u),N=a.useMemo((()=>o.MathUtils.generateUUID()),[]);a.useEffect((()=>{if(null!==G.parentUuid)return G.addChild({width:f,height:g,index:j,uuid:N}),()=>{G.removeChild(N)}}),[f,g,j,G.parentUuid]);const V=a.useMemo((()=>document.createElement("canvas").getContext("2d")),[]);a.useMemo((()=>{V.canvas.width=Math.max(1,Math.floor(f*l)),V.canvas.height=Math.max(1,Math.floor(g*l))}),[V.canvas,f,g,l]);const q=a.useMemo((()=>{const e=new o.CanvasTexture(V.canvas);return e.anisotropy=L.capabilities.getMaxAnisotropy(),e}),[V.canvas,L.capabilities,f,g]),H=a.useMemo((()=>({backgroundImage:new Image})),[]);a.useMemo((()=>{H.backgroundImage.src=b}),[H.backgroundImage,b]),(0,i.x)((()=>{const e=V.canvas.width,t=V.canvas.height,n=Math.PI/180,r=(e+t)/2,{mapLinear:a}=o.MathUtils;V.globalCompositeOperation="source-over",V.clearRect(0,0,e,t);{const a=Array.isArray(C),o=C,i=C;let[l=0,c=0,s=0,u=0]=a?o:[i,i,i,i];l*=r,c*=r,s*=r,u*=r,V.beginPath(),V.moveTo(l,0),V.lineTo(e-c,0),V.arc(e-c,c,c,270*n,360*n),V.lineTo(e,t-s),V.arc(e-s,t-s,s,0,90*n),V.lineTo(u,t),V.arc(u,t-u,u,90*n,180*n),V.lineTo(0,l),V.arc(l,l,l,180*n,270*n),V.closePath()}V.globalAlpha=p,V.fillStyle=v,V.lineWidth=M*r*2,V.fill();const i=M*r,l=M*r;if(void 0!==b){const n=w[0],r=w[1],o=0,c=0,s=H.backgroundImage.width,u=H.backgroundImage.height,d=s/u,m=e/t;let h=s,f=u;switch(x){case"stretch":h=e,f=t;break;case"contain":h=e-2*i,f=t-2*l,d>m?f=h/d:h=f*d;break;case"cover":h=e-2*i,f=t-2*l,d<m?f=h/d:h=f*d}const g=i+a(n,0,1,0,e-2*i-h),p=l+a(r,0,1,0,t-2*l-f);V.save(),V.clip(),V.drawImage(H.backgroundImage,o,c,s,u,g,p,h,f),V.restore()}void 0!==S&&(c().font=D,c().fontSize=P*Math.min(e,t),c().align=R,c().vAlign=z,c().justify=T,c().fontWeight=W,V.textBaseline="bottom",V.fillStyle=A,c().drawText(V,S,i,l,e-2*i,t-2*l)),V.globalCompositeOperation="destination-out",V.stroke(),V.globalCompositeOperation="source-over",V.save(),V.clip(),V.strokeStyle=E,V.stroke(),V.restore(),q.needsUpdate=!0}));const[J,K]=a.useState([]),Q=a.useMemo((()=>J.map((()=>a.createRef()))),[J]);a.useEffect((()=>{const e={width:f,height:g};e.width-=2*M,e.height-=2*M;let t=[...Q];["column","row-reverse"].includes(k)&&t.reverse(),t.forEach(((t,n)=>{const[r,a]=function(e){let{currentChildren:t,index:n,flexDirection:r,alignItems:a,justifyContent:o,gap:i,size:l}=e;const c=t.reduce(((e,t)=>e+t.width),0),s=t.reduce(((e,t)=>e+t.height),0);let u=0,d=0,m=c,h="width",f="height";if(["column","column-reverse"].includes(r)&&(h="height",f="width",m=s),t.length>0&&!["space-between","space-around"].includes(o)&&(m+=i*(t.length-1)),"start"===o){u=.5*l[h]+.5*t[0][h]-l[h],"column"===r&&(u=.5*l[h]+.5*t[0][h]-m);for(let e=1;e<=n;e++)u+=.5*t[e-1][h]+.5*t[e][h]+i}if("center"===o){u=.5*t[0][h]-.5*m;for(let e=1;e<=n;e++)u+=.5*t[e-1][h]+.5*t[e][h]+i}if("end"===o){u=.5*l[h]+.5*t[0][h]-m,"column"===r&&(u=.5*l[h]+.5*t[0][h]-l[h]);for(let e=1;e<=n;e++)u+=.5*t[e-1][h]+.5*t[e][h]+i}if("space-between"===o)if(m>=l[h]){u=.5*l[h]+.5*t[0][h]-l[h];for(let e=1;e<=n;e++)u+=.5*t[e-1][h]+.5*t[e][h]}else{let e=Math.max(0,l[h]-m);0===t.length?e=0:e>0&&(e/=t.length-1),u=.5*l[h]+.5*t[0][h]-l[h];for(let r=1;r<=n;r++)u+=.5*t[r-1][h]+.5*t[r][h]+e}if("space-around"===o)if(m>=l[h]){u=.5*l[h]+.5*t[0][h]-l[h];for(let e=1;e<=n;e++)u+=.5*t[e-1][h]+.5*t[e][h]}else{let e=Math.max(0,l[h]-m);0===t.length?e=0:e>0&&(e/=t.length+1),u=.5*l[h]+.5*t[0][h]-l[h],u+=e;for(let r=1;r<=n;r++)u+=.5*t[r-1][h]+.5*t[r][h]+e}return"start"===a&&(["row","row-reverse"].includes(r)&&(d=.5*l[f]-.5*t[n][f]),["column","column-reverse"].includes(r)&&(d=-.5*l[f]+.5*t[n][f])),"end"===a&&(["row","row-reverse"].includes(r)&&(d=-.5*l[f]+.5*t[n][f]),["column","column-reverse"].includes(r)&&(d=.5*l[f]-.5*t[n][f])),["column","column-reverse"].includes(r)?[d,u]:[u,d]}({currentChildren:J,index:n,flexDirection:k,alignItems:y,justifyContent:I,gap:U,size:e});t.current.position.x=r,t.current.position.y=a}))}),[Q,J,f,g,k,y,I,M,U]);const X=a.useMemo((()=>({currentChildren:J,parentUuid:N,addChild(e){K((t=>{const n=[...t],r=t.findIndex((t=>t.uuid===e.uuid));return-1===r?n.push({...e}):n[r]={...e},n.sort(((e,t)=>e.index-t.index))}))},removeChild(e){K((t=>t.filter((t=>t.uuid!==e))))}})),[J,N]);return a.useEffect((()=>{const e=F.current;null!==e&&e.traverse((e=>{e instanceof o.Mesh&&e.material instanceof o.Material&&(e.material.transparent=!0,e.material.opacity=p,e.material.needsUpdate=!0)}))}),[p]),a.createElement(u.Provider,{value:X},a.createElement("group",(0,r.Z)({ref:t},Z,{visible:m}),a.createElement("mesh",{renderOrder:B+n},a.createElement("planeBufferGeometry",{args:[f,g]}),a.createElement("meshBasicMaterial",{ref:_,side:o.FrontSide,opacity:p,transparent:!0,depthWrite:!1,map:q})),a.createElement("group",{renderOrder:B+n+1,ref:F},a.Children.map(O,((e,t)=>a.isValidElement(e)?a.createElement("group",{key:t,ref:Q[t]},a.cloneElement(e,{...e.props,childIndex:t})):e)))))}const h=a.forwardRef(m);h.displayName="layer";var f=h},291:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(294),a=n(369),o=n(659),i=n(846),l=n(989),c=n(581);function s(e){let{children:t}=e;const n=r.useMemo((()=>new a.d(6,6,6,10,10,10).translate(0,3,0)),[]);return r.createElement(o.de,{legacy:!0,flat:!0,linear:!0,gl:{alpha:!1}},r.createElement("color",{args:["#333333"],attach:"background"}),r.createElement("lineSegments",{geometry:n},r.createElement("lineBasicMaterial",{color:"#c0c0c0"})),r.createElement(l.c,{makeDefault:!0,position:[0,1.6,0]}),r.createElement(c.z,{makeDefault:!0,target:[0,1,-1.8]}),r.createElement("ambientLight",null),r.createElement(i.M,null),r.createElement("group",{position:[0,1,-1.88]},t))}},541:function(e,t,n){n.r(t),n.d(t,{default:function(){return s}});var r=n(294),a=n(477),o=n(149),i=n(291),l=n(228);function c(){const e=r.useRef(null),[t,n]=r.useState(0);return(0,o.x)((()=>{const t=e.current;if(null===t)return;const{mapLinear:r}=a.MathUtils,o=Date.now(),i=(1+Math.sin(.001*o))/2;t.position.x=r(i,0,1,-.5,.5),n((()=>r(i,0,1,0,.5)))})),r.createElement(l.Z,{ref:e,width:1,height:1,backgroundColor:"crimson",borderRadius:t,borderWidth:.02,borderColor:"#222222",backgroundPosition:[.5,.5]})}function s(){return r.createElement(i.Z,null,r.createElement(c,null))}}}]);
//# sourceMappingURL=541.d33c1585.chunk.js.map