import { CompiledRules } from 'nearley';
import CFGGrammar from './cfgparser.ne';
import DSCGrammar from './dscparser.ne';
import SSCGrammar from './sscparser.ne';
import STCGrammar from './stcparser.ne';
import { TextExtension } from '../types';

export function getGrammarForExtension(
  extension: TextExtension,
): CompiledRules {
  switch (extension) {
    case TextExtension.CFG:
      return CFGGrammar;
    case TextExtension.STC:
      return SSCGrammar;
    case TextExtension.SSC:
      return SSCGrammar;
    case TextExtension.DSC:
      return DSCGrammar;
  }
}

export default {
  CFGGrammar,
  DSCGrammar,
  SSCGrammar,
  STCGrammar,
};
