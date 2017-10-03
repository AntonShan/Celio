import NearleyBasedReader from './NearleyBasedReader'
import parser from '../grammar/stcparser.ne'

class STCReader extends NearleyBasedReader {
  constructor () {
    super(parser)
  }
}

export default STCReader
