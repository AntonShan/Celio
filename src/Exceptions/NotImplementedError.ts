class NotImplementedError extends Error {
  constructor (msg) {
    super()
    this.name = 'NotImplementedError'
    this.message = `Not Implemented Error: ${msg}`
  }
}

export default NotImplementedError
