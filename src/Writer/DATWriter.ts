import BinaryWriter from './BinaryWriter'
import Constants from '../utils/Constants'
import { encodeSpectralClass } from '../utils'

class DATWriter extends BinaryWriter {
  process (items: any[]): Buffer {
    const header = Constants.FILE_HEADER
    const version = Constants.VERSION   // 2 bytes
    const itemsCount = items.length     // 4 bytes
    const headerOffset = header.length + 6
    const buffer = Buffer.alloc(headerOffset + itemsCount * 20)
    buffer.write(header, 0)
    buffer.writeUInt16LE(version, Constants.FILE_HEADER.length)
    buffer.writeUInt32LE(itemsCount, Constants.FILE_HEADER.length + 2)

    let offset = headerOffset

    for (let i = 0; i < itemsCount; ++i) {
      buffer.writeUInt32LE(items[i].meta.number, offset, true)
      buffer.writeFloatLE(items[i].properties.Distance, offset + 4, true)
      buffer.writeFloatLE(items[i].properties.RA, offset + 8, true)
      buffer.writeFloatLE(items[i].properties.Dec, offset + 12, true)
      buffer.writeInt16LE(items[i].properties.AbsMag, offset + 16, true)
      buffer.writeUInt16LE(encodeSpectralClass(items[i].properties.SpectralType), offset + 18, true)
      offset += 20
    }
    return buffer
  }
}

export default DATWriter
