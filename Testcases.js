Testcases={
js:function(h,t){var//general
x=console.entero(0,"Testcases.js",arguments);
h(require("module").info());

x();},
hta:function(oh,t){var
x=console.entero(0,"Testcases.hta",arguments),
h=function(s){oh(Testcases.HTML(s));};
Testcases.js(h,t);
//hta tests
document.onkeydown=function(){if(window.event.keyCode===115)require('debugConsole.js')();};
Testcases.logs(oh,t);
x();},
amp:/&/g,
lt:/</g,
HTML:function(s){return s.replace(Testcases.amp,"&amp;").replace(Testcases.lt,"&lt;");},
e:function(/*js,expected*/){"strict mode";try{
arguments.s=console.entero.getStackLength();
arguments.r=eval(arguments[0]);
return[(arguments.r===arguments[1]?"Pass":"Fail")+(console.entero.getStackLength()===arguments.s?'':" Stack Imbalance"+(console.entero.getStackLength()-arguments.s)),arguments.r];
}catch(e){
return["Exception",e];
}},
wsh:function(oh,ot){var
x=console.entero(0,"Testcases.wsh",arguments),
cscript,
stdout,
close,
F=[],
T=0,
h=oh||function(name){stdout.writeLine(name);},
t=ot||function(js,expected){var
x=console.entero(null,"testcasesWriteHTML::t",arguments),
E=console.stringFrom(expected),
r,
c;
T++;
r=Testcases.e(js,expected);
c=r[0];
r=console.stringFrom(r[1]);
if(c!=="Pass")F[F.length]="{"+js+"} "+c+(c.substring(0,5)==="Pass "?"":": "+r+"\n!==\n"+E);
stream.writeLine(j+'\t'+c+'\t'+r+'\t'+E);
return x(c);};
if(h!==oh||t!==ot)try{
WScript.stdout.writeLine("");
//CScript
stdout=WScript.stdout;
close=function(){stdout.writeLine("Press a key...");WScript.stdin.skip(1);};
cscript=true;
}catch(e){
//WScript
stdout=require("fso").createTextFile("Testcases.log");
close=function(){stdout.close();new require("Shell").shellExecute("Testcases.log");};
}else close=function(){};
stdout.writeLine("Quasic/wshta testcases");
Testcases.js(h,t);
//cscript/wscript tests
stdout.writeLine((T-F.length)+' passed/'+T+' total testcases, '+F.length+' failures, result: '+(F.length?"Fail":"Pass"));
if(F.length){
stdout.writeLine('\nReport\nPlease paste the following report (redacted if necessary) and any other relevant info on http://github.com/Quasic/wshta/issues/new');
stdout.writeLine(require("module").info()+F.join('\n\n')+'\n\nTotal Failures: '+F.length+s);
if(console.entero.readLog)stdout.writeLine('\nVerbose log:\n'+console.entero.readLog());
}
Testcases.logs(h,t);
close();
x(require('debugConsole.js'))();},
logs:function(h,t){var
x=console.entero(0,"Testcases.logs",arguments),
fso=require("fso"),
a=[];
if(fso.fileexists("console.log"))a[0]='"console.log">console.log';
if(fso.fileexists("errors.log"))a.push('"errors.log">errors.log');
if(fso.fileexists("error.log"))a.push('"error.log">error.log');
if(a.length)h('More detailed logs:<ul><li><a target=_blank href='+a.join('</a></li><li><a target=_blank href=')+'</a></li></ul>');
x();}};
if(typeof WScript==="object"&&WScript.scriptFullName.search(/[\\\/]Testcases\.js$/)>=0){
fso=new ActiveXObject("Scripting.FileSystemObject");
h=fso.openTextFile("require(module,console).js",1);
eval(h.readAll());
h.close();
Testcases.wsh();
}