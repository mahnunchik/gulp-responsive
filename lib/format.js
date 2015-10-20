'use strict';

var path = require('path');

module.exports = function(filePath) {
  var extname = path.extname(filePath);
  switch (extname) {
    case '.jpeg':
    case '.jpg':
    case '.jpe':
      return 'jpeg';
    case '.png':
      return 'png';
    case '.webp':
      return 'webp';
    default:
      return 'unsupported';
  }
};
