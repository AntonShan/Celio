import { decodeSpectralClass } from '../SpectralTools'
import { AbstractReader } from './AbstractReader'
import { META } from '../utils'

export class DATReader implements AbstractReader {
  private static parse (data: Buffer): any[] {
    let starsInFile = 0

    const header = data.toString('utf-8', 0, META.FILE_HEADER.length)
    const version = data.readUInt16LE(META.FILE_HEADER.length)

    if (header !== META.FILE_HEADER) {
      throw new Error('Wrong file signature')
    } else if (version !== META.VERSION) {
      throw new Error('Wrong file version')
    } else {
      starsInFile = data.readUInt32LE(META.FILE_HEADER.length + 2)
    }

    let result = []
    let starNumber = 0
    while (starNumber < starsInFile) {
      let offset = META.HEADER_OFFSET + starNumber * 20
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

  read (buffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        return resolve(DATReader.parse(buffer))
      } catch (error) {
        reject(error)
      }
    })
  }
}
