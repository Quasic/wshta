#Including files with no script tags
Many files this library supports will have support for script tags: .html, .hta, .wsf

For those which don't, you can still use []. Make sure to edit the paths in the following code to point to the file.
## JScript
If working straight from a .js file, which has no script tags to load other scripts, you may want this at the top to load the require function and console:
```javascript
"use strict";
(function(){var fso=new ActiveXObject("Scripting.FileSystemObject"),h=fso.openTextFile(".../Quasic/wshta/require(console).js",1);new Function(h.readAll())();h.close();})();try{
//your code here
}catch(e){console.trace(e);}
```
If you want to use the fso variable, move its declaration out of the function:
```javascript
"use strict";
fso=new ActiveXObject("Scripting.FileSystemObject");
(function(){var h=fso.openTextFile(".../Quasic/wshta/require(console).js",1);new Function(h.readAll())();h.close();})();try{
//your code here
}catch(e){console.trace(e);}
```
## VBScript
For this, we use the ScriptControl COM object, as well as fso:
```
Set fso=CreateObject("Scripting.FileSystemObject")
Set js=CreateObject("ScriptControl")
js.language="JScript"
js.allowUI=true
js.addCode "var fso,FSO,WScript;function module(Fso,wscript){FSO=fso=Fso;WScript=wscript;}" 'lowercase fso alone doesn't work, for some reason
js.run "module",fso,WScript
Set h=fso.openTextFile(".../Quasic/wshta/require(module,console).js")
js.addCode h.readAll()
h.close()
set console=js.eval("console")
set module=js.eval("module")
function require(n)
set require=js.run("require",n)
end function```

[Example .vbs template](https://github.com/Quasic/wshta/templates/require(module,console,fso,js).vbs)