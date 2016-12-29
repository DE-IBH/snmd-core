define(["snmd-core/MQTT","require","js-logger"],function(e,t,n){"use strict";var i=null,s=function(){if(null!==i)throw new Error("Cannot instantiate more than one instance, use getInstance()!");this.widgetPrefixes={},this.ReWidgetName=/^([\w\-]+):([\w\-]+)$/};return s.getInstance=function(){return null===i&&(i=new s),i},s.prototype.srClassOpts=function(e,t){var n={base:["snmd-bcl-"+t],state:["snmd-scl-","snmd-scl-"+t+"-"]};return"undefined"!=typeof e.type&&n.base.push("snmd-bcl-"+e.type.replace(":","_")),"undefined"!=typeof e.bcls&&n.base.push.apply(n.base,e.bcls),"undefined"!=typeof e.bcl&&n.base.push(e.bcl),"undefined"!=typeof e.scls&&n.state.push.apply(n.state,e.scls),"undefined"!=typeof e.scl&&n.state.push(e.scl),n},s.prototype.snmdRegisterPrefix=function(e,t){this.widgetPrefixes[e]=t},s.prototype.srCreateWidget=function(i,s,r){if("undefined"==typeof r.type)return void n.error("[SVGWidget] Widget "+s.id+" has no type set!");var d=this.ReWidgetName.exec(r.type);if(d){if("undefined"==typeof this.widgetPrefixes[d[1]])return void n.error("[SVGWidget] Widget package prefix "+d[1]+"/ is unknown!");t([this.widgetPrefixes[d[1]]+"/"+d[2]],function(t){try{var d=new t(i,s,r);"undefined"!=typeof r.topics&&r.topics.forEach(function(t){e.srRegisterTopic(t,d)})}catch(e){return void n.error("[SVGWidget] Failed to create widget "+s.id+" of type "+r.type+": "+e.message)}})}else n.error("[SVGWidget] Widget "+s.id+" has a invalid syntax for 'type'!")},s.getInstance()});
//# sourceMappingURL=dist/SVGWidget.map