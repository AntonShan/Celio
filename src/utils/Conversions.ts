import Constants from './Constants'

const Conversions = {
  lumToAbsMag: (lum: number): number => Constants.SOLAR_ABSMAG - Math.log(lum) * Constants.LN_MAG,
  lumToAppMag: (lum: number, lyrs: number): number => this.absToAppMag(this.lumToAbsMag(lum), lyrs),
  absMagToLum: (mag: number): number => Math.exp((Constants.SOLAR_ABSMAG - mag) / Constants.LN_MAG),
  appMagToLum: (mag: number, lyrs) => this.absMagToLum(this.appToAbsMag(mag, lyrs)),
  appToAbsMag: (appMag: number, lyrs: number): number => (appMag + 5 - 5 * Math.log10(lyrs / Constants.LY_PER_PARSEC)),
  absToAppMag: (absMag: number, lyrs: number): number => (absMag - 5 + 5 * Math.log10(lyrs / Constants.LY_PER_PARSEC)),
  lightYearsToParsecs: (ly: number) => ly / Constants.LY_PER_PARSEC,
  parsecsToLightYears: (pc: number) => pc * Constants.LY_PER_PARSEC,
  lightYearsToKilometers: (ly: number) => ly * Constants.KM_PER_LY,
  kilometersToLightYears: (km: number) => km / Constants.KM_PER_LY,
  lightYearsToAU: (ly: number) => ly * Constants.AU_PER_LY,
  AUtoKilometers: (au: number) => au * Constants.KM_PER_AU,
  kilometersToAU: (km: number) => km / Constants.KM_PER_AU,
  secondsToJulianDate: (sec: number) => sec / Constants.SECONDS_PER_DAY,
  decimalToDegMinSec: (angle: number) => {
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
}

export default Conversions
