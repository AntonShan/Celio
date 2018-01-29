import { decodeSpectralClass } from '../SpectralTools'
import { AbstractReader } from './AbstractReader'
import { HEADER_OFFSET, VERSION, FILE_HEADER } from '../Meta'
import { Buffer } from 'buffer/'

export class DATReader implements AbstractReader {
  private static parse (data: Buffer): any[] {
    const header = data.toString('utf-8', 0, FILE_HEADER.length)
    const version = data.readUInt16LE(FILE_HEADER.length)

    if (header !== FILE_HEADER) {
      throw new Error('Wrong file signature')
    } else if (version !== VERSION) {
      throw new Error('Wrong file version')
    }

    const starsInFile = data.readUInt32LE(FILE_HEADER.length + 2)

    let result = []
    let starNumber = 0
    while (starNumber < starsInFile) {
      const offset = HEADER_OFFSET + starNumber * 20
      const catalogNumber = data.readUInt32LE(offset)
      const Distance = data.readFloatLE(offset + 4)
      const RA = data.readFloatLE(offset + 8)
      const Dec = data.readFloatLE(offset + 12)
      const AbsMag = data.readInt16LE(offset + 16)
      const SpectralType = decodeSpectralClass(data.readUInt16LE(offset + 18))

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

  async read (buffer: Buffer): Promise<any[]> {
    try {
      return Promise.resolve(DATReader.parse(buffer))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
