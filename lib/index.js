'use strict';

var gutil = require('gulp-util');
var through2 = require('through2');
var minimatch = require('minimatch');
var sharp = require('sharp');
var path = require('path');
var async = require('async')

var PLUGIN_NAME = 'gulp-responsive'

function modify(file, config, strict, cb) {
  var image = sharp(file.contents);

  image.metadata(function(err, metadata) {
    if (err) {
      return cb(err);
    }

    if (config.width || config.height) {
      if (strict && config.withoutEnlargement && (config.width > metadata.width || config.height > metadata.height)) {
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

    if (config.withoutEnlargement === false) {
      image.withoutEnlargement(config.withoutEnlargement);
    }

    image.toBuffer(function(err, buf) {
      if (err) {
        return cb(err);
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
}

function gulpResponsive(config, options) {
  options = options || {strictMatchConfig: true, strictMatchImages: true};
  config = config || [];

  return through2.obj(function (file, enc, done) {
      var that = this;

      if (file.isNull()) {
        this.push(file);
        return done();
      }

      if (file.isStream()) {
        return done(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      }

      var matched = config.filter(function(conf) {
        return minimatch(file.relative, conf.name);
      });

      if (options.strictMatchImages && matched.length == 0) {
        var message = 'Image does not match any config: ' + file.relative;
        return done(new gutil.PluginError(PLUGIN_NAME, message));
      }

      async.each(matched, function(conf, cb) {
        // config item matched (can be matched multiple times)
        conf.mathed = true;

        modify(file, conf, options, function(err, newFile) {
          if (err) {
            return cb(err);
          }
          that.push(newFile);
          cb();
        });
      }, done);
    }, function(cb) {
      if (options.strictMatchConfig) {

        var notMatched = config.filter(function(conf) {
          return !conf.mathed;
        });

        if (notMatched.length > 0) {
          var message = 'Available images do not match following config:';
          notMatched.forEach(function(conf) {
            message += '\n  - `' + conf.name + '`';
          });
          return cb(new gutil.PluginError(PLUGIN_NAME, message));
        }
      }
      cb();
    }
  );
}

module.exports = gulpResponsive;
