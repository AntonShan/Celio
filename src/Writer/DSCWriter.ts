import { TextWriter } from './TextWriter';
import { Serializer } from '../Serializer';
import { DeepSkyObjectMeta } from 'src/types';

export class DSCWriter extends TextWriter {
  async writeHeader(value: DeepSkyObjectMeta): Promise<string> {
    const [catalogNumber, type, name] = await Promise.all([
      () => Promise.resolve(value.number !== null ? String(value.number) : ''),
      () => Promise.resolve(value.type !== null ? value.type : ''),
      async() => {
        return value.names !== null
          ? await Serializer.writeString(value.names.join(':'))
          : '';
      },
    ]);

    return [catalogNumber, type, name].join(' ');
  }
}
