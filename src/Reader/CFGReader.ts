import NearleyBasedReader from './NearleyBasedReader'
import * as parser from '../grammar/cfgparser.ne'

class CFGReader extends NearleyBasedReader {
  constructor () {
    super(parser)
  }
}

export default CFGReader
