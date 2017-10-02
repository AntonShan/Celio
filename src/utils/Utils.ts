class Utils {
  static charOf (c: number): string {
    return c !== void 0
      ? String.fromCharCode(c)
      : ''
  }

  static codeOf (c: string): number {
    return c.charCodeAt(0)
  }

  static fromByteArray (a: number[]): number {
    return a.reduceRight((acc, v, i) => {
      return acc + (v * (256 ** i))
    }, 0)
  }

  static itoa (c: number, radix: number = 10): string {
    return c.toString(radix)
  }

  static atoi (c: string, radix: number = 10): number {
    return parseInt(c, radix)
  }

  static isXDigit (c: string): boolean {
    return c.match(/[\da-zA-Z]/) !== null
  }

  static isDigit (c: string): boolean {
    return c !== void 0
      ? c.match(/[\d]/) !== null
      : false
  }

  static isAlpha (c: string): boolean {
    return c !== void 0
      ? c.match(/[a-zA-Z]/) !== null
      : false
  }

  static isSpace (c: string): boolean {
    return c !== void 0
      ? c.match(/\s/) !== null
      : false
  }

  static isSep (c: string): boolean {
    return !Utils.isDigit(c) && !Utils.isAlpha(c) && c !== '.'
  }
}

export default Utils
