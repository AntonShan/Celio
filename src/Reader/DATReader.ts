import { convert, decodeSpectralClass, Utils } from '../utils'

const FILE_HEADER = 'CELSTARS'
const VERSION = 0x0100
const uint8ToInt16 = convert('Uint8')('Int16')
const uint8ToUint16 = convert('Uint8')('Uint16')
const uint8ToUint32 = convert('Uint8')('Uint32')
const uint8ToFloat32 = convert('Uint8')('Float32')
const HEADER_OFFSET = 14

class DATReader {
  static read (data) {
    const byteArray = [...data]
    let starsInFile = 0

    const header = byteArray.slice(0, FILE_HEADER.length)
      .map(Utils.charOf)
      .join('')

    const version = uint8ToUint16(
      byteArray.slice(
        FILE_HEADER.length,
        FILE_HEADER.length + 2
      )
    )

    if (header !== FILE_HEADER) {
      throw new Error('Wrong file signature')
    } else if (version !== VERSION) {
      throw new Error('Wrong file version')
    } else {
      starsInFile = uint8ToUint32(byteArray.slice(
        FILE_HEADER.length + 2,
        FILE_HEADER.length + 6
      ))
    }

    let result = []
    let starNumber = 0
    while (starNumber < starsInFile) {
      let offset = HEADER_OFFSET + starNumber * 20
      let catalogNumber = uint8ToUint32(byteArray.slice(offset, offset + 4))
      let Distance = uint8ToFloat32(byteArray.slice(offset + 4, offset + 8))
      let RA = uint8ToFloat32(byteArray.slice(offset + 8, offset + 12))
      let Dec = uint8ToFloat32(byteArray.slice(offset + 12, offset + 16))
      let AbsMag = uint8ToInt16(byteArray.slice(offset + 16, offset + 18)) / 256.0
      let SpectralType = decodeSpectralClass(uint8ToUint16(byteArray.slice(offset + 18, offset + 20)))

      result.push({
        isStar: true,
        disposition: 'ModifyStar',
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
}

export default DATReader
