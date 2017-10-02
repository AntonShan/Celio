import { Tokenizer, TokenType } from '../Tokenizer'

class Parser {
  tokenizer: Tokenizer

  constructor (_tokenizer) {
    this.tokenizer = _tokenizer
  }

  readArray (): any[] {
    let tok = this.tokenizer.nextToken()
    if (tok !== TokenType.TokenBeginArray) {
      this.tokenizer.pushBack()
      return null
    }

    let array = []
    let v = this.readValue() // typeof Value

    while (v !== null) {
      array.push(v)
      v = this.readValue()
    }

    tok = this.tokenizer.nextToken()
    if (tok !== TokenType.TokenEndArray) {
      this.tokenizer.pushBack()
      array = null
      return null
    }

    return array
  }

  readHash (): any {
    let tok = this.tokenizer.nextToken()
    if (tok !== TokenType.TokenBeginGroup) {
      this.tokenizer.pushBack()
      return null
    }

    let hash = {}

    tok = this.tokenizer.nextToken()
    while (tok !== TokenType.TokenEndGroup) {
      if (tok !== TokenType.TokenName) {
        this.tokenizer.pushBack()
        hash = null
        return null
      }

      let name = this.tokenizer.getValue()

      hash = this.readUnits(name, hash)

      let value = this.readValue()

      if (value === null) {
        hash = null
        return null
      }

      hash = Object.assign({}, hash, {
        [name]: value
      })

      tok = this.tokenizer.nextToken()
    }

    return hash
  }

  readUnits (propertyName, hash) {
    let tok = this.tokenizer.nextToken()
    if (tok !== TokenType.TokenBeginUnits) {
      this.tokenizer.pushBack()
      return hash
    }

    tok = this.tokenizer.nextToken()
    while (tok !== TokenType.TokenEndUnits) {
      if (tok !== TokenType.TokenName) {
        this.tokenizer.pushBack()
        return hash
      }

      tok = this.tokenizer.nextToken()
    }

    return Object.assign({}, hash)
  }

  readValue (): any {
    let tok = this.tokenizer.nextToken()

    switch (tok) {
      case TokenType.TokenNumber:
      case TokenType.TokenString:
      case TokenType.TokenName:
      case TokenType.TokenBeginArray:
      case TokenType.TokenBeginGroup:
        return this.tokenizer.getValue()
      default:
        return null
    }
  }
}

export default Parser
