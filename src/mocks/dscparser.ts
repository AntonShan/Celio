import { DeepSkyObject, DeepSkyObjectType } from '../types';

export const milkyWayRawData = `
Galaxy "Milky Way"
{
        Type  "SBc"
        CustomTemplate "MilkyWay.png"
        RA         17.760278
        Dec       -28.936111
        Distance   2.772e+04
        Radius         5e+04
        AbsMag         -20.6
        Axis    [  0.4372  -0.7548  -0.4891]
        Angle     99.6995
        InfoURL  "http://www.seds.org/messier/more/mw.html"
}
`;

export const milkyWayData: DeepSkyObject = {
  meta: {
    names: ['Milky Way'],
    type: DeepSkyObjectType.Galaxy,
    number: 0,
  },
  properties: {
    Type: 'SBc',
    CustomTemplate: 'MilkyWay.png',
    RA: 17.760278,
    Dec: -28.936111,
    Distance: 2.772e+04,
    Radius: 5e+04,
    AbsMag: -20.6,
    Axis: [0.4372, -0.7548, -0.4891],
    Angle: 99.6995,
    InfoURL: 'http://www.seds.org/messier/more/mw.html',
  },
};

export const multipleNamesRawData = `
Galaxy "DDO 43:UGC 3860"
{
        Type  "Irr"
        RA            7.4714
        Dec          40.7703
        Distance   2.547e+07 # method: rgb
        Radius          4713
        AbsMag        -14.75
        Axis    [  0.9022   0.0982   0.4199]
        Angle     84.5894
        InfoURL  "http://simbad.u-strasbg.fr/sim-id.pl?Ident=DDO 43"
}
`;

export const multipleNamesData: DeepSkyObject = {
  meta: {
    type: DeepSkyObjectType.Galaxy,
    names: ['DDO 43', 'UGC 3860'],
    number: 1,
  },
  properties: {
    Type: 'Irr',
    RA: 7.4714,
    Dec: 40.7703,
    Distance: 2.547e+07,
    Radius: 4713,
    AbsMag: -14.75,
    Axis: [0.9022, 0.0982, 0.4199],
    Angle: 84.5894,
    InfoURL: 'http://simbad.u-strasbg.fr/sim-id.pl?Ident=DDO 43',
  },
};

export const globularRawData = `
Globular "47 Tuc:NGC 104:Melotte 1:HD 2051:RBS 55:GCl 1:C 0021-723:xi Tuc"
{
        RA          \t    0.4014  # [hours]
        Dec         \t  -72.0808  # [degrees]
        Distance    \t 1.468e+04  # [ly]
        Radius      \t     106.7  # [ly], mu25 Isophote
        CoreRadius  \t       0.4  # [arcmin]
        KingConcentration     2.03  # c = log10(r_t/r_c)
        AbsMag      \t     -9.42  # [V mags]
        Axis       \t[ -0.7429  -0.2364  -0.6263]
        Angle       \t     175.9  # [degrees]
        InfoURL  "http://simbad.u-strasbg.fr/sim-id.pl?Ident=NGC 104"
}
`;

export const globularData: DeepSkyObject = {
  meta: {
    number: 2,
    names: ['47 Tuc', 'NGC 104', 'Melotte 1', 'HD 2051', 'RBS 55', 'GCl 1', 'C 0021-723', 'xi Tuc'],
    type: DeepSkyObjectType.Globular,
  },
  properties: {
    RA: 0.4014,
    Dec: -72.0808,
    Distance: 1.468e+04,
    Radius: 106.7,
    CoreRadius: 0.4,
    KingConcentration: 2.03,
    AbsMag: -9.42,
    Axis: [-0.7429,  -0.2364,  -0.6263],
    Angle: 175.9,
    InfoURL: 'http://simbad.u-strasbg.fr/sim-id.pl?Ident=NGC 104',
  },
};
