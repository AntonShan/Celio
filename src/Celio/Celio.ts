import { Injector } from '../Injector';
import { BinaryExtension, TextExtension } from 'src/types';

export class Celio {
  static read(buffer: Buffer, type: TextExtension | BinaryExtension): Promise<never[]> {
    const Reader = Injector.makeReader(type);

    return Reader.read(buffer);
  }

  static write(type: string, items: never[]): Promise<Buffer | string> {
    const Writer = Injector.makeWriter(type);

    return Writer.write(type, items);
  }
}
