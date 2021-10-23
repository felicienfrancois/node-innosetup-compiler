'use strict';

const path = require('path');
const spawn = require('child_process').spawn;

module.exports = function(scriptPath, options, callback) {
  const promise = new Promise(function(resolve, reject) {
    try {
      let cmdLine, args;
      
      if (options && options.gui) {
        cmdLine = path.resolve(__dirname, '..', 'bin', 'Compil32.exe');
        args = ['/cc', scriptPath];
      } else {
        cmdLine = path.resolve(__dirname, '..', 'bin', 'ISCC.exe');
        args = [scriptPath];
        if (!(options && options.verbose)) {
          args.push('/q');
        }
        if (options && options.signtoolname && options.signtoolcommand) {
          args.push('/S' + options.signtoolname + '=' + options.signtoolcommand.replace(/['"]/g, '$q'));
        }
      }
      
      if (options) {
        //reset pre-processed options
        delete options.gui;
        delete options.verbose;
        delete options.signtoolname;
        delete options.signtoolcommand;
        
        //cycle all other options and add it to args
        Object.keys(options).forEach(function(key) {
          let val = options[key];
          if(/^D/.test(key)) {
            args.push('/' + key + '=' + val);
          } else {
            args.push('/' + key + val);
          }
        });
      }
      
      if (!/^win/.test(process.platform)) {
        args.unshift(cmdLine);
        cmdLine = "wine";
      }
    
      const child = spawn(cmdLine, args);
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
      let stderr = '';
      child.on('error', reject);
      child.stderr.on('data', function(data) {
        stderr += data;
      });
      child.on('close', function(code) {
        if (code === 0) {
          resolve();
        } else {
          reject(stderr);
        }
      });
    } catch(error) {
      reject(error);
    }
  });
  if (callback) {
    return promise.then(callback).catch(callback);
  }
  return promise;
};
