/*global describe, it */

'use strict';

var assert = require('assert');
var prepareConfig = require('../lib/config');

describe('gulp-responsive', function() {

  describe('config', function () {

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

    it('should set unspecified default value for `max`', function() {
      var config = prepareConfig([{
        name: 'gulp.png',
        width: 100
      }]);

      assert.equal(config.length, 1);
      assert.equal(config[0].name, 'gulp.png');
      assert.equal(config[0].max, false);
    });
    
    it('should not override specified values', function() {
      var config = prepareConfig([{
        name: 'gulp.png',
        width: 100,
        withoutEnlargement: false,
        quality: 96,
        progressive: true,
        compressionLevel: 8,
        withMetadata: true,
        max: true
      }]);

      assert.equal(config.length, 1);
      assert.equal(config[0].name, 'gulp.png');
      assert.equal(config[0].withoutEnlargement, false);
      assert.equal(config[0].quality, 96);
      assert.equal(config[0].progressive, true);
      assert.equal(config[0].compressionLevel, 8);
      assert.equal(config[0].withMetadata, true);
      assert.equal(config[0].max, true);
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

  describe('global config', function () {

    it('should override default values', function () {
      var globalConfig = {
        withoutEnlargement: false,
        quality: 50,
        progressive: true,
        compressionLevel: 5,
        withMetadata: true,
        max: true
      };
      var config = prepareConfig([{
        name: 'gulp.png'
      }], globalConfig);

      assert.equal(config.length, 1);
      assert.equal(config[0].name, 'gulp.png');
      assert.equal(config[0].withoutEnlargement, false);
      assert.equal(config[0].quality, 50);
      assert.equal(config[0].progressive, true);
      assert.equal(config[0].compressionLevel, 5);
      assert.equal(config[0].withMetadata, true);
      assert.equal(config[0].max, true);
    });

    it('should not override values specified per file', function () {
      var globalConfig = {
        withoutEnlargement: true,
        quality: 50,
        progressive: false,
        compressionLevel: 5,
        withMetadata: false,
        max: true
      };
      var config = prepareConfig([{
        name: 'gulp.png',
        width: 100,
        withoutEnlargement: false,
        quality: 96,
        progressive: true,
        compressionLevel: 8,
        withMetadata: true,
        max: false
      }], globalConfig);

      assert.equal(config.length, 1);
      assert.equal(config[0].name, 'gulp.png');
      assert.equal(config[0].withoutEnlargement, false);
      assert.equal(config[0].quality, 96);
      assert.equal(config[0].progressive, true);
      assert.equal(config[0].compressionLevel, 8);
      assert.equal(config[0].withMetadata, true);
      assert.equal(config[0].max, false);
    });
  });
});
