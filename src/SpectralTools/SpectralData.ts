export enum SpectralClassStr {
  O,
  B,
  A,
  F,
  G,
  K,
  M,
  R, // superceded by class C
  S,
  N, // superceded by class C
  WC,
  WN,
  '',
  L,
  T,
  C,
  DA, // white dwarf A (Balmer lines, no He I or metals)
  DB, // white dwarf B (He I lines, no H or metals)
  DC, // white dwarf C, continuous spectrum
  DO, // white dwarf O, He II strong, He I or H
  DQ, // white dwarf Q, carbon features
  DZ, // white dwarf Z, metal lines only, no H or He
  D, // generic white dwarf, no additional data
  DX,
  Count,
}

export enum LuminosityClassStr {
  Ia0,
  Ia,
  Ib,
  II,
  III,
  IV,
  V,
  VI,
  '',
  Count,
}

export enum ParseState {
  BeginState,
  EndState,
  NormalStarState,
  WolfRayetTypeState,
  NormalStarClassState,
  NormalStarSubclassState,
  NormalStarSubclassDecimalState,
  NormalStarSubclassFinalState,
  LumClassBeginState,
  LumClassIState,
  LumClassIIState,
  LumClassVState,
  LumClassIdashState,
  LumClassIaState,
  WDTypeState,
  WDExtendedTypeState,
  WDSubclassState,
  SubdwarfPrefixState,
}

export enum StarType {
  NormalStar,
  WhiteDwarf,
  NeutronStar,
  BlackHole,
}

export enum SpectralClass {
  Spectral_O,
  Spectral_B,
  Spectral_A,
  Spectral_F,
  Spectral_G,
  Spectral_K,
  Spectral_M,
  Spectral_R,
  Spectral_S,
  Spectral_N,
  Spectral_WC,
  Spectral_WN,
  Spectral_Unknown,
  Spectral_L,
  Spectral_T,
  Spectral_C,
  Spectral_DA,
  Spectral_DB,
  Spectral_DC,
  Spectral_DO,
  Spectral_DQ,
  Spectral_DZ,
  Spectral_D,
  Spectral_DX,
  Spectral_Count,
}

export enum LuminosityClass {
  Lum_Ia0,
  Lum_Ia,
  Lum_Ib,
  Lum_II,
  Lum_III,
  Lum_IV,
  Lum_V,
  Lum_VI,
  Lum_Unknown,
  Lum_Count,
}

export const LumStrClasses = [
  'I-a0',
  'I-a',
  'I-b',
  'II',
  'III',
  'IV',
  'V',
  'VI',
];

export enum Unknown {
  Subclass_Unknown = 10,
}

export const SubClassUnknown = 10;
export const WDClassCount = 8;
