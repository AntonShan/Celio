import CFGParser from './cfgparser.ne';
import { Grammar, Parser } from 'nearley';
import { celestiaConfigRaw, celestiaConfig } from '../mocks/celestia.cfg';

describe('CFG parser', () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser(Grammar.fromCompiled(CFGParser));
  });

  it('Should pass with empty input', () => {
    expect(parser.feed('').results[0]).toBeUndefined();
  });

  it('Should pass with empty config', () => {
    expect(parser.feed('Configuration {}').results[0]).toEqual({});
  });

  it('Should parse Celestia config', () => {
    expect(parser.feed(celestiaConfigRaw).results[0]).toEqual(celestiaConfig);
  });
});
