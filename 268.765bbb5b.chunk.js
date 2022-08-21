"use strict";(self.webpackChunkreact_xr_ui=self.webpackChunkreact_xr_ui||[]).push([[268],{228:function(e,t,n){n.d(t,{Z:function(){return g}});var r=n(462),a=n(294),o=n(477),i=n(149),l=n(561),c=n.n(l);let s=-1;const u=a.createContext({parentUuid:null,currentChildren:[],addChild(){},removeChild(){}}),d=[0,0];function m(e,t){let{zIndex:n=0,resolution:l=2048,visible:m=!0,autoLayout:h=!0,width:g=1,height:f=1,opacity:p=1,backgroundColor:v="transparent",backgroundImage:b,backgroundSize:w,backgroundPosition:x=d,borderRadius:C=0,borderWidth:k=0,borderColor:M="transparent",flexDirection:y="row",alignItems:E="center",justifyContent:I="center",gap:S=0,textContent:U,textAlign:z="left",justifyText:T=!1,verticalAlign:A="top",color:R="white",fontFamily:D="system-ui, sans-serif",fontSize:P=.1,fontWeight:W="normal",childIndex:j,children:O,...Z}=e;const B=a.useMemo((()=>++s),[]),_=(0,i.w)((e=>e.gl)),L=a.useRef(null),F=a.useRef(null),G=a.useContext(u),N=a.useMemo((()=>o.MathUtils.generateUUID()),[]);a.useEffect((()=>{if(null!==G.parentUuid)return G.addChild({width:g,height:f,index:j,uuid:N}),()=>{G.removeChild(N)}}),[g,f,j,G.parentUuid]);const V=a.useMemo((()=>document.createElement("canvas").getContext("2d")),[]);a.useMemo((()=>{V.canvas.width=Math.max(1,Math.floor(g*l)),V.canvas.height=Math.max(1,Math.floor(f*l))}),[V.canvas,g,f,l]);const q=a.useMemo((()=>{const e=new o.CanvasTexture(V.canvas);return e.anisotropy=_.capabilities.getMaxAnisotropy(),e}),[V.canvas,_.capabilities,g,f]),H=a.useMemo((()=>({backgroundImage:new Image})),[]);a.useMemo((()=>{H.backgroundImage.src=b}),[H.backgroundImage,b]),(0,i.x)((()=>{const e=V.canvas.width,t=V.canvas.height,n=Math.PI/180,r=(e+t)/2,{mapLinear:a}=o.MathUtils;V.globalCompositeOperation="source-over",V.clearRect(0,0,e,t);{const a=Array.isArray(C),o=C,i=C;let[l=0,c=0,s=0,u=0]=a?o:[i,i,i,i];l*=r,c*=r,s*=r,u*=r,V.beginPath(),V.moveTo(l,0),V.lineTo(e-c,0),V.arc(e-c,c,c,270*n,360*n),V.lineTo(e,t-s),V.arc(e-s,t-s,s,0,90*n),V.lineTo(u,t),V.arc(u,t-u,u,90*n,180*n),V.lineTo(0,l),V.arc(l,l,l,180*n,270*n),V.closePath()}V.globalAlpha=p,V.fillStyle=v,V.lineWidth=k*r*2,V.fill();const i=k*r,l=k*r;if(void 0!==b){const n=x[0],r=x[1],o=0,c=0,s=H.backgroundImage.width,u=H.backgroundImage.height,d=s/u,m=e/t;let h=s,g=u;switch(w){case"stretch":h=e,g=t;break;case"contain":h=e-2*i,g=t-2*l,d>m?g=h/d:h=g*d;break;case"cover":h=e-2*i,g=t-2*l,d<m?g=h/d:h=g*d}const f=i+a(n,0,1,0,e-2*i-h),p=l+a(r,0,1,0,t-2*l-g);V.save(),V.clip(),V.drawImage(H.backgroundImage,o,c,s,u,f,p,h,g),V.restore()}void 0!==U&&(c().font=D,c().fontSize=P*Math.min(e,t),c().align=z,c().vAlign=A,c().justify=T,c().fontWeight=W,V.textBaseline="bottom",V.fillStyle=R,c().drawText(V,U,i,l,e-2*i,t-2*l)),V.globalCompositeOperation="destination-out",V.stroke(),V.globalCompositeOperation="source-over",V.save(),V.clip(),V.strokeStyle=M,V.stroke(),V.restore(),q.needsUpdate=!0}));const[J,K]=a.useState([]),Q=a.useMemo((()=>J.map((()=>a.createRef()))),[J]);a.useEffect((()=>{const e={width:g,height:f};e.width-=2*k,e.height-=2*k;let t=[...Q];["column","row-reverse"].includes(y)&&t.reverse(),t.forEach(((t,n)=>{const[r,a]=function(e){let{currentChildren:t,index:n,flexDirection:r,alignItems:a,justifyContent:o,gap:i,size:l}=e;const c=t.reduce(((e,t)=>e+t.width),0),s=t.reduce(((e,t)=>e+t.height),0);let u=0,d=0,m=c,h="width",g="height";if(["column","column-reverse"].includes(r)&&(h="height",g="width",m=s),t.length>0&&!["space-between","space-around"].includes(o)&&(m+=i*(t.length-1)),"start"===o){u=.5*l[h]+.5*t[0][h]-l[h],"column"===r&&(u=.5*l[h]+.5*t[0][h]-m);for(let e=1;e<=n;e++)u+=.5*t[e-1][h]+.5*t[e][h]+i}if("center"===o){u=.5*t[0][h]-.5*m;for(let e=1;e<=n;e++)u+=.5*t[e-1][h]+.5*t[e][h]+i}if("end"===o){u=.5*l[h]+.5*t[0][h]-m,"column"===r&&(u=.5*l[h]+.5*t[0][h]-l[h]);for(let e=1;e<=n;e++)u+=.5*t[e-1][h]+.5*t[e][h]+i}if("space-between"===o)if(m>=l[h]){u=.5*l[h]+.5*t[0][h]-l[h];for(let e=1;e<=n;e++)u+=.5*t[e-1][h]+.5*t[e][h]}else{let e=Math.max(0,l[h]-m);0===t.length?e=0:e>0&&(e/=t.length-1),u=.5*l[h]+.5*t[0][h]-l[h];for(let r=1;r<=n;r++)u+=.5*t[r-1][h]+.5*t[r][h]+e}if("space-around"===o)if(m>=l[h]){u=.5*l[h]+.5*t[0][h]-l[h];for(let e=1;e<=n;e++)u+=.5*t[e-1][h]+.5*t[e][h]}else{let e=Math.max(0,l[h]-m);0===t.length?e=0:e>0&&(e/=t.length+1),u=.5*l[h]+.5*t[0][h]-l[h],u+=e;for(let r=1;r<=n;r++)u+=.5*t[r-1][h]+.5*t[r][h]+e}return"start"===a&&(["row","row-reverse"].includes(r)&&(d=.5*l[g]-.5*t[n][g]),["column","column-reverse"].includes(r)&&(d=-.5*l[g]+.5*t[n][g])),"end"===a&&(["row","row-reverse"].includes(r)&&(d=-.5*l[g]+.5*t[n][g]),["column","column-reverse"].includes(r)&&(d=.5*l[g]-.5*t[n][g])),["column","column-reverse"].includes(r)?[d,u]:[u,d]}({currentChildren:J,index:n,flexDirection:y,alignItems:E,justifyContent:I,gap:S,size:e});t.current.position.x=r,t.current.position.y=a}))}),[Q,J,g,f,y,E,I,k,S]);const X=a.useMemo((()=>({currentChildren:J,parentUuid:N,addChild(e){K((t=>{const n=[...t],r=t.findIndex((t=>t.uuid===e.uuid));return-1===r?n.push({...e}):n[r]={...e},n.sort(((e,t)=>e.index-t.index))}))},removeChild(e){K((t=>t.filter((t=>t.uuid!==e))))}})),[J,N]);return a.useEffect((()=>{const e=F.current;null!==e&&e.traverse((e=>{e instanceof o.Mesh&&e.material instanceof o.Material&&(e.material.transparent=!0,e.material.opacity=p,e.material.needsUpdate=!0)}))}),[p]),a.createElement(u.Provider,{value:X},a.createElement("group",(0,r.Z)({ref:t},Z,{visible:m}),a.createElement("mesh",{renderOrder:B+n},a.createElement("planeBufferGeometry",{args:[g,f]}),a.createElement("meshBasicMaterial",{ref:L,side:o.FrontSide,opacity:p,transparent:!0,depthWrite:!1,map:q})),a.createElement("group",{renderOrder:B+n+1,ref:F},a.Children.map(O,((e,t)=>a.isValidElement(e)?a.createElement("group",{key:t,ref:Q[t]},a.cloneElement(e,{...e.props,childIndex:t})):e)))))}const h=a.forwardRef(m);h.displayName="layer";var g=h},291:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(294),a=n(369),o=n(659),i=n(846),l=n(989),c=n(581);function s(e){let{children:t}=e;const n=r.useMemo((()=>new a.d(6,6,6,10,10,10).translate(0,3,0)),[]);return r.createElement(o.de,{legacy:!0,flat:!0,linear:!0,gl:{alpha:!1}},r.createElement("color",{args:["#333333"],attach:"background"}),r.createElement("lineSegments",{geometry:n},r.createElement("lineBasicMaterial",{color:"#c0c0c0"})),r.createElement(l.c,{makeDefault:!0,position:[0,1.6,0]}),r.createElement(c.z,{makeDefault:!0,target:[0,1,-1.8]}),r.createElement("ambientLight",null),r.createElement(i.M,null),r.createElement("group",{position:[0,1,-1.88]},t))}},268:function(e,t,n){n.r(t),n.d(t,{default:function(){return i}});var r=n(294),a=n(291),o=n(228);function i(){return r.createElement(a.Z,null,r.createElement(o.Z,{width:1,height:1,backgroundImage:"./assets/images/robot.png",backgroundSize:"cover",borderRadius:.1,borderWidth:.02,borderColor:"#222222",backgroundPosition:[.5,.5]}))}}}]);
//# sourceMappingURL=268.765bbb5b.chunk.js.map