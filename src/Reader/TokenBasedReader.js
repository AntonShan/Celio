const Reader = require('./Reader')
const {Tokenizer} = require('../Tokenizer/Tokenizer')
const {Parser} = require('../Parser/Parser')

class TokenBasedReader extends Reader {
  constructor (data) {
    super()
    this.tokenizer = new Tokenizer(data)
    this.parser = new Parser(this.tokenizer)
  }
}

module.exports = TokenBasedReader
