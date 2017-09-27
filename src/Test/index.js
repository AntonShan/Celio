const chalk = require('chalk')

const testFailed = ({title, result, expectedResult}) => `Test: ${title}
  ${chalk.red('Failed')}
      expected: ${expectedResult}
      result: ${result}
`

const testFailedWithException = ({title, exception}) => `Test: ${title}
  ${chalk.red('Failed with exception ' + exception.name)}
      ${chalk.red('message: ' + exception.message)}
      ${chalk.red(exception.stack)}
`

const testSucceed = ({title, result, expectedResult}) => `Test: ${title}
  ${chalk.green('Succeed')}`

class Test {
  static create (title) {
    const newTest = new Test()
    newTest.title = title
    newTest.result = null
    newTest.expectedResult = null
    newTest.exception = null

    return newTest
  }

  value (result) {
    if (typeof result === 'function') {
      try {
        this.result = result()
      } catch (e) {
        this.exception = e
      }
    } else {
      this.result = result
    }
    return this
  }

  equals (expectedResult) {
    let reporter

    this.expectedResult = expectedResult

    if (this.exception) {
      reporter = testFailedWithException
    } else if (this.expectedResult instanceof Array) {
      if (!(this.expectedResult instanceof Array) &&
        this.result.filter((v, i) => this.result[i] !== v).length > 0
      ) {
        reporter = testFailed
      } else {
        reporter = testSucceed
      }
    } else if (this.result !== this.expectedResult) {
      reporter = testFailed
    } else {
      reporter = testSucceed
    }

    console.log(reporter(this))
  }
}

module.exports.Test = Test
