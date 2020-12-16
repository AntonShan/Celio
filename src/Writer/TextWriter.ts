import { AbstractWriter } from './AbstractWriter';
import { Serializer } from '../Serializer';
import { ConfigurationObject, ObjectMeta, SupportedExtension } from 'src/types';

export abstract class TextWriter implements AbstractWriter {
  async write(type: SupportedExtension, items: ConfigurationObject[]): Promise<string> {
    try {
      return this.transform(items);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async transform(items: ConfigurationObject[]): Promise<string> {
    const transformedItems = await Promise.all(items.map(item => this.transformItem(item)));

    return transformedItems.join('\n');
  }

  async transformItem(item: ConfigurationObject): Promise<string> {
    const [objectHeader, objectProperties] = await Promise.all([
      this.writeHeader(item.meta),
      Serializer.stringify(item.properties),
    ]);

    return objectHeader + ' ' + objectProperties + '\n';
  }

  async abstract writeHeader(value: ObjectMeta): Promise<string>
}
