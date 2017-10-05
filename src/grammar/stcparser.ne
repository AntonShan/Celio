@{%
  const validModes = ['Modify', 'Add', 'Replace']
  const validTypes = ['Star', 'Barycenter']

  const objectBlueprint = {
  	mode: 'Add',
  	type: 'Star',
  	name: null,
  	number: null,
  	properties: {}
  }
%}
@include "common.ne"

CATALOG -> STC_DEFINITION:* {% id %}

STC_DEFINITION -> WS:* STC_OBJECT_MODE:? STC_OBJECT_TYPE:? STC_HIP_NUMBER:? STC_NAME:? STC_PROPERTIES {%
  ([, mode, type, number, name, properties], l) => {
    if (number === null && name === null) {
      throw new Error(`Incorrect object definition at line ${l}`)
    }

    if (mode !== null && validModes.indexOf(mode) === -1) {
      throw new Error(`Wrong object creation mode "${mode}" at line ${l}`)
    }

    if (type !== null && validTypes.indexOf(type) === -1) {
      if (validModes.indexOf(type) !== -1) {
        mode = type
        type = null
      } else {
        throw new Error(`Wrong object type "${type}" at line ${l}`)
      }
    }

    return Object.assign(
      {},
      objectBlueprint,
      (type !== null ? { type } : {}),
      (mode !== null ? { mode } : {}),
      (name !== null ? { name } : {}),
      (number !== null ? { number } : {}),
      { properties }
    )
  }
%}

STC_PROPERTIES -> GROUP WS {% data => data[0] %}

STC_HIP_NUMBER -> NUMBER WS:* {% data => data[0] %}

STC_NAME -> STRING WS {% data => data[0] %}

STC_OBJECT_MODE -> %MODIFY_MODE WS {% data => data[0].value %}
  | %ADD_MODE WS {% data => data[0].value %}
  | %REPLACE_MODE WS {% data => data[0].value %}

STC_OBJECT_TYPE -> %STAR_TYPE WS {% data => data[0].value %}
  | %BARYCENTER_TYPE WS {% data => data[0].value %}
