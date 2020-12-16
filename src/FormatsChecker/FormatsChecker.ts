import { BinaryExtension, FormatType, TextExtension } from '../types';

export class FormatsChecker {
  private static readonly supportedFormats = {
    text: new Set([
      TextExtension.STC,
      TextExtension.SSC,
      TextExtension.DSC,
      TextExtension.CFG,
    ]),
    binary: new Set([BinaryExtension.DAT]),
  };

  static isCorrectExtension(extension: string): boolean {
    return (
      FormatsChecker.supportedFormats.text.has(extension as TextExtension) ||
      FormatsChecker.supportedFormats.binary.has(extension as BinaryExtension)
    );
  }

  static formatType(extension: string): FormatType {
    if (!FormatsChecker.isCorrectExtension(extension)) {
      return FormatType.INCORRECT;
    }

    if (FormatsChecker.supportedFormats.text.has(extension as TextExtension)) {
      return FormatType.TEXT;
    } else {
      return FormatType.BINARY;
    }
  }
}
