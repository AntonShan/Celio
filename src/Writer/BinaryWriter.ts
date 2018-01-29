import { AbstractWriter } from './AbstractWriter'

export abstract class BinaryWriter implements AbstractWriter {
  async write (type: string, items: any[]): Promise<Buffer> {
    try {
      return Promise.resolve(this.process(items))
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async abstract process (items: any[]): Promise<Buffer>
}
