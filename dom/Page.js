/*Paging script to fix fatal IE bug occurring when button events remove their buttons, with a keymap and help system added

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
*/"use strict";function Page(h,help,hf,hp,he,f,p,e){var x=Page.entero(0,"Page",arguments);Page.xp=arguments;Page.content=h;Page.help=help;Page.hook=hf||Page.nop;Page.hookp=hp;Page.hooke=he;Page.f=f;Page.p=p;Page.e=e;clearTimeout(Page.t);Page.t=setTimeout(Page.u,1);x();}
Page.turn=function(o){Page.entero(0,"Page.turn",arguments)(Page(o.content,o.help,o.onsubmit,o.onsubmitArguments,o.onsumitError,o.callback,o.callbackArguments,o.callbackError));};
Page.entero=typeof console!=="undefined"&&console.entero||function(){return function(o){return o;}};
Page.trackMethod=typeof console!=="undefined"&&console.trackMethod||function(o,f,p){return o[f].apply(o,p);};
Page.u=function(){var x=Page.entero(0,"Page",Page.xp);Page.entero(0,"Page.u",arguments);if(!Page.form)(Page.form=document.forms[0]);Page.form.innerHTML=Page.content;Page.form.onsubmit=function(){Page.trackMethod(Page,"hook",Page.hookp,Page.hooke);return false;};if(Page.f)Page.trackMethod(Page,"f",Page.p,Page.e);Page.content=Page.p=Page.f=Page.t=null;x();};
Page.hook=Page.nop=function(){};Page.hookp=[];
Page.helper=function(){
if(typeof Page.help==="object"){
var w=window.open("about:blank","Page.help",""),h=w.document,o=Page.help,t=o.title?(o.title+'').replace(/&/g,"&amp;").replace(/</g,"&lt;"):'Help';
h.write('<html><head><title>'+t+'</title>'+o.head+'</head><body><h1>'+t+'</h1><form id=Form onsubmit="return false;">'+o.content+'</form></body></html>');
h.close();
//window.onclose=function(){w.close();};
}else alert((Page.help?Page.help+"\n\n":"")+Page.basichelp);
}
Page.basichelp="Keyboard shortcuts:\nFind text on page (Ctrl+F), Print page (Ctrl+P), Select All on page or in edit box (Ctrl+A), Zoom in (Ctrl+ +), Zoom out (Ctrl+ -)\nMain Menu (F2), Logout (F5), Help (F1)\nEditing: Copy selection to clipboard (Ctrl+C), Cut (Ctrl+X, same as Copy then delete), Paste from clipboard (Ctrl+V), Undo previous edit (Ctrl+Z), Redo previous Undo (Ctrl+Y)\nYou can use the keyboard instead of the mouse for most things: Next control (Tab), Click control (Enter), Check box (Spacebar)";
Page.keyMap=[];
Page.keyMap[112]=Page.helper;//F1
//Page.keyMap[113]=menu;//F2  - could add menu.lock and edit message in menu(), but no need as yet
//Page.keyMap[114]=;//F3
//Page.keyMap[115]=;//F4
//F5 refreshes
//Page.keyMap[117]=;//F6
document.onkeydown=function(){var f=Page.keyMap[window.event.keyCode];if(f)f();};
