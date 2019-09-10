var exec = require('child_process').exec,
    child;
var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

// Instantiate a Mocha instance.
var mocha = new Mocha({
    require: 'babel-register'
});
var testDir = './test'

// Build the app before running tests
child = exec('npm run build',
function (error, stdout, stderr) {
     console.log('stdout: ' + stdout);
     console.log('stderr: ' + stderr);
     if (error !== null) {
          console.log('exec error: ' + error);
     }

    // Read all files recursively
    var walk = function(dir) {
        var results = [];
        var list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = path.join(dir, file);
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) { 
                /* Recurse into a subdirectory */
                results = results.concat(walk(file));
            } else { 
                /* Is a file */
                results.push(file);
            }
        });
        return results;
    }

    // Add each .js file to the mocha instance
    walk(testDir).filter(function(file) {
        // Only keep the .js files
        return file.substr(-3) === '.js';

    }).forEach(function(file) {
        mocha.addFile(
            file
        );
    });

    // Run the tests.
    mocha.run(function(failures) {
      process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
    });
});
