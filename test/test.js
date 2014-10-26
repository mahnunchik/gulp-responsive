/*global describe, it */

'use strict';

//var assert = require('assert');
//var gutil = require('gulp-util');
var responsive = require('../');

describe('gulp-responsive', function() {
  it('should ', function (cb) {
    var stream = responsive();

    stream.on('end', cb);

    stream.end();
  });
});
