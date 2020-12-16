import { ConfigWriter } from './ConfigWriter';

export class CFGWriter extends ConfigWriter {
  writeHeader(): string {
    return 'Configuration ';
  }
}
