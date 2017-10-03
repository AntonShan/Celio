import { Celio } from './src/Celio'

const paramIndex = process.argv.indexOf('-f')
const inputFile = process.argv[paramIndex + 1]

Celio.read(inputFile)
  .catch(e => console.error(e))
  .then(console.dir)
