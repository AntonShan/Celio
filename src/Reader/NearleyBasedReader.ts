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

        const result = this.parser.feed(data).results[0]

        if (result === void 0) {
          reject(`Unable to read file ${filePath}`)
        } else {
          resolve(result)
        }
      })
    })
  }
}

export default NearleyBasedReader
