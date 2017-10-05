@{%
  const dsoBlueprint = {
    type: '',
    names: [],
    number: -1,
    properties: {
      RA: 0,
      Dec: 0,
      Distance: 0,
      Radius: 0,
      CoreRadius: 0,
      KingConcentration: 0,
      AbsMag: 0,
      Axis: [0, 0, 0],
      Angle: 0,
      InfoURL: null
    }
  }

  let globalId = 0
%}
@include "common.ne"

DSC_CATALOG -> DSC_DEFINITION:* {% id %}

DSC_DEFINITION -> WS:* DSC_NUMBER:? DSC_OBJECT_TYPE DSC_NAME DSC_PROPERTIES {%
  ([, number, type, name, properties], l) => {
    if (number === null) {
      number = globalId++
    }

    const names = name.split(':')

    return Object.assign(
      {},
      dsoBlueprint,
      { type, number, names, properties }
    )
  }
%}

DSC_PROPERTIES -> GROUP WS {% data => data[0] %}

DSC_NUMBER -> NUMBER WS {% data => data[0] %}

DSC_NAME -> STRING WS {% data => data[0] %}

DSC_OBJECT_TYPE -> %GALAXY_TYPE WS {% data => data[0].value %}
  | %GLOBULAR_TYPE WS {% data => data[0].value %}
  | %NEBULA_TYPE WS {% data => data[0].value %}
  | %OPEN_CLUSTER_TYPE WS {% data => data[0].value %}
