import { ConfigWriter } from './ConfigWriter'

export class CFGWriter extends ConfigWriter {
  writeHeader (value: any): string {
    return 'Configuration '
  }
}
