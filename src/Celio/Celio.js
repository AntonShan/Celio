const fs = require('fs')
const path = require('path')

const {Reader} = require('../Reader/Reader')

class Celio {
  static read (filePath) {
    return new Promise(function (resolve, reject) {
      try {
        let fullPath = path.resolve(filePath)

        fs.readFile(fullPath, function (error, data) {
          if (error) {
            return reject(error)
          }

          const reader = new Reader({
            type: path.extname(fullPath),
            data
          })

          resolve(reader.read())
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}

module.exports = Celio
