enum Unknown {
  Subclass_Unknown = 10
}

enum ParseState {
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

function encodeSpectralClass (st: string): number {
  let i = 0
  let state = ParseState.BeginState
  let starType = StarType.NormalStar
  let specClass = SpectralClass.Spectral_Unknown
  let lumClass = LuminosityClass.Lum_Unknown
  let subClass = Unknown.Subclass_Unknown

  while (state !== ParseState.EndState) {
    let c = i < st.length
      ? st.charAt(i)
      : null

    switch (state) {
      case ParseState.BeginState:
        switch (c) {
          case 'Q':
            starType = StarType.NeutronStar
            state = ParseState.EndState
            break

          case 'X':
            starType = StarType.BlackHole
            state = ParseState.EndState
            break

          case 'D':
            starType = StarType.WhiteDwarf
            specClass = SpectralClass.Spectral_D
            state = ParseState.WDTypeState
            ++i
            break

          case 's':
            state = ParseState.SubdwarfPrefixState
            ++i
            break

          case '?':
            state = ParseState.EndState
            break

          default:
            state = ParseState.NormalStarClassState
            break
        }
        break

      case ParseState.WolfRayetTypeState:
        switch (c) {
          case 'C':
            specClass = SpectralClass.Spectral_WC
            state = ParseState.NormalStarSubclassState
            ++i
            break

          case 'N':
            specClass = SpectralClass.Spectral_WN
            state = ParseState.NormalStarSubclassState
            ++i
            break

          default:
            specClass = SpectralClass.Spectral_WC
            state = ParseState.NormalStarSubclassState
            break
        }
        break

      case ParseState.SubdwarfPrefixState:
        if (c === 'd') {
          lumClass = LuminosityClass.Lum_VI
          state = ParseState.NormalStarClassState
          ++i
          break
        } else {
          state = ParseState.EndState
        }
        break

      case ParseState.NormalStarClassState:
        switch (c) {
          case 'W':
            state = ParseState.WolfRayetTypeState
            break

          case 'O':
            specClass = SpectralClass.Spectral_O
            state = ParseState.NormalStarSubclassState
            break

          case 'B':
            specClass = SpectralClass.Spectral_B
            state = ParseState.NormalStarSubclassState
            break

          case 'A':
            specClass = SpectralClass.Spectral_A
            state = ParseState.NormalStarSubclassState
            break

          case 'F':
            specClass = SpectralClass.Spectral_F
            state = ParseState.NormalStarSubclassState
            break

          case 'G':
            specClass = SpectralClass.Spectral_G
            state = ParseState.NormalStarSubclassState
            break

          case 'K':
            specClass = SpectralClass.Spectral_K
            state = ParseState.NormalStarSubclassState
            break

          case 'M':
            specClass = SpectralClass.Spectral_M
            state = ParseState.NormalStarSubclassState
            break

          case 'R':
            specClass = SpectralClass.Spectral_R
            state = ParseState.NormalStarSubclassState
            break

          case 'S':
            specClass = SpectralClass.Spectral_S
            state = ParseState.NormalStarSubclassState
            break

          case 'N':
            specClass = SpectralClass.Spectral_N
            state = ParseState.NormalStarSubclassState
            break

          case 'L':
            specClass = SpectralClass.Spectral_L
            state = ParseState.NormalStarSubclassState
            break

          case 'T':
            specClass = SpectralClass.Spectral_T
            state = ParseState.NormalStarSubclassState
            break

          case 'C':
            specClass = SpectralClass.Spectral_C
            state = ParseState.NormalStarSubclassState
            break

          default:
            state = ParseState.EndState
            break
        }
        ++i
        break

      case ParseState.NormalStarSubclassState:
        if (c !== null && c.match(/[0-9]/)) {
          subClass = parseInt(c)
          state = ParseState.NormalStarSubclassDecimalState
          ++i
        } else {
          state = ParseState.LumClassBeginState
        }
        break

      case ParseState.NormalStarSubclassDecimalState:
        if (c === '.') {
          state = ParseState.NormalStarSubclassFinalState
          ++i
        } else {
          state = ParseState.LumClassBeginState
        }
        break

      case ParseState.NormalStarSubclassFinalState:
        if (c.match(/[0-9]/)) {
          state = ParseState.LumClassBeginState
        } else {
          state = ParseState.EndState
        }
        ++i
        break

      case ParseState.LumClassBeginState:
        switch (c) {
          case 'I':
            state = ParseState.LumClassIState
            break

          case 'V':
            state = ParseState.LumClassVState
            break

          default:
            state = ParseState.EndState
            break
        }
        ++i
        break

      case ParseState.LumClassIState:
        switch (c) {
          case 'I':
            state = ParseState.LumClassIIState
            break

          case 'V':
            lumClass = LuminosityClass.Lum_IV
            state = ParseState.EndState
            break

          case 'a':
            state = ParseState.LumClassIaState
            break

          case 'b':
            lumClass = LuminosityClass.Lum_Ib
            state = ParseState.EndState
            break

          case '-':
            state = ParseState.LumClassIdashState
            break

          default:
            lumClass = LuminosityClass.Lum_Ib
            state = ParseState.EndState
            break
        }
        i++
        break

      case ParseState.LumClassIIState:
        switch (c) {
          case 'I':
            lumClass = LuminosityClass.Lum_III
            state = ParseState.EndState
            break

          default:
            lumClass = LuminosityClass.Lum_II
            state = ParseState.EndState
            break
        }
        break

      case ParseState.LumClassIdashState:
        switch (c) {
          case 'a':
            state = ParseState.LumClassIaState
            ++i
            break

          case 'b':
            lumClass = LuminosityClass.Lum_Ib
            state = ParseState.EndState
            break

          default:
            lumClass = LuminosityClass.Lum_Ib
            state = ParseState.EndState
            break
        }
        break

      case ParseState.LumClassIaState:
        switch (c) {
          case '0':
            lumClass = LuminosityClass.Lum_Ia0
            state = ParseState.EndState
            break

          default:
            lumClass = LuminosityClass.Lum_Ia
            state = ParseState.EndState
            break
        }
        break

      case ParseState.LumClassVState:
        switch (c) {
          case 'I':
            lumClass = LuminosityClass.Lum_VI
            state = ParseState.EndState
            break

          default:
            lumClass = LuminosityClass.Lum_V
            state = ParseState.EndState
            break
        }
        break

      case ParseState.WDTypeState:
        switch (c) {
          case 'A':
            specClass = SpectralClass.Spectral_DA
            i++
            break

          case 'B':
            specClass = SpectralClass.Spectral_DB
            i++
            break

          case 'C':
            specClass = SpectralClass.Spectral_DC
            i++
            break

          case 'O':
            specClass = SpectralClass.Spectral_DO
            i++
            break

          case 'Q':
            specClass = SpectralClass.Spectral_DQ
            i++
            break

          case 'X':
            specClass = SpectralClass.Spectral_DX
            i++
            break

          case 'Z':
            specClass = SpectralClass.Spectral_DZ
            i++
            break

          default:
            specClass = SpectralClass.Spectral_D
            break
        }
        state = ParseState.WDExtendedTypeState
        break

      case ParseState.WDExtendedTypeState:
        switch (c) {
          case 'A':
          case 'B':
          case 'C':
          case 'O':
          case 'Q':
          case 'Z':
          case 'X':
          case 'V':
          case 'P':
          case 'H':
          case 'E':
            i++
            break

          default:
            state = ParseState.WDSubclassState
            break
        }
        break

      case ParseState.WDSubclassState:
        if (c !== null && c.match(/[0-9]/)) {
          subClass = parseInt(c)
          i++
        } else {
          subClass = Unknown.Subclass_Unknown
        }
        state = ParseState.EndState
        break

      default:
        state = ParseState.EndState
        break
    }
  }

  let buffer = 0

  buffer += (starType & 0xf) << 12
  buffer += (specClass & 0xf) << 8
  buffer += (subClass & 0xf) << 4
  buffer += (lumClass & 0xf)

  return buffer
}

export default encodeSpectralClass
