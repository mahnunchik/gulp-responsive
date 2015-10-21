'use strict';

var sharp = require('sharp');
var gutil = require('gulp-util');
var path = require('path');
var rename = require('rename');
var size = require('./size');
var format = require('./format');

var PLUGIN_NAME = require('../package.json').name;

module.exports = function(file, config, options, cb) {
  var image = sharp(file.contents);

  image.metadata(function(err, metadata) {
    if (err) {
      return cb(new gutil.PluginError(PLUGIN_NAME, err));
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
      return cb(new gutil.PluginError(PLUGIN_NAME, err));
    }

    if (width || height) {
      if (config.withoutEnlargement && (width > metadata.width || height > metadata.height)) {
        if (options.errorOnEnlargement) {
          var message = 'Image must not be enlarged: ' + file.relative;
          if (width) {
            message += '\nreal width: ' + metadata.width + 'px, required width: ' + width + 'px';
          }
          if (height) {
            message += '\nreal height: ' + metadata.height + 'px, required height: ' + height + 'px';
          }
          return cb(new gutil.PluginError(PLUGIN_NAME, message));
        } else if (config.skipOnEnlargement) {
          // passing a null file to the callback stops a new image being added to the pipeline for this config
          return cb(null, null);
        }
      }
    }

    try {
      if (config.extractBeforeResize) {
        extract = config.extractBeforeResize;
        image.extract(extract.top, extract.left, extract.width, extract.height);
      }

      image.resize(width, height);

      if (config.extractAfterResize) {
        extract = config.extractAfterResize;
        image.extract(extract.top, extract.left, extract.width, extract.height);
      }

      if (config.crop !== false) {
        image.crop(config.crop);
      }

      if (config.embed) {
        image.embed();
      }

      if (config.max) {
        image.max();
      }

      if (config.min) {
        image.min();
      }

      if (config.ignoreAspectRatio) {
        image.ignoreAspectRatio();
      }

      image.withoutEnlargement(config.withoutEnlargement);
      image.interpolateWith(config.interpolation);
      image.background(config.background);
      image.flatten(config.flatten);

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
        image.sharpen(config.sharpen.radius, config.sharpen.flat, config.sharpen.jagged);
      }

      if (config.gamma !== false) {
        if (typeof config.gamma === 'boolean') {
          image.gamma();
        } else {
          image.gamma(config.gamma);
        }
      }

      image.grayscale(config.grayscale);
      image.normalize(config.normalize);
      image.quality(config.quality);
      image.progressive(config.progressive);
      image.withMetadata(config.withMetadata);

      if (config.tile) {
        image.tile(config.tile.size, config.tile.overlap);
      }

      image.withoutChromaSubsampling(config.withoutChromaSubsampling);
      image.compressionLevel(config.compressionLevel);

      image.toFormat(toFormat);

    } catch (err) {
      return cb(new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
    }

    image.toBuffer(function(err, buf) {
      if (err) {
        return cb(new gutil.PluginError(PLUGIN_NAME, err, {showStack: true}));
      }

      var newFile = new gutil.File({
        cwd: file.cwd,
        base: file.base,
        path: filePath,
        contents: buf
      });

      cb(null, newFile);
    });
  });
};
