class NotImplementedError extends Error {
  constructor (msg) {
    super()
    this.name = 'NotImplementedError'
    this.message = `Not Implemented Error: ${msg}`
  }
}

module.exports.NotImplementedError = NotImplementedError
