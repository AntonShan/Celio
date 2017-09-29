const fs = require('fs')
const path = require('path')

class Celio {
  constructor (inputType, data) {
    this.reader = null

    if (inputType.startsWith('.')) {
      let type = inputType.split('.')[1].toUpperCase()
      const Reader = require(`../Reader/${type}Reader`)
      this.reader = new Reader(data)
    } else {
      throw new Error('Unknown file error')
    }
  }

  static read (filePath) {
    return new Promise(function (resolve, reject) {
      try {
        let fullPath = path.resolve(filePath)

        fs.readFile(fullPath, function (error, data) {
          if (error) {
            return reject(error)
          }

          const celio = new Celio(path.extname(fullPath), data)

          resolve(celio.reader.read())
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}

module.exports = Celio
