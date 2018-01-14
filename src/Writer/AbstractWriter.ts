interface AbstractWriter {
  write (type: string, items: any[]): Promise<Buffer | string>
}

export default AbstractWriter
