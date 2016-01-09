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
    passThroughUnused: false
  });

  config = prepareConfig(config || [], options);

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
          var message = 'File `' + file.relative + '`: Image does not match any config';
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
