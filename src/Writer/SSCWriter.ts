import { TextWriter } from './TextWriter';
import { Serializer } from '../Serializer';
import { SolarSystemObjectMeta } from 'src/types';

export class SSCWriter extends TextWriter {
  async writeHeader(value: SolarSystemObjectMeta): Promise<string> {
    const [mode, type, names, parentName] = await Promise.all([
      () => Promise.resolve(value.mode !== null ? value.mode : ''),
      () => Promise.resolve(value.mode !== null ? value.mode : ''),
      async () => {
        return value.names !== null
          ? await Serializer.writeString(value.names.join(':'))
          : '';
      },
      async () => {
        return value.pathToParent !== null
          ? await Serializer.writeString(value.pathToParent.join('/'))
          : '';
      },
    ]);

    return [mode, type, names, parentName].join(' ').trim();
  }
}
