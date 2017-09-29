const TokenBasedReader = require('./TokenBasedReader')
const {NotImplementedError} = require('../Exceptions/NotImplementedError')

class DSCReader extends TokenBasedReader {
  read () {
    throw new NotImplementedError(`.dsc reader isn't implemented yet`)
  }
}

module.exports = DSCReader
