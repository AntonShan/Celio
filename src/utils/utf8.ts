import Utils from './Utils'

const UTF8Encode = (unicodeValue: number) => {
  if (unicodeValue < 0x80) {
    return Utils.charOf(unicodeValue)
  } else if (unicodeValue < 0x800) {
    return Utils.charOf((0xc0 | ((unicodeValue & 0x7c0) >> 6))) +
      Utils.charOf((0x80 | (unicodeValue & 0x3f)))
  } else if (unicodeValue < 0x10000) {
    return Utils.charOf(0xe0 | ((unicodeValue & 0xf000) >> 12)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x0fc0) >> 6)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x003f)))
  } else if (unicodeValue < 0x200000) {
    return Utils.charOf(0xf0 | ((unicodeValue & 0x1c0000) >> 18)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x03f000) >> 12)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x000fc0) >> 6)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x00003f)))
  } else if (unicodeValue < 0x4000000) {
    return Utils.charOf(0xf8 | ((unicodeValue & 0x3000000) >> 24)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x0fc0000) >> 18)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x003f000) >> 12)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x0000fc0) >> 6)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x000003f)))
  } else {
    return Utils.charOf(0xfc | ((unicodeValue & 0x40000000) >> 30)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x3f000000) >> 24)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x00fc0000) >> 18)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x0003f000) >> 12)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x00000fc0) >> 6)) +
      Utils.charOf(0x80 | ((unicodeValue & 0x0000003f)))
  }
}

export default UTF8Encode
