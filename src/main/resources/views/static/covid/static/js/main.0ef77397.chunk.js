(this.webpackJsonpLamisPlus=this.webpackJsonpLamisPlus||[]).push([[0],{546:function(e,t,a){},547:function(e,t,a){},655:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(19),i=a.n(c),o=a(43),s=a(42),l=(a(177),a(546),a(547),a(548),a(8)),b=a(7),d=a(5),u=a(465),j=a(705),O=a(719),f=a(704),p=a(140),h=a(368),g=a(114),x=a.n(g),m=a(505),v=a.n(m),y=a(29),w=a(10),S=a(45),B=a(153),D=a.n(B),A=a(39),R=a.n(A),P=new URLSearchParams(window.location.search).get("jwt"),k="/api/v1/",C=a(4),_=function(e){var t=e.percentage;return Object(C.jsx)("div",{className:"progress",children:Object(C.jsxs)("div",{className:"progress-bar progress-bar-striped bg-success",role:"progressbar",style:{width:"".concat(t,"%"),height:"80px"},children:[t,"%"]})})},N=a(321),z=a.n(N),T=a(154),L=a.n(T),F=a(164),I=a.n(F),U=a(155),M=a.n(U),E=a(162),W=a.n(E),q=a(106),Y=a.n(q),H=a(105),G=a.n(H),J=a(156),V=a.n(J),K=a(157),Q=a.n(K),X=a(159),Z=a.n(X),$=a(160),ee=a.n($),te=a(161),ae=a.n(te),re=a(165),ne=a.n(re),ce=a(158),ie=a.n(ce),oe=a(163),se=a.n(oe),le=a(166),be=a.n(le),de=a(466),ue=(a(370),a(371),a(721)),je=a(706),Oe=a(707),fe=a(708),pe=a(709),he=a(710),ge=a(711),xe=a(712),me=a(713),ve=a(714),ye=a(715),we=a(206),Se=a.n(we),Be=a(320),De=a.n(Be),Ae=a(205),Re=a.n(Ae),Pe=a(302),ke=a.n(Pe),Ce=(a(485),a(718)),_e=a(720),Ne=a(717),ze={Add:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(L.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Check:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(M.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Clear:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(G.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Delete:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(V.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),DetailPanel:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(Y.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Edit:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(Q.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Export:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(ie.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Filter:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(Z.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),FirstPage:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(ee.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),LastPage:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(ae.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),NextPage:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(Y.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),PreviousPage:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(W.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),ResetSearch:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(G.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Search:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(se.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),SortArrow:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(I.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),ThirdStateCheck:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(ne.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),ViewColumn:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(be.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))}))},Te=Object(u.a)((function(e){return{card:{margin:e.spacing(20),display:"flex",flexDirection:"column",alignItems:"center"},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)},cardBottom:{marginBottom:20},Select:{height:45,width:350},button:{margin:e.spacing(1)},root:{"& > *":{margin:e.spacing(1)}},input:{display:"none"},error:{color:"#f85032",fontSize:"11px"},success:{color:"#4BB543 ",fontSize:"11px"}}})),Le=function(e){var t=Te(),a=Object(r.useState)([]),n=Object(l.a)(a,2),c=n[0],i=n[1],o=Object(r.useState)([]),d=Object(l.a)(o,2),u=d[0],j=d[1],O=Object(r.useState)(!1),f=Object(l.a)(O,2),p=f[0],h=f[1],g=function(){return h(!p)},m=Object(r.useState)(!1),v=Object(l.a)(m,2),B=v[0],A=v[1],N=function(){return A(!B)},T=Object(r.useState)({facilityId:"",startDate:"",endDate:""}),L=Object(l.a)(T,2),F=L[0],I=L[1],U=Object(r.useState)(!1),M=Object(l.a)(U,2),E=M[0],W=M[1],q=Object(r.useState)({}),Y=Object(l.a)(q,2),H=Y[0],G=Y[1],J=Object(r.useState)(0),V=Object(l.a)(J,2),K=V[0],Q=V[1];Object(r.useEffect)((function(){!function(){Z.apply(this,arguments)}(),function(){te.apply(this,arguments)}(),$()}),[]);var X=function(){var e=Object(b.a)({},H);return e.startDate=F.startDate?"":"Start Date is required",e.endDate=F.endDate?"":"End Date is required",G(Object(b.a)({},e)),Object.values(e).every((function(e){return""===e}))};function Z(){return(Z=Object(S.a)(Object(y.a)().mark((function e(){return Object(y.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:R.a.get("".concat(k,"account"),{headers:{Authorization:"Bearer ".concat(P)}}).then((function(e){i(e.data.applicationUserOrganisationUnits)})).catch((function(e){}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function $(){return ee.apply(this,arguments)}function ee(){return(ee=Object(S.a)(Object(y.a)().mark((function e(){return Object(y.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:R.a.get("".concat(k,"export/sync-histories"),{headers:{Authorization:"Bearer ".concat(P)}}).then((function(e){i(e.data)})).catch((function(e){}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function te(){return(te=Object(S.a)(Object(y.a)().mark((function e(){return Object(y.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:R.a.get("".concat(k,"account"),{headers:{Authorization:"Bearer ".concat(P)}}).then((function(e){j(Object.entries(e.data.applicationUserOrganisationUnits).map((function(e){var t=Object(l.a)(e,2),a=(t[0],t[1]);return{label:a.organisationUnitName,value:a.organisationUnitId}})))})).catch((function(e){}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ae=function(e){I(Object(b.a)(Object(b.a)({},F),{},Object(w.a)({},e.target.name,e.target.value)))},re=function(){var e=Object(S.a)(Object(y.a)().mark((function e(t){return Object(y.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),W(!0),!X()){e.next=16;break}return e.prev=3,e.next=6,R.a.get("".concat(k,"export/all?facilityId=").concat(F.facilityId,"&startDate=").concat(F.startDate,"&endDate=").concat(F.endDate),{headers:{Authorization:"Bearer ".concat(P)},onUploadProgress:function(e){Q(parseInt(Math.round(100*e.loaded/e.total))),setTimeout((function(){return Q(0)}),1e4)}});case 6:e.sent,s.b.success("JSON Extraction was successful!"),g(),$(),e.next=14;break;case 12:e.prev=12,e.t0=e.catch(3);case 14:e.next=17;break;case 16:s.b.error("All Fields are required");case 17:case"end":return e.stop()}}),e,null,[[3,12]])})));return function(t){return e.apply(this,arguments)}}();return Object(C.jsxs)("div",{children:[Object(C.jsx)(de.a,{variant:"contained",style:{backgroundColor:"#014d88"},className:" float-right mr-1",onClick:function(){h(!p)},children:Object(C.jsx)("span",{style:{textTransform:"capitalize",color:"#fff"},children:"Generate JSON Files "})}),Object(C.jsx)("br",{}),Object(C.jsx)("br",{}),Object(C.jsx)(D.a,{icons:ze,title:"Generated JSON Files List ",columns:[{title:"Facility Name",field:"facilityName"},{title:"File Name ",field:"tableName",filtering:!1},{title:"Upload Size ",field:"uploadSize",filtering:!1},{title:"Date Generated ",field:"date",filtering:!1},{title:"Status",field:"status",filtering:!1},{title:"Action",field:"actions",filtering:!1}],data:c.map((function(e){return{facilityName:e.organisationUnitId,tableName:e.tableName,url:e.tableName,uploadSize:e.uploadSize,date:e.dateLastSync,status:0===e.processed?"Processing":"Completed",actions:Object(C.jsx)("div",{children:Object(C.jsx)(Ce.a.Menu,{position:"right",children:Object(C.jsx)(Ce.a.Item,{children:Object(C.jsx)(_e.a,{style:{backgroundColor:"rgb(153,46,98)"},primary:!0,children:Object(C.jsx)(Ne.a,{item:!0,text:"Action",children:Object(C.jsxs)(Ne.a.Menu,{style:{marginTop:"10px"},children:[Object(C.jsxs)(Ne.a.Item,{onClick:function(){return t=e.tableName,void R.a.get("".concat(k,"export/download/").concat(t),{headers:{Authorization:"Bearer ".concat(P)},responseType:"blob"}).then((function(e){var a=e.data,r=new Blob([a],{type:"application/octet-stream"});ke.a.saveAs(r,"".concat(t,".zip"))})).catch((function(e){}));var t},children:[Object(C.jsx)(De.a,{color:"primary"})," Download File"]}),Object(C.jsxs)(Ne.a.Item,{onClick:function(){return t=e.tableName,a=e.organisationUnitId,A(!B),void R.a.post("".concat(k,"export/send-data?fileName=").concat(t,"&facilityId=").concat(a),{headers:{Authorization:"Bearer ".concat(P)}}).then((function(e){window.setTimeout((function(){s.b.success(" Uploading To server Successful!"),N(),$()}),1e3)})).catch((function(e){if(h(!1),e.response&&e.response.data){var t=e.response.data.apierror&&""!==e.response.data.apierror.message?e.response.data.apierror.message:"Something went wrong, please try again";s.b.error(t),h(!1)}else N(),s.b.error("Something went wrong. Please try again...")}));var t,a},children:[Object(C.jsx)(z.a,{color:"primary"})," Send To Server"]})]})})})})})})}})),options:{headerStyle:{backgroundColor:"#014d88",color:"#fff"},searchFieldStyle:{width:"200%",margingLeft:"250px"},filtering:!1,exportButton:!1,searchFieldAlignment:"left",pageSizeOptions:[10,20,100],pageSize:10,debounceInterval:400}}),Object(C.jsx)(ue.a,{isOpen:p,toggle:g,className:e.className,size:"lg",backdrop:"static",children:Object(C.jsxs)(je.a,{children:[Object(C.jsx)(Oe.a,{toggle:g,children:"Generate JSON Files"}),Object(C.jsx)(fe.a,{children:Object(C.jsx)(pe.a,{children:Object(C.jsxs)(he.a,{children:[Object(C.jsxs)(ge.a,{children:[Object(C.jsx)(xe.a,{md:12,children:Object(C.jsxs)(me.a,{children:[Object(C.jsx)(ve.a,{children:"Facility *"}),Object(C.jsxs)(ye.a,{type:"select",name:"facilityId",id:"facilityId",onChange:ae,style:{border:"1px solid #014D88",borderRadius:"0.2rem"},vaulue:F.facilityId,children:[Object(C.jsx)("option",{children:" "}),u.map((function(e){var t=e.label,a=e.value;return Object(C.jsx)("option",{value:a,children:t},a)}))]}),""!==H.facilityId?Object(C.jsx)("span",{className:t.error,children:H.facilityId}):""]})}),Object(C.jsx)(xe.a,{md:12,children:Object(C.jsxs)(me.a,{children:[Object(C.jsx)(ve.a,{children:"Start Date"}),Object(C.jsx)(ye.a,{type:"date",name:"startDate",id:"startDate",vaulue:F.startDate,onChange:ae,style:{border:"1px solid #014D88",borderRadius:"0.2rem"},max:x()(new Date).format("YYYY-MM-DD")}),""!==H.startDate?Object(C.jsx)("span",{className:t.error,children:H.startDate}):""]})}),Object(C.jsx)(xe.a,{md:12,children:Object(C.jsxs)(me.a,{children:[Object(C.jsx)(ve.a,{children:"End Date"}),Object(C.jsx)(ye.a,{type:"date",name:"endDate",id:"endDate",vaulue:F.endDate,onChange:ae,style:{border:"1px solid #014D88",borderRadius:"0.2rem"},min:x()(F.startDate).format("YYYY-MM-DD"),max:x()(new Date).format("YYYY-MM-DD")}),""!==H.endDate?Object(C.jsx)("span",{className:t.error,children:H.endDate}):""]})})]}),Object(C.jsx)("br",{}),E?Object(C.jsx)(_,{percentage:K}):"",Object(C.jsx)("br",{}),Object(C.jsx)(de.a,{type:"submit",variant:"contained",color:"primary",className:t.button,style:{backgroundColor:"#014d88",fontWeight:"bolder"},startIcon:Object(C.jsx)(Re.a,{}),onClick:re,children:E?Object(C.jsx)("span",{style:{textTransform:"capitalize"},children:"Generating Please Wait..."}):Object(C.jsx)("span",{style:{textTransform:"capitalize"},children:"Generate"})}),Object(C.jsx)(de.a,{variant:"contained",color:"default",onClick:g,className:t.button,style:{backgroundColor:"#992E62"},startIcon:Object(C.jsx)(Se.a,{}),children:Object(C.jsx)("span",{style:{textTransform:"capitalize ",color:"#fff"},children:"cancel"})})]})})})]})}),Object(C.jsx)(ue.a,{isOpen:B,toggle:N,backdrop:!1,fade:!0,style:{marginTop:"250px"},size:"lg",children:Object(C.jsx)(fe.a,{children:Object(C.jsx)("h1",{children:"Uploading File To Server. Please wait..."})})})]})},Fe=a(716),Ie=Object(u.a)((function(e){return{card:{margin:e.spacing(20),display:"flex",flexDirection:"column",alignItems:"center"},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)},cardBottom:{marginBottom:20},Select:{height:45,width:350},button:{margin:e.spacing(1)},root:{"& > *":{margin:e.spacing(1)}},input:{display:"none"},error:{color:"#f85032",fontSize:"11px"},success:{color:"#4BB543 ",fontSize:"11px"}}})),Ue=function(e){var t,a=Ie(),n=Object(r.useState)(!1),c=Object(l.a)(n,2),i=(c[0],c[1],Object(r.useState)({username:"",password:"",url:""})),o=Object(l.a)(i,2),d=o[0],u=o[1],j=Object(r.useState)(!1),O=Object(l.a)(j,2),f=O[0],p=O[1],h=Object(r.useState)([]),g=Object(l.a)(h,2),x=(g[0],g[1]),m=Object(r.useState)({}),v=Object(l.a)(m,2),B=v[0],D=v[1];function A(){return(A=Object(S.a)(Object(y.a)().mark((function e(){return Object(y.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:R.a.get("".concat(k,"sync/remote-urls"),{headers:{Authorization:"Bearer ".concat(P)}}).then((function(e){x(Object.entries(e.data).map((function(e){var t=Object(l.a)(e,2),a=(t[0],t[1]);return{label:a.url,value:a.id}})))})).catch((function(e){}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(r.useEffect)((function(){!function(){A.apply(this,arguments)}()}),[]);var _=function(e){u(Object(b.a)(Object(b.a)({},d),{},Object(w.a)({},e.target.name,e.target.value)))};return Object(C.jsx)("div",{children:Object(C.jsx)(ue.a,(t={isOpen:e.showModal,toggle:e.toggleModal,className:e.className,size:"lg",backdrop:!1},Object(w.a)(t,"backdrop","static"),Object(w.a)(t,"children",Object(C.jsxs)(je.a,{children:[Object(C.jsx)(Oe.a,{toggle:e.toggleModal,children:"Personal Access Token "}),Object(C.jsx)(fe.a,{children:Object(C.jsx)(pe.a,{children:Object(C.jsxs)(he.a,{children:[Object(C.jsxs)(ge.a,{children:[Object(C.jsx)(xe.a,{md:12,children:Object(C.jsxs)(me.a,{children:[Object(C.jsx)(ve.a,{children:"Server URL * "}),Object(C.jsx)(ye.a,{type:"text",name:"url",id:"url",value:d.url,onChange:_,style:{border:"1px solid #014D88",borderRadius:"0.2rem"},required:!0}),""!==B.url?Object(C.jsx)("span",{className:a.error,children:B.url}):""]})}),Object(C.jsx)(xe.a,{md:12,children:Object(C.jsxs)(me.a,{children:[Object(C.jsx)(ve.a,{children:"Username "}),Object(C.jsx)(ye.a,{type:"text",name:"username",id:"username",value:d.username,onChange:_,style:{border:"1px solid #014D88",borderRadius:"0.2rem"},required:!0}),""!==B.username?Object(C.jsx)("span",{className:a.error,children:B.username}):""]})}),Object(C.jsx)(xe.a,{md:12,children:Object(C.jsxs)(me.a,{children:[Object(C.jsx)(ve.a,{children:"Password "}),Object(C.jsx)(ye.a,{type:"password",name:"password",id:"password",value:d.password,onChange:_,style:{border:"1px solid #014D88",borderRadius:"0.2rem"},required:!0}),""!==B.password?Object(C.jsx)("span",{className:a.error,children:B.password}):""]})})]}),f?Object(C.jsx)(Fe.a,{}):"",Object(C.jsx)("br",{}),Object(C.jsx)(de.a,{type:"submit",variant:"contained",style:{backgroundColor:"#014d88",fontWeight:"bolder"},onClick:function(t){t.preventDefault(),function(){var e=Object(b.a)({},B);return e.username=d.username?"":"Username is required",e.password=d.password?"":"Password is required",e.url=d.url?"":"Server URL is required",D(Object(b.a)({},e)),Object.values(e).every((function(e){return""===e}))}()&&(p(!0),R.a.post("".concat(k,"sync/remote-access-token"),d,{headers:{Authorization:"Bearer ".concat(P)}}).then((function(t){p(!1),e.ServerUrl(),s.b.success("Token Generated Successful"),e.toggleModal()})).catch((function(t){p(!1),s.b.error("Something went wrong"),e.toggleModal()})))},children:Object(C.jsx)("span",{style:{textTransform:"capitalize ",color:"#fff"},children:"Connect & Generate Token"})})]})})})]})),t))})},Me=(a(656),{Add:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(L.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Check:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(M.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Clear:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(G.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Delete:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(V.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),DetailPanel:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(Y.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Edit:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(Q.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Export:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(ie.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Filter:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(Z.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),FirstPage:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(ee.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),LastPage:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(ae.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),NextPage:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(Y.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),PreviousPage:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(W.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),ResetSearch:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(G.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),Search:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(se.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),SortArrow:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(I.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),ThirdStateCheck:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(ne.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))})),ViewColumn:Object(r.forwardRef)((function(e,t){return Object(C.jsx)(be.a,Object(b.a)(Object(b.a)({},e),{},{ref:t}))}))}),Ee=Object(u.a)((function(e){return{card:{margin:e.spacing(20),display:"flex",flexDirection:"column",alignItems:"center"},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)},cardBottom:{marginBottom:20},Select:{height:45,width:350},button:{margin:e.spacing(1)},root:{"& > *":{margin:e.spacing(1)}},input:{display:"none"}}})),We=function(e){Object(o.g)(),Ee();var t=Object(r.useState)([]),a=Object(l.a)(t,2),c=(a[0],a[1],Object(r.useState)([])),i=Object(l.a)(c,2),s=(i[0],i[1],Object(r.useState)([])),b=Object(l.a)(s,2),d=b[0],u=b[1],j=Object(r.useState)(!1),O=Object(l.a)(j,2),f=(O[0],O[1],n.a.useState(!1)),p=Object(l.a)(f,2),h=p[0],g=p[1],x=Object(r.useState)({facility:"",url:""}),m=Object(l.a)(x,2),v=(m[0],m[1],Object(r.useState)(!1)),w=Object(l.a)(v,2);w[0],w[1];function B(){return A.apply(this,arguments)}function A(){return(A=Object(S.a)(Object(y.a)().mark((function e(){return Object(y.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:R.a.get("".concat(k,"sync/remote-urls"),{headers:{Authorization:"Bearer ".concat(P)}}).then((function(e){u(e.data)})).catch((function(e){}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(r.useEffect)((function(){B()}),[]);return Object(C.jsxs)("div",{children:[Object(C.jsx)(de.a,{variant:"contained",color:"primary",className:" float-right mr-1",style:{backgroundColor:"#014d88"},onClick:function(){g(!h)},children:Object(C.jsx)("span",{style:{textTransform:"capitalize"},children:"New Personal Access Token "})}),Object(C.jsx)("br",{}),Object(C.jsx)("br",{}),Object(C.jsx)("br",{}),Object(C.jsx)(D.a,{icons:Me,title:"Personal Access Token List",columns:[{title:"URLS",field:"name"},{title:"Username",field:"url",filtering:!1},{title:" Status",field:"date",filtering:!1}],data:d.map((function(e){return{name:e.url,url:e.username,date:"Active",actions:""}})),options:{headerStyle:{backgroundColor:"#014d88",color:"#fff"},searchFieldStyle:{width:"200%",margingLeft:"250px"},filtering:!1,exportButton:!1,searchFieldAlignment:"left",pageSizeOptions:[10,20,100],pageSize:10,debounceInterval:400}}),Object(C.jsx)(Ue,{toggleModal:function(){return g(!h)},showModal:h,ServerUrl:B})]})},qe=function(e){var t=Object(r.useState)({username:"",password:"",url:""}),a=Object(l.a)(t,2),n=(a[0],a[1],Object(r.useState)(!1)),c=Object(l.a)(n,2),i=(c[0],c[1],Object(r.useState)([])),o=Object(l.a)(i,2),s=(o[0],o[1]);function b(){return(b=Object(S.a)(Object(y.a)().mark((function e(){return Object(y.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:R.a.get("".concat(k,"sync/remote-urls")).then((function(e){console.log(e.data),s(Object.entries(e.data).map((function(e){var t=Object(l.a)(e,2),a=(t[0],t[1]);return{label:a.url,value:a.id}})))})).catch((function(e){}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(r.useEffect)((function(){!function(){b.apply(this,arguments)}()}),[]);return Object(C.jsx)(We,{})},Ye=a(511),He=a.n(Ye);a(142),Object(u.a)((function(e){return{card:{margin:e.spacing(20),display:"flex",flexDirection:"column",alignItems:"center"},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)},cardBottom:{marginBottom:20},Select:{height:45,width:350},button:{margin:e.spacing(1)},root:{"& > *":{margin:e.spacing(1)}},input:{display:"none"},error:{color:"#f85032",fontSize:"11px"},success:{color:"#4BB543 ",fontSize:"11px"}}})),a(514),a(515),Object(u.a)((function(e){return{root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper,"& > * + *":{marginTop:e.spacing(2)}}}}));var Ge=["children","value","index"];x.a.locale("en"),v()();var Je=Object(u.a)((function(e){return{header:{fontSize:"20px",fontWeight:"bold",padding:"5px",paddingBottom:"10px"},inforoot:{margin:"5px"},dropdown:{marginTop:"50px"},paper:{marginRight:e.spacing(2)},downmenu:{display:"flex"}}}));function Ve(e){var t=e.children,a=e.value,r=e.index,n=Object(d.a)(e,Ge);return Object(C.jsx)(p.a,Object(b.a)(Object(b.a)({component:"div",role:"tabpanel",hidden:a!==r,id:"scrollable-force-tabpanel-".concat(r),"aria-labelledby":"scrollable-force-tab-".concat(r)},n),{},{children:a===r&&Object(C.jsx)(h.a,{p:5,children:t})}))}var Ke=function(e){var t,a=Je(),n=Object(r.useState)(null),c=Object(l.a)(n,2),i=c[0],o=c[1],s=e.location&&e.location.state?e.location.state:" ",d=function(e,t){var a=t,r=new RegExp("[?&]"+e+"=([^&#]*)","i").exec(a);return r?r[1]:null}("tab",e.location&&e.location.search?e.location.search:""),u=null!==d?d:s;return Object(r.useEffect)((function(){switch(u){case"database-sync":default:return o(0);case"setting":return o(1)}}),[d]),Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)("div",{className:"row page-titles mx-0",style:{marginTop:"0px",marginBottom:"-10px"},children:Object(C.jsx)("ol",{className:"breadcrumb",children:Object(C.jsx)("li",{className:"breadcrumb-item active",children:Object(C.jsx)("h4",{children:"Central Sync"})})})}),Object(C.jsx)("br",{}),Object(C.jsxs)("div",{className:a.root,children:[Object(C.jsx)(j.a,{position:"static",style:{backgroundColor:"#fff"},children:Object(C.jsx)(O.a,{value:i,onChange:function(e,t){o(t)},variant:"scrollable",scrollButtons:"on",indicatorColor:"secondary",textColor:"primary","aria-label":"scrollable force tabs example",children:Object(C.jsx)(f.a,Object(b.a)({className:a.title,label:"Generate & Upload JSON Files",icon:Object(C.jsx)(He.a,{})},(t=0,{id:"scrollable-force-tab-".concat(t),"aria-controls":"scrollable-force-tabpanel-".concat(t)})))})}),Object(C.jsx)(Ve,{value:i,index:0,children:Object(C.jsx)(Le,{})}),Object(C.jsx)(Ve,{value:i,index:1,children:Object(C.jsx)(qe,{})})]})]})};function Qe(){return Object(C.jsx)(o.a,{children:Object(C.jsxs)("div",{children:[Object(C.jsx)(s.a,{}),Object(C.jsx)(o.d,{children:Object(C.jsx)(o.b,{path:"/",children:Object(C.jsx)(Ke,{})})})]})})}var Xe=a(183),Ze=function(e){e&&e instanceof Function&&a.e(6).then(a.bind(null,894)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),r(e),n(e),c(e),i(e)}))},$e=a(512),et="ltr",tt=[{typography:"poppins",version:"light",layout:"vertical",headerBg:"color_1",navheaderBg:"color_1",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"full",direction:et},{typography:"poppins",version:"light",layout:"vertical",primary:"color_5",headerBg:"color_5",navheaderBg:"color_1",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",direction:et},{typography:"poppins",version:"light",layout:"vertical",navheaderBg:"color_11",headerBg:"color_1",sidebarBg:"color_11",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_11",direction:et},{typography:"poppins",version:"dark",layout:"vertical",headerBg:"color_3",navheaderBg:"color_3",sidebarBg:"color_1",sidebarStyle:"full",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_1",direction:et},{typography:"poppins",version:"light",layout:"vertical",navheaderBg:"color_15",headerBg:"color_1",sidebarStyle:"full",sidebarBg:"color_1",sidebarPosition:"fixed",headerPosition:"fixed",containerLayout:"wide",primary:"color_15",direction:et},{typography:"poppins",version:"light",layout:"horizontal",navheaderBg:"color_1",headerBg:"color_1",sidebarBg:"color_9",sidebarStyle:"modern",sidebarPosition:"static",headerPosition:"fixed",containerLayout:"wide",primary:"color_9",direction:et}],at=Object(r.createContext)(),rt=function(e){var t=Object(r.useState)({value:"full",label:"Full"}),a=Object(l.a)(t,2),n=a[0],c=a[1],i=Object(r.useState)({value:"fixed",label:"Fixed"}),o=Object(l.a)(i,2),s=o[0],b=o[1],d=Object(r.useState)({value:"fixed",label:"Fixed"}),u=Object(l.a)(d,2),j=u[0],O=u[1],f=Object(r.useState)({value:"vertical",label:"Vertical"}),p=Object(l.a)(f,2),h=p[0],g=p[1],x=Object(r.useState)({value:"ltr",label:"LTR"}),m=Object(l.a)(x,2),v=m[0],y=m[1],w=Object(r.useState)("color_1"),S=Object(l.a)(w,2),B=S[0],D=S[1],A=Object(r.useState)("color_1"),R=Object(l.a)(A,2),P=R[0],k=R[1],_=Object(r.useState)("color_1"),N=Object(l.a)(_,2),z=N[0],T=N[1],L=Object(r.useState)("color_1"),F=Object(l.a)(L,2),I=F[0],U=F[1],M=Object(r.useState)(!1),E=Object(l.a)(M,2),W=E[0],q=E[1],Y=Object(r.useState)(!1),H=Object(l.a)(Y,2),G=H[0],J=H[1],V=Object(r.useState)({value:"light",label:"Light"}),K=Object(l.a)(V,2),Q=K[0],X=K[1],Z=Object(r.useState)({value:"wide-boxed",label:"Wide Boxed"}),$=Object(l.a)(Z,2),ee=$[0],te=$[1],ae=document.querySelector("body"),re=Object(r.useState)(0),ne=Object(l.a)(re,2),ce=ne[0],ie=ne[1],oe=Object(r.useState)(0),se=Object(l.a)(oe,2),le=se[0],be=se[1],de=function(e){D(e),ae.setAttribute("data-primary",e)},ue=function(e){k(e),ae.setAttribute("data-nav-headerbg",e)},je=function(e){T(e),ae.setAttribute("data-headerbg",e)},Oe=function(e){U(e),ae.setAttribute("data-sibebarbg",e)},fe=function(e){b(e),ae.setAttribute("data-sidebar-position",e.value)},pe=function(e){y(e),ae.setAttribute("direction",e.value);var t=document.querySelector("html");t.setAttribute("dir",e.value),t.className=e.value},he=function(e){"horizontal"===e.value&&"overlay"===n.value?(g(e),ae.setAttribute("data-layout",e.value),c({value:"full",label:"Full"}),ae.setAttribute("data-sidebar-style","full")):(g(e),ae.setAttribute("data-layout",e.value))},ge=function(e){"horizontal"===h.value&&"overlay"===e.value?alert("Sorry! Overlay is not possible in Horizontal layout."):(c(e),q("icon-hover"===e.value?"_i-hover":""),ae.setAttribute("data-sidebar-style",e.value))},xe=function(e){O(e),ae.setAttribute("data-header-position",e.value)},me=function(e){ae.setAttribute("data-theme-version",e.value),X(e)},ve=function(e){te(e),ae.setAttribute("data-container",e.value),"boxed"===e.value&&ge({value:"overlay",label:"Overlay"})};return Object(r.useEffect)((function(){var e=document.querySelector("body");e.setAttribute("data-typography","poppins"),e.setAttribute("data-theme-version","light"),e.setAttribute("data-layout","vertical"),e.setAttribute("data-primary","color_1"),e.setAttribute("data-nav-headerbg","color_1"),e.setAttribute("data-headerbg","color_1"),e.setAttribute("data-sidebar-style","overlay"),e.setAttribute("data-sibebarbg","color_1"),e.setAttribute("data-primary","color_1"),e.setAttribute("data-sidebar-position","fixed"),e.setAttribute("data-header-position","fixed"),e.setAttribute("data-container","wide"),e.setAttribute("direction","ltr");var t=function(){ie(window.innerWidth),be(window.innerHeight),window.innerWidth>=768&&window.innerWidth<1024?e.setAttribute("data-sidebar-style","mini"):window.innerWidth<=768?e.setAttribute("data-sidebar-style","overlay"):e.setAttribute("data-sidebar-style","full")};return t(),window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}}),[]),Object(C.jsx)(at.Provider,{value:{body:ae,sideBarOption:[{value:"compact",label:"Compact"},{value:"full",label:"Full"},{value:"mini",label:"Mini"},{value:"modern",label:"Modern"},{value:"overlay",label:"Overlay"},{value:"icon-hover",label:"Icon-hover"}],layoutOption:[{value:"vertical",label:"Vertical"},{value:"horizontal",label:"Horizontal"}],backgroundOption:[{value:"light",label:"Light"},{value:"dark",label:"Dark"}],sidebarposition:s,headerPositions:[{value:"fixed",label:"Fixed"},{value:"static",label:"Static"}],containerPosition:[{value:"wide-boxed",label:"Wide Boxed"},{value:"boxed",label:"Boxed"},{value:"wide",label:"Wide"}],directionPosition:[{value:"ltr",label:"LTR"},{value:"rtl",label:"RTL"}],fontFamily:[{value:"poppins",label:"Poppins"},{value:"roboto",label:"Roboto"},{value:"cairo",label:"Cairo"},{value:"opensans",label:"Open Sans"},{value:"HelveticaNeue",label:"HelveticaNeue"}],primaryColor:B,navigationHader:P,windowWidth:ce,windowHeight:le,changePrimaryColor:de,changeNavigationHader:ue,changeSideBarStyle:ge,sideBarStyle:n,changeSideBarPostion:fe,sidebarpositions:[{value:"fixed",label:"Fixed"},{value:"static",label:"Static"}],changeHeaderPostion:xe,headerposition:j,changeSideBarLayout:he,sidebarLayout:h,changeDirectionLayout:pe,changeContainerPosition:ve,direction:v,colors:["color_1","color_2","color_3","color_4","color_5","color_6","color_7","color_8","color_9","color_10","color_11","color_12","color_13","color_14","color_15"],haderColor:z,chnageHaderColor:je,chnageSidebarColor:Oe,sidebarColor:I,iconHover:W,menuToggle:G,openMenuToggle:function(){"overly"===n.value?J(!0):J(!1)},changeBackground:me,background:Q,containerPosition_:ee,setDemoTheme:function(e,t){var a={},r=tt[e];ae.setAttribute("data-typography",r.typography),a.value=r.version,me(a),a.value=r.layout,he(a),de(r.primary),ue(r.navheaderBg),je(r.headerBg),a.value=r.sidebarStyle,ge(a),Oe(r.sidebarBg),a.value=r.sidebarPosition,fe(a),a.value=r.headerPosition,xe(a),a.value=r.containerLayout,ve(a),a.value=t,pe(a)}},children:e.children})};i.a.render(Object(C.jsx)(n.a.StrictMode,{children:Object(C.jsx)($e.a,{children:Object(C.jsx)(Xe.a,{basename:"/",children:Object(C.jsx)(rt,{children:Object(C.jsx)(Qe,{})})})})}),document.getElementById("root")),Ze()}},[[655,1,2]]]);
//# sourceMappingURL=main.0ef77397.chunk.js.map