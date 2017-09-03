/*VBScript support for js using ActiveXObject
For 32-bit engines only (SysWOW64 versions on 64-bit Windows)
Recommend to use vb.js or a .vbs, if the format supports script tags.

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
*/"use strict";var VBScript=(function(){
try{var vb=new ActiveXObject("ScriptControl");}catch(e){e.message+=" (This only works in 32-bit WScript/CScript. Use the %windir%\SysWOW64 versions on 64-bit Windows.)";}
var VBScript={
execute:function(c){vb.addCode(c);},
eval:function(c){return vb.eval(c);},
run:function(){return vb.run(arguments);}
};
vb.language="VBScript";
vb.allowUI=true;
if(typeof module!=="undefined"&&typeof module.exports!=="undefined"){
module.exports=VBScript;
require("module").extensions['.vbs']=function(h,module){var x=console.enter("require.extensions['.vbs']",arguments),c=h.readAll();
vb.execute(c);//no return value to export? parse code for subs and functions to export globally as object with calls to run, possibly using new ScriptControl? Can we share objects like module?
x();};
}
return VBScript;})();

