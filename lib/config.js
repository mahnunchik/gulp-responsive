/* jshint -W083 */
'use strict'

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

const defaultConfig = {
  crop: false,
  embed: false,
  min: false,
  max: false,
  withoutEnlargement: true,
  skipOnEnlargement: false,
  ignoreAspectRatio: false,
  kernel: 'lanczos3',
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
  format: null,
  trim: false
}

function prepareConfig (config, globalConfig) {
  const preparedConfig = []

  if (!Array.isArray(config)) {
    for (const name in config) {
      if (Object.prototype.hasOwnProperty.call(config, name)) {
        if (Array.isArray(config[name])) {
          config[name].forEach(function (conf) {
            preparedConfig.push({ ...defaultConfig, ...globalConfig, ...conf, name })
          })
        } else {
          preparedConfig.push({ ...defaultConfig, ...globalConfig, ...config[name], name })
        }
      }
    }
  } else {
    config.forEach(conf => {
      preparedConfig.push({ ...defaultConfig, ...globalConfig, ...conf })
    })
  }
  return preparedConfig
}

module.exports = prepareConfig
