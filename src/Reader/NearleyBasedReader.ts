import { Grammar, Parser } from 'nearley'
import AbstractReader from './AbstractReader'
import * as fs from 'fs'

class NearleyBasedReader implements AbstractReader {
  parser: any

  constructor (grammar) {
    this.parser = new Parser(Grammar.fromCompiled(grammar))
  }

  read (filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (error, data) => {
        if (error) {
          return reject(error)
        }

        resolve(this.parser.feed(data).results[0])
      })
    })
  }
}

export default NearleyBasedReader
