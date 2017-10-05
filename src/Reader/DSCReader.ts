import NearleyBasedReader from './NearleyBasedReader'
import * as parser from '../grammar/dscparser.ne'

class STCReader extends NearleyBasedReader {
  constructor () {
    super(parser)
  }
}

export default STCReader
