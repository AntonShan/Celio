interface AbstractWriter {
  write (fullPath: string, items: any[]): Promise<void>
}

export default AbstractWriter
