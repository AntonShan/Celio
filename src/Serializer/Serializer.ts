import isObject from 'lodash-es/isObject'
import isArray from 'lodash-es/isArray'
import isNumber from 'lodash-es/isNumber'
import isString from 'lodash-es/isString'

export default class Serializer {
  static stringify (value: any, indent = 0): string {
    if (isObject(value)) {
      if (isArray(value)) {
        return Serializer.writeArray(value, indent)
      } else {
        return Serializer.writeObject(value, indent)
      }
    } else {
      if (isNumber(value)) {
        return Serializer.writeNumber(value)
      } else if (isString(value)) {
        return Serializer.writeString(value)
      } else {
        return String(value)
      }
    }
  }

  static writeArray (array: any[], indent: number): string {
    return '[ ' + array.map(function (item) {
      return Serializer.stringify(item, indent + 2)
    }).join(' ') + ' ]'
  }

  static writeObject (value: Object, indent: number): string {
    if (Object.keys(value).length === 0) {
      return '{ }'
    }

    const entries = Object.keys(value)
      .map(function (key) {
        return Serializer.writeField(key, Serializer.stringify(value[key], indent + 2), indent + 2)
      })
      .join('\n')

    return '{\n' + entries + '\n' + ' '.repeat(indent) + '}'
  }

  static writeString (value: string): string {
    return '"' + value + '"'
  }

  static writeNumber (value: number, precision = 6): string {
    return String(Math.floor(value * 10 ** precision) / 10 ** precision)
  }

  static writeField (key: string, value: string, indent: number): string {
    return ' '.repeat(indent) + key + ' ' + value
  }
}
