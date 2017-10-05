import { AbstractReader, DATReader, NearleyBasedReader } from '../Reader'
import { AbstractWriter, TextWriter, STCWriter } from '../Writer'
import Grammars from '../grammar'
import { FormatsChecker, FormatType } from '../FormatsChecker'

class Injector {
  static makeReader (extension: string): AbstractReader {
    switch (FormatsChecker.formatType(extension)) {
      case FormatType.BINARY:
        return new DATReader()

      case FormatType.TEXT:
        const Grammar = extension.toUpperCase() + 'Grammar'
        return new NearleyBasedReader(Grammars[Grammar])

      case FormatType.INCORRECT:
        throw new Error(`Incorrect file format`)
    }
  }

  static makeWriter (extension: string): AbstractWriter {
    // TODO: Имплементировать вывод в файл
    return new STCWriter()
  }
}

export default Injector
