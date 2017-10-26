import * as fs from 'fs'
import AbstractWriter from './AbstractWriter'
import { Serializer } from '../Serializer'

abstract class TextWriter implements AbstractWriter {
  defaultWriteMode = {
    encoding: 'utf-8',
    mode: 0o644,
    flag: 'w'
  }

  write (fullPath: string, items: any[], options = this.defaultWriteMode): Promise<void> {
    return new Promise((resolve, reject) => {
      const output = this.transform(items)

      fs.writeFile(fullPath, output, options, (error) => {
        if (error) {
          return reject(error)
        }

        return resolve()
      })
    })
  }

  transform (items: any[]): string {
    return items.map(item => this.transformItem(item)).join('\n')
  }

  transformItem (item: any): string {
    const objectHeader = this.writeHeader(item.meta)
    const objectProperties = Serializer.stringify(item.properties)
    return objectHeader + ' ' + objectProperties + '\n'
  }

  abstract writeHeader (value: Object): string
}

export default TextWriter
