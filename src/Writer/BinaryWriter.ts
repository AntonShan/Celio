import { AbstractWriter } from './AbstractWriter';
import { ConfigurationObject } from '../types';

export abstract class BinaryWriter implements AbstractWriter {
  async write(type: string, items: ConfigurationObject[]): Promise<Buffer> {
    try {
      return Promise.resolve(this.process(items));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  abstract async process(items: ConfigurationObject[]): Promise<Buffer>;
}
