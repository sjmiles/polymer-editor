// Copyright (c) 2012 The Polymer Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// @version: 0.1.4-65d170c
Polymer={},"function"==typeof window.Polymer&&(Polymer={}),function(a){function b(a,b){return a&&b&&Object.getOwnPropertyNames(b).forEach(function(c){var d=Object.getOwnPropertyDescriptor(b,c);d&&(Object.defineProperty(a,c,d),"function"==typeof d.value&&(d.value.nom=c))}),a}a.extend=b}(Polymer),function(a){function b(a,b,d){return a?a.stop():a=new c(this),a.go(b,d),a}var c=function(a){this.context=a,this.boundComplete=this.complete.bind(this)};c.prototype={go:function(a,b){this.callback=a;var c;b?(c=setTimeout(this.boundComplete,b),this.handle=function(){clearTimeout(c)}):(c=requestAnimationFrame(this.boundComplete),this.handle=function(){cancelAnimationFrame(c)})},stop:function(){this.handle&&(this.handle(),this.handle=null)},complete:function(){this.handle&&(this.stop(),this.callback.call(this.context))}},a.job=b}(Polymer),function(){var a={};HTMLElement.register=function(b,c){a[b]=c},HTMLElement.getPrototypeForTag=function(b){var c=b?a[b]:HTMLElement.prototype;return c||Object.getPrototypeOf(document.createElement(b))};var b=Event.prototype.stopPropagation;Event.prototype.stopPropagation=function(){this.cancelBubble=!0,b.apply(this,arguments)}}(Polymer),function(a){function b(a){var c=b.caller,g=c.nom,h=c._super;if(h||(g||(g=c.nom=e.call(this,c)),g||console.warn("called super() on a method not installed declaratively (has no .nom property)"),h=d(c,g,f(this))),h){var i=h[g];return i._super||d(i,g,h),i.apply(this,a||[])}}function c(a,b,c){for(;a;){if(a[b]!==c&&a[b])return a;a=f(a)}}function d(a,b,d){return a._super=c(d,b,a),a._super&&(a._super[b].nom=b),a._super}function e(a){for(var b=this.__proto__;b&&b!==HTMLElement.prototype;){for(var c,d=Object.getOwnPropertyNames(b),e=0,f=d.length;f>e&&(c=d[e]);e++){var g=Object.getOwnPropertyDescriptor(b,c);if("function"==typeof g.value&&g.value===a)return c}b=b.__proto__}}function f(a){return a.__proto__}a.super=b}(Polymer),function(a){function b(a,b){var d=typeof b;return b instanceof Date&&(d="date"),c[d](a,b)}var c={string:function(a){return a},date:function(a){return new Date(Date.parse(a)||Date.now())},"boolean":function(a){return""===a?!0:"false"===a?!1:!!a},number:function(a){var b=parseFloat(a);return 0===b&&(b=parseInt(a)),isNaN(b)?a:b},object:function(a,b){if(null===b)return a;try{return JSON.parse(a.replace(/'/g,'"'))}catch(c){return a}},"function":function(a,b){return b}};a.deserializeValue=b}(Polymer),function(a){var b={};b.declaration={},b.instance={},a.api=b}(Polymer),function(a){var b={async:function(a,b,c){Platform.flush(),b=b&&b.length?b:[b];var d=function(){(this[a]||a).apply(this,b)}.bind(this);return c?setTimeout(d,c):requestAnimationFrame(d)},fire:function(a,b,c,d,e){var f=c||this,b=b||{},g=new CustomEvent(a,{bubbles:void 0!==d?d:!0,cancelable:void 0!==e?e:!0,detail:b});return f.dispatchEvent(g),g},asyncFire:function(){this.async("fire",arguments)},classFollows:function(a,b,c){b&&b.classList.remove(c),a&&a.classList.add(c)}},c=function(){},d={};b.asyncMethod=b.async,a.api.instance.utils=b,a.nop=c,a.nob=d}(Polymer),function(a){function b(a){for(;a.parentNode;)a=a.parentNode;return a.host}var c=window.logFlags||{},d="on-",e={EVENT_PREFIX:d,hasEventPrefix:function(a){return a&&"o"===a[0]&&"n"===a[1]&&"-"===a[2]},removeEventPrefix:function(a){return a.slice(f)},addHostListeners:function(){var a=this.eventDelegates;c.events&&Object.keys(a).length>0&&console.log("[%s] addHostListeners:",this.localName,a),this.addNodeListeners(this,a,this.hostEventListener)},addNodeListeners:function(a,b,c){var d;for(var e in b)d||(d=c.bind(this)),this.addNodeListener(a,e,d)},addNodeListener:function(a,b,c){a.addEventListener(b,c)},hostEventListener:function(a){if(!a.cancelBubble){c.events&&console.group("[%s]: hostEventListener(%s)",this.localName,a.type);var b=this.findEventDelegate(a);b&&(c.events&&console.log("[%s] found host handler name [%s]",this.localName,b),this.dispatchMethod(this,b,[a,a.detail,this])),c.events&&console.groupEnd()}},findEventDelegate:function(a){return this.eventDelegates[a.type]},dispatchMethod:function(a,b,d){if(a){c.events&&console.group("[%s] dispatch [%s]",a.localName,b);var e="function"==typeof b?b:a[b];e&&e[d?"apply":"call"](a,d),c.events&&console.groupEnd(),Platform.flush()}},prepareBinding:function(a,d){return e.hasEventPrefix(d)?function(f,g){c.events&&console.log('event: [%s].%s => [%s].%s()"',g.localName,f.localName,a);var h=function(c){var d=b(g);if(d&&d.dispatchMethod){var e=d,h=a;"@"==a[0]&&(e=f,h=Path.get(a.slice(1)).getValueFrom(f)),d.dispatchMethod(e,h,[c,c.detail,g])}},i=e.removeEventPrefix(d);return{open:function(){g.addEventListener(i,h,!1)},close:function(){c.events&&console.log('event.remove: [%s].%s => [%s].%s()"',g.localName,d,f.localName,a),g.removeEventListener(i,h,!1)},discardChanges:function(){}}}:void 0}},f=d.length;a.api.instance.events=e}(Polymer),function(a){var b={copyInstanceAttributes:function(){var a=this._instanceAttributes;for(var b in a)this.hasAttribute(b)||this.setAttribute(b,a[b])},takeAttributes:function(){if(this._publishLC)for(var a,b=0,c=this.attributes,d=c.length;(a=c[b])&&d>b;b++)this.attributeToProperty(a.name,a.value)},attributeToProperty:function(b,c){var b=this.propertyForAttribute(b);if(b){if(c&&c.search(a.bindPattern)>=0)return;var d=this[b],c=this.deserializeValue(c,d);c!==d&&(this[b]=c)}},propertyForAttribute:function(a){var b=this._publishLC&&this._publishLC[a];return b},deserializeValue:function(b,c){return a.deserializeValue(b,c)},serializeValue:function(a,b){return"boolean"===b?a?"":void 0:"object"!==b&&"function"!==b&&void 0!==a?a:void 0},reflectPropertyToAttribute:function(a){var b=typeof this[a],c=this.serializeValue(this[a],b);void 0!==c?this.setAttribute(a,c):"boolean"===b&&this.removeAttribute(a)}};a.api.instance.attributes=b}(Polymer),function(a){function b(a,b,d){c.bind&&console.log(e,inB.localName||"object",inPath,a.localName,b);var f=d.discardChanges();return(null===f||void 0===f)&&d.setValue(a[b]),Observer.defineComputedProperty(a,b,d)}var c=window.logFlags||{},d={observeProperties:function(){var a=this._observeNames,b=this._publishNames;if(a&&a.length||b&&b.length){for(var c,d=this._propertyObserver=new CompoundObserver,e=0,f=a.length;f>e&&(c=a[e]);e++){d.addPath(this,c);var g=Object.getOwnPropertyDescriptor(this.__proto__,c);g&&g.value&&this.observeArrayValue(c,g.value,null)}for(var c,e=0,f=b.length;f>e&&(c=b[e]);e++)this.observe&&void 0!==this.observe[c]||d.addPath(this,c);d.open(this.notifyPropertyChanges,this)}},notifyPropertyChanges:function(a,b,c){var d,e,f={};for(var g in b)d=c[2*g+1],void 0!==this.publish[d]&&this.reflectPropertyToAttribute(d),e=this.observe[d],e&&(this.observeArrayValue(d,a[g],b[g]),f[e]||(f[e]=!0,this.invokeMethod(e,[b[g],a[g],arguments])))},observeArrayValue:function(a,b,d){var e=this.observe[a];if(e&&(Array.isArray(d)&&(c.observe&&console.log("[%s] observeArrayValue: unregister observer [%s]",this.localName,a),this.unregisterObserver(a+"__array")),Array.isArray(b))){c.observe&&console.log("[%s] observeArrayValue: register observer [%s]",this.localName,a,b);var f=new ArrayObserver(b);f.open(function(a,b){this.invokeMethod(e,[b])},this),this.registerObserver(a+"__array",f)}},bindProperty:function(a,c){return b(this,a,c)},unbindAllProperties:function(){this._propertyObserver&&this._propertyObserver.close(),this.unregisterObservers()},unbindProperty:function(a){return this.unregisterObserver(a)},invokeMethod:function(a,b){var c=this[a]||a;"function"==typeof c&&c.apply(this,b)},registerObserver:function(a,b){var c=this._observers||(this._observers={});c[a]=b},unregisterObserver:function(a){var b=this._observers;return b&&b[a]?(b[a].close(),b[a]=null,!0):void 0},unregisterObservers:function(){if(this._observers){for(var a,b,c=Object.keys(this._observers),d=0,e=c.length;e>d&&(a=c[d]);d++)b=this._observers[a],b.close();this._observers={}}}},e="[%s]: bindProperties: [%s] to [%s].[%s]";a.api.instance.properties=d}(Polymer),function(a){function b(a){d(a,c)}function c(a){a.unbindAll()}function d(a,b){if(a){b(a);for(var c=a.firstChild;c;c=c.nextSibling)d(c,b)}}var e=window.logFlags||0,f=a.api.instance.events,g=PolymerExpressions.prototype.prepareBinding;PolymerExpressions.prototype.prepareBinding=function(a,b,c){return f.prepareBinding(a,b,c)||g.call(this,a,b,c)};var h=new PolymerExpressions,i={syntax:h,instanceTemplate:function(a){return a.createInstance(this,this.syntax)},bind:function(a,b){this._elementPrepared||this.prepareElement();var c=this.propertyForAttribute(a);if(c){this.unbind(a);var d=this.bindProperty(c,b);return d.path=b.path_,this.reflectPropertyToAttribute(c),this.bindings[a]=d}return this.mixinSuper(arguments)},asyncUnbindAll:function(){this._unbound||(e.unbind&&console.log("[%s] asyncUnbindAll",this.localName),this._unbindAllJob=this.job(this._unbindAllJob,this.unbindAll,0))},unbindAll:function(){if(!this._unbound){this.unbindAllProperties(),this.super();for(var a=this.shadowRoot;a;)b(a),a=a.olderShadowRoot;this._unbound=!0}},cancelUnbindAll:function(a){return this._unbound?(e.unbind&&console.warn("[%s] already unbound, cannot cancel unbindAll",this.localName),void 0):(e.unbind&&console.log("[%s] cancelUnbindAll",this.localName),this._unbindAllJob&&(this._unbindAllJob=this._unbindAllJob.stop()),a||d(this.shadowRoot,function(a){a.cancelUnbindAll&&a.cancelUnbindAll()}),void 0)}},j=/\{\{([^{}]*)}}/;a.bindPattern=j,a.api.instance.mdv=i}(Polymer),function(a){function b(a){return a.hasOwnProperty("PolymerBase")}function c(){}var d=0,e={PolymerBase:!0,job:Polymer.job,"super":Polymer.super,created:function(){},ready:function(){},createdCallback:function(){this.created(),(this.ownerDocument.defaultView||this.alwaysPrepare||d>0)&&this.prepareElement()},prepareElement:function(){this._elementPrepared=!0,this.observeProperties(),this.copyInstanceAttributes(),this.takeAttributes(),this.addHostListeners(),d++,this.parseDeclarations(this.__proto__),d--,this.ready()},attachedCallback:function(){this._elementPrepared||this.prepareElement(),this.cancelUnbindAll(!0),this.attached&&this.attached(),this.enteredView&&this.enteredView()},detachedCallback:function(){this.preventDispose||this.asyncUnbindAll(),this.detached&&this.detached(),this.leftView&&this.leftView()},enteredViewCallback:function(){this.attachedCallback()},leftViewCallback:function(){this.detachedCallback()},enteredDocumentCallback:function(){this.attachedCallback()},leftDocumentCallback:function(){this.detachedCallback()},parseDeclarations:function(a){a&&a.element&&(this.parseDeclarations(a.__proto__),a.parseDeclaration.call(this,a.element))},parseDeclaration:function(a){var b=this.fetchTemplate(a);b&&(this.element.hasAttribute("lightdom")?this.lightFromTemplate(b):this.shadowFromTemplate(b))},fetchTemplate:function(a){return a.querySelector("template")},shadowFromTemplate:function(a){if(a){var b=(this.shadowRoot,this.createShadowRoot());b.applyAuthorStyles=this.applyAuthorStyles,b.resetStyleInheritance=this.resetStyleInheritance;var c=this.instanceTemplate(a);return b.appendChild(c),this.shadowRootReady(b,a),b}},lightFromTemplate:function(a){if(a){var b=this.instanceTemplate(a);return this.appendChild(b),this.shadowRootReady(this,a),b}},shadowRootReady:function(a){this.marshalNodeReferences(a),PointerGestures.register(a)},marshalNodeReferences:function(a){var b=this.$=this.$||{};if(a)for(var c,d=a.querySelectorAll("[id]"),e=0,f=d.length;f>e&&(c=d[e]);e++)b[c.id]=c},attributeChangedCallback:function(a){"class"!==a&&"style"!==a&&this.attributeToProperty(a,this.getAttribute(a)),this.attributeChanged&&this.attributeChanged.apply(this,arguments)},onMutation:function(a,b){var c=new MutationObserver(function(a){b.call(this,c,a),c.disconnect()}.bind(this));c.observe(a,{childList:!0,subtree:!0})}};c.prototype=e,e.constructor=c,a.Base=c,a.isBase=b,a.api.instance.base=e}(Polymer),function(a){function b(a){return a.__proto__}var c=(window.logFlags||{},"element"),d="controller",e={STYLE_SCOPE_ATTRIBUTE:c,installControllerStyles:function(){var a=this.findStyleController();if(a&&!this.scopeHasElementStyle(a,d)){for(var c=b(this),e="";c&&c.element;)e+=c.element.cssTextForScope(d),c=b(c);if(e){var f=this.element.cssTextToScopeStyle(e,d);Polymer.applyStyleToScope(f,a)}}},findStyleController:function(){if(window.ShadowDOMPolyfill)return wrap(document.head);for(var a=this;a.parentNode;)a=a.parentNode;return a===document?document.head:a},scopeHasElementStyle:function(a,b){var d=c+"="+this.localName+"-"+b;return a.querySelector("style["+d+"]")}};a.api.instance.styles=e}(Polymer),function(a){var b={resolveElementPaths:function(a){h.resolvePathsInHTML(a)},addResolvePathApi:function(){var a=this.elementPath(),b=this.getAttribute("assetpath")||"",c=this.relPath;this.prototype.resolvePath=function(d,e){if(e)return this.element.urlToPath(e)+d;var f=d;if(b){var g=b.slice(0,-1);f=c(g,f)}return a+b+f}},elementPath:function(){return this.urlToPath(h.getDocumentUrl(this.ownerDocument))},relPath:function(a,b){for(var c=a.split("/"),d=b.split("/"),e=!1;c.length&&d.length&&c[0]===d[0];)c.shift(),d.shift(),e=!0;if(e)for(var f=0;f<c.length;f++)d.unshift("..");return d.join("/")},urlToPath:function(a){if(a){var b=a.split("/");return b.pop(),b.push(""),b.join("/")}return""}},c=["href","src","action"],d="["+c.join("],[")+"]",e="{{.*}}",f=/(url\()([^)]*)(\))/g,g=/(@import[\s]*)([^;]*)(;)/g,h={nodeUrl:function(a){var c=b.documentUrlFromNode(a);return h.resolveUrl(c,b.hrefOrSrc(a))},hrefOrSrc:function(a){return a.getAttribute("href")||a.getAttribute("src")},documentUrlFromNode:function(a){return h.getDocumentUrl(a.ownerDocument||a)},getDocumentUrl:function(a){var b=a&&(a._URL||a.impl&&a.impl._URL||a.baseURI||a.URL)||"";return b.split("#")[0]},resolveUrl:function(a,b){return this.isAbsUrl(b)?b:this.compressUrl(this.urlToPath(a)+b)},resolveRelativeUrl:function(a,b){return this.isAbsUrl(b)?b:this.makeDocumentRelPath(this.resolveUrl(a,b))},isAbsUrl:function(a){return/(^data:)|(^http[s]?:)|(^\/)/.test(a)},urlToPath:function(a){var b=a.split("/");return b.pop(),b.push(""),b.join("/")},compressUrl:function(a){var b="",c=a.indexOf("?");c>-1&&(b=a.substring(c),a=a.substring(c,0));for(var d,e=a.split("/"),f=0;f<e.length;f++)d=e[f],".."===d&&(e.splice(f-1,2),f-=2);return e.join("/")+b},makeDocumentRelPath:function(a){return h.urlElt.href=a,!h.urlElt.host||!window.location.port&&"80"===h.urlElt.port||h.urlElt.hostname===window.location.hostname&&h.urlElt.port===window.location.port&&h.urlElt.protocol===window.location.protocol?this.makeRelPath(h.documentURL,h.urlElt.href):a},makeRelPath:function(a,b){for(var c=a.split("/"),d=b.split("/");c.length&&c[0]===d[0];)c.shift(),d.shift();for(var e=0,f=c.length-1;f>e;e++)d.unshift("..");var g=d.join("/");return g},makeAbsUrl:function(a){return h.urlElt.href=a,h.urlElt.href},resolvePathsInHTML:function(a,b){b=b||h.documentUrlFromNode(a),a.hasAttributes&&a.hasAttributes()&&h.resolveNodeAttributes(a,b),h.resolveAttributes(a,b),h.resolveStyleElts(a,b);var c=a.querySelectorAll("template");if(c)for(var d,e=0,f=c.length;f>e&&(d=c[e]);e++)d.content&&h.resolvePathsInHTML(d.content,b)},resolvePathsInStylesheet:function(a){var b=h.nodeUrl(a);a.__resource=h.resolveCssText(a.__resource,b)},resolveStyleElts:function(a,b){var c=a.querySelectorAll("style");if(c)for(var d,e=0,f=c.length;f>e&&(d=c[e]);e++)h.resolveStyleElt(d,b)},resolveStyleElt:function(a,b){b=b||h.documentUrlFromNode(a),a.textContent=h.resolveCssText(a.textContent,b)},resolveCssText:function(a,b){var a=h.replaceUrlsInCssText(a,b,f);return h.replaceUrlsInCssText(a,b,g)},replaceUrlsInCssText:function(a,b,c){return a.replace(c,function(a,c,d,e){var f=d.replace(/["']/g,"");return f=h.resolveRelativeUrl(b,f),c+"'"+f+"'"+e})},resolveAttributes:function(a,b){var c=a&&a.querySelectorAll(d);if(c)for(var e,f=0,g=c.length;g>f&&(e=c[f]);f++)this.resolveNodeAttributes(e,b)},resolveNodeAttributes:function(a,b){b=b||h.documentUrlFromNode(a),c.forEach(function(c){var d=a.attributes[c];if(d&&d.value&&d.value.search(e)<0){var f=h.resolveRelativeUrl(b,d.value);d.value=f}})}};h.documentURL=h.getDocumentUrl(document),h.urlElt=document.createElement("a"),a.api.declaration.path=b,a.pathResolver=h}(Polymer),function(a){function b(a){return"@import '"+a.href+"';"}function c(a,b){if(a){var c=d(a.textContent),e=a.getAttribute(h);e&&c.setAttribute(h,e),b.appendChild(c)}}function d(a,b){b=b||document,b=b.createElement?b:b.ownerDocument;var c=b.createElement("style");return c.textContent=a,c}function e(a){return a&&a.__resource||""}function f(a,b){return o?o.call(a,b):void 0}var g=(window.logFlags||{},a.api.instance.styles),h=g.STYLE_SCOPE_ATTRIBUTE,i="style",j="link[rel=stylesheet]",k="global",l="polymer-scope",m={loadStyles:function(a){var b=this.templateContent();b&&this.convertSheetsToStyles(b),Platform.loader.loadStyles(b,a)},convertSheetsToStyles:function(a){for(var c,e,f=a.querySelectorAll(j),g=0,h=f.length;h>g&&(c=f[g]);g++){e=d(b(c),c.ownerDocument);var i=c.getAttribute(l);i&&e.setAttribute(l,i),c.parentNode.replaceChild(e,c)}},installSheets:function(){this.cacheSheets(),this.cacheStyles(),this.installLocalSheets(),this.installGlobalStyles()},cacheSheets:function(){this.sheets=this.findNodes(j),this.sheets.forEach(function(a){a.parentNode&&a.parentNode.removeChild(a)})},cacheStyles:function(){this.styles=this.findNodes(i+"["+l+"]"),this.styles.forEach(function(a){a.parentNode&&a.parentNode.removeChild(a)})},installLocalSheets:function(){var a=this.sheets.filter(function(a){return!a.hasAttribute(l)}),b=this.templateContent();if(b){var c="";if(a.forEach(function(a){c+=e(a)+"\n"}),c){var f=d(c,this.ownerDocument);b.insertBefore(f,b.firstChild)}}},findNodes:function(a,b){var c=this.querySelectorAll(a).array(),d=this.templateContent();if(d){var e=d.querySelectorAll(a).array();c=c.concat(e)}return b?c.filter(b):c},templateContent:function(){var a=this.querySelector("template");return a&&templateContent(a)},installGlobalStyles:function(){var a=this.styleForScope(k);c(a,document.head)},cssTextForScope:function(a){var b="",c="["+l+"="+a+"]",d=function(a){return f(a,c)},g=this.sheets.filter(d);g.forEach(function(a){b+=e(a)+"\n\n"});var h=this.styles.filter(d);return h.forEach(function(a){b+=a.textContent+"\n\n"}),b},styleForScope:function(a){var b=this.cssTextForScope(a);return this.cssTextToScopeStyle(b,a)},cssTextToScopeStyle:function(a,b){if(a){var c=d(a);return c.setAttribute(h,this.getAttribute("name")+"-"+b),c}}},n=HTMLElement.prototype,o=n.matches||n.matchesSelector||n.webkitMatchesSelector||n.mozMatchesSelector;a.api.declaration.styles=m,a.applyStyleToScope=c}(Polymer),function(a){var b=a.api.instance.events,c=(window.logFlags||{},{parseHostEvents:function(){var a=this.prototype.eventDelegates;this.addAttributeDelegates(a)},addAttributeDelegates:function(a){for(var c,d=0;c=this.attributes[d];d++)b.hasEventPrefix(c.name)&&(a[b.removeEventPrefix(c.name)]=c.value.replace("{{","").replace("}}","").trim())},event_translations:{webkitanimationstart:"webkitAnimationStart",webkitanimationend:"webkitAnimationEnd",webkittransitionend:"webkitTransitionEnd",domfocusout:"DOMFocusOut",domfocusin:"DOMFocusIn",dommousescroll:"DOMMouseScroll"}});a.api.declaration.events=c}(Polymer),function(a){var b={inferObservers:function(a){var b,c=a.observe;for(var d in a)"Changed"===d.slice(-7)&&(c||(c=a.observe={}),b=d.slice(0,-7),c[b]=c[b]||d)},explodeObservers:function(a){var b=a.observe;if(b){var c={};for(var d in b)for(var e,f=d.split(" "),g=0;e=f[g];g++)c[e]=b[d];a.observe=c}},optimizePropertyMaps:function(a){if(a.observe){var b=a._observeNames=[];for(var c in a.observe)for(var d,e=c.split(" "),f=0;d=e[f];f++)b.push(d)}if(a.publish){var b=a._publishNames=[];for(var c in a.publish)b.push(c)}},publishProperties:function(a,b){var c=a.publish;c&&(this.requireProperties(c,a,b),a._publishLC=this.lowerCaseMap(c))},requireProperties:function(a,b,c){for(var d in a)void 0===b[d]&&void 0===c[d]&&(b[d]=a[d])},lowerCaseMap:function(a){var b={};for(var c in a)b[c.toLowerCase()]=c;return b}};a.api.declaration.properties=b}(Polymer),function(a){var b="attributes",c=/\s|,/,d={inheritAttributesObjects:function(a){this.inheritObject(a,"publishLC"),this.inheritObject(a,"_instanceAttributes")},publishAttributes:function(a,d){var e=this.getAttribute(b);if(e)for(var f,g=a.publish||(a.publish={}),h=e.split(c),i=0,j=h.length;j>i;i++)f=h[i].trim(),f&&void 0===g[f]&&void 0===d[f]&&(g[f]=null)},accumulateInstanceAttributes:function(){for(var a,b=this.prototype._instanceAttributes,c=this.attributes,d=0,e=c.length;e>d&&(a=c[d]);d++)this.isInstanceAttribute(a.name)&&(b[a.name]=a.value)},isInstanceAttribute:function(a){return!this.blackList[a]&&"on-"!==a.slice(0,3)},blackList:{name:1,"extends":1,constructor:1,noscript:1}};d.blackList[b]=1,a.api.declaration.attributes=d}(Polymer),function(a){function b(a){if(!Object.__proto__){var b=Object.getPrototypeOf(a);a.__proto__=b,d(b)&&(b.__proto__=Object.getPrototypeOf(b))}}var c=a.api,d=a.isBase,e=a.extend,f={register:function(a,b){this.prototype=this.buildPrototype(a,b),this.prototype.element=this,this.desugar(a,b),this.registerPrototype(a,b),this.publishConstructor()},buildPrototype:function(c,d){var e=a.getRegisteredPrototype(c),f=this.generateBasePrototype(d);return this.publishAttributes(e,f),this.publishProperties(e,f),this.inferObservers(e),this.explodeObservers(e),this.inheritMetaData(e,f),e=this.chainObject(e,f),this.optimizePropertyMaps(e),b(e),e},inheritMetaData:function(a,b){this.inheritObject("observe",a,b),this.inheritObject("publish",a,b),this.inheritObject("_publishLC",a,b),this.inheritObject("_instanceAttributes",a,b),this.inheritObject("eventDelegates",a,b)},desugar:function(a,b){this.installSheets(),this.resolveElementPaths(this),this.accumulateInstanceAttributes(),this.parseHostEvents(),this.adjustShadowElement(),this.addResolvePathApi(),window.ShadowDOMPolyfill&&Platform.ShadowCSS.shimStyling(this.templateContent(),a,b),this.prototype.registerCallback&&this.prototype.registerCallback(this)},adjustShadowElement:function(){if(!window.ShadowDOMPolyfill){var a=this.templateContent();if(a)for(var b,c=a.querySelectorAll("shadow"),d=0,e=c.length;e>d&&(b=c[d]);d++)b.children.length||b.appendChild(document.createElement("content"))}},publishConstructor:function(){var a=this.getAttribute("constructor");a&&(window[a]=this.ctor)},generateBasePrototype:function(a){var b=this.findBasePrototype(a);if(!b){var b=HTMLElement.getPrototypeForTag(a);b=this.ensureBaseApi(b),memoizedBases[a]=b}return b},findBasePrototype:function(a){return memoizedBases[a]},ensureBaseApi:function(a){if(a.PolymerBase)return a;var b=Object.create(a);for(var d in c.instance)e(b,c.instance[d]);return this.mixinMethod(b,a,c.instance.mdv,"bind"),b},mixinMethod:function(a,b,c,d){var e=function(a){return b[d].apply(this,a)};a[d]=function(){return this.mixinSuper=e,c[d].apply(this,arguments)}},inheritObject:function(a,b,c){var d=b[a]||{};b[a]=this.chainObject(d,c[a])},registerPrototype:function(a,b){var c={prototype:this.prototype},d=this.findTypeExtension(b);d&&(c.extends=d),this.ctor=document.registerElement(a,c),this.prototype.constructor=this.ctor,HTMLElement.register(a,this.prototype)},findTypeExtension:function(a){if(a&&a.indexOf("-")<0)return a;var b=this.findBasePrototype(a);return b.element?this.findTypeExtension(b.element.extends):void 0}};f.chainObject=Object.__proto__?function(a,b){return a&&b&&a!==b&&(a.__proto__=b),a}:function(a,b){if(a&&b&&a!==b){var c=Object.create(b);a=e(c,a)}return a},memoizedBases={},c.declaration.prototype=f}(Polymer),function(a){function b(a){return document.contains(a)?g:f}function c(){return f.length?f[0]:g[0]}function d(a){e.waitToFlush=!0,HTMLImports.whenImportsReady(function(){e.addReadyCallback(a),e.waitToFlush=!1,e.check()})}var e={wait:function(a){return-1===this.indexOf(a)&&-1===h.indexOf(a)&&this.add(a),0!==this.indexOf(a)},add:function(a){b(a).push(a)},indexOf:function(a){var c=b(a).indexOf(a);return c>=0&&document.contains(a)&&(c+=HTMLImports.useNative||HTMLImports.ready?f.length:1e9),c},register:function(a){var b=this.remove(a);b&&(h.push(b),this.check())},remove:function(a){var c=this.indexOf(a);if(0===c)return b(a).shift()},check:function(){var a=this.nextElement();return a&&a.registerWhenReady(),this.canFlush()?(this.flush(),!0):void 0},nextElement:function(){return c()},canFlush:function(){return!this.waitToFlush&&this.isEmpty()},isEmpty:function(){return!f.length&&!g.length},flush:function(){CustomElements.ready=!1;for(var a;h.length;)a=h.shift(),a._register();CustomElements.upgradeDocumentTree(document),CustomElements.ready=!0,this.flushReadyCallbacks()},flushReadyCallbacks:function(){if(i)for(var a;i.length;)(a=i.shift())()},addReadyCallback:function(a){i.push(a)},waitToFlush:!0},f=[],g=[],h=[],i=[];a.queue=e,a.whenPolymerReady=d}(Polymer),function(a){function b(a,b){j[a]=b||{},d(a)}function c(a){return j[a]}function d(a){k[a]&&(k[a].registerWhenReady(),delete k[a])}var e=a.extend,f=a.api.declaration,g=a.queue,h=a.whenPolymerReady,i=e(Object.create(HTMLElement.prototype),{createdCallback:function(){this.getAttribute("name")&&this.init()},init:function(){this.name=this.getAttribute("name"),this.extends=this.getAttribute("extends"),this.loadResources(),this.registerWhenReady()},registerWhenReady:function(){this.registered||this.waitingForPrototype(this.name)||this.waitingForQueue()||this.waitingForResources()||this.readyToRegister()},readyToRegister:function(){g.register(this)},_register:function(){this.register(this.name,this.extends),this.registered=!0},waitingForPrototype:function(a){if(!c(a)){if(k[a]=this,this.hasAttribute("noscript")&&!this.noscript)if(this.noscript=!0,window.CustomElements&&!CustomElements.useNative)b(a);else{var d=document.createElement("script");d.textContent="Polymer('"+a+"');",this.appendChild(d)}return!0}},waitingForResources:function(){return this._needsResources},waitingForQueue:function(){return g.wait(this)},loadResources:function(){this._needsResources=!0,this.loadStyles(function(){this._needsResources=!1,this.registerWhenReady()}.bind(this))}});Object.keys(f).forEach(function(a){e(i,f[a])});var j={},k={};a.getRegisteredPrototype=c,e(b,a),window.Polymer=b;var l=Platform.deliverDeclarations();if(l)for(var m,n=0,o=l.length;o>n&&(m=l[n]);n++)b.apply(null,m);h(function(){document.dispatchEvent(new CustomEvent("polymer-ready",{bubbles:!0}))}),document.registerElement("polymer-element",{prototype:i})}(Polymer);
//# sourceMappingURL=polymer.js.map;


module('utils-preorderiter', [], function() {

  'use strict';

  var PreOrderIter = function(startNode) {
    this.current_ = startNode;
  };

  PreOrderIter.prototype = {
    __proto__: Object.prototype,

    current: function() {
      return this.current_;
    },
    next: function() {
      return this.current_ = this.getNext_();
    },
    hasNext: function() {
      return this.getNext_() !== undefined;
    },
    prev: function() {
      return this.current_ = this.getPrev_();
    },
    hasPrev: function() {
      return this.getPrev_() !== undefined;
    },

    getNext_: function() {
      var ref = this.current_;
      var next = ref.firstChild;
      while (!next && ref) {
        next = ref.nextSibling;
        ref = ref.parentNode;
      }
      return next;
    },

    getPrev_: function() {
      var ref = this.current_;
      var prev = ref.previousSibling;
      while (prev && prev.lastChild) {
        prev = prev.lastChild;
      }
      if (!prev) {
        prev = ref.parentNode;
      }
      return prev;
    }
  };

  return PreOrderIter;
});

;


  module('utils-dom', ['utils-preorderiter'], function(PreOrderIter) {

    'use strict';

     return {
      // split text node in to two, or three nodes
      // all added to the existing parent
      // returns child node offset of the new text node
      splitText: function(textNode, offset, opt_length) {
        if (offset > 0 || opt_length) {
          var parentElement = textNode.parentNode;
          var sibling = textNode.nextSibling;
          var newFrag = document.createDocumentFragment();
          var newTn = textNode.splitText(offset)
          newFrag.appendChild(newTn);
          if (opt_length) {
            newFrag.appendChild(newTn.splitText(opt_length));
          }

          if (sibling) {
            parentElement.insertBefore(newFrag, sibling);
          } else {
            parentElement.appendChild(newFrag);
          }
        }
        return this.indexOf(newTn ? newTn : textNode);
      },

      // return index of element within it's parent
      indexOf: function(child) {
        var offset = 0;
        var prev = child.previousSibling;
        while (prev) {
          offset++;
          prev = prev.previousSibling;
        }
        return offset;
      },

      deleteEmptyTree: function(node) {
        while (this.isEmpty(node)) {
          var parent = node.parentNode;
          // TODO(jliebrand): should we do parent.supports('deleteNode') and
          // node.supports('deleteMe') ??
          parent.removeChild(node);
          node = parent;
        }
      },

      isLeaf: function(node) {
        return node.childNodes.length === 0;
      },

      /**
        * Determine whether a node's text content is entirely whitespace.
        * Where whitespace is defined as one of the characters
        *  "\t" TAB \u0009
        *  "\n" LF  \u000A
        *  "\r" CR  \u000D
        *  " "  SPC \u0020
        *
        * This does not use Javascript's "\s" because that includes non-breaking
        * spaces (and also some other characters).
        *
        */
      isAllWhiteSpace: function(node) {
        return !(/[^\t\n\r ]/.test(node.textContent));
      },

      isIgnorable: function(node) {
        return ( node.nodeType == Node.COMMENT_NODE) ||
                ( (node.nodeType == Node.TEXT_NODE) && this.isAllWhiteSpace(node) );
      },

      isEmpty: function(node) {
        var empty = true;
        for (var i = node.childNodes.length - 1; i >= 0; i--) {
          if (!this.isIgnorable(node.childNodes[i])) {
            empty = false;
            break;
          }
        }
        return empty;
      },

      /**
        * @return {HTML Element} the previous node in reverse document order, eg:
        *
        *                     A
        *                    / \
        *                   /   \
        *                  B     C
        *                 /\     /\
        *                D  E   F  G
        *                      /
        *                     H
        *
        *  previousLeaf(C) === E
        *  previousLeaf(G) === H
        *  previousLeaf(F) === E
        *  previousLeaf(E) === D
        */
      previousLeaf: function(srcNode) {
        // get previous "non-white-space-only" leaf
        var leaf;
        var iter = new PreOrderIter(srcNode);
        while((leaf = iter.prev())) {
          if (this.isLeaf(leaf) && !this.isIgnorable(leaf)) {
            break;
          }
        }
        return leaf;
      },

      // opposite of previousLeaf
      nextLeaf: function(srcNode) {
        // get previous "non-white-space-only" leaf
        var leaf;
        var iter = new PreOrderIter(srcNode);
        while((leaf = iter.next())) {
          if (this.isLeaf(leaf) && !this.isIgnorable(leaf)) {
            break;
          }
        }
        return leaf;
      }
    };

  });

;


module('utils-domposition', ['utils-dom'], function(DomUtils) {

  'use strict';

  var DomPosition = function(container, offset) {
    this.container = container;
    this.offset = offset;
  }

  DomPosition.prototype = {
    __proto__: Object.prototype,

    insideTextNode: function() {
      return this.container.nodeType === Node.TEXT_NODE;
    },

    /**
     * return true if the position is on a node boundary.
     * Either the caret is in between ELEMENTs or it is at
     * the start/end of a TEXT_NODE
     *
     * @param {string} opt_side optionally check one side, either "left/right"
     *                          or for conveniance sake "backward/forward"
     */
    onNodeBoundary: function(opt_side) {
      if (this.container.nodeType !== Node.TEXT_NODE) {
        return true;
      }

      switch(opt_side) {
        case 'backward':
        case 'left':
          return this.offset === 0;
        break;

        case 'forward':
        case 'right':
          return this.offset === this.container.textContent.length;
        break;

        case 'both':
        default:
          return (this.offset === 0 ||
              this.offset === this.container.textContent.length);

        break;
      }
    },

    leftLeaf: function() {
      if (this.insideTextNode() && !this.onNodeBoundary()) {
        throw new Error("DomPosition inside TEXT_NODE; 'leaf' not applicable");
      }
      // "lift" the dom position if we are inside the text node
      // (which should only be the case if we are on the edge of a textnode)
      var container = this.container;
      var offset = this.offset;
      if (this.insideTextNode()) {
        if (this.onNodeBoundary('left')) {
          offset = DomUtils.indexOf(container);
          container = container.parentNode;
        } else if (this.onNodeBoundary('right')) {
          offset = DomUtils.indexOf(container) + 1;
          container = container.parentNode;
        }
      }

      if (container.childNodes.length === 0) {
        // inside an empty element
        return DomUtils.previousLeaf(container);
      }
      if (offset > 0 && offset === container.length) {
        // at the end of our own children, the last one is thus the leftLeaf
        return container.childNodes[offset-1];
      } else {
        // else walk the tree for left leaf
        var rightLeaf = container.childNodes[offset];
        return DomUtils.previousLeaf(rightLeaf);
      }
    },

    rightLeaf: function() {
      if (this.insideTextNode() && !this.onNodeBoundary()) {
        throw new Error("DomPosition inside TEXT_NODE; 'leaf' not applicable");
      }
      // "lift" the dom position if we are inside the text node
      // (which should only be the case if we are on the edge of a textnode)
      var container = this.container;
      var offset = this.offset;
      if (this.insideTextNode()) {
        if (this.onNodeBoundary('left')) {
          offset = DomUtils.indexOf(container);
          container = container.parentNode;
        } else if (this.onNodeBoundary('right')) {
          offset = DomUtils.indexOf(container) + 1;
          container = container.parentNode;
        }
      }

      if (container.childNodes.length === 0) {
        // inside an empty element
        return DomUtils.nextLeaf(container);
      }
      var rightLeaf = container.childNodes[offset];
      if (rightLeaf) {
        return rightLeaf;
      } else {
        var leftLeaf = container.childNodes[offset-1];
        return DomUtils.nextLeaf(leftLeaf);
      }
    }
  };

  return DomPosition;
});

;


/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * @fileoverview simple layman version of nodejs event emitter
 *
 * NOTE: this is really crude; no unsubscribe or "once" functions or
 * anything... just enough to do the POC
 *
 * @author jelte@google.com (Jelte Liebrand)
 */

module('events-emitter', [], function() {

  'use strict';

  var Emitter = function() {
    this.registry_ = {};
  };

  Emitter.prototype = {
    on: function(eventName, callback) {
      this.registry_[eventName] = this.registry_[eventName] || [];
      this.registry_[eventName].push(callback);
    },

    emit: function(eventName, data) {
      var callbacks = this.registry_[eventName];
      if (callbacks) {
        callbacks.forEach(function(callback) {
          callback.call(this, data);
        })
      }
    }
  };

  return Emitter;

});

;


/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * @fileoverview
 *
 * layman's Input to differentiate between insert/delete character
 * and split/merge tree nodes (aka splitting a paragraph when hitting a
 * carriage return)
 *
 * @author jelte@google.com (Jelte Liebrand)
 */

 module('mock-input', null, function() {

  'use strict';

  var Input = function(emitter) {

    // TODO(jliebrand): should probably set the listener
    // on the <polymer-editor> ? not the document.body??
    document.body.addEventListener('keypress', function(evt) {
      // block all normal behaviour from happening...
      evt.preventDefault();
      var letter = String.fromCharCode(evt.charCode);
      emitter.emit('insertText', {text: letter});
    });


    // TODO(jliebrand): should probably set the listener
    // on the <polymer-editor> ? not the document.body??
    document.body.addEventListener('keydown', function(evt) {
      switch (evt.keyCode) {
        case 8:
          evt.preventDefault();
          var context = {};
          context.direction = evt.shiftKey ? 'forward' : 'backward';

          // TODO(jliebrand): this behaviour should be definable
          // by the app... but how??
          // hack, this locale specific word boundary should
          // be handled elsewhere; although app should be able
          // to specify; think sublime ctrl-delete camelCase
          context.amount = evt.metaKey ? 'word' : 'character';
          emitter.emit('delete', context);

          break;
        case 13:
          evt.preventDefault();
          emitter.emit('splitTree');
          break;

        default:
          break;
      }
    });
  };

  return Input;

});

;


/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * @fileoverview laymans selection module.
 *
 * @author jelte@google.com (Jelte Liebrand)
 */

module('mock-selection', ['utils-domposition'], function(DomPosition) {

  'use strict';

  var Selection = {

    startDomPosition: function() {
      var sel = window.getSelection();
      if (sel.rangeCount > 0) {
        var range = sel.getRangeAt(0);
        return new DomPosition(range.startContainer, range.startOffset);
      }
    },

    setStartDomPosition: function(domPosition) {
      var range = document.createRange();
      range.setStart(domPosition.container, domPosition.offset);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    },

    walkUp: function(callback) {
      var sel = window.getSelection();
      var range;
      if (sel.rangeCount > 0) {
        range = sel.getRangeAt(0);
      }
      var container = range ? range.startContainer : undefined;
      while (container) {
        var ret = callback.call(this, container);
        if (ret) {
          return ret;
        }
        container = container.parentNode;
      }
    },


    findSupportingNode: function(funcName) {
      return this.walkUp(function(node) {
        if (node && node[funcName] !== undefined) {
          return node;
        }
      });
    }

  };

  return Selection;
});

;
(function() {

  // TODO(sjmiles): Declare module names to manifest these symbols; the actual
  // references are supplied (injected?) asynchronously

  var PreOrderIter, DomUtils, DomPosition, Emitter, Input, Selection;

  Polymer('polymer-editor', {
    registerCallback: function() {

      // TODO(sjmiles): at registerCallback time, we are assured our
      // modules are available. Can we DRY this without storing
      // the modules on an object?

      PreOrderIter = marshal('utils-preorderiter');
      DomUtils = marshal('utils-dom');
      DomPosition = marshal('utils-domposition');
      Emitter = marshal('events-emitter');
      Input = marshal('mock-input');
      Selection = marshal('mock-selection');
    },

    ready: function() {
      this.emitter_ = new Emitter();
      this.input_ = new Input(this.emitter_);


      /**
       * Handle 'insertText' edit intent
       * Algorithm:
       *   1- if inside text node: split
       *   2- create new TEXT_NODE for new text
       *   3- if DomPosition.container supports insertNode(textNode):
       *      - container.insertNode(newTextNode)
       *      - (and move caret)
       *
       * @param {object} context contains contextual information:
       * @param {string} context.text the new text to insert
       */
      this.emitter_.on('insertText', function(context) {

        // add new text node to our context
        context.node = document.createTextNode(context.text);

        var dp = Selection.startDomPosition();
        if (dp) {
          if (dp.insideTextNode()) {

            // TODO(sjmiles): to use the DomUtils private symbol (et al) we
            // have to define it in the outer closure, otherwise it would have
            // to hang off an object, like `modules.DomUtils`, which has poor
            // ergonomics

            var tnOffset = DomUtils.splitText(dp.container, dp.offset);
            dp = new DomPosition(dp.container.parentNode, tnOffset);
            Selection.setStartDomPosition(dp);
          }

          if (dp.container) {

            // add the DomPosition to the context, so we can pass it to
            // the various Elements
            context.dp = dp;

            // TODO(jliebrand): wrap this supports stuff up in a
            // FuncUtils.guardCall or something...
            if (context.dp.container.supports &&
              context.dp.container.supports('insertNode', context)) {

              context.dp.container.insertNode(context);

              // hack to move the selection - this should be handled
              // differently so this core edit can remain oblivious
              // to selection movement!
              tnOffset++;
              var caret = new DomPosition(dp.container.childNodes[tnOffset], 0);
              Selection.setStartDomPosition(caret);
            }
            context.dp.container.normalize();
          }

        }

      });


      /**
       * Handle 'delete' edit intent
       * Algorithm:
       *   1- if inside text node:
       *      - split and delete
       *   2- else
       *      - get right/left leaf; and walk from one to the other
       *      - if merge required:
       *        - if (leftLeaf.supports('merge', rightLeaf))
       *          - merge
       *        - else ignore
       *      - else
       *        - if (leftLeaf.isTextNode)
       *          - split and delete
       *        - else
       *          if (leftLeaf.supports('deleteMe') &&
       *              leftParent.supports('deleteChild'))
       *            - leftParent.deleteChild(leftLeaf)
       *
       *
       * @param {object} context contains contextual information:
       * @param {string} context.direction which way to delete
       * @param {string} context.granularity indicates how far to delete, which
       *                                     is ONLY used when inside text node
       *                                     eg: 'char', 'word', 'boundary'
       * @param {string} context.boundaryRegEx optional item containing a
       *                                       regex to define what boundary
       *                                       to look for (eg '\w', or '[^$]')
       *                                       (think sublime use case!)
       */
      this.emitter_.on('delete', function(context) {
        // TODO(jliebrand): Break this mamoth function up in smaller bits!

        // TODO(jliebrand): need to support direction better; too much
        // harcoded 'left' stuff!

        // TODO(jliebrand): fix this to use context.boundaryRegEx
        var WORDLENGTH = 4;
        var length = context.direction === 'forward' ? 0 :
          context.granularity === 'word' ? WORDLENGTH : 1;

        var dp = Selection.startDomPosition();

        if (dp) {
          // normalize any stray text nodes if we got them...
          dp.container.normalize();

          // step 1 - if *inside* text node; then delete text
          if (dp.insideTextNode() && !dp.onNodeBoundary(context.direction)) {
            var parent = dp.container.parentNode;
            if (parent.supports && parent.supports('deleteNode')) {
              deleteTextInNode_(dp.container, dp.offset-length, length);
            }
          } else {
            // step 2 - get left/right leaf and determine if we need to merge
            var merge = false;
            var left = dp.leftLeaf();
            var right = dp.rightLeaf();
            var iter = new PreOrderIter(right);
            while (iter.prev() !== left) {
              if (iter.current().supports &&
                  iter.current().supports('mergeOnCrossingBoundary')) {
                if (iter.current().mergeOnCrossingBoundary()) {
                  merge = true;
                  break;
                }
              }
            }
            if (merge) {
              // been told to merge the nodes due to crossing boundary; merge
              // the nodes and then delete empty tree branches
              var dp = {};
              if (left.nodeType === Node.TEXT_NODE) {
                dp.offset = DomUtils.indexOf(left) + 1;
                left = left.parentNode;
                dp.container = left;
              }
              if (left.supports && left.supports('mergeNode', {node: right})) {
                var rightParent = right.parentNode;
                left.mergeNode({
                  node: right,
                  dp: dp
                });
                DomUtils.deleteEmptyTree(rightParent);
              }
            } else {
              if (left.nodeType === Node.TEXT_NODE) {
                // left leaf is text; delete text inside of it
                deleteTextInNode_(left, left.textContent.length-length, length);
              } else {
                // left leaf is element, delete it (if parent supports it)
                var leftParent = left.parentNode;
                var offset = DomUtils.indexOf(left)
                if (left.supports && leftParent.supports &&
                    left.supports('deleteMe') &&
                    leftParent.supports('deleteNode', offset)) {
                  leftParent.deleteNode(offset);
                }
              }
            }
          }
        }

      });

    }

  });

  function deleteTextInNode_(tn, offset, length) {
    var parent = tn.parentNode;
    if (tn.nodeType === Node.TEXT_NODE) {
      var tnOffset = DomUtils.splitText(tn, offset, length);
      var context = {
        dp: {
          container: parent,
          offset: tnOffset
        }
      };

      Selection.setStartDomPosition(context.dp);
    }
    if (parent.supports &&
        parent.supports('deleteNode', context)) {
      parent.deleteNode(context);
    }
    parent.normalize();
  }
})();


;
(function() {

  Polymer('polymer-editor-content', {

    ready: function() {},

    enteredView: function() {},

    supports: function(editIntent, context) {
      switch (editIntent) {
        case 'insertNode':
        case 'deleteNode':
          return true;
          break;
        default:
          return false;
          break;
      }
    },

    insertNode: function(context) {
      if (context.dp) {
        if (this === context.dp.container) {
          // insert the node
          var sibling = this.childNodes[context.dp.offset];
          if (sibling) {
            this.insertBefore(context.node, sibling);
          } else {
            this.appendChild(context.node);
          }
          return true;
        }
      }
    },

    deleteNode: function(context) {
      if (context.dp) {
        if (this === context.dp.container) {
          // delete the node
          this.removeChild(this.childNodes[context.dp.offset]);
          return true;
        }
      }
    }

  });

  // ------------------------------------------------------

})();;
/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

// if standalone
if (window.top === window) {
  // if standalone
  var failed = false;
  window.done = function() {
    window.onerror = null;
    if (!failed) {
      var d = document.createElement('pre');
      d.style.cssText = 'padding: 6px; background-color: lightgreen;';
      d.textContent = 'Passed';
      document.body.appendChild(d);
    }
  };
  window.onerror = function(x) {
    failed = true;
    var d = document.createElement('pre');
    d.style.cssText = 'padding: 6px; background-color: #FFE0E0;';
    d.textContent = 'FAILED: ' + x;
    document.body.appendChild(d);
  };
} else
// if part of a test suite
{
  window.done = function() {
    window.onerror = null;
    parent.postMessage('ok', '*');
  };
  
  window.onerror = function(x) {
    parent.postMessage({error: x}, '*');
  };
}

;
;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("chaijs-assertion-error/index.js", function(exports, require, module){
/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */

function exclude () {
  var excludes = [].slice.call(arguments);

  function excludeProps (res, obj) {
    Object.keys(obj).forEach(function (key) {
      if (!~excludes.indexOf(key)) res[key] = obj[key];
    });
  }

  return function extendExclude () {
    var args = [].slice.call(arguments)
      , i = 0
      , res = {};

    for (; i < args.length; i++) {
      excludeProps(res, args[i]);
    }

    return res;
  };
};

/*!
 * Primary Exports
 */

module.exports = AssertionError;

/**
 * ### AssertionError
 *
 * An extension of the JavaScript `Error` constructor for
 * assertion and validation scenarios.
 *
 * @param {String} message
 * @param {Object} properties to include (optional)
 * @param {callee} start stack function (optional)
 */

function AssertionError (message, _props, ssf) {
  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
    , props = extend(_props || {});

  // default values
  this.message = message || 'Unspecified AssertionError';
  this.showDiff = false;

  // copy from properties
  for (var key in props) {
    this[key] = props[key];
  }

  // capture stack trace
  ssf = ssf || arguments.callee;
  if (ssf && Error.captureStackTrace) {
    Error.captureStackTrace(this, ssf);
  }
}

/*!
 * Inherit from Error.prototype
 */

AssertionError.prototype = Object.create(Error.prototype);

/*!
 * Statically set name
 */

AssertionError.prototype.name = 'AssertionError';

/*!
 * Ensure correct constructor
 */

AssertionError.prototype.constructor = AssertionError;

/**
 * Allow errors to be converted to JSON for static transfer.
 *
 * @param {Boolean} include stack (default: `true`)
 * @return {Object} object that can be `JSON.stringify`
 */

AssertionError.prototype.toJSON = function (stack) {
  var extend = exclude('constructor', 'toJSON', 'stack')
    , props = extend({ name: this.name }, this);

  // include stack if exists and not turned off
  if (false !== stack && this.stack) {
    props.stack = this.stack;
  }

  return props;
};

});
require.register("chaijs-type-detect/lib/type.js", function(exports, require, module){
/*!
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Primary Exports
 */

var exports = module.exports = getType;

/*!
 * Detectable javascript natives
 */

var natives = {
    '[object Array]': 'array'
  , '[object RegExp]': 'regexp'
  , '[object Function]': 'function'
  , '[object Arguments]': 'arguments'
  , '[object Date]': 'date'
};

/**
 * ### typeOf (obj)
 *
 * Use several different techniques to determine
 * the type of object being tested.
 *
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */

function getType (obj) {
  var str = Object.prototype.toString.call(obj);
  if (natives[str]) return natives[str];
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (obj === Object(obj)) return 'object';
  return typeof obj;
}

exports.Library = Library;

/**
 * ### Library
 *
 * Create a repository for custom type detection.
 *
 * ```js
 * var lib = new type.Library;
 * ```
 *
 */

function Library () {
  this.tests = {};
}

/**
 * #### .of (obj)
 *
 * Expose replacement `typeof` detection to the library.
 *
 * ```js
 * if ('string' === lib.of('hello world')) {
 *   // ...
 * }
 * ```
 *
 * @param {Mixed} object to test
 * @return {String} type
 */

Library.prototype.of = getType;

/**
 * #### .define (type, test)
 *
 * Add a test to for the `.test()` assertion.
 *
 * Can be defined as a regular expression:
 *
 * ```js
 * lib.define('int', /^[0-9]+$/);
 * ```
 *
 * ... or as a function:
 *
 * ```js
 * lib.define('bln', function (obj) {
 *   if ('boolean' === lib.of(obj)) return true;
 *   var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];
 *   if ('string' === lib.of(obj)) obj = obj.toLowerCase();
 *   return !! ~blns.indexOf(obj);
 * });
 * ```
 *
 * @param {String} type
 * @param {RegExp|Function} test
 * @api public
 */

Library.prototype.define = function (type, test) {
  if (arguments.length === 1) return this.tests[type];
  this.tests[type] = test;
  return this;
};

/**
 * #### .test (obj, test)
 *
 * Assert that an object is of type. Will first
 * check natives, and if that does not pass it will
 * use the user defined custom tests.
 *
 * ```js
 * assert(lib.test('1', 'int'));
 * assert(lib.test('yes', 'bln'));
 * ```
 *
 * @param {Mixed} object
 * @param {String} type
 * @return {Boolean} result
 * @api public
 */

Library.prototype.test = function (obj, type) {
  if (type === getType(obj)) return true;
  var test = this.tests[type];

  if (test && 'regexp' === getType(test)) {
    return test.test(obj);
  } else if (test && 'function' === getType(test)) {
    return test(obj);
  } else {
    throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
  }
};

});
require.register("chaijs-deep-eql/lib/eql.js", function(exports, require, module){
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var type = require('type-detect');

/*!
 * Buffer.isBuffer browser shim
 */

var Buffer;
try { Buffer = require('buffer').Buffer; }
catch(ex) {
  Buffer = {};
  Buffer.isBuffer = function() { return false; }
}

/*!
 * Primary Export
 */

module.exports = deepEqual;

/**
 * Assert super-strict (egal) equality between
 * two objects of any type.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @param {Array} memoised (optional)
 * @return {Boolean} equal match
 */

function deepEqual(a, b, m) {
  if (sameValue(a, b)) {
    return true;
  } else if ('date' === type(a)) {
    return dateEqual(a, b);
  } else if ('regexp' === type(a)) {
    return regexpEqual(a, b);
  } else if (Buffer.isBuffer(a)) {
    return bufferEqual(a, b);
  } else if ('arguments' === type(a)) {
    return argumentsEqual(a, b, m);
  } else if (!typeEqual(a, b)) {
    return false;
  } else if (('object' !== type(a) && 'object' !== type(b))
  && ('array' !== type(a) && 'array' !== type(b))) {
    return sameValue(a, b);
  } else {
    return objectEqual(a, b, m);
  }
}

/*!
 * Strict (egal) equality test. Ensures that NaN always
 * equals NaN and `-0` does not equal `+0`.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} equal match
 */

function sameValue(a, b) {
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  return a !== a && b !== b;
}

/*!
 * Compare the types of two given objects and
 * return if they are equal. Note that an Array
 * has a type of `array` (not `object`) and arguments
 * have a type of `arguments` (not `array`/`object`).
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} result
 */

function typeEqual(a, b) {
  return type(a) === type(b);
}

/*!
 * Compare two Date objects by asserting that
 * the time values are equal using `saveValue`.
 *
 * @param {Date} a
 * @param {Date} b
 * @return {Boolean} result
 */

function dateEqual(a, b) {
  if ('date' !== type(b)) return false;
  return sameValue(a.getTime(), b.getTime());
}

/*!
 * Compare two regular expressions by converting them
 * to string and checking for `sameValue`.
 *
 * @param {RegExp} a
 * @param {RegExp} b
 * @return {Boolean} result
 */

function regexpEqual(a, b) {
  if ('regexp' !== type(b)) return false;
  return sameValue(a.toString(), b.toString());
}

/*!
 * Assert deep equality of two `arguments` objects.
 * Unfortunately, these must be sliced to arrays
 * prior to test to ensure no bad behavior.
 *
 * @param {Arguments} a
 * @param {Arguments} b
 * @param {Array} memoize (optional)
 * @return {Boolean} result
 */

function argumentsEqual(a, b, m) {
  if ('arguments' !== type(b)) return false;
  a = [].slice.call(a);
  b = [].slice.call(b);
  return deepEqual(a, b, m);
}

/*!
 * Get enumerable properties of a given object.
 *
 * @param {Object} a
 * @return {Array} property names
 */

function enumerable(a) {
  var res = [];
  for (var key in a) res.push(key);
  return res;
}

/*!
 * Simple equality for flat iterable objects
 * such as Arrays or Node.js buffers.
 *
 * @param {Iterable} a
 * @param {Iterable} b
 * @return {Boolean} result
 */

function iterableEqual(a, b) {
  if (a.length !==  b.length) return false;

  var i = 0;
  var match = true;

  for (; i < a.length; i++) {
    if (a[i] !== b[i]) {
      match = false;
      break;
    }
  }

  return match;
}

/*!
 * Extension to `iterableEqual` specifically
 * for Node.js Buffers.
 *
 * @param {Buffer} a
 * @param {Mixed} b
 * @return {Boolean} result
 */

function bufferEqual(a, b) {
  if (!Buffer.isBuffer(b)) return false;
  return iterableEqual(a, b);
}

/*!
 * Block for `objectEqual` ensuring non-existing
 * values don't get in.
 *
 * @param {Mixed} object
 * @return {Boolean} result
 */

function isValue(a) {
  return a !== null && a !== undefined;
}

/*!
 * Recursively check the equality of two objects.
 * Once basic sameness has been established it will
 * defer to `deepEqual` for each enumerable key
 * in the object.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} result
 */

function objectEqual(a, b, m) {
  if (!isValue(a) || !isValue(b)) {
    return false;
  }

  if (a.prototype !== b.prototype) {
    return false;
  }

  var i;
  if (m) {
    for (i = 0; i < m.length; i++) {
      if ((m[i][0] === a && m[i][1] === b)
      ||  (m[i][0] === b && m[i][1] === a)) {
        return true;
      }
    }
  } else {
    m = [];
  }

  try {
    var ka = enumerable(a);
    var kb = enumerable(b);
  } catch (ex) {
    return false;
  }

  ka.sort();
  kb.sort();

  if (!iterableEqual(ka, kb)) {
    return false;
  }

  m.push([ a, b ]);

  var key;
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], m)) {
      return false;
    }
  }

  return true;
}

});
require.register("chai/index.js", function(exports, require, module){
module.exports = require('./lib/chai');

});
require.register("chai/lib/chai.js", function(exports, require, module){
/*!
 * chai
 * Copyright(c) 2011-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var used = []
  , exports = module.exports = {};

/*!
 * Chai version
 */

exports.version = '1.8.1';

/*!
 * Assertion Error
 */

exports.AssertionError = require('assertion-error');

/*!
 * Utils for plugins (not exported)
 */

var util = require('./chai/utils');

/**
 * # .use(function)
 *
 * Provides a way to extend the internals of Chai
 *
 * @param {Function}
 * @returns {this} for chaining
 * @api public
 */

exports.use = function (fn) {
  if (!~used.indexOf(fn)) {
    fn(this, util);
    used.push(fn);
  }

  return this;
};

/*!
 * Primary `Assertion` prototype
 */

var assertion = require('./chai/assertion');
exports.use(assertion);

/*!
 * Core Assertions
 */

var core = require('./chai/core/assertions');
exports.use(core);

/*!
 * Expect interface
 */

var expect = require('./chai/interface/expect');
exports.use(expect);

/*!
 * Should interface
 */

var should = require('./chai/interface/should');
exports.use(should);

/*!
 * Assert interface
 */

var assert = require('./chai/interface/assert');
exports.use(assert);

});
require.register("chai/lib/chai/assertion.js", function(exports, require, module){
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (_chai, util) {
  /*!
   * Module dependencies.
   */

  var AssertionError = _chai.AssertionError
    , flag = util.flag;

  /*!
   * Module export.
   */

  _chai.Assertion = Assertion;

  /*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * @api private
   */

  function Assertion (obj, msg, stack) {
    flag(this, 'ssfi', stack || arguments.callee);
    flag(this, 'object', obj);
    flag(this, 'message', msg);
  }

  /*!
    * ### Assertion.includeStack
    *
    * User configurable property, influences whether stack trace
    * is included in Assertion error message. Default of false
    * suppresses stack trace in the error message
    *
    *     Assertion.includeStack = true;  // enable stack on error
    *
    * @api public
    */

  Assertion.includeStack = false;

  /*!
   * ### Assertion.showDiff
   *
   * User configurable property, influences whether or not
   * the `showDiff` flag should be included in the thrown
   * AssertionErrors. `false` will always be `false`; `true`
   * will be true when the assertion has requested a diff
   * be shown.
   *
   * @api public
   */

  Assertion.showDiff = true;

  Assertion.addProperty = function (name, fn) {
    util.addProperty(this.prototype, name, fn);
  };

  Assertion.addMethod = function (name, fn) {
    util.addMethod(this.prototype, name, fn);
  };

  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  Assertion.overwriteProperty = function (name, fn) {
    util.overwriteProperty(this.prototype, name, fn);
  };

  Assertion.overwriteMethod = function (name, fn) {
    util.overwriteMethod(this.prototype, name, fn);
  };

  /*!
   * ### .assert(expression, message, negateMessage, expected, actual)
   *
   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
   *
   * @name assert
   * @param {Philosophical} expression to be tested
   * @param {String} message to display if fails
   * @param {String} negatedMessage to display if negated expression fails
   * @param {Mixed} expected value (remember to check for negation)
   * @param {Mixed} actual (optional) will default to `this.obj`
   * @api private
   */

  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
    var ok = util.test(this, arguments);
    if (true !== showDiff) showDiff = false;
    if (true !== Assertion.showDiff) showDiff = false;

    if (!ok) {
      var msg = util.getMessage(this, arguments)
        , actual = util.getActual(this, arguments);
      throw new AssertionError(msg, {
          actual: actual
        , expected: expected
        , showDiff: showDiff
      }, (Assertion.includeStack) ? this.assert : flag(this, 'ssfi'));
    }
  };

  /*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */

  Object.defineProperty(Assertion.prototype, '_obj',
    { get: function () {
        return flag(this, 'object');
      }
    , set: function (val) {
        flag(this, 'object', val);
      }
  });
};

});
require.register("chai/lib/chai/core/assertions.js", function(exports, require, module){
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, _) {
  var Assertion = chai.Assertion
    , toString = Object.prototype.toString
    , flag = _.flag;

  /**
   * ### Language Chains
   *
   * The following are provide as chainable getters to
   * improve the readability of your assertions. They
   * do not provide an testing capability unless they
   * have been overwritten by a plugin.
   *
   * **Chains**
   *
   * - to
   * - be
   * - been
   * - is
   * - that
   * - and
   * - have
   * - with
   * - at
   * - of
   * - same
   *
   * @name language chains
   * @api public
   */

  [ 'to', 'be', 'been'
  , 'is', 'and', 'have'
  , 'with', 'that', 'at'
  , 'of', 'same' ].forEach(function (chain) {
    Assertion.addProperty(chain, function () {
      return this;
    });
  });

  /**
   * ### .not
   *
   * Negates any of assertions following in the chain.
   *
   *     expect(foo).to.not.equal('bar');
   *     expect(goodFn).to.not.throw(Error);
   *     expect({ foo: 'baz' }).to.have.property('foo')
   *       .and.not.equal('bar');
   *
   * @name not
   * @api public
   */

  Assertion.addProperty('not', function () {
    flag(this, 'negate', true);
  });

  /**
   * ### .deep
   *
   * Sets the `deep` flag, later used by the `equal` and
   * `property` assertions.
   *
   *     expect(foo).to.deep.equal({ bar: 'baz' });
   *     expect({ foo: { bar: { baz: 'quux' } } })
   *       .to.have.deep.property('foo.bar.baz', 'quux');
   *
   * @name deep
   * @api public
   */

  Assertion.addProperty('deep', function () {
    flag(this, 'deep', true);
  });

  /**
   * ### .a(type)
   *
   * The `a` and `an` assertions are aliases that can be
   * used either as language chains or to assert a value's
   * type.
   *
   *     // typeof
   *     expect('test').to.be.a('string');
   *     expect({ foo: 'bar' }).to.be.an('object');
   *     expect(null).to.be.a('null');
   *     expect(undefined).to.be.an('undefined');
   *
   *     // language chain
   *     expect(foo).to.be.an.instanceof(Foo);
   *
   * @name a
   * @alias an
   * @param {String} type
   * @param {String} message _optional_
   * @api public
   */

  function an (type, msg) {
    if (msg) flag(this, 'message', msg);
    type = type.toLowerCase();
    var obj = flag(this, 'object')
      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';

    this.assert(
        type === _.type(obj)
      , 'expected #{this} to be ' + article + type
      , 'expected #{this} not to be ' + article + type
    );
  }

  Assertion.addChainableMethod('an', an);
  Assertion.addChainableMethod('a', an);

  /**
   * ### .include(value)
   *
   * The `include` and `contain` assertions can be used as either property
   * based language chains or as methods to assert the inclusion of an object
   * in an array or a substring in a string. When used as language chains,
   * they toggle the `contain` flag for the `keys` assertion.
   *
   *     expect([1,2,3]).to.include(2);
   *     expect('foobar').to.contain('foo');
   *     expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');
   *
   * @name include
   * @alias contain
   * @param {Object|String|Number} obj
   * @param {String} message _optional_
   * @api public
   */

  function includeChainingBehavior () {
    flag(this, 'contains', true);
  }

  function include (val, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
    this.assert(
        ~obj.indexOf(val)
      , 'expected #{this} to include ' + _.inspect(val)
      , 'expected #{this} to not include ' + _.inspect(val));
  }

  Assertion.addChainableMethod('include', include, includeChainingBehavior);
  Assertion.addChainableMethod('contain', include, includeChainingBehavior);

  /**
   * ### .ok
   *
   * Asserts that the target is truthy.
   *
   *     expect('everthing').to.be.ok;
   *     expect(1).to.be.ok;
   *     expect(false).to.not.be.ok;
   *     expect(undefined).to.not.be.ok;
   *     expect(null).to.not.be.ok;
   *
   * @name ok
   * @api public
   */

  Assertion.addProperty('ok', function () {
    this.assert(
        flag(this, 'object')
      , 'expected #{this} to be truthy'
      , 'expected #{this} to be falsy');
  });

  /**
   * ### .true
   *
   * Asserts that the target is `true`.
   *
   *     expect(true).to.be.true;
   *     expect(1).to.not.be.true;
   *
   * @name true
   * @api public
   */

  Assertion.addProperty('true', function () {
    this.assert(
        true === flag(this, 'object')
      , 'expected #{this} to be true'
      , 'expected #{this} to be false'
      , this.negate ? false : true
    );
  });

  /**
   * ### .false
   *
   * Asserts that the target is `false`.
   *
   *     expect(false).to.be.false;
   *     expect(0).to.not.be.false;
   *
   * @name false
   * @api public
   */

  Assertion.addProperty('false', function () {
    this.assert(
        false === flag(this, 'object')
      , 'expected #{this} to be false'
      , 'expected #{this} to be true'
      , this.negate ? true : false
    );
  });

  /**
   * ### .null
   *
   * Asserts that the target is `null`.
   *
   *     expect(null).to.be.null;
   *     expect(undefined).not.to.be.null;
   *
   * @name null
   * @api public
   */

  Assertion.addProperty('null', function () {
    this.assert(
        null === flag(this, 'object')
      , 'expected #{this} to be null'
      , 'expected #{this} not to be null'
    );
  });

  /**
   * ### .undefined
   *
   * Asserts that the target is `undefined`.
   *
   *     expect(undefined).to.be.undefined;
   *     expect(null).to.not.be.undefined;
   *
   * @name undefined
   * @api public
   */

  Assertion.addProperty('undefined', function () {
    this.assert(
        undefined === flag(this, 'object')
      , 'expected #{this} to be undefined'
      , 'expected #{this} not to be undefined'
    );
  });

  /**
   * ### .exist
   *
   * Asserts that the target is neither `null` nor `undefined`.
   *
   *     var foo = 'hi'
   *       , bar = null
   *       , baz;
   *
   *     expect(foo).to.exist;
   *     expect(bar).to.not.exist;
   *     expect(baz).to.not.exist;
   *
   * @name exist
   * @api public
   */

  Assertion.addProperty('exist', function () {
    this.assert(
        null != flag(this, 'object')
      , 'expected #{this} to exist'
      , 'expected #{this} to not exist'
    );
  });


  /**
   * ### .empty
   *
   * Asserts that the target's length is `0`. For arrays, it checks
   * the `length` property. For objects, it gets the count of
   * enumerable keys.
   *
   *     expect([]).to.be.empty;
   *     expect('').to.be.empty;
   *     expect({}).to.be.empty;
   *
   * @name empty
   * @api public
   */

  Assertion.addProperty('empty', function () {
    var obj = flag(this, 'object')
      , expected = obj;

    if (Array.isArray(obj) || 'string' === typeof object) {
      expected = obj.length;
    } else if (typeof obj === 'object') {
      expected = Object.keys(obj).length;
    }

    this.assert(
        !expected
      , 'expected #{this} to be empty'
      , 'expected #{this} not to be empty'
    );
  });

  /**
   * ### .arguments
   *
   * Asserts that the target is an arguments object.
   *
   *     function test () {
   *       expect(arguments).to.be.arguments;
   *     }
   *
   * @name arguments
   * @alias Arguments
   * @api public
   */

  function checkArguments () {
    var obj = flag(this, 'object')
      , type = Object.prototype.toString.call(obj);
    this.assert(
        '[object Arguments]' === type
      , 'expected #{this} to be arguments but got ' + type
      , 'expected #{this} to not be arguments'
    );
  }

  Assertion.addProperty('arguments', checkArguments);
  Assertion.addProperty('Arguments', checkArguments);

  /**
   * ### .equal(value)
   *
   * Asserts that the target is strictly equal (`===`) to `value`.
   * Alternately, if the `deep` flag is set, asserts that
   * the target is deeply equal to `value`.
   *
   *     expect('hello').to.equal('hello');
   *     expect(42).to.equal(42);
   *     expect(1).to.not.equal(true);
   *     expect({ foo: 'bar' }).to.not.equal({ foo: 'bar' });
   *     expect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });
   *
   * @name equal
   * @alias equals
   * @alias eq
   * @alias deep.equal
   * @param {Mixed} value
   * @param {String} message _optional_
   * @api public
   */

  function assertEqual (val, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'deep')) {
      return this.eql(val);
    } else {
      this.assert(
          val === obj
        , 'expected #{this} to equal #{exp}'
        , 'expected #{this} to not equal #{exp}'
        , val
        , this._obj
        , true
      );
    }
  }

  Assertion.addMethod('equal', assertEqual);
  Assertion.addMethod('equals', assertEqual);
  Assertion.addMethod('eq', assertEqual);

  /**
   * ### .eql(value)
   *
   * Asserts that the target is deeply equal to `value`.
   *
   *     expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
   *     expect([ 1, 2, 3 ]).to.eql([ 1, 2, 3 ]);
   *
   * @name eql
   * @alias eqls
   * @param {Mixed} value
   * @param {String} message _optional_
   * @api public
   */

  function assertEql(obj, msg) {
    if (msg) flag(this, 'message', msg);
    this.assert(
        _.eql(obj, flag(this, 'object'))
      , 'expected #{this} to deeply equal #{exp}'
      , 'expected #{this} to not deeply equal #{exp}'
      , obj
      , this._obj
      , true
    );
  }

  Assertion.addMethod('eql', assertEql);
  Assertion.addMethod('eqls', assertEql);

  /**
   * ### .above(value)
   *
   * Asserts that the target is greater than `value`.
   *
   *     expect(10).to.be.above(5);
   *
   * Can also be used in conjunction with `length` to
   * assert a minimum length. The benefit being a
   * more informative error message than if the length
   * was supplied directly.
   *
   *     expect('foo').to.have.length.above(2);
   *     expect([ 1, 2, 3 ]).to.have.length.above(2);
   *
   * @name above
   * @alias gt
   * @alias greaterThan
   * @param {Number} value
   * @param {String} message _optional_
   * @api public
   */

  function assertAbove (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(
          len > n
        , 'expected #{this} to have a length above #{exp} but got #{act}'
        , 'expected #{this} to not have a length above #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj > n
        , 'expected #{this} to be above ' + n
        , 'expected #{this} to be at most ' + n
      );
    }
  }

  Assertion.addMethod('above', assertAbove);
  Assertion.addMethod('gt', assertAbove);
  Assertion.addMethod('greaterThan', assertAbove);

  /**
   * ### .least(value)
   *
   * Asserts that the target is greater than or equal to `value`.
   *
   *     expect(10).to.be.at.least(10);
   *
   * Can also be used in conjunction with `length` to
   * assert a minimum length. The benefit being a
   * more informative error message than if the length
   * was supplied directly.
   *
   *     expect('foo').to.have.length.of.at.least(2);
   *     expect([ 1, 2, 3 ]).to.have.length.of.at.least(3);
   *
   * @name least
   * @alias gte
   * @param {Number} value
   * @param {String} message _optional_
   * @api public
   */

  function assertLeast (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(
          len >= n
        , 'expected #{this} to have a length at least #{exp} but got #{act}'
        , 'expected #{this} to have a length below #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj >= n
        , 'expected #{this} to be at least ' + n
        , 'expected #{this} to be below ' + n
      );
    }
  }

  Assertion.addMethod('least', assertLeast);
  Assertion.addMethod('gte', assertLeast);

  /**
   * ### .below(value)
   *
   * Asserts that the target is less than `value`.
   *
   *     expect(5).to.be.below(10);
   *
   * Can also be used in conjunction with `length` to
   * assert a maximum length. The benefit being a
   * more informative error message than if the length
   * was supplied directly.
   *
   *     expect('foo').to.have.length.below(4);
   *     expect([ 1, 2, 3 ]).to.have.length.below(4);
   *
   * @name below
   * @alias lt
   * @alias lessThan
   * @param {Number} value
   * @param {String} message _optional_
   * @api public
   */

  function assertBelow (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(
          len < n
        , 'expected #{this} to have a length below #{exp} but got #{act}'
        , 'expected #{this} to not have a length below #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj < n
        , 'expected #{this} to be below ' + n
        , 'expected #{this} to be at least ' + n
      );
    }
  }

  Assertion.addMethod('below', assertBelow);
  Assertion.addMethod('lt', assertBelow);
  Assertion.addMethod('lessThan', assertBelow);

  /**
   * ### .most(value)
   *
   * Asserts that the target is less than or equal to `value`.
   *
   *     expect(5).to.be.at.most(5);
   *
   * Can also be used in conjunction with `length` to
   * assert a maximum length. The benefit being a
   * more informative error message than if the length
   * was supplied directly.
   *
   *     expect('foo').to.have.length.of.at.most(4);
   *     expect([ 1, 2, 3 ]).to.have.length.of.at.most(3);
   *
   * @name most
   * @alias lte
   * @param {Number} value
   * @param {String} message _optional_
   * @api public
   */

  function assertMost (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(
          len <= n
        , 'expected #{this} to have a length at most #{exp} but got #{act}'
        , 'expected #{this} to have a length above #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj <= n
        , 'expected #{this} to be at most ' + n
        , 'expected #{this} to be above ' + n
      );
    }
  }

  Assertion.addMethod('most', assertMost);
  Assertion.addMethod('lte', assertMost);

  /**
   * ### .within(start, finish)
   *
   * Asserts that the target is within a range.
   *
   *     expect(7).to.be.within(5,10);
   *
   * Can also be used in conjunction with `length` to
   * assert a length range. The benefit being a
   * more informative error message than if the length
   * was supplied directly.
   *
   *     expect('foo').to.have.length.within(2,4);
   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);
   *
   * @name within
   * @param {Number} start lowerbound inclusive
   * @param {Number} finish upperbound inclusive
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('within', function (start, finish, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , range = start + '..' + finish;
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(
          len >= start && len <= finish
        , 'expected #{this} to have a length within ' + range
        , 'expected #{this} to not have a length within ' + range
      );
    } else {
      this.assert(
          obj >= start && obj <= finish
        , 'expected #{this} to be within ' + range
        , 'expected #{this} to not be within ' + range
      );
    }
  });

  /**
   * ### .instanceof(constructor)
   *
   * Asserts that the target is an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , Chai = new Tea('chai');
   *
   *     expect(Chai).to.be.an.instanceof(Tea);
   *     expect([ 1, 2, 3 ]).to.be.instanceof(Array);
   *
   * @name instanceof
   * @param {Constructor} constructor
   * @param {String} message _optional_
   * @alias instanceOf
   * @api public
   */

  function assertInstanceOf (constructor, msg) {
    if (msg) flag(this, 'message', msg);
    var name = _.getName(constructor);
    this.assert(
        flag(this, 'object') instanceof constructor
      , 'expected #{this} to be an instance of ' + name
      , 'expected #{this} to not be an instance of ' + name
    );
  };

  Assertion.addMethod('instanceof', assertInstanceOf);
  Assertion.addMethod('instanceOf', assertInstanceOf);

  /**
   * ### .property(name, [value])
   *
   * Asserts that the target has a property `name`, optionally asserting that
   * the value of that property is strictly equal to  `value`.
   * If the `deep` flag is set, you can use dot- and bracket-notation for deep
   * references into objects and arrays.
   *
   *     // simple referencing
   *     var obj = { foo: 'bar' };
   *     expect(obj).to.have.property('foo');
   *     expect(obj).to.have.property('foo', 'bar');
   *
   *     // deep referencing
   *     var deepObj = {
   *         green: { tea: 'matcha' }
   *       , teas: [ 'chai', 'matcha', { tea: 'konacha' } ]
   *     };

   *     expect(deepObj).to.have.deep.property('green.tea', 'matcha');
   *     expect(deepObj).to.have.deep.property('teas[1]', 'matcha');
   *     expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');
   *
   * You can also use an array as the starting point of a `deep.property`
   * assertion, or traverse nested arrays.
   *
   *     var arr = [
   *         [ 'chai', 'matcha', 'konacha' ]
   *       , [ { tea: 'chai' }
   *         , { tea: 'matcha' }
   *         , { tea: 'konacha' } ]
   *     ];
   *
   *     expect(arr).to.have.deep.property('[0][1]', 'matcha');
   *     expect(arr).to.have.deep.property('[1][2].tea', 'konacha');
   *
   * Furthermore, `property` changes the subject of the assertion
   * to be the value of that property from the original object. This
   * permits for further chainable assertions on that property.
   *
   *     expect(obj).to.have.property('foo')
   *       .that.is.a('string');
   *     expect(deepObj).to.have.property('green')
   *       .that.is.an('object')
   *       .that.deep.equals({ tea: 'matcha' });
   *     expect(deepObj).to.have.property('teas')
   *       .that.is.an('array')
   *       .with.deep.property('[2]')
   *         .that.deep.equals({ tea: 'konacha' });
   *
   * @name property
   * @alias deep.property
   * @param {String} name
   * @param {Mixed} value (optional)
   * @param {String} message _optional_
   * @returns value of property for chaining
   * @api public
   */

  Assertion.addMethod('property', function (name, val, msg) {
    if (msg) flag(this, 'message', msg);

    var descriptor = flag(this, 'deep') ? 'deep property ' : 'property '
      , negate = flag(this, 'negate')
      , obj = flag(this, 'object')
      , value = flag(this, 'deep')
        ? _.getPathValue(name, obj)
        : obj[name];

    if (negate && undefined !== val) {
      if (undefined === value) {
        msg = (msg != null) ? msg + ': ' : '';
        throw new Error(msg + _.inspect(obj) + ' has no ' + descriptor + _.inspect(name));
      }
    } else {
      this.assert(
          undefined !== value
        , 'expected #{this} to have a ' + descriptor + _.inspect(name)
        , 'expected #{this} to not have ' + descriptor + _.inspect(name));
    }

    if (undefined !== val) {
      this.assert(
          val === value
        , 'expected #{this} to have a ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
        , 'expected #{this} to not have a ' + descriptor + _.inspect(name) + ' of #{act}'
        , val
        , value
      );
    }

    flag(this, 'object', value);
  });


  /**
   * ### .ownProperty(name)
   *
   * Asserts that the target has an own property `name`.
   *
   *     expect('test').to.have.ownProperty('length');
   *
   * @name ownProperty
   * @alias haveOwnProperty
   * @param {String} name
   * @param {String} message _optional_
   * @api public
   */

  function assertOwnProperty (name, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        obj.hasOwnProperty(name)
      , 'expected #{this} to have own property ' + _.inspect(name)
      , 'expected #{this} to not have own property ' + _.inspect(name)
    );
  }

  Assertion.addMethod('ownProperty', assertOwnProperty);
  Assertion.addMethod('haveOwnProperty', assertOwnProperty);

  /**
   * ### .length(value)
   *
   * Asserts that the target's `length` property has
   * the expected value.
   *
   *     expect([ 1, 2, 3]).to.have.length(3);
   *     expect('foobar').to.have.length(6);
   *
   * Can also be used as a chain precursor to a value
   * comparison for the length property.
   *
   *     expect('foo').to.have.length.above(2);
   *     expect([ 1, 2, 3 ]).to.have.length.above(2);
   *     expect('foo').to.have.length.below(4);
   *     expect([ 1, 2, 3 ]).to.have.length.below(4);
   *     expect('foo').to.have.length.within(2,4);
   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);
   *
   * @name length
   * @alias lengthOf
   * @param {Number} length
   * @param {String} message _optional_
   * @api public
   */

  function assertLengthChain () {
    flag(this, 'doLength', true);
  }

  function assertLength (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    new Assertion(obj, msg).to.have.property('length');
    var len = obj.length;

    this.assert(
        len == n
      , 'expected #{this} to have a length of #{exp} but got #{act}'
      , 'expected #{this} to not have a length of #{act}'
      , n
      , len
    );
  }

  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
  Assertion.addMethod('lengthOf', assertLength, assertLengthChain);

  /**
   * ### .match(regexp)
   *
   * Asserts that the target matches a regular expression.
   *
   *     expect('foobar').to.match(/^foo/);
   *
   * @name match
   * @param {RegExp} RegularExpression
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('match', function (re, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        re.exec(obj)
      , 'expected #{this} to match ' + re
      , 'expected #{this} not to match ' + re
    );
  });

  /**
   * ### .string(string)
   *
   * Asserts that the string target contains another string.
   *
   *     expect('foobar').to.have.string('bar');
   *
   * @name string
   * @param {String} string
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('string', function (str, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    new Assertion(obj, msg).is.a('string');

    this.assert(
        ~obj.indexOf(str)
      , 'expected #{this} to contain ' + _.inspect(str)
      , 'expected #{this} to not contain ' + _.inspect(str)
    );
  });


  /**
   * ### .keys(key1, [key2], [...])
   *
   * Asserts that the target has exactly the given keys, or
   * asserts the inclusion of some keys when using the
   * `include` or `contain` modifiers.
   *
   *     expect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);
   *     expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');
   *
   * @name keys
   * @alias key
   * @param {String...|Array} keys
   * @api public
   */

  function assertKeys (keys) {
    var obj = flag(this, 'object')
      , str
      , ok = true;

    keys = keys instanceof Array
      ? keys
      : Array.prototype.slice.call(arguments);

    if (!keys.length) throw new Error('keys required');

    var actual = Object.keys(obj)
      , len = keys.length;

    // Inclusion
    ok = keys.every(function(key){
      return ~actual.indexOf(key);
    });

    // Strict
    if (!flag(this, 'negate') && !flag(this, 'contains')) {
      ok = ok && keys.length == actual.length;
    }

    // Key string
    if (len > 1) {
      keys = keys.map(function(key){
        return _.inspect(key);
      });
      var last = keys.pop();
      str = keys.join(', ') + ', and ' + last;
    } else {
      str = _.inspect(keys[0]);
    }

    // Form
    str = (len > 1 ? 'keys ' : 'key ') + str;

    // Have / include
    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

    // Assertion
    this.assert(
        ok
      , 'expected #{this} to ' + str
      , 'expected #{this} to not ' + str
    );
  }

  Assertion.addMethod('keys', assertKeys);
  Assertion.addMethod('key', assertKeys);

  /**
   * ### .throw(constructor)
   *
   * Asserts that the function target will throw a specific error, or specific type of error
   * (as determined using `instanceof`), optionally with a RegExp or string inclusion test
   * for the error's message.
   *
   *     var err = new ReferenceError('This is a bad function.');
   *     var fn = function () { throw err; }
   *     expect(fn).to.throw(ReferenceError);
   *     expect(fn).to.throw(Error);
   *     expect(fn).to.throw(/bad function/);
   *     expect(fn).to.not.throw('good function');
   *     expect(fn).to.throw(ReferenceError, /bad function/);
   *     expect(fn).to.throw(err);
   *     expect(fn).to.not.throw(new RangeError('Out of range.'));
   *
   * Please note that when a throw expectation is negated, it will check each
   * parameter independently, starting with error constructor type. The appropriate way
   * to check for the existence of a type of error but for a message that does not match
   * is to use `and`.
   *
   *     expect(fn).to.throw(ReferenceError)
   *        .and.not.throw(/good function/);
   *
   * @name throw
   * @alias throws
   * @alias Throw
   * @param {ErrorConstructor} constructor
   * @param {String|RegExp} expected error message
   * @param {String} message _optional_
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @api public
   */

  function assertThrows (constructor, errMsg, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    new Assertion(obj, msg).is.a('function');

    var thrown = false
      , desiredError = null
      , name = null
      , thrownError = null;

    if (arguments.length === 0) {
      errMsg = null;
      constructor = null;
    } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
      errMsg = constructor;
      constructor = null;
    } else if (constructor && constructor instanceof Error) {
      desiredError = constructor;
      constructor = null;
      errMsg = null;
    } else if (typeof constructor === 'function') {
      name = (new constructor()).name;
    } else {
      constructor = null;
    }

    try {
      obj();
    } catch (err) {
      // first, check desired error
      if (desiredError) {
        this.assert(
            err === desiredError
          , 'expected #{this} to throw #{exp} but #{act} was thrown'
          , 'expected #{this} to not throw #{exp}'
          , desiredError
          , err
        );

        return this;
      }
      // next, check constructor
      if (constructor) {
        this.assert(
            err instanceof constructor
          , 'expected #{this} to throw #{exp} but #{act} was thrown'
          , 'expected #{this} to not throw #{exp} but #{act} was thrown'
          , name
          , err
        );

        if (!errMsg) return this;
      }
      // next, check message
      var message = 'object' === _.type(err) && "message" in err
        ? err.message
        : '' + err;

      if ((message != null) && errMsg && errMsg instanceof RegExp) {
        this.assert(
            errMsg.exec(message)
          , 'expected #{this} to throw error matching #{exp} but got #{act}'
          , 'expected #{this} to throw error not matching #{exp}'
          , errMsg
          , message
        );

        return this;
      } else if ((message != null) && errMsg && 'string' === typeof errMsg) {
        this.assert(
            ~message.indexOf(errMsg)
          , 'expected #{this} to throw error including #{exp} but got #{act}'
          , 'expected #{this} to throw error not including #{act}'
          , errMsg
          , message
        );

        return this;
      } else {
        thrown = true;
        thrownError = err;
      }
    }

    var actuallyGot = ''
      , expectedThrown = name !== null
        ? name
        : desiredError
          ? '#{exp}' //_.inspect(desiredError)
          : 'an error';

    if (thrown) {
      actuallyGot = ' but #{act} was thrown'
    }

    this.assert(
        thrown === true
      , 'expected #{this} to throw ' + expectedThrown + actuallyGot
      , 'expected #{this} to not throw ' + expectedThrown + actuallyGot
      , desiredError
      , thrownError
    );
  };

  Assertion.addMethod('throw', assertThrows);
  Assertion.addMethod('throws', assertThrows);
  Assertion.addMethod('Throw', assertThrows);

  /**
   * ### .respondTo(method)
   *
   * Asserts that the object or class target will respond to a method.
   *
   *     Klass.prototype.bar = function(){};
   *     expect(Klass).to.respondTo('bar');
   *     expect(obj).to.respondTo('bar');
   *
   * To check if a constructor will respond to a static function,
   * set the `itself` flag.
   *
   *     Klass.baz = function(){};
   *     expect(Klass).itself.to.respondTo('baz');
   *
   * @name respondTo
   * @param {String} method
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('respondTo', function (method, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , itself = flag(this, 'itself')
      , context = ('function' === _.type(obj) && !itself)
        ? obj.prototype[method]
        : obj[method];

    this.assert(
        'function' === typeof context
      , 'expected #{this} to respond to ' + _.inspect(method)
      , 'expected #{this} to not respond to ' + _.inspect(method)
    );
  });

  /**
   * ### .itself
   *
   * Sets the `itself` flag, later used by the `respondTo` assertion.
   *
   *     function Foo() {}
   *     Foo.bar = function() {}
   *     Foo.prototype.baz = function() {}
   *
   *     expect(Foo).itself.to.respondTo('bar');
   *     expect(Foo).itself.not.to.respondTo('baz');
   *
   * @name itself
   * @api public
   */

  Assertion.addProperty('itself', function () {
    flag(this, 'itself', true);
  });

  /**
   * ### .satisfy(method)
   *
   * Asserts that the target passes a given truth test.
   *
   *     expect(1).to.satisfy(function(num) { return num > 0; });
   *
   * @name satisfy
   * @param {Function} matcher
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('satisfy', function (matcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        matcher(obj)
      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
      , this.negate ? false : true
      , matcher(obj)
    );
  });

  /**
   * ### .closeTo(expected, delta)
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     expect(1.5).to.be.closeTo(1, 0.5);
   *
   * @name closeTo
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('closeTo', function (expected, delta, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        Math.abs(obj - expected) <= delta
      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
    );
  });

  function isSubsetOf(subset, superset) {
    return subset.every(function(elem) {
      return superset.indexOf(elem) !== -1;
    })
  }

  /**
   * ### .members(set)
   *
   * Asserts that the target is a superset of `set`,
   * or that the target and `set` have the same members.
   *
   *     expect([1, 2, 3]).to.include.members([3, 2]);
   *     expect([1, 2, 3]).to.not.include.members([3, 2, 8]);
   *
   *     expect([4, 2]).to.have.members([2, 4]);
   *     expect([5, 2]).to.not.have.members([5, 2, 1]);
   *
   * @name members
   * @param {Array} set
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('members', function (subset, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');

    new Assertion(obj).to.be.an('array');
    new Assertion(subset).to.be.an('array');

    if (flag(this, 'contains')) {
      return this.assert(
          isSubsetOf(subset, obj)
        , 'expected #{this} to be a superset of #{act}'
        , 'expected #{this} to not be a superset of #{act}'
        , obj
        , subset
      );
    }

    this.assert(
        isSubsetOf(obj, subset) && isSubsetOf(subset, obj)
        , 'expected #{this} to have the same members as #{act}'
        , 'expected #{this} to not have the same members as #{act}'
        , obj
        , subset
    );
  });
};

});
require.register("chai/lib/chai/interface/assert.js", function(exports, require, module){
/*!
 * chai
 * Copyright(c) 2011-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */


module.exports = function (chai, util) {

  /*!
   * Chai dependencies.
   */

  var Assertion = chai.Assertion
    , flag = util.flag;

  /*!
   * Module export.
   */

  /**
   * ### assert(expression, message)
   *
   * Write your own test expressions.
   *
   *     assert('foo' !== 'bar', 'foo is not bar');
   *     assert(Array.isArray([]), 'empty arrays are arrays');
   *
   * @param {Mixed} expression to test for truthiness
   * @param {String} message to display on error
   * @name assert
   * @api public
   */

  var assert = chai.assert = function (express, errmsg) {
    var test = new Assertion(null);
    test.assert(
        express
      , errmsg
      , '[ negation message unavailable ]'
    );
  };

  /**
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure. Node.js `assert` module-compatible.
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @api public
   */

  assert.fail = function (actual, expected, message, operator) {
    throw new chai.AssertionError({
        actual: actual
      , expected: expected
      , message: message
      , operator: operator
      , stackStartFunction: assert.fail
    });
  };

  /**
   * ### .ok(object, [message])
   *
   * Asserts that `object` is truthy.
   *
   *     assert.ok('everything', 'everything is ok');
   *     assert.ok(false, 'this will fail');
   *
   * @name ok
   * @param {Mixed} object to test
   * @param {String} message
   * @api public
   */

  assert.ok = function (val, msg) {
    new Assertion(val, msg).is.ok;
  };

  /**
   * ### .notOk(object, [message])
   *
   * Asserts that `object` is falsy.
   *
   *     assert.notOk('everything', 'this will fail');
   *     assert.notOk(false, 'this will pass');
   *
   * @name notOk
   * @param {Mixed} object to test
   * @param {String} message
   * @api public
   */

  assert.notOk = function (val, msg) {
    new Assertion(val, msg).is.not.ok;
  };

  /**
   * ### .equal(actual, expected, [message])
   *
   * Asserts non-strict equality (`==`) of `actual` and `expected`.
   *
   *     assert.equal(3, '3', '== coerces values to strings');
   *
   * @name equal
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @api public
   */

  assert.equal = function (act, exp, msg) {
    var test = new Assertion(act, msg);

    test.assert(
        exp == flag(test, 'object')
      , 'expected #{this} to equal #{exp}'
      , 'expected #{this} to not equal #{act}'
      , exp
      , act
    );
  };

  /**
   * ### .notEqual(actual, expected, [message])
   *
   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
   *
   *     assert.notEqual(3, 4, 'these numbers are not equal');
   *
   * @name notEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @api public
   */

  assert.notEqual = function (act, exp, msg) {
    var test = new Assertion(act, msg);

    test.assert(
        exp != flag(test, 'object')
      , 'expected #{this} to not equal #{exp}'
      , 'expected #{this} to equal #{act}'
      , exp
      , act
    );
  };

  /**
   * ### .strictEqual(actual, expected, [message])
   *
   * Asserts strict equality (`===`) of `actual` and `expected`.
   *
   *     assert.strictEqual(true, true, 'these booleans are strictly equal');
   *
   * @name strictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @api public
   */

  assert.strictEqual = function (act, exp, msg) {
    new Assertion(act, msg).to.equal(exp);
  };

  /**
   * ### .notStrictEqual(actual, expected, [message])
   *
   * Asserts strict inequality (`!==`) of `actual` and `expected`.
   *
   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
   *
   * @name notStrictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @api public
   */

  assert.notStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg).to.not.equal(exp);
  };

  /**
   * ### .deepEqual(actual, expected, [message])
   *
   * Asserts that `actual` is deeply equal to `expected`.
   *
   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
   *
   * @name deepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @api public
   */

  assert.deepEqual = function (act, exp, msg) {
    new Assertion(act, msg).to.eql(exp);
  };

  /**
   * ### .notDeepEqual(actual, expected, [message])
   *
   * Assert that `actual` is not deeply equal to `expected`.
   *
   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
   *
   * @name notDeepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @api public
   */

  assert.notDeepEqual = function (act, exp, msg) {
    new Assertion(act, msg).to.not.eql(exp);
  };

  /**
   * ### .isTrue(value, [message])
   *
   * Asserts that `value` is true.
   *
   *     var teaServed = true;
   *     assert.isTrue(teaServed, 'the tea has been served');
   *
   * @name isTrue
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isTrue = function (val, msg) {
    new Assertion(val, msg).is['true'];
  };

  /**
   * ### .isFalse(value, [message])
   *
   * Asserts that `value` is false.
   *
   *     var teaServed = false;
   *     assert.isFalse(teaServed, 'no tea yet? hmm...');
   *
   * @name isFalse
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isFalse = function (val, msg) {
    new Assertion(val, msg).is['false'];
  };

  /**
   * ### .isNull(value, [message])
   *
   * Asserts that `value` is null.
   *
   *     assert.isNull(err, 'there was no error');
   *
   * @name isNull
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNull = function (val, msg) {
    new Assertion(val, msg).to.equal(null);
  };

  /**
   * ### .isNotNull(value, [message])
   *
   * Asserts that `value` is not null.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotNull(tea, 'great, time for tea!');
   *
   * @name isNotNull
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotNull = function (val, msg) {
    new Assertion(val, msg).to.not.equal(null);
  };

  /**
   * ### .isUndefined(value, [message])
   *
   * Asserts that `value` is `undefined`.
   *
   *     var tea;
   *     assert.isUndefined(tea, 'no tea defined');
   *
   * @name isUndefined
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isUndefined = function (val, msg) {
    new Assertion(val, msg).to.equal(undefined);
  };

  /**
   * ### .isDefined(value, [message])
   *
   * Asserts that `value` is not `undefined`.
   *
   *     var tea = 'cup of chai';
   *     assert.isDefined(tea, 'tea has been defined');
   *
   * @name isDefined
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isDefined = function (val, msg) {
    new Assertion(val, msg).to.not.equal(undefined);
  };

  /**
   * ### .isFunction(value, [message])
   *
   * Asserts that `value` is a function.
   *
   *     function serveTea() { return 'cup of tea'; };
   *     assert.isFunction(serveTea, 'great, we can have tea now');
   *
   * @name isFunction
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isFunction = function (val, msg) {
    new Assertion(val, msg).to.be.a('function');
  };

  /**
   * ### .isNotFunction(value, [message])
   *
   * Asserts that `value` is _not_ a function.
   *
   *     var serveTea = [ 'heat', 'pour', 'sip' ];
   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
   *
   * @name isNotFunction
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotFunction = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('function');
  };

  /**
   * ### .isObject(value, [message])
   *
   * Asserts that `value` is an object (as revealed by
   * `Object.prototype.toString`).
   *
   *     var selection = { name: 'Chai', serve: 'with spices' };
   *     assert.isObject(selection, 'tea selection is an object');
   *
   * @name isObject
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isObject = function (val, msg) {
    new Assertion(val, msg).to.be.a('object');
  };

  /**
   * ### .isNotObject(value, [message])
   *
   * Asserts that `value` is _not_ an object.
   *
   *     var selection = 'chai'
   *     assert.isObject(selection, 'tea selection is not an object');
   *     assert.isObject(null, 'null is not an object');
   *
   * @name isNotObject
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotObject = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('object');
  };

  /**
   * ### .isArray(value, [message])
   *
   * Asserts that `value` is an array.
   *
   *     var menu = [ 'green', 'chai', 'oolong' ];
   *     assert.isArray(menu, 'what kind of tea do we want?');
   *
   * @name isArray
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isArray = function (val, msg) {
    new Assertion(val, msg).to.be.an('array');
  };

  /**
   * ### .isNotArray(value, [message])
   *
   * Asserts that `value` is _not_ an array.
   *
   *     var menu = 'green|chai|oolong';
   *     assert.isNotArray(menu, 'what kind of tea do we want?');
   *
   * @name isNotArray
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotArray = function (val, msg) {
    new Assertion(val, msg).to.not.be.an('array');
  };

  /**
   * ### .isString(value, [message])
   *
   * Asserts that `value` is a string.
   *
   *     var teaOrder = 'chai';
   *     assert.isString(teaOrder, 'order placed');
   *
   * @name isString
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isString = function (val, msg) {
    new Assertion(val, msg).to.be.a('string');
  };

  /**
   * ### .isNotString(value, [message])
   *
   * Asserts that `value` is _not_ a string.
   *
   *     var teaOrder = 4;
   *     assert.isNotString(teaOrder, 'order placed');
   *
   * @name isNotString
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotString = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('string');
  };

  /**
   * ### .isNumber(value, [message])
   *
   * Asserts that `value` is a number.
   *
   *     var cups = 2;
   *     assert.isNumber(cups, 'how many cups');
   *
   * @name isNumber
   * @param {Number} value
   * @param {String} message
   * @api public
   */

  assert.isNumber = function (val, msg) {
    new Assertion(val, msg).to.be.a('number');
  };

  /**
   * ### .isNotNumber(value, [message])
   *
   * Asserts that `value` is _not_ a number.
   *
   *     var cups = '2 cups please';
   *     assert.isNotNumber(cups, 'how many cups');
   *
   * @name isNotNumber
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotNumber = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('number');
  };

  /**
   * ### .isBoolean(value, [message])
   *
   * Asserts that `value` is a boolean.
   *
   *     var teaReady = true
   *       , teaServed = false;
   *
   *     assert.isBoolean(teaReady, 'is the tea ready');
   *     assert.isBoolean(teaServed, 'has tea been served');
   *
   * @name isBoolean
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isBoolean = function (val, msg) {
    new Assertion(val, msg).to.be.a('boolean');
  };

  /**
   * ### .isNotBoolean(value, [message])
   *
   * Asserts that `value` is _not_ a boolean.
   *
   *     var teaReady = 'yep'
   *       , teaServed = 'nope';
   *
   *     assert.isNotBoolean(teaReady, 'is the tea ready');
   *     assert.isNotBoolean(teaServed, 'has tea been served');
   *
   * @name isNotBoolean
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotBoolean = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('boolean');
  };

  /**
   * ### .typeOf(value, name, [message])
   *
   * Asserts that `value`'s type is `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
   *     assert.typeOf('tea', 'string', 'we have a string');
   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
   *     assert.typeOf(null, 'null', 'we have a null');
   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
   *
   * @name typeOf
   * @param {Mixed} value
   * @param {String} name
   * @param {String} message
   * @api public
   */

  assert.typeOf = function (val, type, msg) {
    new Assertion(val, msg).to.be.a(type);
  };

  /**
   * ### .notTypeOf(value, name, [message])
   *
   * Asserts that `value`'s type is _not_ `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
   *
   * @name notTypeOf
   * @param {Mixed} value
   * @param {String} typeof name
   * @param {String} message
   * @api public
   */

  assert.notTypeOf = function (val, type, msg) {
    new Assertion(val, msg).to.not.be.a(type);
  };

  /**
   * ### .instanceOf(object, constructor, [message])
   *
   * Asserts that `value` is an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new Tea('chai');
   *
   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
   *
   * @name instanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @api public
   */

  assert.instanceOf = function (val, type, msg) {
    new Assertion(val, msg).to.be.instanceOf(type);
  };

  /**
   * ### .notInstanceOf(object, constructor, [message])
   *
   * Asserts `value` is not an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new String('chai');
   *
   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
   *
   * @name notInstanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @api public
   */

  assert.notInstanceOf = function (val, type, msg) {
    new Assertion(val, msg).to.not.be.instanceOf(type);
  };

  /**
   * ### .include(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Works
   * for strings and arrays.
   *
   *     assert.include('foobar', 'bar', 'foobar contains string "bar"');
   *     assert.include([ 1, 2, 3 ], 3, 'array contains value');
   *
   * @name include
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @api public
   */

  assert.include = function (exp, inc, msg) {
    var obj = new Assertion(exp, msg);

    if (Array.isArray(exp)) {
      obj.to.include(inc);
    } else if ('string' === typeof exp) {
      obj.to.contain.string(inc);
    } else {
      throw new chai.AssertionError(
          'expected an array or string'
        , null
        , assert.include
      );
    }
  };

  /**
   * ### .notInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Works
   * for strings and arrays.
   *i
   *     assert.notInclude('foobar', 'baz', 'string not include substring');
   *     assert.notInclude([ 1, 2, 3 ], 4, 'array not include contain value');
   *
   * @name notInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @api public
   */

  assert.notInclude = function (exp, inc, msg) {
    var obj = new Assertion(exp, msg);

    if (Array.isArray(exp)) {
      obj.to.not.include(inc);
    } else if ('string' === typeof exp) {
      obj.to.not.contain.string(inc);
    } else {
      throw new chai.AssertionError(
          'expected an array or string'
        , null
        , assert.notInclude
      );
    }
  };

  /**
   * ### .match(value, regexp, [message])
   *
   * Asserts that `value` matches the regular expression `regexp`.
   *
   *     assert.match('foobar', /^foo/, 'regexp matches');
   *
   * @name match
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @api public
   */

  assert.match = function (exp, re, msg) {
    new Assertion(exp, msg).to.match(re);
  };

  /**
   * ### .notMatch(value, regexp, [message])
   *
   * Asserts that `value` does not match the regular expression `regexp`.
   *
   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
   *
   * @name notMatch
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @api public
   */

  assert.notMatch = function (exp, re, msg) {
    new Assertion(exp, msg).to.not.match(re);
  };

  /**
   * ### .property(object, property, [message])
   *
   * Asserts that `object` has a property named by `property`.
   *
   *     assert.property({ tea: { green: 'matcha' }}, 'tea');
   *
   * @name property
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.property = function (obj, prop, msg) {
    new Assertion(obj, msg).to.have.property(prop);
  };

  /**
   * ### .notProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property`.
   *
   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
   *
   * @name notProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.notProperty = function (obj, prop, msg) {
    new Assertion(obj, msg).to.not.have.property(prop);
  };

  /**
   * ### .deepProperty(object, property, [message])
   *
   * Asserts that `object` has a property named by `property`, which can be a
   * string using dot- and bracket-notation for deep reference.
   *
   *     assert.deepProperty({ tea: { green: 'matcha' }}, 'tea.green');
   *
   * @name deepProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.deepProperty = function (obj, prop, msg) {
    new Assertion(obj, msg).to.have.deep.property(prop);
  };

  /**
   * ### .notDeepProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property`, which
   * can be a string using dot- and bracket-notation for deep reference.
   *
   *     assert.notDeepProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
   *
   * @name notDeepProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.notDeepProperty = function (obj, prop, msg) {
    new Assertion(obj, msg).to.not.have.deep.property(prop);
  };

  /**
   * ### .propertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with value given
   * by `value`.
   *
   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
   *
   * @name propertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.propertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg).to.have.property(prop, val);
  };

  /**
   * ### .propertyNotVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property`, but with a value
   * different from that given by `value`.
   *
   *     assert.propertyNotVal({ tea: 'is good' }, 'tea', 'is bad');
   *
   * @name propertyNotVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.propertyNotVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg).to.not.have.property(prop, val);
  };

  /**
   * ### .deepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with value given
   * by `value`. `property` can use dot- and bracket-notation for deep
   * reference.
   *
   *     assert.deepPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
   *
   * @name deepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.deepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg).to.have.deep.property(prop, val);
  };

  /**
   * ### .deepPropertyNotVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property`, but with a value
   * different from that given by `value`. `property` can use dot- and
   * bracket-notation for deep reference.
   *
   *     assert.deepPropertyNotVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
   *
   * @name deepPropertyNotVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.deepPropertyNotVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg).to.not.have.deep.property(prop, val);
  };

  /**
   * ### .lengthOf(object, length, [message])
   *
   * Asserts that `object` has a `length` property with the expected value.
   *
   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
   *     assert.lengthOf('foobar', 5, 'string has length of 6');
   *
   * @name lengthOf
   * @param {Mixed} object
   * @param {Number} length
   * @param {String} message
   * @api public
   */

  assert.lengthOf = function (exp, len, msg) {
    new Assertion(exp, msg).to.have.length(len);
  };

  /**
   * ### .throws(function, [constructor/string/regexp], [string/regexp], [message])
   *
   * Asserts that `function` will throw an error that is an instance of
   * `constructor`, or alternately that it will throw an error with message
   * matching `regexp`.
   *
   *     assert.throw(fn, 'function throws a reference error');
   *     assert.throw(fn, /function throws a reference error/);
   *     assert.throw(fn, ReferenceError);
   *     assert.throw(fn, ReferenceError, 'function throws a reference error');
   *     assert.throw(fn, ReferenceError, /function throws a reference error/);
   *
   * @name throws
   * @alias throw
   * @alias Throw
   * @param {Function} function
   * @param {ErrorConstructor} constructor
   * @param {RegExp} regexp
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @api public
   */

  assert.Throw = function (fn, errt, errs, msg) {
    if ('string' === typeof errt || errt instanceof RegExp) {
      errs = errt;
      errt = null;
    }

    new Assertion(fn, msg).to.Throw(errt, errs);
  };

  /**
   * ### .doesNotThrow(function, [constructor/regexp], [message])
   *
   * Asserts that `function` will _not_ throw an error that is an instance of
   * `constructor`, or alternately that it will not throw an error with message
   * matching `regexp`.
   *
   *     assert.doesNotThrow(fn, Error, 'function does not throw');
   *
   * @name doesNotThrow
   * @param {Function} function
   * @param {ErrorConstructor} constructor
   * @param {RegExp} regexp
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @api public
   */

  assert.doesNotThrow = function (fn, type, msg) {
    if ('string' === typeof type) {
      msg = type;
      type = null;
    }

    new Assertion(fn, msg).to.not.Throw(type);
  };

  /**
   * ### .operator(val1, operator, val2, [message])
   *
   * Compares two values using `operator`.
   *
   *     assert.operator(1, '<', 2, 'everything is ok');
   *     assert.operator(1, '>', 2, 'this will fail');
   *
   * @name operator
   * @param {Mixed} val1
   * @param {String} operator
   * @param {Mixed} val2
   * @param {String} message
   * @api public
   */

  assert.operator = function (val, operator, val2, msg) {
    if (!~['==', '===', '>', '>=', '<', '<=', '!=', '!=='].indexOf(operator)) {
      throw new Error('Invalid operator "' + operator + '"');
    }
    var test = new Assertion(eval(val + operator + val2), msg);
    test.assert(
        true === flag(test, 'object')
      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
  };

  /**
   * ### .closeTo(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
   *
   * @name closeTo
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @api public
   */

  assert.closeTo = function (act, exp, delta, msg) {
    new Assertion(act, msg).to.be.closeTo(exp, delta);
  };

  /**
   * ### .sameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members.
   * Order is not taken into account.
   *
   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
   *
   * @name sameMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @api public
   */

  assert.sameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg).to.have.same.members(set2);
  }

  /**
   * ### .includeMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset`.
   * Order is not taken into account.
   *
   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1 ], 'include members');
   *
   * @name includeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @api public
   */

  assert.includeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg).to.include.members(subset);
  }

  /*!
   * Undocumented / untested
   */

  assert.ifError = function (val, msg) {
    new Assertion(val, msg).to.not.be.ok;
  };

  /*!
   * Aliases.
   */

  (function alias(name, as){
    assert[as] = assert[name];
    return alias;
  })
  ('Throw', 'throw')
  ('Throw', 'throws');
};

});
require.register("chai/lib/chai/interface/expect.js", function(exports, require, module){
/*!
 * chai
 * Copyright(c) 2011-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  chai.expect = function (val, message) {
    return new chai.Assertion(val, message);
  };
};


});
require.register("chai/lib/chai/interface/should.js", function(exports, require, module){
/*!
 * chai
 * Copyright(c) 2011-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  var Assertion = chai.Assertion;

  function loadShould () {
    // modify Object.prototype to have `should`
    Object.defineProperty(Object.prototype, 'should',
      {
        set: function (value) {
          // See https://github.com/chaijs/chai/issues/86: this makes
          // `whatever.should = someValue` actually set `someValue`, which is
          // especially useful for `global.should = require('chai').should()`.
          //
          // Note that we have to use [[DefineProperty]] instead of [[Put]]
          // since otherwise we would trigger this very setter!
          Object.defineProperty(this, 'should', {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        }
      , get: function(){
          if (this instanceof String || this instanceof Number) {
            return new Assertion(this.constructor(this));
          } else if (this instanceof Boolean) {
            return new Assertion(this == true);
          }
          return new Assertion(this);
        }
      , configurable: true
    });

    var should = {};

    should.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.equal(val2);
    };

    should.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.Throw(errt, errs);
    };

    should.exist = function (val, msg) {
      new Assertion(val, msg).to.exist;
    }

    // negation
    should.not = {}

    should.not.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.not.equal(val2);
    };

    should.not.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.not.Throw(errt, errs);
    };

    should.not.exist = function (val, msg) {
      new Assertion(val, msg).to.not.exist;
    }

    should['throw'] = should['Throw'];
    should.not['throw'] = should.not['Throw'];

    return should;
  };

  chai.should = loadShould;
  chai.Should = loadShould;
};

});
require.register("chai/lib/chai/utils/addChainableMethod.js", function(exports, require, module){
/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var transferFlags = require('./transferFlags');

/*!
 * Module variables
 */

// Check whether `__proto__` is supported
var hasProtoSupport = '__proto__' in Object;

// Without `__proto__` support, this module will need to add properties to a function.
// However, some Function.prototype methods cannot be overwritten,
// and there seems no easy cross-platform way to detect them (@see chaijs/chai/issues/69).
var excludeNames = /^(?:length|name|arguments|caller)$/;

// Cache `Function` properties
var call  = Function.prototype.call,
    apply = Function.prototype.apply;

/**
 * ### addChainableMethod (ctx, name, method, chainingBehavior)
 *
 * Adds a method to an object, such that the method can also be chained.
 *
 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
 *
 * The result can then be used as both a method assertion, executing both `method` and
 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
 *
 *     expect(fooStr).to.be.foo('bar');
 *     expect(fooStr).to.be.foo.equal('foo');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for `name`, when called
 * @param {Function} chainingBehavior function to be called every time the property is accessed
 * @name addChainableMethod
 * @api public
 */

module.exports = function (ctx, name, method, chainingBehavior) {
  if (typeof chainingBehavior !== 'function')
    chainingBehavior = function () { };

  Object.defineProperty(ctx, name,
    { get: function () {
        chainingBehavior.call(this);

        var assert = function () {
          var result = method.apply(this, arguments);
          return result === undefined ? this : result;
        };

        // Use `__proto__` if available
        if (hasProtoSupport) {
          // Inherit all properties from the object by replacing the `Function` prototype
          var prototype = assert.__proto__ = Object.create(this);
          // Restore the `call` and `apply` methods from `Function`
          prototype.call = call;
          prototype.apply = apply;
        }
        // Otherwise, redefine all properties (slow!)
        else {
          var asserterNames = Object.getOwnPropertyNames(ctx);
          asserterNames.forEach(function (asserterName) {
            if (!excludeNames.test(asserterName)) {
              var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
              Object.defineProperty(assert, asserterName, pd);
            }
          });
        }

        transferFlags(this, assert);
        return assert;
      }
    , configurable: true
  });
};

});
require.register("chai/lib/chai/utils/addMethod.js", function(exports, require, module){
/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .addMethod (ctx, name, method)
 *
 * Adds a method to the prototype of an object.
 *
 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(fooStr).to.be.foo('bar');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for name
 * @name addMethod
 * @api public
 */

module.exports = function (ctx, name, method) {
  ctx[name] = function () {
    var result = method.apply(this, arguments);
    return result === undefined ? this : result;
  };
};

});
require.register("chai/lib/chai/utils/addProperty.js", function(exports, require, module){
/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### addProperty (ctx, name, getter)
 *
 * Adds a property to the prototype of an object.
 *
 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.instanceof(Foo);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.foo;
 *
 * @param {Object} ctx object to which the property is added
 * @param {String} name of property to add
 * @param {Function} getter function to be used for name
 * @name addProperty
 * @api public
 */

module.exports = function (ctx, name, getter) {
  Object.defineProperty(ctx, name,
    { get: function () {
        var result = getter.call(this);
        return result === undefined ? this : result;
      }
    , configurable: true
  });
};

});
require.register("chai/lib/chai/utils/flag.js", function(exports, require, module){
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### flag(object ,key, [value])
 *
 * Get or set a flag value on an object. If a
 * value is provided it will be set, else it will
 * return the currently set value or `undefined` if
 * the value is not set.
 *
 *     utils.flag(this, 'foo', 'bar'); // setter
 *     utils.flag(this, 'foo'); // getter, returns `bar`
 *
 * @param {Object} object (constructed Assertion
 * @param {String} key
 * @param {Mixed} value (optional)
 * @name flag
 * @api private
 */

module.exports = function (obj, key, value) {
  var flags = obj.__flags || (obj.__flags = Object.create(null));
  if (arguments.length === 3) {
    flags[key] = value;
  } else {
    return flags[key];
  }
};

});
require.register("chai/lib/chai/utils/getActual.js", function(exports, require, module){
/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * # getActual(object, [actual])
 *
 * Returns the `actual` value for an Assertion
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 */

module.exports = function (obj, args) {
  var actual = args[4];
  return 'undefined' !== typeof actual ? actual : obj._obj;
};

});
require.register("chai/lib/chai/utils/getEnumerableProperties.js", function(exports, require, module){
/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getEnumerableProperties(object)
 *
 * This allows the retrieval of enumerable property names of an object,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @name getEnumerableProperties
 * @api public
 */

module.exports = function getEnumerableProperties(object) {
  var result = [];
  for (var name in object) {
    result.push(name);
  }
  return result;
};

});
require.register("chai/lib/chai/utils/getMessage.js", function(exports, require, module){
/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var flag = require('./flag')
  , getActual = require('./getActual')
  , inspect = require('./inspect')
  , objDisplay = require('./objDisplay');

/**
 * ### .getMessage(object, message, negateMessage)
 *
 * Construct the error message based on flags
 * and template tags. Template tags will return
 * a stringified inspection of the object referenced.
 *
 * Message template tags:
 * - `#{this}` current asserted object
 * - `#{act}` actual value
 * - `#{exp}` expected value
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @name getMessage
 * @api public
 */

module.exports = function (obj, args) {
  var negate = flag(obj, 'negate')
    , val = flag(obj, 'object')
    , expected = args[3]
    , actual = getActual(obj, args)
    , msg = negate ? args[2] : args[1]
    , flagMsg = flag(obj, 'message');

  msg = msg || '';
  msg = msg
    .replace(/#{this}/g, objDisplay(val))
    .replace(/#{act}/g, objDisplay(actual))
    .replace(/#{exp}/g, objDisplay(expected));

  return flagMsg ? flagMsg + ': ' + msg : msg;
};

});
require.register("chai/lib/chai/utils/getName.js", function(exports, require, module){
/*!
 * Chai - getName utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * # getName(func)
 *
 * Gets the name of a function, in a cross-browser way.
 *
 * @param {Function} a function (usually a constructor)
 */

module.exports = function (func) {
  if (func.name) return func.name;

  var match = /^\s?function ([^(]*)\(/.exec(func);
  return match && match[1] ? match[1] : "";
};

});
require.register("chai/lib/chai/utils/getPathValue.js", function(exports, require, module){
/*!
 * Chai - getPathValue utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * @see https://github.com/logicalparadox/filtr
 * MIT Licensed
 */

/**
 * ### .getPathValue(path, object)
 *
 * This allows the retrieval of values in an
 * object given a string path.
 *
 *     var obj = {
 *         prop1: {
 *             arr: ['a', 'b', 'c']
 *           , str: 'Hello'
 *         }
 *       , prop2: {
 *             arr: [ { nested: 'Universe' } ]
 *           , str: 'Hello again!'
 *         }
 *     }
 *
 * The following would be the results.
 *
 *     getPathValue('prop1.str', obj); // Hello
 *     getPathValue('prop1.att[2]', obj); // b
 *     getPathValue('prop2.arr[0].nested', obj); // Universe
 *
 * @param {String} path
 * @param {Object} object
 * @returns {Object} value or `undefined`
 * @name getPathValue
 * @api public
 */

var getPathValue = module.exports = function (path, obj) {
  var parsed = parsePath(path);
  return _getPathValue(parsed, obj);
};

/*!
 * ## parsePath(path)
 *
 * Helper function used to parse string object
 * paths. Use in conjunction with `_getPathValue`.
 *
 *      var parsed = parsePath('myobject.property.subprop');
 *
 * ### Paths:
 *
 * * Can be as near infinitely deep and nested
 * * Arrays are also valid using the formal `myobject.document[3].property`.
 *
 * @param {String} path
 * @returns {Object} parsed
 * @api private
 */

function parsePath (path) {
  var str = path.replace(/\[/g, '.[')
    , parts = str.match(/(\\\.|[^.]+?)+/g);
  return parts.map(function (value) {
    var re = /\[(\d+)\]$/
      , mArr = re.exec(value)
    if (mArr) return { i: parseFloat(mArr[1]) };
    else return { p: value };
  });
};

/*!
 * ## _getPathValue(parsed, obj)
 *
 * Helper companion function for `.parsePath` that returns
 * the value located at the parsed address.
 *
 *      var value = getPathValue(parsed, obj);
 *
 * @param {Object} parsed definition from `parsePath`.
 * @param {Object} object to search against
 * @returns {Object|Undefined} value
 * @api private
 */

function _getPathValue (parsed, obj) {
  var tmp = obj
    , res;
  for (var i = 0, l = parsed.length; i < l; i++) {
    var part = parsed[i];
    if (tmp) {
      if ('undefined' !== typeof part.p)
        tmp = tmp[part.p];
      else if ('undefined' !== typeof part.i)
        tmp = tmp[part.i];
      if (i == (l - 1)) res = tmp;
    } else {
      res = undefined;
    }
  }
  return res;
};

});
require.register("chai/lib/chai/utils/getProperties.js", function(exports, require, module){
/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getProperties(object)
 *
 * This allows the retrieval of property names of an object, enumerable or not,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @name getProperties
 * @api public
 */

module.exports = function getProperties(object) {
  var result = Object.getOwnPropertyNames(subject);

  function addProperty(property) {
    if (result.indexOf(property) === -1) {
      result.push(property);
    }
  }

  var proto = Object.getPrototypeOf(subject);
  while (proto !== null) {
    Object.getOwnPropertyNames(proto).forEach(addProperty);
    proto = Object.getPrototypeOf(proto);
  }

  return result;
};

});
require.register("chai/lib/chai/utils/index.js", function(exports, require, module){
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Main exports
 */

var exports = module.exports = {};

/*!
 * test utility
 */

exports.test = require('./test');

/*!
 * type utility
 */

exports.type = require('./type');

/*!
 * message utility
 */

exports.getMessage = require('./getMessage');

/*!
 * actual utility
 */

exports.getActual = require('./getActual');

/*!
 * Inspect util
 */

exports.inspect = require('./inspect');

/*!
 * Object Display util
 */

exports.objDisplay = require('./objDisplay');

/*!
 * Flag utility
 */

exports.flag = require('./flag');

/*!
 * Flag transferring utility
 */

exports.transferFlags = require('./transferFlags');

/*!
 * Deep equal utility
 */

exports.eql = require('deep-eql');

/*!
 * Deep path value
 */

exports.getPathValue = require('./getPathValue');

/*!
 * Function name
 */

exports.getName = require('./getName');

/*!
 * add Property
 */

exports.addProperty = require('./addProperty');

/*!
 * add Method
 */

exports.addMethod = require('./addMethod');

/*!
 * overwrite Property
 */

exports.overwriteProperty = require('./overwriteProperty');

/*!
 * overwrite Method
 */

exports.overwriteMethod = require('./overwriteMethod');

/*!
 * Add a chainable method
 */

exports.addChainableMethod = require('./addChainableMethod');


});
require.register("chai/lib/chai/utils/inspect.js", function(exports, require, module){
// This is (almost) directly from Node.js utils
// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js

var getName = require('./getName');
var getProperties = require('./getProperties');
var getEnumerableProperties = require('./getEnumerableProperties');

module.exports = inspect;

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
 *    properties of objects.
 * @param {Number} depth Depth in which to descend in object. Default is 2.
 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
 *    output. Default is false (no coloring).
 */
function inspect(obj, showHidden, depth, colors) {
  var ctx = {
    showHidden: showHidden,
    seen: [],
    stylize: function (str) { return str; }
  };
  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
}

// https://gist.github.com/1044128/
var getOuterHTML = function(element) {
  if ('outerHTML' in element) return element.outerHTML;
  var ns = "http://www.w3.org/1999/xhtml";
  var container = document.createElementNS(ns, '_');
  var elemProto = (window.HTMLElement || window.Element).prototype;
  var xmlSerializer = new XMLSerializer();
  var html;
  if (document.xmlVersion) {
    return xmlSerializer.serializeToString(element);
  } else {
    container.appendChild(element.cloneNode(false));
    html = container.innerHTML.replace('><', '>' + element.innerHTML + '<');
    container.innerHTML = '';
    return html;
  }
};

// Returns true if object is a DOM element.
var isDOMElement = function (object) {
  if (typeof HTMLElement === 'object') {
    return object instanceof HTMLElement;
  } else {
    return object &&
      typeof object === 'object' &&
      object.nodeType === 1 &&
      typeof object.nodeName === 'string';
  }
};

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (value && typeof value.inspect === 'function' &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes);
    if (typeof ret !== 'string') {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // If it's DOM elem, get outer HTML.
  if (isDOMElement(value)) {
    return getOuterHTML(value);
  }

  // Look up the keys of the object.
  var visibleKeys = getEnumerableProperties(value);
  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;

  // Some type of object without properties can be shortcutted.
  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,
  // a `stack` plus `description` property; ignore those for consistency.
  if (keys.length === 0 || (isError(value) && (
      (keys.length === 1 && keys[0] === 'stack') ||
      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')
     ))) {
    if (typeof value === 'function') {
      var name = getName(value);
      var nameSuffix = name ? ': ' + name : '';
      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (typeof value === 'function') {
    var name = getName(value);
    var nameSuffix = name ? ': ' + name : '';
    base = ' [Function' + nameSuffix + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    return formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  switch (typeof value) {
    case 'undefined':
      return ctx.stylize('undefined', 'undefined');

    case 'string':
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');

    case 'number':
      return ctx.stylize('' + value, 'number');

    case 'boolean':
      return ctx.stylize('' + value, 'boolean');
  }
  // For some reason typeof null is "object", so special case here.
  if (value === null) {
    return ctx.stylize('null', 'null');
  }
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str;
  if (value.__lookupGetter__) {
    if (value.__lookupGetter__(key)) {
      if (value.__lookupSetter__(key)) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (value.__lookupSetter__(key)) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
  }
  if (visibleKeys.indexOf(key) < 0) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(value[key]) < 0) {
      if (recurseTimes === null) {
        str = formatValue(ctx, value[key], null);
      } else {
        str = formatValue(ctx, value[key], recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (typeof name === 'undefined') {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

function isArray(ar) {
  return Array.isArray(ar) ||
         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
}

function isRegExp(re) {
  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
}

function isDate(d) {
  return typeof d === 'object' && objectToString(d) === '[object Date]';
}

function isError(e) {
  return typeof e === 'object' && objectToString(e) === '[object Error]';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

});
require.register("chai/lib/chai/utils/objDisplay.js", function(exports, require, module){
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var inspect = require('./inspect');

/**
 * ### .objDisplay (object)
 *
 * Determines if an object or an array matches
 * criteria to be inspected in-line for error
 * messages or should be truncated.
 *
 * @param {Mixed} javascript object to inspect
 * @name objDisplay
 * @api public
 */

module.exports = function (obj) {
  var str = inspect(obj)
    , type = Object.prototype.toString.call(obj);

  if (str.length >= 40) {
    if (type === '[object Function]') {
      return !obj.name || obj.name === ''
        ? '[Function]'
        : '[Function: ' + obj.name + ']';
    } else if (type === '[object Array]') {
      return '[ Array(' + obj.length + ') ]';
    } else if (type === '[object Object]') {
      var keys = Object.keys(obj)
        , kstr = keys.length > 2
          ? keys.splice(0, 2).join(', ') + ', ...'
          : keys.join(', ');
      return '{ Object (' + kstr + ') }';
    } else {
      return str;
    }
  } else {
    return str;
  }
};

});
require.register("chai/lib/chai/utils/overwriteMethod.js", function(exports, require, module){
/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### overwriteMethod (ctx, name, fn)
 *
 * Overwites an already existing method and provides
 * access to previous function. Must return function
 * to be used for name.
 *
 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
 *       return function (str) {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.value).to.equal(str);
 *         } else {
 *           _super.apply(this, arguments);
 *         }
 *       }
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.equal('bar');
 *
 * @param {Object} ctx object whose method is to be overwritten
 * @param {String} name of method to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @name overwriteMethod
 * @api public
 */

module.exports = function (ctx, name, method) {
  var _method = ctx[name]
    , _super = function () { return this; };

  if (_method && 'function' === typeof _method)
    _super = _method;

  ctx[name] = function () {
    var result = method(_super).apply(this, arguments);
    return result === undefined ? this : result;
  }
};

});
require.register("chai/lib/chai/utils/overwriteProperty.js", function(exports, require, module){
/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### overwriteProperty (ctx, name, fn)
 *
 * Overwites an already existing property getter and provides
 * access to previous value. Must return function to use as getter.
 *
 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
 *       return function () {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.name).to.equal('bar');
 *         } else {
 *           _super.call(this);
 *         }
 *       }
 *     });
 *
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.ok;
 *
 * @param {Object} ctx object whose property is to be overwritten
 * @param {String} name of property to overwrite
 * @param {Function} getter function that returns a getter function to be used for name
 * @name overwriteProperty
 * @api public
 */

module.exports = function (ctx, name, getter) {
  var _get = Object.getOwnPropertyDescriptor(ctx, name)
    , _super = function () {};

  if (_get && 'function' === typeof _get.get)
    _super = _get.get

  Object.defineProperty(ctx, name,
    { get: function () {
        var result = getter(_super).call(this);
        return result === undefined ? this : result;
      }
    , configurable: true
  });
};

});
require.register("chai/lib/chai/utils/test.js", function(exports, require, module){
/*!
 * Chai - test utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var flag = require('./flag');

/**
 * # test(object, expression)
 *
 * Test and object for expression.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 */

module.exports = function (obj, args) {
  var negate = flag(obj, 'negate')
    , expr = args[0];
  return negate ? !expr : expr;
};

});
require.register("chai/lib/chai/utils/transferFlags.js", function(exports, require, module){
/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### transferFlags(assertion, object, includeAll = true)
 *
 * Transfer all the flags for `assertion` to `object`. If
 * `includeAll` is set to `false`, then the base Chai
 * assertion flags (namely `object`, `ssfi`, and `message`)
 * will not be transferred.
 *
 *
 *     var newAssertion = new Assertion();
 *     utils.transferFlags(assertion, newAssertion);
 *
 *     var anotherAsseriton = new Assertion(myObj);
 *     utils.transferFlags(assertion, anotherAssertion, false);
 *
 * @param {Assertion} assertion the assertion to transfer the flags from
 * @param {Object} object the object to transfer the flags too; usually a new assertion
 * @param {Boolean} includeAll
 * @name getAllFlags
 * @api private
 */

module.exports = function (assertion, object, includeAll) {
  var flags = assertion.__flags || (assertion.__flags = Object.create(null));

  if (!object.__flags) {
    object.__flags = Object.create(null);
  }

  includeAll = arguments.length === 3 ? includeAll : true;

  for (var flag in flags) {
    if (includeAll ||
        (flag !== 'object' && flag !== 'ssfi' && flag != 'message')) {
      object.__flags[flag] = flags[flag];
    }
  }
};

});
require.register("chai/lib/chai/utils/type.js", function(exports, require, module){
/*!
 * Chai - type utility
 * Copyright(c) 2012-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Detectable javascript natives
 */

var natives = {
    '[object Arguments]': 'arguments'
  , '[object Array]': 'array'
  , '[object Date]': 'date'
  , '[object Function]': 'function'
  , '[object Number]': 'number'
  , '[object RegExp]': 'regexp'
  , '[object String]': 'string'
};

/**
 * ### type(object)
 *
 * Better implementation of `typeof` detection that can
 * be used cross-browser. Handles the inconsistencies of
 * Array, `null`, and `undefined` detection.
 *
 *     utils.type({}) // 'object'
 *     utils.type(null) // `null'
 *     utils.type(undefined) // `undefined`
 *     utils.type([]) // `array`
 *
 * @param {Mixed} object to detect type of
 * @name type
 * @api private
 */

module.exports = function (obj) {
  var str = Object.prototype.toString.call(obj);
  if (natives[str]) return natives[str];
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (obj === Object(obj)) return 'object';
  return typeof obj;
};

});


require.alias("chaijs-assertion-error/index.js", "chai/deps/assertion-error/index.js");
require.alias("chaijs-assertion-error/index.js", "chai/deps/assertion-error/index.js");
require.alias("chaijs-assertion-error/index.js", "assertion-error/index.js");
require.alias("chaijs-assertion-error/index.js", "chaijs-assertion-error/index.js");
require.alias("chaijs-deep-eql/lib/eql.js", "chai/deps/deep-eql/lib/eql.js");
require.alias("chaijs-deep-eql/lib/eql.js", "chai/deps/deep-eql/index.js");
require.alias("chaijs-deep-eql/lib/eql.js", "deep-eql/index.js");
require.alias("chaijs-type-detect/lib/type.js", "chaijs-deep-eql/deps/type-detect/lib/type.js");
require.alias("chaijs-type-detect/lib/type.js", "chaijs-deep-eql/deps/type-detect/index.js");
require.alias("chaijs-type-detect/lib/type.js", "chaijs-type-detect/index.js");
require.alias("chaijs-deep-eql/lib/eql.js", "chaijs-deep-eql/index.js");
require.alias("chai/index.js", "chai/index.js");if (typeof exports == "object") {
  module.exports = require("chai");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("chai"); });
} else {
  this["chai"] = require("chai");
}})();;
﻿window.module = function(name, depends, moduleFactory) {
  /*
  // TODO(sjmiles): this is too hard ... and doesn't work on polyfill :(
  var div = document.createElement('div');
  document.body.appendChild(div);
  div.innerHTML = '<polymer-element name="' + name + '"></polymer-element>';
  document.body.removeChild(div);
  */
  //
  var pe = document.createElement('polymer-element');
  pe.setAttribute('name', name);
  pe.init();
  //
  // late bind api to modules
  Polymer(name, {
    registerCallback: function() {
      var args = [];
      for (var i=0, d; depends && (d=depends[i]); i++) {
        args.push(document.createElement(d).api);
      }
      this.api = moduleFactory.apply(this, args);
    }
  });
};

window.marshal = function(name) {
  return document.createElement(name).api;
}


;


  module('utils-event', null, function() {

    'use strict';

    function defineGetter_(obj, map) {
      for (var key in map) {
        var value = map[key];
        Object.defineProperty(obj, key, {
          get: function() {
            return value;
          }
        });
      }
    }

    function makeKeyBoardEvent_(key, type, modifiers) {
      modifiers = modifiers || {};
      var evt = document.createEvent('KeyboardEvent');
      evt.initKeyboardEvent(type, true, true, window, key.name, 0,
          !! modifiers.control,
          !! modifiers.alt,
          !! modifiers.shift,
          !! modifiers.meta,
          !! modifiers.altGraph);

      evt.origin = 'mockKeyboard';
      Object.defineProperty(evt, 'keyCode', {get: function() {return key.keyCode;}});
      Object.defineProperty(evt, 'charCode', {get: function() {return key.charCode;}});
      Object.defineProperty(evt, 'which', {get: function() {return key.which;}});
      Object.defineProperty(evt, 'keyIdentifier', {get: function() {return key.keyIdentifier;}});

      return evt;
    }

    return {

      makeEvent: function(key, type, delay) {
        if (delay === undefined) {
          delay = 10;
        }
        return new Promise(function(resolve, reject) {

          window.setTimeout(function() {
            try {
              document.body.dispatchEvent(makeKeyBoardEvent_(key, type));
              resolve();
            } catch (e) {
              reject(e);
            }
          }, delay);

        });
      }
    };

  });

;


  'use strict';

  module('utils-keyboard', null, function() {
    return {
      type: function() {
        var chain = new Promise(function(resolve, reject) {
          resolve();
        });
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg && arg.getPromise) {
            chain = chain.then(arg.getPromise.bind(arg));
          }
        }
        return chain;
      }
    }
  });

;


  'use strict';

  module('utils-keycodemap', null, function() {
    // Alias and short names.
    var aliases_ = {
      '↵': 'enter',
      '\n': 'enter',
      'return': 'enter',
      ' ': 'space',
      '⇥': 'tab',
      '\t': 'tab',
      '⟵': 'backspace',
      '⇧': 'shift',
      'ctrl': 'control',
      '⌥': 'alt',
      '⌘': 'command',
      'cmd': 'command',
      'win': 'windows',
      '↑': 'up',
      '↓': 'down',
      '←': 'left',
      '→': 'right',
      '⇞': 'page up',
      'pgup': 'page up',
      '⇟': 'page down',
      'pgdn': 'page down',
      'esc': 'escape'
    };


    // Iterator variable.
    var c;
    // List of characters for programatically adding data.
    var chars_ = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      '+', '-', '=', '*', '%', '^', '$', '£', '€', '!', '?', '@', '&',
      '|', '.', ',', ';', ':', '`', '~', '-', '_',
      '(', ')', '[', ']', '{', '}', '<', '>',
      '/', '\\', "'", '"'
    ];
    // Character codes.
    var charCodes_ = {
      'backspace': 0,
      'tab': 9,
      'enter': 13,
      'shift': 0,
      'control': 0,
      'alt': 0,
      'escape': 0,
      'space': 32,
      'page up': 0,
      'page down': 0,
      'left': 0,
      'up': 0,
      'right': 0,
      'down': 0,
      'delete': 0,
      'meta': 0
    };

    // Browser specific key codes.
    var keyCodes_ = {
      'backspace': 8,
      'tab': 9,
      'enter': 13,
      'shift': 16,
      'control': 17,
      'alt': 18,
      'escape': 27,
      'space': 32,
      'page up': 33,
      'page down': 34,
      'left': 37,
      'up': 38,
      'right': 39,
      'down': 40,
      'delete': 46,
      'meta': 91,
      '0': 48, ')': 48, '1': 49, '!': 49, '2': 50, '@': 50, '€': 50,
      '3': 51, '#': 51, '£': 51, '4': 52, '$': 52, '5': 53, '%': 53,
      '6': 54, '^': 54, '7': 55, '&': 55, '8': 56, '*': 56, '9': 57,
      '(': 57, 'a': 65, 'A': 65, 'b': 66, 'B': 66, 'c': 67, 'C': 67,
      'd': 68, 'D': 68, 'e': 69, 'E': 69, 'f': 70, 'F': 70, 'g': 71,
      'G': 71, 'h': 72, 'H': 72, 'i': 73, 'I': 73, 'j': 74, 'J': 74,
      'k': 75, 'K': 75, 'l': 76, 'L': 76, 'm': 77, 'M': 77, 'n': 78,
      'N': 78, 'o': 79, 'O': 79, 'p': 80, 'P': 80, 'q': 81, 'Q': 81,
      'r': 82, 'R': 82, 's': 83, 'S': 83, 't': 84, 'T': 84, 'u': 85,
      'U': 85, 'v': 86, 'V': 86, 'w': 87, 'W': 87, 'x': 88, 'X': 88,
      'y': 89, 'Y': 89, 'z': 90, 'Z': 90, ';': 186, ':': 186, '=': 187,
      '+': 187, ',': 188, '<': 188, '-': 189, '_': 189, '.': 190,
      '>': 190, '/': 191, '?': 191, '`': 192, '~': 192, '[': 219,
      '{': 219, '\\': 220, '|': 220, ']': 221, '}': 221, "'": 222, '"': 222
    };

    // Key identifiers.
    var keyIds_ = {
      'backspace': 'U+0008',
      'tab': 'U+0009',
      'enter': 'Enter',
      'shift': 'Shift',
      'control': 'Control',
      'alt': 'Alt',
      'escape': 'U+001B',
      'space': 'U+0020',
      'page up': 'PageUp',
      'page down': 'PageDown',
      'left': 'Left',
      'up': 'Up',
      'right': 'Right',
      'down': 'Down',
      'delete': 'U+007F',
      'meta': 'Meta'
    };

    function makeUnicodeId_(keyCode) {
      return 'U+' + ('0000' + keyCode.toString(16)).toUpperCase().substr(-4);
    }

    // The text input value to use, true to use the key name.
    var textInput_ = {
      'meta': false
    };

    // add codes for all characters
    for (c = 0; c < chars_.length; c++) {
      charCodes_[chars_[c]] = chars_[c].charCodeAt(0);
      textInput_[chars_[c]] = true;
      keyIds_[chars_[c]] = makeUnicodeId_(charCodes_[chars_[c]]);
    }

    return {
      platform: 'OSX',
      locale: 'EN',
      charCodes: charCodes_,
      keyCodes: keyCodes_,
      keyIds: keyIds_,
      textInput: textInput_,
      which: keyCodes_,
      parseAlias: function(alias) {
        return aliases_[alias] || alias;
      },
      getKeyObject: function(keyName) {
        return {
          name: this.parseAlias(keyName),
          textInput: textInput_[keyName],
          charCode: charCodes_[keyName],
          keyCode: keyCodes_[keyName],
          keyIdentifier: keyIds_[keyName],
          which: keyCodes_[keyName]
        };
      }
    };
  });

;


  'use strict';

  module('utils-text', ['utils-keycodemap', 'utils-event'], function(KeyCodeMap, EventUtils) {

    var Text = function(textToType) {
      this.textToType = textToType;
    };

    Text.prototype = {

      getPromise: function() {

        var chain = new Promise(function(resolve, reject) {
          resolve();
        });

        for (var i = 0; i < this.textToType.length; i++) {
          var letter = KeyCodeMap.getKeyObject(this.textToType[i]);

          // our fake Input module, only cares about keydown and keypress, so no
          // need to fake all the other events for this POC
          // var types = ['keydown', 'keypress', 'textInput', 'keyup'];
          var types = ['keydown', 'keypress'];
          types.forEach(function(type) {
            chain = chain.then(EventUtils.makeEvent.bind(null, letter, type));
          });
        }

        return chain;
      }
    };

    return function(textToType) {
      var textInstance = new Text(textToType);
      return textInstance;
    };

  });
;


  'use strict';

  module('utils-keys', ['utils-keycodemap', 'utils-event'], function(KeyCodeMap, EventUtils) {

    var Keys = function(x) {
      this.repeatCount = 1;
      this.keysToPress = [];
      for (var i = 0; i < arguments.length; i++) {
        var key = arguments[i];
        this.keysToPress.push(KeyCodeMap.parseAlias(key));
      }
    };

    Keys.prototype = {

      repeat: function(count) {
        this.repeatCount = count;
        return this;
      },

      getPromise: function() {

        var chain = new Promise(function(resolve, reject) {
          resolve();
        });

        var types = ['keydown', 'keyup'];
        for (var i = 0; i < this.repeatCount; i++) {
          for (var k = 0; k < types.length; k++) {
            var type = types[k];
            for (var j = 0; j < this.keysToPress.length; j++) {
              var keyToPress = KeyCodeMap.getKeyObject(this.keysToPress[j]);
              chain = chain.then(
                EventUtils.makeEvent.bind(null, keyToPress, type));
            }
          }
        }

        return chain;
      }
    };

    return function(keysToPress) {
      var keysInstance = new Keys();
      Keys.apply(keysInstance, arguments);
      return keysInstance;
    };

  });

;
// Copyright (c) 2012 The Polymer Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// @version: 0.1.4
function PointerGestureEvent(a,b){var c=b||{},d=document.createEvent("Event"),e={bubbles:Boolean(c.bubbles)===c.bubbles||!0,cancelable:Boolean(c.cancelable)===c.cancelable||!0};d.initEvent(a,e.bubbles,e.cancelable);for(var f,g=Object.keys(c),h=0;h<g.length;h++)f=g[h],d[f]=c[f];return d.preventTap=this.preventTap,d}"undefined"==typeof WeakMap&&!function(){var a=Object.defineProperty,b=Date.now()%1e9,c=function(){this.name="__st"+(1e9*Math.random()>>>0)+(b++ +"__")};c.prototype={set:function(b,c){var d=b[this.name];d&&d[0]===b?d[1]=c:a(b,this.name,{value:[b,c],writable:!0})},get:function(a){var b;return(b=a[this.name])&&b[0]===a?b[1]:void 0},"delete":function(a){this.set(a,void 0)}},window.WeakMap=c}(),function(a){"use strict";function b(){function a(a){b=a}if("function"!=typeof Object.observe||"function"!=typeof Array.observe)return!1;var b=[],c={};if(Object.observe(c,a),c.id=1,c.id=2,delete c.id,Object.deliverChangeRecords(a),3!==b.length)return!1;if("new"==b[0].type&&"updated"==b[1].type&&"deleted"==b[2].type)L="new",M="updated",N="reconfigured",O="deleted";else if("add"!=b[0].type||"update"!=b[1].type||"delete"!=b[2].type)return console.error("Unexpected change record names for Object.observe. Using dirty-checking instead"),!1;return Object.unobserve(c,a),c=[0],Array.observe(c,a),c[1]=1,c.length=0,Object.deliverChangeRecords(a),2!=b.length?!1:b[0].type!=P||b[1].type!=P?!1:(Array.unobserve(c,a),!0)}function c(){if(a.document&&"securityPolicy"in a.document&&!a.document.securityPolicy.allowsEval)return!1;try{var b=new Function("","return true;");return b()}catch(c){return!1}}function d(a){return+a===a>>>0}function e(a){return+a}function f(a){return a===Object(a)}function g(a,b){return a===b?0!==a||1/a===1/b:S(a)&&S(b)?!0:a!==a&&b!==b}function h(a){return"string"!=typeof a?!1:(a=a.trim(),""==a?!0:"."==a[0]?!1:$.test(a))}function i(a,b){if(b!==_)throw Error("Use Path.get to retrieve path objects");return""==a.trim()?this:d(a)?(this.push(a),this):(a.split(/\s*\.\s*/).filter(function(a){return a}).forEach(function(a){this.push(a)},this),R&&this.length&&(this.getValueFrom=this.compiledGetValueFromFn()),void 0)}function j(a){if(a instanceof i)return a;null==a&&(a=""),"string"!=typeof a&&(a=String(a));var b=ab[a];if(b)return b;if(!h(a))return bb;var b=new i(a,_);return ab[a]=b,b}function k(b){for(var c=0;db>c&&b.check_();)c++;return a.testingExposeCycleCount&&(a.dirtyCheckCycleCount=c),c>0}function l(a){for(var b in a)return!1;return!0}function m(a){return l(a.added)&&l(a.removed)&&l(a.changed)}function n(a,b){var c={},d={},e={};for(var f in b){var g=a[f];(void 0===g||g!==b[f])&&(f in a?g!==b[f]&&(e[f]=g):d[f]=void 0)}for(var f in a)f in b||(c[f]=a[f]);return Array.isArray(a)&&a.length!==b.length&&(e.length=a.length),{added:c,removed:d,changed:e}}function o(){if(!eb.length)return!1;for(var a=0;a<eb.length;a++)eb[a]();return eb.length=0,!0}function p(){function a(a){b&&b.state_===kb&&!d&&b.check_(a)}var b,c,d=!1,e=!0;return{open:function(c){if(b)throw Error("ObservedObject in use");e||Object.deliverChangeRecords(a),b=c,e=!1},observe:function(b,d){c=b,d?Array.observe(c,a):Object.observe(c,a)},deliver:function(b){d=b,Object.deliverChangeRecords(a),d=!1},close:function(){b=void 0,Object.unobserve(c,a),gb.push(this)}}}function q(a,b,c){var d=gb.pop()||p();return d.open(a),d.observe(b,c),d}function r(){function a(b){if(f(b)){var c=i.indexOf(b);c>=0?(i[c]=void 0,h.push(b)):h.indexOf(b)<0&&(h.push(b),Object.observe(b,d)),a(Object.getPrototypeOf(b))}}function b(){if(k=!1,j){var b=i===hb?[]:i;i=h,h=b;var c;for(var f in e)c=e[f],c&&c.state_==kb&&c.iterateObjects_(a);for(var g=0;g<i.length;g++){var l=i[g];l&&Object.unobserve(l,d)}i.length=0}}function c(){k||(j=!0,k=!0,fb(b))}function d(){var a;for(var b in e)a=e[b],a&&a.state_==kb&&a.check_();c()}var e=[],g=0,h=[],i=hb,j=!1,k=!1,l={object:void 0,objects:h,open:function(b){e[b.id_]=b,g++,b.iterateObjects_(a)},close:function(a){if(e[a.id_]=void 0,g--,g)return c(),void 0;j=!1;for(var b=0;b<h.length;b++)Object.unobserve(h[b],d),t.unobservedCount++;e.length=0,h.length=0,ib.push(this)},reset:c};return l}function s(a,b){return cb&&cb.object===b||(cb=ib.pop()||r(),cb.object=b),cb.open(a),cb}function t(){this.state_=jb,this.callback_=void 0,this.target_=void 0,this.directObserver_=void 0,this.value_=void 0,this.id_=nb++}function u(a){t._allObserversCount++,pb&&ob.push(a)}function v(){t._allObserversCount--}function w(a){t.call(this),this.value_=a,this.oldObject_=void 0}function x(a){if(!Array.isArray(a))throw Error("Provided object is not an Array");w.call(this,a)}function y(a,b){t.call(this),this.object_=a,this.path_=b instanceof i?b:j(b),this.directObserver_=void 0}function z(){t.call(this),this.value_=[],this.directObserver_=void 0,this.observed_=[]}function A(a){return a}function B(a,b,c,d){this.callback_=void 0,this.target_=void 0,this.value_=void 0,this.observable_=a,this.getValueFn_=b||A,this.setValueFn_=c||A,this.dontPassThroughSet_=d}function C(a,b){if("function"==typeof Object.observe){var c=Object.getNotifier(a);return function(d,e){var f={object:a,type:d,name:b};2===arguments.length&&(f.oldValue=e),c.notify(f)}}}function D(a,b,c){for(var d={},e={},f=0;f<b.length;f++){var g=b[f];tb[g.type]?(g.name in c||(c[g.name]=g.oldValue),g.type!=M&&(g.type!=L?g.name in d?(delete d[g.name],delete c[g.name]):e[g.name]=!0:g.name in e?delete e[g.name]:d[g.name]=!0)):(console.error("Unknown changeRecord type: "+g.type),console.error(g))}for(var h in d)d[h]=a[h];for(var h in e)e[h]=void 0;var i={};for(var h in c)if(!(h in d||h in e)){var j=a[h];c[h]!==j&&(i[h]=j)}return{added:d,removed:e,changed:i}}function E(a,b,c){return{index:a,removed:b,addedCount:c}}function F(){}function G(a,b,c,d,e,f){return yb.calcSplices(a,b,c,d,e,f)}function H(a,b,c,d){return c>b||a>d?-1:b==c||d==a?0:c>a?d>b?b-c:d-c:b>d?d-a:b-a}function I(a,b,c,d){for(var e=E(b,c,d),f=!1,g=0,h=0;h<a.length;h++){var i=a[h];if(i.index+=g,!f){var j=H(e.index,e.index+e.removed.length,i.index,i.index+i.addedCount);if(j>=0){a.splice(h,1),h--,g-=i.addedCount-i.removed.length,e.addedCount+=i.addedCount-j;var k=e.removed.length+i.removed.length-j;if(e.addedCount||k){var c=i.removed;if(e.index<i.index){var l=e.removed.slice(0,i.index-e.index);Array.prototype.push.apply(l,c),c=l}if(e.index+e.removed.length>i.index+i.addedCount){var m=e.removed.slice(i.index+i.addedCount-e.index);Array.prototype.push.apply(c,m)}e.removed=c,i.index<e.index&&(e.index=i.index)}else f=!0}else if(e.index<i.index){f=!0,a.splice(h,0,e),h++;var n=e.addedCount-e.removed.length;i.index+=n,g+=n}}}f||a.push(e)}function J(a,b){for(var c=[],f=0;f<b.length;f++){var g=b[f];switch(g.type){case P:I(c,g.index,g.removed.slice(),g.addedCount);break;case L:case M:case O:if(!d(g.name))continue;var h=e(g.name);if(0>h)continue;I(c,h,[g.oldValue],1);break;default:console.error("Unexpected record type: "+JSON.stringify(g))}}return c}function K(a,b){var c=[];return J(a,b).forEach(function(b){return 1==b.addedCount&&1==b.removed.length?(b.removed[0]!==a[b.index]&&c.push(b),void 0):(c=c.concat(G(a,b.index,b.index+b.addedCount,b.removed,0,b.removed.length)),void 0)}),c}var L="add",M="update",N="reconfigure",O="delete",P="splice",Q=b(),R=c(),S=a.Number.isNaN||function(b){return"number"==typeof b&&a.isNaN(b)},T="__proto__"in{}?function(a){return a}:function(a){var b=a.__proto__;if(!b)return a;var c=Object.create(b);return Object.getOwnPropertyNames(a).forEach(function(b){Object.defineProperty(c,b,Object.getOwnPropertyDescriptor(a,b))}),c},U="[$_a-zA-Z]",V="[$_a-zA-Z0-9]",W=U+"+"+V+"*",X="(?:[0-9]|[1-9]+[0-9]+)",Y="(?:"+W+"|"+X+")",Z="(?:"+Y+")(?:\\s*\\.\\s*"+Y+")*",$=new RegExp("^"+Z+"$"),_={},ab={};i.get=j,i.prototype=T({__proto__:[],valid:!0,toString:function(){return this.join(".")},getValueFrom:function(a){for(var b=0;b<this.length;b++){if(null==a)return;a=a[this[b]]}return a},iterateObjects:function(a,b){for(var c=0;c<this.length;c++){if(c&&(a=a[this[c-1]]),!a)return;b(a)}},compiledGetValueFromFn:function(){var a=this.map(function(a){return d(a)?'["'+a+'"]':"."+a}),b="",c="obj";b+="if (obj != null";for(var e=0;e<this.length-1;e++){{this[e]}c+=a[e],b+=" &&\n     "+c+" != null"}return b+=")\n",c+=a[e],b+="  return "+c+";\nelse\n  return undefined;",new Function("obj",b)},setValueFrom:function(a,b){if(!this.length)return!1;for(var c=0;c<this.length-1;c++){if(!f(a))return!1;a=a[this[c]]}return f(a)?(a[this[c]]=b,!0):!1}});var bb=new i("",_);bb.valid=!1,bb.getValueFrom=bb.setValueFrom=function(){};var cb,db=1e3,eb=[],fb=Q?function(){var a={pingPong:!0},b=!1;return Object.observe(a,function(){o(),b=!1}),function(c){eb.push(c),b||(b=!0,a.pingPong=!a.pingPong)}}():function(){return function(a){eb.push(a)}}(),gb=[],hb=[],ib=[],jb=0,kb=1,lb=2,mb=3,nb=1;t.prototype={open:function(a,b){if(this.state_!=jb)throw Error("Observer has already been opened.");return u(this),this.callback_=a,this.target_=b,this.state_=kb,this.connect_(),this.value_},close:function(){this.state_==kb&&(v(this),this.state_=lb,this.disconnect_(),this.value_=void 0,this.callback_=void 0,this.target_=void 0)},deliver:function(){this.state_==kb&&k(this)},report_:function(a){try{this.callback_.apply(this.target_,a)}catch(b){t._errorThrownDuringCallback=!0,console.error("Exception caught during observer callback: "+(b.stack||b))}},discardChanges:function(){return this.check_(void 0,!0),this.value_}};var ob,pb=!Q;t._allObserversCount=0,pb&&(ob=[]);var qb=!1,rb="function"==typeof Object.deliverAllChangeRecords;a.Platform=a.Platform||{},a.Platform.performMicrotaskCheckpoint=function(){if(!qb){if(rb)return Object.deliverAllChangeRecords(),void 0;if(pb){qb=!0;var b,c,d=0;do{d++,c=ob,ob=[],b=!1;for(var e=0;e<c.length;e++){var f=c[e];f.state_==kb&&(f.check_()&&(b=!0),ob.push(f))}o()&&(b=!0)}while(db>d&&b);a.testingExposeCycleCount&&(a.dirtyCheckCycleCount=d),qb=!1}}},pb&&(a.Platform.clearObservers=function(){ob=[]}),w.prototype=T({__proto__:t.prototype,arrayObserve:!1,connect_:function(){Q?this.directObserver_=q(this,this.value_,this.arrayObserve):this.oldObject_=this.copyObject(this.value_)},copyObject:function(a){var b=Array.isArray(a)?[]:{};for(var c in a)b[c]=a[c];return Array.isArray(a)&&(b.length=a.length),b},check_:function(a){var b,c;if(Q){if(!a)return!1;c={},b=D(this.value_,a,c)}else c=this.oldObject_,b=n(this.value_,this.oldObject_);return m(b)?!1:(Q||(this.oldObject_=this.copyObject(this.value_)),this.report_([b.added||{},b.removed||{},b.changed||{},function(a){return c[a]}]),!0)},disconnect_:function(){Q?(this.directObserver_.close(),this.directObserver_=void 0):this.oldObject_=void 0},deliver:function(){this.state_==kb&&(Q?this.directObserver_.deliver(!1):k(this))},discardChanges:function(){return this.directObserver_?this.directObserver_.deliver(!0):this.oldObject_=this.copyObject(this.value_),this.value_}}),x.prototype=T({__proto__:w.prototype,arrayObserve:!0,copyObject:function(a){return a.slice()},check_:function(a){var b;if(Q){if(!a)return!1;b=K(this.value_,a)}else b=G(this.value_,0,this.value_.length,this.oldObject_,0,this.oldObject_.length);return b&&b.length?(Q||(this.oldObject_=this.copyObject(this.value_)),this.report_([b]),!0):!1}}),x.applySplices=function(a,b,c){c.forEach(function(c){for(var d=[c.index,c.removed.length],e=c.index;e<c.index+c.addedCount;)d.push(b[e]),e++;Array.prototype.splice.apply(a,d)})},y.prototype=T({__proto__:t.prototype,connect_:function(){Q&&(this.directObserver_=s(this,this.object_)),this.check_(void 0,!0)},disconnect_:function(){this.value_=void 0,this.directObserver_&&(this.directObserver_.close(this),this.directObserver_=void 0)},iterateObjects_:function(a){this.path_.iterateObjects(this.object_,a)},check_:function(a,b){var c=this.value_;return this.value_=this.path_.getValueFrom(this.object_),b||g(this.value_,c)?!1:(this.report_([this.value_,c]),!0)},setValue:function(a){this.path_&&this.path_.setValueFrom(this.object_,a)}});var sb={};z.prototype=T({__proto__:t.prototype,connect_:function(){if(this.check_(void 0,!0),Q){for(var a,b=!1,c=0;c<this.observed_.length;c+=2)if(a=this.observed_[c],a!==sb){b=!0;break}return this.directObserver_?b?(this.directObserver_.reset(),void 0):(this.directObserver_.close(),this.directObserver_=void 0,void 0):(b&&(this.directObserver_=s(this,a)),void 0)}},closeObservers_:function(){for(var a=0;a<this.observed_.length;a+=2)this.observed_[a]===sb&&this.observed_[a+1].close();this.observed_.length=0},disconnect_:function(){this.value_=void 0,this.directObserver_&&(this.directObserver_.close(this),this.directObserver_=void 0),this.closeObservers_()},addPath:function(a,b){if(this.state_!=jb&&this.state_!=mb)throw Error("Cannot add paths once started.");this.observed_.push(a,b instanceof i?b:j(b))},addObserver:function(a){if(this.state_!=jb&&this.state_!=mb)throw Error("Cannot add observers once started.");a.open(this.deliver,this),this.observed_.push(sb,a)},startReset:function(){if(this.state_!=kb)throw Error("Can only reset while open");this.state_=mb,this.closeObservers_()},finishReset:function(){if(this.state_!=mb)throw Error("Can only finishReset after startReset");return this.state_=kb,this.connect_(),this.value_},iterateObjects_:function(a){for(var b,c=0;c<this.observed_.length;c+=2)b=this.observed_[c],b!==sb&&this.observed_[c+1].iterateObjects(b,a)},check_:function(a,b){for(var c,d=0;d<this.observed_.length;d+=2){var e=this.observed_[d+1],f=this.observed_[d],h=f===sb?e.discardChanges():e.getValueFrom(f);b?this.value_[d/2]=h:g(h,this.value_[d/2])||(c=c||[],c[d/2]=this.value_[d/2],this.value_[d/2]=h)}return c?(this.report_([this.value_,c,this.observed_]),!0):!1}}),B.prototype={open:function(a,b){return this.callback_=a,this.target_=b,this.value_=this.getValueFn_(this.observable_.open(this.observedCallback_,this)),this.value_},observedCallback_:function(a){if(a=this.getValueFn_(a),!g(a,this.value_)){var b=this.value_;this.value_=a,this.callback_.call(this.target_,this.value_,b)}},discardChanges:function(){return this.value_=this.getValueFn_(this.observable_.discardChanges()),this.value_},deliver:function(){return this.observable_.deliver()},setValue:function(a){return a=this.setValueFn_(a),!this.dontPassThroughSet_&&this.observable_.setValue?this.observable_.setValue(a):void 0},close:function(){this.observable_&&this.observable_.close(),this.callback_=void 0,this.target_=void 0,this.observable_=void 0,this.value_=void 0,this.getValueFn_=void 0,this.setValueFn_=void 0}};var tb={};tb[L]=!0,tb[M]=!0,tb[O]=!0,t.defineComputedProperty=function(a,b,c){var d=C(a,b),e=c.open(function(a,b){e=a,d&&d(M,b)});return Object.defineProperty(a,b,{get:function(){return c.deliver(),e},set:function(a){return c.setValue(a),a},configurable:!0}),{close:function(){c.close(),Object.defineProperty(a,b,{value:e,writable:!0,configurable:!0})}}};var ub=0,vb=1,wb=2,xb=3;F.prototype={calcEditDistances:function(a,b,c,d,e,f){for(var g=f-e+1,h=c-b+1,i=new Array(g),j=0;g>j;j++)i[j]=new Array(h),i[j][0]=j;for(var k=0;h>k;k++)i[0][k]=k;for(var j=1;g>j;j++)for(var k=1;h>k;k++)if(this.equals(a[b+k-1],d[e+j-1]))i[j][k]=i[j-1][k-1];else{var l=i[j-1][k]+1,m=i[j][k-1]+1;i[j][k]=m>l?l:m}return i},spliceOperationsFromEditDistances:function(a){for(var b=a.length-1,c=a[0].length-1,d=a[b][c],e=[];b>0||c>0;)if(0!=b)if(0!=c){var f,g=a[b-1][c-1],h=a[b-1][c],i=a[b][c-1];f=i>h?g>h?h:g:g>i?i:g,f==g?(g==d?e.push(ub):(e.push(vb),d=g),b--,c--):f==h?(e.push(xb),b--,d=h):(e.push(wb),c--,d=i)}else e.push(xb),b--;else e.push(wb),c--;return e.reverse(),e},calcSplices:function(a,b,c,d,e,f){var g=0,h=0,i=Math.min(c-b,f-e);if(0==b&&0==e&&(g=this.sharedPrefix(a,d,i)),c==a.length&&f==d.length&&(h=this.sharedSuffix(a,d,i-g)),b+=g,e+=g,c-=h,f-=h,c-b==0&&f-e==0)return[];if(b==c){for(var j=E(b,[],0);f>e;)j.removed.push(d[e++]);return[j]}if(e==f)return[E(b,[],c-b)];for(var k=this.spliceOperationsFromEditDistances(this.calcEditDistances(a,b,c,d,e,f)),j=void 0,l=[],m=b,n=e,o=0;o<k.length;o++)switch(k[o]){case ub:j&&(l.push(j),j=void 0),m++,n++;break;case vb:j||(j=E(m,[],0)),j.addedCount++,m++,j.removed.push(d[n]),n++;break;case wb:j||(j=E(m,[],0)),j.addedCount++,m++;break;case xb:j||(j=E(m,[],0)),j.removed.push(d[n]),n++}return j&&l.push(j),l},sharedPrefix:function(a,b,c){for(var d=0;c>d;d++)if(!this.equals(a[d],b[d]))return d;return c},sharedSuffix:function(a,b,c){for(var d=a.length,e=b.length,f=0;c>f&&this.equals(a[--d],b[--e]);)f++;return f},calculateSplices:function(a,b){return this.calcSplices(a,0,a.length,b,0,b.length)},equals:function(a,b){return a===b}};var yb=new F;a.Observer=t,a.Observer.runEOM_=fb,a.Observer.hasObjectObserve=Q,a.ArrayObserver=x,a.ArrayObserver.calculateSplices=function(a,b){return yb.calculateSplices(a,b)},a.ArraySplice=F,a.ObjectObserver=w,a.PathObserver=y,a.CompoundObserver=z,a.Path=i,a.ObserverTransform=B,a.Observer.changeRecordTypes={add:L,update:M,reconfigure:N,"delete":O,splice:P}}("undefined"!=typeof global&&global&&"undefined"!=typeof module&&module?global:this||window),window.Platform=window.Platform||{},window.logFlags=window.logFlags||{},function(a){var b=a.flags||{};location.search.slice(1).split("&").forEach(function(a){a=a.split("="),a[0]&&(b[a[0]]=a[1]||!0)}),b.shadow=b.shadow||b.shadowdom||b.polyfill,b.shadow="native"===b.shadow?!1:b.shadow||!HTMLElement.prototype.createShadowRoot&&"polyfill",a.flags=b}(Platform),"polyfill"===Platform.flags.shadow?(window.ShadowDOMPolyfill={},function(a){"use strict";function b(a){if(!a)throw new Error("Assertion failed")}function c(a,b){return L(b).forEach(function(c){K(a,c,M(b,c))}),a}function d(a,b){return L(b).forEach(function(c){switch(c){case"arguments":case"caller":case"length":case"name":case"prototype":case"toString":return}K(a,c,M(b,c))}),a}function e(a,b){for(var c=0;c<b.length;c++)if(b[c]in a)return b[c]}function f(a){var b=a.__proto__||Object.getPrototypeOf(a),c=E.get(b);if(c)return c;var d=f(b),e=t(d);return q(b,e,a),e}function g(a,b){o(a,b,!0)}function h(a,b){o(b,a,!1)}function i(a){return/^on[a-z]+$/.test(a)}function j(a){return/^\w[a-zA-Z_0-9]*$/.test(a)}function k(a){return H&&j(a)?new Function("return this.impl."+a):function(){return this.impl[a]}}function l(a){return H&&j(a)?new Function("v","this.impl."+a+" = v"):function(b){this.impl[a]=b}}function m(a){return H&&j(a)?new Function("return this.impl."+a+".apply(this.impl, arguments)"):function(){return this.impl[a].apply(this.impl,arguments)}}function n(a,b){try{return Object.getOwnPropertyDescriptor(a,b)}catch(c){return O}}function o(b,c,d){for(var e=L(b),f=0;f<e.length;f++){var g=e[f];if("polymerBlackList_"!==g&&!(g in c||b.polymerBlackList_&&b.polymerBlackList_[g])){N&&b.__lookupGetter__(g);var h,j,o=n(b,g);if(d&&"function"==typeof o.value)c[g]=m(g);else{var p=i(g);h=p?a.getEventHandlerGetter(g):k(g),(o.writable||o.set)&&(j=p?a.getEventHandlerSetter(g):l(g)),K(c,g,{get:h,set:j,configurable:o.configurable,enumerable:o.enumerable})}}}}function p(a,b,c){var e=a.prototype;q(e,b,c),d(b,a)}function q(a,c,d){var e=c.prototype;b(void 0===E.get(a)),E.set(a,c),F.set(e,a),g(a,e),d&&h(e,d),K(e,"constructor",{value:c,configurable:!0,enumerable:!1,writable:!0})}function r(a,b){return E.get(b.prototype)===a}function s(a){var b=Object.getPrototypeOf(a),c=f(b),d=t(c);return q(b,d,a),d}function t(a){function b(b){a.call(this,b)}return b.prototype=Object.create(a.prototype),b.prototype.constructor=b,b}function u(a){return a instanceof G.EventTarget||a instanceof G.Event||a instanceof G.Range||a instanceof G.DOMImplementation||a instanceof G.CanvasRenderingContext2D||G.WebGLRenderingContext&&a instanceof G.WebGLRenderingContext}function v(a){return Q&&a instanceof Q||a instanceof S||a instanceof R||a instanceof T||a instanceof U||a instanceof P||a instanceof V||W&&a instanceof W||X&&a instanceof X}function w(a){return null===a?null:(b(v(a)),a.polymerWrapper_||(a.polymerWrapper_=new(f(a))(a)))}function x(a){return null===a?null:(b(u(a)),a.impl)}function y(a){return a&&u(a)?x(a):a}function z(a){return a&&!u(a)?w(a):a}function A(a,c){null!==c&&(b(v(a)),b(void 0===c||u(c)),a.polymerWrapper_=c)}function B(a,b,c){K(a.prototype,b,{get:c,configurable:!0,enumerable:!0})}function C(a,b){B(a,b,function(){return w(this.impl[b])})}function D(a,b){a.forEach(function(a){b.forEach(function(b){a.prototype[b]=function(){var a=z(this);return a[b].apply(a,arguments)}})})}var E=new WeakMap,F=new WeakMap,G=Object.create(null),H=!("securityPolicy"in document)||document.securityPolicy.allowsEval;if(H)try{var I=new Function("","return true;");H=I()}catch(J){H=!1}var K=Object.defineProperty,L=Object.getOwnPropertyNames,M=Object.getOwnPropertyDescriptor;L(window);var N=/Firefox/.test(navigator.userAgent),O={get:function(){},set:function(){},configurable:!0,enumerable:!0},P=window.DOMImplementation,Q=window.EventTarget,R=window.Event,S=window.Node,T=window.Window,U=window.Range,V=window.CanvasRenderingContext2D,W=window.WebGLRenderingContext,X=window.SVGElementInstance;a.assert=b,a.constructorTable=E,a.defineGetter=B,a.defineWrapGetter=C,a.forwardMethodsToWrapper=D,a.isWrapper=u,a.isWrapperFor=r,a.mixin=c,a.nativePrototypeTable=F,a.oneOf=e,a.registerObject=s,a.registerWrapper=p,a.rewrap=A,a.unwrap=x,a.unwrapIfNeeded=y,a.wrap=w,a.wrapIfNeeded=z,a.wrappers=G}(window.ShadowDOMPolyfill),function(a){"use strict";function b(){g=!1;var a=f.slice(0);f=[];for(var b=0;b<a.length;b++)a[b]()}function c(a){f.push(a),g||(g=!0,d(b,0))}var d,e=window.MutationObserver,f=[],g=!1;if(e){var h=1,i=new e(b),j=document.createTextNode(h);i.observe(j,{characterData:!0}),d=function(){h=(h+1)%2,j.data=h}}else d=window.setImmediate||window.setTimeout;a.setEndOfMicrotask=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(){p||(k(c),p=!0)}function c(){p=!1;do for(var a=o.slice(),b=!1,c=0;c<a.length;c++){var d=a[c],e=d.takeRecords();f(d),e.length&&(d.callback_(e,d),b=!0)}while(b)}function d(a,b){this.type=a,this.target=b,this.addedNodes=new m.NodeList,this.removedNodes=new m.NodeList,this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function e(a,b){for(;a;a=a.parentNode){var c=n.get(a);if(c)for(var d=0;d<c.length;d++){var e=c[d];e.options.subtree&&e.addTransientObserver(b)}}}function f(a){for(var b=0;b<a.nodes_.length;b++){var c=a.nodes_[b],d=n.get(c);if(!d)return;for(var e=0;e<d.length;e++){var f=d[e];f.observer===a&&f.removeTransientObservers()}}}function g(a,c,e){for(var f=Object.create(null),g=Object.create(null),h=a;h;h=h.parentNode){var i=n.get(h);if(i)for(var j=0;j<i.length;j++){var k=i[j],l=k.options;if((h===a||l.subtree)&&!("attributes"===c&&!l.attributes||"attributes"===c&&l.attributeFilter&&(null!==e.namespace||-1===l.attributeFilter.indexOf(e.name))||"characterData"===c&&!l.characterData||"childList"===c&&!l.childList)){var m=k.observer;f[m.uid_]=m,("attributes"===c&&l.attributeOldValue||"characterData"===c&&l.characterDataOldValue)&&(g[m.uid_]=e.oldValue)}}}var o=!1;for(var p in f){var m=f[p],q=new d(c,a);"name"in e&&"namespace"in e&&(q.attributeName=e.name,q.attributeNamespace=e.namespace),e.addedNodes&&(q.addedNodes=e.addedNodes),e.removedNodes&&(q.removedNodes=e.removedNodes),e.previousSibling&&(q.previousSibling=e.previousSibling),e.nextSibling&&(q.nextSibling=e.nextSibling),void 0!==g[p]&&(q.oldValue=g[p]),m.records_.push(q),o=!0}o&&b()}function h(a){if(this.childList=!!a.childList,this.subtree=!!a.subtree,this.attributes="attributes"in a||!("attributeOldValue"in a||"attributeFilter"in a)?!!a.attributes:!0,this.characterData="characterDataOldValue"in a&&!("characterData"in a)?!0:!!a.characterData,!this.attributes&&(a.attributeOldValue||"attributeFilter"in a)||!this.characterData&&a.characterDataOldValue)throw new TypeError;if(this.characterData=!!a.characterData,this.attributeOldValue=!!a.attributeOldValue,this.characterDataOldValue=!!a.characterDataOldValue,"attributeFilter"in a){if(null==a.attributeFilter||"object"!=typeof a.attributeFilter)throw new TypeError;this.attributeFilter=q.call(a.attributeFilter)}else this.attributeFilter=null}function i(a){this.callback_=a,this.nodes_=[],this.records_=[],this.uid_=++r,o.push(this)}function j(a,b,c){this.observer=a,this.target=b,this.options=c,this.transientObservedNodes=[]}var k=a.setEndOfMicrotask,l=a.wrapIfNeeded,m=a.wrappers,n=new WeakMap,o=[],p=!1,q=Array.prototype.slice,r=0;i.prototype={observe:function(a,b){a=l(a);var c,d=new h(b),e=n.get(a);e||n.set(a,e=[]);for(var f=0;f<e.length;f++)e[f].observer===this&&(c=e[f],c.removeTransientObservers(),c.options=d);c||(c=new j(this,a,d),e.push(c),this.nodes_.push(a))},disconnect:function(){this.nodes_.forEach(function(a){for(var b=n.get(a),c=0;c<b.length;c++){var d=b[c];if(d.observer===this){b.splice(c,1);break}}},this),this.records_=[]},takeRecords:function(){var a=this.records_;return this.records_=[],a}},j.prototype={addTransientObserver:function(a){if(a!==this.target){this.transientObservedNodes.push(a);var b=n.get(a);b||n.set(a,b=[]),b.push(this)}},removeTransientObservers:function(){var a=this.transientObservedNodes;this.transientObservedNodes=[];for(var b=0;b<a.length;b++)for(var c=a[b],d=n.get(c),e=0;e<d.length;e++)if(d[e]===this){d.splice(e,1);break}}},a.enqueueMutation=g,a.registerTransientObservers=e,a.wrappers.MutationObserver=i,a.wrappers.MutationRecord=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){return a instanceof Q.ShadowRoot}function c(a){var b=a.localName;return"content"===b||"shadow"===b}function d(a){return!!a.shadowRoot}function e(a){var b;return a.parentNode||(b=a.defaultView)&&P(b)||null}function f(f,g,h){if(h.length)return h.shift();if(b(f))return j(f)||f.host;var i=a.eventParentsTable.get(f);if(i){for(var k=1;k<i.length;k++)h[k-1]=i[k];return i[0]}if(g&&c(f)){var l=f.parentNode;if(l&&d(l))for(var m=a.getShadowTrees(l),n=j(g),k=0;k<m.length;k++)if(m[k].contains(n))return n}return e(f)}function g(a){for(var d=[],e=a,g=[],i=[];e;){var j=null;if(c(e)){j=h(d);var k=d[d.length-1]||e;d.push(k)}else d.length||d.push(e);var l=d[d.length-1];g.push({target:l,currentTarget:e}),b(e)&&d.pop(),e=f(e,j,i)}return g}function h(a){for(var b=a.length-1;b>=0;b--)if(!c(a[b]))return a[b];return null}function i(a,d){for(var e=[];a;){for(var g=[],i=d,j=void 0;i;){var l=null;if(g.length){if(c(i)&&(l=h(g),k(j))){var n=g[g.length-1];g.push(n)}}else g.push(i);if(m(i,a))return g[g.length-1];b(i)&&g.pop(),j=i,i=f(i,l,e)}a=b(a)?a.host:a.parentNode}}function j(b){return a.insertionParentTable.get(b)}function k(a){return j(a)}function l(a){for(var b;b=a.parentNode;)a=b;return a}function m(a,b){return l(a)===l(b)}function n(a,b){return a===b?!0:a instanceof Q.ShadowRoot?n(l(a.host),b):!1}function o(a){return S.get(a)?void 0:(S.set(a,!0),p(P(a),P(a.target)))}function p(b,c){if(T.get(b))throw new Error("InvalidStateError");T.set(b,!0),a.renderAllPending();var d=g(c);return"load"===b.type&&2===d.length&&d[0].target instanceof Q.Document&&d.shift(),_.set(b,d),q(b,d)&&r(b,d)&&s(b,d),X.set(b,v.NONE),V.delete(b,null),T.delete(b),b.defaultPrevented}function q(a,b){for(var c,d=b.length-1;d>0;d--){var e=b[d].target,f=b[d].currentTarget;if(e!==f&&(c=v.CAPTURING_PHASE,!t(b[d],a,c)))return!1}return!0}function r(a,b){var c=v.AT_TARGET;return t(b[0],a,c)}function s(a,b){for(var c,d=a.bubbles,e=1;e<b.length;e++){var f=b[e].target,g=b[e].currentTarget;if(f===g)c=v.AT_TARGET;else{if(!d||Z.get(a))continue;c=v.BUBBLING_PHASE}if(!t(b[e],a,c))return}}function t(a,b,c){var d=a.target,e=a.currentTarget,f=R.get(e);if(!f)return!0;if("relatedTarget"in b){var g=O(b);if(g.relatedTarget){var h=P(g.relatedTarget),j=i(e,h);if(j===d)return!0;W.set(b,j)}}X.set(b,c);var k=b.type,l=!1;U.set(b,d),V.set(b,e);for(var m=0;m<f.length;m++){var n=f[m];if(n.removed)l=!0;else if(!(n.type!==k||!n.capture&&c===v.CAPTURING_PHASE||n.capture&&c===v.BUBBLING_PHASE))try{if("function"==typeof n.handler?n.handler.call(e,b):n.handler.handleEvent(b),Z.get(b))return!1}catch(o){window.onerror?window.onerror(o.message):console.error(o,o.stack)}}if(l){var p=f.slice();f.length=0;for(var m=0;m<p.length;m++)p[m].removed||f.push(p[m])}return!Y.get(b)}function u(a,b,c){this.type=a,this.handler=b,this.capture=Boolean(c)}function v(a,b){return a instanceof ab?(this.impl=a,void 0):P(z(ab,"Event",a,b))}function w(a){return a&&a.relatedTarget?Object.create(a,{relatedTarget:{value:O(a.relatedTarget)}}):a}function x(a,b,c){var d=window[a],e=function(b,c){return b instanceof d?(this.impl=b,void 0):P(z(d,a,b,c))};if(e.prototype=Object.create(b.prototype),c&&M(e.prototype,c),d)try{N(d,e,new d("temp"))}catch(f){N(d,e,document.createEvent(a))}return e}function y(a,b){return function(){arguments[b]=O(arguments[b]);var c=O(this);c[a].apply(c,arguments)}}function z(a,b,c,d){if(jb)return new a(c,w(d));var e=O(document.createEvent(b)),f=ib[b],g=[c];return Object.keys(f).forEach(function(a){var b=null!=d&&a in d?d[a]:f[a];"relatedTarget"===a&&(b=O(b)),g.push(b)}),e["init"+b].apply(e,g),e}function A(){v.call(this)}function B(a){return"function"==typeof a?!0:a&&a.handleEvent}function C(a){switch(a){case"DOMAttrModified":case"DOMAttributeNameChanged":case"DOMCharacterDataModified":case"DOMElementNameChanged":case"DOMNodeInserted":case"DOMNodeInsertedIntoDocument":case"DOMNodeRemoved":case"DOMNodeRemovedFromDocument":case"DOMSubtreeModified":return!0}return!1}function D(a){this.impl=a}function E(a){return a instanceof Q.ShadowRoot&&(a=a.host),O(a)}function F(a,b){var c=R.get(a);if(c)for(var d=0;d<c.length;d++)if(!c[d].removed&&c[d].type===b)return!0;return!1}function G(a,b){for(var c=O(a);c;c=c.parentNode)if(F(P(c),b))return!0;return!1}function H(a){L(a,mb)}function I(b,c,d,e){a.renderAllPending();for(var f=P(nb.call(c.impl,d,e)),h=g(f,this),i=0;i<h.length;i++){var j=h[i];if(j.currentTarget===b)return j.target}return null}function J(a){return function(){var b=$.get(this);return b&&b[a]&&b[a].value||null}}function K(a){var b=a.slice(2);return function(c){var d=$.get(this);d||(d=Object.create(null),$.set(this,d));var e=d[a];if(e&&this.removeEventListener(b,e.wrapped,!1),"function"==typeof c){var f=function(b){var d=c.call(this,b);d===!1?b.preventDefault():"onbeforeunload"===a&&"string"==typeof d&&(b.returnValue=d)};this.addEventListener(b,f,!1),d[a]={value:c,wrapped:f}}}}var L=a.forwardMethodsToWrapper,M=a.mixin,N=a.registerWrapper,O=a.unwrap,P=a.wrap,Q=a.wrappers,R=(new WeakMap,new WeakMap),S=new WeakMap,T=new WeakMap,U=new WeakMap,V=new WeakMap,W=new WeakMap,X=new WeakMap,Y=new WeakMap,Z=new WeakMap,$=new WeakMap,_=new WeakMap;u.prototype={equals:function(a){return this.handler===a.handler&&this.type===a.type&&this.capture===a.capture},get removed(){return null===this.handler},remove:function(){this.handler=null}};var ab=window.Event;ab.prototype.polymerBlackList_={returnValue:!0,keyLocation:!0},v.prototype={get target(){return U.get(this)},get currentTarget(){return V.get(this)},get eventPhase(){return X.get(this)},get path(){var a=new Q.NodeList,b=_.get(this);if(b){for(var c=0,d=b.length-1,e=l(V.get(this)),f=0;d>=f;f++){var g=b[f].currentTarget,h=l(g);n(e,h)&&(f!==d||g instanceof Q.Node)&&(a[c++]=g)}a.length=c}return a},stopPropagation:function(){Y.set(this,!0)},stopImmediatePropagation:function(){Y.set(this,!0),Z.set(this,!0)}},N(ab,v,document.createEvent("Event"));var bb=x("UIEvent",v),cb=x("CustomEvent",v),db={get relatedTarget(){return W.get(this)||P(O(this).relatedTarget)}},eb=M({initMouseEvent:y("initMouseEvent",14)},db),fb=M({initFocusEvent:y("initFocusEvent",5)},db),gb=x("MouseEvent",bb,eb),hb=x("FocusEvent",bb,fb),ib=Object.create(null),jb=function(){try{new window.FocusEvent("focus")}catch(a){return!1}return!0}();if(!jb){var kb=function(a,b,c){if(c){var d=ib[c];b=M(M({},d),b)}ib[a]=b};kb("Event",{bubbles:!1,cancelable:!1}),kb("CustomEvent",{detail:null},"Event"),kb("UIEvent",{view:null,detail:0},"Event"),kb("MouseEvent",{screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:null},"UIEvent"),kb("FocusEvent",{relatedTarget:null},"UIEvent")}A.prototype=Object.create(v.prototype),M(A.prototype,{get returnValue(){return this.impl.returnValue},set returnValue(a){this.impl.returnValue=a
}});var lb=window.EventTarget,mb=["addEventListener","removeEventListener","dispatchEvent"];[Node,Window].forEach(function(a){var b=a.prototype;mb.forEach(function(a){Object.defineProperty(b,a+"_",{value:b[a]})})}),D.prototype={addEventListener:function(a,b,c){if(B(b)&&!C(a)){var d=new u(a,b,c),e=R.get(this);if(e){for(var f=0;f<e.length;f++)if(d.equals(e[f]))return}else e=[],R.set(this,e);e.push(d);var g=E(this);g.addEventListener_(a,o,!0)}},removeEventListener:function(a,b,c){c=Boolean(c);var d=R.get(this);if(d){for(var e=0,f=!1,g=0;g<d.length;g++)d[g].type===a&&d[g].capture===c&&(e++,d[g].handler===b&&(f=!0,d[g].remove()));if(f&&1===e){var h=E(this);h.removeEventListener_(a,o,!0)}}},dispatchEvent:function(b){var c=O(b),d=c.type;S.set(c,!1),a.renderAllPending();var e;G(this,d)||(e=function(){},this.addEventListener(d,e,!0));try{return O(this).dispatchEvent_(c)}finally{e&&this.removeEventListener(d,e,!0)}}},lb&&N(lb,D);var nb=document.elementFromPoint;a.adjustRelatedTarget=i,a.elementFromPoint=I,a.getEventHandlerGetter=J,a.getEventHandlerSetter=K,a.wrapEventTargetMethods=H,a.wrappers.BeforeUnloadEvent=A,a.wrappers.CustomEvent=cb,a.wrappers.Event=v,a.wrappers.EventTarget=D,a.wrappers.FocusEvent=hb,a.wrappers.MouseEvent=gb,a.wrappers.UIEvent=bb}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a,b){Object.defineProperty(a,b,{enumerable:!1})}function c(){this.length=0,b(this,"length")}function d(a){if(null==a)return a;for(var b=new c,d=0,e=a.length;e>d;d++)b[d]=f(a[d]);return b.length=e,b}function e(a,b){a.prototype[b]=function(){return d(this.impl[b].apply(this.impl,arguments))}}var f=a.wrap;c.prototype={item:function(a){return this[a]}},b(c.prototype,"item"),a.wrappers.NodeList=c,a.addWrapNodeListMethod=e,a.wrapNodeList=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){w(a instanceof t)}function c(a){var b=new v;return b[0]=a,b.length=1,b}function d(a,b,c){y(b,"childList",{removedNodes:c,previousSibling:a.previousSibling,nextSibling:a.nextSibling})}function e(a,b){y(a,"childList",{removedNodes:b})}function f(a,b,d,e){if(a instanceof DocumentFragment){var f=h(a);G=!0;for(var g=f.length-1;g>=0;g--)a.removeChild(f[g]),f[g].parentNode_=b;G=!1;for(var g=0;g<f.length;g++)f[g].previousSibling_=f[g-1]||d,f[g].nextSibling_=f[g+1]||e;return d&&(d.nextSibling_=f[0]),e&&(e.previousSibling_=f[f.length-1]),f}var f=c(a),i=a.parentNode;return i&&i.removeChild(a),a.parentNode_=b,a.previousSibling_=d,a.nextSibling_=e,d&&(d.nextSibling_=a),e&&(e.previousSibling_=a),f}function g(a){if(a instanceof DocumentFragment)return h(a);var b=c(a),e=a.parentNode;return e&&d(a,e,b),b}function h(a){for(var b=new v,c=0,d=a.firstChild;d;d=d.nextSibling)b[c++]=d;return b.length=c,e(a,b),b}function i(a){return a}function j(a){a.nodeIsInserted_()}function k(a){for(var b=0;b<a.length;b++)j(a[b])}function l(){}function m(){}function n(a,b){var c=a.nodeType===t.DOCUMENT_NODE?a:a.ownerDocument;c!==b.ownerDocument&&c.adoptNode(b)}function o(b,c){if(c.length){var d=b.ownerDocument;if(d!==c[0].ownerDocument)for(var e=0;e<c.length;e++)a.adoptNodeNoRemove(c[e],d)}}function p(a,b){o(a,b);var c=b.length;if(1===c)return D(b[0]);for(var d=D(a.ownerDocument.createDocumentFragment()),e=0;c>e;e++)d.appendChild(D(b[e]));return d}function q(a){if(void 0!==a.firstChild_)for(var b=a.firstChild_;b;){var c=b;b=b.nextSibling_,c.parentNode_=c.previousSibling_=c.nextSibling_=void 0}a.firstChild_=a.lastChild_=void 0}function r(a){if(a.invalidateShadowRenderer()){for(var b=a.firstChild;b;){w(b.parentNode===a);var c=b.nextSibling,d=D(b),e=d.parentNode;e&&L.call(e,d),b.previousSibling_=b.nextSibling_=b.parentNode_=null,b=c}a.firstChild_=a.lastChild_=null}else for(var c,f=D(a),g=f.firstChild;g;)c=g.nextSibling,L.call(f,g),g=c}function s(a){var b=a.parentNode;return b&&b.invalidateShadowRenderer()}function t(a){w(a instanceof H),u.call(this,a),this.parentNode_=void 0,this.firstChild_=void 0,this.lastChild_=void 0,this.nextSibling_=void 0,this.previousSibling_=void 0}var u=a.wrappers.EventTarget,v=a.wrappers.NodeList,w=a.assert,x=a.defineWrapGetter,y=a.enqueueMutation,z=a.isWrapper,A=a.mixin,B=a.registerTransientObservers,C=a.registerWrapper,D=a.unwrap,E=a.wrap,F=a.wrapIfNeeded,G=!1,H=window.Node,I=window.DocumentFragment,J=(H.prototype.appendChild,H.prototype.compareDocumentPosition),K=H.prototype.insertBefore,L=H.prototype.removeChild,M=H.prototype.replaceChild,N=/Trident/.test(navigator.userAgent),O=N?function(a,b){try{L.call(a,b)}catch(c){if(!(a instanceof I))throw c}}:function(a,b){L.call(a,b)};t.prototype=Object.create(u.prototype),A(t.prototype,{appendChild:function(a){return this.insertBefore(a,null)},insertBefore:function(a,c){b(a);var d;c?z(c)?d=D(c):(d=c,c=E(d)):(c=null,d=null),c&&w(c.parentNode===this);var e,h=c?c.previousSibling:this.lastChild,i=!this.invalidateShadowRenderer()&&!s(a);if(e=i?g(a):f(a,this,h,c),i)n(this,a),q(this),K.call(this.impl,D(a),d);else{h||(this.firstChild_=e[0]),c||(this.lastChild_=e[e.length-1]);var j=d?d.parentNode:this.impl;j?K.call(j,p(this,e),d):o(this,e)}return y(this,"childList",{addedNodes:e,nextSibling:c,previousSibling:h}),k(e),a},removeChild:function(a){if(b(a),a.parentNode!==this){for(var d=!1,e=(this.childNodes,this.firstChild);e;e=e.nextSibling)if(e===a){d=!0;break}if(!d)throw new Error("NotFoundError")}var f=D(a),g=a.nextSibling,h=a.previousSibling;if(this.invalidateShadowRenderer()){var i=this.firstChild,j=this.lastChild,k=f.parentNode;k&&O(k,f),i===a&&(this.firstChild_=g),j===a&&(this.lastChild_=h),h&&(h.nextSibling_=g),g&&(g.previousSibling_=h),a.previousSibling_=a.nextSibling_=a.parentNode_=void 0}else q(this),O(this.impl,f);return G||y(this,"childList",{removedNodes:c(a),nextSibling:g,previousSibling:h}),B(this,a),a},replaceChild:function(a,d){b(a);var e;if(z(d)?e=D(d):(e=d,d=E(e)),d.parentNode!==this)throw new Error("NotFoundError");var h,i=d.nextSibling,j=d.previousSibling,m=!this.invalidateShadowRenderer()&&!s(a);return m?h=g(a):(i===a&&(i=a.nextSibling),h=f(a,this,j,i)),m?(n(this,a),q(this),M.call(this.impl,D(a),e)):(this.firstChild===d&&(this.firstChild_=h[0]),this.lastChild===d&&(this.lastChild_=h[h.length-1]),d.previousSibling_=d.nextSibling_=d.parentNode_=void 0,e.parentNode&&M.call(e.parentNode,p(this,h),e)),y(this,"childList",{addedNodes:h,removedNodes:c(d),nextSibling:i,previousSibling:j}),l(d),k(h),d},nodeIsInserted_:function(){for(var a=this.firstChild;a;a=a.nextSibling)a.nodeIsInserted_()},hasChildNodes:function(){return null!==this.firstChild},get parentNode(){return void 0!==this.parentNode_?this.parentNode_:E(this.impl.parentNode)},get firstChild(){return void 0!==this.firstChild_?this.firstChild_:E(this.impl.firstChild)},get lastChild(){return void 0!==this.lastChild_?this.lastChild_:E(this.impl.lastChild)},get nextSibling(){return void 0!==this.nextSibling_?this.nextSibling_:E(this.impl.nextSibling)},get previousSibling(){return void 0!==this.previousSibling_?this.previousSibling_:E(this.impl.previousSibling)},get parentElement(){for(var a=this.parentNode;a&&a.nodeType!==t.ELEMENT_NODE;)a=a.parentNode;return a},get textContent(){for(var a="",b=this.firstChild;b;b=b.nextSibling)b.nodeType!=t.COMMENT_NODE&&(a+=b.textContent);return a},set textContent(a){var b=i(this.childNodes);if(this.invalidateShadowRenderer()){if(r(this),""!==a){var c=this.impl.ownerDocument.createTextNode(a);this.appendChild(c)}}else q(this),this.impl.textContent=a;var d=i(this.childNodes);y(this,"childList",{addedNodes:d,removedNodes:b}),m(b),k(d)},get childNodes(){for(var a=new v,b=0,c=this.firstChild;c;c=c.nextSibling)a[b++]=c;return a.length=b,a},cloneNode:function(a){var b=E(this.impl.cloneNode(!1));if(a)for(var c=this.firstChild;c;c=c.nextSibling)b.appendChild(c.cloneNode(!0));return b},contains:function(a){if(!a)return!1;if(a=F(a),a===this)return!0;var b=a.parentNode;return b?this.contains(b):!1},compareDocumentPosition:function(a){return J.call(this.impl,D(a))}}),x(t,"ownerDocument"),C(H,t,document.createDocumentFragment()),delete t.prototype.querySelector,delete t.prototype.querySelectorAll,t.prototype=A(Object.create(u.prototype),t.prototype),a.nodeWasAdded=j,a.nodeWasRemoved=l,a.nodesWereAdded=k,a.nodesWereRemoved=m,a.snapshotNodeList=i,a.wrappers.Node=t}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a,c){for(var d,e=a.firstElementChild;e;){if(e.matches(c))return e;if(d=b(e,c))return d;e=e.nextElementSibling}return null}function c(a,b,d){for(var e=a.firstElementChild;e;)e.matches(b)&&(d[d.length++]=e),c(e,b,d),e=e.nextElementSibling;return d}var d={querySelector:function(a){return b(this,a)},querySelectorAll:function(a){return c(this,a,new NodeList)}},e={getElementsByTagName:function(a){return this.querySelectorAll(a)},getElementsByClassName:function(a){return this.querySelectorAll("."+a)},getElementsByTagNameNS:function(a,b){if("*"===a)return this.getElementsByTagName(b);for(var c=new NodeList,d=this.getElementsByTagName(b),e=0,f=0;e<d.length;e++)d[e].namespaceURI===a&&(c[f++]=d[e]);return c.length=f,c}};a.GetElementsByInterface=e,a.SelectorsInterface=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){for(;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}function c(a){for(;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}var d=a.wrappers.NodeList,e={get firstElementChild(){return b(this.firstChild)},get lastElementChild(){return c(this.lastChild)},get childElementCount(){for(var a=0,b=this.firstElementChild;b;b=b.nextElementSibling)a++;return a},get children(){for(var a=new d,b=0,c=this.firstElementChild;c;c=c.nextElementSibling)a[b++]=c;return a.length=b,a}},f={get nextElementSibling(){return b(this.nextSibling)},get previousElementSibling(){return c(this.previousSibling)}};a.ChildNodeInterface=f,a.ParentNodeInterface=e}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){d.call(this,a)}var c=a.ChildNodeInterface,d=a.wrappers.Node,e=a.enqueueMutation,f=a.mixin,g=a.registerWrapper,h=window.CharacterData;b.prototype=Object.create(d.prototype),f(b.prototype,{get textContent(){return this.data},set textContent(a){this.data=a},get data(){return this.impl.data},set data(a){var b=this.impl.data;e(this,"characterData",{oldValue:b}),this.impl.data=a}}),f(b.prototype,c),g(h,b,document.createTextNode("")),a.wrappers.CharacterData=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){return a>>>0}function c(a){d.call(this,a)}var d=a.wrappers.CharacterData,e=(a.enqueueMutation,a.mixin),f=a.registerWrapper,g=window.Text;c.prototype=Object.create(d.prototype),e(c.prototype,{splitText:function(a){a=b(a);var c=this.data;if(a>c.length)throw new Error("IndexSizeError");var d=c.slice(0,a),e=c.slice(a);this.data=d;var f=this.ownerDocument.createTextNode(e);return this.parentNode&&this.parentNode.insertBefore(f,this.nextSibling),f}}),f(g,c,document.createTextNode("")),a.wrappers.Text=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(b,c){var d=b.parentNode;if(d&&d.shadowRoot){var e=a.getRendererForHost(d);e.dependsOnAttribute(c)&&e.invalidate()}}function c(a,b,c){k(a,"attributes",{name:b,namespace:null,oldValue:c})}function d(a){h.call(this,a)}function e(a,c,d){var e=d||c;Object.defineProperty(a,c,{get:function(){return this.impl[c]},set:function(a){this.impl[c]=a,b(this,e)},configurable:!0,enumerable:!0})}var f=a.ChildNodeInterface,g=a.GetElementsByInterface,h=a.wrappers.Node,i=a.ParentNodeInterface,j=a.SelectorsInterface,k=(a.addWrapNodeListMethod,a.enqueueMutation),l=a.mixin,m=(a.oneOf,a.registerWrapper),n=a.wrappers,o=window.Element,p=["matches","mozMatchesSelector","msMatchesSelector","webkitMatchesSelector"].filter(function(a){return o.prototype[a]}),q=p[0],r=o.prototype[q];d.prototype=Object.create(h.prototype),l(d.prototype,{createShadowRoot:function(){var b=new n.ShadowRoot(this);this.impl.polymerShadowRoot_=b;var c=a.getRendererForHost(this);return c.invalidate(),b},get shadowRoot(){return this.impl.polymerShadowRoot_||null},setAttribute:function(a,d){var e=this.impl.getAttribute(a);this.impl.setAttribute(a,d),c(this,a,e),b(this,a)},removeAttribute:function(a){var d=this.impl.getAttribute(a);this.impl.removeAttribute(a),c(this,a,d),b(this,a)},matches:function(a){return r.call(this.impl,a)}}),p.forEach(function(a){"matches"!==a&&(d.prototype[a]=function(a){return this.matches(a)})}),o.prototype.webkitCreateShadowRoot&&(d.prototype.webkitCreateShadowRoot=d.prototype.createShadowRoot),e(d.prototype,"id"),e(d.prototype,"className","class"),l(d.prototype,f),l(d.prototype,g),l(d.prototype,i),l(d.prototype,j),m(o,d,document.createElementNS(null,"x")),a.matchesNames=p,a.wrappers.Element=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){switch(a){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case" ":return"&nbsp;"}}function c(a){return a.replace(y,b)}function d(a){return a.replace(z,b)}function e(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b}function f(a,b){switch(a.nodeType){case Node.ELEMENT_NODE:for(var e,f=a.tagName.toLowerCase(),h="<"+f,i=a.attributes,j=0;e=i[j];j++)h+=" "+e.name+'="'+c(e.value)+'"';return h+=">",A[f]?h:h+g(a)+"</"+f+">";case Node.TEXT_NODE:var k=a.data;return b&&B[b.localName]?k:d(k);case Node.COMMENT_NODE:return"<!--"+a.data+"-->";default:throw console.error(a),new Error("not implemented")}}function g(a){for(var b="",c=a.firstChild;c;c=c.nextSibling)b+=f(c,a);return b}function h(a,b,c){var d=c||"div";a.textContent="";var e=w(a.ownerDocument.createElement(d));e.innerHTML=b;for(var f;f=e.firstChild;)a.appendChild(x(f))}function i(a){o.call(this,a)}function j(a,b){var c=w(a.cloneNode(!1));c.innerHTML=b;for(var d,e=w(document.createDocumentFragment());d=c.firstChild;)e.appendChild(d);return x(e)}function k(b){return function(){return a.renderAllPending(),this.impl[b]}}function l(a){p(i,a,k(a))}function m(b){Object.defineProperty(i.prototype,b,{get:k(b),set:function(c){a.renderAllPending(),this.impl[b]=c},configurable:!0,enumerable:!0})}function n(b){Object.defineProperty(i.prototype,b,{value:function(){return a.renderAllPending(),this.impl[b].apply(this.impl,arguments)},configurable:!0,enumerable:!0})}var o=a.wrappers.Element,p=a.defineGetter,q=a.enqueueMutation,r=a.mixin,s=a.nodesWereAdded,t=a.nodesWereRemoved,u=a.registerWrapper,v=a.snapshotNodeList,w=a.unwrap,x=a.wrap,y=/[&\u00A0"]/g,z=/[&\u00A0<>]/g,A=e(["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"]),B=e(["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"]),C=/MSIE/.test(navigator.userAgent),D=window.HTMLElement;i.prototype=Object.create(o.prototype),r(i.prototype,{get innerHTML(){return g(this)},set innerHTML(a){if(C&&B[this.localName])return this.textContent=a,void 0;var b=v(this.childNodes);this.invalidateShadowRenderer()?h(this,a,this.tagName):this.impl.innerHTML=a;var c=v(this.childNodes);q(this,"childList",{addedNodes:c,removedNodes:b}),t(b),s(c)},get outerHTML(){return f(this,this.parentNode)},set outerHTML(a){var b=this.parentNode;if(b){b.invalidateShadowRenderer();var c=j(b,a);b.replaceChild(c,this)}},insertAdjacentHTML:function(a,b){var c,d;switch(String(a).toLowerCase()){case"beforebegin":c=this.parentNode,d=this;break;case"afterend":c=this.parentNode,d=this.nextSibling;break;case"afterbegin":c=this,d=this.firstChild;break;case"beforeend":c=this,d=null;break;default:return}var e=j(c,b);c.insertBefore(e,d)}}),["clientHeight","clientLeft","clientTop","clientWidth","offsetHeight","offsetLeft","offsetTop","offsetWidth","scrollHeight","scrollWidth"].forEach(l),["scrollLeft","scrollTop"].forEach(m),["getBoundingClientRect","getClientRects","scrollIntoView"].forEach(n),u(D,i,document.createElement("b")),a.wrappers.HTMLElement=i,a.getInnerHTML=g,a.setInnerHTML=h}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=a.wrap,g=window.HTMLCanvasElement;b.prototype=Object.create(c.prototype),d(b.prototype,{getContext:function(){var a=this.impl.getContext.apply(this.impl,arguments);return a&&f(a)}}),e(g,b,document.createElement("canvas")),a.wrappers.HTMLCanvasElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=window.HTMLContentElement;b.prototype=Object.create(c.prototype),d(b.prototype,{get select(){return this.getAttribute("select")},set select(a){this.setAttribute("select",a)},setAttribute:function(a,b){c.prototype.setAttribute.call(this,a,b),"select"===String(a).toLowerCase()&&this.invalidateShadowRenderer(!0)}}),f&&e(f,b),a.wrappers.HTMLContentElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){d.call(this,a)}function c(a,b){if(!(this instanceof c))throw new TypeError("DOM object constructor cannot be called as a function.");var e=f(document.createElement("img"));d.call(this,e),g(e,this),void 0!==a&&(e.width=a),void 0!==b&&(e.height=b)}var d=a.wrappers.HTMLElement,e=a.registerWrapper,f=a.unwrap,g=a.rewrap,h=window.HTMLImageElement;b.prototype=Object.create(d.prototype),e(h,b,document.createElement("img")),c.prototype=b.prototype,a.wrappers.HTMLImageElement=b,a.wrappers.Image=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.mixin,e=a.registerWrapper,f=window.HTMLShadowElement;b.prototype=Object.create(c.prototype),d(b.prototype,{}),f&&e(f,b),a.wrappers.HTMLShadowElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){if(!a.defaultView)return a;var b=m.get(a);if(!b){for(b=a.implementation.createHTMLDocument("");b.lastChild;)b.removeChild(b.lastChild);m.set(a,b)}return b}function c(a){for(var c,d=b(a.ownerDocument),e=j(d.createDocumentFragment());c=a.firstChild;)e.appendChild(c);return e}function d(a){if(e.call(this,a),!n){var b=c(a);l.set(this,k(b))}}var e=a.wrappers.HTMLElement,f=a.getInnerHTML,g=a.mixin,h=a.registerWrapper,i=a.setInnerHTML,j=a.unwrap,k=a.wrap,l=new WeakMap,m=new WeakMap,n=window.HTMLTemplateElement;d.prototype=Object.create(e.prototype),g(d.prototype,{get content(){return n?k(this.impl.content):l.get(this)},get innerHTML(){return f(this.content)},set innerHTML(a){i(this.content,a)}}),n&&h(n,d),a.wrappers.HTMLTemplateElement=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.HTMLElement,d=a.registerWrapper,e=window.HTMLMediaElement;b.prototype=Object.create(c.prototype),d(e,b,document.createElement("audio")),a.wrappers.HTMLMediaElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){d.call(this,a)}function c(a){if(!(this instanceof c))throw new TypeError("DOM object constructor cannot be called as a function.");var b=f(document.createElement("audio"));d.call(this,b),g(b,this),b.setAttribute("preload","auto"),void 0!==a&&b.setAttribute("src",a)}var d=a.wrappers.HTMLMediaElement,e=a.registerWrapper,f=a.unwrap,g=a.rewrap,h=window.HTMLAudioElement;b.prototype=Object.create(d.prototype),e(h,b,document.createElement("audio")),c.prototype=b.prototype,a.wrappers.HTMLAudioElement=b,a.wrappers.Audio=c}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){return a.replace(/\s+/g," ").trim()}function c(a){e.call(this,a)}function d(a,b,c,f){if(!(this instanceof d))throw new TypeError("DOM object constructor cannot be called as a function.");var g=i(document.createElement("option"));e.call(this,g),h(g,this),void 0!==a&&(g.text=a),void 0!==b&&g.setAttribute("value",b),c===!0&&g.setAttribute("selected",""),g.selected=f===!0}var e=a.wrappers.HTMLElement,f=a.mixin,g=a.registerWrapper,h=a.rewrap,i=a.unwrap,j=a.wrap,k=window.HTMLOptionElement;c.prototype=Object.create(e.prototype),f(c.prototype,{get text(){return b(this.textContent)},set text(a){this.textContent=b(String(a))},get form(){return j(i(this).form)}}),g(k,c,document.createElement("option")),d.prototype=c.prototype,a.wrappers.HTMLOptionElement=c,a.wrappers.Option=d}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){switch(a.localName){case"content":return new c(a);case"shadow":return new e(a);case"template":return new f(a)}d.call(this,a)}var c=a.wrappers.HTMLContentElement,d=a.wrappers.HTMLElement,e=a.wrappers.HTMLShadowElement,f=a.wrappers.HTMLTemplateElement,g=(a.mixin,a.registerWrapper),h=window.HTMLUnknownElement;b.prototype=Object.create(d.prototype),g(h,b),a.wrappers.HTMLUnknownElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";var b=a.registerObject,c="http://www.w3.org/2000/svg",d=document.createElementNS(c,"title"),e=b(d),f=Object.getPrototypeOf(e.prototype).constructor;a.wrappers.SVGElement=f}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){m.call(this,a)}var c=a.mixin,d=a.registerWrapper,e=a.unwrap,f=a.wrap,g=window.SVGUseElement,h="http://www.w3.org/2000/svg",i=f(document.createElementNS(h,"g")),j=document.createElementNS(h,"use"),k=i.constructor,l=Object.getPrototypeOf(k.prototype),m=l.constructor;b.prototype=Object.create(l),"instanceRoot"in j&&c(b.prototype,{get instanceRoot(){return f(e(this).instanceRoot)},get animatedInstanceRoot(){return f(e(this).animatedInstanceRoot)}}),d(g,b,j),a.wrappers.SVGUseElement=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.EventTarget,d=a.mixin,e=a.registerWrapper,f=a.wrap,g=window.SVGElementInstance;g&&(b.prototype=Object.create(c.prototype),d(b.prototype,{get correspondingElement(){return f(this.impl.correspondingElement)},get correspondingUseElement(){return f(this.impl.correspondingUseElement)},get parentNode(){return f(this.impl.parentNode)},get childNodes(){throw new Error("Not implemented")},get firstChild(){return f(this.impl.firstChild)},get lastChild(){return f(this.impl.lastChild)},get previousSibling(){return f(this.impl.previousSibling)},get nextSibling(){return f(this.impl.nextSibling)}}),e(g,b),a.wrappers.SVGElementInstance=b)}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){this.impl=a}var c=a.mixin,d=a.registerWrapper,e=a.unwrap,f=a.unwrapIfNeeded,g=a.wrap,h=window.CanvasRenderingContext2D;c(b.prototype,{get canvas(){return g(this.impl.canvas)},drawImage:function(){arguments[0]=f(arguments[0]),this.impl.drawImage.apply(this.impl,arguments)},createPattern:function(){return arguments[0]=e(arguments[0]),this.impl.createPattern.apply(this.impl,arguments)}}),d(h,b,document.createElement("canvas").getContext("2d")),a.wrappers.CanvasRenderingContext2D=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){this.impl=a}var c=a.mixin,d=a.registerWrapper,e=a.unwrapIfNeeded,f=a.wrap,g=window.WebGLRenderingContext;if(g){c(b.prototype,{get canvas(){return f(this.impl.canvas)},texImage2D:function(){arguments[5]=e(arguments[5]),this.impl.texImage2D.apply(this.impl,arguments)},texSubImage2D:function(){arguments[6]=e(arguments[6]),this.impl.texSubImage2D.apply(this.impl,arguments)}});var h=/WebKit/.test(navigator.userAgent)?{drawingBufferHeight:null,drawingBufferWidth:null}:{};d(g,b,h),a.wrappers.WebGLRenderingContext=b}}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){this.impl=a}var c=a.registerWrapper,d=a.unwrap,e=a.unwrapIfNeeded,f=a.wrap,g=window.Range;b.prototype={get startContainer(){return f(this.impl.startContainer)},get endContainer(){return f(this.impl.endContainer)},get commonAncestorContainer(){return f(this.impl.commonAncestorContainer)},setStart:function(a,b){this.impl.setStart(e(a),b)},setEnd:function(a,b){this.impl.setEnd(e(a),b)},setStartBefore:function(a){this.impl.setStartBefore(e(a))},setStartAfter:function(a){this.impl.setStartAfter(e(a))},setEndBefore:function(a){this.impl.setEndBefore(e(a))},setEndAfter:function(a){this.impl.setEndAfter(e(a))},selectNode:function(a){this.impl.selectNode(e(a))},selectNodeContents:function(a){this.impl.selectNodeContents(e(a))},compareBoundaryPoints:function(a,b){return this.impl.compareBoundaryPoints(a,d(b))},extractContents:function(){return f(this.impl.extractContents())},cloneContents:function(){return f(this.impl.cloneContents())},insertNode:function(a){this.impl.insertNode(e(a))},surroundContents:function(a){this.impl.surroundContents(e(a))},cloneRange:function(){return f(this.impl.cloneRange())},isPointInRange:function(a,b){return this.impl.isPointInRange(e(a),b)},comparePoint:function(a,b){return this.impl.comparePoint(e(a),b)},intersectsNode:function(a){return this.impl.intersectsNode(e(a))},toString:function(){return this.impl.toString()}},g.prototype.createContextualFragment&&(b.prototype.createContextualFragment=function(a){return f(this.impl.createContextualFragment(a))}),c(window.Range,b,document.createRange()),a.wrappers.Range=b}(window.ShadowDOMPolyfill),function(a){"use strict";var b=a.GetElementsByInterface,c=a.ParentNodeInterface,d=a.SelectorsInterface,e=a.mixin,f=a.registerObject,g=f(document.createDocumentFragment());e(g.prototype,c),e(g.prototype,d),e(g.prototype,b);var h=f(document.createComment(""));a.wrappers.Comment=h,a.wrappers.DocumentFragment=g}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){var b=i(a.impl.ownerDocument.createDocumentFragment());c.call(this,b),g(b,this);var d=a.shadowRoot;k.set(this,d),j.set(this,a)}var c=a.wrappers.DocumentFragment,d=a.elementFromPoint,e=a.getInnerHTML,f=a.mixin,g=a.rewrap,h=a.setInnerHTML,i=a.unwrap,j=new WeakMap,k=new WeakMap,l=/[ \t\n\r\f]/;b.prototype=Object.create(c.prototype),f(b.prototype,{get innerHTML(){return e(this)},set innerHTML(a){h(this,a),this.invalidateShadowRenderer()},get olderShadowRoot(){return k.get(this)||null},get host(){return j.get(this)||null},invalidateShadowRenderer:function(){return j.get(this).invalidateShadowRenderer()},elementFromPoint:function(a,b){return d(this,this.ownerDocument,a,b)},getElementById:function(a){return l.test(a)?null:this.querySelector('[id="'+a+'"]')}}),a.wrappers.ShadowRoot=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){a.previousSibling_=a.previousSibling,a.nextSibling_=a.nextSibling,a.parentNode_=a.parentNode}function c(a,c,e){var f=F(a),g=F(c),h=e?F(e):null;if(d(c),b(c),e)a.firstChild===e&&(a.firstChild_=e),e.previousSibling_=e.previousSibling;else{a.lastChild_=a.lastChild,a.lastChild===a.firstChild&&(a.firstChild_=a.firstChild);var i=G(f.lastChild);i&&(i.nextSibling_=i.nextSibling)}f.insertBefore(g,h)}function d(a){var c=F(a),d=c.parentNode;if(d){var e=G(d);b(a),a.previousSibling&&(a.previousSibling.nextSibling_=a),a.nextSibling&&(a.nextSibling.previousSibling_=a),e.lastChild===a&&(e.lastChild_=a),e.firstChild===a&&(e.firstChild_=a),d.removeChild(c)}}function e(a,b){g(b).push(a),x(a,b);var c=I.get(a);c||I.set(a,c=[]),c.push(b)}function f(a){H.set(a,[])}function g(a){return H.get(a)}function h(a){for(var b=[],c=0,d=a.firstChild;d;d=d.nextSibling)b[c++]=d;return b}function i(a,b,c){for(var d=a.firstChild;d;d=d.nextSibling)if(b(d)){if(c(d)===!1)return}else i(d,b,c)}function j(a,b){var c=b.getAttribute("select");if(!c)return!0;if(c=c.trim(),!c)return!0;if(!(a instanceof z))return!1;if("*"===c||c===a.localName)return!0;if(!L.test(c))return!1;if(":"===c[0]&&!M.test(c))return!1;try{return a.matches(c)}catch(d){return!1}}function k(){for(var a=0;a<O.length;a++)O[a].render();O=[]}function l(){y=null,k()}function m(a){var b=K.get(a);return b||(b=new q(a),K.set(a,b)),b}function n(a){for(;a;a=a.parentNode)if(a instanceof D)return a;return null}function o(a){return m(a.host)}function p(a){this.skip=!1,this.node=a,this.childNodes=[]}function q(a){this.host=a,this.dirty=!1,this.invalidateAttributes(),this.associateNode(a)}function r(a){return a instanceof A}function s(a){return a instanceof A}function t(a){return a instanceof B}function u(a){return a instanceof B}function v(a){return a.shadowRoot}function w(a){for(var b=[],c=a.shadowRoot;c;c=c.olderShadowRoot)b.push(c);return b}function x(a,b){J.set(a,b)}var y,z=a.wrappers.Element,A=a.wrappers.HTMLContentElement,B=a.wrappers.HTMLShadowElement,C=a.wrappers.Node,D=a.wrappers.ShadowRoot,E=(a.assert,a.mixin,a.oneOf),F=a.unwrap,G=a.wrap,H=new WeakMap,I=new WeakMap,J=new WeakMap,K=new WeakMap,L=/^[*.:#[a-zA-Z_|]/,M=new RegExp("^:("+["link","visited","target","enabled","disabled","checked","indeterminate","nth-child","nth-last-child","nth-of-type","nth-last-of-type","first-child","last-child","first-of-type","last-of-type","only-of-type"].join("|")+")"),N=E(window,["requestAnimationFrame","mozRequestAnimationFrame","webkitRequestAnimationFrame","setTimeout"]),O=[],P=new ArraySplice;P.equals=function(a,b){return F(a.node)===b},p.prototype={append:function(a){var b=new p(a);return this.childNodes.push(b),b},sync:function(a){if(!this.skip){for(var b=this.node,e=this.childNodes,f=h(F(b)),g=a||new WeakMap,i=P.calculateSplices(e,f),j=0,k=0,l=0,m=0;m<i.length;m++){for(var n=i[m];l<n.index;l++)k++,e[j++].sync(g);for(var o=n.removed.length,p=0;o>p;p++){var q=G(f[k++]);g.get(q)||d(q)}for(var r=n.addedCount,s=f[k]&&G(f[k]),p=0;r>p;p++){var t=e[j++],u=t.node;c(b,u,s),g.set(u,!0),t.sync(g)}l+=r}for(var m=l;m<e.length;m++)e[m].sync(g)}}},q.prototype={render:function(a){if(this.dirty){this.invalidateAttributes(),this.treeComposition();var b=this.host,c=b.shadowRoot;this.associateNode(b);for(var d=!e,e=a||new p(b),f=c.firstChild;f;f=f.nextSibling)this.renderNode(c,e,f,!1);d&&e.sync(),this.dirty=!1}},invalidate:function(){if(!this.dirty){if(this.dirty=!0,O.push(this),y)return;y=window[N](l,0)}},renderNode:function(a,b,c,d){if(v(c)){b=b.append(c);var e=m(c);e.dirty=!0,e.render(b)}else r(c)?this.renderInsertionPoint(a,b,c,d):t(c)?this.renderShadowInsertionPoint(a,b,c):this.renderAsAnyDomTree(a,b,c,d)},renderAsAnyDomTree:function(a,b,c,d){if(b=b.append(c),v(c)){var e=m(c);b.skip=!e.dirty,e.render(b)}else for(var f=c.firstChild;f;f=f.nextSibling)this.renderNode(a,b,f,d)},renderInsertionPoint:function(a,b,c,d){var e=g(c);if(e.length){this.associateNode(c);for(var f=0;f<e.length;f++){var h=e[f];r(h)&&d?this.renderInsertionPoint(a,b,h,d):this.renderAsAnyDomTree(a,b,h,d)}}else this.renderFallbackContent(a,b,c);this.associateNode(c.parentNode)},renderShadowInsertionPoint:function(a,b,c){var d=a.olderShadowRoot;if(d){x(d,c),this.associateNode(c.parentNode);for(var e=d.firstChild;e;e=e.nextSibling)this.renderNode(d,b,e,!0)}else this.renderFallbackContent(a,b,c)},renderFallbackContent:function(a,b,c){this.associateNode(c),this.associateNode(c.parentNode);for(var d=c.firstChild;d;d=d.nextSibling)this.renderAsAnyDomTree(a,b,d,!1)},invalidateAttributes:function(){this.attributes=Object.create(null)},updateDependentAttributes:function(a){if(a){var b=this.attributes;/\.\w+/.test(a)&&(b["class"]=!0),/#\w+/.test(a)&&(b.id=!0),a.replace(/\[\s*([^\s=\|~\]]+)/g,function(a,c){b[c]=!0})}},dependsOnAttribute:function(a){return this.attributes[a]},distribute:function(a,b){var c=this;i(a,s,function(a){f(a),c.updateDependentAttributes(a.getAttribute("select"));for(var d=0;d<b.length;d++){var g=b[d];void 0!==g&&j(g,a)&&(e(g,a),b[d]=void 0)}})},treeComposition:function(){for(var a=this.host,b=a.shadowRoot,c=[],d=a.firstChild;d;d=d.nextSibling)if(r(d)){var e=g(d);e&&e.length||(e=h(d)),c.push.apply(c,e)}else c.push(d);for(var f,j;b;){if(f=void 0,i(b,u,function(a){return f=a,!1}),j=f,this.distribute(b,c),j){var k=b.olderShadowRoot;if(k){b=k,x(b,j);continue}break}break}},associateNode:function(a){a.impl.polymerShadowRenderer_=this}},C.prototype.invalidateShadowRenderer=function(){var a=this.impl.polymerShadowRenderer_;return a?(a.invalidate(),!0):!1},A.prototype.getDistributedNodes=function(){return k(),g(this)},B.prototype.nodeIsInserted_=A.prototype.nodeIsInserted_=function(){this.invalidateShadowRenderer();var a,b=n(this);b&&(a=o(b)),this.impl.polymerShadowRenderer_=a,a&&a.invalidate()},a.eventParentsTable=I,a.getRendererForHost=m,a.getShadowTrees=w,a.insertionParentTable=J,a.renderAllPending=k,a.visual={insertBefore:c,remove:d}}(window.ShadowDOMPolyfill),function(a){"use strict";function b(b){if(window[b]){d(!a.wrappers[b]);var i=function(a){c.call(this,a)
};i.prototype=Object.create(c.prototype),e(i.prototype,{get form(){return h(g(this).form)}}),f(window[b],i,document.createElement(b.slice(4,-7))),a.wrappers[b]=i}}var c=a.wrappers.HTMLElement,d=a.assert,e=a.mixin,f=a.registerWrapper,g=a.unwrap,h=a.wrap,i=["HTMLButtonElement","HTMLFieldSetElement","HTMLInputElement","HTMLKeygenElement","HTMLLabelElement","HTMLLegendElement","HTMLObjectElement","HTMLOutputElement","HTMLSelectElement","HTMLTextAreaElement"];i.forEach(b)}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){this.impl=a}{var c=a.registerWrapper,d=a.unwrap,e=a.unwrapIfNeeded,f=a.wrap;window.Selection}b.prototype={get anchorNode(){return f(this.impl.anchorNode)},get focusNode(){return f(this.impl.focusNode)},addRange:function(a){this.impl.addRange(d(a))},collapse:function(a,b){this.impl.collapse(e(a),b)},containsNode:function(a,b){return this.impl.containsNode(e(a),b)},extend:function(a,b){this.impl.extend(e(a),b)},getRangeAt:function(a){return f(this.impl.getRangeAt(a))},removeRange:function(a){this.impl.removeRange(d(a))},selectAllChildren:function(a){this.impl.selectAllChildren(e(a))},toString:function(){return this.impl.toString()}},c(window.Selection,b,window.getSelection()),a.wrappers.Selection=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){k.call(this,a)}function c(a){var c=document[a];b.prototype[a]=function(){return y(c.apply(this.impl,arguments))}}function d(a,b){B.call(b.impl,x(a)),e(a,b)}function e(a,b){a.shadowRoot&&b.adoptNode(a.shadowRoot),a instanceof o&&f(a,b);for(var c=a.firstChild;c;c=c.nextSibling)e(c,b)}function f(a,b){var c=a.olderShadowRoot;c&&b.adoptNode(c)}function g(a){this.impl=a}function h(a,b){var c=document.implementation[b];a.prototype[b]=function(){return y(c.apply(this.impl,arguments))}}function i(a,b){var c=document.implementation[b];a.prototype[b]=function(){return c.apply(this.impl,arguments)}}var j=a.GetElementsByInterface,k=a.wrappers.Node,l=a.ParentNodeInterface,m=a.wrappers.Selection,n=a.SelectorsInterface,o=a.wrappers.ShadowRoot,p=a.defineWrapGetter,q=a.elementFromPoint,r=a.forwardMethodsToWrapper,s=a.matchesNames,t=a.mixin,u=a.registerWrapper,v=a.renderAllPending,w=a.rewrap,x=a.unwrap,y=a.wrap,z=a.wrapEventTargetMethods,A=(a.wrapNodeList,new WeakMap);b.prototype=Object.create(k.prototype),p(b,"documentElement"),p(b,"body"),p(b,"head"),["createComment","createDocumentFragment","createElement","createElementNS","createEvent","createEventNS","createRange","createTextNode","getElementById"].forEach(c);var B=document.adoptNode,C=document.importNode,D=document.getSelection;if(t(b.prototype,{adoptNode:function(a){return a.parentNode&&a.parentNode.removeChild(a),d(a,this),a},elementFromPoint:function(a,b){return q(this,this,a,b)},importNode:function(a,b){var c=y(C.call(this.impl,x(a),!1));if(b)for(var d=a.firstChild;d;d=d.nextSibling)c.appendChild(this.importNode(d,!0));return c},getSelection:function(){return v(),new m(D.call(x(this)))}}),document.registerElement){var E=document.registerElement;b.prototype.registerElement=function(b,c){function d(a){return a?(this.impl=a,void 0):c.extends?document.createElement(c.extends,b):document.createElement(b)}var e=c.prototype;if(a.nativePrototypeTable.get(e))throw new Error("NotSupportedError");for(var f,g=Object.getPrototypeOf(e),h=[];g&&!(f=a.nativePrototypeTable.get(g));)h.push(g),g=Object.getPrototypeOf(g);if(!f)throw new Error("NotSupportedError");for(var i=Object.create(f),j=h.length-1;j>=0;j--)i=Object.create(i);["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"].forEach(function(a){var b=e[a];b&&(i[a]=function(){y(this)instanceof d||w(this),b.apply(y(this),arguments)})});var k={prototype:i};c.extends&&(k.extends=c.extends),d.prototype=e,d.prototype.constructor=d,a.constructorTable.set(i,d),a.nativePrototypeTable.set(e,i);E.call(x(this),b,k);return d},r([window.HTMLDocument||window.Document],["registerElement"])}r([window.HTMLBodyElement,window.HTMLDocument||window.Document,window.HTMLHeadElement,window.HTMLHtmlElement],["appendChild","compareDocumentPosition","contains","getElementsByClassName","getElementsByTagName","getElementsByTagNameNS","insertBefore","querySelector","querySelectorAll","removeChild","replaceChild"].concat(s)),r([window.HTMLDocument||window.Document],["adoptNode","importNode","contains","createComment","createDocumentFragment","createElement","createElementNS","createEvent","createEventNS","createRange","createTextNode","elementFromPoint","getElementById","getSelection"]),t(b.prototype,j),t(b.prototype,l),t(b.prototype,n),t(b.prototype,{get implementation(){var a=A.get(this);return a?a:(a=new g(x(this).implementation),A.set(this,a),a)}}),u(window.Document,b,document.implementation.createHTMLDocument("")),window.HTMLDocument&&u(window.HTMLDocument,b),z([window.HTMLBodyElement,window.HTMLDocument||window.Document,window.HTMLHeadElement]),h(g,"createDocumentType"),h(g,"createDocument"),h(g,"createHTMLDocument"),i(g,"hasFeature"),u(window.DOMImplementation,g),r([window.DOMImplementation],["createDocumentType","createDocument","createHTMLDocument","hasFeature"]),a.adoptNodeNoRemove=d,a.wrappers.DOMImplementation=g,a.wrappers.Document=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){c.call(this,a)}var c=a.wrappers.EventTarget,d=a.wrappers.Selection,e=a.mixin,f=a.registerWrapper,g=a.renderAllPending,h=a.unwrap,i=a.unwrapIfNeeded,j=a.wrap,k=window.Window,l=window.getComputedStyle,m=window.getSelection;b.prototype=Object.create(c.prototype),k.prototype.getComputedStyle=function(a,b){return j(this||window).getComputedStyle(i(a),b)},k.prototype.getSelection=function(){return j(this||window).getSelection()},delete window.getComputedStyle,delete window.getSelection,["addEventListener","removeEventListener","dispatchEvent"].forEach(function(a){k.prototype[a]=function(){var b=j(this||window);return b[a].apply(b,arguments)},delete window[a]}),e(b.prototype,{getComputedStyle:function(a,b){return g(),l.call(h(this),i(a),b)},getSelection:function(){return g(),new d(m.call(h(this)))}}),f(k,b),a.wrappers.Window=b}(window.ShadowDOMPolyfill),function(a){"use strict";function b(a){var b=c[a],d=window[b];if(d){var e=document.createElement(a),f=e.constructor;window[b]=f}}var c=(a.isWrapperFor,{a:"HTMLAnchorElement",area:"HTMLAreaElement",br:"HTMLBRElement",base:"HTMLBaseElement",body:"HTMLBodyElement",button:"HTMLButtonElement",dl:"HTMLDListElement",datalist:"HTMLDataListElement",data:"HTMLDataElement",dir:"HTMLDirectoryElement",div:"HTMLDivElement",embed:"HTMLEmbedElement",fieldset:"HTMLFieldSetElement",font:"HTMLFontElement",form:"HTMLFormElement",frame:"HTMLFrameElement",frameset:"HTMLFrameSetElement",hr:"HTMLHRElement",head:"HTMLHeadElement",h1:"HTMLHeadingElement",html:"HTMLHtmlElement",iframe:"HTMLIFrameElement",input:"HTMLInputElement",li:"HTMLLIElement",label:"HTMLLabelElement",legend:"HTMLLegendElement",link:"HTMLLinkElement",map:"HTMLMapElement",marquee:"HTMLMarqueeElement",menu:"HTMLMenuElement",menuitem:"HTMLMenuItemElement",meta:"HTMLMetaElement",meter:"HTMLMeterElement",del:"HTMLModElement",ol:"HTMLOListElement",object:"HTMLObjectElement",optgroup:"HTMLOptGroupElement",option:"HTMLOptionElement",output:"HTMLOutputElement",p:"HTMLParagraphElement",param:"HTMLParamElement",pre:"HTMLPreElement",progress:"HTMLProgressElement",q:"HTMLQuoteElement",script:"HTMLScriptElement",select:"HTMLSelectElement",source:"HTMLSourceElement",span:"HTMLSpanElement",style:"HTMLStyleElement",time:"HTMLTimeElement",caption:"HTMLTableCaptionElement",col:"HTMLTableColElement",table:"HTMLTableElement",tr:"HTMLTableRowElement",thead:"HTMLTableSectionElement",tbody:"HTMLTableSectionElement",textarea:"HTMLTextAreaElement",track:"HTMLTrackElement",title:"HTMLTitleElement",ul:"HTMLUListElement",video:"HTMLVideoElement"});Object.keys(c).forEach(b),Object.getOwnPropertyNames(a.wrappers).forEach(function(b){window[b]=a.wrappers[b]}),a.knownElements=c}(window.ShadowDOMPolyfill),function(){window.wrap=ShadowDOMPolyfill.wrapIfNeeded,window.unwrap=ShadowDOMPolyfill.unwrapIfNeeded,Object.defineProperty(Element.prototype,"webkitShadowRoot",Object.getOwnPropertyDescriptor(Element.prototype,"shadowRoot"));var a=Element.prototype.createShadowRoot;Element.prototype.createShadowRoot=function(){var b=a.call(this);return CustomElements.watchShadow(this),b},Element.prototype.webkitCreateShadowRoot=Element.prototype.createShadowRoot}(),function(a){function b(a,b){var c="";return Array.prototype.forEach.call(a,function(a){c+=a.textContent+"\n\n"}),b||(c=c.replace(m,"")),c}function c(a){var b=document.createElement("style");return b.textContent=a,b}function d(a){var b=c(a);document.head.appendChild(b);var d=b.sheet.cssRules;return b.parentNode.removeChild(b),d}function e(a){for(var b=0,c=[];b<a.length;b++)c.push(a[b].cssText);return c.join("\n\n")}function f(a){a&&g().appendChild(document.createTextNode(a))}function g(){return v||(v=document.createElement("style"),v.setAttribute("ShadowCSSShim",""),v.shadowCssShim=!0),v}var h=(a.loader,{strictStyling:!1,registry:{},shimStyling:function(a,b,d){var e=this.isTypeExtension(d),g=this.registerDefinition(a,b,d);this.strictStyling&&this.applyScopeToContent(a,b);var h=this.stylesToShimmedCssText(g.rootStyles,g.scopeStyles,b,e);g.shimmedStyle=c(h),a&&(a.shimmedStyle=g.shimmedStyle);for(var i,j=0,k=g.rootStyles.length;k>j&&(i=g.rootStyles[j]);j++)i.parentNode.removeChild(i);f(h)},stylesToShimmedCssText:function(a,b,c,d){c=c||"",this.insertPolyfillDirectives(a),this.insertPolyfillRules(a);var e=this.shimAtHost(b,c,d)+this.shimScoping(b,c,d);return e+=this.extractPolyfillUnscopedRules(a)},registerDefinition:function(a,b,c){var d=this.registry[b]={root:a,name:b,extendsName:c},e=a?a.querySelectorAll("style"):[];e=e?Array.prototype.slice.call(e,0):[],d.rootStyles=e,d.scopeStyles=d.rootStyles;var f=this.registry[d.extendsName];return!f||a&&!a.querySelector("shadow")||(d.scopeStyles=f.scopeStyles.concat(d.scopeStyles)),d},isTypeExtension:function(a){return a&&a.indexOf("-")<0},applyScopeToContent:function(a,b){a&&(Array.prototype.forEach.call(a.querySelectorAll("*"),function(a){a.setAttribute(b,"")}),Array.prototype.forEach.call(a.querySelectorAll("template"),function(a){this.applyScopeToContent(a.content,b)},this))},insertPolyfillDirectives:function(a){a&&Array.prototype.forEach.call(a,function(a){a.textContent=this.insertPolyfillDirectivesInCssText(a.textContent)},this)},insertPolyfillDirectivesInCssText:function(a){return a.replace(n,function(a,b){return b.slice(0,-2)+"{"})},insertPolyfillRules:function(a){a&&Array.prototype.forEach.call(a,function(a){a.textContent=this.insertPolyfillRulesInCssText(a.textContent)},this)},insertPolyfillRulesInCssText:function(a){return a.replace(o,function(a,b){return b.slice(0,-1)})},extractPolyfillUnscopedRules:function(a){var b="";return a&&Array.prototype.forEach.call(a,function(a){b+=this.extractPolyfillUnscopedRulesFromCssText(a.textContent)+"\n\n"},this),b},extractPolyfillUnscopedRulesFromCssText:function(a){for(var b,c="";b=p.exec(a);)c+=b[1].slice(0,-1)+"\n\n";return c},shimAtHost:function(a,b,c){return a?this.convertAtHostStyles(a,b,c):void 0},convertAtHostStyles:function(a,c,f){var g=b(a),h=this;return g=g.replace(i,function(a,b){return h.scopeHostCss(b,c,f)}),g=e(this.findAtHostRules(d(g),this.makeScopeMatcher(c,f)))},scopeHostCss:function(a,b,c){var d=this;return a.replace(j,function(a,e,f){return d.scopeHostSelector(e,b,c)+" "+f+"\n	"})},scopeHostSelector:function(a,b,c){var d=[],e=a.split(","),f="[is="+b+"]";return e.forEach(function(a){a=a.trim(),a.match(k)?a=a.replace(k,c?f+"$1$3":b+"$1$3"):a.match(l)&&(a=c?f+a:b+a),d.push(a)},this),d.join(", ")},findAtHostRules:function(a,b){return Array.prototype.filter.call(a,this.isHostRule.bind(this,b))},isHostRule:function(a,b){return b.selectorText&&b.selectorText.match(a)||b.cssRules&&this.findAtHostRules(b.cssRules,a).length||b.type==CSSRule.WEBKIT_KEYFRAMES_RULE},shimScoping:function(a,b,c){return a?this.convertScopedStyles(a,b,c):void 0},convertScopedStyles:function(a,c,e){var f=b(a).replace(i,"");f=this.insertPolyfillHostInCssText(f),f=this.convertColonHost(f),f=this.convertColonAncestor(f),f=this.convertPseudos(f),f=this.convertParts(f),f=this.convertCombinators(f);var g=d(f);return c&&(f=this.scopeRules(g,c,e)),f},convertPseudos:function(a){return a.replace(q," [pseudo=$1]")},convertParts:function(a){return a.replace(r," [part=$1]")},convertColonHost:function(a){return this.convertColonRule(a,cssColonHostRe,this.colonHostPartReplacer)},convertColonAncestor:function(a){return this.convertColonRule(a,cssColonAncestorRe,this.colonAncestorPartReplacer)},convertColonRule:function(a,b,c){return a.replace(b,function(a,b,d,e){if(b=polyfillHostNoCombinator,d){for(var f,g=d.split(","),h=[],i=0,j=g.length;j>i&&(f=g[i]);i++)f=f.trim(),h.push(c(b,f,e));return h.join(",")}return b+e})},colonAncestorPartReplacer:function(a,b,c){return b.match(s)?this.colonHostPartReplacer(a,b,c):a+b+c+", "+b+" "+a+c},colonHostPartReplacer:function(a,b,c){return a+b.replace(s,"")+c},convertCombinators:function(a){return a.replace(/\^\^/g," ").replace(/\^/g," ")},scopeRules:function(a,b,c){var d="";return Array.prototype.forEach.call(a,function(a){a.selectorText&&a.style&&a.style.cssText?(d+=this.scopeSelector(a.selectorText,b,c,this.strictStyling)+" {\n	",d+=this.propertiesFromRule(a)+"\n}\n\n"):a.media?(d+="@media "+a.media.mediaText+" {\n",d+=this.scopeRules(a.cssRules,b,c),d+="\n}\n\n"):a.cssText&&(d+=a.cssText+"\n\n")},this),d},scopeSelector:function(a,b,c,d){var e=[],f=a.split(",");return f.forEach(function(a){a=a.trim(),this.selectorNeedsScoping(a,b,c)&&(a=d&&!a.match(polyfillHostNoCombinator)?this.applyStrictSelectorScope(a,b):this.applySimpleSelectorScope(a,b,c)),e.push(a)},this),e.join(", ")},selectorNeedsScoping:function(a,b,c){var d=this.makeScopeMatcher(b,c);return!a.match(d)},makeScopeMatcher:function(a,b){var c=b?"\\[is=['\"]?"+a+"['\"]?\\]":a;return new RegExp("^("+c+")"+selectorReSuffix,"m")},applySimpleSelectorScope:function(a,b,c){var d=c?"[is="+b+"]":b;return a.match(polyfillHostRe)?(a=a.replace(polyfillHostNoCombinator,d),a.replace(polyfillHostRe,d+" ")):d+" "+a},applyStrictSelectorScope:function(a,b){var c=[" ",">","+","~"],d=a,e="["+b+"]";return c.forEach(function(a){var b=d.split(a);d=b.map(function(a){var b=a.trim().replace(polyfillHostRe,"");return b&&c.indexOf(b)<0&&b.indexOf(e)<0&&(a=b.replace(/([^:]*)(:*)(.*)/,"$1"+e+"$2$3")),a}).join(a)}),d},insertPolyfillHostInCssText:function(a){return a.replace(hostRe,s).replace(colonHostRe,s).replace(colonAncestorRe,t)},propertiesFromRule:function(a){return a.style.cssText}}),i=/@host[^{]*{(([^}]*?{[^{]*?}[\s\S]*?)+)}/gim,j=/([^{]*)({[\s\S]*?})/gim,k=/(.*)((?:\*)|(?:\:scope))(.*)/,l=/^[.\[:]/,m=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,n=/\/\*\s*@polyfill ([^*]*\*+([^/*][^*]*\*+)*\/)([^{]*?){/gim,o=/\/\*\s@polyfill-rule([^*]*\*+([^/*][^*]*\*+)*)\//gim,p=/\/\*\s@polyfill-unscoped-rule([^*]*\*+([^/*][^*]*\*+)*)\//gim,q=/::(x-[^\s{,(]*)/gim,r=/::part\(([^)]*)\)/gim,s="-shadowcsshost",t="-shadowcssancestor",u=")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";cssColonHostRe=new RegExp("("+s+u,"gim"),cssColonAncestorRe=new RegExp("("+t+u,"gim"),selectorReSuffix="([>\\s~+[.,{:][\\s\\S]*)?$",hostRe=/@host/gim,colonHostRe=/\:host/gim,colonAncestorRe=/\:ancestor/gim,polyfillHostNoCombinator=s+"-no-combinator",polyfillHostRe=new RegExp(s,"gim"),polyfillAncestorRe=new RegExp(t,"gim");var v;if(window.ShadowDOMPolyfill){f("style { display: none !important; }\n");var w=wrap(document),x=w.querySelector("head");x.insertBefore(g(),x.childNodes[0]),document.addEventListener("DOMContentLoaded",function(){window.HTMLImports&&!HTMLImports.useNative&&(HTMLImports.importer.preloadSelectors+=", link[rel=stylesheet]:not([nopolyfill])",HTMLImports.parser.parseGeneric=function(a){if(!a.shadowCssShim){var b=a;if(!a.hasAttribute("nopolyfill")){a.__resource?(b=a.ownerDocument.createElement("style"),b.textContent=Platform.loader.resolveUrlsInCssText(a.__resource,a.href),a.ownerDocument===w&&a.parentNode.removeChild(a)):Platform.loader.resolveUrlsInStyle(b);var c=[b];b.textContent=h.stylesToShimmedCssText(c,c),b.shadowCssShim=!0}b.parentNode!==x&&x.appendChild(b)}})})}a.ShadowCSS=h}(window.Platform)):!function(){window.templateContent=window.templateContent||function(a){return a.content},window.wrap=window.unwrap=function(a){return a};var a=Element.prototype.webkitCreateShadowRoot;Element.prototype.webkitCreateShadowRoot=function(){var b=this.webkitShadowRoot,c=a.call(this);return c.olderShadowRoot=b,c.host=this,CustomElements.watchShadow(this),c},Object.defineProperties(Element.prototype,{shadowRoot:{get:function(){return this.webkitShadowRoot}},createShadowRoot:{value:function(){return this.webkitCreateShadowRoot()}}}),window.templateContent=function(a){if(window.HTMLTemplateElement&&HTMLTemplateElement.bootstrap&&HTMLTemplateElement.bootstrap(a),!a.content&&!a._content){for(var b=document.createDocumentFragment();a.firstChild;)b.appendChild(a.firstChild);a._content=b}return a.content||a._content}}(),function(a){function b(a){for(var b=a||{},d=1;d<arguments.length;d++){var e=arguments[d];try{for(var f in e)c(f,e,b)}catch(g){}}return b}function c(a,b,c){var e=d(b,a);Object.defineProperty(c,a,e)}function d(a,b){if(a){var c=Object.getOwnPropertyDescriptor(a,b);return c||d(Object.getPrototypeOf(a),b)}}Function.prototype.bind||(Function.prototype.bind=function(a){var b=this,c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();return d.push.apply(d,arguments),b.apply(a,d)}}),a.mixin=b}(window.Platform),function(a){"use strict";function b(a,b,c){var d="string"==typeof a?document.createElement(a):a.cloneNode(!0);if(d.innerHTML=b,c)for(var e in c)d.setAttribute(e,c[e]);return d}var c=DOMTokenList.prototype.add,d=DOMTokenList.prototype.remove;DOMTokenList.prototype.add=function(){for(var a=0;a<arguments.length;a++)c.call(this,arguments[a])},DOMTokenList.prototype.remove=function(){for(var a=0;a<arguments.length;a++)d.call(this,arguments[a])},DOMTokenList.prototype.toggle=function(a,b){1==arguments.length&&(b=!this.contains(a)),b?this.add(a):this.remove(a)},DOMTokenList.prototype.switch=function(a,b){a&&this.remove(a),b&&this.add(b)};var e=function(){return Array.prototype.slice.call(this)},f=window.NamedNodeMap||window.MozNamedAttrMap||{};if(NodeList.prototype.array=e,f.prototype.array=e,HTMLCollection.prototype.array=e,!window.performance){var g=Date.now();window.performance={now:function(){return Date.now()-g}}}window.requestAnimationFrame||(window.requestAnimationFrame=function(){var a=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;return a?function(b){return a(function(){b(performance.now())})}:function(a){return window.setTimeout(a,1e3/60)}}()),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(){return window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||function(a){clearTimeout(a)}}());var h=document.createElement("template"),i=document.createElement("base");i.href=document.baseURI,h.content.ownerDocument.appendChild(i);var j=[],k=function(){j.push(arguments)};window.Polymer=k,a.deliverDeclarations=function(){return a.deliverDeclarations=null,j},window.addEventListener("DOMContentLoaded",function(){window.Polymer===k&&(window.Polymer=function(){console.error('You tried to use polymer without loading it first. To load polymer, <link rel="import" href="components/polymer/polymer.html">')})}),a.createDOM=b}(window.Platform),window.templateContent=window.templateContent||function(a){return a.content},function(a){a=a||(window.Inspector={});var b;window.sinspect=function(a,d){b||(b=window.open("","ShadowDOM Inspector",null,!0),b.document.write(c),b.api={shadowize:shadowize}),f(a||wrap(document.body),d)};var c=["<!DOCTYPE html>","<html>","  <head>","    <title>ShadowDOM Inspector</title>","    <style>","      body {","      }","      pre {",'        font: 9pt "Courier New", monospace;',"        line-height: 1.5em;","      }","      tag {","        color: purple;","      }","      ul {","         margin: 0;","         padding: 0;","         list-style: none;","      }","      li {","         display: inline-block;","         background-color: #f1f1f1;","         padding: 4px 6px;","         border-radius: 4px;","         margin-right: 4px;","      }","    </style>","  </head>","  <body>",'    <ul id="crumbs">',"    </ul>",'    <div id="tree"></div>',"  </body>","</html>"].join("\n"),d=[],e=function(){var a=b.document,c=a.querySelector("#crumbs");c.textContent="";for(var e,g=0;e=d[g];g++){var h=a.createElement("a");h.href="#",h.textContent=e.localName,h.idx=g,h.onclick=function(a){for(var b;d.length>this.idx;)b=d.pop();f(b.shadow||b,b),a.preventDefault()},c.appendChild(a.createElement("li")).appendChild(h)}},f=function(a,c){var f=b.document;k=[];var g=c||a;d.push(g),e(),f.body.querySelector("#tree").innerHTML="<pre>"+j(a,a.childNodes)+"</pre>"},g=Array.prototype.forEach.call.bind(Array.prototype.forEach),h={STYLE:1,SCRIPT:1,"#comment":1,TEMPLATE:1},i=function(a){return h[a.nodeName]},j=function(a,b,c){if(i(a))return"";var d=c||"";if(a.localName||11==a.nodeType){var e=a.localName||"shadow-root",f=d+l(a);"content"==e&&(b=a.getDistributedNodes()),f+="<br/>";var h=d+"&nbsp;&nbsp;";g(b,function(a){f+=j(a,a.childNodes,h)}),f+=d,{br:1}[e]||(f+="<tag>&lt;/"+e+"&gt;</tag>",f+="<br/>")}else{var k=a.textContent.trim();f=k?d+'"'+k+'"<br/>':""}return f},k=[],l=function(a){var b="<tag>&lt;",c=a.localName||"shadow-root";return a.webkitShadowRoot||a.shadowRoot?(b+=' <button idx="'+k.length+'" onclick="api.shadowize.call(this)">'+c+"</button>",k.push(a)):b+=c||"shadow-root",a.attributes&&g(a.attributes,function(a){b+=" "+a.name+(a.value?'="'+a.value+'"':"")}),b+="&gt;</tag>"};shadowize=function(){var a=Number(this.attributes.idx.value),b=k[a];b?f(b.webkitShadowRoot||b.shadowRoot,b):(console.log("bad shadowize node"),console.dir(this))},a.output=j}(window.Inspector),function(){function a(){requestAnimationFrame(function(){for(var a,b=document.querySelectorAll(e),f=0,g=b.length;g>f&&(a=b[f]);f++)a.removeAttribute(c),a.setAttribute(d,"");if(b.length){var h=function(){for(var a,c=0,e=b.length;e>c&&(a=b[c]);c++)a.removeAttribute(d);document.body.removeEventListener(i,h,!1)};document.body.addEventListener(i,h,!1)}})}var b=.2,c="unresolved",d="resolved",e="["+c+"]",f="["+d+"]",g=document.createElement("style");g.textContent=e+" { opacity: 0; display: block; overflow: hidden; } \n"+f+"{ display: block; overflow: hidden;\n-webkit-transition: opacity "+b+"s; transition: opacity "+b+"s; }\n";var h=document.querySelector("head");h.insertBefore(g,h.firstChild);var i=void 0!==document.documentElement.style.webkitTransition?"webkitTransitionEnd":"transitionend";window.addEventListener("WebComponentsReady",a)}(Platform),window.HTMLImports=window.HTMLImports||{flags:{}},function(a){var b=(a.path,a.xhr),c=function(a,b){this.cache={},this.onload=a,this.oncomplete=b,this.inflight=0,this.pending={}};c.prototype={addNodes:function(a){this.inflight+=a.length,d(a,this.require,this),this.checkDone()},require:function(a){var b=a.src||a.href;a.__nodeUrl=b,this.dedupe(b,a)||this.fetch(b,a)},dedupe:function(a,b){return this.pending[a]?(this.pending[a].push(b),!0):this.cache[a]?(this.onload(a,b,this.cache[a]),this.tail(),!0):(this.pending[a]=[b],!1)},fetch:function(a,c){var d=function(b,d){this.receive(a,c,b,d)}.bind(this);b.load(a,d)},receive:function(a,b,c,d){c||(this.cache[a]=d),this.pending[a].forEach(function(b){c||this.onload(a,b,d),this.tail()},this),this.pending[a]=null},tail:function(){--this.inflight,this.checkDone()},checkDone:function(){this.inflight||this.oncomplete()}},b=b||{async:!0,ok:function(a){return a.status>=200&&a.status<300||304===a.status||0===a.status},load:function(c,d,e){var f=new XMLHttpRequest;return(a.flags.debug||a.flags.bust)&&(c+="?"+Math.random()),f.open("GET",c,b.async),f.addEventListener("readystatechange",function(){4===f.readyState&&d.call(e,!b.ok(f)&&f,f.response||f.responseText,c)}),f.send(),f},loadDocument:function(a,b,c){this.load(a,b,c).responseType="document"}};var d=Array.prototype.forEach.call.bind(Array.prototype.forEach);a.xhr=b,a.Loader=c}(window.HTMLImports),function(a){function b(a){return c(a,j)}function c(a,b){return"link"===a.localName&&a.getAttribute("rel")===b}function d(a){return"script"===a.localName}function e(a,b){var c=a;c instanceof Document||(c=document.implementation.createHTMLDocument(j)),c._URL=b;var d=c.createElement("base");return d.setAttribute("href",b),c.baseURI||(c.baseURI=b),c.head.appendChild(d),a instanceof Document||(c.body.innerHTML=a),window.HTMLTemplateElement&&HTMLTemplateElement.bootstrap&&HTMLTemplateElement.bootstrap(c),c}function f(a,b){function c(){k==l&&requestAnimationFrame(a)}function d(){k++,c()}b=b||o;var e=HTMLImports.isIE?"complete":"interactive",h="complete"===b.readyState||b.readyState===e;if(!h){var i=function(){("complete"===b.readyState||b.readyState===e)&&(b.removeEventListener("readystatechange",i),f(a,b))};return b.addEventListener("readystatechange",i),void 0}var j=b.querySelectorAll("link[rel=import]"),k=0,l=j.length;if(l)for(var m,n=0;l>n&&(m=j[n]);n++)g(m)?d.call(m):(m.addEventListener("load",d),m.addEventListener("error",d));else c()}function g(a){return i?a.import&&"loading"!==a.import.readyState:a.__importParsed}var h="import"in document.createElement("link"),i=!a.flags.imports&&h,j="import";if(!i){{var k,l=a.Loader,m=(a.xhr,"stylesheet"),n={documents:{},cache:{},preloadSelectors:["link[rel="+j+"]","template","script[src]:not([type])",'script[src][type="text/javascript"]'].join(","),loader:function(a){if(k&&k.inflight){var b=k.oncomplete;return k.oncomplete=function(){b(),a()},k}return k=new l(n.loaded,a),k.cache=n.cache,k},load:function(a,b){k=n.loader(b),n.preload(a)},preload:function(a){var b=this.marshalNodes(a);k.addNodes(b)},marshalNodes:function(a){var b=a.querySelectorAll(n.preloadSelectors);return b=this.filterMainDocumentNodes(a,b),b=this.extractTemplateNodes(b)},filterMainDocumentNodes:function(a,b){return a===document&&(b=Array.prototype.filter.call(b,function(a){return!d(a)})),b},extractTemplateNodes:function(a){var b=[];return a=Array.prototype.filter.call(a,function(a){if("template"===a.localName){if(a.content){var c=a.content.querySelectorAll("link[rel="+m+"]");c.length&&(b=b.concat(Array.prototype.slice.call(c,0)))}return!1}return!0}),b.length&&(a=a.concat(b)),a},loaded:function(a,c,d){if(b(c)){var f=n.documents[a];f||(f=e(d,a),n.documents[a]=f,n.preload(f)),c.import=c.content=d=f}c.__resource=d}};Array.prototype.forEach.call.bind(Array.prototype.forEach)}a.importer=n}var o=window.ShadowDOMPolyfill?wrap(document):document;Object.defineProperty(o,"_currentScript",{get:function(){return HTMLImports.currentScript||o.currentScript},writeable:!0,configurable:!0}),a.hasNative=h,a.useNative=i,a.whenImportsReady=f,a.IMPORT_LINK_TYPE=j,a.isImportLoaded=g}(window.HTMLImports),function(a){function b(a){var b=a.ownerDocument.createElement("style");return b.textContent=a.textContent,g.resolveUrlsInStyle(b),b}function c(a,b){this.doc=a,this.doc.__loadTracker=this,this.callback=b}function d(a){return"link"===a.localName&&a.getAttribute("rel")===h}function e(a){return a.parentNode&&!f(a)}function f(a){return a.ownerDocument===document||a.ownerDocument.impl===document}var g=a.path,h="import",i=/Trident/.test(navigator.userAgent),j={selectors:["link[rel="+h+"]","link[rel=stylesheet]","style","script:not([type])",'script[type="text/javascript"]'],map:{link:"parseLink",script:"parseScript",style:"parseStyle"},parse:function(a,b){if(a.__importParsed)b&&b();else{a.__importParsed=!0;for(var d,e=new c(a,b),f=a.querySelectorAll(j.selectors),g=document.scripts?document.scripts.length:0,h=0;h<f.length&&(d=f[h]);h++)j[j.map[d.localName]](d),document.scripts&&g!==document.scripts.length&&(g=document.scripts.length,f=a.querySelectorAll(j.selectors));e.open()}},parseLink:function(a){if(d(a)){if(this.trackElement(a),a.__resource?j.parse(a.__resource,function(){a.dispatchEvent(new CustomEvent("load",{bubbles:!1}))}):a.dispatchEvent(new CustomEvent("error",{bubbles:!1})),a.__pending)for(var b;a.__pending.length;)b=a.__pending.shift(),b&&b({target:a});a.__importParsed=!0}else e(a)&&(a.href=a.href),this.parseGeneric(a)},trackElement:function(a){i&&"style"===a.localName||a.ownerDocument.__loadTracker.require(a)},parseStyle:function(a){a=e(a)?b(a):a,this.parseGeneric(a)},parseGeneric:function(a){f(a)||(this.trackElement(a),document.head.appendChild(a))},parseScript:function(b){if(e(b)){var c=(b.__resource||b.textContent).trim();if(c){var d=b.__nodeUrl;if(!d){d=b.ownerDocument.baseURI;var f="["+Math.floor(1e3*(Math.random()+1))+"]",g=c.match(/Polymer\(['"]([^'"]*)/);f=g&&g[1]||f,d+="/"+f+".js"}c+="\n//# sourceURL="+d+"\n",a.currentScript=b,eval.call(window,c),a.currentScript=null}}}},k=/(url\()([^)]*)(\))/g,l=/(@import[\s]*)([^;]*)(;)/g,g={resolveUrlsInStyle:function(a){var b=a.ownerDocument,c=b.createElement("a");return a.textContent=this.resolveUrlsInCssText(a.textContent,c),a},resolveUrlsInCssText:function(a,b){var c=this.replaceUrls(a,b,k);return c=this.replaceUrls(c,b,l)},replaceUrls:function(a,b,c){return a.replace(c,function(a,c,d,e){var f=d.replace(/["']/g,"");return b.href=f,f=b.href,c+"'"+f+"'"+e})}};c.prototype={pending:0,isOpen:!1,open:function(){this.isOpen=!0,this.checkDone()},add:function(){this.pending++},require:function(a){this.add();var b=this,c=function(a){b.receive(a)};if(d(a))a.__pending=a.__pending||[],a.__pending.push(c);else for(var e,f=["load","error"],g=0,h=f.length;h>g&&(e=f[g]);g++)a.addEventListener(e,c)},receive:function(){this.pending--,this.checkDone()},checkDone:function(){this.isOpen&&this.pending<=0&&this.callback&&(this.isOpen=!1,this.callback())}};Array.prototype.forEach.call.bind(Array.prototype.forEach);a.parser=j,a.path=g,a.isIE=i}(HTMLImports),function(){function a(){HTMLImports.ready=!0,HTMLImports.readyTime=(new Date).getTime(),c.dispatchEvent(new CustomEvent("HTMLImportsLoaded",{bubbles:!0}))}function b(){HTMLImports.useNative||HTMLImports.importer.load(c,function(){HTMLImports.parser.parse(c)})}"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(a,b){var c=document.createEvent("HTMLEvents");return c.initEvent(a,b.bubbles===!1?!1:!0,b.cancelable===!1?!1:!0,b.detail),c});var c=window.ShadowDOMPolyfill?window.ShadowDOMPolyfill.wrapIfNeeded(document):document;HTMLImports.useNative||("complete"===document.readyState||"interactive"===document.readyState&&!window.attachEvent?b():document.addEventListener("DOMContentLoaded",b)),HTMLImports.whenImportsReady(function(){a()})}(),function(a){function b(a){u.push(a),t||(t=!0,q(d))}function c(a){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(a)||a}function d(){t=!1;var a=u;u=[],a.sort(function(a,b){return a.uid_-b.uid_});var b=!1;a.forEach(function(a){var c=a.takeRecords();e(a),c.length&&(a.callback_(c,a),b=!0)}),b&&d()}function e(a){a.nodes_.forEach(function(b){var c=p.get(b);c&&c.forEach(function(b){b.observer===a&&b.removeTransientObservers()})})}function f(a,b){for(var c=a;c;c=c.parentNode){var d=p.get(c);if(d)for(var e=0;e<d.length;e++){var f=d[e],g=f.options;if(c===a||g.subtree){var h=b(g);h&&f.enqueue(h)}}}}function g(a){this.callback_=a,this.nodes_=[],this.records_=[],this.uid_=++v}function h(a,b){this.type=a,this.target=b,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function i(a){var b=new h(a.type,a.target);return b.addedNodes=a.addedNodes.slice(),b.removedNodes=a.removedNodes.slice(),b.previousSibling=a.previousSibling,b.nextSibling=a.nextSibling,b.attributeName=a.attributeName,b.attributeNamespace=a.attributeNamespace,b.oldValue=a.oldValue,b}function j(a,b){return w=new h(a,b)}function k(a){return x?x:(x=i(w),x.oldValue=a,x)}function l(){w=x=void 0}function m(a){return a===x||a===w
}function n(a,b){return a===b?a:x&&m(a)?x:null}function o(a,b,c){this.observer=a,this.target=b,this.options=c,this.transientObservedNodes=[]}var p=new WeakMap,q=window.msSetImmediate;if(!q){var r=[],s=String(Math.random());window.addEventListener("message",function(a){if(a.data===s){var b=r;r=[],b.forEach(function(a){a()})}}),q=function(a){r.push(a),window.postMessage(s,"*")}}var t=!1,u=[],v=0;g.prototype={observe:function(a,b){if(a=c(a),!b.childList&&!b.attributes&&!b.characterData||b.attributeOldValue&&!b.attributes||b.attributeFilter&&b.attributeFilter.length&&!b.attributes||b.characterDataOldValue&&!b.characterData)throw new SyntaxError;var d=p.get(a);d||p.set(a,d=[]);for(var e,f=0;f<d.length;f++)if(d[f].observer===this){e=d[f],e.removeListeners(),e.options=b;break}e||(e=new o(this,a,b),d.push(e),this.nodes_.push(a)),e.addListeners()},disconnect:function(){this.nodes_.forEach(function(a){for(var b=p.get(a),c=0;c<b.length;c++){var d=b[c];if(d.observer===this){d.removeListeners(),b.splice(c,1);break}}},this),this.records_=[]},takeRecords:function(){var a=this.records_;return this.records_=[],a}};var w,x;o.prototype={enqueue:function(a){var c=this.observer.records_,d=c.length;if(c.length>0){var e=c[d-1],f=n(e,a);if(f)return c[d-1]=f,void 0}else b(this.observer);c[d]=a},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(a){var b=this.options;b.attributes&&a.addEventListener("DOMAttrModified",this,!0),b.characterData&&a.addEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.addEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(a){var b=this.options;b.attributes&&a.removeEventListener("DOMAttrModified",this,!0),b.characterData&&a.removeEventListener("DOMCharacterDataModified",this,!0),b.childList&&a.removeEventListener("DOMNodeInserted",this,!0),(b.childList||b.subtree)&&a.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(a){if(a!==this.target){this.addListeners_(a),this.transientObservedNodes.push(a);var b=p.get(a);b||p.set(a,b=[]),b.push(this)}},removeTransientObservers:function(){var a=this.transientObservedNodes;this.transientObservedNodes=[],a.forEach(function(a){this.removeListeners_(a);for(var b=p.get(a),c=0;c<b.length;c++)if(b[c]===this){b.splice(c,1);break}},this)},handleEvent:function(a){switch(a.stopImmediatePropagation(),a.type){case"DOMAttrModified":var b=a.attrName,c=a.relatedNode.namespaceURI,d=a.target,e=new j("attributes",d);e.attributeName=b,e.attributeNamespace=c;var g=a.attrChange===MutationEvent.ADDITION?null:a.prevValue;f(d,function(a){return!a.attributes||a.attributeFilter&&a.attributeFilter.length&&-1===a.attributeFilter.indexOf(b)&&-1===a.attributeFilter.indexOf(c)?void 0:a.attributeOldValue?k(g):e});break;case"DOMCharacterDataModified":var d=a.target,e=j("characterData",d),g=a.prevValue;f(d,function(a){return a.characterData?a.characterDataOldValue?k(g):e:void 0});break;case"DOMNodeRemoved":this.addTransientObserver(a.target);case"DOMNodeInserted":var h,i,d=a.relatedNode,m=a.target;"DOMNodeInserted"===a.type?(h=[m],i=[]):(h=[],i=[m]);var n=m.previousSibling,o=m.nextSibling,e=j("childList",d);e.addedNodes=h,e.removedNodes=i,e.previousSibling=n,e.nextSibling=o,f(d,function(a){return a.childList?e:void 0})}l()}},a.JsMutationObserver=g,a.MutationObserver||(a.MutationObserver=g)}(this),window.CustomElements=window.CustomElements||{flags:{}},function(a){function b(a,c,d){var e=a.firstElementChild;if(!e)for(e=a.firstChild;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.nextSibling;for(;e;)c(e,d)!==!0&&b(e,c,d),e=e.nextElementSibling;return null}function c(a,b){for(var c=a.shadowRoot;c;)d(c,b),c=c.olderShadowRoot}function d(a,d){b(a,function(a){return d(a)?!0:(c(a,d),void 0)}),c(a,d)}function e(a){return h(a)?(i(a),!0):(l(a),void 0)}function f(a){d(a,function(a){return e(a)?!0:void 0})}function g(a){return e(a)||f(a)}function h(b){if(!b.__upgraded__&&b.nodeType===Node.ELEMENT_NODE){var c=b.getAttribute("is")||b.localName,d=a.registry[c];if(d)return A.dom&&console.group("upgrade:",b.localName),a.upgrade(b),A.dom&&console.groupEnd(),!0}}function i(a){l(a),r(a)&&d(a,function(a){l(a)})}function j(a){if(E.push(a),!D){D=!0;var b=window.Platform&&window.Platform.endOfMicrotask||setTimeout;b(k)}}function k(){D=!1;for(var a,b=E,c=0,d=b.length;d>c&&(a=b[c]);c++)a();E=[]}function l(a){C?j(function(){m(a)}):m(a)}function m(a){(a.attachedCallback||a.detachedCallback||a.__upgraded__&&A.dom)&&(A.dom&&console.group("inserted:",a.localName),r(a)&&(a.__inserted=(a.__inserted||0)+1,a.__inserted<1&&(a.__inserted=1),a.__inserted>1?A.dom&&console.warn("inserted:",a.localName,"insert/remove count:",a.__inserted):a.attachedCallback&&(A.dom&&console.log("inserted:",a.localName),a.attachedCallback())),A.dom&&console.groupEnd())}function n(a){o(a),d(a,function(a){o(a)})}function o(a){C?j(function(){p(a)}):p(a)}function p(a){(a.attachedCallback||a.detachedCallback||a.__upgraded__&&A.dom)&&(A.dom&&console.group("removed:",a.localName),r(a)||(a.__inserted=(a.__inserted||0)-1,a.__inserted>0&&(a.__inserted=0),a.__inserted<0?A.dom&&console.warn("removed:",a.localName,"insert/remove count:",a.__inserted):a.detachedCallback&&a.detachedCallback()),A.dom&&console.groupEnd())}function q(a){return window.ShadowDOMPolyfill?ShadowDOMPolyfill.wrapIfNeeded(a):a}function r(a){for(var b=a,c=q(document);b;){if(b==c)return!0;b=b.parentNode||b.host}}function s(a){if(a.shadowRoot&&!a.shadowRoot.__watched){A.dom&&console.log("watching shadow-root for: ",a.localName);for(var b=a.shadowRoot;b;)t(b),b=b.olderShadowRoot}}function t(a){a.__watched||(w(a),a.__watched=!0)}function u(a){if(A.dom){var b=a[0];if(b&&"childList"===b.type&&b.addedNodes&&b.addedNodes){for(var c=b.addedNodes[0];c&&c!==document&&!c.host;)c=c.parentNode;var d=c&&(c.URL||c._URL||c.host&&c.host.localName)||"";d=d.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",a.length,d||"")}a.forEach(function(a){"childList"===a.type&&(G(a.addedNodes,function(a){a.localName&&g(a)}),G(a.removedNodes,function(a){a.localName&&n(a)}))}),A.dom&&console.groupEnd()}function v(){u(F.takeRecords()),k()}function w(a){F.observe(a,{childList:!0,subtree:!0})}function x(a){w(a)}function y(a){A.dom&&console.group("upgradeDocument: ",a.baseURI.split("/").pop()),g(a),A.dom&&console.groupEnd()}function z(a){a=q(a),y(a);for(var b,c=a.querySelectorAll("link[rel="+B+"]"),d=0,e=c.length;e>d&&(b=c[d]);d++)b.import&&b.import.__parsed&&z(b.import)}var A=window.logFlags||{},B=window.HTMLImports?HTMLImports.IMPORT_LINK_TYPE:"none",C=!window.MutationObserver||window.MutationObserver===window.JsMutationObserver;a.hasPolyfillMutations=C;var D=!1,E=[],F=new MutationObserver(u),G=Array.prototype.forEach.call.bind(Array.prototype.forEach);a.IMPORT_LINK_TYPE=B,a.watchShadow=s,a.upgradeDocumentTree=z,a.upgradeAll=g,a.upgradeSubtree=f,a.observeDocument=x,a.upgradeDocument=y,a.takeRecords=v}(window.CustomElements),function(a){function b(b,f){var g=f||{};if(!b)throw new Error("document.registerElement: first argument `name` must not be empty");if(b.indexOf("-")<0)throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '"+String(b)+"'.");if(m(b))throw new Error("DuplicateDefinitionError: a type with name '"+String(b)+"' is already registered");if(!g.prototype)throw new Error("Options missing required prototype property");return g.__name=b.toLowerCase(),g.lifecycle=g.lifecycle||{},g.ancestry=c(g.extends),d(g),e(g),k(g.prototype),n(g.__name,g),g.ctor=o(g),g.ctor.prototype=g.prototype,g.prototype.constructor=g.ctor,a.ready&&a.upgradeDocumentTree(document),g.ctor}function c(a){var b=m(a);return b?c(b.extends).concat([b]):[]}function d(a){for(var b,c=a.extends,d=0;b=a.ancestry[d];d++)c=b.is&&b.tag;a.tag=c||a.__name,c&&(a.is=a.__name)}function e(a){if(!Object.__proto__){var b=HTMLElement.prototype;if(a.is){var c=document.createElement(a.tag);b=Object.getPrototypeOf(c)}for(var d,e=a.prototype;e&&e!==b;){var d=Object.getPrototypeOf(e);e.__proto__=d,e=d}}a.native=b}function f(a){return g(x(a.tag),a)}function g(b,c){return c.is&&b.setAttribute("is",c.is),b.removeAttribute("unresolved"),h(b,c),b.__upgraded__=!0,a.upgradeSubtree(b),j(b),b}function h(a,b){Object.__proto__?a.__proto__=b.prototype:(i(a,b.prototype,b.native),a.__proto__=b.prototype)}function i(a,b,c){for(var d={},e=b;e!==c&&e!==HTMLUnknownElement.prototype;){for(var f,g=Object.getOwnPropertyNames(e),h=0;f=g[h];h++)d[f]||(Object.defineProperty(a,f,Object.getOwnPropertyDescriptor(e,f)),d[f]=1);e=Object.getPrototypeOf(e)}}function j(a){a.createdCallback&&a.createdCallback()}function k(a){if(!a.setAttribute._polyfilled){var b=a.setAttribute;a.setAttribute=function(a,c){l.call(this,a,c,b)};var c=a.removeAttribute;a.removeAttribute=function(a){l.call(this,a,null,c)},a.setAttribute._polyfilled=!0}}function l(a,b,c){var d=this.getAttribute(a);c.apply(this,arguments);var e=this.getAttribute(a);this.attributeChangedCallback&&e!==d&&this.attributeChangedCallback(a,d,e)}function m(a){return a?w[a.toLowerCase()]:void 0}function n(a,b){w[a]=b}function o(a){return function(){return f(a)}}function p(a,b){var c=m(b||a);return c?new c.ctor:x(a)}function q(a){if(!a.__upgraded__&&a.nodeType===Node.ELEMENT_NODE){var b=a.getAttribute("is")||a.localName,c=m(b);return c&&g(a,c)}}function r(b){var c=y.call(this,b);return a.upgradeAll(c),c}a||(a=window.CustomElements={flags:{}});var s=a.flags,t=Boolean(document.registerElement),u=!s.register&&t&&!window.ShadowDOMPolyfill;if(u){var v=function(){};a.registry={},a.upgradeElement=v,a.watchShadow=v,a.upgrade=v,a.upgradeAll=v,a.upgradeSubtree=v,a.observeDocument=v,a.upgradeDocument=v,a.takeRecords=v}else{var w={},x=document.createElement.bind(document),y=Node.prototype.cloneNode;document.registerElement=b,document.createElement=p,Node.prototype.cloneNode=r,a.registry=w,a.upgrade=q}document.register=document.registerElement,a.hasNative=t,a.useNative=u}(window.CustomElements),function(a){function b(a){return"link"===a.localName&&a.getAttribute("rel")===c}var c=a.IMPORT_LINK_TYPE,d={selectors:["link[rel="+c+"]"],map:{link:"parseLink"},parse:function(a){if(!a.__parsed){a.__parsed=!0;var b=a.querySelectorAll(d.selectors);e(b,function(a){d[d.map[a.localName]](a)}),CustomElements.upgradeDocument(a),CustomElements.observeDocument(a)}},parseLink:function(a){b(a)&&this.parseImport(a)},parseImport:function(a){a.import&&d.parse(a.import)}},e=Array.prototype.forEach.call.bind(Array.prototype.forEach);a.parser=d,a.IMPORT_LINK_TYPE=c}(window.CustomElements),function(a){function b(){CustomElements.parser.parse(document),CustomElements.upgradeDocument(document);var a=window.Platform&&Platform.endOfMicrotask?Platform.endOfMicrotask:setTimeout;a(function(){CustomElements.ready=!0,CustomElements.readyTime=Date.now(),window.HTMLImports&&(CustomElements.elapsed=CustomElements.readyTime-HTMLImports.readyTime),document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})}if("function"!=typeof window.CustomEvent&&(window.CustomEvent=function(a){var b=document.createEvent("HTMLEvents");return b.initEvent(a,!0,!0),b}),"complete"===document.readyState||a.flags.eager)b();else if("interactive"!==document.readyState||window.attachEvent||window.HTMLImports&&!window.HTMLImports.ready){var c=window.HTMLImports&&!HTMLImports.ready?"HTMLImportsLoaded":"DOMContentLoaded";window.addEventListener(c,b)}else b()}(window.CustomElements),function(){var a=document.createElement("style");a.textContent="element {display: none !important;} /* injected by platform.js */";var b=document.querySelector("head");if(b.insertBefore(a,b.firstChild),window.ShadowDOMPolyfill){var c=["upgradeAll","upgradeSubtree","observeDocument","upgradeDocument"],d={};c.forEach(function(a){d[a]=CustomElements[a]}),c.forEach(function(a){CustomElements[a]=function(b){return d[a](wrap(b))}})}}(),function(a){function b(a){f.textContent=d++,e.push(a)}function c(){for(;e.length;)e.shift()()}var d=0,e=[],f=document.createTextNode("");new(window.MutationObserver||JsMutationObserver)(c).observe(f,{characterData:!0}),a.endOfMicrotask=b}(Platform),function(a){function b(a,b){var d=c(a);b&&(d.addEventListener("load",b),d.addEventListener("error",b)),n.appendChild(d)}function c(a,b){b=b||document,b=b.createElement?b:b.ownerDocument;var c=b.createElement("style");return c.textContent=a,c}function d(a,b){b=b||"";var c=document.implementation.createHTMLDocument("");if(a){var d=c.createElement("base");d.href=a,c.head.appendChild(d)}var e=c.createElement("a");return e.href=b,c.body.appendChild(e),e}function e(a,b){return HTMLImports.path.resolveUrlsInCssText(a,d(b))}function f(a){return HTMLImports.path.resolveUrlsInStyle(a)}function g(a,b){HTMLImports.xhr.load(h(a),function(a,c,d){i(this,d,c),this.textContent=e(this.textContent,d),b&&b(this)},a)}function h(a){var b=a.textContent.match(o);return b&&b[1]}function i(a,b,c){var d=new RegExp("@import[^;]*"+b+"[^;]*;","i");a.textContent=a.textContent.replace(d,c)}var j="style",k="@import",l={loadStyles:function(a,b){var c=this.findLoadableStyles(a);c.length?window.ShadowDOMPolyfill?this.polyfillLoadStyles(c,b):this.platformLoadStyles(c,b):b&&b()},findLoadableStyles:function(a){var b=[];if(a)for(var c,d=a.querySelectorAll(j),e=0,f=d.length;f>e&&(c=d[e]);e++)c.textContent.match(k)&&b.push(c);return b},platformLoadStyles:function(a,c){for(var d,e=[],f=0,g=a.length;g>f&&(d=a[f]);f++)e.push(d.textContent);b(e.join("\n"),c)},polyfillLoadStyles:function(a,b){function c(){e++,e===f&&b&&b()}for(var d,e=0,f=a.length,h=0;f>h&&(d=a[h]);h++)g(d,c)}},m=document.createElement("preloader");m.style.display="none";var n=m.createShadowRoot();document.head.appendChild(m);var o=/@import\s[(]?['"]?([^\s'";)]*)/;l.resolveUrlsInCssText=e,l.resolveUrlsInStyle=f,a.loader=l}(window.Platform),function(a){a=a||{},a.external=a.external||{};var b={shadow:function(a){return a?a.shadowRoot||a.webkitShadowRoot:void 0},canTarget:function(a){return a&&Boolean(a.elementFromPoint)},targetingShadow:function(a){var b=this.shadow(a);return this.canTarget(b)?b:void 0},olderShadow:function(a){var b=a.olderShadowRoot;if(!b){var c=a.querySelector("shadow");c&&(b=c.olderShadowRoot)}return b},allShadows:function(a){for(var b=[],c=this.shadow(a);c;)b.push(c),c=this.olderShadow(c);return b},searchRoot:function(a,b,c){if(a){var d,e,f=a.elementFromPoint(b,c);for(e=this.targetingShadow(f);e;){if(d=e.elementFromPoint(b,c)){var g=this.targetingShadow(d);return this.searchRoot(g,b,c)||d}e=this.olderShadow(e)}return f}},owner:function(a){for(var b=a;b.parentNode;)b=b.parentNode;return b.nodeType!=Node.DOCUMENT_NODE&&b.nodeType!=Node.DOCUMENT_FRAGMENT_NODE&&(b=document),b},findTarget:function(a){var b=a.clientX,c=a.clientY,d=this.owner(a.target);return d.elementFromPoint(b,c)||(d=document),this.searchRoot(d,b,c)}};a.targetFinding=b,a.findTarget=b.findTarget.bind(b),window.PointerEventsPolyfill=a}(window.PointerEventsPolyfill),function(){function a(a){return"body ^^ "+b(a)}function b(a){return'[touch-action="'+a+'"]'}function c(a){return"{ -ms-touch-action: "+a+"; touch-action: "+a+"; touch-action-delay: none; }"}var d=["none","auto","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["pan-x pan-y","pan-y pan-x"]}],e="";d.forEach(function(d){String(d)===d?(e+=b(d)+c(d)+"\n",e+=a(d)+c(d)+"\n"):(e+=d.selectors.map(b)+c(d.rule)+"\n",e+=d.selectors.map(a)+c(d.rule)+"\n")});var f=document.createElement("style");f.textContent=e,document.head.appendChild(f)}(),function(a){function b(a,e){e=e||{};var f=e.buttons;if(void 0===f)switch(e.which){case 1:f=1;break;case 2:f=4;break;case 3:f=2;break;default:f=0}var i;if(c)i=new MouseEvent(a,e);else{i=document.createEvent("MouseEvent");for(var j,k={},l=0;l<g.length;l++)j=g[l],k[j]=e[j]||h[l];i.initMouseEvent(a,k.bubbles,k.cancelable,k.view,k.detail,k.screenX,k.screenY,k.clientX,k.clientY,k.ctrlKey,k.altKey,k.shiftKey,k.metaKey,k.button,k.relatedTarget)}i.__proto__=b.prototype,d||Object.defineProperty(i,"buttons",{get:function(){return f},enumerable:!0});var m=0;return m=e.pressure?e.pressure:f?.5:0,Object.defineProperties(i,{pointerId:{value:e.pointerId||0,enumerable:!0},width:{value:e.width||0,enumerable:!0},height:{value:e.height||0,enumerable:!0},pressure:{value:m,enumerable:!0},tiltX:{value:e.tiltX||0,enumerable:!0},tiltY:{value:e.tiltY||0,enumerable:!0},pointerType:{value:e.pointerType||"",enumerable:!0},hwTimestamp:{value:e.hwTimestamp||0,enumerable:!0},isPrimary:{value:e.isPrimary||!1,enumerable:!0}}),i}var c=!1,d=!1;try{var e=new MouseEvent("click",{buttons:1});c=!0,d=1===e.buttons}catch(f){}var g=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget"],h=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null];b.prototype=Object.create(MouseEvent.prototype),a.PointerEvent||(a.PointerEvent=b)}(window),function(a){function b(){if(c){var a=new Map;return a.pointers=d,a}this.keys=[],this.values=[]}var c=window.Map&&window.Map.prototype.forEach,d=function(){return this.size};b.prototype={set:function(a,b){var c=this.keys.indexOf(a);c>-1?this.values[c]=b:(this.keys.push(a),this.values.push(b))},has:function(a){return this.keys.indexOf(a)>-1},"delete":function(a){var b=this.keys.indexOf(a);b>-1&&(this.keys.splice(b,1),this.values.splice(b,1))},get:function(a){var b=this.keys.indexOf(a);return this.values[b]},clear:function(){this.keys.length=0,this.values.length=0},forEach:function(a,b){this.values.forEach(function(c,d){a.call(b,c,this.keys[d],this)},this)},pointers:function(){return this.keys.length}},a.PointerMap=b}(window.PointerEventsPolyfill),function(a){var b=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","buttons","pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","type","target","currentTarget","which"],c=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,void 0,0,0,0,0,0,0,"",0,!1,"",null,null,0],d={targets:new WeakMap,handledEvents:new WeakMap,pointermap:new a.PointerMap,eventMap:{},eventSources:{},eventSourceList:[],registerSource:function(a,b){var c=b,d=c.events;d&&(d.forEach(function(a){c[a]&&(this.eventMap[a]=c[a].bind(c))},this),this.eventSources[a]=c,this.eventSourceList.push(c))},register:function(a){for(var b,c=this.eventSourceList.length,d=0;c>d&&(b=this.eventSourceList[d]);d++)b.register.call(b,a)},unregister:function(a){for(var b,c=this.eventSourceList.length,d=0;c>d&&(b=this.eventSourceList[d]);d++)b.unregister.call(b,a)},contains:a.external.contains||function(a,b){return a.contains(b)},down:function(a){this.fireEvent("pointerdown",a)},move:function(a){this.fireEvent("pointermove",a)},up:function(a){this.fireEvent("pointerup",a)},enter:function(a){a.bubbles=!1,this.fireEvent("pointerenter",a)},leave:function(a){a.bubbles=!1,this.fireEvent("pointerleave",a)},over:function(a){a.bubbles=!0,this.fireEvent("pointerover",a)},out:function(a){a.bubbles=!0,this.fireEvent("pointerout",a)},cancel:function(a){this.fireEvent("pointercancel",a)},leaveOut:function(a){this.contains(a.target,a.relatedTarget)||this.leave(a),this.out(a)},enterOver:function(a){this.contains(a.target,a.relatedTarget)||this.enter(a),this.over(a)},eventHandler:function(a){if(!this.handledEvents.get(a)){var b=a.type,c=this.eventMap&&this.eventMap[b];c&&c(a),this.handledEvents.set(a,!0)}},listen:function(a,b){b.forEach(function(b){this.addEvent(a,b)},this)},unlisten:function(a,b){b.forEach(function(b){this.removeEvent(a,b)},this)},addEvent:a.external.addEvent||function(a,b){a.addEventListener(b,this.boundHandler)},removeEvent:a.external.removeEvent||function(a,b){a.removeEventListener(b,this.boundHandler)},makeEvent:function(a,b){this.captureInfo&&(b.relatedTarget=null);var c=new PointerEvent(a,b);return b.preventDefault&&(c.preventDefault=b.preventDefault),this.targets.set(c,this.targets.get(b)||b.target),c},fireEvent:function(a,b){var c=this.makeEvent(a,b);return this.dispatchEvent(c)},cloneEvent:function(a){for(var d,e={},f=0;f<b.length;f++)d=b[f],e[d]=a[d]||c[f];return a.preventDefault&&(e.preventDefault=function(){a.preventDefault()}),e},getTarget:function(a){return this.captureInfo&&this.captureInfo.id===a.pointerId?this.captureInfo.target:this.targets.get(a)},setCapture:function(a,b){this.captureInfo&&this.releaseCapture(this.captureInfo.id),this.captureInfo={id:a,target:b};var c=new PointerEvent("gotpointercapture",{bubbles:!0});this.implicitRelease=this.releaseCapture.bind(this,a),document.addEventListener("pointerup",this.implicitRelease),document.addEventListener("pointercancel",this.implicitRelease),this.targets.set(c,b),this.asyncDispatchEvent(c)},releaseCapture:function(a){if(this.captureInfo&&this.captureInfo.id===a){var b=new PointerEvent("lostpointercapture",{bubbles:!0}),c=this.captureInfo.target;this.captureInfo=null,document.removeEventListener("pointerup",this.implicitRelease),document.removeEventListener("pointercancel",this.implicitRelease),this.targets.set(b,c),this.asyncDispatchEvent(b)}},dispatchEvent:a.external.dispatchEvent||function(a){var b=this.getTarget(a);return b?b.dispatchEvent(a):void 0},asyncDispatchEvent:function(a){setTimeout(this.dispatchEvent.bind(this,a),0)}};d.boundHandler=d.eventHandler.bind(d),a.dispatcher=d,a.register=d.register.bind(d),a.unregister=d.unregister.bind(d)}(window.PointerEventsPolyfill),function(a){function b(a,b,c,d){this.addCallback=a.bind(d),this.removeCallback=b.bind(d),this.changedCallback=c.bind(d),g&&(this.observer=new g(this.mutationWatcher.bind(this)))}var c=Array.prototype.forEach.call.bind(Array.prototype.forEach),d=Array.prototype.map.call.bind(Array.prototype.map),e=Array.prototype.slice.call.bind(Array.prototype.slice),f=Array.prototype.filter.call.bind(Array.prototype.filter),g=window.MutationObserver||window.WebKitMutationObserver,h="[touch-action]",i={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,attributeFilter:["touch-action"]};b.prototype={watchSubtree:function(b){a.targetFinding.canTarget(b)&&this.observer.observe(b,i)},enableOnSubtree:function(a){this.watchSubtree(a),a===document&&"complete"!==document.readyState?this.installOnLoad():this.installNewSubtree(a)},installNewSubtree:function(a){c(this.findElements(a),this.addElement,this)},findElements:function(a){return a.querySelectorAll?a.querySelectorAll(h):[]},removeElement:function(a){this.removeCallback(a)},addElement:function(a){this.addCallback(a)},elementChanged:function(a,b){this.changedCallback(a,b)},concatLists:function(a,b){return a.concat(e(b))},installOnLoad:function(){document.addEventListener("DOMContentLoaded",this.installNewSubtree.bind(this,document))},isElement:function(a){return a.nodeType===Node.ELEMENT_NODE},flattenMutationTree:function(a){var b=d(a,this.findElements,this);return b.push(f(a,this.isElement)),b.reduce(this.concatLists,[])},mutationWatcher:function(a){a.forEach(this.mutationHandler,this)},mutationHandler:function(a){if("childList"===a.type){var b=this.flattenMutationTree(a.addedNodes);b.forEach(this.addElement,this);var c=this.flattenMutationTree(a.removedNodes);c.forEach(this.removeElement,this)}else"attributes"===a.type&&this.elementChanged(a.target,a.oldValue)}},g||(b.prototype.watchSubtree=function(){console.warn("PointerEventsPolyfill: MutationObservers not found, touch-action will not be dynamically detected")}),a.Installer=b}(window.PointerEventsPolyfill),function(a){var b=a.dispatcher,c=b.pointermap,d=25,e={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup","mouseover","mouseout"],register:function(a){b.listen(a,this.events)},unregister:function(a){b.unlisten(a,this.events)},lastTouches:[],isEventSimulatedFromTouch:function(a){for(var b,c=this.lastTouches,e=a.clientX,f=a.clientY,g=0,h=c.length;h>g&&(b=c[g]);g++){var i=Math.abs(e-b.x),j=Math.abs(f-b.y);if(d>=i&&d>=j)return!0}},prepareEvent:function(a){var c=b.cloneEvent(a),d=c.preventDefault;return c.preventDefault=function(){a.preventDefault(),d()},c.pointerId=this.POINTER_ID,c.isPrimary=!0,c.pointerType=this.POINTER_TYPE,c},mousedown:function(a){if(!this.isEventSimulatedFromTouch(a)){var d=c.has(this.POINTER_ID);d&&this.cancel(a);var e=this.prepareEvent(a);c.set(this.POINTER_ID,a),b.down(e)}},mousemove:function(a){if(!this.isEventSimulatedFromTouch(a)){var c=this.prepareEvent(a);b.move(c)}},mouseup:function(a){if(!this.isEventSimulatedFromTouch(a)){var d=c.get(this.POINTER_ID);if(d&&d.button===a.button){var e=this.prepareEvent(a);b.up(e),this.cleanupMouse()}}},mouseover:function(a){if(!this.isEventSimulatedFromTouch(a)){var c=this.prepareEvent(a);b.enterOver(c)}},mouseout:function(a){if(!this.isEventSimulatedFromTouch(a)){var c=this.prepareEvent(a);b.leaveOut(c)}},cancel:function(a){var c=this.prepareEvent(a);b.cancel(c),this.cleanupMouse()},cleanupMouse:function(){c["delete"](this.POINTER_ID)}};a.mouseEvents=e}(window.PointerEventsPolyfill),function(a){var b,c=a.dispatcher,d=a.findTarget,e=a.targetFinding.allShadows.bind(a.targetFinding),f=c.pointermap,g=Array.prototype.map.call.bind(Array.prototype.map),h=2500,i=200,j="touch-action",k=!1,l={scrollType:new WeakMap,events:["touchstart","touchmove","touchend","touchcancel"],register:function(a){k?c.listen(a,this.events):b.enableOnSubtree(a)},unregister:function(a){k&&c.unlisten(a,this.events)},elementAdded:function(a){var b=a.getAttribute(j),d=this.touchActionToScrollType(b);d&&(this.scrollType.set(a,d),c.listen(a,this.events),e(a).forEach(function(a){this.scrollType.set(a,d),c.listen(a,this.events)},this))},elementRemoved:function(a){this.scrollType["delete"](a),c.unlisten(a,this.events),e(a).forEach(function(a){this.scrollType["delete"](a),c.unlisten(a,this.events)},this)},elementChanged:function(a,b){var c=a.getAttribute(j),d=this.touchActionToScrollType(c),f=this.touchActionToScrollType(b);d&&f?(this.scrollType.set(a,d),e(a).forEach(function(a){this.scrollType.set(a,d)},this)):f?this.elementRemoved(a):d&&this.elementAdded(a)},scrollTypes:{EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y",SCROLLER:/^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/},touchActionToScrollType:function(a){var b=a,c=this.scrollTypes;return"none"===b?"none":b===c.XSCROLLER?"X":b===c.YSCROLLER?"Y":c.SCROLLER.exec(b)?"XY":void 0},POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(a){return this.firstTouch===a.identifier},setPrimaryTouch:function(a){(0===f.pointers()||1===f.pointers()&&f.has(1))&&(this.firstTouch=a.identifier,this.firstXY={X:a.clientX,Y:a.clientY},this.scrolling=!1,this.cancelResetClickCount())},removePrimaryPointer:function(a){a.isPrimary&&(this.firstTouch=null,this.firstXY=null,this.resetClickCount())},clickCount:0,resetId:null,resetClickCount:function(){var a=function(){this.clickCount=0,this.resetId=null}.bind(this);this.resetId=setTimeout(a,i)},cancelResetClickCount:function(){this.resetId&&clearTimeout(this.resetId)},touchToPointer:function(a){var b=c.cloneEvent(a);return b.pointerId=a.identifier+2,b.target=d(b),b.bubbles=!0,b.cancelable=!0,b.detail=this.clickCount,b.button=0,b.buttons=1,b.width=a.webkitRadiusX||a.radiusX||0,b.height=a.webkitRadiusY||a.radiusY||0,b.pressure=a.webkitForce||a.force||.5,b.isPrimary=this.isPrimaryTouch(a),b.pointerType=this.POINTER_TYPE,b},processTouches:function(a,b){var c=a.changedTouches,d=g(c,this.touchToPointer,this);d.forEach(function(b){b.preventDefault=function(){this.scrolling=!1,this.firstXY=null,a.preventDefault()}},this),d.forEach(b,this)},shouldScroll:function(a){if(this.firstXY){var b,c=this.scrollType.get(a.currentTarget);if("none"===c)b=!1;else if("XY"===c)b=!0;else{var d=a.changedTouches[0],e=c,f="Y"===c?"X":"Y",g=Math.abs(d["client"+e]-this.firstXY[e]),h=Math.abs(d["client"+f]-this.firstXY[f]);b=g>=h}return this.firstXY=null,b}},findTouch:function(a,b){for(var c,d=0,e=a.length;e>d&&(c=a[d]);d++)if(c.identifier===b)return!0},vacuumTouches:function(a){var b=a.touches;if(f.pointers()>=b.length){var c=[];f.forEach(function(a,d){if(1!==d&&!this.findTouch(b,d-2)){var e=a.out;c.push(this.touchToPointer(e))}},this),c.forEach(this.cancelOut,this)}},touchstart:function(a){this.vacuumTouches(a),this.setPrimaryTouch(a.changedTouches[0]),this.dedupSynthMouse(a),this.scrolling||(this.clickCount++,this.processTouches(a,this.overDown))},overDown:function(a){f.set(a.pointerId,{target:a.target,out:a,outTarget:a.target});c.over(a),c.down(a)},touchmove:function(a){this.scrolling||(this.shouldScroll(a)?(this.scrolling=!0,this.touchcancel(a)):(a.preventDefault(),this.processTouches(a,this.moveOverOut)))},moveOverOut:function(a){var b=a,d=f.get(b.pointerId);if(d){var e=d.out,g=d.outTarget;c.move(b),e&&g!==b.target&&(e.relatedTarget=b.target,b.relatedTarget=g,e.target=g,b.target?(c.leaveOut(e),c.enterOver(b)):(b.target=g,b.relatedTarget=null,this.cancelOut(b))),d.out=b,d.outTarget=b.target}},touchend:function(a){this.dedupSynthMouse(a),this.processTouches(a,this.upOut)},upOut:function(a){this.scrolling||(c.up(a),c.out(a)),this.cleanUpPointer(a)},touchcancel:function(a){this.processTouches(a,this.cancelOut)},cancelOut:function(a){c.cancel(a),c.out(a),this.cleanUpPointer(a)},cleanUpPointer:function(a){f["delete"](a.pointerId),this.removePrimaryPointer(a)},dedupSynthMouse:function(b){var c=a.mouseEvents.lastTouches,d=b.changedTouches[0];if(this.isPrimaryTouch(d)){var e={x:d.clientX,y:d.clientY};c.push(e);var f=function(a,b){var c=a.indexOf(b);c>-1&&a.splice(c,1)}.bind(null,c,e);setTimeout(f,h)}}};k||(b=new a.Installer(l.elementAdded,l.elementRemoved,l.elementChanged,l)),a.touchEvents=l}(window.PointerEventsPolyfill),function(a){var b=a.dispatcher,c=b.pointermap,d=window.MSPointerEvent&&"number"==typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,e={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerOut","MSPointerOver","MSPointerCancel","MSGotPointerCapture","MSLostPointerCapture"],register:function(a){b.listen(a,this.events)},unregister:function(a){b.unlisten(a,this.events)},POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(a){var c=a;return d&&(c=b.cloneEvent(a),c.pointerType=this.POINTER_TYPES[a.pointerType]),c},cleanup:function(a){c["delete"](a)},MSPointerDown:function(a){c.set(a.pointerId,a);var d=this.prepareEvent(a);b.down(d)},MSPointerMove:function(a){var c=this.prepareEvent(a);b.move(c)},MSPointerUp:function(a){var c=this.prepareEvent(a);b.up(c),this.cleanup(a.pointerId)},MSPointerOut:function(a){var c=this.prepareEvent(a);b.leaveOut(c)},MSPointerOver:function(a){var c=this.prepareEvent(a);b.enterOver(c)},MSPointerCancel:function(a){var c=this.prepareEvent(a);b.cancel(c),this.cleanup(a.pointerId)},MSLostPointerCapture:function(a){var c=b.makeEvent("lostpointercapture",a);b.dispatchEvent(c)},MSGotPointerCapture:function(a){var c=b.makeEvent("gotpointercapture",a);b.dispatchEvent(c)}};a.msEvents=e}(window.PointerEventsPolyfill),function(a){var b=a.dispatcher;if(void 0===window.navigator.pointerEnabled){if(Object.defineProperty(window.navigator,"pointerEnabled",{value:!0,enumerable:!0}),window.navigator.msPointerEnabled){var c=window.navigator.msMaxTouchPoints;Object.defineProperty(window.navigator,"maxTouchPoints",{value:c,enumerable:!0}),b.registerSource("ms",a.msEvents)}else b.registerSource("mouse",a.mouseEvents),void 0!==window.ontouchstart&&b.registerSource("touch",a.touchEvents);b.register(document)}}(window.PointerEventsPolyfill),function(a){function b(a){if(!e.pointermap.has(a))throw new Error("InvalidPointerId")}var c,d,e=a.dispatcher,f=window.navigator;f.msPointerEnabled?(c=function(a){b(a),this.msSetPointerCapture(a)},d=function(a){b(a),this.msReleasePointerCapture(a)}):(c=function(a){b(a),e.setCapture(a,this)},d=function(a){b(a),e.releaseCapture(a,this)}),window.Element&&!Element.prototype.setPointerCapture&&Object.defineProperties(Element.prototype,{setPointerCapture:{value:c},releasePointerCapture:{value:d}})}(window.PointerEventsPolyfill),PointerGestureEvent.prototype.preventTap=function(){this.tapPrevented=!0
},function(a){a=a||{},a.utils={LCA:{find:function(a,b){if(a===b)return a;if(a.contains){if(a.contains(b))return a;if(b.contains(a))return b}var c=this.depth(a),d=this.depth(b),e=c-d;for(e>0?a=this.walk(a,e):b=this.walk(b,-e);a&&b&&a!==b;)a=this.walk(a,1),b=this.walk(b,1);return a},walk:function(a,b){for(var c=0;b>c;c++)a=a.parentNode;return a},depth:function(a){for(var b=0;a;)b++,a=a.parentNode;return b}}},a.findLCA=function(b,c){return a.utils.LCA.find(b,c)},window.PointerGestures=a}(window.PointerGestures),function(a){function b(){if(c){var a=new Map;return a.pointers=d,a}this.keys=[],this.values=[]}var c=window.Map&&window.Map.prototype.forEach,d=function(){return this.size};b.prototype={set:function(a,b){var c=this.keys.indexOf(a);c>-1?this.values[c]=b:(this.keys.push(a),this.values.push(b))},has:function(a){return this.keys.indexOf(a)>-1},"delete":function(a){var b=this.keys.indexOf(a);b>-1&&(this.keys.splice(b,1),this.values.splice(b,1))},get:function(a){var b=this.keys.indexOf(a);return this.values[b]},clear:function(){this.keys.length=0,this.values.length=0},forEach:function(a,b){this.values.forEach(function(c,d){a.call(b,c,this.keys[d],this)},this)},pointers:function(){return this.keys.length}},a.PointerMap=b}(window.PointerGestures),function(a){var b=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","buttons","pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","type","target","currentTarget","screenX","screenY","pageX","pageY","tapPrevented"],c=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0,0,0,0,0,0,"",0,!1,"",null,null,0,0,0,0],d={handledEvents:new WeakMap,targets:new WeakMap,handlers:{},recognizers:{},events:{},registerRecognizer:function(a,b){var c=b;this.recognizers[a]=c,c.events.forEach(function(a){if(c[a]){this.events[a]=!0;var b=c[a].bind(c);this.addHandler(a,b)}},this)},addHandler:function(a,b){var c=a;this.handlers[c]||(this.handlers[c]=[]),this.handlers[c].push(b)},registerTarget:function(a){this.listen(Object.keys(this.events),a)},unregisterTarget:function(a){this.unlisten(Object.keys(this.events),a)},eventHandler:function(a){if(!this.handledEvents.get(a)){var b=a.type,c=this.handlers[b];c&&this.makeQueue(c,a),this.handledEvents.set(a,!0)}},makeQueue:function(a,b){var c=this.cloneEvent(b);setTimeout(this.runQueue.bind(this,a,c),0)},runQueue:function(a,b){this.currentPointerId=b.pointerId;for(var c,d=0,e=a.length;e>d&&(c=a[d]);d++)c(b);this.currentPointerId=0},listen:function(a,b){a.forEach(function(a){this.addEvent(a,this.boundHandler,!1,b)},this)},unlisten:function(a){a.forEach(function(a){this.removeEvent(a,this.boundHandler,!1,inTarget)},this)},addEvent:function(a,b,c,d){d.addEventListener(a,b,c)},removeEvent:function(a,b,c,d){d.removeEventListener(a,b,c)},makeEvent:function(a,b){return new PointerGestureEvent(a,b)},cloneEvent:function(a){for(var d,e={},f=0;f<b.length;f++)d=b[f],e[d]=a[d]||c[f];return e},dispatchEvent:function(a,b){var c=b||this.targets.get(a);c&&(c.dispatchEvent(a),a.tapPrevented&&this.preventTap(this.currentPointerId))},asyncDispatchEvent:function(a,b){var c=function(){this.dispatchEvent(a,b)}.bind(this);setTimeout(c,0)},preventTap:function(a){var b=this.recognizers.tap;b&&b.preventTap(a)}};d.boundHandler=d.eventHandler.bind(d),a.dispatcher=d;var e=[],f=!1;a.register=function(b){if(f){var c=window.PointerEventsPolyfill;c&&c.register(b),a.dispatcher.registerTarget(b)}else e.push(b)},document.addEventListener("DOMContentLoaded",function(){f=!0,e.push(document),e.forEach(a.register)})}(window.PointerGestures),function(a){var b=a.dispatcher,c={HOLD_DELAY:200,WIGGLE_THRESHOLD:16,events:["pointerdown","pointermove","pointerup","pointercancel"],heldPointer:null,holdJob:null,pulse:function(){var a=Date.now()-this.heldPointer.timeStamp,b=this.held?"holdpulse":"hold";this.fireHold(b,a),this.held=!0},cancel:function(){clearInterval(this.holdJob),this.held&&this.fireHold("release"),this.held=!1,this.heldPointer=null,this.target=null,this.holdJob=null},pointerdown:function(a){a.isPrimary&&!this.heldPointer&&(this.heldPointer=a,this.target=a.target,this.holdJob=setInterval(this.pulse.bind(this),this.HOLD_DELAY))},pointerup:function(a){this.heldPointer&&this.heldPointer.pointerId===a.pointerId&&this.cancel()},pointercancel:function(){this.cancel()},pointermove:function(a){if(this.heldPointer&&this.heldPointer.pointerId===a.pointerId){var b=a.clientX-this.heldPointer.clientX,c=a.clientY-this.heldPointer.clientY;b*b+c*c>this.WIGGLE_THRESHOLD&&this.cancel()}},fireHold:function(a,c){var d={pointerType:this.heldPointer.pointerType};c&&(d.holdTime=c);var e=b.makeEvent(a,d);b.dispatchEvent(e,this.target),e.tapPrevented&&b.preventTap(this.heldPointer.pointerId)}};b.registerRecognizer("hold",c)}(window.PointerGestures),function(a){var b=a.dispatcher,c=new a.PointerMap,d={events:["pointerdown","pointermove","pointerup","pointercancel"],WIGGLE_THRESHOLD:4,clampDir:function(a){return a>0?1:-1},calcPositionDelta:function(a,b){var c=0,d=0;return a&&b&&(c=b.pageX-a.pageX,d=b.pageY-a.pageY),{x:c,y:d}},fireTrack:function(a,c,d){var e=d,f=this.calcPositionDelta(e.downEvent,c),g=this.calcPositionDelta(e.lastMoveEvent,c);g.x&&(e.xDirection=this.clampDir(g.x)),g.y&&(e.yDirection=this.clampDir(g.y));var h={dx:f.x,dy:f.y,ddx:g.x,ddy:g.y,clientX:c.clientX,clientY:c.clientY,pageX:c.pageX,pageY:c.pageY,screenX:c.screenX,screenY:c.screenY,xDirection:e.xDirection,yDirection:e.yDirection,trackInfo:e.trackInfo,relatedTarget:c.target,pointerType:c.pointerType},i=b.makeEvent(a,h);e.lastMoveEvent=c,b.dispatchEvent(i,e.downTarget)},pointerdown:function(a){if(a.isPrimary&&("mouse"===a.pointerType?1===a.buttons:!0)){var b={downEvent:a,downTarget:a.target,trackInfo:{},lastMoveEvent:null,xDirection:0,yDirection:0,tracking:!1};c.set(a.pointerId,b)}},pointermove:function(a){var b=c.get(a.pointerId);if(b)if(b.tracking)this.fireTrack("track",a,b);else{var d=this.calcPositionDelta(b.downEvent,a),e=d.x*d.x+d.y*d.y;e>this.WIGGLE_THRESHOLD&&(b.tracking=!0,this.fireTrack("trackstart",b.downEvent,b),this.fireTrack("track",a,b))}},pointerup:function(a){var b=c.get(a.pointerId);b&&(b.tracking&&this.fireTrack("trackend",a,b),c.delete(a.pointerId))},pointercancel:function(a){this.pointerup(a)}};b.registerRecognizer("track",d)}(window.PointerGestures),function(a){var b=a.dispatcher,c={MIN_VELOCITY:.5,MAX_QUEUE:4,moveQueue:[],target:null,pointerId:null,events:["pointerdown","pointermove","pointerup","pointercancel"],pointerdown:function(a){a.isPrimary&&!this.pointerId&&(this.pointerId=a.pointerId,this.target=a.target,this.addMove(a))},pointermove:function(a){a.pointerId===this.pointerId&&this.addMove(a)},pointerup:function(a){a.pointerId===this.pointerId&&this.fireFlick(a),this.cleanup()},pointercancel:function(){this.cleanup()},cleanup:function(){this.moveQueue=[],this.target=null,this.pointerId=null},addMove:function(a){this.moveQueue.length>=this.MAX_QUEUE&&this.moveQueue.shift(),this.moveQueue.push(a)},fireFlick:function(a){for(var c,d,e,f,g,h,i,j=a,k=this.moveQueue.length,l=0,m=0,n=0,o=0;k>o&&(i=this.moveQueue[o]);o++)c=j.timeStamp-i.timeStamp,d=j.clientX-i.clientX,e=j.clientY-i.clientY,f=d/c,g=e/c,h=Math.sqrt(f*f+g*g),h>n&&(l=f,m=g,n=h);var p=Math.abs(l)>Math.abs(m)?"x":"y",q=this.calcAngle(l,m);if(Math.abs(n)>=this.MIN_VELOCITY){var r=b.makeEvent("flick",{xVelocity:l,yVelocity:m,velocity:n,angle:q,majorAxis:p,pointerType:a.pointerType});b.dispatchEvent(r,this.target)}},calcAngle:function(a,b){return 180*Math.atan2(b,a)/Math.PI}};b.registerRecognizer("flick",c)}(window.PointerGestures),function(a){var b=a.dispatcher,c=new a.PointerMap,d=180/Math.PI,e={events:["pointerdown","pointermove","pointerup","pointercancel"],reference:{},pointerdown:function(b){if(c.set(b.pointerId,b),2==c.pointers()){var d=this.calcChord(),e=this.calcAngle(d);this.reference={angle:e,diameter:d.diameter,target:a.findLCA(d.a.target,d.b.target)}}},pointerup:function(a){c.delete(a.pointerId)},pointermove:function(a){c.has(a.pointerId)&&(c.set(a.pointerId,a),c.pointers()>1&&this.calcPinchRotate())},pointercancel:function(a){this.pointerup(a)},dispatchPinch:function(a,c){var d=a/this.reference.diameter,e=b.makeEvent("pinch",{scale:d,centerX:c.center.x,centerY:c.center.y});b.dispatchEvent(e,this.reference.target)},dispatchRotate:function(a,c){var d=Math.round((a-this.reference.angle)%360),e=b.makeEvent("rotate",{angle:d,centerX:c.center.x,centerY:c.center.y});b.dispatchEvent(e,this.reference.target)},calcPinchRotate:function(){var a=this.calcChord(),b=a.diameter,c=this.calcAngle(a);b!=this.reference.diameter&&this.dispatchPinch(b,a),c!=this.reference.angle&&this.dispatchRotate(c,a)},calcChord:function(){var a=[];c.forEach(function(b){a.push(b)});for(var b,d,e,f=0,g={},h=0;h<a.length;h++)for(var i=a[h],j=h+1;j<a.length;j++){var k=a[j];b=Math.abs(i.clientX-k.clientX),d=Math.abs(i.clientY-k.clientY),e=b+d,e>f&&(f=e,g={a:i,b:k})}return b=Math.abs(g.a.clientX+g.b.clientX)/2,d=Math.abs(g.a.clientY+g.b.clientY)/2,g.center={x:b,y:d},g.diameter=f,g},calcAngle:function(a){var b=a.a.clientX-a.b.clientX,c=a.a.clientY-a.b.clientY;return(360+Math.atan2(c,b)*d)%360}};b.registerRecognizer("pinch",e)}(window.PointerGestures),function(a){var b=a.dispatcher,c=new a.PointerMap,d={events:["pointerdown","pointermove","pointerup","pointercancel","keyup"],pointerdown:function(a){a.isPrimary&&!a.tapPrevented&&c.set(a.pointerId,{target:a.target,x:a.clientX,y:a.clientY})},pointermove:function(a){if(a.isPrimary){var b=c.get(a.pointerId);b&&a.tapPrevented&&c.delete(a.pointerId)}},pointerup:function(d){var e=c.get(d.pointerId);if(e&&!d.tapPrevented){var f=a.findLCA(e.target,d.target);if(f){var g=b.makeEvent("tap",{x:d.clientX,y:d.clientY,detail:d.detail,pointerType:d.pointerType});b.dispatchEvent(g,f)}}c.delete(d.pointerId)},pointercancel:function(a){c.delete(a.pointerId)},keyup:function(a){var c=a.keyCode;if(32===c){var d=a.target;d instanceof HTMLInputElement||d instanceof HTMLTextAreaElement||b.dispatchEvent(b.makeEvent("tap",{x:0,y:0,detail:0,pointerType:"unavailable"}),d)}},preventTap:function(a){c.delete(a)}};b.registerRecognizer("tap",d)}(window.PointerGestures),function(){"use strict";function a(a){for(;a.parentNode;)a=a.parentNode;return"function"==typeof a.getElementById?a:null}function b(a,b){var c=a.bindings;if(!c)return a.bindings={},void 0;var d=c[b];d&&(d.close(),c[b]=void 0)}function c(a){return null==a?"":a}function d(a,b){a.data=c(b)}function e(a){return function(b){return d(a,b)}}function f(a,b,d,e){return d?(e?a.setAttribute(b,""):a.removeAttribute(b),void 0):(a.setAttribute(b,c(e)),void 0)}function g(a,b,c){return function(d){f(a,b,c,d)}}function h(a){switch(a.type){case"checkbox":return s;case"radio":case"select-multiple":case"select-one":return"change";default:return"input"}}function i(a,b,d,e){a[b]=(e||c)(d)}function j(a,b,c){return function(d){return i(a,b,d,c)}}function k(){}function l(a,b,c,d){function e(){c.setValue(a[b]),c.discardChanges(),(d||k)(a),Platform.performMicrotaskCheckpoint()}var f=h(a);a.addEventListener(f,e);var g=c.close;c.close=function(){g&&(a.removeEventListener(f,e),c.close=g,c.close(),g=void 0)}}function m(a){return Boolean(a)}function n(b){if(b.form)return r(b.form.elements,function(a){return a!=b&&"INPUT"==a.tagName&&"radio"==a.type&&a.name==b.name});var c=a(b);if(!c)return[];var d=c.querySelectorAll('input[type="radio"][name="'+b.name+'"]');return r(d,function(a){return a!=b&&!a.form})}function o(a){"INPUT"===a.tagName&&"radio"===a.type&&n(a).forEach(function(a){var b=a.bindings.checked;b&&b.setValue(!1)})}function p(a,b){var d,e,f,g=a.parentNode;g instanceof HTMLSelectElement&&g.bindings&&g.bindings.value&&(d=g,e=d.bindings.value,f=d.value),a.value=c(b),d&&d.value!=f&&(e.setValue(d.value),e.discardChanges(),Platform.performMicrotaskCheckpoint())}function q(a){return function(b){p(a,b)}}var r=Array.prototype.filter.call.bind(Array.prototype.filter);"function"!=typeof document.contains&&(Document.prototype.contains=function(a){return a===this||a.parentNode===this?!0:this.documentElement.contains(a)}),Node.prototype.bind=function(a,b){console.error("Unhandled binding to Node: ",this,a,b)},Node.prototype.unbind=function(a){b(this,a)},Node.prototype.unbindAll=function(){if(this.bindings){for(var a=Object.keys(this.bindings),b=0;b<a.length;b++){var c=this.bindings[a[b]];c&&c.close()}this.bindings={}}},Text.prototype.bind=function(a,c,f){return"textContent"!==a?Node.prototype.bind.call(this,a,c,f):f?d(this,c):(b(this,"textContent"),d(this,c.open(e(this))),this.bindings.textContent=c)},Element.prototype.bind=function(a,c,d){var e="?"==a[a.length-1];return e&&(this.removeAttribute(a),a=a.slice(0,-1)),d?f(this,a,e,c):(b(this,a),f(this,a,e,c.open(g(this,a,e))),this.bindings[a]=c)};var s;!function(){var a=document.createElement("div"),b=a.appendChild(document.createElement("input"));b.setAttribute("type","checkbox");var c,d=0;b.addEventListener("click",function(){d++,c=c||"click"}),b.addEventListener("change",function(){d++,c=c||"change"});var e=document.createEvent("MouseEvent");e.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),b.dispatchEvent(e),s=1==d?"change":c}(),HTMLInputElement.prototype.bind=function(a,d,e){if("value"!==a&&"checked"!==a)return HTMLElement.prototype.bind.call(this,a,d,e);this.removeAttribute(a);var f="checked"==a?m:c,g="checked"==a?o:k;return e?i(this,a,d,f):(b(this,a),l(this,a,d,g),i(this,a,d.open(j(this,a,f)),f),this.bindings[a]=d)},HTMLTextAreaElement.prototype.bind=function(a,d,e){return"value"!==a?HTMLElement.prototype.bind.call(this,a,d,e):(this.removeAttribute("value"),e?i(this,"value",d):(b(this,"value"),l(this,"value",d),i(this,"value",d.open(j(this,"value",c))),this.bindings.value=d))},HTMLOptionElement.prototype.bind=function(a,c,d){return"value"!==a?HTMLElement.prototype.bind.call(this,a,c,d):(this.removeAttribute("value"),d?p(this,c):(b(this,"value"),l(this,"value",c),p(this,c.open(q(this))),this.bindings.value=c))},HTMLSelectElement.prototype.bind=function(a,c,d){return"selectedindex"===a&&(a="selectedIndex"),"selectedIndex"!==a&&"value"!==a?HTMLElement.prototype.bind.call(this,a,c,d):(this.removeAttribute(a),d?i(this,a,c):(b(this,a),l(this,a,c),i(this,a,c.open(j(this,a))),this.bindings[a]=c))}}(this),function(a){"use strict";function b(a){if(!a)throw new Error("Assertion failed")}function c(a){for(var b;b=a.parentNode;)a=b;return a}function d(a,b){if(b){for(var d,e="#"+b;!d&&(a=c(a),a.protoContent_?d=a.protoContent_.querySelector(e):a.getElementById&&(d=a.getElementById(b)),!d&&a.templateCreator_);)a=a.templateCreator_;return d}}function e(a){return"template"==a.tagName&&"http://www.w3.org/2000/svg"==a.namespaceURI}function f(a){return"TEMPLATE"==a.tagName&&"http://www.w3.org/1999/xhtml"==a.namespaceURI}function g(a){return Boolean(J[a.tagName]&&a.hasAttribute("template"))}function h(a){return void 0===a.isTemplate_&&(a.isTemplate_="TEMPLATE"==a.tagName||g(a)),a.isTemplate_}function i(a,b){var c=a.querySelectorAll(L);h(a)&&b(a),E(c,b)}function j(a){function b(a){HTMLTemplateElement.decorate(a)||j(a.content)}i(a,b)}function k(a,b){Object.getOwnPropertyNames(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))})}function l(a){var b=a.ownerDocument;if(!b.defaultView)return b;var c=b.templateContentsOwner_;if(!c){for(c=b.implementation.createHTMLDocument("");c.lastChild;)c.removeChild(c.lastChild);b.templateContentsOwner_=c}return c}function m(a){if(!a.stagingDocument_){var b=a.ownerDocument;b.stagingDocument_||(b.stagingDocument_=b.implementation.createHTMLDocument(""),b.stagingDocument_.stagingDocument_=b.stagingDocument_),a.stagingDocument_=b.stagingDocument_}return a.stagingDocument_}function n(a){var b=a.ownerDocument.createElement("template");a.parentNode.insertBefore(b,a);for(var c=a.attributes,d=c.length;d-->0;){var e=c[d];I[e.name]&&("template"!==e.name&&b.setAttribute(e.name,e.value),a.removeAttribute(e.name))}return b}function o(a){var b=a.ownerDocument.createElement("template");a.parentNode.insertBefore(b,a);for(var c=a.attributes,d=c.length;d-->0;){var e=c[d];b.setAttribute(e.name,e.value),a.removeAttribute(e.name)}return a.parentNode.removeChild(a),b}function p(a,b,c){var d=a.content;if(c)return d.appendChild(b),void 0;for(var e;e=b.firstChild;)d.appendChild(e)}function q(a){M?a.__proto__=HTMLTemplateElement.prototype:k(a,HTMLTemplateElement.prototype)}function r(a){a.setModelFn_||(a.setModelFn_=function(){a.setModelFnScheduled_=!1;var b=z(a,a.delegate_&&a.delegate_.prepareBinding);w(a,b,a.model_)}),a.setModelFnScheduled_||(a.setModelFnScheduled_=!0,Observer.runEOM_(a.setModelFn_))}function s(a,b,c,d){if(a&&a.length){for(var e,f=a.length,g=0,h=0,i=0,j=!0;f>h;){var g=a.indexOf("{{",h),k=a.indexOf("[[",h),l=!1,m="}}";if(k>=0&&(0>g||g>k)&&(g=k,l=!0,m="]]"),i=0>g?-1:a.indexOf(m,g+2),0>i){if(!e)return;e.push(a.slice(h));break}e=e||[],e.push(a.slice(h,g));var n=a.slice(g+2,i).trim();e.push(l),j=j&&l,e.push(Path.get(n));var o=d&&d(n,b,c);e.push(o),h=i+2}return h===f&&e.push(""),e.hasOnePath=5===e.length,e.isSimplePath=e.hasOnePath&&""==e[0]&&""==e[4],e.onlyOneTime=j,e.combinator=function(a){for(var b=e[0],c=1;c<e.length;c+=4){var d=e.hasOnePath?a:a[(c-1)/4];void 0!==d&&(b+=d),b+=e[c+3]}return b},e}}function t(a,b,c,d){if(b.hasOnePath){var e=b[3],f=e?e(d,c,!0):b[2].getValueFrom(d);return b.isSimplePath?f:b.combinator(f)}for(var g=[],h=1;h<b.length;h+=4){var e=b[h+2];g[(h-1)/4]=e?e(d,c):b[h+1].getValueFrom(d)}return b.combinator(g)}function u(a,b,c,d){var e=b[3],f=e?e(d,c,!1):new PathObserver(d,b[2]);return b.isSimplePath?f:new ObserverTransform(f,b.combinator)}function v(a,b,c,d){if(b.onlyOneTime)return t(a,b,c,d);if(b.hasOnePath)return u(a,b,c,d);for(var e=new CompoundObserver,f=1;f<b.length;f+=4){var g=b[f],h=b[f+2];if(h){var i=h(d,c,g);g?e.addPath(i):e.addObserver(i)}else{var j=b[f+1];g?e.addPath(j.getValueFrom(d)):e.addPath(d,j)}}return new ObserverTransform(e,b.combinator)}function w(a,b,c,d){for(var e=0;e<b.length;e+=2){var f=b[e],g=b[e+1],h=v(f,g,a,c),i=a.bind(f,h,g.onlyOneTime);i&&d&&d.push(i)}if(b.isTemplate){a.model_=c;var j=a.processBindingDirectives_(b);d&&j&&d.push(j)}}function x(a,b,c){var d=a.getAttribute(b);return s(""==d?"{{}}":d,b,a,c)}function y(a,c){b(a);for(var d=[],e=0;e<a.attributes.length;e++){for(var f=a.attributes[e],g=f.name,i=f.value;"_"===g[0];)g=g.substring(1);if(!h(a)||g!==H&&g!==F&&g!==G){var j=s(i,g,a,c);j&&d.push(g,j)}}return h(a)&&(d.isTemplate=!0,d.if=x(a,H,c),d.bind=x(a,F,c),d.repeat=x(a,G,c),!d.if||d.bind||d.repeat||(d.bind=s("{{}}",F,a,c))),d}function z(a,b){if(a.nodeType===Node.ELEMENT_NODE)return y(a,b);if(a.nodeType===Node.TEXT_NODE){var c=s(a.data,"textContent",a,b);if(c)return["textContent",c]}return[]}function A(a,b,c,d,e,f,g){for(var h=b.appendChild(c.importNode(a,!1)),i=0,j=a.firstChild;j;j=j.nextSibling)A(j,h,c,d.children[i++],e,f,g);return d.isTemplate&&(HTMLTemplateElement.decorate(h,a),f&&h.setDelegate_(f)),w(h,d,e,g),h}function B(a,b){var c=z(a,b);c.children={};for(var d=0,e=a.firstChild;e;e=e.nextSibling)c.children[d++]=B(e,b);return c}function C(a){this.closed=!1,this.templateElement_=a,this.terminators=[],this.deps=void 0,this.iteratedValue=[],this.presentValue=void 0,this.arrayObserver=void 0}var D,E=Array.prototype.forEach.call.bind(Array.prototype.forEach);a.Map&&"function"==typeof a.Map.prototype.forEach?D=a.Map:(D=function(){this.keys=[],this.values=[]},D.prototype={set:function(a,b){var c=this.keys.indexOf(a);0>c?(this.keys.push(a),this.values.push(b)):this.values[c]=b},get:function(a){var b=this.keys.indexOf(a);if(!(0>b))return this.values[b]},"delete":function(a){var b=this.keys.indexOf(a);return 0>b?!1:(this.keys.splice(b,1),this.values.splice(b,1),!0)},forEach:function(a,b){for(var c=0;c<this.keys.length;c++)a.call(b||this,this.values[c],this.keys[c],this)}});"function"!=typeof document.contains&&(Document.prototype.contains=function(a){return a===this||a.parentNode===this?!0:this.documentElement.contains(a)});var F="bind",G="repeat",H="if",I={template:!0,repeat:!0,bind:!0,ref:!0},J={THEAD:!0,TBODY:!0,TFOOT:!0,TH:!0,TR:!0,TD:!0,COLGROUP:!0,COL:!0,CAPTION:!0,OPTION:!0,OPTGROUP:!0},K="undefined"!=typeof HTMLTemplateElement,L="template, "+Object.keys(J).map(function(a){return a.toLowerCase()+"[template]"}).join(", ");document.addEventListener("DOMContentLoaded",function(){j(document),Platform.performMicrotaskCheckpoint()},!1),K||(a.HTMLTemplateElement=function(){throw TypeError("Illegal constructor")});var M="__proto__"in{};HTMLTemplateElement.decorate=function(a,c){if(a.templateIsDecorated_)return!1;var d=a;d.templateIsDecorated_=!0;var h=f(d)&&K,i=h,k=!h,m=!1;if(h||(g(d)?(b(!c),d=n(a),d.templateIsDecorated_=!0,h=K,m=!0):e(d)&&(d=o(a),d.templateIsDecorated_=!0,h=K)),!h){q(d);var r=l(d);d.content_=r.createDocumentFragment()}return c?d.instanceRef_=c:k?p(d,a,m):i&&j(d.content),!0},HTMLTemplateElement.bootstrap=j;var N=a.HTMLUnknownElement||HTMLElement,O={get:function(){return this.content_},enumerable:!0,configurable:!0};K||(HTMLTemplateElement.prototype=Object.create(N.prototype),Object.defineProperty(HTMLTemplateElement.prototype,"content",O)),k(HTMLTemplateElement.prototype,{processBindingDirectives_:function(a){return this.iterator_&&this.iterator_.closeDeps(),a.if||a.bind||a.repeat?(this.iterator_||(this.iterator_=new C(this),this.bindings=this.bindings||{},this.bindings.iterator=this.iterator_),this.iterator_.updateDependencies(a,this.model_),this.iterator_):(this.iterator_&&(this.iterator_.close(),this.iterator_=void 0,this.bindings.iterator=void 0),void 0)},createInstance:function(a,b,c,d){b&&(c=this.newDelegate_(b));var e=this.ref.content,f=this.bindingMap_;f&&f.content===e||(f=B(e,c&&c.prepareBinding)||[],f.content=e,this.bindingMap_=f);var g=m(this),h=g.createDocumentFragment();h.templateCreator_=this,h.protoContent_=e;for(var i={firstNode:null,lastNode:null,model:a},j=0,k=e.firstChild;k;k=k.nextSibling){var l=A(k,h,g,f.children[j++],a,c,d);l.templateInstance_=i}return i.firstNode=h.firstChild,i.lastNode=h.lastChild,h.templateCreator_=void 0,h.protoContent_=void 0,h},get model(){return this.model_},set model(a){this.model_=a,r(this)},get bindingDelegate(){return this.delegate_&&this.delegate_.raw},setDelegate_:function(a){this.delegate_=a,this.bindingMap_=void 0,this.iterator_&&(this.iterator_.instancePositionChangedFn_=void 0,this.iterator_.instanceModelFn_=void 0)},newDelegate_:function(a){function b(b){var c=a&&a[b];if("function"==typeof c)return function(){return c.apply(a,arguments)}}return a?{raw:a,prepareBinding:b("prepareBinding"),prepareInstanceModel:b("prepareInstanceModel"),prepareInstancePositionChanged:b("prepareInstancePositionChanged")}:{}},set bindingDelegate(a){this.setDelegate_(this.newDelegate_(a))},get ref(){var a=d(this,this.getAttribute("ref"));if(a||(a=this.instanceRef_),!a)return this;var b=a.ref;return b?b:a}}),Object.defineProperty(Node.prototype,"templateInstance",{get:function(){var a=this.templateInstance_;return a?a:this.parentNode?this.parentNode.templateInstance:void 0}}),C.prototype={closeDeps:function(){var a=this.deps;a&&(a.ifOneTime===!1&&a.ifValue.close(),a.oneTime===!1&&a.value.close())},updateDependencies:function(a,b){this.closeDeps();var c=this.deps={},d=this.templateElement_;if(a.if){if(c.hasIf=!0,c.ifOneTime=a.if.onlyOneTime,c.ifValue=v(H,a.if,d,b),c.ifOneTime&&!c.ifValue)return this.updateIteratedValue(),void 0;c.ifOneTime||c.ifValue.open(this.updateIteratedValue,this)}a.repeat?(c.repeat=!0,c.oneTime=a.repeat.onlyOneTime,c.value=v(G,a.repeat,d,b)):(c.repeat=!1,c.oneTime=a.bind.onlyOneTime,c.value=v(F,a.bind,d,b)),c.oneTime||c.value.open(this.updateIteratedValue,this),this.updateIteratedValue()},updateIteratedValue:function(){if(this.deps.hasIf){var a=this.deps.ifValue;if(this.deps.ifOneTime||(a=a.discardChanges()),!a)return this.valueChanged(),void 0}var b=this.deps.value;this.deps.oneTime||(b=b.discardChanges()),this.deps.repeat||(b=[b]);var c=this.deps.repeat&&!this.deps.oneTime&&Array.isArray(b);this.valueChanged(b,c)},valueChanged:function(a,b){Array.isArray(a)||(a=[]),a!==this.iteratedValue&&(this.unobserve(),this.presentValue=a,b&&(this.arrayObserver=new ArrayObserver(this.presentValue),this.arrayObserver.open(this.handleSplices,this)),this.handleSplices(ArrayObserver.calculateSplices(this.presentValue,this.iteratedValue)))},getTerminatorAt:function(a){if(-1==a)return this.templateElement_;var b=this.terminators[2*a];if(b.nodeType!==Node.ELEMENT_NODE||this.templateElement_===b)return b;var c=b.iterator_;return c?c.getTerminatorAt(c.terminators.length/2-1):b},insertInstanceAt:function(a,b,c,d){var e=this.getTerminatorAt(a-1),f=e;b?f=b.lastChild||f:c&&(f=c[c.length-1]||f),this.terminators.splice(2*a,0,f,d);var g=this.templateElement_.parentNode,h=e.nextSibling;if(b)g.insertBefore(b,h);else if(c)for(var i=0;i<c.length;i++)g.insertBefore(c[i],h)},extractInstanceAt:function(a){var b=[],c=this.getTerminatorAt(a-1),d=this.getTerminatorAt(a);b.instanceBindings=this.terminators[2*a+1],this.terminators.splice(2*a,2);for(var e=this.templateElement_.parentNode;d!==c;){var f=c.nextSibling;f==d&&(d=c),e.removeChild(f),b.push(f)}return b},getDelegateFn:function(a){return a=a&&a(this.templateElement_),"function"==typeof a?a:null},handleSplices:function(a){if(!this.closed&&a.length){var b=this.templateElement_;if(!b.parentNode)return this.close(),void 0;ArrayObserver.applySplices(this.iteratedValue,this.presentValue,a);var c=b.delegate_;void 0===this.instanceModelFn_&&(this.instanceModelFn_=this.getDelegateFn(c&&c.prepareInstanceModel)),void 0===this.instancePositionChangedFn_&&(this.instancePositionChangedFn_=this.getDelegateFn(c&&c.prepareInstancePositionChanged));var d=new D,e=0;a.forEach(function(a){a.removed.forEach(function(b){var c=this.extractInstanceAt(a.index+e);d.set(b,c)},this),e-=a.addedCount},this),a.forEach(function(a){for(var e=a.index;e<a.index+a.addedCount;e++){var f,g=this.iteratedValue[e],h=void 0,i=d.get(g);i?(d.delete(g),f=i.instanceBindings):(f=[],this.instanceModelFn_&&(g=this.instanceModelFn_(g)),void 0!==g&&(h=b.createInstance(g,void 0,c,f))),this.insertInstanceAt(e,h,i,f)}},this),d.forEach(function(a){this.closeInstanceBindings(a.instanceBindings)},this),this.instancePositionChangedFn_&&this.reportInstancesMoved(a)}},reportInstanceMoved:function(a){var b=this.getTerminatorAt(a-1),c=this.getTerminatorAt(a);if(b!==c){var d=b.nextSibling.templateInstance;this.instancePositionChangedFn_(d,a)}},reportInstancesMoved:function(a){for(var b=0,c=0,d=0;d<a.length;d++){var e=a[d];if(0!=c)for(;b<e.index;)this.reportInstanceMoved(b),b++;else b=e.index;for(;b<e.index+e.addedCount;)this.reportInstanceMoved(b),b++;c+=e.addedCount-e.removed.length}if(0!=c)for(var f=this.terminators.length/2;f>b;)this.reportInstanceMoved(b),b++},closeInstanceBindings:function(a){for(var b=0;b<a.length;b++)a[b].close()},unobserve:function(){this.arrayObserver&&(this.arrayObserver.close(),this.arrayObserver=void 0)},close:function(){if(!this.closed){this.unobserve();for(var a=1;a<this.terminators.length;a+=2)this.closeInstanceBindings(this.terminators[a]);this.terminators.length=0,this.closeDeps(),this.templateElement_.iterator_=void 0,this.closed=!0}}},HTMLTemplateElement.forAllTemplatesFrom_=i}(this),function(a){"use strict";function b(a,b){if(!a)throw new Error("ASSERT: "+b)}function c(a){return a>=48&&57>=a}function d(a){return 32===a||9===a||11===a||12===a||160===a||a>=5760&&" ᠎             　﻿".indexOf(String.fromCharCode(a))>0}function e(a){return 10===a||13===a||8232===a||8233===a}function f(a){return 36===a||95===a||a>=65&&90>=a||a>=97&&122>=a}function g(a){return 36===a||95===a||a>=65&&90>=a||a>=97&&122>=a||a>=48&&57>=a}function h(a){return"this"===a}function i(){for(;Y>X&&d(W.charCodeAt(X));)++X}function j(){var a,b;for(a=X++;Y>X&&(b=W.charCodeAt(X),g(b));)++X;return W.slice(a,X)}function k(){var a,b,c;return a=X,b=j(),c=1===b.length?S.Identifier:h(b)?S.Keyword:"null"===b?S.NullLiteral:"true"===b||"false"===b?S.BooleanLiteral:S.Identifier,{type:c,value:b,range:[a,X]}}function l(){var a,b,c=X,d=W.charCodeAt(X),e=W[X];switch(d){case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:return++X,{type:S.Punctuator,value:String.fromCharCode(d),range:[c,X]};default:if(a=W.charCodeAt(X+1),61===a)switch(d){case 37:case 38:case 42:case 43:case 45:case 47:case 60:case 62:case 124:return X+=2,{type:S.Punctuator,value:String.fromCharCode(d)+String.fromCharCode(a),range:[c,X]};case 33:case 61:return X+=2,61===W.charCodeAt(X)&&++X,{type:S.Punctuator,value:W.slice(c,X),range:[c,X]}}}return b=W[X+1],e===b&&"&|".indexOf(e)>=0?(X+=2,{type:S.Punctuator,value:e+b,range:[c,X]}):"<>=!+-*%&|^/".indexOf(e)>=0?(++X,{type:S.Punctuator,value:e,range:[c,X]}):(s({},V.UnexpectedToken,"ILLEGAL"),void 0)}function m(){var a,d,e;if(e=W[X],b(c(e.charCodeAt(0))||"."===e,"Numeric literal must start with a decimal digit or a decimal point"),d=X,a="","."!==e){for(a=W[X++],e=W[X],"0"===a&&e&&c(e.charCodeAt(0))&&s({},V.UnexpectedToken,"ILLEGAL");c(W.charCodeAt(X));)a+=W[X++];e=W[X]}if("."===e){for(a+=W[X++];c(W.charCodeAt(X));)a+=W[X++];e=W[X]}if("e"===e||"E"===e)if(a+=W[X++],e=W[X],("+"===e||"-"===e)&&(a+=W[X++]),c(W.charCodeAt(X)))for(;c(W.charCodeAt(X));)a+=W[X++];else s({},V.UnexpectedToken,"ILLEGAL");return f(W.charCodeAt(X))&&s({},V.UnexpectedToken,"ILLEGAL"),{type:S.NumericLiteral,value:parseFloat(a),range:[d,X]}}function n(){var a,c,d,f="",g=!1;for(a=W[X],b("'"===a||'"'===a,"String literal must starts with a quote"),c=X,++X;Y>X;){if(d=W[X++],d===a){a="";break}if("\\"===d)if(d=W[X++],d&&e(d.charCodeAt(0)))"\r"===d&&"\n"===W[X]&&++X;else switch(d){case"n":f+="\n";break;case"r":f+="\r";break;case"t":f+="	";break;case"b":f+="\b";break;case"f":f+="\f";break;case"v":f+="";break;default:f+=d}else{if(e(d.charCodeAt(0)))break;f+=d}}return""!==a&&s({},V.UnexpectedToken,"ILLEGAL"),{type:S.StringLiteral,value:f,octal:g,range:[c,X]}}function o(a){return a.type===S.Identifier||a.type===S.Keyword||a.type===S.BooleanLiteral||a.type===S.NullLiteral}function p(){var a;return i(),X>=Y?{type:S.EOF,range:[X,X]}:(a=W.charCodeAt(X),40===a||41===a||58===a?l():39===a||34===a?n():f(a)?k():46===a?c(W.charCodeAt(X+1))?m():l():c(a)?m():l())}function q(){var a;return a=$,X=a.range[1],$=p(),X=a.range[1],a}function r(){var a;a=X,$=p(),X=a}function s(a,c){var d,e=Array.prototype.slice.call(arguments,2),f=c.replace(/%(\d)/g,function(a,c){return b(c<e.length,"Message reference must be in range"),e[c]});throw d=new Error(f),d.index=X,d.description=f,d}function t(a){s(a,V.UnexpectedToken,a.value)}function u(a){var b=q();(b.type!==S.Punctuator||b.value!==a)&&t(b)}function v(a){return $.type===S.Punctuator&&$.value===a}function w(a){return $.type===S.Keyword&&$.value===a}function x(){var a=[];for(u("[");!v("]");)v(",")?(q(),a.push(null)):(a.push(bb()),v("]")||u(","));return u("]"),Z.createArrayExpression(a)}function y(){var a;return i(),a=q(),a.type===S.StringLiteral||a.type===S.NumericLiteral?Z.createLiteral(a):Z.createIdentifier(a.value)}function z(){var a,b;return a=$,i(),(a.type===S.EOF||a.type===S.Punctuator)&&t(a),b=y(),u(":"),Z.createProperty("init",b,bb())}function A(){var a=[];for(u("{");!v("}");)a.push(z()),v("}")||u(",");return u("}"),Z.createObjectExpression(a)}function B(){var a;return u("("),a=bb(),u(")"),a}function C(){var a,b,c;return v("(")?B():(a=$.type,a===S.Identifier?c=Z.createIdentifier(q().value):a===S.StringLiteral||a===S.NumericLiteral?c=Z.createLiteral(q()):a===S.Keyword?w("this")&&(q(),c=Z.createThisExpression()):a===S.BooleanLiteral?(b=q(),b.value="true"===b.value,c=Z.createLiteral(b)):a===S.NullLiteral?(b=q(),b.value=null,c=Z.createLiteral(b)):v("[")?c=x():v("{")&&(c=A()),c?c:(t(q()),void 0))}function D(){var a=[];if(u("("),!v(")"))for(;Y>X&&(a.push(bb()),!v(")"));)u(",");return u(")"),a}function E(){var a;return a=q(),o(a)||t(a),Z.createIdentifier(a.value)}function F(){return u("."),E()}function G(){var a;
return u("["),a=bb(),u("]"),a}function H(){var a,b;for(a=C();v(".")||v("[");)v("[")?(b=G(),a=Z.createMemberExpression("[",a,b)):(b=F(),a=Z.createMemberExpression(".",a,b));return a}function I(){var a,b;return $.type!==S.Punctuator&&$.type!==S.Keyword?b=ab():v("+")||v("-")||v("!")?(a=q(),b=I(),b=Z.createUnaryExpression(a.value,b)):w("delete")||w("void")||w("typeof")?s({},V.UnexpectedToken):b=ab(),b}function J(a){var b=0;if(a.type!==S.Punctuator&&a.type!==S.Keyword)return 0;switch(a.value){case"||":b=1;break;case"&&":b=2;break;case"==":case"!=":case"===":case"!==":b=6;break;case"<":case">":case"<=":case">=":case"instanceof":b=7;break;case"in":b=7;break;case"+":case"-":b=9;break;case"*":case"/":case"%":b=11}return b}function K(){var a,b,c,d,e,f,g,h;if(g=I(),b=$,c=J(b),0===c)return g;for(b.prec=c,q(),e=I(),d=[g,b,e];(c=J($))>0;){for(;d.length>2&&c<=d[d.length-2].prec;)e=d.pop(),f=d.pop().value,g=d.pop(),a=Z.createBinaryExpression(f,g,e),d.push(a);b=q(),b.prec=c,d.push(b),a=I(),d.push(a)}for(h=d.length-1,a=d[h];h>1;)a=Z.createBinaryExpression(d[h-1].value,d[h-2],a),h-=2;return a}function L(){var a,b,c;return a=K(),v("?")&&(q(),b=L(),u(":"),c=L(),a=Z.createConditionalExpression(a,b,c)),a}function M(){var a,b;return a=q(),a.type!==S.Identifier&&t(a),b=v("(")?D():[],Z.createFilter(a.value,b)}function N(){for(;v("|");)q(),M()}function O(){i(),r();var a=bb();a&&(","===$.value||"in"==$.value&&a.type===U.Identifier?Q(a):(N(),"as"===$.value?P(a):Z.createTopLevel(a))),$.type!==S.EOF&&t($)}function P(a){q();var b=q().value;Z.createAsExpression(a,b)}function Q(a){var b;","===$.value&&(q(),$.type!==S.Identifier&&t($),b=q().value),q();var c=bb();N(),Z.createInExpression(a.name,b,c)}function R(a,b){return Z=b,W=a,X=0,Y=W.length,$=null,_={labelSet:{}},O()}var S,T,U,V,W,X,Y,Z,$,_;S={BooleanLiteral:1,EOF:2,Identifier:3,Keyword:4,NullLiteral:5,NumericLiteral:6,Punctuator:7,StringLiteral:8},T={},T[S.BooleanLiteral]="Boolean",T[S.EOF]="<end>",T[S.Identifier]="Identifier",T[S.Keyword]="Keyword",T[S.NullLiteral]="Null",T[S.NumericLiteral]="Numeric",T[S.Punctuator]="Punctuator",T[S.StringLiteral]="String",U={ArrayExpression:"ArrayExpression",BinaryExpression:"BinaryExpression",CallExpression:"CallExpression",ConditionalExpression:"ConditionalExpression",EmptyStatement:"EmptyStatement",ExpressionStatement:"ExpressionStatement",Identifier:"Identifier",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",ObjectExpression:"ObjectExpression",Program:"Program",Property:"Property",ThisExpression:"ThisExpression",UnaryExpression:"UnaryExpression"},V={UnexpectedToken:"Unexpected token %0",UnknownLabel:"Undefined label '%0'",Redeclaration:"%0 '%1' has already been declared"};var ab=H,bb=L;a.esprima={parse:R}}(this),function(a){"use strict";function b(a,b,d,e){var f;try{if(f=c(a),f.scopeIdent&&(d.nodeType!==Node.ELEMENT_NODE||"TEMPLATE"!==d.tagName||"bind"!==b&&"repeat"!==b))throw Error("as and in can only be used within <template bind/repeat>")}catch(g){return console.error("Invalid expression syntax: "+a,g),void 0}return function(a,b,c){var d=f.getBinding(a,e,c);return f.scopeIdent&&d&&(b.polymerExpressionScopeIdent_=f.scopeIdent,f.indexIdent&&(b.polymerExpressionIndexIdent_=f.indexIdent)),d}}function c(a){var b=q[a];if(!b){var c=new j;esprima.parse(a,c),b=new l(c),q[a]=b}return b}function d(a){this.value=a,this.valueFn_=void 0}function e(a){this.name=a,this.path=Path.get(a)}function f(a,b,c){"["==c&&b instanceof d&&Path.get(b.value).valid&&(c=".",b=new e(b.value)),this.dynamicDeps="function"==typeof a||a.dynamic,this.dynamic="function"==typeof b||b.dynamic||"["==c,this.simplePath=!this.dynamic&&!this.dynamicDeps&&b instanceof e&&(a instanceof f||a instanceof e),this.object=this.simplePath?a:i(a),this.property="."==c?b:i(b)}function g(a,b){this.name=a,this.args=[];for(var c=0;c<b.length;c++)this.args[c]=i(b[c])}function h(){throw Error("Not Implemented")}function i(a){return"function"==typeof a?a:a.valueFn()}function j(){this.expression=null,this.filters=[],this.deps={},this.currentPath=void 0,this.scopeIdent=void 0,this.indexIdent=void 0,this.dynamicDeps=!1}function k(a){this.value_=a}function l(a){if(this.scopeIdent=a.scopeIdent,this.indexIdent=a.indexIdent,!a.expression)throw Error("No expression found.");this.expression=a.expression,i(this.expression),this.filters=a.filters,this.dynamicDeps=a.dynamicDeps}function m(a){return String(a).replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}function n(a){return"o"===a[0]&&"n"===a[1]&&"-"===a[2]}function o(a,b){var c=b.substring(3);return function(b,d,e){function f(){e||(h=a.getValueFrom(b)),h.apply(b,arguments)}function g(){return"{{ "+a+" }}"}var h=a.getValueFrom(b);return d.addEventListener(c,f),e?void 0:{open:g,discardChanges:g,close:function(){d.removeEventListener(c,f)}}}}function p(){}var q=Object.create(null);d.prototype={valueFn:function(){if(!this.valueFn_){var a=this.value;this.valueFn_=function(){return a}}return this.valueFn_}},e.prototype={valueFn:function(){if(!this.valueFn_){var a=(this.name,this.path);this.valueFn_=function(b,c){return c&&c.addPath(b,a),a.getValueFrom(b)}}return this.valueFn_},setValue:function(a,b){return this.path.setValueFrom(a,b)}},f.prototype={get fullPath(){if(!this.fullPath_){var a=this.object instanceof e?this.object.name:this.object.fullPath;this.fullPath_=Path.get(a+"."+this.property.name)}return this.fullPath_},valueFn:function(){if(!this.valueFn_){var a=this.object;if(this.simplePath){var b=this.fullPath;this.valueFn_=function(a,c){return c&&c.addPath(a,b),b.getValueFrom(a)}}else if(this.property instanceof e){var b=Path.get(this.property.name);this.valueFn_=function(c,d){var e=a(c,d);return d&&d.addPath(e,b),b.getValueFrom(e)}}else{var c=this.property;this.valueFn_=function(b,d){var e=a(b,d),f=c(b,d);return d&&d.addPath(e,f),e?e[f]:void 0}}}return this.valueFn_},setValue:function(a,b){if(this.simplePath)return this.fullPath.setValueFrom(a,b),b;var c=this.object(a),d=this.property instanceof e?this.property.name:this.property(a);return c[d]=b}},g.prototype={transform:function(a,b,c,d,e){var f=c[this.name],g=d;if(f)g=void 0;else if(f=g[this.name],!f)return console.error("Cannot find filter: "+this.name),void 0;if(b?f=f.toModel:"function"==typeof f.toDOM&&(f=f.toDOM),"function"!=typeof f)return console.error("No "+(b?"toModel":"toDOM")+" found on"+this.name),void 0;for(var h=[a],j=0;j<this.args.length;j++)h[j+1]=i(this.args[j])(d,e);return f.apply(g,h)}};var r={"+":function(a){return+a},"-":function(a){return-a},"!":function(a){return!a}},s={"+":function(a,b){return a+b},"-":function(a,b){return a-b},"*":function(a,b){return a*b},"/":function(a,b){return a/b},"%":function(a,b){return a%b},"<":function(a,b){return b>a},">":function(a,b){return a>b},"<=":function(a,b){return b>=a},">=":function(a,b){return a>=b},"==":function(a,b){return a==b},"!=":function(a,b){return a!=b},"===":function(a,b){return a===b},"!==":function(a,b){return a!==b},"&&":function(a,b){return a&&b},"||":function(a,b){return a||b}};j.prototype={createUnaryExpression:function(a,b){if(!r[a])throw Error("Disallowed operator: "+a);return b=i(b),function(c,d){return r[a](b(c,d))}},createBinaryExpression:function(a,b,c){if(!s[a])throw Error("Disallowed operator: "+a);return b=i(b),c=i(c),function(d,e){return s[a](b(d,e),c(d,e))}},createConditionalExpression:function(a,b,c){return a=i(a),b=i(b),c=i(c),function(d,e){return a(d,e)?b(d,e):c(d,e)}},createIdentifier:function(a){var b=new e(a);return b.type="Identifier",b},createMemberExpression:function(a,b,c){var d=new f(b,c,a);return d.dynamicDeps&&(this.dynamicDeps=!0),d},createLiteral:function(a){return new d(a.value)},createArrayExpression:function(a){for(var b=0;b<a.length;b++)a[b]=i(a[b]);return function(b,c){for(var d=[],e=0;e<a.length;e++)d.push(a[e](b,c));return d}},createProperty:function(a,b,c){return{key:b instanceof e?b.name:b.value,value:c}},createObjectExpression:function(a){for(var b=0;b<a.length;b++)a[b].value=i(a[b].value);return function(b,c){for(var d={},e=0;e<a.length;e++)d[a[e].key]=a[e].value(b,c);return d}},createFilter:function(a,b){this.filters.push(new g(a,b))},createAsExpression:function(a,b){this.expression=a,this.scopeIdent=b},createInExpression:function(a,b,c){this.expression=c,this.scopeIdent=a,this.indexIdent=b},createTopLevel:function(a){this.expression=a},createThisExpression:h},k.prototype={open:function(){return this.value_},discardChanges:function(){return this.value_},deliver:function(){},close:function(){}},l.prototype={getBinding:function(a,b,c){function d(){g.dynamicDeps&&f.startReset();var c=g.getValue(a,g.dynamicDeps?f:void 0,b);return g.dynamicDeps&&f.finishReset(),c}function e(c){return g.setValue(a,c,b),c}if(c)return this.getValue(a,void 0,b);var f=new CompoundObserver;this.getValue(a,f,b);var g=this;return new ObserverTransform(f,d,e,!0)},getValue:function(a,b,c){for(var d=i(this.expression)(a,b),e=0;e<this.filters.length;e++)d=this.filters[e].transform(d,!1,c,a,b);return d},setValue:function(a,b,c){for(var d=this.filters?this.filters.length:0;d-->0;)b=this.filters[d].transform(b,!0,c,a);return this.expression.setValue?this.expression.setValue(a,b):void 0}},p.prototype={styleObject:function(a){var b=[];for(var c in a)b.push(m(c)+": "+a[c]);return b.join("; ")},tokenList:function(a){var b=[];for(var c in a)a[c]&&b.push(c);return b.join(" ")},prepareInstancePositionChanged:function(a){var b=a.polymerExpressionIndexIdent_;if(b)return function(a,c){a.model[b]=c}},prepareBinding:function(a,c,d){if(n(c)){var e=Path.get(a);return e.valid?o(e,c):(console.error("on-* bindings must be simple path expressions"),void 0)}if(!Path.get(a).valid)return b(a,c,d,this)},prepareInstanceModel:function(a){var b=a.polymerExpressionScopeIdent_;if(b){var c=a.templateInstance?a.templateInstance.model:a.model;return function(a){var d=Object.create(c);return d[b]=a,d}}}},a.PolymerExpressions=p,a.exposeGetExpression&&(a.getExpression_=c)}(this),function(a){function b(){e||(e=!0,a.endOfMicrotask(function(){e=!1,logFlags.data&&console.group("Platform.flush()"),a.performMicrotaskCheckpoint(),logFlags.data&&console.groupEnd()}))}var c=document.createElement("style");c.textContent="template {display: none !important;} /* injected by platform.js */";var d=document.querySelector("head");d.insertBefore(c,d.firstChild);var e,f=125;if(window.addEventListener("WebComponentsReady",function(){b(),Observer.hasObjectObserve||(a.flushPoll=setInterval(b,f))}),window.CustomElements&&!CustomElements.useNative){var g=Document.prototype.importNode;Document.prototype.importNode=function(a,b){var c=g.call(this,a,b);return CustomElements.upgradeAll(c),c}}a.flush=b}(window.Platform);
//# sourceMappingURL=platform.js.map;

    addEventListener('polymer-ready', function() {

      var assert = chai.assert;

      // modularized apis
      var EventUtils = document.createElement('utils-event').api;
      var Keyboard = document.createElement('utils-keyboard').api;
      var Text = document.createElement('utils-text').api;
      var Keys = document.createElement('utils-keys').api;

      // hard codes the element placement based on above html
      function placeCaret(offset) {
        var editor = document.querySelector('#my-editor');
        var content = editor.firstElementChild;
        var contentTextNode = content.firstChild;
        var range = document.createRange();
        range.setStart(contentTextNode, offset);
        range.setEnd(contentTextNode, offset);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }

      // make sure we have an editor - should probably test more than
      // just the fact the element is defined... ?
      var editor = document.querySelector('#my-editor');
      var editorContent = document.querySelector('polymer-editor-content');
      assert.isDefined(editor, 'our editor is defined');

      // test insert text at start
      placeCaret(0);
      Keyboard.type(Text('foobar')).then(function(a) {
        assert.equal(editorContent.innerText, 'foobarhello');
      }).then(function() {
        // test insert text in the middle
        placeCaret(6);
        return Keyboard.type(Text('eggs'));
      }).then(function() {
        assert.equal(editorContent.innerText, 'foobareggshello');
      }).then(function() {

        // test insert text at the end
        placeCaret(editorContent.innerText.length);
        return Keyboard.type(Text('world'));
      }).then(function() {
        assert.equal(editorContent.innerText, 'foobareggshelloworld');
      }).then(function() {

        // test backspace
        placeCaret(6);
        return Keyboard.type(Keys("⟵").repeat(6));
      }).then(function() {
        assert.equal(editorContent.innerText, 'eggshelloworld');
      })
      .then(done)
      .catch(onerror);
    });
  