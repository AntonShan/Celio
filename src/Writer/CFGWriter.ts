import TextWriter from './TextWriter'

class DSCWriter extends TextWriter {
  writeHeader (value: any): string {
    return ''
  }
}

export default DSCWriter
