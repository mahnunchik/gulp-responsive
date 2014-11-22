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
        assert(/Image must not be enlarged/.test(err.message));
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
        assert(/Image must not be enlarged/.test(err.message));
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

  describe('strictMatchConfig', function() {

    it('should emit error when config not used', function(cb) {
      var config = [{
        name: 'gulp.png'
      },{
        name: 'notused.png'
      }];
      var stream = responsive(config);

      stream.on('error', function(err) {
        assert(/Available images do not match following config/.test(err.message));
        cb();
      });

      stream.on('data', function(){});

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

    it('should not emit error when config not used and strictMatchConfig is false', function(cb) {
      var config = [{
        name: 'gulp.png'
      },{
        name: 'notused.png'
      }];
      var stream = responsive(config, {
        strictMatchConfig: false
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

  describe('strictMatchImages', function() {

    it('should emit error when image not used', function(cb) {
      var config = [{
        name: 'gulp.png'
      },{
        name: 'notused.png'
      }];
      var stream = responsive(config);

      stream.on('error', function(err) {
        assert(/Available images do not match following config/.test(err.message));
        cb();
      });

      stream.on('data', function(){});

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

    it('should not emit error when image not used and strictMatchImages is false', function(cb) {
      var config = [{
        name: 'gulp.png'
      }];
      var stream = responsive(config, {
        strictMatchImages: false
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


});
