/*global describe, it */

'use strict';

var assert = require('assert');
var path = require('path');

var responsive = require('../');

var helpers = require('./helpers');
var makeFile = helpers.makeFile;
var assertFile = helpers.assertFile;

describe('gulp-responsive', function () {

  it('should not do anything without images and configs', function (cb) {
    var stream = responsive();

    stream.on('end', cb);
    stream.on('data', function () {
      throw new Error('data should not be provided');
    });

    stream.end();
  });

  it('should provide one image when exactly one image and one config are provided', function (cb) {
    var config = [{
      name: 'gulp.png'
    }];
    var stream = responsive(config);

    var counter = 0;

    stream.on('data', function (file) {
      counter++;
      assertFile(file);
      if (counter > 1) {
        throw new Error('more than one file is provided');
      }
    });

    stream.on('end', function () {
      assert.equal(counter, 1);
      cb();
    });

    stream.write(makeFile('gulp.png'));
    stream.end();
  });


    it('should support source file in SVG format', function (cb) {
      var config = [{
        name: 'gulp.svg',
        format: 'png'
      }];
      var stream = responsive(config);

      var counter = 0;

      stream.on('data', function (file) {
        counter++;
        assertFile(file);
        if (counter > 1) {
          throw new Error('more than one file is provided');
        }
      });

      stream.on('end', function () {
        assert.equal(counter, 1);
        cb();
      });

      stream.write(makeFile('gulp.svg'));
      stream.end();
    });

  it('should provide two image when one image and exactly two configs are provided', function (cb) {
    var config = [{
      name: 'gulp.png'
    },{
      name: 'gulp.png'
    }];
    var stream = responsive(config);

    var counter = 0;

    stream.on('data', function (file) {
      counter++;
      assertFile(file);
      if (counter > 2) {
        throw new Error('more than two files are provided');
      }
    });

    stream.on('end', function () {
      assert.equal(counter, 2);
      cb();
    });

    stream.write(makeFile('gulp.png'));
    stream.end();
  });

  it('should provide two image when one image match two configs', function (cb) {
    var config = [{
      name: 'gulp.png'
    },{
      name: '*.png'
    }];
    var stream = responsive(config);

    var counter = 0;

    stream.on('data', function (file) {
      counter++;
      assertFile(file);
      if (counter > 2) {
        throw new Error('more than two files are provided');
      }
    });

    stream.on('end', function () {
      assert.equal(counter, 2);
      cb();
    });

    stream.write(makeFile('gulp.png'));
    stream.end();
  });

  describe('rename image', function () {

    it('should provide renamed image when rename is string', function (cb) {
      var config = [{
        name: 'gulp.png',
        rename: 'test.png'
      }];
      var stream = responsive(config);

      stream.on('data', function (file) {
        assertFile(file);
        assert.equal(file.path, path.join(__dirname, '/fixtures/', 'test.png'));
      });

      stream.on('end', function () {
        cb();
      });

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

    it('should provide renamed image when rename is object', function (cb) {
      var config = [{
        name: 'gulp.png',
        rename: {
          suffix: '-renamed'
        }
      }];
      var stream = responsive(config);

      stream.on('data', function (file) {
        assertFile(file);
        assert.equal(file.path, path.join(__dirname, '/fixtures/', 'gulp-renamed.png'));
      });

      stream.on('end', function () {
        cb();
      });

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

    it('should provide renamed image when rename is function', function (cb) {
      var config = [{
        name: 'gulp.png',
        rename: function (path) {
          path.basename += '-renamed-by-function';
          return path;
        }
      }];
      var stream = responsive(config);

      stream.on('data', function (file) {
        assertFile(file);
        assert.equal(file.path, path.join(__dirname, '/fixtures/', 'gulp-renamed-by-function.png'));
      });

      stream.on('end', function () {
        cb();
      });

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

  });

  describe('unmatched/unused images', function () {

    it('should not pass through unmatched file by default when `errorOnUnusedImage` is false', function (cb) {
      var stream = responsive({}, {
        errorOnUnusedImage: false
      });

      var counter = 0;

      stream.on('data', function () {
        counter++;
      });

      stream.on('end', function () {
        assert.equal(counter, 0);
        cb();
      });

      stream.write(makeFile('gulp.png'));
      stream.end();
    });

    it('should pass through unmatched file when `passThroughUnused` is true and `errorOnUnusedImage` is false', function (cb) {
      var expectedFile = makeFile('gulp.png');

      var stream = responsive({}, {
        errorOnUnusedImage: false,
        passThroughUnused: true
      });

      var counter = 0;

      stream.on('data', function (file) {
        counter++;
        if (counter > 1) {
          throw new Error('more than two files are provided');
        }
        assertFile(file);
        assert.deepEqual(file, expectedFile);
      });

      stream.on('end', function () {
        assert.equal(counter, 1);
        cb();
      });

      stream.write(expectedFile);
      stream.end();
    });

    it('should skip enlarged image when `skipOnEnlargement` is true', function (cb){
      var config = [{
        name: 'gulp.png',
        width: 10000
      }];

      var stream = responsive(config, {
        errorOnEnlargement: false,
        skipOnEnlargement: true
      });

      stream.on('data', function () {
        throw new Error('enlarged image not been skipped');
      });

      stream.on('end', function () {
        cb();
      });

      stream.write(makeFile('gulp.png'));
      stream.end();
    });
  });
});
