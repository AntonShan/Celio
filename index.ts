import { Celio } from './src/Celio'

const objectsToWrite = [
  {
    mode: 'Add',
    type: 'Star',
    name: null,
    number: 88522,
    properties:
      {
        RA: 271.15565,
        Dec: 1.9190071,
        Distance: 5800,
        SpectralType: 'B0III',
        AppMag: 6.15
      }
  },
  {
    mode: 'Add',
    type: 'Star',
    name: null,
    number: 89341,
    properties:
      {
        RA: 273.44086939,
        Dec: -21.05883052,
        Distance: 4000,
        AppMag: 3.84,
        SpectralType: 'B2III:'
      }
  },
  {
    mode: 'Add',
    type: 'Star',
    name: null,
    number: 89439,
    properties:
      {
        RA: 273.80377253,
        Dec: -20.72826682,
        Distance: 4000,
        AppMag: 5.29,
        SpectralType: 'B0/1Ia/ab'
      }
  }
]

const inputFileParamIndex = process.argv.indexOf('-f')
const inputFile = process.argv[inputFileParamIndex + 1]

const outputFileParamIndex = process.argv.indexOf('-o')
const outputFile = process.argv[outputFileParamIndex + 1]

if (inputFileParamIndex !== -1) {
  Celio.read(inputFile)
    .catch(e => console.error(e))
    .then(console.dir)
}

if (outputFileParamIndex !== -1) {
  Celio.write(outputFile, objectsToWrite)
    .catch(console.error)
    .then(() => console.log('Written successfully'))
}
