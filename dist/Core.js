define(["snmd-core/GUI","snmd-core/MQTT","snmd-core/SVGWidget","sprintf","jquery","js-logger","JSON.minify"],function(t,i,n,e,o,s,r){"use strict";var a=null,d=function(){if(null!==a)throw new Error("Cannot instantiate more than one instance, use getInstance()!");this.version="0.2",this.si_prefs=["T","G","M","k",""],this.si_facts=[Math.pow(10,12),Math.pow(10,9),Math.pow(10,6),Math.pow(10,3),1],this.genid=0,this.loadDiv=o("#snmd-load-div")};return d.getInstance=function(){return null===a&&(a=new d),a},d.prototype.srVersion=function(){return this.version},d.prototype.srURLParam=function(t,i){var n=new RegExp("[?&]"+t+"=([^&#/]*)([&#/]|$)").exec(window.location.href);return n&&n[1]?decodeURIComponent(n[1]):i},d.prototype.srConfigLoaded=function(n){this.config=n,s.debug("[Core] Loading view list: "+this.config.default_view),o.ajax({global:!1,url:this.config.default_view+"?nonce="+Math.random(),dataType:"json",dataFilter:function(t,i){return r.minify(t)},success:function(n){t.srInit(n),"undefined"==typeof this.config.mqttws_host&&(this.config.mqttws_host=window.location.hostname),"undefined"==typeof this.config.mqttws_port&&(this.config.mqttws_port=9001),i.srInit(this.config.mqttws_host,this.config.mqttws_port)}.bind(this),error:function(t,i,n){s.error("[Core] Failed to load view list: "+i+" - "+n)}.bind(this)})},d.prototype.srInitLoad=function(t,i){s.debug("[Core] Loading view config: "+t),o.ajax({global:!1,url:t+"?nonce="+Math.random(),dataType:"json",dataFilter:function(t,i){return r.minify(t)},success:this.srConfigLoaded.bind(this),error:i})},d.prototype.snmdInit=function(t){if(s.info("[Core] snmd v"+this.version+" - Scotty Network Management Dashboard"),"object"==typeof t.snmd_widgets){var i,e=function(t){s.info("[Core]  "+this.prefix+" => "+this.package+" v"+t.getVersion()),t.init(this.prefix,this.package),n.snmdRegisterPrefix(this.prefix,this.package)};for(i in t.snmd_widgets){var r=t.snmd_widgets[i],a={paths:{}};a.paths[r.package]=r.package+"/"+(t.snmd_devel===!0?"js":"dist"),require.config(a),require([r.package+"/Boot"],e.bind(r))}}var d=this.srURLParam("config","default");"default"!==d?o("#snmd-title").text(d):o("#snmd-title").text(window.location.host),this.srInitLoad("configs/"+d+".json",function(){this.srInitLoad("configs/default.json",function(t,i,n){s.error("[Core] Failed to load configuration: "+i+" - "+n)})}.bind(this))},d.prototype.snmdFinishLoading=function(t){if("undefined"!=typeof this.loadDiv){var i=this.loadDiv;this.loadDiv=void 0,i.fadeOut(3e3),window.setTimeout(function(){i.remove()},3e3)}},d.prototype.srSiFormatNum=function(t,i,n,o){if("undefined"==typeof t)return n;if(isNaN(t))return n;var s=0;t<0&&(t*=-1,s=1);var r,a=4;for(r=0;r<this.si_facts.length;r++)if(t>=.99*this.si_facts[r]){a=r;break}return t/=this.si_facts[a],("undefined"==typeof o||isNaN(o))&&(o=t<20?1:0),s&&(t*=-1),e.sprintf("%."+o+"f%s%s",t,this.si_prefs[a],i)},d.prototype.srNagStateColor=function(t){return"undefined"==typeof t?"Grey":0===t?"LimeGreen":1===t?"Gold":2===t?"Crimson":"Orange"},d.prototype.srGenID=function(t){return this.genid+=1,"snmd-genid-"+t+"-"+this.genid},d.getInstance()});
//# sourceMappingURL=dist/Core.map