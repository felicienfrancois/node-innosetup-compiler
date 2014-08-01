node-innosetup-compiler
=======================

Node module to compile inno setup scripts (.iss)

This is a simple node wrapper of [Inno Setup](http://www.jrsoftware.org/isinfo.php) compiler: ISCC.exe

### OS Support

##### Windows

Works natively on windows

##### Linux & Mac OS X

Works if [wine](www.winehq.org) is installed

### Usage

##### Command line

```bash
# Install
npm install -g innosetup-compiler
# Use
innosetup-compiler myscript.iscc
```


### Node JS

```bash
# Install
npm install innosetup-compiler
```

```javascript
// Use
require("innosetup-compiler")("path/to/your/innoscript.iss", function(error) {
	// callback
});
```

### Credits

Thanks to Jordan Russell and Martijn Laan for their amazing work on Inno Setup