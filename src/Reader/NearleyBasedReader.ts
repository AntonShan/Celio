import { CompiledRules, Grammar, Parser } from 'nearley';
import { AbstractReader } from './AbstractReader';
import { ConfigurationObject } from 'src/types';

export class NearleyBasedReader implements AbstractReader {
  parser: Parser

  constructor(grammar: CompiledRules) {
    this.parser = new Parser(Grammar.fromCompiled(grammar));
  }

  async read(data: string): Promise<ConfigurationObject[]> {
    try {
      const result = this.parser.feed(data).results[0];
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
