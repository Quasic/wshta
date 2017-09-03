'make sure the path in the following line is correct
module="../../../Quasic/wshta/require(module,console).js"
Set fso=CreateObject("Scripting.FileSystemObject")
Set js=CreateObject("ScriptControl")
js.language="JScript"
js.allowUI=true
js.addCode "var fso,FSO,WScript;function module(Fso,wscript){FSO=fso=Fso;WScript=wscript;}" 'lowercase fso alone doesn't work, for some reason
js.run "module",fso,WScript
Set module=fso.openTextFile(module)
js.addCode module.readAll()
module.close()
set console=js.eval("console")
set module=js.eval("module")
function require(n)
set require=js.run("require",n)
end function

'Your code should replace this test
WScript.echo(console.stringFrom(module))
WScript.echo(console.stringFrom(fso))
WScript.echo(console.stringFrom(WScript))
WScript.echo(console.stringFrom(require("fso")))
