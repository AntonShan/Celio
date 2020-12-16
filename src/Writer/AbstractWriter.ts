import { ConfigurationObject } from 'src/types';

export interface AbstractWriter {
  write(type: string, items: ConfigurationObject[]): Promise<Buffer | string>;
}
