const fs = require('fs')

fs.readdir(__dirname, (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  data
    .filter(f => f !== 'index.js')
    .map(f => './' + f)
    .map(p => require(p))
    .forEach(t => t())
})
