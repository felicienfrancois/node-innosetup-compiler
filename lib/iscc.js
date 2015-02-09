'use strict';

var path = require('path');
var spawn = require('child_process').spawn;

module.exports = function(scriptPath, options, callback) {
	var cmdLine = path.resolve(__dirname, '..', 'bin', 'ISCC.exe');
	var args = ["/Qp", scriptPath];
	
	if (options && options.gui) {
		cmdLine = path.resolve(__dirname, '..', 'bin', 'Compil32.exe');
		args = ["/cc", scriptPath];
	}
	
	if (!/^win/.test(process.platform)) {
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
};