import { UTF8Encode, Utils } from '../utils'
import { InputSyntaxError } from '../Exceptions'

enum State {
  StartState,
  NameState,
  NumberState,
  FractionState,
  ExponentState,
  ExponentFirstState,
  DotState,
  CommentState,
  StringState,
  ErrorState,
  StringEscapeState,
  UnicodeEscapeState,
}

enum TokenType {
  TokenName,
  TokenString,
  TokenNumber,
  TokenBegin,
  TokenEnd,
  TokenNull,
  TokenBeginGroup,
  TokenEndGroup,
  TokenBeginArray,
  TokenEndArray,
  TokenEquals,
  TokenError,
  TokenBar,
  TokenBeginUnits,
  TokenEndUnits,
}

class Tokenizer {
  tokenType: TokenType = TokenType.TokenBegin
  haveValidNumber: boolean = false
  haveValidName: boolean = false
  haveValidString: boolean = false
  pushedBack: boolean = false
  lineNum: number = 1
  currentIndex: number = 0
  nextChar: string = ''
  value: any = null
  unicodeValue: number = 0
  unicodeEscapeDigits: number = 0

  constructor (public data) {}

  nextToken (): TokenType {
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
          if (Utils.isSpace(this.nextChar)) {
            state = State.StartState
          } else if (Utils.isDigit(this.nextChar)) {
            state = State.NumberState
            integerValue = Utils.atoi(this.nextChar)
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
          } else if (Utils.isAlpha(this.nextChar) || this.nextChar === '_') {
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
            newToken = TokenType.TokenError
            this.syntaxError(`Bad character in stream at line ${this.getLineNumber()}`)
          }
          break

        case State.NameState:
          if (Utils.isAlpha(this.nextChar) || Utils.isDigit(this.nextChar) || this.nextChar === '_') {
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
            this.value += Utils.codeOf('"')
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
          if (Utils.isDigit(this.nextChar)) {
            state = State.NumberState
            integerValue = integerValue * 10 + Utils.atoi(this.nextChar)
          } else if (this.nextChar === '.') {
            state = State.FractionState
          } else if (this.nextChar === 'e' || this.nextChar === 'E') {
            state = State.ExponentFirstState
          } else if (Utils.isSep(this.nextChar)) {
            newToken = TokenType.TokenNumber
            this.haveValidNumber = true
          } else {
            newToken = TokenType.TokenError
            this.syntaxError(`Bad character in number at line ${this.getLineNumber()}`)
          }
          break

        case State.FractionState:
          if (Utils.isDigit(this.nextChar)) {
            state = State.FractionState
            fractionValue = fractionValue * 10 + Utils.atoi(this.nextChar)
            fracExp *= 10
          } else if (this.nextChar === 'e' || this.nextChar === 'E') {
            state = State.ExponentFirstState
          } else if (Utils.isSep(this.nextChar)) {
            newToken = TokenType.TokenNumber
            this.haveValidNumber = true
          } else {
            newToken = TokenType.TokenError
            this.syntaxError(`Bad character in number at line ${this.getLineNumber()}`)
          }
          break

        case State.ExponentFirstState:
          if (Utils.isDigit(this.nextChar)) {
            state = State.ExponentState
            exponentValue = Utils.atoi(this.nextChar)
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
          if (Utils.isDigit(this.nextChar)) {
            state = State.ExponentState
            exponentValue = exponentValue * 10 + Utils.atoi(this.nextChar)
          } else if (Utils.isSep(this.nextChar)) {
            newToken = TokenType.TokenNumber
            this.haveValidNumber = true
          } else {
            state = State.ErrorState
            this.syntaxError(`Bad character in number at line ${this.getLineNumber()}`)
          }
          break

        /*
        case State.DotState:
          if (Utils.isDigit(this.nextChar)) {
            state = State.FractionState
            fractionValue = fractionValue * 10 + Utils.atoi(this.nextChar)
            fracExp = 10
          } else {
            state = State.ErrorState
            this.syntaxError(`'.' in stupid place. Line ${this.getLineNumber()}`)
          }
          break
        */

        case State.UnicodeEscapeState:
          if (Utils.isXDigit(this.nextChar)) {
            let digitValue = Utils.atoi(this.nextChar)

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

        default:
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

  getTokenType (): TokenType {
    return this.tokenType
  }

  pushBack (): void {
    this.pushedBack = true
  }

  getValue (): any {
    return this.value
  }

  getLineNumber (): number {
    return this.lineNum
  }

  readChar (): string {
    const charCode = this.data[this.currentIndex++]
    const symbol = Utils.charOf(charCode)

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

export {
  Tokenizer,
  TokenType,
  State
}
