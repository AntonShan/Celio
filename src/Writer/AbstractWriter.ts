interface AbstractWriter {
  write (fullPath: string, items: any[], options?: any): Promise<void>
}

export default AbstractWriter
