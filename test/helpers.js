'use strict';

var flog = require('fancy-log');
var assert = require('assert');
var path = require('path');
var fs = require('fs');
var Vinyl = require('vinyl');

function makeFile(name, file) {
  if (!file) {
    file = name;
  }
  return new Vinyl({
    base: path.join(__dirname, '/fixtures'),
    path:  path.join(__dirname, '/fixtures/', name),
    contents: fs.readFileSync(path.join(__dirname, '/fixtures/', file))
  });
}

function assertFile(file) {
  assert(file);
  assert(file.base);
  assert(file.path);
  assert(file.contents);
}

exports.makeFile = makeFile;
exports.assertFile = assertFile;

// Force mute gulp logger in test environment
if (process.env.NODE_ENV === 'test') {
  flog = function () {};
}
