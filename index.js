#!usr/bin/env node

/**
 * File: index.js
 * Type: Javascript index file
 * Author: Chris Humboldt
 */

!function(e,t){"object"==typeof exports&&exports&&"string"!=typeof exports.nodeName?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):(e.Mustache={},t(e.Mustache))}(this,function(e){function t(e){return"function"==typeof e}function n(e){return v(e)?"array":typeof e}function r(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function o(e,t){return null!=e&&"object"==typeof e&&t in e}function i(e,t){return g.call(e,t)}function a(e){return!i(m,e)}function s(e){return String(e).replace(/[&<>"'`=\/]/g,function(e){return w[e]})}function c(t,n){function o(){if(m&&!w)for(;g.length;)delete d[g.pop()];else g=[];m=!1,w=!1}function i(e){if("string"==typeof e&&(e=e.split(b,2)),!v(e)||2!==e.length)throw new Error("Invalid tags: "+e);s=new RegExp(r(e[0])+"\\s*"),c=new RegExp("\\s*"+r(e[1])),f=new RegExp("\\s*"+r("}"+e[1]))}if(!t)return[];var s,c,f,h=[],d=[],g=[],m=!1,w=!1;i(n||e.tags);for(var j,T,U,D,I,N,A=new l(t);!A.eos();){if(j=A.pos,U=A.scanUntil(s))for(var C=0,S=U.length;S>C;++C)D=U.charAt(C),a(D)?g.push(d.length):w=!0,d.push(["text",D,j,j+1]),j+=1,"\n"===D&&o();if(!A.scan(s))break;if(m=!0,T=A.scan(E)||"name",A.scan(y),"="===T?(U=A.scanUntil(x),A.scan(x),A.scanUntil(c)):"{"===T?(U=A.scanUntil(f),A.scan(k),A.scanUntil(c),T="&"):U=A.scanUntil(c),!A.scan(c))throw new Error("Unclosed tag at "+A.pos);if(I=[T,U,j,A.pos],d.push(I),"#"===T||"^"===T)h.push(I);else if("/"===T){if(N=h.pop(),!N)throw new Error('Unopened section "'+U+'" at '+j);if(N[1]!==U)throw new Error('Unclosed section "'+N[1]+'" at '+j)}else"name"===T||"{"===T||"&"===T?w=!0:"="===T&&i(U)}if(N=h.pop())throw new Error('Unclosed section "'+N[1]+'" at '+A.pos);return p(u(d))}function u(e){for(var t,n,r=[],o=0,i=e.length;i>o;++o)t=e[o],t&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(r.push(t),n=t));return r}function p(e){for(var t,n,r=[],o=r,i=[],a=0,s=e.length;s>a;++a)switch(t=e[a],t[0]){case"#":case"^":o.push(t),i.push(t),o=t[4]=[];break;case"/":n=i.pop(),n[5]=t[2],o=i.length>0?i[i.length-1][4]:r;break;default:o.push(t)}return r}function l(e){this.string=e,this.tail=e,this.pos=0}function f(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function h(){this.cache={}}var d=Object.prototype.toString,v=Array.isArray||function(e){return"[object Array]"===d.call(e)},g=RegExp.prototype.test,m=/\S/,w={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},y=/\s*/,b=/\s+/,x=/\s*=/,k=/\s*\}/,E=/#|\^|\/|>|\{|&|=|!/;l.prototype.eos=function(){return""===this.tail},l.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},l.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},f.prototype.push=function(e){return new f(e,this)},f.prototype.lookup=function(e){var n,r=this.cache;if(r.hasOwnProperty(e))n=r[e];else{for(var i,a,s=this,c=!1;s;){if(e.indexOf(".")>0)for(n=s.view,i=e.split("."),a=0;null!=n&&a<i.length;)a===i.length-1&&(c=o(n,i[a])),n=n[i[a++]];else n=s.view[e],c=o(s.view,e);if(c)break;s=s.parent}r[e]=n}return t(n)&&(n=n.call(this.view)),n},h.prototype.clearCache=function(){this.cache={}},h.prototype.parse=function(e,t){var n=this.cache,r=n[e];return null==r&&(r=n[e]=c(e,t)),r},h.prototype.render=function(e,t,n){var r=this.parse(e),o=t instanceof f?t:new f(t);return this.renderTokens(r,o,n,e)},h.prototype.renderTokens=function(e,t,n,r){for(var o,i,a,s="",c=0,u=e.length;u>c;++c)a=void 0,o=e[c],i=o[0],"#"===i?a=this.renderSection(o,t,n,r):"^"===i?a=this.renderInverted(o,t,n,r):">"===i?a=this.renderPartial(o,t,n,r):"&"===i?a=this.unescapedValue(o,t):"name"===i?a=this.escapedValue(o,t):"text"===i&&(a=this.rawValue(o)),void 0!==a&&(s+=a);return s},h.prototype.renderSection=function(e,n,r,o){function i(e){return a.render(e,n,r)}var a=this,s="",c=n.lookup(e[1]);if(c){if(v(c))for(var u=0,p=c.length;p>u;++u)s+=this.renderTokens(e[4],n.push(c[u]),r,o);else if("object"==typeof c||"string"==typeof c||"number"==typeof c)s+=this.renderTokens(e[4],n.push(c),r,o);else if(t(c)){if("string"!=typeof o)throw new Error("Cannot use higher-order sections without the original template");c=c.call(n.view,o.slice(e[3],e[5]),i),null!=c&&(s+=c)}else s+=this.renderTokens(e[4],n,r,o);return s}},h.prototype.renderInverted=function(e,t,n,r){var o=t.lookup(e[1]);return!o||v(o)&&0===o.length?this.renderTokens(e[4],t,n,r):void 0},h.prototype.renderPartial=function(e,n,r){if(r){var o=t(r)?r(e[1]):r[e[1]];return null!=o?this.renderTokens(this.parse(o),n,r,o):void 0}},h.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);return null!=n?n:void 0},h.prototype.escapedValue=function(t,n){var r=n.lookup(t[1]);return null!=r?e.escape(r):void 0},h.prototype.rawValue=function(e){return e[1]},e.name="mustache.js",e.version="2.2.1",e.tags=["{{","}}"];var j=new h;e.clearCache=function(){return j.clearCache()},e.parse=function(e,t){return j.parse(e,t)},e.render=function(e,t,r){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+n(e)+'" was given as the first argument for mustache#render(template, view, partials)');return j.render(e,t,r)},e.to_html=function(n,r,o,i){var a=e.render(n,r,o);return t(i)?void i(a):a},e.escape=s,e.Scanner=l,e.Context=f,e.Writer=h});var Injectplate=function(){return{init:function(){return new InjectplateComponent}}}(),InjectplateComponent=function(){var e={},t=function(t){var t=t||!1;if(t!==!1&&t.component){var r,o=t.data||"";if(r=a(void 0!==t.to?t.to:"#"+t.component))for(var i=0,s=r.length;s>i;i++){var c=Mustache.render(e[t.component].html,o);t.overwrite===!0?r[i].innerHTML=c:r[i].insertAdjacentHTML("beforeend",c),r[i].setAttribute("data-inject","true"),e[t.component].id&&(r[i].id=e[t.component].id),e[t.component].className&&n(r[i],e[t.component].className),e[t.component].onDone&&(callback=e[t.component].onDone(r[i])),void 0!==t.onDone&&(callback=t.onDone(r[i]))}}},n=function(e,t){var n=e.className;null===n.match(new RegExp("\\b"+t+"\\b","g"))&&(e.className=""===n?t:n+" "+t)},e=function(){console.log(e)},r=function(t){e[t.name]={className:t.className||!1,id:t.id||!1,html:o(t.html),onDone:t.onDone||!1,overwrite:t.overwrite||!1}},o=function(e){if("object"==typeof e){for(var t="",n=0,r=e.length;r>n;n++)t+=e[n];return t}if("string"==typeof e){for(var t="",o=e.split(/(?:\r\n|\n|\r)/),n=0,r=o.length;r>n;n++)t+=o[n].trim();return t}},i=function(t){var t=t||!1;if(t!==!1&&t.component){var n=t.data||"";void 0!==t.onDone&&t.onDone(Mustache.render(e[t.component].html,n))}},a=function(e){return e.indexOf(".")>-1?document.querySelectorAll(e):e.indexOf("#")>-1?[document.getElementById(e.substring(1))]:document.getElementsByTagName(e)};return{bind:t,component:r,componentList:e,generate:i}};

module.exports = Injectplate.init();
