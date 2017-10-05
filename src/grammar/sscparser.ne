@{%
  const sscBlueprint = {
    mode: null,
    type: null,
    primaryName: null,
    parentName: null,
    names: [],
    properties: {}
  }
%}
@include "common.ne"

SSC_CATALOG -> SSC_DEFINITION:* {% id %}

SSC_DEFINITION -> WS:* SSC_OBJECT_MODE:? SSC_OBJECT_TYPE:? SSC_NAME SSC_PARENT_NAME SSC_PROPERTIES {%
  ([, mode = 'Add', type = 'Body', name, parentName, properties], l) => {
    const names = name.split(':')

    return Object.assign(
      {},
      sscBlueprint,
      { mode, type, names, parentName, properties }
    )
  }
%}

SSC_PROPERTIES -> GROUP WS {% data => data[0] %}

SSC_OBJECT_MODE -> %MODIFY_MODE WS {% data => data[0].value %}
  | %ADD_MODE WS {% data => data[0].value %}
  | %REPLACE_MODE WS {% data => data[0].value %}

SSC_PARENT_NAME -> STRING WS {% data => data[0] %}

SSC_NAME -> STRING WS {% data => data[0] %}

SSC_OBJECT_TYPE -> %SSC_BODY_TYPE WS {% data => data[0].value %}
  | %SSC_REF_POINT_TYPE WS {% data => data[0].value %}
  | %SSC_SURF_POINT_TYPE WS {% data => data[0].value %}
  | %SSC_ALT_SURFACE WS {% data => data[0].value %}
  | %SSC_LOCATION WS {% data => data[0].value %}
