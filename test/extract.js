/*global describe, it */

'use strict';

var responsive = require('../');

var helpers = require('./helpers');
var makeFile = helpers.makeFile;
var assertFile = helpers.assertFile;

describe('gulp-responsive', function () {

  function runTest(config, cb) {
    var stream = responsive(config);
    stream.on('end', function () {
      cb();
    });
    stream.on('data', function (file) {
      assertFile(file);
    });
    stream.write(makeFile('gulp.png'));
    stream.end();
  }

  it('should let you extract before resize', function (cb) {
    var config = [{
      name: 'gulp.png',
      extractBeforeResize: {top:0, left: 0, width: 10, height: 10}
    }];
    runTest(config, cb);
  });
  it('should let you extract after resize', function (cb) {
    var config = [{
      name: 'gulp.png',
      extractAfterResize: {top:0, left: 0, width: 10, height: 10}
    }];
    runTest(config, cb);
  });
});
