# wshta
Miscellaneous Scripts for Windows, and a base for the library

Various templates are in the [templates folder](https://github.com/Quasic/wshta/templates).

## JScript, VBScript, HTML, and XML

These scripts are for
* WSH (Windows Script Hosts WScript.exe or CScript.exe)
* HTA (HyperText Applications running in mshta.exe)
* ASP (untested)
* IE (Internet Explorer) to some extent
* other applications using at least one of the same script engines, such as Visual Pinball.

### System Requirements
Windows 95+, which came with WSH 1.0+, though WSH 5.6 is recommended

JScript 3.0 is needed for the ActiveXObject.

VBScript 2.0 is needed for CreateObject

Internet Explorer 4+ will provide the above languages, as well.

I'm working on a [system test script](https://github.com/Quasic/wshta/tools/testRequirements.wsf) to check for problems, or you can just try it to see if it works, and post the error log or message if it doesn't.

### Languages
#### JScript
The JavaScript in here is the JScript flavor, for environments with ActiveXObject. JScript is the base language, due to its ability to create objects. The base code is in [require(module,console).js](https://github.com/Quasic/wshta/require(module,console).js), though most of the scripts work without it. Each .js filename lists the names of the global objects it creates if loaded in a script tag. So, the base script creates 3 global objects, named require, module, and console. Most scripts create only one object. The base script's require function is very similar to node.js's, though it currently doesn't provide full node.js support. The base can also be [included without script tag support](https://github.com/Quasic/wshta/templates/require.md).
#### VBScript
VBScript provides its MsgBox function. It also handles objects a bit differently. Each .vbs filename lists the names of classes, subs, and/or functions, or common prefixes, contained in the file. [VBScript can load the base objects](https://github.com/QuaSic/wshta/templates/require(module,console,fso,js).vbs).

#### Other Languages
I may add some PerlScript or others, though these language need to be installed separately, which means fewer will benefit from them, so they are not high priority. It may be better to use a separate "add-on" repo to avoid confusion.

### Special object support
Scripts requiring the WScript object, provided by both WScript.exe and CScript.exe, are included in the wsh subfolder. Other scripts may also use it, if available. CScript uses a text-based display. WScript.stdin, WScript.stdout, and WScript.stderr can be used with the library.

Scrpts requiring the window object, or the DOM, provided by HTA and IE, are found in the dom subfolder. These are designed to work with [Quasic/dom](https://github.com/Quasic/dom) scripts, which don't require ActiveXObject.

### Base
The base require(module,console).js script provides an environment resembling node.js, with a console object resembling those found in browsers.

The console object was developed for reporting problems over a network, or debugging in conditions where a debugger isn't available or won't do, such as when the script encounters an intermittant problem outside of a debugger. It takes more resources than the default error handler, and doesn't provide the full functionality of a debugger.

The require and module objects are just for convenience. For a simpler approach without the console, see [templates/require.md](https://github.com/Quasic/wshta/templates/require.md), which can be used to import any script, not just this one.


## BATch
These are mostly utility scripts.

## PowerShell


## History
I've been using these and their predecessors on a LAN for a long time and thought why not share them publicly?
They were originally planned to be released in [a general scripts collection](//github.com/Quasic/scripts), but thought that was too bulky.
