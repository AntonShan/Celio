const reduce = function <T> (input: any): any[] {
  return Object.keys(input).reduce((acc, key) => {
    return [].concat(acc, input[key])
  }, [])
}

enum FormatType {
  TEXT,
  BINARY,
  INCORRECT
}

class FormatsChecker {
  private static _viableFormats = {
    text: ['stc', 'ssc', 'dsc', 'cfg'],
    binary: ['dat']
  }

  static get viableFormats (): string[] {
    return reduce(FormatsChecker._viableFormats)
  }

  static isCorrectExtension (extension: string): boolean {
    return FormatsChecker.viableFormats.indexOf(extension.toLowerCase()) !== -1
  }

  static formatType (extension: string): FormatType {
    if (!FormatsChecker.isCorrectExtension(extension)) {
      return FormatType.INCORRECT
    }

    if (FormatsChecker._viableFormats.text.indexOf(extension) !== -1) {
      return FormatType.TEXT
    } else {
      return FormatType.BINARY
    }
  }
}

export {
  FormatsChecker,
  FormatType
}
