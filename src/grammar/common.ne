@{%
  const fromPairs = require('lodash/fromPairs')
  const moo = require('moo')

	function nuller(x) {return null; }

  const lexer = moo.compile({
    BOOLEAN: /true|false/,
    NUMBER: /[+-]?[0-9]+(?:\.[0-9]+)?(?:[eE][+-][0-9]+)?/,
    WORD: /[\w]+/,
    STRING: /\"(?:\\["\\]|[^\n"\\])+\"/,
    BRACE_L: '{',
    BRACE_R: '}',
    SQU_BRA_L: '[',
    SQU_BRA_R: ']',
    DQUOTE: '"',
    COMMENT: {
			match: /#.*?$/,
			lineBreaks: true
		},
    WS: {
    	match: /[\s]+/,
    	lineBreaks: true
		}
  })
%}
@lexer lexer
VALUE -> BOOLEAN
  | NUMBER
  | STRING
  | GROUP
  | ARRAY

GROUP -> %BRACE_L %WS:? GROUP_PROPERTY:* %BRACE_R
  {% data => fromPairs(data[2]) %}

GROUP_PROPERTY -> %WORD %WS VALUE %WS:?
  {% data => [ data[0], data[2][0] ] %}

ARRAY -> %SQU_BRA_L %WS:? ARRAY_ELEMENT:* %SQU_BRA_R
  {% data => data[2] %}

ARRAY_ELEMENT -> VALUE %WS:?
  {% data => data[0][0] %}

BOOLEAN -> %BOOLEAN {%
	(data, line, reject) => {
		if (data[0].value === 'true' || data[0].value === 'false') {
			if (data[0].value === 'true') {
				return true
			} else if (data[0].value === 'false') {
				return false
			}
		}
		return reject
	}
%}

WORD -> %WORD {% data => data[0].value %}

NUMBER -> %NUMBER {% data => parseFloat(data[0].value) %}

STRING -> %STRING {% data => data[0].value.split('"')[1] %}

DQSTRING -> %STRING {% data => data[0].value.split('"')[1] %}

COMMENT -> null | %COMMENT COMMENT {% nuller %}
