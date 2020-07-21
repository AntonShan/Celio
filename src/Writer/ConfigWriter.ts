import { AbstractWriter } from './AbstractWriter';
import { Serializer } from '../Serializer';
import { Dictionary } from 'src/types';

export abstract class ConfigWriter implements AbstractWriter {
  async write(type: string, config: Dictionary<any>): Promise<string> {
    try {
      return Promise.resolve(Serializer.stringify(config));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
