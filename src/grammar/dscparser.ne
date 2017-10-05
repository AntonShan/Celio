@{%
  const dsoBlueprint = {
    type: null,
    names: [],
    number: null,
    properties: {
      RA: null,
      Dec: null,
      Distance: null,
      Radius: null,
      CoreRadius: null,
      KingConcentration: null,
      AbsMag: null,
      Axis: [],
      Angle: null,
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

DSC_OBJECT_TYPE -> %DSC_GALAXY_TYPE WS {% data => data[0].value %}
  | %DSC_GLOBULAR_TYPE WS {% data => data[0].value %}
  | %DSC_NEBULA_TYPE WS {% data => data[0].value %}
  | %DSC_OPEN_CLUSTER_TYPE WS {% data => data[0].value %}
