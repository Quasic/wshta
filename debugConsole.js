/*Debug Console
requires require(module,console).js

Copyright (C) Quasic on GitHub
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
*/"use strict";if(typeof module==="undefined"){module=console={entero:function(o,s){WScript.echo(s);return function(o){return o;}},log:function(s){WScript.echo(s);},Console:function(){this.entero=module.entero;this.dir=this.log=module.log;this.getStackLength=function(){return 0;};this.trace=function(e,b,c){WScript.echo(c+" "+e.name+"#"+e.number+":"+e.message);}},create:function(n){WScript.echo("Create: "+n);}};require=function(n){WScript.echo("require: "+n);return{R:{q:/"/g},eval:function(s){WScript.echo("vbs: "+s);}};};require.extensions={".js":function(h){WScript.echo("js: "+h.readAll());}};}//syntax check
module.exports=function(M,form,O){var x=console.entero(0,"debugConsole",arguments),Q,q="",P=require("module"),R=P.R,rnl=/\r?\n/,c=console,o=O||{},m=M||module.create("<debugConsoleSandbox>"),js=P.extensions[".js"];
if(o.log)console.log("entering <debugConsole>");
function logjs(input){var
x=console.entero(0,"debugConsole::logjs",arguments),
s=input.replace(R.q,'\\"');
js({readAll:function(){return'arguments.x=console.entero(0,"js> '+s+'");arguments.X=console.getStackLength();try{console.dir(eval("'+s+'"));if(console.getStackLength()!==arguments.X)console.formatLog(0,"Stack imbalance: found "+console.getStackLength()+"!="+arguments.X+", the expected value",{},"STACK",1);}catch(e){console.formatLog(0,e,{},"EVALconsole",1);}arguments.x();';}},m);
x();}
if(typeof WScript!=="undefined"){
console=new c.Console({writeLine:function(s){WScript.echo(s);}});
try{
WScript.stdout.writeLine('Debug Console: Enter blank line to exit');
Q=function(){WScript.stdout.write("js> ");return WScript.stdin.readLine();};
}catch(e){
Q=function(){return require("./VBScript.js").eval('inputBox("Please enter JScript to eval:","<debugConsole>","'+q.replace(R.q,'""')+'")');};
}}else if(typeof window!=="undefined"){
if(form){
var line=document.createElement("input"),codebox=document.createElement("textarea"),checkbox=document.createElement("input"),clear=document.createElement("input"),button=document.createElement("input"),rl=document.createElement("ul"),parse=function(){logjs((checkbox.checked?codebox:line).value);return false;};
line.type="text";
line.style.width="100%";
if(o.lineHeight)line.style.height=o.lineHeight;
form.onsubmit=parse;
form.appendChild(line);
codebox.style.width="100%";
if(o.codeboxHeight)codebox.style.height=o.codeboxHeight;
checkbox.type="checkbox";
codebox.style.display="none";
form.appendChild(codebox);
checkbox.style.width="15%";
checkbox.title="Multiline";
if(o.buttonHeight)checkbox.style.height=o.buttonHeight;
checkbox.onclick=function(){
(checkbox.checked?codebox:line).style.display='block';
(checkbox.checked?line:codebox).style.display='none';};
form.appendChild(checkbox);
clear.type="button";
clear.value="Clear";
clear.style.width="30%";
if(o.buttonHeight)clear.style.height=o.buttonHeight;
clear.onclick=function(){rl.innerHTML='<li>'+P.stringTime(new Date)+" Cleared</li>";};
form.appendChild(clear);
button.type="button";
button.value=o.buttonText||"eval";
button.style.width="50%";
if(o.buttonHeight)button.style.height=o.buttonHeight;
button.onclick=parse;
form.appendChild(button);
rl.id="debugConsoleResultList";
rl.style.width=o.resultWidth||"100%";
rl.style.height=o.resultHeight||"200px";
rl.style.overflow="auto";
rl.style.border=o.resultBorder||"inset gray 1px";
form.appendChild(rl);
console=new c.Console({writeLine:function(t){var r=document.createElement('li'),i,a=t.split(rnl);r.style.borderBottom=o.resultformider||"solid blue 1px";r.appendChild(document.createTextNode(a[0]));for(i=1;i<a.length;i++){r.appendChild(document.createElement('br'));r.appendChild(document.createTextNode(a[i]));}rl.insertBefore(r,rl.firstChild);}});
}else{
Q=function(){return prompt('Please enter JScript to eval:',q);};
console=new console.Console({writeLine:function(s){alert(s);}});
}
}else throw new Error("Unsupported host");
if(module===console){eval(input);}
console.log("Welcome to <debugConsole>");
if(!form){
console.entero(0,"<debugConsole>");
while(q=Q())logjs(q);
console.log("exiting <debugConsole>");
console=c;
if(o.log)console.log("exited <debugConsole>");
}
x();};
if(module===console)module.exports();