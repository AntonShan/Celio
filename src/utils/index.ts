import { ConfigurationValue } from 'src/types';

export function isObject(value: ConfigurationValue): boolean {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

export function isArray(value: ConfigurationValue): boolean {
  return Array.isArray(value);
}

export function isNumber(value: ConfigurationValue): boolean {
  return typeof value === 'number';
}

export function isString(value: ConfigurationValue): boolean {
  return typeof value === 'string';
}
