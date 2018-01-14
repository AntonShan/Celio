import { Grammar, Parser } from 'nearley'
import AbstractReader from './AbstractReader'

class NearleyBasedReader implements AbstractReader {
  parser: any

  constructor (grammar) {
    this.parser = new Parser(Grammar.fromCompiled(grammar))
  }

  read (data: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const result = this.parser.feed(data).results[0]
        resolve(result)
      } catch (error) {
        reject (error)
      }
    })
  }
}

export default NearleyBasedReader
