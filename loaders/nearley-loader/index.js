const path = require('path')
const loaderUtils = require('loader-utils')
const nearley = require('nearley')
const compile = require('nearley/lib/compile')
const generate = require('nearley/lib/generate')
const nearleyGrammar = require('nearley/lib/nearley-language-bootstrapped')

function compileGrammar (sourceCode, callback) {
  // Parse the grammar source into an AST
  const grammarParser = new nearley.Parser(nearleyGrammar)
  grammarParser.feed(sourceCode)
  const grammarAst = grammarParser.results[0]

  // Compile the AST into a set of rules
  const grammarInfoObject = compile(grammarAst, {})
  // Generate JavaScript code from the rules
  const output = generate(grammarInfoObject, 'grammar')
  callback(null, output)
}

module.exports = function (source) {
  return compileGrammar(source, this.async())
}
