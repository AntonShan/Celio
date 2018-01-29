export function isObject (value: any): boolean {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

export function isArray (value: any): value is any[] {
  return Array.isArray(value)
}

export function isNumber (value: any): value is number {
  return typeof value === 'number'
}

export function isString (value: any): value is string {
  return typeof value === 'string'
}

export function reduce <T> (input: any): any[] {
  return Object.keys(input).reduce((acc, key) => {
    return [].concat(acc, input[key])
  }, [])
}
