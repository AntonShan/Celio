const {
  EARTH_RADIUS,
  JUPITER_RADIUS,
  SOLAR_RADIUS,
  KM_PER_AU,
  KM_PER_LY,
  KM_PER_PARSEC,
  SECONDS_PER_DAY,
  MINUTES_PER_DAY,
  HOURS_PER_DAY,
  DAYS_PER_YEAR,
  SECONDS_PER_DEG,
  MINUTES_PER_DEG,
  DEG_PER_HRA
} = require('../utils/constants')

const UnitDefinition = [
  {
    name: 'km',
    value: 1.0
  },
  {
    name: 'm',
    value: 0.001
  },
  {
    name: 'rE',
    value: EARTH_RADIUS
  },
  {
    name: 'rJ',
    value: JUPITER_RADIUS
  },
  {
    name: 'rS',
    value: SOLAR_RADIUS
  },
  {
    name: 'AU',
    value: KM_PER_AU
  },
  {
    name: 'ly',
    value: KM_PER_LY
  },
  {
    name: 'pc',
    value: KM_PER_PARSEC
  },
  {
    name: 'kpc',
    value: 1e3 * KM_PER_PARSEC
  },
  {
    name: 'Mpc',
    value: 1e6 * KM_PER_PARSEC
  }
]
const TimeUnits = [
  {
    name: 's',
    value: 1.0 / SECONDS_PER_DAY
  },
  {
    name: 'min',
    value: 1.0 / MINUTES_PER_DAY
  },
  {
    name: 'h',
    value: 1.0 / HOURS_PER_DAY
  },
  {
    name: 'd',
    value: 1.0
  },
  {
    name: 'y',
    value: DAYS_PER_YEAR
  }
]
const AngleUnits = [
  {name: 'mas', value: 0.001 / SECONDS_PER_DEG},
  {name: 'arcsec', value: 1.0 / SECONDS_PER_DEG},
  {name: 'arcmin', value: 1.0 / MINUTES_PER_DEG},
  {name: 'deg', value: 1.0},
  {name: 'hRA', value: DEG_PER_HRA},
  {name: 'rad', value: 180.0 / Math.PI}
]
class Astro {
  /**
   * Check if unit is a length unit
   * @param unitName [String]
   */
  static isLengthUnit (unitName) {
    return unitName in UnitDefinition
  }

  /**
   * Check if unit is a length unit
   * @param unitName [String]
   */
  static isTimeUnit (unitName) {
    return unitName in TimeUnits
  }

  /**
   * Check if unit is a length unit
   * @param unitName [String]
   */
  static isAngleUnit (unitName) {
    return unitName in AngleUnits
  }
}

module.exports = {
  Astro,
  UnitDefinition,
  TimeUnits,
  AngleUnits
}
