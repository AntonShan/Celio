# CelIO

CelIO is package which lets you read/write [Celestia](https://github.com/CelestiaProject/Celestia) .stc, .ssc, .dsc and stars.dat catalog files.

## Usage

This project is not ready for usage in apps but is already able to somewhat properly read .stc and stars.dat files

```js
const path = require('path')
const Celio = require('celio')

const inputFile = path.resolve('Celestia/data/Revised.stc')

Celio.read(inputFile).then(result => {
	console.dir(result)
})
```

which outputs

```
[
	{
		isStar: true,
		disposition: 'AddStar',
		catalogNumber: 207,
		params: {
			RA: 0.65034381,
			Dec: 66.09896232,
			Distance: 2077,
			AppMag: 5.87,
			SpectralType: 'G8III'
		}
	},
	{
		isStar: true,
		disposition: 'ModifyStar',
		catalogNumber: 3829,
		params: {
			SpectralType: 'DZ8'
		}
	},
	...
]
```