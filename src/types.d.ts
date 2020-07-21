export enum FormatType {
  TEXT,
  BINARY,
  INCORRECT
}

export enum TextExtension {
  STC = 'stc',
  SSC = 'ssc',
  DSC = 'dsc',
  CFG = 'cfg'
}

export enum BinaryExtension {
  DAT = 'dat'
}

export type SupportedExtension = TextExtension | BinaryExtension;

export type Dictionary<T> = {[key: string]: T};

export type ObjectConfiguration<Meta, Configuration> = {
  meta: Meta;
  properties: Configuration;
};

export interface StarMeta {
  type: string; // Star
  mode: string; // ModifyStar
  number: number;
}

export type UnknownMeta = any;
export type UnknownProperties = Dictionary<any>;

export type StarConfiguration = ObjectConfiguration<StarMeta, Dictionary<any>>;
export type UnknownObject = ObjectConfiguration<UnknownMeta, UnknownProperties>;
