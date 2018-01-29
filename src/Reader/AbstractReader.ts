export interface AbstractReader {
  read (fileName: Buffer | string): Promise<any[]>
}
