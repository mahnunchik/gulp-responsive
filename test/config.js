/* global describe, it */

'use strict'

var assert = require('assert')
var prepareConfig = require('../lib/config')

describe('gulp-responsive', function () {
  describe('config', function () {
    it('should set default values for unspecified config options', function () {
      var config = prepareConfig([
        {
          name: 'gulp.png'
        }
      ])

      assert.strictEqual(config.length, 1)
      assert.strictEqual(config[0].name, 'gulp.png')
      assert.strictEqual(config[0].crop, false)
      assert.strictEqual(config[0].embed, false)
      assert.strictEqual(config[0].min, false)
      assert.strictEqual(config[0].max, false)
      assert.strictEqual(config[0].withoutEnlargement, true)
      assert.strictEqual(config[0].skipOnEnlargement, false)
      assert.strictEqual(config[0].ignoreAspectRatio, false)
      assert.strictEqual(config[0].kernel, 'lanczos3')
      assert.strictEqual(config[0].extractBeforeResize, false)
      assert.strictEqual(config[0].extractAfterResize, false)
      assert.strictEqual(config[0].background, '#fff')
      assert.strictEqual(config[0].flatten, false)
      assert.strictEqual(config[0].negate, false)
      assert.strictEqual(config[0].rotate, false)
      assert.strictEqual(config[0].flip, false)
      assert.strictEqual(config[0].flop, false)
      assert.strictEqual(config[0].blur, false)
      assert.strictEqual(config[0].sharpen, false)
      assert.strictEqual(config[0].threshold, false)
      assert.strictEqual(config[0].gamma, false)
      assert.strictEqual(config[0].grayscale, false)
      assert.strictEqual(config[0].normalize, false)
      assert.strictEqual(config[0].quality, 80)
      assert.strictEqual(config[0].progressive, false)
      assert.strictEqual(config[0].withMetadata, false)
      assert.strictEqual(config[0].trim, false)
      assert.strictEqual(config[0].tile, false)
      assert.strictEqual(config[0].withoutChromaSubsampling, false)
      assert.strictEqual(config[0].compressionLevel, 6)
      assert.strictEqual(config[0].format, null)
    })

    it('should not override specified values', function () {
      var config = prepareConfig([
        {
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
          format: 'test'
        }
      ])

      assert.strictEqual(config.length, 1)
      assert.strictEqual(config[0].name, 'gulp.png')
      assert.strictEqual(config[0].crop, 'test')
      assert.strictEqual(config[0].embed, 'test')
      assert.strictEqual(config[0].min, 'test')
      assert.strictEqual(config[0].max, 'test')
      assert.strictEqual(config[0].withoutEnlargement, 'test')
      assert.strictEqual(config[0].skipOnEnlargement, 'test')
      assert.strictEqual(config[0].ignoreAspectRatio, 'test')
      assert.strictEqual(config[0].kernel, 'test')
      assert.strictEqual(config[0].extractBeforeResize, 'test')
      assert.strictEqual(config[0].extractAfterResize, 'test')
      assert.strictEqual(config[0].background, 'test')
      assert.strictEqual(config[0].flatten, 'test')
      assert.strictEqual(config[0].negate, 'test')
      assert.strictEqual(config[0].rotate, 'test')
      assert.strictEqual(config[0].flip, 'test')
      assert.strictEqual(config[0].flop, 'test')
      assert.strictEqual(config[0].blur, 'test')
      assert.strictEqual(config[0].sharpen, 'test')
      assert.strictEqual(config[0].threshold, 'test')
      assert.strictEqual(config[0].gamma, 'test')
      assert.strictEqual(config[0].grayscale, 'test')
      assert.strictEqual(config[0].normalize, 'test')
      assert.strictEqual(config[0].quality, 'test')
      assert.strictEqual(config[0].progressive, 'test')
      assert.strictEqual(config[0].withMetadata, 'test')
      assert.strictEqual(config[0].tile, 'test')
      assert.strictEqual(config[0].withoutChromaSubsampling, 'test')
      assert.strictEqual(config[0].compressionLevel, 'test')
      assert.strictEqual(config[0].format, 'test')
    })
  })

  describe('config parsing', function () {
    it('should parse config object', function () {
      var config = prepareConfig({
        'gulp.png': {
          width: 100
        }
      })

      assert.strictEqual(config.length, 1)
      assert.strictEqual(config[0].name, 'gulp.png')
    })

    it('should parse config object of arrays', function () {
      var config = prepareConfig({
        'gulp.png': [
          {
            width: 100
          },
          {
            width: 200
          }
        ]
      })

      assert.strictEqual(config.length, 2)
      assert.strictEqual(config[0].name, 'gulp.png')
      assert.strictEqual(config[0].width, 100)
      assert.strictEqual(config[1].name, 'gulp.png')
      assert.strictEqual(config[1].width, 200)
    })

    it('should leave config array as is', function () {
      var config = prepareConfig([
        {
          name: 'gulp1.png',
          width: 100
        },
        {
          name: 'gulp2.png',
          width: 200
        }
      ])

      assert.strictEqual(config.length, 2)
      assert.strictEqual(config[0].name, 'gulp1.png')
      assert.strictEqual(config[0].width, 100)
      assert.strictEqual(config[1].name, 'gulp2.png')
      assert.strictEqual(config[1].width, 200)
    })
  })

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
        format: 'test'
      }
      var config = prepareConfig(
        [
          {
            name: 'gulp.png'
          }
        ],
        globalConfig
      )

      assert.strictEqual(config.length, 1)
      assert.strictEqual(config[0].name, 'gulp.png')
      assert.strictEqual(config[0].crop, 'test')
      assert.strictEqual(config[0].embed, 'test')
      assert.strictEqual(config[0].min, 'test')
      assert.strictEqual(config[0].max, 'test')
      assert.strictEqual(config[0].withoutEnlargement, 'test')
      assert.strictEqual(config[0].skipOnEnlargement, 'test')
      assert.strictEqual(config[0].ignoreAspectRatio, 'test')
      assert.strictEqual(config[0].kernel, 'test')
      assert.strictEqual(config[0].extractBeforeResize, 'test')
      assert.strictEqual(config[0].extractAfterResize, 'test')
      assert.strictEqual(config[0].background, 'test')
      assert.strictEqual(config[0].flatten, 'test')
      assert.strictEqual(config[0].negate, 'test')
      assert.strictEqual(config[0].rotate, 'test')
      assert.strictEqual(config[0].flip, 'test')
      assert.strictEqual(config[0].flop, 'test')
      assert.strictEqual(config[0].blur, 'test')
      assert.strictEqual(config[0].sharpen, 'test')
      assert.strictEqual(config[0].threshold, 'test')
      assert.strictEqual(config[0].gamma, 'test')
      assert.strictEqual(config[0].grayscale, 'test')
      assert.strictEqual(config[0].normalize, 'test')
      assert.strictEqual(config[0].quality, 'test')
      assert.strictEqual(config[0].progressive, 'test')
      assert.strictEqual(config[0].withMetadata, 'test')
      assert.strictEqual(config[0].tile, 'test')
      assert.strictEqual(config[0].withoutChromaSubsampling, 'test')
      assert.strictEqual(config[0].compressionLevel, 'test')
      assert.strictEqual(config[0].format, 'test')
    })

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
        format: 'global'
      }
      var config = prepareConfig(
        [
          {
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
            format: 'test'
          }
        ],
        globalConfig
      )

      assert.strictEqual(config.length, 1)
      assert.strictEqual(config[0].name, 'gulp.png')
      assert.strictEqual(config[0].crop, 'test')
      assert.strictEqual(config[0].embed, 'test')
      assert.strictEqual(config[0].min, 'test')
      assert.strictEqual(config[0].max, 'test')
      assert.strictEqual(config[0].withoutEnlargement, 'test')
      assert.strictEqual(config[0].skipOnEnlargement, 'test')
      assert.strictEqual(config[0].ignoreAspectRatio, 'test')
      assert.strictEqual(config[0].kernel, 'test')
      assert.strictEqual(config[0].extractBeforeResize, 'test')
      assert.strictEqual(config[0].extractAfterResize, 'test')
      assert.strictEqual(config[0].background, 'test')
      assert.strictEqual(config[0].flatten, 'test')
      assert.strictEqual(config[0].negate, 'test')
      assert.strictEqual(config[0].rotate, 'test')
      assert.strictEqual(config[0].flip, 'test')
      assert.strictEqual(config[0].flop, 'test')
      assert.strictEqual(config[0].blur, 'test')
      assert.strictEqual(config[0].sharpen, 'test')
      assert.strictEqual(config[0].threshold, 'test')
      assert.strictEqual(config[0].gamma, 'test')
      assert.strictEqual(config[0].grayscale, 'test')
      assert.strictEqual(config[0].normalize, 'test')
      assert.strictEqual(config[0].quality, 'test')
      assert.strictEqual(config[0].progressive, 'test')
      assert.strictEqual(config[0].withMetadata, 'test')
      assert.strictEqual(config[0].tile, 'test')
      assert.strictEqual(config[0].withoutChromaSubsampling, 'test')
      assert.strictEqual(config[0].compressionLevel, 'test')
      assert.strictEqual(config[0].format, 'test')
    })
  })
})
