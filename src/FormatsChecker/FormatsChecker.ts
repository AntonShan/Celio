import { BinaryExtension, FormatType, TextExtension } from '../types';

export class FormatsChecker {
  private static readonly supportedFormats = {
    text: new Set([
      TextExtension.STC,
      TextExtension.SSC,
      TextExtension.DSC,
      TextExtension.CFG,
      ]),
    binary: new Set([
      BinaryExtension.DAT,
    ]),
  };

  static isCorrectExtension(extension: string): boolean {
    // @ts-ignore
    return FormatsChecker.supportedFormats.text.has(extension)
    // @ts-ignore
      || FormatsChecker.supportedFormats.binary.has(extension);
  }

  static formatType(extension: string): FormatType {
    if (!FormatsChecker.isCorrectExtension(extension)) {
      return FormatType.INCORRECT;
    }

    // @ts-ignore
    if (FormatsChecker.supportedFormats.text.has(extension)) {
      return FormatType.TEXT;
    } else {
      return FormatType.BINARY;
    }
  }
}
