import { AbstractWriter } from './AbstractWriter';
import { Serializer } from '../Serializer';
import { ConfigurationObject, ConfigurationValue, SupportedExtension } from 'src/types';

export abstract class ConfigWriter implements AbstractWriter {
  async write(type: SupportedExtension, config: ConfigurationObject[]): Promise<string> {
    try {
      return Promise.resolve(Serializer.stringify(config[0].properties as ConfigurationValue));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
