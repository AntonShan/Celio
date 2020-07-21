import { ObjectConfiguration } from 'src/types';

export abstract class AbstractReader {
  abstract read (fileName: Buffer | string): Promise<ObjectConfiguration[]>
}
