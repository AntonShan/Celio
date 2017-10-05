interface AbstractReader {
  read (fileName: string): Promise<any[]>
}

export default AbstractReader
