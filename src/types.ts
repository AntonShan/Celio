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

export type Value = number | string | boolean | Array<Value>;
export type ObjectLikeValue = Record<string, Value>;
export type ConfigurationValue = Value | ObjectLikeValue;

export type EssentialStarProperties = {
  Distance: number,
  RA: number
  Dec: number
  AbsMag: number
  SpectralType: string;
};

export type ObjectConfiguration<Meta, EssentialProperties = unknown> = {
  meta: Meta;
  properties: ObjectLikeValue & EssentialProperties;
};

export enum ObjectCreationMode {
  Add = 'Add',
  Modify = 'Modify',
  Replace = 'Replace',
}

export enum StarObjectType {
  Star = 'Star',
  Barycenter = 'Barycenter',
}

export enum SolarSystemObjectType {
  Body = 'Body',
  ReferencePoint = 'ReferencePoint',
  SurfacePoint = 'SurfacePoint',
  AltSurface = 'AltSurface',
  Location = 'Location',
}

export enum DeepSkyObjectType {
  Galaxy = 'Galaxy',
  Globular = 'Globular',
  Nebula = 'Nebula',
  OpenCluster = 'OpenCluster',
}

export interface StarObjectMeta {
  type: StarObjectType | null;
  mode: ObjectCreationMode | null;
  names: string[] | null;
  number: number | null;
}

export interface SolarSystemObjectMeta {
  type: SolarSystemObjectType;
  mode: ObjectCreationMode;
  names: string[];
  pathToParent: string[];
}

export interface DeepSkyObjectMeta {
  type: DeepSkyObjectType;
  number: number | null;
  names: string[] | null;
}

export type ObjectMeta = StarObjectMeta | SolarSystemObjectMeta | DeepSkyObjectMeta;

export type StarObject = ObjectConfiguration<StarObjectMeta, EssentialStarProperties>;
export type SolarSystemObject = ObjectConfiguration<SolarSystemObjectMeta>;
export type DeepSkyObject = ObjectConfiguration<DeepSkyObjectMeta>
export type Configuration = ObjectConfiguration<null>;

export type ConfigurationObject = StarObject | SolarSystemObject | DeepSkyObject | Configuration;
