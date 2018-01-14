interface AbstractReader {
  read (fileName: Buffer | string): Promise<any[]>
}

export default AbstractReader
