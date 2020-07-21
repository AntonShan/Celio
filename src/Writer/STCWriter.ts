import { TextWriter } from './TextWriter';
import { Serializer } from '../Serializer';

export class STCWriter extends TextWriter {
  async writeHeader(value: any): Promise<string> {
    const mode = (value.mode !== null && value.modeSet) ? value.mode : '';
    const type = (value.type !== null && value.typeSet) ? value.type : '';
    const HIP = value.number !== null ? value.number : '';
    const names = (value.names !== null && value.nameSet) ?
      await Serializer.writeString(value.names.join(':'))
      : '';

    return Promise.resolve([mode, type, HIP, names].join(' ').trim());
  }
}
