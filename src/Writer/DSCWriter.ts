import TextWriter from './TextWriter'
import { Serializer } from '../Serializer'

class DSCWriter extends TextWriter {
  writeHeader (value: any): string {
    const catalogNumber = value.number !== null ? String(value.number) : ''
    const type = value.type !== null ? value.type : ''
    const name = value.names !== null ? Serializer.writeString(value.names.join(':')) : ''
    return [catalogNumber, type, name].join(' ')
  }
}

export default DSCWriter
