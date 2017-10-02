import Reader from './Reader'
import { Tokenizer } from '../Tokenizer'
import { Parser } from '../Parser'

abstract class TokenBasedReader extends Reader {
  tokenizer: Tokenizer
  parser: Parser

  constructor (data) {
    super()
    this.tokenizer = new Tokenizer(data)
    this.parser = new Parser(this.tokenizer)
  }

  read (): any[] {
    return [{}]
  }

  write (): void {}
}

export default TokenBasedReader
