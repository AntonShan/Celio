# CelIO

CelIO is package which allows you to read/write [Celestia](https://github.com/CelestiaProject/Celestia) .stc, .ssc, .dsc and stars.dat catalog files.
Currently this library can successfully read all files from data folder of vanilla Celestia 1.6.1. 

## Usage

```js
const fs = require('fs')
const Celio = require('celio')

const celestiaPath = `C:\\Program Files (x86)\\Celestia`
const configPath = resolve(join(celestiaPath, 'celestia.cfg'))

async function readConfig () {
  const fileData = await readFile(configPath, {
    encoding: 'utf-8'
  })
  return Celio.read(fileData, 'cfg')
}

readConfig().catch(console.error)
```

which outputs

```
{
  StarDatabase: 'data/stars.dat',
  StarNameDatabase: 'data/starnames.dat',
  StarCatalogs: [
    'data/revised.stc',
    'data/extrasolar.stc',
    'data/nearstars.stc',
    'data/visualbins.stc',
    'data/spectbins.stc',
    'data/charm2.stc'
  ],
  HDCrossIndex: 'data/hdxindex.dat',
  SAOCrossIndex: 'data/saoxindex.dat',
  GlieseCrossIndex: 'data/gliesexindex.dat',
  SolarSystemCatalogs: [
    'data/solarsys.ssc',
    'data/asteroids.ssc',
    'data/comets.ssc',
    'data/outersys.ssc',
    'data/minormoons.ssc',
    'data/numberedmoons.ssc',
    'data/extrasolar.ssc',
    'data/eros_locs.ssc',
    'data/gaspra_locs.ssc',
    'data/ida_locs.ssc',
    'data/merc_locs.ssc',
    'data/venus_locs.ssc',
    'data/earth_locs.ssc',
    'data/mars_locs.ssc',
    'data/moon_locs.ssc',
    'data/marsmoons_locs.ssc',
    'data/jupitermoons_locs.ssc',
    'data/saturnmoons_locs.ssc',
    'data/uranusmoons_locs.ssc',
    'data/neptunemoons_locs.ssc',
    'data/ring_locs.ssc',
    'data/world-capitals.ssc'
  ],
  DeepSkyCatalogs: [
    'data/galaxies.dsc',
    'data/globulars.dsc'
  ],
  AsterismsFile: 'data/asterisms.dat',
  BoundariesFile: 'data/boundaries.dat',
  StarTextures: {
    Default: 'astar.jpg',
    O: 'bstar.*',
    B: 'bstar.*',
    A: 'astar.*',
    F: 'astar.*',
    G: 'gstar.*',
    K: 'gstar.*',
    M: 'mstar.*',
    C: 'mstar.*',
    R: 'mstar.*',
    N: 'mstar.*',
    S: 'mstar.*',
    WC: 'bstar.*',
    WN: 'bstar.*',
    L: 'browndwarf.*',
    T: 'browndwarf.*',
    WD: 'astar.jpg',
    NeutronStar: 'astar.jpg'
  },
  FavoritesFile: 'favorites.cel',
  DestinationFile: 'guide.cel',
  Cursor: 'inverting crosshair',
  InitScript: 'start.cel',
  DemoScript: 'demo.cel',
  ExtrasDirectories: [
    'extras',
    'my extras'
  ],
  Font: 'sans12.txf',
  LabelFont: 'sans12.txf',
  TitleFont: 'sansbold20.txf',
  LogoTexture: 'logo.png',
  FaintestVisibleMagnitude: 8,
  RotateAcceleration: 120,
  MouseRotationSensitivity: 1,
  ScriptScreenshotDirectory: '',
  ScriptSystemAccessPolicy: 'deny',
  OrbitPathSamplePoints: 200,
  RingSystemSections: 400,
  ShadowTextureSize: 2048,
  EclipseTextureSize: 1024,
  AntialiasingSamples: 5
}
```