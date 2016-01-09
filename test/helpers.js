'use strict';

var gutil = require('gulp-util');
var assert = require('assert');
var path = require('path');
var fs = require('fs');

function makeFile(name, file) {
  if (!file) {
    file = name;
  }
  return new gutil.File({
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
  gutil.log = function () {};
}
