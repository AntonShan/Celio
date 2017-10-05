@include "common.ne"

CONFIG -> CONFIG_KEYWORD CONFIG_DESCRIPTION {% ([keyword, params]) => {
  debugger
  return params
} %}

CONFIG_KEYWORD -> WS:* %CONFIG_KEYWORD WS:* {% ([keyword]) => keyword[0] %}

CONFIG_DESCRIPTION -> GROUP WS:* {% ([properties]) => properties %}
