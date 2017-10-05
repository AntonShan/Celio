import * as fs from 'fs'
import AbstractWriter from './AbstractWriter'

import isObject from 'lodash-es/isObject'
import isArray from 'lodash-es/isArray'
import isNumber from 'lodash-es/isNumber'
import isString from 'lodash-es/isString'

abstract class TextWriter implements AbstractWriter {
  defaultWriteMode = {
    encoding: 'utf-8',
    mode: 0o644,
    flag: 'w'
  }

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

  transform (items: any[]): string {
    return items.map(item => this.transformItem(item)).join(' ')
  }

  transformItem (item: Object): string {
    const objectHeader = this.writeHeader(item)
    const objectProperties = this.stringify(item)
    return objectHeader + objectProperties
  }

  abstract writeHeader (value: Object): string

  stringify (value: any, indent = 0): string {
    if (isObject(value)) {
      if (isArray(value)) {
        return this.writeArray(value, indent)
      } else {
        return this.writeObject(value, indent)
      }
    } else {
      if (isNumber(value)) {
        return this.writeNumber(value)
      } else if (isString(value)) {
        return this.writeString(value)
      } else {
        return String(value)
      }
    }
  }

  writeArray (array: any[], indent: number): string {
    return '[ ' + array.map(function (item) {
      return this.stringify(item, indent + 2)
    }).join(' ') + ' ]'
  }

  writeObject (value: Object, indent: number): string {
    const entries = Object.keys(value)
      .map(function (key) {
        return this.writeField(key, this.stringify(value[key], indent + 2), indent + 2)
      })
      .join('\n')

    return '{\n' + entries + '\n' + ' '.repeat(indent) + '}'
  }

  writeString (value: string): string {
    return '"' + value + '"'
  }

  writeNumber (value: number, precision = 6): string {
    return String(Math.floor(value * 10 ** precision) / 10 ** precision)
  }

  writeField (key: string, value: string, indent: number): string {
    return ' '.repeat(indent) + key + ' ' + value
  }
}

export default TextWriter
