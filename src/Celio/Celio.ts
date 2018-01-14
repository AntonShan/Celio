import { Injector } from '../Injector'

export class Celio {
  static read (buffer: Buffer, type: string): Promise<any[]> {
    const Reader = Injector.makeReader(type)

    return Reader.read(buffer)
  }

  static write (type: string, items: any[]): Promise<Buffer | string> {
    const Writer = Injector.makeWriter(type)

    return Writer.write(type, items)
  }
}
