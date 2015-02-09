'use strict';

var path = require('path');
var spawn = require('child_process').spawn;

module.exports = function(scriptPath, options, callback) {
	var cmdLine, args;
	
	if (/^win/.test(process.platform)) {
		cmdLine = path.resolve(__dirname, '..', 'bin', 'ISCC.exe');
		args = ["/Qp", scriptPath];
	} else if (/^darwin/.test(process.platform)) {
		cmdLine = "wine";
		// ISCC does not seems to work with wine OSX
		args = [path.resolve(__dirname, '..', 'bin', 'Compil32.exe'), "/cc", scriptPath];
	} else {
		cmdLine = "wine";
		args = [path.resolve(__dirname, '..', 'bin', 'ISCC.exe'), "/Qp", scriptPath];
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