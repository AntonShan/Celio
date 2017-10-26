import { decodeSpectralClass } from '../utils'
import AbstractReader from './AbstractReader'
import * as fs from 'fs'
import Constants from '../utils/Constants'

class DATReader implements AbstractReader {
  private static parse (data: Buffer): any[] {
    let starsInFile = 0

    const header = data.toString('utf-8', 0, Constants.FILE_HEADER.length)
    const version = data.readUInt16LE(Constants.FILE_HEADER.length)

    if (header !== Constants.FILE_HEADER) {
      throw new Error('Wrong file signature')
    } else if (version !== Constants.VERSION) {
      throw new Error('Wrong file version')
    } else {
      starsInFile = data.readUInt32LE(Constants.FILE_HEADER.length + 2)
    }

    let result = []
    let starNumber = 0
    while (starNumber < starsInFile) {
      let offset = Constants.HEADER_OFFSET + starNumber * 20
      let catalogNumber = data.readUInt32LE(offset)
      let Distance = data.readFloatLE(offset + 4)
      let RA = data.readFloatLE(offset + 8)
      let Dec = data.readFloatLE(offset + 12)
      let AbsMag = data.readInt16LE(offset + 16)
      let SpectralType = decodeSpectralClass(data.readUInt16LE(offset + 18))

      result.push({
        meta: {
          type: 'Star',
          mode: 'ModifyStar',
          number: catalogNumber
        },
        properties: {
          Distance,
          RA,
          Dec,
          AbsMag,
          SpectralType
        }
      })

      ++starNumber
    }
    return result
  }

  read (fileName): Promise<any[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, (error, data: Buffer) => {
        if (error) {
          return reject(error)
        }

        return resolve(DATReader.parse(data))
      })
    })
  }
}

export default DATReader
