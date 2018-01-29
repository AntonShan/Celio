import {
  StarType,
  WDClassCount,
  SpectralClass,
  LuminosityClass,
  SubClassUnknown,
  SpectralClassStr,
  LuminosityClassStr,
  LumStrClasses
} from './SpectralData'

export const unpackStellarClass = (st: number): any => {
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
      specClass = (st >> 8 & 0xf) + SpectralClass.Spectral_DA
      subClass = st >> 4 & 0xf
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

export const decodeSpectralClass = (st: number): string => {
  let stellarClass = unpackStellarClass(st)
  let specClass
  let subClass
  let lumClass

  if (stellarClass.starType === StarType.WhiteDwarf) {
    specClass = SpectralClassStr[stellarClass.specClass]
    subClass = '0123456789'[stellarClass.subClass] || ''
    lumClass = LuminosityClassStr[stellarClass.lumClass]
  } else if (stellarClass.starType === StarType.NeutronStar) {
    specClass = 'Q'
  } else if (stellarClass.starType === StarType.BlackHole) {
    specClass = 'X'
    subClass = ''
    lumClass = ''
  } else if (stellarClass.starType === StarType.NormalStar) {
    specClass = 'OBAFGKMRSNWW?LTC'[stellarClass.specClass] || ''
    subClass = '0123456789'[stellarClass.subClass] || ''
    lumClass = LumStrClasses[stellarClass.lumClass] || ''
  } else {
    specClass = '?'
  }

  return `${specClass}${subClass}${lumClass}`
}
