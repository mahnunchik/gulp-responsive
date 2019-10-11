/* global describe, it */

'use strict'

const assert = require('assert')
const size = require('../lib/size')
const _ = require('lodash')

describe('gulp-responsive', function () {
  describe('size parser', function () {
    it('should leave number unchanged', function () {
      const test = size(100)
      assert.strictEqual(test, 100)
    })

    it('should leave null', function () {
      const test = size()
      assert(test === null)
    })

    it('should parse string as a number', function () {
      const test = size('100')
      assert.strictEqual(test, 100)
      assert(_.isNumber(test))
    })

    it('should parse string in pixels as a number', function () {
      const test = size('100px')
      assert.strictEqual(test, 100)
      assert(_.isNumber(test))
    })

    it('should recognize percentages and calculate size', function () {
      const test = size('10%', 900)
      assert.strictEqual(test, 90)
      assert(_.isNumber(test))
    })

    it('should recognize percentages and calculate size (more then 100%)', function () {
      const test = size('200%', 900)
      assert.strictEqual(test, 1800)
      assert(_.isNumber(test))
    })

    it('should throw an error on wrong input', function () {
      assert.throws(function () {
        size('wrong')
      }, /Wrong size/)
    })

    it('should throw an error on wrong percentage input', function () {
      assert.throws(function () {
        size('wrong%')
      }, /Wrong percentage size/)
    })
  })
})
