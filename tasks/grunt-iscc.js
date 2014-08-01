'use strict';
module.exports = function(grunt) {

	grunt.registerMultiTask('innosetup-compiler', 'Node wrapper to compile inno setup scripts (.iss)', function() {
		var iscc = require("../lib/innosetup-compiler.js");
		var done = this.async();
		iscc(this.data.script, {}, function(error) {
			done(!error);
		});
	});

};
