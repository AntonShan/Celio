import * as fs from 'fs'
import AbstractWriter from './AbstractWriter'

abstract class BinaryWriter implements AbstractWriter {
  defaultWriteMode = {
    mode: 0o644,
    flag: 'w+'
  }

  write (fullPath: string, items: any[], options = this.defaultWriteMode): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(fullPath, this.process(items), options, (error) => {
        if (error) {
          return reject(error)
        }

        return resolve()
      })
    })
  }

  abstract process (items: any[]): Buffer
}

export default BinaryWriter
