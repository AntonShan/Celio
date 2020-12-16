import { TextWriter } from './TextWriter';
import { Serializer } from '../Serializer';
import { StarObjectMeta } from 'src/types';

export class STCWriter extends TextWriter {
  async writeHeader(value: StarObjectMeta): Promise<string> {
    const mode = value.mode !== null ? value.mode : '';
    const type = value.type !== null ? value.type : '';
    const HIP = value.number !== null ? value.number : '';
    const names = value.names !== null ?
      await Serializer.writeString(value.names.join(':'))
      : '';

    return Promise.resolve([mode, type, HIP, names].join(' ').trim());
  }
}
