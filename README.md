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

```shell
npm install -g innosetup-compiler
```

```shell
innosetup-compiler myscript.iscc
innosetup-compiler myscript.iscc --gui // with gui enabled
```

##### Node JS

```shell
npm install innosetup-compiler
```

```javascript
require("innosetup-compiler")("path/to/your/innoscript.iss", {gui: false}, function(error) {
	// callback
});
```

##### Grunt

```shell
npm install innosetup-compiler --save-dev
```

```javascript
grunt.loadNpmTasks('innosetup-compiler');
...
grunt.initConfig({
	...
	"innosetup_compiler": {
		your_target: {
		  options: {
		    gui: false
		  },
		  script: "path/to/your/innosetup/script.iss"
		}
	}
	...
});
```

### Options

#### options.gui
_Default_: `false`
Use Compil32.exe instead or ISCC.exe (GUI mode)


### Credits

Thanks to Jordan Russell and Martijn Laan for their amazing work on Inno Setup