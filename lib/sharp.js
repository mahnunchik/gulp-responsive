'use strict'

const sharp = require('sharp')
const chalk = require('chalk')
const flog = require('fancy-log')
const path = require('path')
const PluginError = require('plugin-error')
const rename = require('rename')
const Vinyl = require('vinyl')
const size = require('./size')
const format = require('./format')

const PLUGIN_NAME = require('../package.json').name

module.exports = async function sharpVinyl (file, config, options) {
  const errPrefix = 'File `' + file.relative + '`: '
  const image = sharp(file.contents)

  try {
    const metadata = await image.metadata()
    let extract, toFormat

    let filePath = file.path
    if (config.rename) {
      filePath = path.join(file.base, rename(file.relative, config.rename))
    }

    const width = size(config.width, metadata.width)
    const height = size(config.height, metadata.height)

    if (width || height) {
      if (
        config.withoutEnlargement &&
        (width > metadata.width || height > metadata.height)
      ) {
        let message = errPrefix + 'Image enlargement is detected'
        if (width) {
          message +=
            '\n  real width: ' +
            metadata.width +
            'px, required width: ' +
            width +
            'px'
        }
        if (height) {
          message +=
            '\n  real height: ' +
            metadata.height +
            'px, required height: ' +
            height +
            'px'
        }
        if (options.errorOnEnlargement) {
          throw new PluginError(PLUGIN_NAME, message)
        } else if (config.skipOnEnlargement) {
          if (!options.silent) {
            flog(PLUGIN_NAME + ': (skip for processing)', chalk.red(message))
          }
          // passing a null file to the callback stops a new image being added to the pipeline for this config
          return null
        }
        if (!options.silent) {
          flog(PLUGIN_NAME + ': (skip for enlargement)', chalk.yellow(message))
        }
      }
    }

    if (config.extractBeforeResize) {
      extract = config.extractBeforeResize
      image.extract(extract)
    }

    image.resize(width, height, {
      background: config.background,
      kernel: config.kernel,
      withoutEnlargement: config.withoutEnlargement
    })

    if (config.extractAfterResize) {
      extract = config.extractAfterResize
      image.extract(extract)
    }

    if (config.crop !== false) {
      if (config.crop === 'entropy') {
        image.crop(sharp.strategy.entropy)
      } else if (config.crop === 'attention') {
        image.crop(sharp.strategy.attention)
      } else {
        image.crop(config.crop)
      }
    }

    if (config.embed) {
      image.embed()
    }

    if (config.max) {
      image.max()
    }

    if (config.flatten) {
      image.flatten({
        background: config.background
      })
    }

    image.negate(config.negate)

    if (config.trim) {
      image.trim(config.trim)
    }

    if (config.min) {
      image.min()
    }

    if (config.ignoreAspectRatio) {
      image.ignoreAspectRatio()
    }

    image.flatten(config.flatten)
    image.negate(config.negate)

    if (config.rotate !== false) {
      if (typeof config.rotate === 'boolean') {
        image.rotate()
      } else {
        image.rotate(config.rotate)
      }
    }

    image.flip(config.flip)
    image.flop(config.flop)
    image.blur(config.blur)

    if (typeof config.sharpen === 'boolean') {
      image.sharpen(config.sharpen)
    } else {
      image.sharpen(
        config.sharpen.sigma,
        config.sharpen.flat,
        config.sharpen.jagged
      )
    }

    image.threshold(config.threshold)

    if (config.gamma !== false) {
      if (typeof config.gamma === 'boolean') {
        image.gamma()
      } else {
        image.gamma(config.gamma)
      }
    }

    image.grayscale(config.grayscale)
    image.normalize(config.normalize)
    image.withMetadata(config.withMetadata)
    image.tile(config.tile)

    if (config.withoutChromaSubsampling) {
      config.chromaSubsampling = '4:4:4'
    }

    if (config.format) {
      toFormat = config.format
    } else {
      toFormat = format(filePath)
    }

    if (!Array.isArray(toFormat)) {
      toFormat = [toFormat]
    }

    const allOps = toFormat.map(async format => {
      const clone = convertImage(image, format, config)
      const buffer = await clone.toBuffer()

      const newFile = new Vinyl({
        cwd: file.cwd,
        base: file.base,
        path: filePath,
        contents: buffer
      })

      newFile.extname = '.' + format

      if (!options.silent) {
        flog(
          PLUGIN_NAME + ':',
          chalk.green(file.relative + ' -> ' + newFile.relative)
        )
      }

      return newFile
    })

    return Promise.all(allOps)
  } catch (error) {
    throw new PluginError(PLUGIN_NAME, errPrefix + error.message, { showStack: true })
  }
}

function convertImage (image, format, config) {
  const clone = image.clone()

  switch (format) {
    case 'jpeg':
    case 'jpg':
    case 'jpe':
      return clone.jpeg(config)
    case 'png':
    case 'webp':
    case 'tiff':
    default:
      return clone.toFormat(format, config)
  }
}
