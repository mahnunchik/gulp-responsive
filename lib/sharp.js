'use strict';

var sharp = require('sharp');
var chalk = require('chalk');
var flog = require('fancy-log');
var path = require('path');
var PluginError = require('plugin-error');
var rename = require('rename');
var Vinyl = require('vinyl');
var size = require('./size');
var format = require('./format');

var PLUGIN_NAME = require('../package.json').name;

module.exports = function(file, config, options, cb) {
  var errPrefix = 'File `' + file.relative + '`: ';
  var image = sharp(file.contents);

  image.metadata(function(err, metadata) {
    if (err) {
      return cb(new PluginError(PLUGIN_NAME, errPrefix + err.message));
    }

    var width, height, extract, toFormat;

    var filePath = file.path;
    if (config.rename) {
      filePath = path.join(file.base, rename(file.relative, config.rename));
    }

    if (config.format) {
      toFormat = config.format;
    } else {
      toFormat = format(filePath);
    }

    try {
      width = size(config.width, metadata.width);
      height = size(config.height, metadata.height);
    } catch  (err){
      return cb(new PluginError(PLUGIN_NAME, errPrefix + err.message));
    }

    if (width || height) {
      if (config.withoutEnlargement && (width > metadata.width || height > metadata.height)) {
        var message = errPrefix + 'Image enlargement is detected';
        if (width) {
          message += '\n  real width: ' + metadata.width + 'px, required width: ' + width + 'px';
        }
        if (height) {
          message += '\n  real height: ' + metadata.height + 'px, required height: ' + height + 'px';
        }
        if (options.errorOnEnlargement) {
          return cb(new PluginError(PLUGIN_NAME, message));
        } else if (config.skipOnEnlargement) {
          if (!options.silent){
            flog(PLUGIN_NAME + ': (skip for processing)', chalk.red(message));
          }
          // passing a null file to the callback stops a new image being added to the pipeline for this config
          return cb(null, null);
        }
        if (!options.silent){
          flog(PLUGIN_NAME + ': (skip for enlargement)', chalk.yellow(message));
        }
      }
    }

    try {
      if (config.extractBeforeResize) {
        extract = config.extractBeforeResize;
        image.extract(extract);
      }

      if (config.interpolation) {
        config.interpolator = config.interpolation;
        flog(PLUGIN_NAME + ':', chalk.red('`interpolation` option is deprecated, use `interpolator` instead'));
      }

      image.resize(width, height, {
        interpolator: config.interpolator,
        kernel: config.kernel,
      });

      if (config.extractAfterResize) {
        extract = config.extractAfterResize;
        image.extract(extract);
      }

      if (config.crop !== false) {
        if (config.crop === 'entropy') {
          image.crop(sharp.strategy.entropy);
        } else if (config.crop === 'attention') {
          image.crop(sharp.strategy.attention);
        } else {
          image.crop(config.crop);
        }
      }

      if (config.embed) {
        image.embed();
      }

      if (config.max) {
        image.max();
      }

      if (config.trim) {
        image.trim(config.trim);
      }

      if (config.min) {
        image.min();
      }

      if (config.ignoreAspectRatio) {
        image.ignoreAspectRatio();
      }

      image.withoutEnlargement(config.withoutEnlargement);
      image.background(config.background);
      image.flatten(config.flatten);
      image.negate(config.negate);

      if (config.rotate !== false) {
        if (typeof config.rotate === 'boolean') {
          image.rotate();
        } else {
          image.rotate(config.rotate);
        }
      }

      image.flip(config.flip);
      image.flop(config.flop);
      image.blur(config.blur);

      if (typeof config.sharpen === 'boolean') {
        image.sharpen(config.sharpen);
      } else {
        image.sharpen(config.sharpen.sigma, config.sharpen.flat, config.sharpen.jagged);
      }

      image.threshold(config.threshold);

      if (config.gamma !== false) {
        if (typeof config.gamma === 'boolean') {
          image.gamma();
        } else {
          image.gamma(config.gamma);
        }
      }

      image.grayscale(config.grayscale);
      image.normalize(config.normalize);
      image.withMetadata(config.withMetadata);
      image.tile(config.tile);

      var outputOptions;
      switch (toFormat) {
        case 'jpeg':
          outputOptions = { quality: config.quality, progressive: config.progressive };
          if (config.withoutChromaSubsampling) {
            outputOptions.chromaSubsampling = '4.4.4';
          }
          image.jpeg(outputOptions);
          break;
        case 'png':
          outputOptions = { compressionLevel: config.compressionLevel, progressive: config.progressive };
          image.png(outputOptions);
          break;
        case 'webp':
          outputOptions = { quality: config.quality };
          image.webp(outputOptions);
          break;
        case 'tiff':
          outputOptions = { quality: config.quality };
          image.tiff(outputOptions);
          break;
        default:
          image.toFormat(format);
          break;
      }

    } catch (err) {
      err.message = errPrefix + err.message;
      return cb(new PluginError(PLUGIN_NAME, err, {showStack: true}));
    }

    image.toBuffer(function(err, buf) {
      if (err) {
        err.message = errPrefix + err.message;
        return cb(new PluginError(PLUGIN_NAME, err, {showStack: true}));
      }

      var newFile = new Vinyl({
        cwd: file.cwd,
        base: file.base,
        path: filePath,
        contents: buf
      });

      if (!options.silent){
        flog(PLUGIN_NAME + ':', chalk.green(file.relative + ' -> ' + newFile.relative));
      }

      cb(null, newFile);
    });
  });
};
