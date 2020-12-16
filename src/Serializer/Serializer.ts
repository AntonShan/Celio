import { isArray, isObject, isString, isNumber } from '../utils';
import { ConfigurationValue, ObjectLikeValue } from 'src/types';

export class Serializer {
  static stringify(value: ConfigurationValue, indent = 0): string {
    if (isObject(value)) {
      if (isArray(value)) {
        return Serializer.writeArray(value as ConfigurationValue[], indent);
      } else {
        return Serializer.writeObject(value as ObjectLikeValue, indent);
      }
    } else {
      if (isNumber(value)) {
        return Serializer.writeNumber(value as number);
      } else if (isString(value)) {
        return Serializer.writeString(value as string);
      } else {
        return String(value);
      }
    }
  }

  static writeArray(array: ConfigurationValue[], indent: number): string {
    const values = array.map((item) => (
      Serializer.stringify(item, indent + 2)
    ));

    return '[ ' + values.join(' ') + ' ]';
  }

  static writeObject(value: ObjectLikeValue, indent: number): string {
    if (Object.keys(value).length === 0) {
      return '{ }';
    }

    const entries = Object.keys(value)
      .map(async function(key) {
        return Serializer.writeField(key, await Serializer.stringify(value[key], indent + 2), indent + 2);
      });

    return '{\n' + entries.join('\n') + '\n' + ' '.repeat(indent) + '}';
  }

  static writeString(value: string): string {
    return '"' + value + '"';
  }

  static writeNumber(value: number, precision = 6): string {
    return String(Math.floor(value * 10 ** precision) / 10 ** precision);
  }

  static writeField(key: string, value: string, indent: number): string {
    return ' '.repeat(indent) + key + ' ' + value;
  }
}
