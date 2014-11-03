/*global describe, it */

'use strict';

var assert = require('assert');
var prepareConfig = require('../lib/config');

describe('gulp-responsive - config', function() {

  it('should set unspecified default value for `withoutEnlargement`', function() {
    var config = prepareConfig([{
      name: 'gulp.png',
      width: 100
    }]);

    assert.equal(config.length, 1);
    assert.equal(config[0].name, 'gulp.png');
    assert.equal(config[0].withoutEnlargement, true);
  });

  it('should set unspecified default value for `quality`', function() {
    var config = prepareConfig([{
      name: 'gulp.png',
      width: 100
    }]);

    assert.equal(config.length, 1);
    assert.equal(config[0].name, 'gulp.png');
    assert.equal(config[0].quality, 80);
  });

  it('should set unspecified default value for `progressive`', function() {
    var config = prepareConfig([{
      name: 'gulp.png',
      width: 100
    }]);

    assert.equal(config.length, 1);
    assert.equal(config[0].name, 'gulp.png');
    assert.equal(config[0].progressive, false);
  });

  it('should set unspecified default value for `compressionLevel`', function() {
    var config = prepareConfig([{
      name: 'gulp.png',
      width: 100
    }]);

    assert.equal(config.length, 1);
    assert.equal(config[0].name, 'gulp.png');
    assert.equal(config[0].compressionLevel, 6);
  });

  it('should set unspecified default value for `withMetadata`', function() {
    var config = prepareConfig([{
      name: 'gulp.png',
      width: 100
    }]);

    assert.equal(config.length, 1);
    assert.equal(config[0].name, 'gulp.png');
    assert.equal(config[0].withMetadata, false);
  });

  it('should parse config object', function() {
    var config = prepareConfig({
      'gulp.png': {
        width: 100
      }
    });

    assert.equal(config.length, 1);
    assert.equal(config[0].name, 'gulp.png');
    assert.equal(config[0].withoutEnlargement, true);
  });

  it('should parse config object of arrays', function() {
    var config = prepareConfig({
      'gulp.png': [{
        width: 100
      },{
        width: 200
      }]
    });

    assert.equal(config.length, 2);
    assert.equal(config[0].name, 'gulp.png');
    assert.equal(config[0].withoutEnlargement, true);
    assert.equal(config[1].name, 'gulp.png');
    assert.equal(config[1].withoutEnlargement, true);
  });
});
