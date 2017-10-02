import Reader from './Reader'
import { convert, decodeSpectralClass, Utils } from '../utils'

const FILE_HEADER = 'CELSTARS'
const VERSION = 0x0100
const uint8ToInt16 = convert('Uint8')('Int16')
const uint8ToUint16 = convert('Uint8')('Uint16')
const uint8ToUint32 = convert('Uint8')('Uint32')
const uint8ToFloat32 = convert('Uint8')('Float32')
const HEADER_OFFSET = 14

class DATReader implements Reader {
  data: number[]
  starsInFile: number

  constructor (data) {
    const header = [...data].slice(0, FILE_HEADER.length)
      .map(Utils.charOf)
      .join('')

    const version = uint8ToUint16(
      data.slice(
        FILE_HEADER.length,
        FILE_HEADER.length + 2
      )
    )

    if (header !== FILE_HEADER) {
      throw new Error('Wrong file signature')
    } else if (version !== VERSION) {
      throw new Error('Wrong file version')
    } else {
      this.data = [...data]
      this.starsInFile = uint8ToUint32(data.slice(
        FILE_HEADER.length + 2,
        FILE_HEADER.length + 6
      ))
    }
  }

  read () {
    let result = []
    let starNumber = 0
    while (starNumber < this.starsInFile) {
      let offset = HEADER_OFFSET + starNumber * 20
      let catalogNumber = uint8ToUint32(this.data.slice(offset, offset + 4))
      let Distance = uint8ToFloat32(this.data.slice(offset + 4, offset + 8))
      let RA = uint8ToFloat32(this.data.slice(offset + 8, offset + 12))
      let Dec = uint8ToFloat32(this.data.slice(offset + 12, offset + 16))
      let AbsMag = uint8ToInt16(this.data.slice(offset + 16, offset + 18)) / 256.0
      let SpectralType = decodeSpectralClass(uint8ToUint16(this.data.slice(offset + 18, offset + 20)))

      result.push({
        isStar: true,
        disposition: 'ModifyStar', // TODO: Разобраться с импортами и импортировать enum из STCReader
        catalogNumber,
        params: {
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

  write () {}
}

export default DATReader
