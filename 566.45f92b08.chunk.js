"use strict";(self.webpackChunkreact_xr_ui=self.webpackChunkreact_xr_ui||[]).push([[566],{566:function(e,t,n){n.r(t),n.d(t,{default:function(){return s}});var o=n(294),r=n(634),i=n(638),l=n(597);function a(e){let{children:t,onMove:n,onOver:r,onOut:a,onDown:c,onUp:u,enabled:s=!0}=e;const d=(0,i.nH)((e=>e.isPresenting)),g=o.useCallback((e=>t=>{d&&s&&e&&e(t.intersection)}),[d,s,c,u,n,r,a]),m=o.useCallback((e=>t=>{d||s&&e&&(t.stopPropagation(),e(t.intersections[0]))}),[d,s,c,u,n,r,a]);return o.createElement(l.vj,{onSelectStart:g(c),onSelectEnd:g(u),onMove:g(n),onHover:g(r),onBlur:g(a)},o.createElement("group",{onPointerDown:m(c),onPointerUp:m(u),onPointerMove:m(n),onPointerOver:m(r),onPointerOut:m(a)},t))}var c=n(180),u=n(518);function s(){const[e,t]=o.useState(!1),[n,i]=o.useState(!1),[l,s]=o.useState({x:0,y:0});return o.createElement(o.Fragment,null,o.createElement(c.Z,null,o.createElement(r.Z,{height:.1,"position-y":.625,gap:.05},o.createElement(r.Z,{width:"15%",height:"100%",backgroundColor:"#000000",textContent:e?"Over":"Out",fontSize:.4,textAlign:"center",verticalAlign:"middle"}),o.createElement(r.Z,{width:"15%",height:"100%",backgroundColor:"#000000",textContent:n?"Down":"Up",fontSize:.4,textAlign:"center",verticalAlign:"middle"}),o.createElement(r.Z,{width:"30%",height:"100%",backgroundColor:"#000000",textContent:"x: ".concat(l.x," y: ").concat(l.y),fontSize:.4,textAlign:"center",verticalAlign:"middle"})),o.createElement(a,{onOver:()=>t(!0),onOut:()=>t(!1),onDown:()=>i(!0),onUp:()=>i(!1),onMove:e=>{s({x:parseFloat(e.uv.x.toFixed(2)),y:parseFloat(e.uv.y.toFixed(2))})}},o.createElement(r.Z,{backgroundColor:"crimson",textContent:"Interact with me",verticalAlign:"middle",textAlign:"center"}))),o.createElement(u.Z,{pathname:"interactions"}))}}}]);
//# sourceMappingURL=566.45f92b08.chunk.js.map