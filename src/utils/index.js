const charOf = function (c) {
  return c !== void 0
    ? String.fromCharCode(c)
    : c
}

const itoa = function (c) {
  return Number(c.replace(/\./))
}

const atoi = function (c) {
  return charOf(c).charCodeAt(0)
}

const isXDigit = function (c) {
  return c.match(/[\da-zA-Z]/) !== null
}

const isDigit = function (c) {
  return c !== void 0
    ? c.match(/[\d]/) !== null
    : false
}

const isAlpha = function (c) {
  return c !== void 0
    ? c.match(/[a-zA-Z]/) !== null
    : false
}

const isSpace = function (c) {
  return c.match(/\s/) !== null
}

const isSep = function (c) {
  return !isDigit(c) && !isAlpha(c) && charOf(c) !== '.'
}

module.exports = {
  charOf,
  itoa,
  atoi,
  isXDigit,
  isDigit,
  isAlpha,
  isSpace,
  isSep
}
