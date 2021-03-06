/*node.js-like module, require and console for Windows JScript engine: WScript, CScript, HTA, etc.
requires ActiveXObject and single-thread engine (unlike multithreaded node.js) with local read priveleges
for JScript requires version 5.5 (IE5.5+, ME, XP+)
shims Array.prototype.indexOf

This is more for reporting errors, such as to a file on a central server, rather than debugging, though it tries to give a good head start.

in modules supporting submodule stack tracing, you can use a static or local shim function. The minimum would be:
var entero=typeof console!=="undefined"&&console.entero||function(){return function(o){return o;};}
entero will return an exit function, which should be called before returning, or as part of the return statement, {return exit(value)}, or assigned to an exit method of a thrown exception for the catching code to call if it doesn't call its own exit function.

Functions which will not cause exceptions should not use console.entero.

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
"use strict";module={
//declared outside using only arguments object to avoid eval pollution
js:function(/*h,module*/){var module=arguments[1];arguments.x=console.entero(0,"require.extensions['.js']",arguments,{depth:0});arguments.v=module.id===module.filename&&require('fso').getBaseName(module.filename)||"*";console.entero(0,module.id);try{
return arguments.x(module.returned=new Function("exports,require,module",arguments[0].readAll()+(arguments.v.search(require("module").R.vk)<0?'':";if(typeof "+arguments.v+"!=='undefined')return "+arguments.v+";"))(module.exports,function(n){return module.require(n);},module));
}catch(e){console.trace(e,{},"JSEVALTRACE");throw e;}},
trackEval:function(/*js,params,trace*/){arguments.exit=console.entero(this,"trackEval",arguments);console.entero(0,arguments[0],arguments[1]||[]);try{arguments.fn=new Function(arguments[0]);try{return arguments.exit(arguments.fn.apply({},arguments[1]||[]));}catch(e){if(arguments[2])console.trace(e,{},"Console.prototype.track::run","TRACKED ERROR");throw e;}}catch(e){if(arguments[2])console.trace(e,{},arguments[2],"Console.prototype.track::eval","TRACKED EVAL ERROR");else throw e;};}//for use by other language scripts, mostly. Use trackMethod, instead
};if(!Array.prototype.indexOf)Array.prototype.indexOf=function(obj,fromIndex){var o=Object(this),len=o.length>>>0,n,k;if(!len||(n=Math.ceil(Math.abs(fromIndex))||0)>=len)return-1;for(k=n<0?Math.max(len-Math.abs(n),0):n;k<len;k++)if(k in o&&o[k]===obj)return k;return-1;};//used in stringFrom and module code
(function(){var
OptS=Object.prototype.toString,
R={
bp:/\\/g,
q:/"/g,
r:/\r/g,
n:/\n/g,
z:/\0/g,
s:/ /g,
vk:/^[a-zA-Z_$][a-zA-Z0-9_$]*$/,
//triml:/^[\s\uFEFF\xA0]+/,trimr:/[\s\uFEFF\xA0]+$/,
trim:/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/,
fp:/\//,
//fpb:/\\\//g,
fd:/^([A-Za-z]:|)\\/,
fx:/["<|*?:>]/,
fr:/:([0-9][0-9]) /,
fm:/[\\\/]require\(module,console\)\.js$/},
thisfilename="require(module,console).js",
thispath,mainpath,
fso=typeof fso==="object"&&fso||typeof FSO==="object"&&FSO||new ActiveXObject("Scripting.FileSystemObject"),
axo={
//experimental
wmplayer:"wmplayer.ocx",
//established
Excel:"Excel.Application",
Outlook:"Outlook.Application",
InternetExplorer:"InternetExplorer.Application",
Word:"Word.Application",
Shell:"Shell.Application",
wshNet:"WScript.Network",
wshShell:"WScript.Shell",
fso:"Scripting.FileSystemObject"// already loaded, but included for inspection
},
	//host detection
win=typeof window!=="undefined",
wsh=typeof WScript!=="undefined",
csh=false,stderr={writeLine:function(s){var h,m=s;try{
h=fso.openTextFile("errors.log",8,1);
}catch(e){
m="ERROR: "+Console.prototype.stringFrom(e)+" Unable to log: "+m;
h=fso.openTextFile("error.log",8,1);
}
h.writeLine(m);
h.close();}};
if(wsh)try{WScript.stdout.write("");stderr=WScript.stderr;csh=true;}catch(e){WScript.echo(e.message);}
	//Files
var cache={},extensions={
".js":module.js,
".json":typeof JSON==="object"?function(h,module){var
x=console.entero(0,"require.extensions['.json']",arguments,{depth:0});
module.exports=JSON.parse(h.readAll());
}:function(h,module){var
x=console.entero(0,"require.extensions['.json']",arguments,{depth:0}),
n=R.trim,
c,
d=null,
e=h.readAll().replace(n,'');
//this function is based on code from jQuery 1.11.2, 2014 jQuery Foundation, Inc. [jquery.org/license]
if(e&&!e.replace(/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}).replace(n,''))
module.exports=x(Function("return "+e)());
throw new Error("Invalid JSON: "+e);}
};
mainpath=wsh?WScript.scriptFullName:win?window.location.href.search(/^file:\/\/\/[A-Z]:/)>=0&&fso.fileexists(unescape(window.location.href).substring(8))&&fso.getFile(unescape(window.location.href).substring(8)).path||fso.fileexists(unescape(window.location.href).substring(5))&&fso.getFile(unescape(window.location.href).substring(5)).path||"[Eval]":"[Eval]";
if(wsh&&WScript.scriptFullName.search(R.fm)>=0)thispath=WScript.scriptFullName;
else if(win)for(var i=0;i<document.scripts.length;i++){if(document.scripts[i].src.search(R.fm)>=0)thispath=fso.getFile(document.scripts[i].src).path;else cacheWinScript(i);}
if(!thispath)for(var i=fso.getFolder(".");true;i=i.parentFolder){if(fso.fileexists(i.path+"/"+thisfilename))thispath=fso.getFile(i.path+"/"+thisfilename).path;if(i.isRootFolder)break;}
if(!thispath)thispath=thisfilename;
	//Utility objects and functions
function stringFrom(o,Opt){var s=typeof o;//deep inspect recursive?
//other functions that could call stringFrom should not be used before or in the opt.depth===0 check to avoid infinite loops
	if(s==="number"||s==="boolean"||s==="undefined"||o===null)return''+o;
	if(s==="string"){
	return o.indexOf('"')>=0&&o.indexOf("'")<0?"'"+o.replace(R.bp,"\\\\").replace(R.z,"\\0").replace(R.n,"\\n").replace(R.r,"\\r")+"'":'"'+o.replace(R.bp,"\\\\").replace(R.z,"\\0").replace(R.n,"\\n").replace(R.r,"\\r").replace(R.q,'\\"')+'"';
	}
	if(s==="object"||s==="function"){
	if(o instanceof Enumerator)return'[Enumerator]';
	s=s==="function"?"[object Function]":OptS.apply(o);
	if(s.substring(0,8)==="[object ")s='['+s.substring(8);
	if(s==="[Error]")return"[Error"+(o.name&&o.name!=="Error"?"("+o.name+")":"")+(o.number?"#"+o.number:"")+': "'+o.message+'"]';
	var i,t,opt=typeof Opt==="object"?{depth:"depth" in Opt?Opt.depth:2,customInspect:Opt.customInspect||!"customInspect" in Opt,maxArrayLength:"maxArrayLength" in Opt?Opt.maxArrayLength:100,recursiveList:[],useFunctionDescriptor:Opt.useFunctionDescriptor}:{depth:2,customInspect:true,maxArrayLength:100,recursiveList:[]};
	if(o instanceof ActiveXObject){
	for(i in axo)if(cache.hasOwnProperty(i)&&o===cache[i].exports)return'require("'+i+'")';
	if(wsh){
	if(o===WScript)return"WScript";
	if(o===WScript.Arguments)return'WScript.Arguments';
	if(o===WScript.Arguments.Named)return'WScript.Arguments.Named';
	if(o===WScript.Arguments.Unnamed)return'WScript.Arguments.Unnamed';
	if(o===WScript.StdErr)return'WScript.StdErr';
	if(o===WScript.StdIn)return'WScript.StdIn';
	if(o===WScript.StdOut)return'WScript.StdOut';
	}
	s="[ActiveXObject"+(s==="[Object]"?typeof(o+'')==="undefined"?'[!toString]':o+''==="[object]"?'':" "+o:s)+"]";
	if(!win)return s;
	t=arguments;
	for(i in o){t=i;break;}
	if(o.tagName)s="[DOM "+o.tagName+(o.className?"."+o.className.replace(R.s,"."):"")+(o.id?"#"+o.id:"")+"]";else if("length" in o)s=o.nodeValue&&o.nodeValue.length===o.length?"[DOM TextNode "+stringFrom(o.nodeValue,{depth:0})+"]":"[DOM Array]";else if(t===arguments)return s;
/*
	i={parent:window};while(i!==window.top){if }
	if(o===window||o===window.parent||o===window.parent.parent)s="[Window]";
t="document,history,location,navigator,event,screen,parent,top,frameElement,frames,external,clientInformation,clipboardData".split(",");
for(i=0;i<a.length;i++)if(window[a[i]]===o)return"window."+a[i];
if(o===window.parent.parent)return"window.parent.parent";
a="body,forms,scripts,applets,plugins".split(",");
for(i=0;i<a.length;i++)if(window.document[a[i]]===o)return"window.document."+a[i];
*/
	/*t=[];
	if(opt.showInherited||!o.hasOwnProperty)for(i in o)
	try{     t.push((i.search(R.vk)<0?'"'+i.replace(R.q,'\\"')+'"':i)+':'+stringFrom(o[i],opt));}
	catch(e){t.push((i.search(R.vk)<0?'"'+i.replace(R.q,'\\"')+'"':i)+'!');}
	else for(i in o)if(o.hasOwnProperty(i))
	try{     t.push((i.search(R.vk)<0?'"'+i.replace(R.q,'\\"')+'"':i)+':'+stringFrom(o[i],opt));}
	catch(e){t.push((i.search(R.vk)<0?'"'+i.replace(R.q,'\\"')+'"':i)+'->'+stringFrom(e,opt));}
	return s+'{'+t.join(',')+'}';*/
	}
	if(typeof(o+'')==="undefined")return"[!toString"+s+"]";
	if(o.callee&&"caller"in o&&"length"in o)s="[Arguments]";
	if(opt.depth<1){
	if(o instanceof Console)return'[Console('+stringFrom(o.stream[0],{depth:0})+','+stringFrom(o.stream[1],{depth:0})+')'+(o.verbose?'verbose':'')+']';
	if(o instanceof Module)return'[Module "'+o.id.replace(R.q,'\\"')+'"'+(o.loaded?'':'(loading)')+']';
	return s;}
if(opt.recursiveList.indexOf(o)>=0)return"[Circular "+s.substring(8);
opt.recursiveList.push(o);
t={Console:Console,Module:Module};
for(i in t)if(o instanceof t[i])s="["+i+"]";
var x={depth:0};
x=console.entero(this instanceof Console&&this,"stringFrom",arguments,x);
if(opt.customInspect&&(typeof o.inspect==="function"||OptS.apply(o.inspect)==='[object Function]'))return x(o.inspect(opt.depth,Opt,opt));
	//no more returns before x()
	i=1;
	if(opt.depth)opt.depth--;
	if(s==='[Function]'){
	s=(opt.useFunctionDescriptor?functionDescriptor(o):o.toString())+'\t';
	}else if((s.substring(s.length-6)==='Array]'||s.substring(0,11)==="[Arguments]")&&(opt.maxArrayLength||opt.maxArrayLength===null)){
	t=[];
	i=opt.maxArrayLength===null?o.length:Math.min(o.length,opt.maxArrayLength);
	for(i--;i>=0;i--)t[i]=stringFrom(o[i],opt);
	s=(s==='[Array]'?'':s)+'['+t.join(',\n')+']';
	}
	t=[];
	if(i<0||s.substring(s.length-6)==='Array]'){
	if(opt.showInherited)for(i in o)if(isNaN(i))
	t.push((i.search(R.vk)<0?'"'+i.replace(R.bp,"\\\\").replace(R.q,'\\"')+'"':i)+':'+stringFrom(o[i],opt));
	else for(i in o)if(o.hasOwnProperty(i)&&isNaN(i))
	t.push((i.search(R.vk)<0?'"'+i.replace(R.bp,"\\\\").replace(R.q,'\\"')+'"':i)+':'+stringFrom(o[i],opt));
	}else{
	if(opt.showInherited||!o.hasOwnProperty)for(i in o)
	t.push((i.search(R.vk)<0?'"'+i.replace(R.bp,"\\\\").replace(R.q,'\\"')+'"':i)+':'+stringFrom(o[i],opt));
	else for(i in o)if(o.hasOwnProperty(i))
	t.push((i.search(R.vk)<0?'"'+i.replace(R.bp,"\\\\").replace(R.q,'\\"')+'"':i)+':'+stringFrom(o[i],opt));
	}
	if(!t.length&&s.substring(0,11)==="[Arguments]")t=['callee:'+stringFrom(o.callee,opt),'caller:'+stringFrom(o.caller,opt)];
return x((s==="[Object]"?'{'+t.join(',\n')+'}':s+(t.length?'{'+t.join(',\n')+'}':'')));}return"["+s+"]";}
stringFrom.host=function(o){return OptS.apply(o);}
	//Classes
function functionDescriptor(f){var s=f+'',i=s.indexOf(')');return i<2?s:s.substring(0,i+1);}
//Do not use entero, or any functions using entero, in the StackItem constructor!
function StackItem(o,n,p,O){this.n=n;this.p=p;if(typeof O==="object"){
this.O=O;
this.obj=o;
if(O.deprecated){
console.trace(this+" is deprecated. "+O.deprecated);
deprecatedUse[(o?stringFrom(o,O)+'.':'')+n]=O.deprecated;
}
}else this.O={};
//if(!(n&&''+n))console.trace("Empty stack name for "+this);
}
StackItem.prototype.toString=function(){var
p=[],
i,
o=this.obj?stringFrom(this.obj,this.obj instanceof Module||this.obj instanceof Console?{depth:0}:this.O):'';
if(this.p&&this.p.length)for(i=0;i<this.p.length;i++)p[i]=stringFrom(this.p[i],this.O);
return(//extra parens needed to span lines
(o?o+(o.length>45||o.indexOf("\n")>=0?'\n.':'.'):'')
+(this.n||"[StackItem "+this.n+"]")
+(this.p?'('+p.join(',')+')':'')
+(this.O.deprecated?'[deprecated]':'')
+(this.p&&this.p.callee?" as "+functionDescriptor(this.p.callee):'')
//caller empty outside of function
);};
var stack=[],tc={},deprecatedUse={};
function Console(out,err){var x=console.entero(0,"require('console').Console",arguments);
this.stream=[out,err||out];
if(typeof out.writeLine==="undefined")throw x(new Error("out stream can't writeLine: "+this.stringFrom(out)));
if(typeof this.stream[1].writeLine==="undefined")throw new Error("err stream can't writeLine: "+this.stringFrom(err));x();}
Console.prototype.Console=Console;
Console.prototype.getStackLength=function(){return stack.length;};
Console.prototype.dumpStack=function(o){this.trace(stack,o||{},"STACKDUMP");};
Console.prototype.stringFrom=stringFrom;
Console.prototype.functionDescriptor=functionDescriptor;
function stringTime(d){return d.toString().replace(R.fr,function(a,b){return":"+(+b+100+(d%1000)/1000).toString().substring(1)+" ";});}
Console.prototype.formatLog=function(k,msg,options,type,trace){
var d=new Date,i=stack.length-1,x=console.entero(this,"formatLog",arguments),O=options||{},s=O.from?O.from||"O.from":i<0?arguments.caller||stack[i+1]||":/":stack[i--]||"???";
if(trace||O.trace)for(;i>=0;i--)s+="\n\t...in "+stack[i];
//arguments.caller.caller is always empty with caller=null, so can't use it to trace very far at all, useless here, by itself (caller empty outside of function)
s=stringTime(d)+" "+(cache.wshNet?cache.wshNet.exports.username+'@'+(cache.wshNet.exports.userdomain!==cache.wshNet.exports.computername?cache.wshNet.exports.userdomain+'@':cache.wshNet.exports.computername)+' ':'')+(type?type+": ":' ')+this.stringFrom(msg,options)+" From "+s+"\n"+stringTime(i=new Date)+' '+(i-d)/1000+"s";
try{
this.stream[k].writeLine(s);
}catch(e){stderr.writeLine("Error logging to stream["+k+"]="+this.stringFrom(this.stream[k])+": "+this.stringFrom(e)+" Original error: "+s);}
return x(d);};
Console.prototype.enter=function(n,params,O){var
c=this instanceof Console?this:console;
Console.prototype.enter=function(n,params,O){return(this instanceof Console?this:console).entero(O&&O.object,n,params,O);};
c.formatLog(1,"Warning: Console.prototype.enter(name,params,options) is deprecated in favor of Console.prototype.entero(object,name,params,options)",O,"DEPRECATION_TRACE",1);
return c.entero(O&&O.object,n,params,O);};
Console.prototype.enteroAnyway=function(object,n,params,O){stack.oops=1;this.entero(object,n,params,O);};//allows calling entero in an onExit, but use cautiously
Console.prototype.entero=function(object,n,params,O){var
d=O||{depth:1},
c=this instanceof Console?this:console,
b=c.verbose||d.verbose,
x=stack.length,
f=function(o){if(b){
b=stack.oops===stack?{depth:0}:d;
stack.oops=stack;
c.stream[0].writeLine(stringTime(new Date)+" EXIT@stack["+x+"] "+stack[x]+" returning "+c.stringFrom(o,b));
if(b===d)stack.oops=null;
}stack.length=x;return o;};
f.resume=function(e,O){
if(e)c.formatLog(1,e,O||d,"RESUME_TRACE",1);
if(b)c.formatLog(0,e||"No error given",O||d,"RESUME@stack["+x+"] "+stack[x]+" from stack["+(stack.length-1)+"] "+stack[stack.length-1]);
stack.length=x+1;return e;};
stack[x]=new StackItem(c,"entero",arguments,d);
stack[x]=new StackItem(object,n,params,d);
if(b)c.stream[0].writeLine(stringTime(new Date)+" ENTER@stack["+x+"] "+stack[x]+" verbosity "+(d.verbose?"local":"global"));
return f;
};
Console.prototype.entero.getStackLength=function(){return stack.length;};
Console.prototype.entero.getDeprecatedUsage=function(){return deprecatedUse;};
Console.prototype.trace=function(msg,options,type){this.formatLog(1,msg,options,type||"TRACE",1);};
Console.prototype.log=function(msg,options){this.formatLog(0,msg,options,"LOG");};
Console.prototype.dir=function(o,options){this.formatLog(0,o,options,"INSPECT");};
Console.prototype.info=function(msg){this.formatLog(0,msg,"INFO");};
Console.prototype.warn=function(msg){this.formatLog(1,msg,"WARNING");};
Console.prototype.error=function(msg){this.formatLog(1,msg,"ERROR");};
Console.prototype.time=function(n){var s="Timer "+n+" started.",t=this.formatLog(0,s,"TIMER")*1;tc[n]=[t,stack.length];stack.push(s);};
Console.prototype.timeEnd=function(n){var t=new Date*1;this.formatLog(0,"Timer "+n+(tc[n]?" ended at "+(t-=tc[n][0])+"ms.":" not found."),"TIMER");if(tc[n]){for(var i=tc[n][1]+2;i<stack.length;i++)stack[i-1]=stack[i];stack.length--;tc[n]=undefined;delete tc[n];return t;}return null;};
Console.prototype.throwifnot=Console.prototype.assert=function(test,msg){if(test)return;var e=new Error("Assert Failure: "+msg);e.name="AssertionError";this.trace(e,{},"ASSERT");throw e;};//~node.js version of assert
Console.prototype.logifnot=function(test,msg){if(test)return;this.log(msg);};//~browser version of assert
Console.prototype.logif=function(test,msg){if(test)this.log(msg);};
Console.prototype.logThru=function(o){this.log(o);return o;}
Console.prototype.track=function(fn,params,trace){var x=console.entero(this,"track",arguments,{deprecated:"Use trackMethod, instead, as this makes logs longer"});console.entero(0,fn,params||[]);try{return x(fn.apply({},params||[]));}catch(e){if(trace)console.trace(e,{},trace,"Console.prototype.track::apply","TRACKED ERROR");else throw e;}x();};
Console.prototype.trackMethod=function(object,method,params,trace){var x=console.entero(this,"track",arguments);console.entero(object,method,params);try{return x(object[method].apply(object,params||[]));}catch(e){if(trace)console.trace(e,{},"Console.prototype.trackMethod::apply","TRACKED METHOD ERROR");else throw e;}x();}
Console.prototype.trackEval=module.trackEval;
if(typeof console!=="undefined")Console.host=console;
if(mainpath!=thispath)stack[0]=new StackItem(mainpath);
console={entero:function(){return function(o){return o;};}};//shim for next line
console=csh?new Console(WScript.stdout,stderr):new Console({writeLine:function(s){var h,m=s;try{
h=fso.openTextFile("console.log",8,1);
}catch(e){
m="ERROR: "+stringFrom(e)+" Unable to log: "+m;
h=stderr;
}h.writeLine(m);h.close();}},stderr);
try{
if(win)window.onerror=function(m,u,l){var x=console.entero(0,unescape(u)+"<"+l+">");console.entero(0,"window.onerror:console",arguments);console.trace(m,{},"UNCAUGHT ERROR");return x(console.cont);};
var X=console.entero(0,thispath);
function Module(id,exports){cache[this.id=id]=this;this.loaded=false;this.exports=exports||{};this.filename=id;this.parents=[];this.children=[];}
Module.prototype.create=function(n,exports){var x=console.entero(this,"create",arguments),m=new Module(n,exports);m.filename=this.filename;if(m.parents.indexOf(this)<0){m.parents.push(this);this.children.push(this);}return x(m);};
Module.prototype.require=function(n){var x=console.entero(this,"require",arguments),f=this.resolve(n);
if(!f)throw new Error('Module "'+n+'" not found from '+this.filename);
var b={},m=cache[f]/*&&cache[f].ts==f.dateLastModified&&cache[f]*/||axo.hasOwnProperty(f)&&(new Module(f,new ActiveXObject(axo[f])).loaded=true)&&cache[f]||new Module(f,b);
if(m.exports===b||m.parents.indexOf(this)<0){this.children.push(m);m.parents.push(this);}
if(m.exports!==b)return x(m.exports);
var h,y=".js";for(var i in extensions)if(f.substring(f.length-i.length)===i)y=i;
y=extensions[y](h=fso.openTextFile(f,1),m);
try{h.close();}catch(e){}//in case object variable not set (already closed by extension function)
m.loaded=true;
if(m.exports===b){
for(h in m.exports)if(m.exports.hasOwnProperty(h)){b=!m.exports;break;}
if(m.exports===b)m.exports=y;
}
return x(m.exports);};
function mRequire(m){var r=function(n){return console.entero(m,":require",arguments)(m.require(n));};
r.cache=cache;
r.extensions=extensions;
r.resolve=function(n){return m.resolve(n);};
r.main=main;
r.requireFrom=arguments.callee;
return r;}
Module.prototype.resolve=function(n,debug){var
x=console.entero(this,"resolve",arguments),
fd=n.search(R.fd)>=0,
i;
if(debug)console.log('resolving "'+n+'"');
if(win)for(i=0;i<document.scripts.length;i++)cacheWinScript(i);
if(cache.hasOwnProperty(n)||axo.hasOwnProperty(n)){if(debug)console.log("from cache");return x(n);}
if(!fd&&(i=n.search(R.fx))>=0){console.error("invalid character '"+n.charAt(i)+"'");return false;}
resolvex.debug=debug;
//i=n.replace(R.fp,"\\");
if(fd)return x(resolvex(n));
if(n.substring(0,2)===".\\")return x(resolvex(fso.getFile(this.filename).parentFolder.path+'\\'+n));
if(n.substring(0,3)==="..\\")return x(resolvex(fso.getFile(this.filename).parentFolder.parentFolder.path+'\\'+n));
return x(fso.fileexists(this.filename)&&resolvepath(fso.getFile(this.filename),n)||fso.fileexists(mainpath)&&resolvepath(fso.getFile(mainpath),n)||resolvepath({parentFolder:fso.getFolder(".")},n));
};
function resolvepath(F,n){var f=F,r;while(!f.isRootFolder){f=f.parentFolder;if(r=resolvex(f.path+"/"+n))return r;}return false;}
function resolvex(n){return iffile(n)||resolvext(n)||resolvext(n+"/index");}
function resolvext(n){var i,r;for(i in extensions)if(r=iffile(n+i))return r;return false;}
function iffile(n){if(resolvex.debug)console.log("Checking for "+n);return fso.fileexists(n)&&fso.getFile(n).path;}
function cacheWinScript(i){
var s=document.scripts[i],p,n,v={};
if(fso.fileexists(s.src)){
p=fso.getFile(s.src).path;
n=fso.getBaseName(p);
if(n.search(R.vk)>=0)v=window[n];
}else{
p="<Script #"+i+">";
}
if(cache.hasOwnProperty(p)&&cache[p].loaded)return;
if(cache.hasOwnProperty(p)){
for(n in cache[p].exports){v=cache[p].exports;break;}
cache[p].exports=v;
}else new Module(p,v).tag=s;
if(s.readyState==="interactive")module=cache[p];else if(s.readyState==="complete"/*original*/||s.readyState==="loaded"/*dynamicly loaded*/)cache[p].loaded=true;
}
//modules and exports
var exports={console:console,win:win,wsh:wsh,csh:csh,fso:fso},main=Module.prototype.require.main=new Module(mainpath,mainpath===thispath?exports:{}),onload=win&&window.onload;
if(win)window.onload=function(){
for(var i=0;i<document.scripts.length;i++)cacheWinScript(i);
main.loaded=true;
if(onload)onload.apply(this,arguments);};
module=mainpath===thispath?main:main.create(thispath,exports);
module.create("fso",fso).loaded=true;
module.create("console",console).loaded=true;
module.create("module",{nop:function(){},blank:function(){return"";},retrue:function(){return true;},info:function(){var q,Q=(typeof ScriptEngine=='function'&&typeof ScriptEngineMajorVersion=='function'&&typeof ScriptEngineMinorVersion=='function'&&typeof ScriptEngineBuildVersion=='function'?ScriptEngine()+' '+ScriptEngineMajorVersion()+'.'+ScriptEngineMinorVersion()+'.'+ScriptEngineBuildVersion():"JavaScript")+(wsh?"; "+WScript.name+" "+WScript.version+'.'+WScript.BuildVersion+" "+WScript.fullName:"")+(win?"; userAgent:"+window.navigator.userAgent:"")+'; main: "'+module.id+'"; Extensions:';
for(q in extensions)Q+=' '+q;
Q+="; cache:";
for(q in cache)Q+=' "'+q+'"'+(cache[q].loaded?'':"(loading)");
Q+="; ActiveX modules:";
for(q in axo)Q+=' '+q;
return Q;},create:function(n,exports){return console.enter(0,"require('module').create",arguments)(new Module(n,exports));},extensions:extensions,R:R,stringTime:stringTime}).loaded=true;
require=mRequire(module);
}catch(e){console.trace(e,{},"ERRORINbase");throw e;}
if(wsh&&WScript.scriptFullName.search(R.fm)>=0){
try{
WScript.echo(require("module").info());
}catch(e){console.trace(e,{},"SELFTEST");throw e;}
try{
require("./debugConsole.js")();
}catch(e){console.trace(e,{},"ERRORINdebugConsole.js");throw e;}
}
module.loaded=true;
module=main;
if(win)require=function(n){//special handler for script tags, though not quite as good (must use require before the module object to make sure it's the right module object)
var x=console.entero(0,"require",arguments),
i;
for(i=0;i<document.scripts.length;i++)cacheWinScript(i);
return x(module.require(n));
};
require.extensions=extensions;
require.main=main;
X();})();

