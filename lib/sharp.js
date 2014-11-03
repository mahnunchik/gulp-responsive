'use strict';

var sharp = require('sharp');
var gutil = require('gulp-util');
var path = require('path');

var PLUGIN_NAME = require('../package.json').name;

module.exports = function(file, config, options, cb) {
  var image = sharp(file.contents);

  image.metadata(function(err, metadata) {
    if (err) {
      return cb(new gutil.PluginError(PLUGIN_NAME, err));
    }

    if (config.width || config.height) {
      if (options.errorOnEnlargement && config.withoutEnlargement && (config.width > metadata.width || config.height > metadata.height)) {
        var message = 'Image must not be enlarged: ' + file.relative;
        if (config.width) {
          message += '\nreal width: ' + metadata.width + 'px, required width: ' + config.width + 'px';
        }
        if (config.height) {
          message += '\nreal height: ' + metadata.height + 'px, required height: ' + config.height + 'px';
        }
        return cb(new gutil.PluginError(PLUGIN_NAME, message));
      }

      image.resize(config.width, config.height);
    }

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
        filePath = path.join(file.base, config.rename);
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
