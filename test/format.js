/* global describe, it */

'use strict'

const assert = require('assert')

const responsive = require('../')

const helpers = require('./helpers')
const makeFile = helpers.makeFile
const assertFile = helpers.assertFile

const fileType = require('file-type')

describe('gulp-responsive', function () {
  describe('image format', function () {
    it('should convert image type to specified by `format` option', function (done) {
      const config = [
        {
          name: 'gulp.png',
          format: 'jpeg'
        }
      ]
      const stream = responsive(config)

      stream.on('data', function (file) {
        assertFile(file)
        assert.strictEqual(fileType(file.contents).mime, 'image/jpeg')
      })

      stream.on('end', function () {
        done()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
    })

    it('should convert image type to format parsed from output image name', function (done) {
      const config = [
        {
          name: 'gulp.png',
          rename: 'gulp.jpg'
        }
      ]
      const stream = responsive(config)

      stream.on('data', function (file) {
        assertFile(file)
        assert.strictEqual(fileType(file.contents).mime, 'image/jpeg')
      })

      stream.on('end', function () {
        done()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
    })

    it('should convert image type to specified by `format` option with custom extension', function (done) {
      const config = [
        {
          name: 'gulp.png',
          format: 'webp',
          rename: 'gulp.custom-jpg'
        }
      ]
      const stream = responsive(config)

      stream.on('data', function (file) {
        assertFile(file)
        assert.strictEqual(fileType(file.contents).mime, 'image/webp')
      })

      stream.on('end', function () {
        done()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
    })

    it('should convert image type to multiple specified by `format` option', function (done) {
      const config = [
        {
          name: 'gulp.png',
          format: ['jpg', 'webp']
        }
      ]
      const stream = responsive(config)
      let counter = 0

      stream.on('data', function (file) {
        counter++

        assertFile(file)
        if (counter > 2) {
          throw new Error('more than one file is provided')
        }
      })

      stream.on('end', function () {
        done()
      })

      stream.write(makeFile('gulp.png'))
      stream.end()
    })
  })
})
