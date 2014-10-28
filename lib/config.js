/*jshint -W083 */
'use strict';

var util = require('util');
var merge = require('merge');

/*
Configuration unit is an object:

* name: String - filename glob pattern
* width: Number - not set by default
* height: Number - not set by default
* withoutEnlargement: Boolean - default true
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

3. Object of array ofunique configurations. Keys are names of files.

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
  withoutEnlargement: true
};

function prepareConfig(config) {
  var preparedConfig = [];

  if (!util.isArray(config)) {
    for (var name in config) {
      if (config.hasOwnProperty(name)) {
        if (util.isArray(config[name])) {
          config[name].forEach(function(conf) {
            preparedConfig.push(merge(true, conf, {name: name}, defaultConfig));
          });
        } else {
          preparedConfig.push(merge(true, config[name], {name: name}, defaultConfig));
        }
      }
    }
  } else {
    config.forEach(function(conf) {
      preparedConfig.push(merge(true, conf, defaultConfig));
    });
  }
  return preparedConfig;
}

module.exports = prepareConfig;
