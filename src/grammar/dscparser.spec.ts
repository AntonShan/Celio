import DSCParser from './dscparser.ne';
import { Grammar, Parser } from 'nearley';
import {
  globularData,
  globularRawData,
  milkyWayData,
  milkyWayRawData,
  multipleNamesData,
  multipleNamesRawData,
} from '../mocks/dscparser';

describe('DSC parser', () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser(Grammar.fromCompiled(DSCParser));
  });

  it('Should parse galaxy Milky Way data', () => {
    expect(parser.feed(milkyWayRawData).results[0][0]).toEqual(milkyWayData);
  });

  it('Should parse galaxy with multiple names', () => {
    expect(parser.feed(multipleNamesRawData).results[0][0]).toEqual(
      multipleNamesData,
    );
  });

  it('Should parse globular object data', () => {
    expect(parser.feed(globularRawData).results[0][0]).toEqual(globularData);
  });
});
