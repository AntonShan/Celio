import * as fs from 'fs'
import AbstractWriter from './AbstractWriter'
import { Serializer } from '../Serializer'

abstract class ConfigWriter implements AbstractWriter {
  defaultWriteMode = {
    encoding: 'utf-8',
    mode: 0o644,
    flag: 'w'
  }

  write (fullPath: string, config: any, options = this.defaultWriteMode): Promise<void> {
    return new Promise((resolve, reject) => {
      const output = Serializer.stringify(config)

      fs.writeFile(fullPath, output, options, (error) => {
        if (error) {
          return reject(error)
        }

        return resolve()
      })
    })
  }
}

export default ConfigWriter
