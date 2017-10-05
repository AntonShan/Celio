import TextWriter from './TextWriter'
import * as fs from 'fs'

class STCWriter extends TextWriter {
  write (fullPath: string, items: any[], options = this.defaultWriteMode): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(fullPath, this.transform(items), options, (error) => {
        if (error) {
          return reject(error)
        }

        return resolve()
      })
    })
  }

  writeHeader (value: any): string {
    const mode = value.mode !== null ? value.mode : ''
    const type = value.type !== null ? value.type : ''
    const HIP = value.number !== null ? value.number : ''
    const name = value.name !== null ? this.writeString(value.name) : ''
    return [mode, type, HIP, name].join(' ')
  }
}

export default STCWriter
