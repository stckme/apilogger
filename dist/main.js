!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=[],n=!0,o=!1,u=void 0;try{for(var i,a=t[Symbol.iterator]();!(n=(i=a.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){o=!0,u=t}finally{try{n||null==a.return||a.return()}finally{if(o)throw u}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}r.r(e);var i=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var r=this.getErrorQueueFromStorage();e&&r&&r.limit&&console.log("ApiLogger has already a limit. please use changeLimit function from Logger Instance."),r.limit=r.limit||e||50,this.limit=r.limit||e||50,this.count=r.length,this.errorQueue=r,this.fetch=window.fetch}var e,r,i;return e=t,(r=[{key:"push",value:function(t){this.count===this.limit&&this.pop(),this.errorQueue.errors.push(t),this.count++,this.updateErrorQueueInStorage()}},{key:"getErrorQueueFromStorage",value:function(){return JSON.parse(localStorage.getItem("errorQueue"))||{limit:0,errors:[]}}},{key:"updateErrorQueueInStorage",value:function(){localStorage.setItem("errorQueue",JSON.stringify(this.errorQueue))}},{key:"pop",value:function(){0!==this.count&&(this.errorQueue.shift(),this.count--)}},{key:"wrappedFetch",value:function(){var t=this,e=arguments,r=this;return new Promise(function(u,i){var a=o(e,2),l=a[0],c=a[1],f=c.method,s=c.body;t.fetch.apply(t,e).then(function(e){if(e&&e.status>=400){var o=null;o="object"===n(s)?s&&t.truncateString(JSON.stringify(s),50):s,e.text().then(function(n){r.push({id:(new Date).getTime(),url:l,method:f,body:o,response:t.truncateString(n,50),status:e.status,contentType:e.headers.get("content-type")})})}u(e)}).catch(function(t){i(t)})})}},{key:"truncateString",value:function(t,e){var r=t.length>e?"...":"";return t.substring(0,e)+r}},{key:"print",value:function(){console.table(this.getErrorQueueFromStorage().errors)}},{key:"changeLimit",value:function(t){this.errorQueue.limit=t,this.limit=t,this.updateErrorQueueInStorage()}}])&&u(e.prototype,r),i&&u(e,i),t}();e.default=i}]);