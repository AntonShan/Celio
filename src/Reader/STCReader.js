const TokenBasedReader = require('./TokenBasedReader')
const {TokenType} = require('../Tokenizer/Tokenizer')
const {UnrecognizedObjectError} = require('../Exceptions/UnrecognizedObjectError')

const Disposition = {
  ModifyStar: 'ModifyStar',
  ReplaceStar: 'ReplaceStar',
  AddStar: 'AddStar'
}

class STCReader extends TokenBasedReader {
  read () {
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

      if (this.tokenizer.getTokenType() === TokenType.TokenNumber) {
        newObject.catalogNumber = this.tokenizer.getValue()
        this.tokenizer.nextToken()
      }

      if (this.tokenizer.getTokenType() === TokenType.TokenString) {
        newObject.objectName = this.tokenizer.getValue()
        this.tokenizer.nextToken()

        if (newObject.objectName) {
          newObject.firstName = newObject.objectName.split[':'][0]
        }
      }

      this.tokenizer.pushBack()

      newObject = Object.assign({}, newObject, {
        params: this.parser.readHash()
      })

      result.push(newObject)
    }

    return result
  }
}

module.exports = STCReader
