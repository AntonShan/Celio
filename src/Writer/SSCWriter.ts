import TextWriter from './TextWriter'
import { Serializer } from '../Serializer'

class SSCWriter extends TextWriter {
  writeHeader (value: any): string {
    const mode = (value.mode !== null && value.modeSet) ? value.mode : ''
    const type = (value.type !== null && value.typeSet) ? value.type : ''
    const names = value.names !== null ? Serializer.writeString(value.names.join(':')) : ''
    const parentName = value.pathToParent !== null ? Serializer.writeString(value.pathToParent.join('/')) : ''
    return [mode, type, names, parentName].join(' ').trim()
  }
}

export default SSCWriter
