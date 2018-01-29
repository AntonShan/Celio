import { TextWriter } from './TextWriter'
import { Serializer } from '../Serializer'

export class SSCWriter extends TextWriter {
  async writeHeader (value: any): Promise<string> {
    const [mode, type, names, parentName] = await Promise.all([
      () => Promise.resolve((value.mode !== null && value.modeSet) ? value.mode : ''),
      () => Promise.resolve((value.mode !== null && value.modeSet) ? value.mode : ''),
      async () => {
        return value.names !== null
          ? await Serializer.writeString(value.names.join(':'))
          : ''
      },
      async () => {
        return value.pathToParent !== null
          ? await Serializer.writeString(value.pathToParent.join('/'))
          : ''
      }
    ])

    return [mode, type, names, parentName].join(' ').trim()
  }
}
