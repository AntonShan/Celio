"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
const Conversions = {
    lumToAbsMag: (lum) => Constants_1.default.SOLAR_ABSMAG - Math.log(lum) * Constants_1.default.LN_MAG,
    lumToAppMag: (lum, lyrs) => this.absToAppMag(this.lumToAbsMag(lum), lyrs),
    absMagToLum: (mag) => Math.exp((Constants_1.default.SOLAR_ABSMAG - mag) / Constants_1.default.LN_MAG),
    appMagToLum: (mag, lyrs) => this.absMagToLum(this.appToAbsMag(mag, lyrs)),
    appToAbsMag: (appMag, lyrs) => (appMag + 5 - 5 * Math.log10(lyrs / Constants_1.default.LY_PER_PARSEC)),
    absToAppMag: (absMag, lyrs) => (absMag - 5 + 5 * Math.log10(lyrs / Constants_1.default.LY_PER_PARSEC)),
    lightYearsToParsecs: (ly) => ly / Constants_1.default.LY_PER_PARSEC,
    parsecsToLightYears: (pc) => pc * Constants_1.default.LY_PER_PARSEC,
    lightYearsToKilometers: (ly) => ly * Constants_1.default.KM_PER_LY,
    kilometersToLightYears: (km) => km / Constants_1.default.KM_PER_LY,
    lightYearsToAU: (ly) => ly * Constants_1.default.AU_PER_LY,
    AUtoKilometers: (au) => au * Constants_1.default.KM_PER_AU,
    kilometersToAU: (km) => km / Constants_1.default.KM_PER_AU,
    secondsToJulianDate: (sec) => sec / Constants_1.default.SECONDS_PER_DAY,
    decimalToDegMinSec: (angle) => {
        let degrees = Math.floor(angle);
        let A = angle - degrees;
        let B = A * 60.0;
        let minutes = B;
        let C = B - minutes;
        let seconds = C * 60.0;
        return {
            degrees,
            minutes,
            seconds
        };
    }
};
exports.default = Conversions;
//# sourceMappingURL=Conversions.js.map