@include "./src/grammar/common.ne"

CONFIG -> WS:* CONFIG_KEYWORD CONFIG_DESCRIPTION {% ([_ws, keyword, params]) => params %}

CONFIG_KEYWORD -> WS:* %CONFIG_KEYWORD WS:* {% ([keyword]) => keyword[0] %}

CONFIG_DESCRIPTION -> GROUP WS:* {% ([properties]) => properties %}
