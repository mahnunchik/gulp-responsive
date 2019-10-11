'use strict'

const path = require('path')

module.exports = (filePath) => {
  const extname = path.extname(filePath)
  switch (extname) {
    case '.jpeg':
      return 'jpeg'
    case '.jpg':
      return 'jpg'
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
