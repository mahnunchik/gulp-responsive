'use strict'

const chalk = require('chalk')
const flog = require('fancy-log')
const through2 = require('through2')
const minimatch = require('minimatch')
const PluginError = require('plugin-error')
const _ = require('lodash')
const plur = require('plur')

const sharpVinyl = require('./sharp')
const prepareConfig = require('./config')

const PLUGIN_NAME = require('../package.json').name

function gulpResponsive (config, options) {
  const statistics = {
    total: 0,
    matched: 0,
    created: 0,
    unmatched: 0,
    unmatchedBlocked: 0,
    unmatchedPassed: 0
  }

  options = _.defaults({}, options, {
    errorOnUnusedConfig: true,
    errorOnUnusedImage: true,
    errorOnEnlargement: true,
    passThroughUnused: false,
    silent: false,
    stats: true
  })

  config = prepareConfig(config || [], options)

  return through2.obj(
    function (file, enc, done) {
      const that = this

      if (file.isNull()) {
        this.push(file)
        return done()
      }

      if (file.isStream()) {
        return done(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
      }

      statistics.total++
      const matched = config.filter(function (conf) {
        return minimatch(file.relative, conf.name)
      })

      if (matched.length === 0) {
        statistics.unmatched++
        const message =
          'File `' + file.relative + '`: Image does not match any config'
        if (options.errorOnUnusedImage) {
          return done(new PluginError(PLUGIN_NAME, message))
        } else if (options.passThroughUnused) {
          this.push(file)
          statistics.unmatchedPassed++
          if (!options.silent) {
            flog(
              PLUGIN_NAME + ': (pass through without changes)',
              chalk.magenta(message)
            )
          }
          return done()
        }
        statistics.unmatchedBlocked++
        if (!options.silent) {
          flog(PLUGIN_NAME + ': (skip for processing)', chalk.magenta(message))
        }
        return done()
      }

      statistics.matched++

      const allPromises = []

      matched.forEach(conf => {
        // config item matched (can be matched multiple times)
        conf.matched = true
        allPromises.push(sharpVinyl(file, conf, options))
      })

      Promise.all(allPromises)
        .then(result => {
          result.forEach(newFile => {
            if (newFile) {
              that.push(newFile)
              statistics.created++
            }
          })
          done()
        })
        .catch(reason => {
          return done(reason)
        })
    },
    function (cb) {
      const notMatched = config.filter(function (conf) {
        return !conf.matched
      })

      if (options.stats && !(options.silent && statistics.created === 0)) {
        const msg =
          'Created ' +
          statistics.created +
          ' ' +
          plur('image', statistics.created) +
          chalk.dim.white(
            ' (matched ' +
              statistics.matched +
              ' of ' +
              statistics.total +
              ' ' +
              plur('image', statistics.total) +
              ')'
          )

        flog(PLUGIN_NAME + ':', chalk.green(msg))
      }

      if (
        notMatched.length > 0 &&
        (!options.silent || options.errorOnUnusedConfig)
      ) {
        let message = 'Available images do not match the following config:'
        notMatched.forEach(function (conf) {
          message += '\n  - `' + conf.name + '`'
        })
        if (options.errorOnUnusedConfig) {
          return cb(new PluginError(PLUGIN_NAME, message))
        } else {
          flog(PLUGIN_NAME + ':', chalk.magenta(message))
        }
      }
      cb()
    }
  )
}

module.exports = gulpResponsive
