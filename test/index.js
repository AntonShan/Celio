const {resolve, join, extname} = require('path')
const fs = require('fs')
const {Celio} = require('../dist/celio.esm')

const celestiaPath = `C:\\Program Files (x86)\\Celestia`
const configPath = resolve(join(celestiaPath, 'celestia.cfg'))

function readFile (filepath, options = {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, options, (error, data) => error ? reject(error) : resolve(data))
  })
}

function writeFile (filePath, data, options = {}) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, options, (error) => error ? reject(error) : resolve())
  })
}

async function readConfig () {
  const fileData = await readFile(configPath, {
    encoding: 'utf-8'
  })
  return Celio.read(fileData, 'cfg')
}

async function readCatalogs (list) {
  return await Promise.all(list.map(file => {
    return readFile(join(celestiaPath, file), {
      encoding: 'utf-8'
    }).then(function (fileContents) {
      return Celio.read(fileContents, extname(file).split('.')[1])
    }).catch(function (error) {
      console.error(`Unable to read file: ${file}\nMessage: ${error.message}`)
      throw new Error(error)
    })
  }))
}

async function main () {
  const config = await readConfig()
  console.dir(config)

  const catalogs = [
    ...(config.StarCatalogs || []),
    ...(config.SolarSystemCatalogs || []),
    ...(config.DeepSkyCatalogs || [])
  ]
  const catalogObjects = await readCatalogs(catalogs)
  console.log(`Successfully read ${catalogObjects.length} items`)
}

main().catch(console.error)
