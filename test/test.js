const {resolve, join, extname} = require('path')
const fs = require('fs')
const {Celio} = require('../dist/bundle')
const Datastore = require('nedb')

const database = new Datastore({
  autoload: true
})

const celestiaPath = `D:\\Program Files (x86)\\Celestia`
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
  return await Promise.all(list.map(async file => {
    const fileContents = await readFile(join(celestiaPath, file), {
      encoding: 'utf-8'
    })

    return Celio.read(fileContents, extname(file).split('.')[1]).catch((error) => {
      console.error(`Unable to read file: ${file}\nMessage: ${error.message}`)
      return void 0
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
  await writeFile('catalog.json', JSON.stringify(catalogObjects))
  console.log('write success')
}

main().catch(console.error)
