import AbstractWriter from './AbstractWriter'
import { Serializer } from '../Serializer'

abstract class ConfigWriter implements AbstractWriter {
  write (type: string, config: any): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        return resolve(Serializer.stringify(config))
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default ConfigWriter
