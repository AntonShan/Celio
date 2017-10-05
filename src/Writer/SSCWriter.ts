import TextWriter from './TextWriter'

class SSCWriter extends TextWriter {
  writeHeader (value: any): string {
    const mode = value.mode !== null ? value.mode : ''
    const type = value.type !== null ? value.type : ''
    const name = value.name !== null ? this.writeString(value.name) : ''
    const parentName = value.name !== null ? this.writeString(value.parentName) : ''
    return [mode, type, name, parentName].join(' ')
  }
}

export default SSCWriter
