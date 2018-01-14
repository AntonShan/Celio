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
    fs.readFile(filepath, options, (error, data) => {
      return error
        ? reject(error)
        : resolve(data)
    })
  })
}

function writeFile (filePath, data, options = {}) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, options, (error) => {
      return error
        ? reject(error)
        : resolve()
    })
  })
}

async function readConfig () {
  try {
    const fileData = await readFile(configPath, {
      encoding: 'utf-8'
    })
    return await Celio.read(fileData, 'cfg')
  } catch (error) {
    console.log('Could not read configuration file')
    console.error(error)
  }
}

async function readCatalogs (list) {
  return await Promise.all(list.map(async file => {
    const fileContents = await readFile(join(celestiaPath, file), {
      encoding: 'utf-8'
    })

    return Celio.read(fileContents, extname(file).split('.')[1])
  }))
}

async function main () {
  const config = await readConfig()
  console.dir(config)

  return 42
  const catalogs = [
    // ...(config.StarCatalogs || []),
    // ...(config.SolarSystemCatalogs || []),
    ...(config.DeepSkyCatalogs || [])
  ]
  const catalogObjects = await readCatalogs(catalogs)
  console.dir(catalogObjects)
  await writeFile('catalogue.json', JSON.stringify(catalogObjects))
  console.log('write success')
}

main().catch(console.error)
