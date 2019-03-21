'use strict';

var path = require('path');

module.exports = function(filePath) {
  var extname = path.extname(filePath);
  switch (extname) {
    case '.jpeg':
      return 'jpeg';
    case '.jpg':
      return 'jpg';
    case '.jpe':
      return 'jpe';
    case '.png':
      return 'png';
    case '.webp':
      return 'webp';
    default:
      return 'unsupported';
  }
};
