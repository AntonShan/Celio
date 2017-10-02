// Converts Byte Array
// Correct types are:
// Int8, Uint8, Int16, Uint16, Int32, Uint32, Float32, Float64
// In other words all get/set methods from DataView class

const newDataView = (): DataView => new DataView(new ArrayBuffer(8))

const convert = (from: string): Function =>
  (to: string): Function =>
    (byteArray: number[]): number => {
      let view = byteArray.reverse().reduce((view, byte, i) => {
        view[`set${from}`](i, byte)
        return view
      }, newDataView())

      return view[`get${to}`](0)
    }

export default convert
