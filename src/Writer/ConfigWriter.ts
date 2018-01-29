import { AbstractWriter } from './AbstractWriter'
import { Serializer } from '../Serializer'

export abstract class ConfigWriter implements AbstractWriter {
  async write (type: string, config: any): Promise<string> {
    try {
      return Promise.resolve(Serializer.stringify(config))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
