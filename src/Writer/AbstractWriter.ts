export interface AbstractWriter {
  write (type: string, items: never[]): Promise<Buffer | string>
}
