/*global describe, it */

'use strict';

var assert = require('assert');

var responsive = require('../');

var helpers = require('./helpers');
var makeFile = helpers.makeFile;
var assertFile = helpers.assertFile;

var fileType = require('file-type');

describe('gulp-responsive', function () {
  describe('image format', function () {
    it('should convert image type to specified by `format` option', function (done) {
      var config = [{
        name: 'gulp.png',
        format: 'jpeg',
      }];
      var stream = responsive(config);

      stream.on('data', function (file) {
        assertFile(file);
        assert.equal(fileType(file.contents).mime, 'image/jpeg');
      });

      stream.on('end', function () {
        done();
      });

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

    it('should convert image type to format parsed from output image name', function (done) {
      var config = [{
        name: 'gulp.png',
        rename: 'gulp.jpg',
      }];
      var stream = responsive(config);

      stream.on('data', function (file) {
        assertFile(file);
        assert.equal(fileType(file.contents).mime, 'image/jpeg');
      });

      stream.on('end', function () {
        done();
      });

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

    it('should convert image type to specified by `format` option with custom extension', function (done) {
      var config = [{
        name: 'gulp.png',
        format: 'webp',
        rename: 'gulp.custom-jpg',
      }];
      var stream = responsive(config);

      stream.on('data', function (file) {
        assertFile(file);
        assert.equal(fileType(file.contents).mime, 'image/webp');
      });

      stream.on('end', function () {
        done();
      });

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

    it('should convert image type to multiple specified by `format` option', function (done) {
      var config = [{
        name: 'gulp.png',
        format: ['jpg','webp'],
      }];
      var stream = responsive(config);
      var counter = 0;

      stream.on('data', function (file) {
        counter++;
        assertFile(file);
        if (counter > 2) {
          throw new Error('more than one file is provided');
        }
      });

      stream.on('end', function () {
        done();
      });

      stream.write(makeFile('gulp.png'));
      stream.end();
    });
  });
});
