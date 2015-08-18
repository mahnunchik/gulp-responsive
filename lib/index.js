'use strict';

var gutil = require('gulp-util');
var through2 = require('through2');
var minimatch = require('minimatch');
var async = require('async');
var _ = require('lodash');

var sharpVinyl = require('./sharp');
var prepareConfig = require('./config');

var PLUGIN_NAME = require('../package.json').name;



function gulpResponsive(config, options) {

  options = _.defaults({}, options, {
    errorOnUnusedConfig: true,
    errorOnUnusedImage: true,
    errorOnEnlargement: true,
    passThroughUnused: false,
    skipOnEnlargement: false
  });

  var notice;
  if (options.strictMatchConfig !== undefined) {
    notice = '`strictMatchConfig` is deprecated and will be removed soon, ' +
      'use `errorOnUnusedConfig` instead';
    gutil.log(notice);
    options.errorOnUnusedConfig = options.strictMatchConfig;
  }
  if (options.strictMatchImages !== undefined) {
    notice = '`strictMatchImages` is deprecated and will be removed soon, ' +
      'use `errorOnUnusedImage` instead';
    gutil.log(notice);
    options.errorOnUnusedImage = options.strictMatchImages;
  }

  var globalConfig = _.pick(options,
    'withoutEnlargement',
    'skipOnEnlargement',
    'quality',
    'progressive',
    'withMetadata',
    'compressionLevel',
    'max'
  );

  config = prepareConfig(config || [], globalConfig);

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

      if (matched.length === 0) {
        if (options.errorOnUnusedImage) {
          var message = 'Image does not match any config: ' + file.relative;
          return done(new gutil.PluginError(PLUGIN_NAME, message));
        } else if (options.passThroughUnused) {
          this.push(file);
          return done();
        }
      }

      async.each(matched, function(conf, cb) {
        // config item matched (can be matched multiple times)
        conf.mathed = true;

        sharpVinyl(file, conf, options, function(err, newFile) {
          if (err) {
            return cb(err);
          }
          if (newFile) {
            that.push(newFile);
          }
          cb();
        });
      }, done);
    }, function(cb) {
      if (options.errorOnUnusedConfig) {

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
