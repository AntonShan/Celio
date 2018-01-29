import { Grammar, Parser } from 'nearley'
import { AbstractReader } from './AbstractReader'

export class NearleyBasedReader implements AbstractReader {
  parser: Parser

  constructor (grammar) {
    this.parser = new Parser(Grammar.fromCompiled(grammar))
  }

  async read (data: string): Promise<any[]> {
    try {
      const result = this.parser.feed(data).results[0]
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
