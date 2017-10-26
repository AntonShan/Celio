import TextWriter from './TextWriter'
import { Serializer } from '../Serializer'

class STCWriter extends TextWriter {
  writeHeader (value: any): string {
    const mode = (value.mode !== null && value.modeSet) ? value.mode : ''
    const type = (value.type !== null && value.typeSet) ? value.type : ''
    const HIP = value.number !== null ? value.number : ''
    const names = (value.names !== null && value.nameSet) ? Serializer.writeString(value.names.join(':')) : ''
    return [mode, type, HIP, names].join(' ').trim()
  }
}

export default STCWriter
