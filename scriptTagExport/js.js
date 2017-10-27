/*Things found in JavaScript that might be useful in other languages...

Copyright (C) Quasic of GitHub
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/
var js={
inspect:function(){return"[object JScript export]";},
"typeof":function(o){return typeof o;},
eval:eval,
//evalEx:function(js,f){try{return eval(js);}catch(e){return eval(f);}},
arguments:function(){return arguments;},
create:function(f,p0,p1,p2,p3,p4,p5,p6,p7,p8,p9){return new f(p0,p1,p2,p3,p4,p5,p6,p7,p8,p9);},
/*arrayIndex:function(a,i){return a[i];},
setArrayIndex:function(a,i,v){a[i]=v;},*/
nop:function(){}};
(function(){"use strict";var
OptS=Object.prototype.toString;
js.toString=js.inspect;
js.strictArguments=function(){return arguments;};
js.stringFrom=function(o){return OptS.apply(o);};
js.stringFromEx=function(o){var r=OptS.apply(o);
if(r!=="[object Object]")return r;
if(o===null)return"[object null]";
if(typeof(o+"")==="undefined")return"[object Automation]";
if(typeof o==="object")return r;
return"[object "+typeof o+"]";
};
})();
