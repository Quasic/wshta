# Contributing and Style Guide
This is a strange beast I created for networking Windows 95+, before node.js, when WSH and ASP were the ways to make JavaScript servers.

I mostly maintain this for my own use, but thought others may find some parts useful. If you would like to contribute, you are welcome. Apoligies if my style is annoying. I often find other styles annoying, myself. :P

## Indentation and whitespace
I use a nonstandard whitespace format that makes my JavaScript look like minJS output. It helps keep diffs simpler, because indents don't change when wrapping (or unwrapping) code in an if block. I developed a similar style before I used git, so more code could fit on the screen at a time, and adjusted it to fit git's per line diffs. Tools can reformat the code, so I'm just leaving it the way I use it. Indents mark aspects of the line other than code structure, such as temporary code, or code with a hidden condition, though these sometimes overlap. Comments should be provided for code indented this way, so we don't assume it is simply code structure.

## File naming conventions
### JavaScript.js
JavaScript files typically contain only one object, with one global identifier, which is the base file name. Polyfills or shims extending another global object include a prefix of the global object and a dot, just as they are referenced in JavaScript. If multiple global identifiers are created, the filename should contain them all, separated by symbols. Of course, all of these names end with the .js extension.

### VBScript.vbs
VBScript files are either the name of a class or a prefix used to start the name of each sub and function inside, with a .vbs extension.

### Other files
Most other files don't return a named object, so the convention is less strict.

## Language specifics
### JavaScript
Strict mode is preferred, but optional, especially since many target systems don't support it. If used, it should be declared at the function level, rather than on the whole file.

### VBScript
This language lends itself well to git's per line diffs.

I tend to use fewer classes, since many target systems don't support them. If you use them, make note of it in a requirements header in a comment near the top of the file.

## console.entero
This is mostly to send a report back with somewhat intelligent, rather verbose information about what happened for debugging purposes, to hopefully simplify reproducing the error, in most cases.

### Flaws
1 This slows down code, so it's best to not use it if your function is robust enough to not need it.
2 This takes more memory to keep track of what is going on, so again, if it can be avoided...
3 Strict mode reduces the amount of information the report can provide, though it is still useful.

### How it's done
If you have a function that may throw an error, or has thrown an exception when it shouldn't, use the following form:
`````javascript
function f(params){
var x=console.entero(this,"f",arguments);
// function's code here
x();
}
`````
Any return statements in a function using console.entero must use the form ```return x(value);``` where x is the variable holding the function returned from console.entero, above, and value is the return value. If no value is returned, just use ```return x();```

For stack examination, this handles exceptions by keeping the stack in the context of the code which produced the error. Any catch blocks that don't return x(...) or immediately precede a return x(...) statement should call ```x.resume()``` after the error is handled, to return to the proper stack. ```x.resume(error)``` will also log a stack trace. ```throw``` statements don't normally need any wrapper functions like return statements do.

The extra variables and return wrappers can safely be removed if unneeded, or console.entero shims can basically disable them temporarily.

This can also be useful for unit testing, deprecation checking, and analyzing code coverage, though better tools for that exist.

 I would like to make a tool or plugin which automatically adds/removes this tracking for functions in bulk, so you can easily turn it on or off as needed without using a shim, which still eats some effeciency. You can already add it by using the following wrapper in a debugger:
`````javascript
f=function(){console.entero(this,"f",arguments)(f.apply(this,arguments));};
`````
Just replace the 3 ```f```'s with the name of the function or method. Removing this tracking is possible if you save a reference to the original function.
