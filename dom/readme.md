#WSHTA DOM support scripts
These scripts support environments with ActiveXObject and the window object with its Document Object Model, specifically:
* HyperText Applications (.hta)
* Internet Explorer (.htm|.html|.chm|...)

These scripts can be used to create a GUI for local or trusted LAN scripts. Using it on the Internet is both unsafe, because IE is obsolete for use as an Internet browser, and more difficult, because of security restrictions.

These scripts don't use the WScript object, but some do use WScript to create COM (ActiveX) objects. For instance, WScript.Network or WScript.Shell. This requires WScript to be installed and registered to do this.

Scripts supporting the window object for use on the Internet in other browsers can be found in the dom folder outside of the wshta folder.