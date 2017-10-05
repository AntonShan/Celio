{%
  const moo = require('moo')

  const lexer = moo.compile({
		%IA0_LUM_CLASS: 'Ia-0',
    %IA_LUM_CLASS: 'Ia',
    %IB_LUM_CLASS: 'Ib',
    %II_LUM_CLASS: 'II',
    %III_LUM_CLASS: 'III',
    %IV_LUM_CLASS: 'IV',
    %V_LUM_CLASS: 'V',
    %VI_LUM_CLASS: 'VI',
		CLASS_O: 'O',
		CLASS_B: 'B',
		CLASS_A: 'A',
		CLASS_F: 'F',
		CLASS_G: 'G',
		CLASS_K: 'K',
		CLASS_M: 'M',
		CLASS_R: 'R',
		CLASS_S: 'S',
		CLASS_N: 'N',
		CLASS_WC: 'WC',
		CLASS_WN: 'WN',
		CLASS_Unknown: '?',
		CLASS_L: 'L',
		CLASS_T: 'T',
		CLASS_C: 'C',
		CLASS_DA: 'DA',
		CLASS_DB: 'DB',
		CLASS_DC: 'DC',
		CLASS_DO: 'DO',
		CLASS_DQ: 'DQ',
		CLASS_DZ: 'DZ',
		CLASS_D: 'D',
		CLASS_DX: 'DX',
  })
%}

@lexer lexer

STAR_TYPE -> STELLAR_CLASS NORMAL_STAR_SUBCLASS LUM_CLASS {%
	([starType, stellarClass, subClass, lumClass]) => {

	}
%}

SPEC_CLASS -> NORMAL_STAR_CLASS {% id %}

LUM_CLASS -> %IA0_LUM_CLASS {% id %}
	| %IA_LUM_CLASS {% id %}
	| %IB_LUM_CLASS {% id %}
	| %II_LUM_CLASS {% id %}
	| %III_LUM_CLASS {% id %}
	| %IV_LUM_CLASS {% id %}
	| %V_LUM_CLASS {% id %}
	| %VI_LUM_CLASS {% id %}

STELLAR_CLASS -> %Q_CLASS {% id %}
  | %X_CLASS {% id %}
  | %D_CLASS {% id %}
  | %S_SMALL_CLASS {% id %}
  | NORMAL_STAR_CLASS {% id %}

WOLF_RAYER_TYPE -> %W_CLASS %C_CLASS {% id %}
  | %W_CLASS %N_CLASS {% id %}

NORMAL_STAR_SUBCLASS -> %DIGIT {% id %}

NORMAL_STAR_CLASS -> %CLASS_O {% id %}
	| %CLASS_B {% id %}
	| %CLASS_A {% id %}
	| %CLASS_F {% id %}
	| %CLASS_G {% id %}
	| %CLASS_K {% id %}
	| %CLASS_M {% id %}
	| %CLASS_R {% id %}
	| %CLASS_S {% id %}
	| %CLASS_N {% id %}
	| %CLASS_WC {% id %}
	| %CLASS_WN {% id %}
	| %CLASS_Unknown {% id %}
	| %CLASS_L {% id %}
	| %CLASS_T {% id %}
	| %CLASS_C {% id %}
	| %CLASS_DA {% id %}
	| %CLASS_DB {% id %}
	| %CLASS_DC {% id %}
	| %CLASS_DO {% id %}
	| %CLASS_DQ {% id %}
	| %CLASS_DZ {% id %}
	| %CLASS_D {% id %}
	| %CLASS_DX {% id %}
