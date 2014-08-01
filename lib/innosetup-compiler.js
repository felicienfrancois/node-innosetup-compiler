'use strict';

var path = require('path');
var spawn = require('child_process').spawn;

module.exports = function() {
	
	if (arguments.length === 0 || !arguments[0]) {
		throw new Error("Missing arguments");
	} else if (typeof(arguments[0].registerMultiTask) === "Function") {
		registerGruntTask.apply(this, arguments);
	} else {
		exec.apply(this, arguments);
	}
	
	function exec(scriptPath, options, callback) {
		var cmdLine = path.resolve(__dirname, '..', 'bin', 'ISCC.exe');
		var args = ["/Qp", scriptPath];
	
		if (process.platform !== "win32") {
			args.unshift(cmdLine);
			cmdLine = "wine";
		}
	
		var child = spawn(cmdLine, args);
		child.stdout.pipe(process.stdout);
		child.stderr.pipe(process.stderr);
		var stderr = '';
		child.on('error', function(err) {
			if (callback) {
				callback(err);
			}
		});
		child.stderr.on('data', function(data) {
			stderr += data;
		});
		child.on('close', function(code) {
			if (code === 0) {
				if (callback) {
					callback(null);
				}
			} else {
				if (callback) {
					callback(stderr);
				}
			}
		});
	}
	
	function registerGruntTask(grunt) {
		grunt.registerMultiTask('innosetup-compiler', 'Inno setup compiler', function() {
			var done = this.async();		
			exec(this.data.script, this.data.options, function(error) {
				done(!error);
			});
		});
	}
};