import AbstractWriter from './AbstractWriter'
import { Serializer } from '../Serializer'

abstract class TextWriter implements AbstractWriter {
  write (type: string, items: any[]): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        return resolve(this.transform(items))
      } catch (error) {
        reject(error)
      }
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
