import { isArray, isObject, isString, isNumber } from '../utils'

export class Serializer {
  static async stringify (value: any, indent = 0): Promise<string> {
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
        return Promise.resolve(String(value))
      }
    }
  }

  static async writeArray (array: any[], indent: number): Promise<string> {
    const values = await Promise.all(array.map((item) => {
      return Serializer.stringify(item, indent + 2)
    }))

    return '[ ' + values.join(' ') + ' ]'
  }

  static async writeObject (value: Object, indent: number): Promise<string> {
    if (Object.keys(value).length === 0) {
      return '{ }'
    }

    const entries = await Promise.all(Object.keys(value)
      .map(async function (key) {
        return Serializer.writeField(key, await Serializer.stringify(value[key], indent + 2), indent + 2)
      }))

    return '{\n' + entries.join('\n') + '\n' + ' '.repeat(indent) + '}'
  }

  static async writeString (value: string): Promise<string> {
    return Promise.resolve('"' + value + '"')
  }

  static async writeNumber (value: number, precision = 6): Promise<string> {
    return Promise.resolve(String(Math.floor(value * 10 ** precision) / 10 ** precision))
  }

  static async writeField (key: string, value: string, indent: number): Promise<string> {
    return Promise.resolve(' '.repeat(indent) + key + ' ' + value)
  }
}
