import TokenBasedReader from './TokenBasedReader'
import { NotImplementedError } from '../Exceptions'

class SSCReader extends TokenBasedReader {
  read (): any[] {
    throw new NotImplementedError(`.ssc reader isn't implemented yet`)
  }

  write (): void {}
}

export default SSCReader
