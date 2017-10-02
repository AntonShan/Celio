abstract class Reader {
  abstract read (): any[]

  abstract write (filename: String): void
}

export default Reader
