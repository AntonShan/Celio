import { AbstractReader, DATReader, NearleyBasedReader } from '../Reader'
import { AbstractWriter, STCWriter, SSCWriter, DSCWriter, CFGWriter, DATWriter } from '../Writer'
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
    switch (FormatsChecker.formatType(extension)) {
      case FormatType.BINARY:
        return new DATWriter()

      case FormatType.TEXT:
        switch (extension) {
          case 'stc':
            return new STCWriter()

          case 'ssc':
            return new SSCWriter()

          case 'dsc':
            return new DSCWriter()

          case 'cfg':
            return new CFGWriter()

          default:
            throw new Error(`Incorrect file format`)
        }

      case FormatType.INCORRECT:
        throw new Error(`Incorrect file format`)
    }
  }
}

export default Injector
