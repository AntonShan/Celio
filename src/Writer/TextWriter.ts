import { AbstractWriter } from './AbstractWriter';
import { Serializer } from '../Serializer';
import { UnknownObject } from 'src/types';

export abstract class TextWriter implements AbstractWriter {
  async write(type: string, items: never[]): Promise<string> {
    try {
      return this.transform(items);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async transform(items: never[]): Promise<string> {
    const transformedItems = await Promise.all(items.map(item => this.transformItem(item)));

    return transformedItems.join('\n');
  }

  async transformItem(item: UnknownObject): Promise<string> {
    const [objectHeader, objectProperties] = await Promise.all([
      this.writeHeader(item.meta),
      Serializer.stringify(item.properties),
    ]);

    return objectHeader + ' ' + objectProperties + '\n';
  }

  async abstract writeHeader(value: UnknownObject): Promise<string>
}
