class InputSyntaxError extends Error {
  constructor (msg, line) {
    super()
    this.name = 'InputSyntaxError'
    this.message = `Syntax error at line ${line}`
  }
}

module.exports.InputSyntaxError = InputSyntaxError
