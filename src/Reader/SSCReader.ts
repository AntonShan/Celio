import NearleyBasedReader from './NearleyBasedReader'
import * as parser from '../grammar/sscparser.ne'

class SSCReader extends NearleyBasedReader {
  constructor () {
    super(parser)
  }
}

export default SSCReader
