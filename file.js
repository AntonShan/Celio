const {Celio} = require('./dist/bundle')

Celio.read('../revised.stc').then(items => console.dir(items))
