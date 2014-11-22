'use strict';

var _ = require('lodash');

module.exports = function(neededSize, originalSize) {
  if (neededSize === undefined || neededSize === null) {
    return null;
  } else if (_.isString(neededSize) && neededSize.indexOf('%') > -1) {
    var percentage = parseFloat(neededSize);
    if (isNaN(percentage)){
      throw new Error('Wrong percentage size "'+neededSize+'"');
    }
    return Math.round(originalSize * percentage * 0.01);
  } else {
    neededSize = parseInt(neededSize);
    if (isNaN(neededSize)){
      throw new Error('Wrong size "'+neededSize+'"');
    }
    return neededSize;
  }
};
