/*jshint -W083 */
'use strict';

var util = require('util');
var _ = require('lodash');

/*
Configuration unit is an object:

* name: String - filename glob pattern
* width: Number - not set by default
* height: Number - not set by default
* withoutEnlargement: Boolean - default true
* skipOnEnlargement: Boolean - default false
* rename: String - new file name, file will not be renamed by dafault

Configuration can be provided in one of the following formats:

1. Array of unique configurations

[{
  name: 'logo.png',
  width: 200,
  height: 100
},{
  name: 'banner.png',
  width: 500
}]

2. Object of unique configurations. Keys are names of files.

{
  'logo.png': {
    width: 300,
    height: 200,
    raname: 'logo@2x.png'
  },
  'background-*.png': {
    width: 1400,
    withoutEnlargement: true
  }
}

3. Object of array of unique configurations. Keys are names of files.

{
  'logo.png': [{
      width: 200,
      raname: 'logo@1x.png'
    },{
      width: 400,
      rename: 'logo@2x.png'
    }],
  'background-*': [{
    height: 400
  }]
}

*/

var defaultConfig = {
  crop: false,
  embed: false,
  min: false,
  max: false,
  withoutEnlargement: true,
  skipOnEnlargement: false,
  ignoreAspectRatio: false,
  interpolation: 'bicubic',
  extractBeforeResize: false,
  extractAfterResize: false,
  background: '#fff',
  flatten: false,
  negate: false,
  rotate: false,
  flip: false,
  flop: false,
  blur: false,
  sharpen: false,
  threshold: false,
  gamma: false,
  grayscale: false,
  normalize: false,
  quality: 80,
  progressive: false,
  withMetadata: false,
  tile: false,
  withoutChromaSubsampling: false,
  compressionLevel: 6,
  format: null
};

function prepareConfig(config, globalConfig) {
  var preparedConfig = [];

  if (!util.isArray(config)) {
    for (var name in config) {
      if (config.hasOwnProperty(name)) {
        if (util.isArray(config[name])) {
          config[name].forEach(function(conf) {
            preparedConfig.push(_.defaults({name: name}, conf, globalConfig, defaultConfig));
          });
        } else {
          preparedConfig.push(_.defaults({name: name}, config[name], globalConfig, defaultConfig));
        }
      }
    }
  } else {
    config.forEach(function(conf) {
      preparedConfig.push(_.defaults({}, conf, globalConfig, defaultConfig));
    });
  }
  return preparedConfig;
}

module.exports = prepareConfig;
