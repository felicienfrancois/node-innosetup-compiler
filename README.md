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
```

##### Node JS

```shell
npm install innosetup-compiler
```

```javascript
require("innosetup-compiler")("path/to/your/innoscript.iss", {}, function(error) {
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
	"innosetup-compiler": {
		your_target: {
		  script: "path/to/your/innosetup/script.iss"
		}
	}
	...
});
```


### Credits

Thanks to Jordan Russell and Martijn Laan for their amazing work on Inno Setup