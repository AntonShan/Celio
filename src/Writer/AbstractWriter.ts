export interface AbstractWriter {
  write (type: string, items: any[]): Promise<Buffer | string>
}
