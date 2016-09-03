/*global describe, it */

'use strict';

var assert = require('assert');
var size = require('../lib/size');
var _ = require('lodash');

describe('gulp-responsive', function() {

  describe('size parser', function () {

    it('should leave number unchanged', function() {
      var test = size(100);
      assert.equal(test, 100);
    });

    it('should leave null', function() {
      var test = size();
      assert(test === null);
    });

    it('should parse string as a number', function() {
      var test = size('100');
      assert.equal(test, 100);
      assert(_.isNumber(test));
    });

    it('should parse string in pixels as a number', function() {
      var test = size('100px');
      assert.equal(test, 100);
      assert(_.isNumber(test));
    });

    it('should recognize percentages and calculate size', function() {
      var test = size('10%', 900);
      assert.equal(test, 90);
      assert(_.isNumber(test));
    });

    it('should recognize percentages and calculate size (more then 100%)', function() {
      var test = size('200%', 900);
      assert.equal(test, 1800);
      assert(_.isNumber(test));
    });

    it('should throw an error on wrong input', function() {
      assert.throws(function() {
        size('wrong');
      }, /Wrong size/);
    });

    it('should throw an error on wrong percentage input', function() {
      assert.throws(function() {
        size('wrong%');
      }, /Wrong percentage size/);
    });
  });
});
