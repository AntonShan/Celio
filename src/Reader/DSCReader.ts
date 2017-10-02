import TokenBasedReader from './TokenBasedReader'
import { NotImplementedError } from '../Exceptions'

class DSCReader extends TokenBasedReader {
  read (): any[] {
    throw new NotImplementedError(`.dsc reader isn't implemented yet`)
  }

  write (): void {}
}

export default DSCReader
