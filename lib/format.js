'use strict'

const path = require('path')

module.exports = (filePath) => {
  const extname = path.extname(filePath)
  switch (extname) {
    case '.jpeg':
    case '.jpg':
    case '.jpe':
      return 'jpeg'
    case '.png':
      return 'png'
    case '.webp':
      return 'webp'
    default:
      return 'unsupported'
  }
}
