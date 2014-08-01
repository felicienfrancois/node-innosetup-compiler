'use strict';
module.exports = function(grunt) {

	grunt.registerMultiTask('innosetup-compiler', 'Inno setup compiler', function() {
		require("../lib/iscc.js");
		var done = this.async();
		exec(this.data.script, this.data.options, function(error) {
			done(!error);
		});
	});

};
