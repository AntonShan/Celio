import CommonParser from './common.ne';
import { Grammar, Parser } from 'nearley';

describe('Common mixin', () => {
  let parser: Parser;

  function test<T>(value: string): T {
    const { results } = parser.feed(value);

    return results[0][0];
  }

  beforeEach(() => {
    parser = new Parser(Grammar.fromCompiled(CommonParser));
  });

  describe('Boolean values', () => {
    it('Should parse boolean value true', () => {
      expect(test('true')).toEqual(true);
    });

    it('Should parse boolean value false', () => {
      expect(test('false')).toEqual(false);
    });
  });

  describe('Number value', () => {
    it('Should parse an integer', () => {
      expect(test('123')).toEqual(123);
    });

    it('Should parse a positive integer starting with plus', () => {
      expect(test('+123')).toEqual(123);
    });

    it('Should parse a negative integer', () => {
      expect(test('-123')).toEqual(-123);
    });

    it('Should parse a float number', () => {
      expect(test('123.123')).toEqual(123.123);
    });

    it('Should parse a positive float number starting with plus', () => {
      expect(test('+123.123')).toEqual(123.123);
    });

    it('Should parse a negative float number', () => {
      expect(test('-123.123')).toEqual(-123.123);
    });

    it('Should parse a float number with integer part omitted', () => {
      expect(test('.123')).toEqual(0.123);
    });

    it('Should parse a positive float number with integer part omitted and starting with plus', () => {
      expect(test('+.123')).toEqual(0.123);
    });

    it('Should parse a negative float number with integer part omitted', () => {
      expect(test('-.123')).toEqual(-0.123);
    });

    it('Should parse a float number ending with a dot', () => {
      expect(test('123.')).toEqual(123);
    });

    it('Should parse a positive float number ending with a dot', () => {
      expect(test('+123.')).toEqual(123);
    });

    it('Should parse a negative float number ending with a dot', () => {
      expect(test('-123.')).toEqual(-123);
    });

    it('Should parse a float number in exponential form E+', () => {
      expect(test('123E+123')).toEqual(123E+123);
    });

    it('Should parse a float number in exponential form E-', () => {
      expect(test('123E-123')).toEqual(123E-123);
    });

    it('Should parse a float number in exponential form E+ with fraction part', () => {
      expect(test('123.123E+123')).toEqual(123.123E+123);
    });

    it('Should parse a float number in exponential form E- with fraction part', () => {
      expect(test('123.123E-123')).toEqual(123.123E-123);
    });

    it('Should parse a negative float number in exponential form E+', () => {
      expect(test('-123E+123')).toEqual(-123E+123);
    });

    it('Should parse a negative float number in exponential form E-', () => {
      expect(test('-123E-123')).toEqual(-123E-123);
    });

    it('Should parse a float number in exponential form E+ with fraction part', () => {
      expect(test('-123.123E+123')).toEqual(-123.123E+123);
    });

    it('Should parse a float number in exponential form E- with fraction part', () => {
      expect(test('-123.123E-123')).toEqual(-123.123E-123);
    });
  });

  describe('String value', () => {
    it('Should parse a basic string', () => {
      expect(test('"test"')).toEqual('test');
    });

    it('Should not parse a multiline string', () => {
      expect(() => test(`"A
      multiline
      string"`)).toThrowError();
    });
  });

  describe('Array value', () => {
    it('Should parse one line array', () => {
      expect(test('[42]')).toEqual([42]);
    });

    it('Should parse one line array with value padded by whitespaces', () => {
      expect(test('[ 42 ]')).toEqual([42]);
    });

    it('Should parse one line array with value padded to the left by whitespace', () => {
      expect(test('[ 42]')).toEqual([42]);
    });

    it('Should parse one line array with value padded to the right by whitespace', () => {
      expect(test('[42 ]')).toEqual([42]);
    });

    it('Should parse one line array with several values', () => {
      expect(test('[ 42 1.618 ]')).toEqual([42, 1.618]);
    });

    it('Should parse an array with values separated by tabs', () => {
      expect(test('[  42  1.618 ]')).toEqual([42, 1.618]);
    });

    it('Should parse an array with values separated by mix of whitespaces', () => {
      expect(test('[  42        1.618 ]')).toEqual([42, 1.618]);
    });

    it('Should parse one line array with several values of different types', () => {
      expect(test('[ 42 "test" ]')).toEqual([42, 'test']);
    });

    it('Should parse a multiline array', () => {
      expect(test(`[
        42
        "test"
        ]`)).toEqual([42, 'test']);
    });

    it('Should parse a multiline array with some values being on one line', () => {
      expect(test(`[
        42 true
        "test" 1.618
        ]`)).toEqual([42, true, 'test', 1.618]);
    });

    it('Should parse a two level deep nested array', () => {
      expect(test(`[
        [ 1 0 1 ]
        [ 0 1 0 ]
        [ 1 0 1 ]
        ]`)).toEqual([[1, 0, 1], [0, 1, 0], [1, 0, 1]]);
    });

    it('Should parse a three level deep nested array', () => {
      expect(test(`[
        [
          [ 1 0 1 ]
          [ 0 1 0 ]
          [ 1 0 1 ]
        ]
        [ 
          [ true false true ] 
          [ false true false ] 
          [ true false true ] 
        ]
        [
          [ "test" "test" "test" ]
          [ "test" "test" "test" ]
          [ "test" "test" "test" ]
        ]
        ]`)).toEqual([
        [
          [1, 0, 1],
          [0, 1, 0],
          [1, 0, 1],
        ],
        [
          [true, false, true],
          [false, true, false],
          [true, false, true],
        ],
        [
          ['test', 'test', 'test'],
          ['test', 'test', 'test'],
          ['test', 'test', 'test'],
        ],
      ]);
    });
  });

  describe('Object value', () => {
    it('Should parse a basic object', () => {
      expect(test('{ property "value" }')).toEqual({ property: 'value' });
    });

    it('Should parse an object with comments', () => {
      expect(test(`{
        property "value" #comment
      }`)).toEqual({ property: 'value' });
    });

    it('Should parse nested objects', () => {
      expect(test('{ property { nestedProperty 42 } }')).toEqual({ property: { nestedProperty: 42 } });
    });
  });
});
