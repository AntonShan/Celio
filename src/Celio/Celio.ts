import * as path from 'path'
import { Injector } from '../Injector'

class Celio {
  static read (filePath: string): Promise<any[]> {
    const fullPath = path.resolve(filePath)
    const fileExtension = path.extname(fullPath)
    const type = fileExtension.split('.')[1]
    const Reader = Injector.makeReader(type)

    return Reader.read(fullPath)
  }

  static write (filePath: string, items: any[]): Promise<void> {
    const fileExtension = path.extname(filePath)
    const type = fileExtension.split('.')[1]
    return new Promise<void>(resolve => resolve())
  }
}

export default Celio
