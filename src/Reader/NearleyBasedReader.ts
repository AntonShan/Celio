import {Parser, Grammar} from 'nearley'

abstract class NearleyBasedReader {
  parser: any
  grammar: any

  constructor (grammar) {
    this.grammar = grammar
    this.parser = new Parser(Grammar.fromCompiled(this.grammar))
  }

  read (data: string): any[] {
    const results = this.parser.feed(data)
    return results.results[0]
  }
}

export default NearleyBasedReader
