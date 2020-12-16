@{%
  let globalId = 0
%}
@include "./src/grammar/common.ne"

DSC_CATALOG -> DSC_DEFINITION:* {% id %}

DSC_DEFINITION -> WS:* DSC_NUMBER:? DSC_OBJECT_TYPE DSC_NAME DSC_PROPERTIES {%
  ([, number, type, name, properties]) => {
    if (number === null) {
      number = globalId++
    }

    return {
      meta: {
        type,
        number,
        names: name.split(':')
      },
      properties
    }
  }
%}

DSC_PROPERTIES -> GROUP WS {% data => data[0] %}

DSC_NUMBER -> NUMBER WS {% data => data[0] %}

DSC_NAME -> STRING WS {% data => data[0] %}

DSC_OBJECT_TYPE -> %DSC_GALAXY_TYPE WS {% data => data[0].value %}
  | %DSC_GLOBULAR_TYPE WS {% data => data[0].value %}
  | %DSC_NEBULA_TYPE WS {% data => data[0].value %}
  | %DSC_OPEN_CLUSTER_TYPE WS {% data => data[0].value %}
