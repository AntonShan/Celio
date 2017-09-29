const Reader = require('./Reader')
const {charOf, fromByteArray} = require('../utils')

const FILE_HEADER = 'CELSTARS'
const VERSION = 0x0100

class DATReader extends Reader {
  constructor (data) {
    super()

    let header = Array.from(data.slice(0, FILE_HEADER.length))
      .map(charOf)
      .join('')
    let version = fromByteArray(
      data.slice(
        FILE_HEADER.length,
        FILE_HEADER.length + 2
      )
    )

    if (header !== FILE_HEADER) {
      throw new Error('Wrong file signature')
    } else if (version !== VERSION) {
      throw new Error('Wrong file version')
    } else {
      this.data = Array.from(data.slice(FILE_HEADER.length + 3))
      this.starsInFile = fromByteArray(Array.from(data.slice(
        FILE_HEADER.length + 2,
        FILE_HEADER.length + 6
      )))
      this.currentOffset = FILE_HEADER.length + 6
    }
  }

  read () {
  }
}

module.exports = DATReader
