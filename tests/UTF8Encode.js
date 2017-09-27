const {UTF8Encode} = require('../src/utils/utf8')
const {Test} = require('../src/Test')

const inputs = {
  inputs: [],
  expectations: []
}

for (let i = 0; i < 65536; ++i) {
  inputs.inputs.push(String.fromCharCode(i).charCodeAt(0))
  inputs.expectations.push(String.fromCharCode(i))
}

module.exports = () => {
  Test.create('Unicode decode')
    .value(() => UTF8Encode(inputs))
    .equals(inputs.expectations)
}
