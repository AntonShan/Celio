const {charOf} = require('../utils')

const UTF8Encode = (unicodeValue) => {
  if (unicodeValue < 0x80) {
    return charOf(unicodeValue)
  } else if (unicodeValue < 0x800) {
    return charOf((0xc0 | ((unicodeValue & 0x7c0) >> 6))) +
      charOf((0x80 | (unicodeValue & 0x3f)))
  } else if (unicodeValue < 0x10000) {
    return charOf(0xe0 | ((unicodeValue & 0xf000) >> 12)) +
      charOf(0x80 | ((unicodeValue & 0x0fc0) >> 6)) +
      charOf(0x80 | ((unicodeValue & 0x003f)))
  } else if (unicodeValue < 0x200000) {
    return charOf(0xf0 | ((unicodeValue & 0x1c0000) >> 18)) +
      charOf(0x80 | ((unicodeValue & 0x03f000) >> 12)) +
      charOf(0x80 | ((unicodeValue & 0x000fc0) >> 6)) +
      charOf(0x80 | ((unicodeValue & 0x00003f)))
  } else if (unicodeValue < 0x4000000) {
    return charOf(0xf8 | ((unicodeValue & 0x3000000) >> 24)) +
      charOf(0x80 | ((unicodeValue & 0x0fc0000) >> 18)) +
      charOf(0x80 | ((unicodeValue & 0x003f000) >> 12)) +
      charOf(0x80 | ((unicodeValue & 0x0000fc0) >> 6)) +
      charOf(0x80 | ((unicodeValue & 0x000003f)))
  } else {
    return charOf(0xfc | ((unicodeValue & 0x40000000) >> 30)) +
      charOf(0x80 | ((unicodeValue & 0x3f000000) >> 24)) +
      charOf(0x80 | ((unicodeValue & 0x00fc0000) >> 18)) +
      charOf(0x80 | ((unicodeValue & 0x0003f000) >> 12)) +
      charOf(0x80 | ((unicodeValue & 0x00000fc0) >> 6)) +
      charOf(0x80 | ((unicodeValue & 0x0000003f)))
  }
}

module.exports.UTF8Encode = UTF8Encode
