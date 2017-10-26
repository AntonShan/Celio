// import DATTest from './tests/stars.dat/index'
//
// DATTest()

import { Celio } from '../src/Celio'

Promise.all([
  Celio.read('./input/celestia.cfg'),
  Celio.read('./input/galaxies.dsc'),
  Celio.read('./input/globulars.dsc'),
  Celio.read('./input/Revised.stc'),
  Celio.read('./input/solarsys.ssc'),
  Celio.read('./input/somefile.stc'),
  Celio.read('./input/Dystomia.stc'),
  Celio.read('./input/stars.dat')
]).then((results) => Promise.all([
  Celio.write('./output/celestia.cfg', results[0]),
  Celio.write('./output/galaxies.dsc', results[1]),
  Celio.write('./output/globulars.dsc', results[2]),
  Celio.write('./output/Revised.stc', results[3]),
  Celio.write('./output/solarsys.ssc', results[4]),
  Celio.write('./output/somefile.stc', results[5]),
  Celio.write('./output/stars.dat', results[7])
]))
