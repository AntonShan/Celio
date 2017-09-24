const {Tokenizer} = require('../src/Tokenizer')
const {TokenType} = require('../src/Tokenizer/TokenType')
const {Test} = require('../src/Test')

const inputs = [
  '"a"',
  '1.0',
  '# Comment\n1.0'
].map(i => i.split('').map(s => s.charCodeAt(0)))

Test.create('String Token')
  .value(() => new Tokenizer(inputs[0]).nextToken())
  .equals(TokenType.TokenString)

Test.create('Number')
  .value(() => new Tokenizer(inputs[1]).nextToken())
  .equals(TokenType.TokenNumber)

Test.create('Comment then number')
  .value(() => new Tokenizer(inputs[2]).nextToken())
  .equals(TokenType.TokenNumber)
