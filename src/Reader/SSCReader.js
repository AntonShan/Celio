const TokenBasedReader = require('./TokenBasedReader')
const {NotImplementedError} = require('../Exceptions/NotImplementedError')

class SSCReader extends TokenBasedReader {
  read () {
    throw new NotImplementedError(`.ssc reader isn't implemented yet`)
  }
}

module.exports = SSCReader
