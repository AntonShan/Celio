import { AbstractReader, DATReader, NearleyBasedReader } from '../Reader/index'
import Grammars from '../grammar'
import { FormatsChecker, FormatType } from '../FormatsChecker'

class Injector {
  static make (extension): AbstractReader {
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
}

export default Injector
