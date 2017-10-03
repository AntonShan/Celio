@{%
  const objectBlueprint = {
  	mode: 'Add',
  	isStar: true,
  	name: '',
  	number: -1,
  	properties: {}
	}
%}
@include "src/grammar/common.ne"

CATALOG -> OBJECT_DEFINITION:* {% data => data[0] %}

OBJECT_DEFINITION -> (COMMENT):* (WORD %WS):? (WORD %WS):? (NUMBER %WS):? (DQSTRING %WS):? GROUP %WS:* {%
  ([comment, mode, type, number, name, properties,], l) => {
  	if (number === null && name === null) {
  		console.error(`Incorrect object definition at line ${l}`)
  		return reject
  	}

  	if (mode !== null && mode[0] !== 'Modify' && mode[0] !== 'Add' && mode[0] !== ' Replace') {
  		throw new Error(`Wrong object creation mode "${mode[0]}" at ${mode[1].line}:${mode[1].col}`)
		}

  	if (type !== null && type[0] !== 'Star' && type[0] !== 'Barycenter') {
  		throw new Error(`Wrong object type "${type[0]}" at ${type[1].line}:${type[1].col}`)
  	}

  	return Object.assign(
  		{},
  		objectBlueprint,
  		(type !== null ? { isStar: type[0] === 'Star' } : {}),
  		(mode !== null ? { mode: mode[0] } : {}),
			(name !== null ? { name: name[0] } : {}),
			(number !== null ? { number: number[0] } : {}),
			{ properties }
  	)
	}
%}

