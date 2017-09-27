const {
  SOLAR_ABSMAG,
  LN_MAG,
  LY_PER_PARSEC,
  KM_PER_LY,
  AU_PER_LY,
  KM_PER_AU,
  SECONDS_PER_DAY
} = require('./constants')

const lumToAbsMag = (lum) => (SOLAR_ABSMAG - Math.log(lum) * LN_MAG)
const lumToAppMag = (lum, lyrs) => lumToAbsMag(lumToAbsMag(lum), lyrs)
const absMagToLum = (mag) => Math.exp((SOLAR_ABSMAG - mag) / LN_MAG)
const appToAbsMag = (appMag, lyrs) => (appMag + 5 - 5 * Math.log10(lyrs / LY_PER_PARSEC))
const appMagToLum = (mag, lyrs) => absMagToLum(appToAbsMag(mag, lyrs))
const lightYearsToParsecs = (ly) => ly / LY_PER_PARSEC
const parsecsToLightYears = (pc) => pc * LY_PER_PARSEC
const lightYearsToKilometers = (ly) => ly * KM_PER_LY
const kilometersToLightYears = (km) => km / KM_PER_LY
const lightYearsToAU = (ly) => ly * AU_PER_LY
const AUtoKilometers = (au) => au * KM_PER_AU
const kilometersToAU = (km) => km / KM_PER_AU
const secondsToJulianDate = (sec) => sec / SECONDS_PER_DAY
const decimalToDegMinSec = (angle) => {
  let degrees = Math.floor(angle)

  let A = angle - degrees
  let B = A * 60.0
  let minutes = B
  let C = B - minutes
  let seconds = C * 60.0

  return {
    degrees,
    minutes,
    seconds
  }
}

module.exports = {
  lumToAbsMag,
  lumToAppMag,
  absMagToLum,
  appToAbsMag,
  appMagToLum,
  lightYearsToParsecs,
  parsecsToLightYears,
  lightYearsToKilometers,
  kilometersToLightYears,
  lightYearsToAU,
  AUtoKilometers,
  kilometersToAU,
  secondsToJulianDate,
  decimalToDegMinSec
}
