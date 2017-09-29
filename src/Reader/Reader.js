const {NotImplementedError} = require('../Exceptions/NotImplementedError')

class Reader {
  read () {
    throw new NotImplementedError('Not implemented')
  }
}

module.exports = Reader
