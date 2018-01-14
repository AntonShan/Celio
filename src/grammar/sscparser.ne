@include "common.ne"

SSC_CATALOG -> SSC_DEFINITION:* {% id %}

SSC_DEFINITION -> WS:* SSC_OBJECT_MODE:? SSC_OBJECT_TYPE:? SSC_NAME SSC_PARENT_NAME SSC_PROPERTIES {%
  ([, mode = 'Add', type = 'Body', name, pathToParent, properties]) => {
    return {
      meta: {
        mode: mode !== null ? mode : 'Add',
        modeSet: mode !== null,
        type: type !== null ? type : 'Body',
        typeSet: type !== null,
        names: name.split(':'),
        pathToParent: pathToParent.split('/')
      },
      properties
    }
  }
%}

SSC_PROPERTIES -> GROUP WS {% data => data[0] %}

SSC_OBJECT_MODE -> %MODIFY_MODE WS {% data => data[0].value %}
  | %ADD_MODE WS {% data => data[0].value %}
  | %REPLACE_MODE WS {% data => data[0].value %}

SSC_PARENT_NAME -> STRING WS:* {% data => data[0] %}

SSC_NAME -> STRING WS:* {% data => data[0] %}

SSC_OBJECT_TYPE -> %SSC_BODY_TYPE WS {% data => data[0].value %}
  | %SSC_REF_POINT_TYPE WS {% data => data[0].value %}
  | %SSC_SURF_POINT_TYPE WS {% data => data[0].value %}
  | %SSC_ALT_SURFACE WS {% data => data[0].value %}
  | %SSC_LOCATION WS {% data => data[0].value %}
