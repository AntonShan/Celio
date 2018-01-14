import AbstractWriter from './AbstractWriter'

abstract class BinaryWriter implements AbstractWriter {
  write (type: string, items: any[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.process(items))
      } catch (error) {
        reject(error)
      }
    })
  }

  abstract process (items: any[]): Buffer
}

export default BinaryWriter
