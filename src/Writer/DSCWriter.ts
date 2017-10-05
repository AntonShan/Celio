import TextWriter from './TextWriter'

class DSCWriter extends TextWriter {
  writeHeader (value: any): string {
    const number = value.number !== null ? String(value.number): ''
    const type = value.type !== null ? value.type : ''
    const name = value.name !== null ? this.writeString(value.name) : ''
    return [number, type, name].join(' ')
  }
}

export default DSCWriter
