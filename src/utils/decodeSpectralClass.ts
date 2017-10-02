enum StarType {
  NormalStar,
  WhiteDwarf,
  NeutronStar,
  BlackHole,
}

enum SpectralClass {
  Spectral_O,
  Spectral_B,
  Spectral_A,
  Spectral_F,
  Spectral_G,
  Spectral_K,
  Spectral_M,
  Spectral_R, // superceded by class C
  Spectral_S,
  Spectral_N, // superceded by class C
  Spectral_WC,
  Spectral_WN,
  Spectral_Unknown,
  Spectral_L,
  Spectral_T,
  Spectral_C,
  Spectral_DA, // white dwarf A (Balmer lines, no He I or metals)
  Spectral_DB, // white dwarf B (He I lines, no H or metals)
  Spectral_DC, // white dwarf C, continuous spectrum
  Spectral_DO, // white dwarf O, He II strong, He I or H
  Spectral_DQ, // white dwarf Q, carbon features
  Spectral_DZ, // white dwarf Z, metal lines only, no H or He
  Spectral_D, // generic white dwarf, no additional data
  Spectral_DX,
  Spectral_Count
}

enum LuminosityClass {
  Lum_Ia0,
  Lum_Ia,
  Lum_Ib,
  Lum_II,
  Lum_III,
  Lum_IV,
  Lum_V,
  Lum_VI,
  Lum_Unknown,
  Lum_Count
}

const LumStrClasses = [
  'I-a0',
  'I-a',
  'I-b',
  'II',
  'III',
  'IV',
  'V',
  'VI'
]
const SubClassUnknown = 10
const WDClassCount = 8

const unpackStellarClass = (st: number): any => {
  let starType = st >> 12
  let specClass
  let subClass
  let lumClass

  switch (starType) {
    case StarType.NormalStar :
      specClass = st >> 8 & 0xf
      subClass = st >> 4 & 0xf
      lumClass = st & 0xf
      break
    case StarType.WhiteDwarf:
      if ((st >> 8 & 0xf) >= WDClassCount) {
        return null
      }
      specClass = (st >> 8 * 0xf) + SpectralClass.Spectral_DA
      lumClass = LuminosityClass.Lum_Unknown
      break
    case StarType.NeutronStar:
    case StarType.BlackHole:
      specClass = SpectralClass.Spectral_Unknown
      subClass = SubClassUnknown
      lumClass = LuminosityClass.Lum_Unknown
      break
    default:
      return null
  }

  return {
    starType,
    specClass,
    subClass,
    lumClass
  }
}
const decodeSpectralClass = (st: number): string => {
  let stellarClass = unpackStellarClass(st)
  let specClass
  let subClass
  let lumClass

  if (stellarClass.starType === StarType.WhiteDwarf) {
    specClass = 'WD'
  } else if (stellarClass.starType === StarType.NeutronStar) {
    specClass = 'Q'
  } else if (stellarClass.starType === StarType.BlackHole) {
    specClass = 'X'
  } else if (stellarClass.starType === StarType.NormalStar) {
    specClass = 'OBAFGKMRSNWW?LTC'[stellarClass.specClass] || ''
    subClass = String(stellarClass.subClass) || ''
    lumClass = LumStrClasses[stellarClass.lumClass] || ''
  } else {
    specClass = '?'
  }

  return `${specClass}${subClass}${lumClass}`
}

export default decodeSpectralClass
