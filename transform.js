const fs = require('fs');
const path = require('path');
const endOfLine = require('os').EOL;
const espree = require('espree');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

function transformTestFile (filePath, numOfTestFiles) {
  let code = fs.readFileSync(filePath);

  const ast = espree.parse(code, {
    loc: false,
    ecmaVersion: 10,
    sourceType: "module",
  });

  let allTests = traverse(ast);
  let essentialBody = removeTests(ast);

  let newScript = escodegen.generate(essentialBody) + endOfLine;
  newScript += 'function done () {}';
  newScript += endOfLine;

  for (let i = 0; i < allTests.length; i ++) {
    let newTest = endOfLine + 'module.exports.test' + numOfTestFiles + '_' + i + ' = function () {' + endOfLine;
    newTest += escodegen.generate(allTests[i]);
    newTest += '}';
    newTest += endOfLine;

    newScript += newTest;
  }

  return {
    numOfTests: allTests.length,
    newScript: newScript
  };
}

function traverse (ast) {
  let allTests = [];

  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'it') {
        allTests.push(node.arguments[1].body);
      }
    },
    leave: function (node, parent) {
    }
  });

  return allTests;
}

function removeTests (ast) {
  // remove mocha 'it' and 'describe' expressions
  ast = estraverse.replace(ast, {
    enter: function (node, parent) {
      if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'it' ||
        node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'describe') {
        return estraverse.VisitorOption.Remove;
      }
    },
    leave: function (node, parent) {
    }
  });

  // remove empty expressions created after removing describe statements
  ast = estraverse.replace(ast, {
    enter: function (node, parent) {
      if (node.type === 'ExpressionStatement' && node.expression === null) {
        return estraverse.VisitorOption.Remove;
      }
    },
    leave: function (node, parent) {
    }
  });

  return ast;
}

function readTestDir (testDir) {
  let results = walk(testDir);
  // console.log(results)
}

function walk (dir) {
  let results = [];
  let list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    let stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      if (file.substr(-7) === 'spec.js' && !path.basename(file).startsWith('__')) {
        results.push(file);
        let fileName = path.basename(file);
        let newFilePath = path.join(path.dirname(file), '__' + fileName);
        let transformedFile = transformTestFile(file, numOfTestFiles);
        invokeTests(newFilePath, transformedFile, numOfTestFiles);
        numOfTestFiles ++;
      }
    }
  });
  return results;
}

function invokeTests (newFilePath, transformedFile) {
  // write the transformed test file
  fs.writeFileSync(newFilePath, transformedFile.newScript);
  let testFileName = 'testFile' + numOfTestFiles;
  let invocationScript = "let " + testFileName + " = require('." + path.sep + newFilePath + "');" + endOfLine;
  for (let i = 0; i < transformedFile.numOfTests; i ++) {
    invocationScript = invocationScript + testFileName + ".test" + numOfTestFiles + '_' + i + "();" + endOfLine;
  }
  invocationScript += endOfLine;
  fs.appendFileSync(invokeTestsFile, invocationScript);
}

// let invokeTestsFile = path.resolve('invokeAppTests.js');
let invokeTestsFile = path.resolve('main.js');
fs.writeFileSync(invokeTestsFile, '');
let numOfTestFiles = 0;
readTestDir('./test');
