import * as fs from 'fs'
import * as path from 'path'
import * as Reader from '../Reader'

const {promisify} = require('util')
const readFileAsync = promisify(fs.readFile)

class Celio {
  static read (filePath: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      let fullPath = path.resolve(filePath)

      readFileAsync(fullPath, 'utf-8')
        .catch(reject)
        .then((data) => {
          try {
            const inputType = path.extname(fullPath)

            if (inputType.startsWith('.')) {
              const input = data.replace(/#(?:.*)?$/gm, '') // Remove comments from file
              const type = inputType.split('.')[1].toUpperCase()
              const SpecificReader = Reader[`${type}Reader`]
              resolve(new SpecificReader().read(input))
            } else {
              throw new Error('Unknown file error')
            }
          } catch (e) {
            return reject(e)
          }
        })
    })
  }

  static write (filePath: string): Promise<void> {
    return new Promise<void>(resolve => resolve())
  }
}

export default Celio
