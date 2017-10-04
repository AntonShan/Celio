@{%
  const fromPairs = require('lodash/fromPairs')
  const moo = require('moo')

	const nuller = x => null

  const lexer = moo.compile({
  	CONFIG_KEYWORD: /Configuration\b/,
		ADD_MODE: /Add\b/,
		MODIFY_MODE: /Modify\b/,
		REPLACE_MODE: /Replace\b/,

		STAR_TYPE: /Star\b/,
		BARYCENTER_TYPE: /Barycenter\b/,

		TRUE: /true/,
		FALSE: /false/,

    NUMBER: /[+-]?[0-9]+(?:\.[0-9]+)?(?:[eE][+-][0-9]+)?/,
    WORD: /[\w]+/,
    STRING: /"(?:\\["\\]|[^\n"\\])*"/,
    BRACE_L: '{',
    BRACE_R: '}',
    SQU_BRA_L: '[',
    SQU_BRA_R: ']',
    DQUOTE: '"',
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

GROUP -> %BRACE_L WS:? GROUP_PROPERTY:* %BRACE_R
  {% data => fromPairs(data[2]) %}

GROUP_PROPERTY -> %WORD WS VALUE WS:?
  {% data => [ data[0], data[2][0] ] %}

ARRAY -> %SQU_BRA_L WS:? ARRAY_ELEMENT:* %SQU_BRA_R
  {% data => data[2] %}

ARRAY_ELEMENT -> VALUE WS:?
  {% data => data[0][0] %}

BOOLEAN -> %TRUE {% data => data[0].value %}
	| %FALSE {% data => data[0].value %}

WORD -> %WORD {% data => data[0].value %}

NUMBER -> %NUMBER {% data => parseFloat(data[0].value) %}

STRING -> %STRING {% data => data[0].value.split('"')[1] %}

WS -> %WS {% id %}