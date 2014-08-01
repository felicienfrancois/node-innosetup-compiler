(function() {
  var path = require('path');
  var spawn = require('child_process').spawn;

  module.exports = function(scriptPath, options, callback) {
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
      callback(err);
    });
    child.stderr.on('data', function(data) {
      stderr += data;
    });
    return child.on('close', function(code) {
      if (code === 0) {
        callback(null);
      } else {
        callback(stderr);
      }
    });
  };

}).call(this);
