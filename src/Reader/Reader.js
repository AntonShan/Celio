const {UnrecognizedObjectError} = require('../Exceptions/UnrecognizedObjectError')
const {NotImplementedError} = require('../Exceptions/NotImplementedError')
const {Tokenizer, TokenType} = require('../Tokenizer/Tokenizer')
const {Parser} = require('../Parser/Parser')

const Disposition = {
  ModifyStar: 'ModifyStar',
  ReplaceStar: 'ReplaceStar',
  AddStar: 'AddStar'
}

class Reader {
  constructor (input) {
    this.type = input.type
    this.tokenizer = new Tokenizer(input.data)
    this.parser = new Parser(this.tokenizer)
  }

  read () {
    switch (this.type) {
      case '.stc':
        return this.readSTC()
      case '.ssc':
        return this.readSSC()
      case '.dsc':
        return this.readDSC()
      case '.dat':
        return this.readDAT()
      default:
        throw new Error('wrong file format')
    }
  }

  readSTC () {
    let result = []

    while (this.tokenizer.nextToken() !== TokenType.TokenEnd) {
      let newObject = {
        isStar: true,
        disposition: Disposition.AddStar
      }

      if (this.tokenizer.getTokenType() === TokenType.TokenName) {
        switch (this.tokenizer.getValue()) {
          case 'Modify':
            newObject.disposition = Disposition.ModifyStar
            this.tokenizer.nextToken()
            break
          case 'Replace':
            newObject.disposition = Disposition.ReplaceStar
            this.tokenizer.nextToken()
            break
          case 'Add':
            newObject.disposition = Disposition.AddStar
            this.tokenizer.nextToken()
            break
        }
      }

      if (this.tokenizer.getTokenType() === TokenType.TokenName) {
        if (this.tokenizer.getValue() === 'Star') {
          newObject.isStar = true
        } else if (this.tokenizer.getValue() === 'Barycenter') {
          newObject.isStar = false
        } else {
          throw new UnrecognizedObjectError()
        }
        this.tokenizer.nextToken()
      }

      newObject.name = this.tokenizer.getValue()

      newObject = Object.assign({}, newObject, {
        params: this.parser.readHash()
      })

      result.push(newObject)
    }

    return result
  }

  readSSC () {
    throw new NotImplementedError(`Reading .ssc files isn't implemented yet`)
  }

  readDSC () {
    throw new NotImplementedError(`Reading .dsc files isn't implemented yet`)
  }

  readDAT () {
    throw new NotImplementedError(`Reading .dsc files isn't implemented yet`)
  }
}

module.exports = {
  Reader,
  Disposition
}
