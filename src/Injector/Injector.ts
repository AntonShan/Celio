import { AbstractReader, DATReader, NearleyBasedReader } from '../Reader';
import { AbstractWriter, STCWriter, SSCWriter, DSCWriter, CFGWriter, DATWriter } from '../Writer';
import { getGrammarForExtension } from '../grammar';
import { FormatsChecker, FormatType } from '../FormatsChecker';
import { BinaryExtension, TextExtension } from '../types';

class Injector {
  static makeReader(extension: TextExtension | BinaryExtension): AbstractReader {
    switch (FormatsChecker.formatType(extension)) {
      case FormatType.BINARY:
        return new DATReader();

      case FormatType.TEXT:
        return new NearleyBasedReader(getGrammarForExtension(extension as TextExtension));

      case FormatType.INCORRECT:
        throw new Error('Incorrect file format');
    }
  }

  static makeWriter(extension: string): AbstractWriter {
    switch (FormatsChecker.formatType(extension)) {
      case FormatType.BINARY:
        return new DATWriter();

      case FormatType.TEXT:
        switch (extension) {
          case TextExtension.STC:
            return new STCWriter();

          case TextExtension.SSC:
            return new SSCWriter();

          case TextExtension.DSC:
            return new DSCWriter();

          case TextExtension.CFG:
            return new CFGWriter();

          default:
            throw new Error('Incorrect file format');
        }

      case FormatType.INCORRECT:
        throw new Error('Incorrect file format');
    }
  }
}

export default Injector;
