parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"or4r":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3],e="Expected a function",n=NaN,r="[object Symbol]",i=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,f=/^0o[0-7]+$/i,c=parseInt,a="object"==typeof t&&t&&t.Object===Object&&t,s="object"==typeof self&&self&&self.Object===Object&&self,v=a||s||Function("return this")(),l=Object.prototype,p=l.toString,b=Math.max,m=Math.min,y=function(){return v.Date.now()};function d(t,n,r){var i,o,u,f,c,a,s=0,v=!1,l=!1,p=!0;if("function"!=typeof t)throw new TypeError(e);function d(e){var n=i,r=o;return i=o=void 0,s=e,f=t.apply(r,n)}function g(t){var e=t-a;return void 0===a||e>=n||e<0||l&&t-s>=u}function O(){var t=y();if(g(t))return x(t);c=setTimeout(O,function(t){var e=n-(t-a);return l?m(e,u-(t-s)):e}(t))}function x(t){return c=void 0,p&&i?d(t):(i=o=void 0,f)}function T(){var t=y(),e=g(t);if(i=arguments,o=this,a=t,e){if(void 0===c)return function(t){return s=t,c=setTimeout(O,n),v?d(t):f}(a);if(l)return c=setTimeout(O,n),d(a)}return void 0===c&&(c=setTimeout(O,n)),f}return n=h(n)||0,j(r)&&(v=!!r.leading,u=(l="maxWait"in r)?b(h(r.maxWait)||0,n):u,p="trailing"in r?!!r.trailing:p),T.cancel=function(){void 0!==c&&clearTimeout(c),s=0,i=a=o=c=void 0},T.flush=function(){return void 0===c?f:x(y())},T}function j(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function g(t){return!!t&&"object"==typeof t}function O(t){return"symbol"==typeof t||g(t)&&p.call(t)==r}function h(t){if("number"==typeof t)return t;if(O(t))return n;if(j(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=j(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var r=u.test(t);return r||f.test(t)?c(t.slice(2),r?2:8):o.test(t)?n:+t}module.exports=d;
},{}],"WEtf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r={android:function(){return navigator.userAgent.match(/Android/i)},blackberry:function(){return navigator.userAgent.match(/BlackBerry/i)},ios:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},opera:function(){return navigator.userAgent.match(/Opera Mini/i)},windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return r.android()||r.blackberry()||r.ios()||r.opera()||r.windows()}},e=r;exports.default=e;
},{}],"RZIL":[function(require,module,exports) {
var define;
var e;!function(n){"function"==typeof e&&e.amd?e(n):"undefined"!=typeof module&&module.exports?module.exports=n():window.enterView=n.call(this)}(function(){return function(e){function n(){var e=document.documentElement.clientHeight,n=window.innerHeight||0;A=Math.max(e,n)}function t(){x=!1;var e=function(){if(w&&"number"==typeof w){var e=Math.min(Math.max(0,w),1);return A-e*A}return A}();(y=y.filter(function(n){var t=n.getBoundingClientRect(),o=t.top,r=t.bottom,i=t.height,s=o<e,u=r<e;if(s&&!n.__ev_entered){if(_(n),n.__ev_progress=0,l(n,n.__ev_progress),p)return!1}else!s&&n.__ev_entered&&(n.__ev_progress=0,l(n,n.__ev_progress),f(n));if(s&&!u){var d=(e-o)/i;n.__ev_progress=Math.min(1,Math.max(0,d)),l(n,n.__ev_progress)}return s&&u&&1!==n.__ev_progress&&(n.__ev_progress=1,l(n,n.__ev_progress)),n.__ev_entered=s,!0})).length||window.removeEventListener("scroll",o,!0)}function o(){x||(x=!0,h(t))}function r(){n(),t()}function i(){n(),t()}function s(e){for(var n=e.length,t=[],o=0;o<n;o+=1)t.push(e[o]);return t}function u(){y=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return"string"==typeof e?s(n.querySelectorAll(e)):e instanceof NodeList?s(e):e instanceof Array?e:void 0}(d)}var d=e.selector,a=e.enter,_=void 0===a?function(){}:a,c=e.exit,f=void 0===c?function(){}:c,v=e.progress,l=void 0===v?function(){}:v,m=e.offset,w=void 0===m?0:m,g=e.once,p=void 0!==g&&g,h=null,x=!1,y=[],A=0;d?(u(),y&&y.length?(h=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)},window.addEventListener("resize",r,!0),window.addEventListener("scroll",o,!0),window.addEventListener("load",i,!0),r(),t()):console.error("no selector elements found")):console.error("must pass a selector")}});
},{}],"omBB":[function(require,module,exports) {
"use strict";function e(e){var o=e;return o=e.includes("--")?e.split("--")[1].replace(" PUMA",""):o.replace(" PUMA","")}function o(e,o,a){mapboxgl.accessToken="pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ";var n=new mapboxgl.Map({container:"map-".concat(o),center:[-104.90465,39.68594],maxZoom:14,minZoom:3,dragPan:!0,scrollZoom:!0,style:"mapbox://styles/dock4242/ck43bzz4f01461cl4ri5e5ogn",maxBounds:[[-180,0],[-40,75]]});return n.addControl(new mapboxgl.NavigationControl),n.on("load",function(){}),n}function a(e){return mapboxgl.accessToken="pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ",new mapboxgl.Map({container:"map-".concat(e),center:[-100.13166997361526,37.90144323731123],maxZoom:16,scrollZoom:!1,dragPan:!0,style:"mapbox://styles/dock4242/ck43bzz4f01461cl4ri5e5ogn",zoom:3.5355101377334592})}function n(o){mapboxgl.accessToken="pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ";var a=new mapboxgl.Map({container:"map-".concat(o),center:[-100.13167,37.90144324],maxZoom:16,dragPan:!0,scrollZoom:!1,style:"mapbox://styles/dock4242/ck43bzz4f01461cl4ri5e5ogn",zoom:3.5355101377334592}),n=new mapboxgl.Popup({closeButton:!1,closeOnClick:!1,offset:20,maxWidth:300});return a.on("zoom",function(e){a.getZoom()<5&&(a.getCanvas().style.cursor="",n.remove())}),a.on("zoom",function(e){n.remove()}),a.on("mousemove",function(o){if(a.getZoom()<5)return a.getCanvas().style.cursor="",void n.remove();a.getCanvas().style.cursor="pointer";var t=a.queryRenderedFeatures(o.point).filter(function(e){return"puma_polygons"===e.layer.id})[0];if(null!=t){var r=e(t.properties.Name),l="<p class='nbhd-subhed'>".concat(r,"</p>");n.setLngLat(o.lngLat).setHTML(l).addTo(a)}}),a.addControl(new mapboxgl.NavigationControl),a}function t(e,o,a){console.log("nice");for(var n={type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"LineString",coordinates:[[+o.X1,+o.Y1],[+o.X2,+o.Y2]]}}]},t=turf.lineDistance(n.features[0],"kilometers"),r=[],l=500,c=0;c<t;c+=t/l){var i=turf.along(n.features[0],c,"kilometers");r.push(i.geometry.coordinates)}n.features[0].geometry.coordinates=r;var s=a;e.on("load",function(){e.addSource("route",{type:"geojson",data:n}),e.addLayer({id:"route",source:"route",type:"line",paint:{"line-width":2,"line-color":"#007cbf"}}),function e(){s<l&&requestAnimationFrame(e),s+=1}()})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r={makeMapUnexpected:o,makeTourMap:a,makeExploreMap:n,makeRoute:t};exports.default=r;
},{}],"TAPd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e,t,n,o,c,s,i,r,l,a,u,d,f,p,m=_(require("enter-view")),h=_(require("./makeMaps"));function _(e){return e&&e.__esModule?e:{default:e}}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){g(e,t,n[t])})}return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v,y,x,k,A=!1,M=!1,P=0,w=7e3,z={X1:-68.32792,Y1:46.20214};function O(e){f=d3.nest().key(function(e){return e.reason_num}).entries(e).sort(function(e,t){return e.key<t.key?1:-1}).filter(function(e){return["1","2","3","4"].includes(e.key)}).map(function(e){return b({},e,{reason:e.values[0].reason})}),console.log(f)}function T(){e=d3.select(".country-title__suffix"),t=d3.select(".subhed-country"),d3.select(".explore__expand-tab").on("click",function(){!1===A?(d3.select("nav.explore").style("transform","translateX(0)"),d3.select(".triangle-left").classed("collapsed",!0),d3.select(".method").classed("outta-sight-info",!0),d3.select(".method").classed("in-sight-info",!1),d3.select(".intro__blurb").classed("outta-sight-intro",!0),d3.select(".intro__blurb").classed("in-sight-intro",!1),d3.select(".misc-info").classed("outta-sight-info",!1),d3.select(".misc-info").classed("in-sight-info",!0),A=!0):!0===A&&(d3.select("nav.explore").style("transform","translateX(-95%)"),d3.select(".triangle-left").classed("collapsed",!1),A=!1)}),d3.selectAll(".blurb").on("click",function(){d3.select(".intro__blurb").classed("in-sight-intro",!1),d3.select(".intro__blurb").classed("outta-sight-intro",!0),d3.select(".misc-info").classed("outta-sight-info",!1),d3.select(".misc-info").classed("in-sight-info",!0)}),d3.select(".misc-info__info").on("click",function(){d3.select(".misc-info").classed("in-sight-info",!1),d3.select(".misc-info").classed("outta-sight-info",!0),d3.select(".intro__blurb").classed("in-sight-intro",!0),d3.select(".intro__blurb").classed("outta-sight-intro",!1)}),d3.select(".misc-info__method").on("click",function(){d3.select(".misc-info").classed("in-sight-info",!1),d3.select(".misc-info").classed("outta-sight-info",!0),d3.select(".method").classed("in-sight-intro",!0),d3.select(".method").classed("outta-sight-intro",!1)}),d3.select(".method").on("click",function(){d3.select(".misc-info").classed("in-sight-info",!0),d3.select(".misc-info").classed("outta-sight-info",!1),d3.select(".method").classed("in-sight-intro",!1),d3.select(".method").classed("outta-sight-intro",!0)})}function j(t){t.length>7?e.style("font-size","48px"):t.length<=7&&e.style("font-size","48px")}function U(e){return d=e.sort(function(e,t){return e.birthplace<t.birthplace?-1:1}).map(function(e){return b({},e,{X:+e.X,Y:+e.Y})}),e}function X(){}function L(e){return c=h.default.makeMapUnexpected(z,"intro",o),e}function q(e,t){"pitch-up"===e.getAttribute("data-step")&&(d3.select(".intro__cover-text").style("opacity","".concat(1-2*t)),c.on("moveend",function(){}).flyTo({pitch:"".concat(60-60*t),easing:function(){return 1}}))}function E(e){function t(e){var t=n.filter(function(t){return t.name===e})[0];c.flyTo({center:[+t.lon,+t.lat],speed:1,zoom:+t.zoom})}var o=e.getAttribute("data-step");"usa"===o?t(o):"nyc"===o?t(o):"nyc-brooklyn"===o?t(o):"nyc-queens"===o?t(o):"nyc-manhattan-bronx"===o?t(o):"la-1"===o?t(o):"fl-1"===o?t(o):"hou-1"===o?t(o):"minneapolis"===o&&t(o)}function N(e){function t(e){var t=n.filter(function(t){return t.name===e})[0];c.flyTo({center:[+t.lon,+t.lat],speed:1,zoom:+t.zoom})}var o=e.getAttribute("data-previous-step");"usa"===o?t(o):"nyc"===o?t(o):"nyc-brooklyn"===o?t(o):"nyc-queens"===o?t(o):"nyc-manhattan-bronx"===o?t(o):"la-1"===o?t(o):"fl-1"===o?t(o):"hou-1"===o?t(o):"minneapolis"===o&&t(o)}function Y(){window.onscroll=function(){document.body.scrollTop>1||document.documentElement.scrollTop>1?(clearInterval(p),M=!0,d3.select(".intro__scroll-cue").classed("hidden",!0),c.on("load",function(e){c.zoom=+c.getZoom()-.1})):d3.select(".intro__scroll-cue").classed("hidden",!1)},d3.select(".tour-step:nth-child(2)").classed("ux__fade-intro-txt",!0),(0,m.default)({selector:".tour-step",enter:function(e){E(e)},exit:function(e){N(e)},progress:function(e,t){q(e,t)},offset:0,once:!1})}function F(){d3.select("nav.explore__nav-bar").select("ul").selectAll("li.country-button").data(o).join("li").attr("class",function(e){return"country-button ".concat(e.birthplace)}).text(function(e){return e.birthplace.replace(/_/g," ")}).on("mouseenter",function(e){k=e.birthplace;var t=c.queryRenderedFeatures().filter(function(e){return"only_pumas_w_diasporas-4hi77s"===e.sourceLayer}).filter(function(e){return e.properties.birthplace.replace(/ /g,"_").includes(k)}),n=new mapboxgl.Popup({closeButton:!1});t.forEach(function(e){n.setLngLat(e.geometry.coordinates).setHTML("<div class='tooltip__diaspora-name ".concat(e.properties.birthplace,"'>").concat(e.properties.birthplace,"</div>\n            <div class='tooltip__puma-name'>").concat(e.properties.Name.replace(/PUMA/g,""),"</div>")).addTo(c)})}).on("mouseleave",function(e){d3.selectAll(".mapboxgl-popup").remove()}).on("click",function(e){c.flyTo({center:[+e.X,+e.Y],speed:1,zoom:9}),d3.select("div.intro__cover-viz").selectAll(".marker").classed("showMarker",!1)}),o.forEach(function(e){var t=document.createElement("div");t.className="marker ".concat(e.birthplace),d3.select(t).append("div").attr("class","tooltip__diaspora-name ".concat(e.birthplace)).text("".concat(e.birthplace.replace(/_/g," "))),d3.select(t).append("div").attr("class","tooltip__puma-name ".concat(e.Name)).text("".concat(e.Name.replace(/PUMA/g,""))),d3.select(t).append("div").attr("class","tooltip__triangle ".concat(e.Name)),new mapboxgl.Marker(t).setLngLat([+e.X,+e.Y]).addTo(c)})}function S(){T(),Promise.all([d3.csv("assets/data/coordinates - edited_final.csv"),d3.csv("assets/data/diaspora_data_culling - updatecoords.csv")]).then(function(e){return n=e[1],o=e[0].map(function(e){return b({},e,{pumaFormatted:(t=5-e.PUMA.length,0===t?e.PUMA:1===t?"0".concat(e.PUMA):2===t?"00".concat(e.PUMA):void 0)});var t}).filter(function(e){return"1"!=e.non_specific})}).then(function(e){return L(e)}).then(function(e){return U(e)}).then(function(){return F()})}var B={init:S,resize:X};exports.default=B;
},{"enter-view":"RZIL","./makeMaps":"omBB"}],"v9Q8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=[{image:"2018_02_stand-up",url:"2018/02/stand-up",hed:"The Structure of Stand-Up Comedy"},{image:"2018_04_birthday-paradox",url:"2018/04/birthday-paradox",hed:"The Birthday Paradox Experiment"},{image:"2018_11_boy-bands",url:"2018/11/boy-bands",hed:"Internet Boy Band Database"},{image:"2018_08_pockets",url:"2018/08/pockets",hed:"Women’s Pockets are Inferior"}],t=null;function n(e,t){var n=document.getElementsByTagName("script")[0],o=document.createElement("script");return o.src=e,o.async=!0,n.parentNode.insertBefore(o,n),t&&"function"==typeof t&&(o.onload=t),o}function o(t){var n=new XMLHttpRequest,o=Date.now(),r="https://pudding.cool/assets/data/stories.json?v=".concat(o);n.open("GET",r,!0),n.onload=function(){if(n.status>=200&&n.status<400){var o=JSON.parse(n.responseText);t(o)}else t(e)},n.onerror=function(){return t(e)},n.send()}function r(e){return"\n\t<a class='footer-recirc__article' href='https://pudding.cool/".concat(e.url,"' target='_blank'>\n\t\t<img class='article__img' src='https://pudding.cool/common/assets/thumbnails/640/").concat(e.image,".jpg' alt='").concat(e.hed,"'>\n\t\t<p class='article__headline'>").concat(e.hed,"</p>\n\t</a>\n\t")}function a(){var e=window.location.href,n=t.filter(function(t){return!e.includes(t.url)}).slice(0,4).map(r).join("");d3.select(".pudding-footer .footer-recirc__articles").html(n)}function s(){var e,t,o,r,a;e=document,t="script",o="facebook-jssdk",a=e.getElementsByTagName(t)[0],e.getElementById(o)||((r=e.createElement(t)).id=o,r.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7",a.parentNode.insertBefore(r,a)),n("https://platform.twitter.com/widgets.js")}function c(){o(function(e){t=e,a(),s()})}var i={init:c};exports.default=i;
},{}],"epB2":[function(require,module,exports) {
"use strict";var e=l(require("lodash.debounce")),i=l(require("./utils/is-mobile")),s=l(require("./graphic")),t=l(require("./footer"));function l(e){return e&&e.__esModule?e:{default:e}}var d=d3.select("body"),r=0;function a(){var e=d.node().offsetWidth;r!==e&&(r=e,s.default.resize(e))}function n(){if(d.select("header").classed("is-sticky")){var e=d.select(".header__menu"),i=d.select(".header__toggle");i.on("click",function(){var s=e.classed("is-visible");e.classed("is-visible",!s),i.classed("is-visible",!s)})}}function u(){d.classed("is-mobile",i.default.any()),window.addEventListener("resize",(0,e.default)(a,150)),s.default.init(),t.default.init()}u();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./graphic":"TAPd","./footer":"v9Q8"}]},{},["epB2"], null)