import ConfigWriter from './ConfigWriter'

class DSCWriter extends ConfigWriter {
  writeHeader (value: any): string {
    return 'Configuration '
  }
}

export default DSCWriter
