import { Celio } from '../../src/Celio'

async function run (): Promise<void> {
  try {
    const stars = await Celio.read('./input/stars.dat')
    await Celio.write('./output/stars.dat', stars)
    const writtenStars = await Celio.read('./output/stars.dat')

    const differentStars: any[] = stars.reduce((acc: any[], value: any, index: number) => {
      if (!objectEquals(value, writtenStars[index])) {
        acc.push({
          index,
          one: value,
          another: writtenStars[index]
        })
      }

      return acc
    }, [])

    if (differentStars.length > 0) {
      console.dir(differentStars)
      throw new Error('Arrays not match')
    } else {
      console.log('Test successful')
    }
  } catch (error) {
    console.error(error)
  }
}

function objectEquals(x: any, y: any): boolean {
  if (x === null || x === undefined || y === null || y === undefined) {
    return x === y
  } else if (x.constructor !== y.constructor) {
    return false
  } else  if (x instanceof Function) {
    return x === y
  } else if (x instanceof RegExp) {
    return x === y
  } else if (x === y || x.valueOf() === y.valueOf()) {
    return true
  } else if (Array.isArray(x) && x.length !== y.length) {
    return false
  } else if (x instanceof Date) {
    return false
  } else if (!(x instanceof Object)) {
    return false
  } else if (!(y instanceof Object)) {
    return false
  }

  // recursive object equality check
  const p = Object.keys(x)
  return Object.keys(y).every(i => p.indexOf(i) !== -1) &&
    p.every(i => objectEquals(x[i], y[i]))
}

export default run
