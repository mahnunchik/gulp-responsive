/* global describe, it */

'use strict'

const responsive = require('../')

const helpers = require('./helpers')
const makeFile = helpers.makeFile
const assertFile = helpers.assertFile

describe('gulp-responsive', function () {
  function runTest (config, cb) {
    const stream = responsive(config)
    stream.on('end', function () {
      cb()
    })
    stream.on('data', function (file) {
      assertFile(file)
    })
    stream.write(makeFile('gulp.png'))
    stream.end()
  }

  it('should let you extract before resize', function (cb) {
    const config = [
      {
        name: 'gulp.png',
        extractBeforeResize: { top: 0, left: 0, width: 10, height: 10 }
      }
    ]
    runTest(config, cb)
  })
  it('should let you extract after resize', function (cb) {
    const config = [
      {
        name: 'gulp.png',
        extractAfterResize: { top: 0, left: 0, width: 10, height: 10 }
      }
    ]
    runTest(config, cb)
  })
})
