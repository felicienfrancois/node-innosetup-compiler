'use strict';
module.exports = function(grunt) {

	grunt.registerMultiTask('innosetup-compiler', 'Inno setup compiler', function() {
		var done = this.async();
		require("../lib/iscc.js")(this.data.script, this.data.options, function(error) {
			done(!error);
		});
	});

};
