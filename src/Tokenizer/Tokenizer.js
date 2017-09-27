const {charOf, atoi, itoa, isAlpha, isDigit, isSep, isSpace} = require('../utils')
const {UTF8Encode} = require('../utils/utf8')
const {isXDigit} = require('../utils')
const {InputSyntaxError} = require('../Exceptions/InputSyntaxError')

const State = {
  StartState: 'StartState',
  NameState: 'NameState',
  NumberState: 'NumberState',
  FractionState: 'FractionState',
  ExponentState: 'ExponentState',
  ExponentFirstState: 'ExponentFirstState',
  DotState: 'DotState',
  CommentState: 'CommentState',
  StringState: 'StringState',
  ErrorState: 'ErrorState',
  StringEscapeState: 'StringEscapeState',
  UnicodeEscapeState: 'UnicodeEscapeState'
}
const TokenType = {
  TokenName: 'TokenName',
  TokenString: 'TokenString',
  TokenNumber: 'TokenNumber',
  TokenBegin: 'TokenBegin',
  TokenEnd: 'TokenEnd',
  TokenNull: 'TokenNull',
  TokenBeginGroup: 'TokenBeginGroup',
  TokenEndGroup: 'TokenEndGroup',
  TokenBeginArray: 'TokenBeginArray',
  TokenEndArray: 'TokenEndArray',
  TokenEquals: 'TokenEquals',
  TokenError: 'TokenError',
  TokenBar: 'TokenBar',
  TokenBeginUnits: 'TokenBeginUnits',
  TokenEndUnits: 'TokenEndUnits'
}

class Tokenizer {
  constructor (data) {
    this.data = data
    this.tokenType = TokenType.TokenBegin
    this.haveValidNumber = false
    this.haveValidName = false
    this.haveValidString = false
    this.pushedBack = false
    this.lineNum = 1
    this.currentIndex = 0
    this.nextChar = null
    this.value = null
    this.unicodeValue = 0
    this.unicodeEscapeDigits = 0
  }

  nextToken () {
    let state = State.StartState

    if (this.pushedBack) {
      this.pushedBack = false
      return this.tokenType
    }

    this.value = ''
    this.haveValidNumber = false
    this.haveValidName = false
    this.haveValidString = false

    if (this.tokenType === TokenType.TokenBegin) {
      this.nextChar = this.readChar()
      if (this.nextChar === void 0) {
        return TokenType.TokenEnd
      }
    } else if (this.tokenType === TokenType.TokenEnd) {
      return this.tokenType
    }

    let integerValue = 0
    let fractionValue = 0
    let sign = 1
    let fracExp = 1
    let exponentValue = 0
    let exponentSign = 1

    let newToken = TokenType.TokenBegin
    while (newToken === TokenType.TokenBegin) {
      switch (state) {
        case State.StartState:
          if (isSpace(this.nextChar)) {
            state = State.StartState
          } else if (isDigit(this.nextChar)) {
            state = State.NumberState
            integerValue = itoa(this.nextChar)
          } else if (this.nextChar === '-') {
            state = State.NumberState
            sign = -1
            integerValue = 0
          } else if (this.nextChar === '+') {
            state = State.NumberState
            sign = +1
            integerValue = 0
          } else if (this.nextChar === '.') {
            state = State.NumberState
            sign = +1
            integerValue = 0
          } else if (isAlpha(this.nextChar) || this.nextChar === '_') {
            state = State.NameState
            this.value += this.nextChar
          } else if (this.nextChar === '#') {
            state = State.CommentState
          } else if (this.nextChar === '"') {
            state = State.StringState
          } else if (this.nextChar === '{') {
            newToken = TokenType.TokenBeginGroup
            this.nextChar = this.readChar()
          } else if (this.nextChar === '}') {
            newToken = TokenType.TokenEndGroup
            this.nextChar = this.readChar()
          } else if (this.nextChar === '[') {
            newToken = TokenType.TokenBeginArray
            this.nextChar = this.readChar()
          } else if (this.nextChar === ']') {
            newToken = TokenType.TokenEndArray
            this.nextChar = this.readChar()
          } else if (this.nextChar === '=') {
            newToken = TokenType.TokenEquals
            this.nextChar = this.readChar()
          } else if (this.nextChar === '|') {
            newToken = TokenType.TokenBar
            this.nextChar = this.readChar()
          } else if (this.nextChar === '<') {
            newToken = TokenType.TokenBeginUnits
            this.nextChar = this.readChar()
          } else if (this.nextChar === '>') {
            newToken = TokenType.TokenEndUnits
            this.nextChar = this.readChar()
          } else if (this.nextChar === void 0) {
            newToken = TokenType.TokenEnd
          } else {
            newToken = State.TokenError
            this.syntaxError(`Bad character in stream at line ${this.getLineNumber()}`)
          }
          break

        case State.NameState:
          if (isAlpha(this.nextChar) || isDigit(this.nextChar) || this.nextChar === '_') {
            state = State.NameState
            this.value += this.nextChar
          } else {
            newToken = TokenType.TokenName
            this.haveValidName = true
          }
          break

        case State.CommentState:
          // TODO: проверить это "потенциально ломательное" место
          if (this.nextChar === '\n' || this.nextChar === '\r' || this.nextChar === void 0) {
            state = State.StartState
          }
          break

        case State.StringState:
          if (this.nextChar === '"') {
            newToken = TokenType.TokenString
            this.haveValidString = true
            this.nextChar = this.readChar()
          } else if (this.nextChar === '\\') {
            state = State.StringEscapeState
          } else if (this.nextChar === void 0) {
            newToken = TokenType.TokenError
            this.syntaxError('Unterminated string')
          } else {
            state = State.StringState
            this.value += this.nextChar
          }
          break
        case State.StringEscapeState:
          if (this.nextChar === '\\') {
            this.value += '\\'
            state = State.StringState
          } else if (this.nextChar === 'n') {
            this.value += 'n'
            state = State.StringState
          } else if (this.nextChar === '"') {
            this.value += charOf('"')
            state = State.StringState
          } else if (this.nextChar === 'u') {
            this.unicodeValue = 0
            this.unicodeEscapeDigits = 0
            state = State.UnicodeEscapeState
          } else {
            newToken = TokenType.TokenError
            state = State.StringState
            this.syntaxError(`Unknown escape code in string at line ${this.getLineNumber()}`)
          }
          break

        case State.NumberState:
          if (isDigit(this.nextChar)) {
            state = State.NumberState
            integerValue = integerValue * 10 + atoi(this.nextChar)
          } else if (this.nextChar === '.') {
            state = State.FractionState
          } else if (this.nextChar === 'e' || this.nextChar === 'E') {
            state = State.ExponentFirstState
          } else if (isSep(this.nextChar)) {
            newToken = TokenType.TokenNumber
            this.haveValidNumber = true
          } else {
            newToken = TokenType.TokenError
            this.syntaxError(`Bad character in number at line ${this.getLineNumber()}`)
          }
          break

        case State.FractionState:
          if (isDigit(this.nextChar)) {
            state = State.FractionState
            fractionValue = fractionValue * 10 + itoa(this.nextChar)
            fracExp *= 10
          } else if (this.nextChar === 'e' || this.nextChar === 'E') {
            state = State.ExponentFirstState
          } else if (isSep(this.nextChar)) {
            newToken = TokenType.TokenNumber
            this.haveValidNumber = true
          } else {
            newToken = State.TokenError
            this.syntaxError(`Bad character in number at line ${this.getLineNumber()}`)
          }
          break

        case State.ExponentFirstState:
          if (isDigit(this.nextChar)) {
            state = State.ExponentState
            exponentValue = itoa(this.nextChar)
          } else if (this.nextChar === '-') {
            state = State.ExponentState
            exponentSign = -1
          } else if (this.nextChar === '+') {
            state = State.ExponentState
          } else {
            state = State.ErrorState
            this.syntaxError(`Bad character in number at line ${this.getLineNumber()}`)
          }
          break

        case State.ExponentState:
          if (isDigit(this.nextChar)) {
            state = State.ExponentState
            exponentValue = exponentValue * 10 + itoa(this.nextChar)
          } else if (isSep(this.nextChar)) {
            newToken = TokenType.TokenNumber
            this.haveValidNumber = true
          } else {
            state = State.ErrorState
            this.syntaxError(`Bad character in number at line ${this.getLineNumber()}`)
          }
          break

        case State.DotState:
          if (isDigit(this.nextChar)) {
            state = State.FractionState
            fractionValue = fractionValue * 10 + itoa(this.nextChar)
            fracExp = 10
          } else {
            state = State.ErrorState
            this.syntaxError(`'.' in stupid place. Line ${this.getLineNumber()}`)
          }
          break

        case State.UnicodeEscapeState:
          if (isXDigit(this.nextChar)) {
            let digitValue

            if (this.nextChar >= 'a' && this.nextChar <= 'f') {
              digitValue = itoa(this.nextChar)
            } else if (this.nextChar >= 'A' && this.nextChar <= 'F') {
              digitValue = itoa(this.nextChar)
            } else {
              digitValue = itoa(this.nextChar)
            }

            this.unicodeValue = (this.unicodeValue << 4) + digitValue
            this.unicodeEscapeDigits++

            if (this.unicodeEscapeDigits === 4) {
              this.value += UTF8Encode(this.unicodeValue)
              state = State.StringState
            }
          } else {
            state = State.ErrorState
            this.syntaxError(`Bad Unicode escape in string at line ${this.getLineNumber()}`)
          }
          break

        case State.ErrorState:
          break
      }

      if (newToken === TokenType.TokenBegin) {
        this.nextChar = this.readChar()
      }
    }

    this.tokenType = newToken
    if (this.haveValidNumber) {
      this.value = integerValue + fractionValue / fracExp

      if (exponentValue !== 0) {
        this.value *= Math.pow(10.0, exponentValue * exponentSign)
      }

      this.value *= sign
    }

    return this.tokenType
  }

  getTokenType () {
    return this.tokenType
  }

  pushBack () {
    this.pushedBack = true
  }

  getValue () {
    return this.value
  }

  getLineNumber () {
    return this.lineNum
  }

  readChar () {
    const charCode = this.data[this.currentIndex++]
    const symbol = charOf(charCode)

    if (charCode === void 0) {
      return charCode
    }

    if (symbol === '\n') {
      this.lineNum++
    }

    return symbol
  }

  syntaxError (msg) {
    throw new InputSyntaxError(msg, this.lineNum)
  }
}

module.exports = {
  TokenType,
  State,
  Tokenizer
}
