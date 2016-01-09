/*global describe, it */

'use strict';

var assert = require('assert');
var responsive = require('../');
var makeFile = require('./helpers').makeFile;

describe('gulp-responsive', function() {

  describe('errorOnEnlargement', function() {

    it('should emit error when image is enlarged', function(cb) {
      var config = [{
        name: 'gulp.png',
        width: 300,
        withoutEnlargement: true
      }];
      var stream = responsive(config);

      stream.on('error', function(err) {
        assert(/Image enlargement is detected/.test(err.message));
        cb();
      });

      stream.on('data', function(){});

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

    it('should emit error when image is enlarged by size in percentage', function(cb) {
      var config = [{
        name: 'gulp.png',
        width: '300%',
        withoutEnlargement: true
      }];
      var stream = responsive(config);

      stream.on('error', function(err) {
        assert(/Image enlargement is detected/.test(err.message));
        cb();
      });

      stream.on('data', function(){});

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

    it('should not emit error when image is enlarged and errorOnEnlargement is false', function(cb) {
      var config = [{
        name: 'gulp.png',
        width: 300,
        withoutEnlargement: true,
      }];
      var stream = responsive(config, {
        errorOnEnlargement: false
      });

      stream.on('error', function(err) {
        throw err;
      });

      stream.on('end', cb);

      stream.on('data', function(){});

      stream.write(makeFile('gulp.png'));
      stream.end();
    });
  });

  describe('errorOnUnusedConfig', function() {

    it('should emit error when config not used', function(cb) {
      var config = [{
        name: 'gulp.png'
      },{
        name: 'notused.png'
      }];
      var stream = responsive(config);

      stream.on('error', function(err) {
        assert(/Available images do not match the following config/.test(err.message));
        cb();
      });

      stream.on('data', function(){});

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

    it('should not emit error when config not used and `errorOnUnusedConfig` is false', function(cb) {
      var config = [{
        name: 'gulp.png'
      },{
        name: 'notused.png'
      }];
      var stream = responsive(config, {
        errorOnUnusedConfig: false
      });

      stream.on('error', function(err) {
        throw err;
      });

      stream.on('end', cb);

      stream.on('data', function(){});

      stream.write(makeFile('gulp.png'));
      stream.end();
    });
  });

  describe('errorOnUnusedImage', function() {

    it('should emit error when image not used', function(cb) {
      var config = [{
        name: 'gulp.png'
      },{
        name: 'notused.png'
      }];
      var stream = responsive(config);

      stream.on('error', function(err) {
        assert(/Available images do not match the following config/.test(err.message));
        cb();
      });

      stream.on('data', function(){});

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

    it('should not emit error when image not used and `errorOnUnusedImage` is false', function(cb) {
      var config = [{
        name: 'gulp.png'
      }];
      var stream = responsive(config, {
        errorOnUnusedImage: false
      });

      stream.on('error', function(err) {
        throw err;
      });

      stream.on('end', cb);

      stream.on('data', function(){});

      stream.write(makeFile('gulp.png'));
      stream.write(makeFile('unused.png', 'gulp.png'));
      stream.end();
    });
  });

  describe('unsupported image format', function() {
    it('should emit error if image format is unsupported', function (cb) {
      var config = [{
        name: 'unsupported.png'
      }];
      var stream = responsive(config);

      stream.on('error', function(err) {
        assert(/File `unsupported.png`/.test(err.message));
        cb();
      });

      stream.on('data', function(){});

      stream.write(makeFile('unsupported.png', '../../README.md'));
      stream.end();
    });
  });

});
