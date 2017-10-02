import * as fs from 'fs'
import * as path from 'path'
import * as Reader from '../Reader'

class Celio {
  static read (filePath: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      let fullPath = path.resolve(filePath)

      fs.readFile(fullPath, async (error, data) => {
        if (error) {
          return reject(error)
        }

        const inputType = path.extname(fullPath)

        if (inputType.startsWith('.')) {
          let type = inputType.split('.')[1].toUpperCase()
          try {
            const SpecificReader = Reader[`${type}Reader`]
            resolve(new SpecificReader(data).read(filePath))
          } catch (e) {
            return reject(e)
          }
        } else {
          throw new Error('Unknown file error')
        }
      })
    })
  }

  static write (filePath: string): Promise<void> {
    return new Promise<void>(resolve => resolve())
  }
}

export default Celio
