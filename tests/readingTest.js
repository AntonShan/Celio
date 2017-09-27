const Celio = require('../src/Celio/Celio')

const inputFileIndex = process.argv.indexOf('-f') + 1
if (inputFileIndex === 0) {
  process.exit(1)
}

let inputFile = process.argv[inputFileIndex]

Celio.read(inputFile).then(result => {
  console.dir(result)
})
