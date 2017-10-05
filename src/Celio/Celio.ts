import * as path from 'path'
import { Injector } from '../Injector'

class Celio {
  static read (filePath: string): Promise<any[]> {
    const fullPath = path.resolve(filePath)
    const fileExtension = path.extname(fullPath)

    const type = fileExtension.split('.')[1]
    const Reader = Injector.make(type)
    return Reader.read(fullPath)
  }

  static write (filePath: string, items: any[]): Promise<void> {
    return new Promise<void>(resolve => resolve())
  }
}

export default Celio
