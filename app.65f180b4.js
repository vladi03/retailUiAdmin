(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{111:function(e,t,n){e.exports=n(162)},112:function(e,t,n){},162:function(e,t,n){"use strict";n.r(t);n(112);var a,o=n(0),r=n.n(o),i=n(7),c=n(78),l=n.n(c),s=n(97),u=n(59),m=n(8),d=n(57),f=n(34),g=function(e){var t=e.children;return r.a.createElement(f.a.ModelProvider,null,t)},p=n(58),h=n(103),b=n(91),v=n(187),w=n(43),O=n(193),E=n(194),j=n(195),y=[{label:"Home",icon:O.a,selected:!(window.location.href.includes("cashMovements")||window.location.href.includes("keyLogs")),link:"#/",route:"/",isMobile:!0},{label:"Cash Move",icon:E.a,selected:window.location.href.includes("cashMovements"),link:"#/cashMovements",route:"/cashMovements",featureId:1,isMobile:!0},{label:"Key Logs",icon:j.a,selected:window.location.href.includes("keyLogs"),link:"#/keyLogs",route:"/keyLogs",featureId:1,isMobile:!0}],x=n(17),C=n(16),L=a?y.filter((function(e){return e.isMobile})):y,M=[{label:"Logout",icon:v.a,link:"#/logout"}],S=Object(w.a)((function(e){var t=e.children,n=(e.firstName,e.lastName,e.userLoggedIn,e.picUrl,e.userFeatures),a=function(){var e=Object(o.useState)(window.innerWidth<=760),t=e[0],n=e[1],a=function(){n(window.innerWidth<=760)};return Object(o.useEffect)((function(){return window.addEventListener("resize",a),function(){window.removeEventListener("resize",a)}})),t}(),i=I(a),c=Object(C.b)(),l=(c.isLoading,c.isAuthenticated,c.error,c.user),s=(c.loginWithRedirect,c.logout,L.filter((function(e){return void 0===e.featureId||n.indexOf(e.featureId)>-1}))),u=Object(x.b)();return console.log(l),l&&(Object(x.f)(l),u.picUrl=l.picture,u.name=l.name),u.name&&r.a.createElement("div",null,r.a.createElement(h.SideStrip,{mainLinks:s,bottomLinks:M,onMenuClose:function(){},expandMenu:!1,userLabel:u.name,imageUrl:decodeURIComponent(u.picUrl)}),r.a.createElement("div",{className:i.mainContainer},t))||r.a.createElement("div",null,t)}),[f.a]),I=function(e){return Object(b.a)({mainContainer:{marginLeft:e?0:70}})()},N=n(192),k=n(184),P=n(185),U=n(186),A=n(90),R=n(196),W=r.a.createElement(N.a,null,"You have been logged out."),T=r.a.createElement("span",null,"... logging out please wait"),H=Object(w.a)((function(e){var t=e.onNotifyMainNavOfLogOff,n=e.userLoggedIn,a=J(),i=Object(C.b)(),c=i.loginWithRedirect,l=i.logout,s=i.isAuthenticated,u=i.isLoading;return Object(o.useEffect)((function(){Object(x.a)(),s&&l({returnTo:window.location.origin+"/#/login"}),n&&t()})),r.a.createElement("form",{id:"logout-submit",className:a.mainContainer},!u&&!s&&r.a.createElement(k.a,{style:{display:"flex"}},r.a.createElement("div",{className:a.outerCard},r.a.createElement(P.a,{className:a.cardContainer},r.a.createElement("img",{src:"retail-shop-flat-icon_small.jpg",className:a.logo}),r.a.createElement("div",{className:a.messageContainer},r.a.createElement(R.a,{className:a.iconSpacing}),W)),r.a.createElement(U.a,null,r.a.createElement(A.a,{variant:"contained",color:"secondary",className:a.actionButton,onClick:function(){c()}},r.a.createElement(v.a,{style:{marginRight:10}})," Login")))),(u||s)&&T)}),[f.a]),J=Object(b.a)({mainContainer:{width:"80%",maxWidth:460,margin:"100px auto"},leftContainer:{height:400,width:300,paddingLeft:4},cardContainer:{minHeight:170},logo:{width:250,margin:"auto"},actionButton:{width:"80%",margin:"auto"},messageContainer:{display:"flex",width:235,margin:"40px auto"},iconSpacing:{marginRight:12},outerCard:{margin:"45px auto"}}),B=r.a.createElement("div",null,"Hi test"),z=function(e){e.history;var t=Object(C.b)();t.user,t.isAuthenticated;return B},D=n(60),_=n(104),F=function(e){e.history,e.permission;var t=e.component,n=Object(_.a)(e,["history","permission","component"]),a=Object(C.b)(),o=(a.user,a.isLoading),i=a.isAuthenticated;return r.a.createElement(m.b,Object(D.a)({},n,{render:function(e){return i||o?r.a.createElement(t,e):r.a.createElement(m.a,{push:!0,to:{pathname:"/login",state:{from:e.location}}})}}))},Y=r.a.createElement(m.b,{exact:!0,path:"/logOut",component:H}),Z=r.a.createElement(m.b,{exact:!0,path:"/logcomplete",component:H}),q=function(e){function t(){var t;return(t=e.call(this)||this).state={isMobile:window.innerWidth<=760},t}Object(u.a)(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this;Object(x.c)();window.addEventListener("resize",(function(){e.setState({isMobile:window.innerWidth<=760})}));var t=this.props.auth0,n=(t.user,t.getAccessTokenSilently);(function(){var e=Object(s.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n();case 3:t=e.sent,console.log(t),Object(x.e)(t),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("---------------"),console.log(e.t0.message||e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}})()()},n.render=function(){var e=Object(p.getLoginRoute)(),t=(this.state.isMobile,S);return r.a.createElement(g,null,r.a.createElement(d.a,null,r.a.createElement(t,null,r.a.createElement("div",null,r.a.createElement(e,null),Y,Z,r.a.createElement(F,{permission:1,exact:!0,path:"/",component:z})))))},t}(r.a.Component),K=Object(C.c)(q),V=n(42),G=n(191),Q=n(69),X=n(197),$=Object(V.a)({typography:{useNextVariants:!0},palette:{textColor:Q.a.A700,primary:{main:"#3d6090",success:"#4caf50",idle:X.a[500]},secondary:{main:"#428bca"}}});Object(i.render)(r.a.createElement(C.a,{domain:"netware.auth0.com",clientId:"Aa7xpZd1nciCoIStp8BYJZO2Oix8WH2R",audience:"https://eventnod.netware.io",redirectUri:""+window.location.origin},r.a.createElement(G.a,{theme:$},r.a.createElement(K,null))),document.querySelector("#app"))},17:function(e,t,n){"use strict";n.d(t,"e",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"d",(function(){return s})),n.d(t,"b",(function(){return u})),n.d(t,"f",(function(){return m})),n.d(t,"a",(function(){return d}));var a={token:localStorage.getItem("token"),name:localStorage.getItem("name")||"",picUrl:localStorage.getItem("picUrl")||"",email:localStorage.getItem("email")||"",featurePermissions:[]};try{var o=localStorage.getItem("featurePermissions");a.featurePermissions=o?JSON.parse(o):[]}catch(e){a.featurePermissions=[]}var r=function(e){localStorage.setItem("token",e),a.token=e;var t=f(e);c(t.exp)},i=function(){},c=function(e){var t=n(58).navigate;l();var o=1e3*e-new Date-6e4;o>30?a.logOutTimer=setTimeout((function(){return t("#/logout")}),o):e>0&&t("#/logout")},l=function(){a.logOutTimer>-1&&(clearTimeout(a.logOutTimer),a.logOutTimer=-1)},s=function(){return a.token&&null!==a.token},u=function(){return a},m=function(e){var t=e.name,n=e.picture,o=e.email;return a.featurePermissions=[1],localStorage.setItem("name",t),localStorage.setItem("email",o),localStorage.setItem("picUrl",n),localStorage.setItem("featurePermissions",JSON.stringify(a.featurePermissions)),a.name=t,a.email=o,a.picUrl=n,a.featurePermissions=[1],a},d=function(){a.featurePermissions=[],localStorage.removeItem("featurePermissions")},f=function(e){var t=e&&e.split(".");if(t&&t.length>0){var n=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(window.atob(n))}return{}}},34:function(e,t,n){"use strict";var a,o,r,i,c=n(60),l=n(98),s=n(59),u=n(0),m=n.n(u),d=n(17),f=null,g=function(){var e=Object(d.b)();return{userNotAuthorized:!1,userLoggedIn:Object(d.d)(),name:e.name,picUrl:e.picUrl,userFeatures:e.featurePermissions||[],faceLoginMessage:null,passwordMessage:"",confirmPasswordMessage:"",profileLoading:!1,onSetAccount:h,onNotifyMainNavOfLogOff:p}},p=function(){f.setState({userLoggedIn:!1})},h=function(e){console.log("loginInfo"),console.log(e),Object(d.f)(e),f.setState({picUrl:e.picUrl,name:e.name,email:e.email,userLoggedIn:!0})};t.a=(a=g,o=function(e){return f=e,g()},r=m.a.createContext(a()),i=function(e){function t(t){var n;n=e.call(this,t)||this;var a=t&&t.match&&t.match.params&&t.match.params.testMode&&t.match.params.testMode.indexOf("testMode")>-1&&t.match.params.testMode;return n.state=o(Object(l.a)(n),a||""),n}return Object(s.a)(t,e),t.prototype.render=function(){return m.a.createElement(r.Provider,{value:this.state},this.props.children)},t}(m.a.Component),{ModelContext:r,ModelProvider:i,connect:function(e,t){return m.a.createElement(r.Consumer,null,(function(n){return m.a.createElement(e,Object(c.a)({},n,t))}))}})},43:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(105),o=function(e,t,n){void 0===n&&(n=null);var o=[],r=null!==n?Object(a.a)(n)(e):e;return t.forEach((function(e,t){if(0===t){o.push((function(t){return e.connect(r,t)}))}else{o.push((function(n){return e.connect(o[t-1],n)}))}})),o[o.length-1]}},58:function(e,t,n){"use strict";n.r(t),n.d(t,"getHistory",(function(){return j})),n.d(t,"navigate",(function(){return y})),n.d(t,"getLoginRoute",(function(){return x}));var a=n(0),o=n.n(a),r=n(8),i=n(99),c=n(184),l=n(185),s=n(186),u=n(90),m=n(91),d=n(187),f=n(34),g=n(43),p=n(16),h=Object(m.a)({mainContainer:{width:"80%",maxWidth:460,margin:"100px auto"},leftContainer:{height:400,width:300,paddingLeft:4},cardContainer:{minHeight:170,minWidth:240,textAlign:"center"},logo:{width:250,margin:"auto"},actionButton:{width:"100%",margin:"10px"},messageContainer:{display:"flex",width:235,margin:"40px auto"},iconSpacing:{marginRight:12},outerCard:{margin:"45px auto"},cardActionsContainer:{display:"flex",flexDirection:"column"}}),b=Object(g.a)((function(e){Object(i.a)(e);var t=h(),n=Object(p.b)().loginWithRedirect;return o.a.createElement("form",{id:"logon-submit",action:"/login/google/source",className:t.mainContainer},o.a.createElement(c.a,{style:{display:"flex"}},o.a.createElement("div",{className:t.outerCard},o.a.createElement(l.a,{className:t.cardContainer},o.a.createElement("img",{src:"retail-shop-flat-icon_small.jpg",className:t.logo})),o.a.createElement(s.a,null,o.a.createElement(u.a,{variant:"contained",color:"secondary",className:t.actionButton,onClick:function(){n({returnTo:window.location.origin+"/#/"})}},o.a.createElement(d.a,{style:{marginRight:10}})," Login")))))}),[f.a]),v={loaded:!1,history:null},w=o.a.createElement(r.b,{exact:!0,path:"/login",component:b}),O=function(e){var t=e.history;return E(t),w},E=function(e){v.history=e,v.loaded=!0},j=function(){return v},y=function(e){window.location.href=e},x=function(){return Object(r.f)(O)}}},[[111,1,2]]]);
//# sourceMappingURL=app.65f180b4.js.map