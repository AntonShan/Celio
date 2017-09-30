const StarType = {
  NormalStar: 0,
  WhiteDwarf: 1,
  NeutronStar: 2,
  BlackHole: 3,
}
const SpectralClass = {
  Spectral_O: 0,
  Spectral_B: 1,
  Spectral_A: 2,
  Spectral_F: 3,
  Spectral_G: 4,
  Spectral_K: 5,
  Spectral_M: 6,
  Spectral_R: 7, // superceded by class C
  Spectral_S: 8,
  Spectral_N: 9, // superceded by class C
  Spectral_WC: 10,
  Spectral_WN: 11,
  Spectral_Unknown: 12,
  Spectral_L: 13,
  Spectral_T: 14,
  Spectral_C: 15,
  Spectral_DA: 16, // white dwarf A (Balmer lines, no He I or metals)
  Spectral_DB: 17, // white dwarf B (He I lines, no H or metals)
  Spectral_DC: 18, // white dwarf C, continuous spectrum
  Spectral_DO: 19, // white dwarf O, He II strong, He I or H
  Spectral_DQ: 20, // white dwarf Q, carbon features
  Spectral_DZ: 21, // white dwarf Z, metal lines only, no H or He
  Spectral_D: 22, // generic white dwarf, no additional data
  Spectral_DX: 23,
  Spectral_Count: 24
}
const LuminosityClass = {
  Lum_Ia0: 0,
  Lum_Ia: 1,
  Lum_Ib: 2,
  Lum_II: 3,
  Lum_III: 4,
  Lum_IV: 5,
  Lum_V: 6,
  Lum_VI: 7,
  Lum_Unknown: 8,
  Lum_Count: 9
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

const unpackStellarClass = (st) => {
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
const decodeSpectralClass = (st) => {
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

module.exports = {
  StarType,
  SpectralClass,
  LuminosityClass,
  unpackStellarClass,
  decodeSpectralClass
}
