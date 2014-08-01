(function() {
  var path = require('path');
  var spawn = require('child_process').spawn;

  module.exports = function(scriptPath, callback) {
    var cmdLine = path.resolve(__dirname, '..', 'bin', 'ISCC.exe');
    var args = ["/Qp", scriptPath];
    
    if (process.platform !== "win32") {
      args.unshift(cmdLine);
      cmdLine = "wine";
    }
    
    var child = spawn(cmdLine, args);
    var stderr = '';
    child.on('error', function(err) {
      return callback(err);
    });
    child.stderr.on('data', function(data) {
      return stderr += data;
    });
    return child.on('close', function(code) {
      if (code === 0) {
        return callback(null);
      } else {
        return callback(stderr);
      }
    });
  };

}).call(this);
