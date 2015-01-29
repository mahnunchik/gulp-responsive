'use strict';

var sharp = require('sharp');
var gutil = require('gulp-util');
var path = require('path');
var rename = require('rename');
var size = require('./size');

var PLUGIN_NAME = require('../package.json').name;

module.exports = function(file, config, options, cb) {
  var image = sharp(file.contents);

  image.metadata(function(err, metadata) {
    if (err) {
      return cb(new gutil.PluginError(PLUGIN_NAME, err));
    }

    var width, height;

    try {
      width = size(config.width, metadata.width);
      height = size(config.height, metadata.height);
    } catch  (err){
      return cb(new gutil.PluginError(PLUGIN_NAME, err));
    }

    if (width || height) {
      if (options.errorOnEnlargement && config.withoutEnlargement && (width > metadata.width || height > metadata.height)) {
        var message = 'Image must not be enlarged: ' + file.relative;
        if (width) {
          message += '\nreal width: ' + metadata.width + 'px, required width: ' + width + 'px';
        }
        if (height) {
          message += '\nreal height: ' + metadata.height + 'px, required height: ' + height + 'px';
        }
        return cb(new gutil.PluginError(PLUGIN_NAME, message));
      }

      image.resize(width, height);
    }

    if (options.background) {
      image.background(options.background);
    }

    if (options.embed) {
      image.embed();
    }

    if (options.max) {
      image.max();
    }

    image.flatten(config.flatten);

    image.withoutEnlargement(config.withoutEnlargement);

    try {
      image.quality(config.quality);
    } catch (err) {
      return cb(new gutil.PluginError(PLUGIN_NAME, err));
    }

    image.progressive(config.progressive);

    image.withMetadata(config.withMetadata);

    try {
      image.compressionLevel(config.compressionLevel);
    } catch (err) {
      return cb(new gutil.PluginError(PLUGIN_NAME, err));
    }

    image.toBuffer(function(err, buf) {
      if (err) {
        return cb(new gutil.PluginError(PLUGIN_NAME, err));
      }

      var filePath = file.path;
      if (config.rename) {
        filePath = path.join(file.base, rename(file.relative, config.rename));
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
