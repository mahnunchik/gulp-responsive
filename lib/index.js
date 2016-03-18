'use strict';

var gutil = require('gulp-util');
var through2 = require('through2');
var minimatch = require('minimatch');
var async = require('async');
var _ = require('lodash');
var plur = require('plur');

var sharpVinyl = require('./sharp');
var prepareConfig = require('./config');

var PLUGIN_NAME = require('../package.json').name;



function gulpResponsive(config, options) {

  var statistics = {
    total: 0,
    matched: 0,
    created: 0,
    unmatched: 0,
    unmatchedBlocked: 0,
    unmatchedPassed: 0
  };

  options = _.defaults({}, options, {
    errorOnUnusedConfig: true,
    errorOnUnusedImage: true,
    errorOnEnlargement: true,
    passThroughUnused: false,
    silent: false,
    stats: true
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

      statistics.total++;
      var matched = config.filter(function(conf) {
        return minimatch(file.relative, conf.name);
      });

      if (matched.length === 0) {
        statistics.unmatched++;
        var message = 'File `' + file.relative + '`: Image does not match any config';
        if (options.errorOnUnusedImage) {
          return done(new gutil.PluginError(PLUGIN_NAME, message));
        } else if (options.passThroughUnused) {
          this.push(file);
          statistics.unmatchedPassed++;
          if (!options.silent){
            gutil.log(PLUGIN_NAME + ': (pass through without changes)', gutil.colors.magenta(message));
          }
          return done();
        }
        statistics.unmatchedBlocked++;
        if (!options.silent){
          gutil.log(PLUGIN_NAME + ': (skip for processing)', gutil.colors.magenta(message));
        }
        return done();
      }

      statistics.matched++;
      async.each(matched, function(conf, cb) {
        // config item matched (can be matched multiple times)
        conf.mathed = true;

        sharpVinyl(file, conf, options, function(err, newFile) {
          if (err) {
            return cb(err);
          }
          if (newFile) {
            that.push(newFile);
            statistics.created++;
          }
          cb();
        });
      }, done);
    }, function(cb) {
      var notMatched = config.filter(function(conf) {
        return !conf.mathed;
      });

      if (options.stats && !(options.silent && statistics.created === 0)){
        var msg =
          'Created ' + statistics.created + ' ' + plur('image', statistics.created) +
          gutil.colors.dim.white(' (matched ' + statistics.matched + ' of ' +
          statistics.total + ' ' + plur('image', statistics.total) + ')');

        gutil.log(PLUGIN_NAME + ':', gutil.colors.green(msg));
      }

      if (notMatched.length > 0 && (!options.silent || options.errorOnUnusedConfig)) {
        var message = 'Available images do not match the following config:';
        notMatched.forEach(function(conf) {
          message += '\n  - `' + conf.name + '`';
        });
        if (options.errorOnUnusedConfig) {
          return cb(new gutil.PluginError(PLUGIN_NAME, message));
        } else {
          gutil.log(PLUGIN_NAME + ':', gutil.colors.magenta(message));
        }
      }
      cb();
    }
  );
}

module.exports = gulpResponsive;
