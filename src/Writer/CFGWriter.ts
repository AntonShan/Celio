import ConfigWriter from './ConfigWriter'

class DSCWriter extends ConfigWriter {
  writeHeader (value: any): string {
    return ''
  }
}

export default DSCWriter
