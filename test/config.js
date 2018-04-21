/*global describe, it */

'use strict';

var assert = require('assert');
var prepareConfig = require('../lib/config');

describe('gulp-responsive', function () {

  describe('config', function () {

    it('should set default values for unspecified config options', function () {
      var config = prepareConfig([{
        name: 'gulp.png',
      }]);

      assert.equal(config.length, 1);
      assert.equal(config[0].name, 'gulp.png');
      assert.equal(config[0].crop, false);
      assert.equal(config[0].embed, false);
      assert.equal(config[0].min, false);
      assert.equal(config[0].max, false);
      assert.equal(config[0].withoutEnlargement, true);
      assert.equal(config[0].skipOnEnlargement, false);
      assert.equal(config[0].ignoreAspectRatio, false);
      assert.equal(config[0].kernel, 'lanczos3');
      assert.equal(config[0].extractBeforeResize, false);
      assert.equal(config[0].extractAfterResize, false);
      assert.equal(config[0].background, '#fff');
      assert.equal(config[0].flatten, false);
      assert.equal(config[0].negate, false);
      assert.equal(config[0].rotate, false);
      assert.equal(config[0].flip, false);
      assert.equal(config[0].flop, false);
      assert.equal(config[0].blur, false);
      assert.equal(config[0].sharpen, false);
      assert.equal(config[0].threshold, false);
      assert.equal(config[0].gamma, false);
      assert.equal(config[0].grayscale, false);
      assert.equal(config[0].normalize, false);
      assert.equal(config[0].quality, 80);
      assert.equal(config[0].progressive, false);
      assert.equal(config[0].withMetadata, false);
      assert.equal(config[0].trim, false);
      assert.equal(config[0].tile, false);
      assert.equal(config[0].withoutChromaSubsampling, false);
      assert.equal(config[0].compressionLevel, 6);
      assert.equal(config[0].format, null);
    });

    it('should not override specified values', function () {
      var config = prepareConfig([{
        name: 'gulp.png',
        width: 100,
        crop: 'test',
        embed: 'test',
        min: 'test',
        max: 'test',
        withoutEnlargement: 'test',
        skipOnEnlargement: 'test',
        ignoreAspectRatio: 'test',
        kernel: 'test',
        extractBeforeResize: 'test',
        extractAfterResize: 'test',
        background: 'test',
        flatten: 'test',
        negate: 'test',
        rotate: 'test',
        flip: 'test',
        flop: 'test',
        blur: 'test',
        sharpen: 'test',
        threshold: 'test',
        gamma: 'test',
        grayscale: 'test',
        normalize: 'test',
        quality: 'test',
        progressive: 'test',
        withMetadata: 'test',
        tile: 'test',
        withoutChromaSubsampling: 'test',
        compressionLevel: 'test',
        format: 'test',
      }]);

      assert.equal(config.length, 1);
      assert.equal(config[0].name, 'gulp.png');
      assert.equal(config[0].crop, 'test');
      assert.equal(config[0].embed, 'test');
      assert.equal(config[0].min, 'test');
      assert.equal(config[0].max, 'test');
      assert.equal(config[0].withoutEnlargement, 'test');
      assert.equal(config[0].skipOnEnlargement, 'test');
      assert.equal(config[0].ignoreAspectRatio, 'test');
      assert.equal(config[0].kernel, 'test');
      assert.equal(config[0].extractBeforeResize, 'test');
      assert.equal(config[0].extractAfterResize, 'test');
      assert.equal(config[0].background, 'test');
      assert.equal(config[0].flatten, 'test');
      assert.equal(config[0].negate, 'test');
      assert.equal(config[0].rotate, 'test');
      assert.equal(config[0].flip, 'test');
      assert.equal(config[0].flop, 'test');
      assert.equal(config[0].blur, 'test');
      assert.equal(config[0].sharpen, 'test');
      assert.equal(config[0].threshold, 'test');
      assert.equal(config[0].gamma, 'test');
      assert.equal(config[0].grayscale, 'test');
      assert.equal(config[0].normalize, 'test');
      assert.equal(config[0].quality, 'test');
      assert.equal(config[0].progressive, 'test');
      assert.equal(config[0].withMetadata, 'test');
      assert.equal(config[0].tile, 'test');
      assert.equal(config[0].withoutChromaSubsampling, 'test');
      assert.equal(config[0].compressionLevel, 'test');
      assert.equal(config[0].format, 'test');
    });
  });

  describe('config parsing', function () {

    it('should parse config object', function() {
      var config = prepareConfig({
        'gulp.png': {
          width: 100
        }
      });

      assert.equal(config.length, 1);
      assert.equal(config[0].name, 'gulp.png');
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
      assert.equal(config[0].width, 100);
      assert.equal(config[1].name, 'gulp.png');
      assert.equal(config[1].width, 200);
    });

    it('should leave config array as is', function() {
      var config = prepareConfig(
        [{
          name: 'gulp1.png',
          width: 100,
        },{
          name: 'gulp2.png',
          width: 200,
        }]
      );

      assert.equal(config.length, 2);
      assert.equal(config[0].name, 'gulp1.png');
      assert.equal(config[0].width, 100);
      assert.equal(config[1].name, 'gulp2.png');
      assert.equal(config[1].width, 200);
    });
  });

  describe('global config', function () {

    it('should override default values', function () {
      var globalConfig = {
        crop: 'test',
        embed: 'test',
        min: 'test',
        max: 'test',
        withoutEnlargement: 'test',
        skipOnEnlargement: 'test',
        ignoreAspectRatio: 'test',
        kernel: 'test',
        extractBeforeResize: 'test',
        extractAfterResize: 'test',
        background: 'test',
        flatten: 'test',
        negate: 'test',
        rotate: 'test',
        flip: 'test',
        flop: 'test',
        blur: 'test',
        sharpen: 'test',
        threshold: 'test',
        gamma: 'test',
        grayscale: 'test',
        normalize: 'test',
        quality: 'test',
        progressive: 'test',
        withMetadata: 'test',
        tile: 'test',
        withoutChromaSubsampling: 'test',
        compressionLevel: 'test',
        format: 'test',
      };
      var config = prepareConfig([{
        name: 'gulp.png'
      }], globalConfig);

      assert.equal(config.length, 1);
      assert.equal(config[0].name, 'gulp.png');
      assert.equal(config[0].crop, 'test');
      assert.equal(config[0].embed, 'test');
      assert.equal(config[0].min, 'test');
      assert.equal(config[0].max, 'test');
      assert.equal(config[0].withoutEnlargement, 'test');
      assert.equal(config[0].skipOnEnlargement, 'test');
      assert.equal(config[0].ignoreAspectRatio, 'test');
      assert.equal(config[0].kernel, 'test');
      assert.equal(config[0].extractBeforeResize, 'test');
      assert.equal(config[0].extractAfterResize, 'test');
      assert.equal(config[0].background, 'test');
      assert.equal(config[0].flatten, 'test');
      assert.equal(config[0].negate, 'test');
      assert.equal(config[0].rotate, 'test');
      assert.equal(config[0].flip, 'test');
      assert.equal(config[0].flop, 'test');
      assert.equal(config[0].blur, 'test');
      assert.equal(config[0].sharpen, 'test');
      assert.equal(config[0].threshold, 'test');
      assert.equal(config[0].gamma, 'test');
      assert.equal(config[0].grayscale, 'test');
      assert.equal(config[0].normalize, 'test');
      assert.equal(config[0].quality, 'test');
      assert.equal(config[0].progressive, 'test');
      assert.equal(config[0].withMetadata, 'test');
      assert.equal(config[0].tile, 'test');
      assert.equal(config[0].withoutChromaSubsampling, 'test');
      assert.equal(config[0].compressionLevel, 'test');
      assert.equal(config[0].format, 'test');
    });

    it('should not override values specified per file', function () {
      var globalConfig = {
        crop: 'global',
        embed: 'global',
        min: 'global',
        max: 'global',
        withoutEnlargement: 'global',
        skipOnEnlargement: 'global',
        ignoreAspectRatio: 'global',
        kernel: 'global',
        extractBeforeResize: 'global',
        extractAfterResize: 'global',
        background: 'global',
        flatten: 'global',
        negate: 'global',
        rotate: 'global',
        flip: 'global',
        flop: 'global',
        blur: 'global',
        sharpen: 'global',
        threshold: 'global',
        gamma: 'global',
        grayscale: 'global',
        normalize: 'global',
        quality: 'global',
        progressive: 'global',
        withMetadata: 'global',
        tile: 'global',
        withoutChromaSubsampling: 'global',
        compressionLevel: 'global',
        format: 'global',
      };
      var config = prepareConfig([{
        name: 'gulp.png',
        width: 100,
        crop: 'test',
        embed: 'test',
        min: 'test',
        max: 'test',
        withoutEnlargement: 'test',
        skipOnEnlargement: 'test',
        ignoreAspectRatio: 'test',
        kernel: 'test',
        extractBeforeResize: 'test',
        extractAfterResize: 'test',
        background: 'test',
        flatten: 'test',
        negate: 'test',
        rotate: 'test',
        flip: 'test',
        flop: 'test',
        blur: 'test',
        sharpen: 'test',
        threshold: 'test',
        gamma: 'test',
        grayscale: 'test',
        normalize: 'test',
        quality: 'test',
        progressive: 'test',
        withMetadata: 'test',
        tile: 'test',
        withoutChromaSubsampling: 'test',
        compressionLevel: 'test',
        format: 'test',
      }], globalConfig);

      assert.equal(config.length, 1);
      assert.equal(config[0].name, 'gulp.png');
      assert.equal(config[0].crop, 'test');
      assert.equal(config[0].embed, 'test');
      assert.equal(config[0].min, 'test');
      assert.equal(config[0].max, 'test');
      assert.equal(config[0].withoutEnlargement, 'test');
      assert.equal(config[0].skipOnEnlargement, 'test');
      assert.equal(config[0].ignoreAspectRatio, 'test');
      assert.equal(config[0].kernel, 'test');
      assert.equal(config[0].extractBeforeResize, 'test');
      assert.equal(config[0].extractAfterResize, 'test');
      assert.equal(config[0].background, 'test');
      assert.equal(config[0].flatten, 'test');
      assert.equal(config[0].negate, 'test');
      assert.equal(config[0].rotate, 'test');
      assert.equal(config[0].flip, 'test');
      assert.equal(config[0].flop, 'test');
      assert.equal(config[0].blur, 'test');
      assert.equal(config[0].sharpen, 'test');
      assert.equal(config[0].threshold, 'test');
      assert.equal(config[0].gamma, 'test');
      assert.equal(config[0].grayscale, 'test');
      assert.equal(config[0].normalize, 'test');
      assert.equal(config[0].quality, 'test');
      assert.equal(config[0].progressive, 'test');
      assert.equal(config[0].withMetadata, 'test');
      assert.equal(config[0].tile, 'test');
      assert.equal(config[0].withoutChromaSubsampling, 'test');
      assert.equal(config[0].compressionLevel, 'test');
      assert.equal(config[0].format, 'test');
    });
  });
});
