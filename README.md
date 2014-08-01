node-innosetup-compiler
=======================

Node module to compile inno setup scripts (.iss)

This is a simple node wrapper of [Inno Setup](http://www.jrsoftware.org/isinfo.php) compiler: ISCC.exe

### OS Support

Works natively on windows
Works also on Linux and Mac OS X if [wine](www.winehq.org) is installed

### Usage

```javascript
require("innosetup-compiler")("path/to/your/innoscript.iss", function(error) {
	// callback
});
```