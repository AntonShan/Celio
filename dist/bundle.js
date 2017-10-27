(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Serializer_1 = __webpack_require__(25);
exports.Serializer = Serializer_1.default;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Constants = {
    SOLAR_ABSMAG: 4.83,
    LN_MAG: 1.085736,
    LY_PER_PARSEC: 3.26167,
    KM_PER_LY: 9460730472580.8,
    KM_PER_AU: 149597870.7,
    AU_PER_LY: (this.KM_PER_LY / this.KM_PER_AU),
    KM_PER_PARSEC: (this.KM_PER_LY * this.LY_PER_PARSEC),
    DAYS_PER_YEAR: 365.25,
    SECONDS_PER_DAY: 86400.0,
    MINUTES_PER_DAY: 1440.0,
    HOURS_PER_DAY: 24.0,
    MINUTES_PER_DEG: 60.0,
    SECONDS_PER_DEG: 3600.0,
    DEG_PER_HRA: 15.0,
    EARTH_RADIUS: 6378.14,
    JUPITER_RADIUS: 71492.0,
    SOLAR_RADIUS: 696000.0,
    SPEED_OF_LIGHT: 299792.458,
    G: 6.672e-11,
    SOLAR_MASS: 1.989e30,
    EARTH_MASS: 5.976e24,
    LUNAR_MASS: 7.354e22,
    SOLAR_IRRADIANCE: 1367.6,
    SOLAR_POWER: 3.8462e26,
    FILE_HEADER: 'CELSTARS',
    VERSION: 0x0100,
    HEADER_OFFSET: 14
};
exports.default = Constants;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) /* global define */
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.moo = factory()
  }
}(this, function() {
  'use strict';

  var hasOwnProperty = Object.prototype.hasOwnProperty

  // polyfill assign(), so we support IE9+
  var assign = typeof Object.assign === 'function' ? Object.assign :
    // https://tc39.github.io/ecma262/#sec-object.assign
    function(target, sources) {
      if (target == null) {
        throw new TypeError('Target cannot be null or undefined');
      }
      target = Object(target)

      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]
        if (source == null) continue

        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
      return target
    }

  var hasSticky = typeof new RegExp().sticky === 'boolean'

  /***************************************************************************/

  function isRegExp(o) { return o && o.constructor === RegExp }
  function isObject(o) { return o && typeof o === 'object' && o.constructor !== RegExp && !Array.isArray(o) }

  function reEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }
  function reGroups(s) {
    var re = new RegExp('|' + s)
    return re.exec('').length - 1
  }
  function reCapture(s) {
    return '(' + s + ')'
  }
  function reUnion(regexps) {
    var source =  regexps.map(function(s) {
      return "(?:" + s + ")"
    }).join('|')
    return "(?:" + source + ")"
  }

  function regexpOrLiteral(obj) {
    if (typeof obj === 'string') {
      return '(?:' + reEscape(obj) + ')'

    } else if (isRegExp(obj)) {
      // TODO: consider /u support
      if (obj.ignoreCase) { throw new Error('RegExp /i flag not allowed') }
      if (obj.global) { throw new Error('RegExp /g flag is implied') }
      if (obj.sticky) { throw new Error('RegExp /y flag is implied') }
      if (obj.multiline) { throw new Error('RegExp /m flag is implied') }
      return obj.source

    } else {
      throw new Error('not a pattern: ' + obj)
    }
  }

  function objectToRules(object) {
    var keys = Object.getOwnPropertyNames(object)
    var result = []
    for (var i=0; i<keys.length; i++) {
      var key = keys[i]
      var thing = object[key]
      var rules = Array.isArray(thing) ? thing : [thing]
      var match = []
      rules.forEach(function(rule) {
        if (isObject(rule)) {
          if (match.length) result.push(ruleOptions(key, match))
          result.push(ruleOptions(key, rule))
          match = []
        } else {
          match.push(rule)
        }
      })
      if (match.length) result.push(ruleOptions(key, match))
    }
    return result
  }

  function arrayToRules(array) {
    var result = []
    for (var i=0; i<array.length; i++) {
      var obj = array[i]
      if (!obj.name) {
        throw new Error('Rule has no name: ' + JSON.stringify(obj))
      }
      result.push(ruleOptions(obj.name, obj))
    }
    return result
  }

  function ruleOptions(name, obj) {
    if (typeof obj !== 'object' || Array.isArray(obj) || isRegExp(obj)) {
      obj = { match: obj }
    }

    // nb. error implies lineBreaks
    var options = assign({
      tokenType: name,
      lineBreaks: !!obj.error,
      pop: false,
      next: null,
      push: null,
      error: false,
      value: null,
      getType: null,
    }, obj)

    // convert to array
    var match = options.match
    options.match = Array.isArray(match) ? match : match ? [match] : []
    options.match.sort(function(a, b) {
      return isRegExp(a) && isRegExp(b) ? 0
           : isRegExp(b) ? -1 : isRegExp(a) ? +1 : b.length - a.length
    })
    if (options.keywords) {
      options.getType = keywordTransform(options.keywords)
    }
    return options
  }

  function compileRules(rules, hasStates) {
    rules = Array.isArray(rules) ? arrayToRules(rules) : objectToRules(rules)

    var errorRule = null
    var groups = []
    var parts = []
    for (var i=0; i<rules.length; i++) {
      var options = rules[i]

      if (options.error) {
        if (errorRule) {
          throw new Error("Multiple error rules not allowed: (for token '" + options.tokenType + "')")
        }
        errorRule = options
      }

      // skip rules with no match
      if (options.match.length === 0) {
        continue
      }
      groups.push(options)

      // convert to RegExp
      var pat = reUnion(options.match.map(regexpOrLiteral))

      // validate
      var regexp = new RegExp(pat)
      if (regexp.test("")) {
        throw new Error("RegExp matches empty string: " + regexp)
      }
      var groupCount = reGroups(pat)
      if (groupCount > 0) {
        throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: … ) instead")
      }
      if (!hasStates && (options.pop || options.push || options.next)) {
        throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.tokenType + "')")
      }

      // try and detect rules matching newlines
      if (!options.lineBreaks && regexp.test('\n')) {
        throw new Error('Rule should declare lineBreaks: ' + regexp)
      }

      // store regex
      parts.push(reCapture(pat))
    }

    var suffix = hasSticky ? '' : '|(?:)'
    var flags = hasSticky ? 'ym' : 'gm'
    var combined = new RegExp(reUnion(parts) + suffix, flags)

    return {regexp: combined, groups: groups, error: errorRule}
  }

  function compile(rules) {
    var result = compileRules(rules)
    return new Lexer({start: result}, 'start')
  }

  function compileStates(states, start) {
    var keys = Object.getOwnPropertyNames(states)
    if (!start) start = keys[0]

    var map = Object.create(null)
    for (var i=0; i<keys.length; i++) {
      var key = keys[i]
      map[key] = compileRules(states[key], true)
    }

    for (var i=0; i<keys.length; i++) {
      var groups = map[keys[i]].groups
      for (var j=0; j<groups.length; j++) {
        var g = groups[j]
        var state = g && (g.push || g.next)
        if (state && !map[state]) {
          throw new Error("Missing state '" + state + "' (in token '" + g.tokenType + "' of state '" + keys[i] + "')")
        }
        if (g && g.pop && +g.pop !== 1) {
          throw new Error("pop must be 1 (in token '" + g.tokenType + "' of state '" + keys[i] + "')")
        }
      }
    }

    return new Lexer(map, start)
  }

  function keywordTransform(map) {
    var reverseMap = Object.create(null)
    var byLength = Object.create(null)
    var types = Object.getOwnPropertyNames(map)
    for (var i=0; i<types.length; i++) {
      var tokenType = types[i]
      var item = map[tokenType]
      var keywordList = Array.isArray(item) ? item : [item]
      keywordList.forEach(function(keyword) {
        (byLength[keyword.length] = byLength[keyword.length] || []).push(keyword)
        if (typeof keyword !== 'string') {
          throw new Error("keyword must be string (in keyword '" + tokenType + "')")
        }
        reverseMap[keyword] = tokenType
      })
    }

    // fast string lookup
    // https://jsperf.com/string-lookups
    function str(x) { return JSON.stringify(x) }
    var source = ''
    source += '(function(value) {\n'
    source += 'switch (value.length) {\n'
    for (var length in byLength) {
      var keywords = byLength[length]
      source += 'case ' + length + ':\n'
      source += 'switch (value) {\n'
      keywords.forEach(function(keyword) {
        var tokenType = reverseMap[keyword]
        source += 'case ' + str(keyword) + ': return ' + str(tokenType) + '\n'
      })
      source += '}\n'
    }
    source += '}\n'
    source += '})'
    return eval(source) // getType
  }

  /***************************************************************************/

  var Lexer = function(states, state) {
    this.startState = state
    this.states = states
    this.buffer = ''
    this.stack = []
    this.reset()
  }

  Lexer.prototype.reset = function(data, info) {
    this.buffer = data || ''
    this.index = 0
    this.line = info ? info.line : 1
    this.col = info ? info.col : 1
    this.setState(info ? info.state : this.startState)
    return this
  }

  Lexer.prototype.save = function() {
    return {
      line: this.line,
      col: this.col,
      state: this.state,
    }
  }

  Lexer.prototype.setState = function(state) {
    if (!state || this.state === state) return
    this.state = state
    var info = this.states[state]
    this.groups = info.groups
    this.error = info.error || {lineBreaks: true, shouldThrow: true}
    this.re = info.regexp
  }

  Lexer.prototype.popState = function() {
    this.setState(this.stack.pop())
  }

  Lexer.prototype.pushState = function(state) {
    this.stack.push(this.state)
    this.setState(state)
  }

  Lexer.prototype._eat = hasSticky ? function(re) { // assume re is /y
    return re.exec(this.buffer)
  } : function(re) { // assume re is /g
    var match = re.exec(this.buffer)
    // will always match, since we used the |(?:) trick
    if (match[0].length === 0) {
      return null
    }
    return match
  }

  Lexer.prototype._getGroup = function(match) {
    if (match === null) {
      return -1
    }

    var groupCount = this.groups.length
    for (var i = 0; i < groupCount; i++) {
      if (match[i + 1] !== undefined) {
        return i
      }
    }
    throw new Error('oops')
  }

  function tokenToString() {
    return this.value
  }

  Lexer.prototype.next = function() {
    var re = this.re
    var buffer = this.buffer

    var index = re.lastIndex = this.index
    if (index === buffer.length) {
      return // EOF
    }

    var match = this._eat(re)
    var i = this._getGroup(match)

    var group, text
    if (i === -1) {
      group = this.error

      // consume rest of buffer
      text = buffer.slice(index)

    } else {
      text = match[0]
      group = this.groups[i]
    }

    // count line breaks
    var lineBreaks = 0
    if (group.lineBreaks) {
      var matchNL = /\n/g
      var nl = 1
      if (text === '\n') {
        lineBreaks = 1
      } else {
        while (matchNL.exec(text)) { lineBreaks++; nl = matchNL.lastIndex }
      }
    }

    var token = {
      type: (group.getType && group.getType(text)) || group.tokenType,
      value: group.value ? group.value(text) : text,
      text: text,
      toString: tokenToString,
      offset: index,
      lineBreaks: lineBreaks,
      line: this.line,
      col: this.col,
    }
    // nb. adding more props to token object will make V8 sad!

    var size = text.length
    this.index += size
    this.line += lineBreaks
    if (lineBreaks !== 0) {
      this.col = size - nl + 1
    } else {
      this.col += size
    }
    // throw, if no rule with {error: true}
    if (group.shouldThrow) {
      throw new Error(this.formatError(token, "invalid syntax"))
    }

    if (group.pop) this.popState()
    else if (group.push) this.pushState(group.push)
    else if (group.next) this.setState(group.next)
    return token
  }

  if (typeof Symbol !== 'undefined' && Symbol.iterator) {
    var LexerIterator = function(lexer) {
      this.lexer = lexer
    }

    LexerIterator.prototype.next = function() {
      var token = this.lexer.next()
      return {value: token, done: !token}
    }

    LexerIterator.prototype[Symbol.iterator] = function() {
      return this
    }

    Lexer.prototype[Symbol.iterator] = function() {
      return new LexerIterator(this)
    }
  }

  Lexer.prototype.formatError = function(token, message) {
    var value = token.value
    var index = token.offset
    var eol = token.lineBreaks ? value.indexOf('\n') : value.length
    var start = Math.max(0, index - token.col + 1)
    var firstLine = this.buffer.substring(start, index + eol)
    message += " at line " + token.line + " col " + token.col + ":\n\n"
    message += "  " + firstLine + "\n"
    message += "  " + Array(token.col).join(" ") + "^"
    return message
  }

  Lexer.prototype.clone = function() {
    return new Lexer(this.states, this.state)
  }

  Lexer.prototype.has = function(tokenType) {
    for (var s in this.states) {
      var groups = this.states[s].groups
      for (var i=0; i<groups.length; i++) {
        var group = groups[i]
        if (group.tokenType === tokenType) return true
        if (group.keywords && hasOwnProperty.call(group.keywords, tokenType)) {
          return true
        }
      }
    }
    return false
  }


  return {
    compile: compile,
    states: compileStates,
    error: Object.freeze({error: true}),
  }

}))


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(0);
const Serializer_1 = __webpack_require__(1);
class TextWriter {
    constructor() {
        this.defaultWriteMode = {
            encoding: 'utf-8',
            mode: 0o644,
            flag: 'w'
        };
    }
    write(fullPath, items, options = this.defaultWriteMode) {
        return new Promise((resolve, reject) => {
            const output = this.transform(items);
            fs.writeFile(fullPath, output, options, (error) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }
    transform(items) {
        return items.map(item => this.transformItem(item)).join('\n');
    }
    transformItem(item) {
        const objectHeader = this.writeHeader(item.meta);
        const objectProperties = Serializer_1.Serializer.stringify(item.properties);
        return objectHeader + ' ' + objectProperties + '\n';
    }
}
exports.default = TextWriter;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __webpack_require__(2);
exports.Constants = Constants_1.default;
const Conversions_1 = __webpack_require__(21);
exports.Conversions = Conversions_1.default;
const decodeSpectralClass_1 = __webpack_require__(22);
exports.decodeSpectralClass = decodeSpectralClass_1.default;
const encodeSpectralClass_1 = __webpack_require__(23);
exports.encodeSpectralClass = encodeSpectralClass_1.default;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(0);
const Serializer_1 = __webpack_require__(1);
class ConfigWriter {
    constructor() {
        this.defaultWriteMode = {
            encoding: 'utf-8',
            mode: 0o644,
            flag: 'w'
        };
    }
    write(fullPath, config, options = this.defaultWriteMode) {
        return new Promise((resolve, reject) => {
            const output = Serializer_1.Serializer.stringify(config);
            fs.writeFile(fullPath, output, options, (error) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }
}
exports.default = ConfigWriter;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/* harmony default export */ __webpack_exports__["default"] = (isArray);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(31);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(28);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Celio_1 = __webpack_require__(12);
exports.Celio = Celio_1.Celio;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Celio_1 = __webpack_require__(13);
exports.Celio = Celio_1.default;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(14);
const Injector_1 = __webpack_require__(15);
class Celio {
    static read(filePath) {
        const fullPath = path.resolve(filePath);
        const fileExtension = path.extname(fullPath);
        const type = fileExtension.split('.')[1];
        const Reader = Injector_1.Injector.makeReader(type);
        return Reader.read(fullPath);
    }
    static write(filePath, items) {
        const fileExtension = path.extname(filePath);
        const type = fileExtension.split('.')[1];
        const Writer = Injector_1.Injector.makeWriter(type);
        return Writer.write(filePath, items);
    }
}
exports.default = Celio;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Injector_1 = __webpack_require__(16);
exports.Injector = Injector_1.default;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Reader_1 = __webpack_require__(17);
const Writer_1 = __webpack_require__(24);
const grammar_1 = __webpack_require__(39);
const FormatsChecker_1 = __webpack_require__(44);
class Injector {
    static makeReader(extension) {
        switch (FormatsChecker_1.FormatsChecker.formatType(extension)) {
            case FormatsChecker_1.FormatType.BINARY:
                return new Reader_1.DATReader();
            case FormatsChecker_1.FormatType.TEXT:
                const Grammar = extension.toUpperCase() + 'Grammar';
                return new Reader_1.NearleyBasedReader(grammar_1.default[Grammar]);
            case FormatsChecker_1.FormatType.INCORRECT:
                throw new Error(`Incorrect file format`);
        }
    }
    static makeWriter(extension) {
        switch (FormatsChecker_1.FormatsChecker.formatType(extension)) {
            case FormatsChecker_1.FormatType.BINARY:
                return new Writer_1.DATWriter();
            case FormatsChecker_1.FormatType.TEXT:
                switch (extension) {
                    case 'stc':
                        return new Writer_1.STCWriter();
                    case 'ssc':
                        return new Writer_1.SSCWriter();
                    case 'dsc':
                        return new Writer_1.DSCWriter();
                    case 'cfg':
                        return new Writer_1.CFGWriter();
                    default:
                        throw new Error(`Incorrect file format`);
                }
            case FormatsChecker_1.FormatType.INCORRECT:
                throw new Error(`Incorrect file format`);
        }
    }
}
exports.default = Injector;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const NearleyBasedReader_1 = __webpack_require__(18);
exports.NearleyBasedReader = NearleyBasedReader_1.default;
const DATReader_1 = __webpack_require__(20);
exports.DATReader = DATReader_1.default;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const nearley_1 = __webpack_require__(19);
const fs = __webpack_require__(0);
class NearleyBasedReader {
    constructor(grammar) {
        this.parser = new nearley_1.Parser(nearley_1.Grammar.fromCompiled(grammar));
    }
    read(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (error, data) => {
                if (error) {
                    return reject(error);
                }
                const result = this.parser.feed(data).results[0];
                if (result === void 0) {
                    reject(`Unable to read file ${filePath}`);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.default = NearleyBasedReader;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
}(this, function() {

function Rule(name, symbols, postprocess) {
    this.id = ++Rule.highestId;
    this.name = name;
    this.symbols = symbols;        // a list of literal | regex class | nonterminal
    this.postprocess = postprocess;
    return this;
}
Rule.highestId = 0;

Rule.prototype.toString = function(withCursorAt) {
    function stringifySymbolSequence (e) {
        return e.literal ? JSON.stringify(e.literal) :
               e.type ? '%' + e.type : e.toString();
    }
    var symbolSequence = (typeof withCursorAt === "undefined")
                         ? this.symbols.map(stringifySymbolSequence).join(' ')
                         : (   this.symbols.slice(0, withCursorAt).map(stringifySymbolSequence).join(' ')
                             + " ● "
                             + this.symbols.slice(withCursorAt).map(stringifySymbolSequence).join(' ')     );
    return this.name + " → " + symbolSequence;
}


// a State is a rule at a position from a given starting point in the input stream (reference)
function State(rule, dot, reference, wantedBy) {
    this.rule = rule;
    this.dot = dot;
    this.reference = reference;
    this.data = [];
    this.wantedBy = wantedBy;
    this.isComplete = this.dot === rule.symbols.length;
}

State.prototype.toString = function() {
    return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
};

State.prototype.nextState = function(child) {
    var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
    state.left = this;
    state.right = child;
    if (state.isComplete) {
        state.data = state.build();
    }
    return state;
};

State.prototype.build = function() {
    var children = [];
    var node = this;
    do {
        children.push(node.right.data);
        node = node.left;
    } while (node.left);
    children.reverse();
    return children;
};

State.prototype.finish = function() {
    if (this.rule.postprocess) {
        this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
    }
};


function Column(grammar, index) {
    this.grammar = grammar;
    this.index = index;
    this.states = [];
    this.wants = {}; // states indexed by the non-terminal they expect
    this.scannable = []; // list of states that expect a token
    this.completed = {}; // states that are nullable
}


Column.prototype.process = function(nextColumn) {
    var states = this.states;
    var wants = this.wants;
    var completed = this.completed;

    for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
        var state = states[w];

        if (state.isComplete) {
            state.finish();
            if (state.data !== Parser.fail) {
                // complete
                var wantedBy = state.wantedBy;
                for (var i = wantedBy.length; i--; ) { // this line is hot
                    var left = wantedBy[i];
                    this.complete(left, state);
                }

                // special-case nullables
                if (state.reference === this.index) {
                    // make sure future predictors of this rule get completed.
                    var exp = state.rule.name;
                    (this.completed[exp] = this.completed[exp] || []).push(state);
                }
            }

        } else {
            // queue scannable states
            var exp = state.rule.symbols[state.dot];
            if (typeof exp !== 'string') {
                this.scannable.push(state);
                continue;
            }

            // predict
            if (wants[exp]) {
                wants[exp].push(state);

                if (completed.hasOwnProperty(exp)) {
                    var nulls = completed[exp];
                    for (var i = 0; i < nulls.length; i++) {
                        var right = nulls[i];
                        this.complete(state, right);
                    }
                }
            } else {
                wants[exp] = [state];
                this.predict(exp);
            }
        }
    }
}

Column.prototype.predict = function(exp) {
    var rules = this.grammar.byName[exp] || [];

    for (var i = 0; i < rules.length; i++) {
        var r = rules[i];
        var wantedBy = this.wants[exp];
        var s = new State(r, 0, this.index, wantedBy);
        this.states.push(s);
    }
}

Column.prototype.complete = function(left, right) {
    var inp = right.rule.name;
    if (left.rule.symbols[left.dot] === inp) {
        var copy = left.nextState(right);
        this.states.push(copy);
    }
}


function Grammar(rules, start) {
    this.rules = rules;
    this.start = start || this.rules[0].name;
    var byName = this.byName = {};
    this.rules.forEach(function(rule) {
        if (!byName.hasOwnProperty(rule.name)) {
            byName[rule.name] = [];
        }
        byName[rule.name].push(rule);
    });
}

// So we can allow passing (rules, start) directly to Parser for backwards compatibility
Grammar.fromCompiled = function(rules, start) {
    var lexer = rules.Lexer;
    if (rules.ParserStart) {
      start = rules.ParserStart;
      rules = rules.ParserRules;
    }
    var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
    var g = new Grammar(rules, start);
    g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
    return g;
}


function StreamLexer() {
  this.reset("");
}

StreamLexer.prototype.reset = function(data, state) {
    this.buffer = data;
    this.index = 0;
    this.line = state ? state.line : 1;
    this.lastLineBreak = state ? -state.col : 0;
}

StreamLexer.prototype.next = function() {
    if (this.index < this.buffer.length) {
        var ch = this.buffer[this.index++];
        if (ch === '\n') {
          this.line += 1;
          this.lastLineBreak = this.index;
        }
        return {value: ch};
    }
}

StreamLexer.prototype.save = function() {
  return {
    line: this.line,
    col: this.index - this.lastLineBreak,
  }
}

StreamLexer.prototype.formatError = function(token, message) {
    // nb. this gets called after consuming the offending token,
    // so the culprit is index-1
    var buffer = this.buffer;
    if (typeof buffer === 'string') {
        var nextLineBreak = buffer.indexOf('\n', this.index);
        if (nextLineBreak === -1) nextLineBreak = buffer.length;
        var line = buffer.substring(this.lastLineBreak, nextLineBreak)
        var col = this.index - this.lastLineBreak;
        message += " at line " + this.line + " col " + col + ":\n\n";
        message += "  " + line + "\n"
        message += "  " + Array(col).join(" ") + "^"
        return message;
    } else {
        return message + " at index " + (this.index - 1);
    }
}


function Parser(rules, start, options) {
    if (rules instanceof Grammar) {
        var grammar = rules;
        var options = start;
    } else {
        var grammar = Grammar.fromCompiled(rules, start);
    }
    this.grammar = grammar;

    // Read options
    this.options = {
        keepHistory: false,
        lexer: grammar.lexer || new StreamLexer,
    };
    for (var key in (options || {})) {
        this.options[key] = options[key];
    }

    // Setup lexer
    this.lexer = this.options.lexer;
    this.lexerState = undefined;

    // Setup a table
    var column = new Column(grammar, 0);
    var table = this.table = [column];

    // I could be expecting anything.
    column.wants[grammar.start] = [];
    column.predict(grammar.start);
    // TODO what if start rule is nullable?
    column.process();
    this.current = 0; // token index
}

// create a reserved token for indicating a parse fail
Parser.fail = {};

Parser.prototype.feed = function(chunk) {
    var lexer = this.lexer;
    lexer.reset(chunk, this.lexerState);

    var token;
    while (token = lexer.next()) {
        // We add new states to table[current+1]
        var column = this.table[this.current];

        // GC unused states
        if (!this.options.keepHistory) {
            delete this.table[this.current - 1];
        }

        var n = this.current + 1;
        var nextColumn = new Column(this.grammar, n);
        this.table.push(nextColumn);

        // Advance all tokens that expect the symbol
        var literal = token.value;
        var value = lexer.constructor === StreamLexer ? token.value : token;
        var scannable = column.scannable;
        for (var w = scannable.length; w--; ) {
            var state = scannable[w];
            var expect = state.rule.symbols[state.dot];
            // Try to consume the token
            // either regex or literal
            if (expect.test ? expect.test(value) :
                expect.type ? expect.type === token.type
                            : expect.literal === literal) {
                // Add it
                var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                nextColumn.states.push(next);
            }
        }

        // Next, for each of the rules, we either
        // (a) complete it, and try to see if the reference row expected that
        //     rule
        // (b) predict the next nonterminal it expects by adding that
        //     nonterminal's start state
        // To prevent duplication, we also keep track of rules we have already
        // added

        nextColumn.process();

        // If needed, throw an error:
        if (nextColumn.states.length === 0) {
            // No states at all! This is not good.
            var message = this.lexer.formatError(token, "invalid syntax") + "\n";
            message += "Unexpected " + (token.type ? token.type + " token: " : "");
            message += JSON.stringify(token.value !== undefined ? token.value : token) + "\n";
            var err = new Error(message);
            err.offset = this.current;
            err.token = token;
            throw err;
        }

        // maybe save lexer state
        if (this.options.keepHistory) {
          column.lexerState = lexer.save()
        }

        this.current++;
    }
    if (column) {
      this.lexerState = lexer.save()
    }

    // Incrementally keep track of results
    this.results = this.finish();

    // Allow chaining, for whatever it's worth
    return this;
};

Parser.prototype.save = function() {
    var column = this.table[this.current];
    column.lexerState = this.lexerState;
    return column;
};

Parser.prototype.restore = function(column) {
    var index = column.index;
    this.current = index;
    this.table[index] = column;
    this.table.splice(index + 1);
    this.lexerState = column.lexerState;

    // Incrementally keep track of results
    this.results = this.finish();
};

// nb. deprecated: use save/restore instead!
Parser.prototype.rewind = function(index) {
    if (!this.options.keepHistory) {
        throw new Error('set option `keepHistory` to enable rewinding')
    }
    // nb. recall column (table) indicies fall between token indicies.
    //        col 0   --   token 0   --   col 1
    this.restore(this.table[index]);
};

Parser.prototype.finish = function() {
    // Return the possible parsings
    var considerations = [];
    var start = this.grammar.start;
    var column = this.table[this.table.length - 1]
    column.states.forEach(function (t) {
        if (t.rule.name === start
                && t.dot === t.rule.symbols.length
                && t.reference === 0
                && t.data !== Parser.fail) {
            considerations.push(t);
        }
    });
    return considerations.map(function(c) {return c.data; });
};

return {
    Parser: Parser,
    Grammar: Grammar,
    Rule: Rule,
};

}));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(5);
const fs = __webpack_require__(0);
const Constants_1 = __webpack_require__(2);
class DATReader {
    static parse(data) {
        let starsInFile = 0;
        const header = data.toString('utf-8', 0, Constants_1.default.FILE_HEADER.length);
        const version = data.readUInt16LE(Constants_1.default.FILE_HEADER.length);
        if (header !== Constants_1.default.FILE_HEADER) {
            throw new Error('Wrong file signature');
        }
        else if (version !== Constants_1.default.VERSION) {
            throw new Error('Wrong file version');
        }
        else {
            starsInFile = data.readUInt32LE(Constants_1.default.FILE_HEADER.length + 2);
        }
        let result = [];
        let starNumber = 0;
        while (starNumber < starsInFile) {
            let offset = Constants_1.default.HEADER_OFFSET + starNumber * 20;
            let catalogNumber = data.readUInt32LE(offset);
            let Distance = data.readFloatLE(offset + 4);
            let RA = data.readFloatLE(offset + 8);
            let Dec = data.readFloatLE(offset + 12);
            let AbsMag = data.readInt16LE(offset + 16);
            let SpectralType = utils_1.decodeSpectralClass(data.readUInt16LE(offset + 18));
            result.push({
                meta: {
                    type: 'Star',
                    mode: 'ModifyStar',
                    number: catalogNumber
                },
                properties: {
                    Distance,
                    RA,
                    Dec,
                    AbsMag,
                    SpectralType
                }
            });
            ++starNumber;
        }
        return result;
    }
    read(fileName) {
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, (error, data) => {
                if (error) {
                    return reject(error);
                }
                return resolve(DATReader.parse(data));
            });
        });
    }
}
exports.default = DATReader;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __webpack_require__(2);
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


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StarType;
(function (StarType) {
    StarType[StarType["NormalStar"] = 0] = "NormalStar";
    StarType[StarType["WhiteDwarf"] = 1] = "WhiteDwarf";
    StarType[StarType["NeutronStar"] = 2] = "NeutronStar";
    StarType[StarType["BlackHole"] = 3] = "BlackHole";
})(StarType || (StarType = {}));
var SpectralClass;
(function (SpectralClass) {
    SpectralClass[SpectralClass["Spectral_O"] = 0] = "Spectral_O";
    SpectralClass[SpectralClass["Spectral_B"] = 1] = "Spectral_B";
    SpectralClass[SpectralClass["Spectral_A"] = 2] = "Spectral_A";
    SpectralClass[SpectralClass["Spectral_F"] = 3] = "Spectral_F";
    SpectralClass[SpectralClass["Spectral_G"] = 4] = "Spectral_G";
    SpectralClass[SpectralClass["Spectral_K"] = 5] = "Spectral_K";
    SpectralClass[SpectralClass["Spectral_M"] = 6] = "Spectral_M";
    SpectralClass[SpectralClass["Spectral_R"] = 7] = "Spectral_R";
    SpectralClass[SpectralClass["Spectral_S"] = 8] = "Spectral_S";
    SpectralClass[SpectralClass["Spectral_N"] = 9] = "Spectral_N";
    SpectralClass[SpectralClass["Spectral_WC"] = 10] = "Spectral_WC";
    SpectralClass[SpectralClass["Spectral_WN"] = 11] = "Spectral_WN";
    SpectralClass[SpectralClass["Spectral_Unknown"] = 12] = "Spectral_Unknown";
    SpectralClass[SpectralClass["Spectral_L"] = 13] = "Spectral_L";
    SpectralClass[SpectralClass["Spectral_T"] = 14] = "Spectral_T";
    SpectralClass[SpectralClass["Spectral_C"] = 15] = "Spectral_C";
    SpectralClass[SpectralClass["Spectral_DA"] = 16] = "Spectral_DA";
    SpectralClass[SpectralClass["Spectral_DB"] = 17] = "Spectral_DB";
    SpectralClass[SpectralClass["Spectral_DC"] = 18] = "Spectral_DC";
    SpectralClass[SpectralClass["Spectral_DO"] = 19] = "Spectral_DO";
    SpectralClass[SpectralClass["Spectral_DQ"] = 20] = "Spectral_DQ";
    SpectralClass[SpectralClass["Spectral_DZ"] = 21] = "Spectral_DZ";
    SpectralClass[SpectralClass["Spectral_D"] = 22] = "Spectral_D";
    SpectralClass[SpectralClass["Spectral_DX"] = 23] = "Spectral_DX";
    SpectralClass[SpectralClass["Spectral_Count"] = 24] = "Spectral_Count";
})(SpectralClass || (SpectralClass = {}));
var SpectralClassStr;
(function (SpectralClassStr) {
    SpectralClassStr[SpectralClassStr["O"] = 0] = "O";
    SpectralClassStr[SpectralClassStr["B"] = 1] = "B";
    SpectralClassStr[SpectralClassStr["A"] = 2] = "A";
    SpectralClassStr[SpectralClassStr["F"] = 3] = "F";
    SpectralClassStr[SpectralClassStr["G"] = 4] = "G";
    SpectralClassStr[SpectralClassStr["K"] = 5] = "K";
    SpectralClassStr[SpectralClassStr["M"] = 6] = "M";
    SpectralClassStr[SpectralClassStr["R"] = 7] = "R";
    SpectralClassStr[SpectralClassStr["S"] = 8] = "S";
    SpectralClassStr[SpectralClassStr["N"] = 9] = "N";
    SpectralClassStr[SpectralClassStr["WC"] = 10] = "WC";
    SpectralClassStr[SpectralClassStr["WN"] = 11] = "WN";
    SpectralClassStr[SpectralClassStr[""] = 12] = "";
    SpectralClassStr[SpectralClassStr["L"] = 13] = "L";
    SpectralClassStr[SpectralClassStr["T"] = 14] = "T";
    SpectralClassStr[SpectralClassStr["C"] = 15] = "C";
    SpectralClassStr[SpectralClassStr["DA"] = 16] = "DA";
    SpectralClassStr[SpectralClassStr["DB"] = 17] = "DB";
    SpectralClassStr[SpectralClassStr["DC"] = 18] = "DC";
    SpectralClassStr[SpectralClassStr["DO"] = 19] = "DO";
    SpectralClassStr[SpectralClassStr["DQ"] = 20] = "DQ";
    SpectralClassStr[SpectralClassStr["DZ"] = 21] = "DZ";
    SpectralClassStr[SpectralClassStr["D"] = 22] = "D";
    SpectralClassStr[SpectralClassStr["DX"] = 23] = "DX";
    SpectralClassStr[SpectralClassStr["Count"] = 24] = "Count";
})(SpectralClassStr || (SpectralClassStr = {}));
var LuminosityClass;
(function (LuminosityClass) {
    LuminosityClass[LuminosityClass["Lum_Ia0"] = 0] = "Lum_Ia0";
    LuminosityClass[LuminosityClass["Lum_Ia"] = 1] = "Lum_Ia";
    LuminosityClass[LuminosityClass["Lum_Ib"] = 2] = "Lum_Ib";
    LuminosityClass[LuminosityClass["Lum_II"] = 3] = "Lum_II";
    LuminosityClass[LuminosityClass["Lum_III"] = 4] = "Lum_III";
    LuminosityClass[LuminosityClass["Lum_IV"] = 5] = "Lum_IV";
    LuminosityClass[LuminosityClass["Lum_V"] = 6] = "Lum_V";
    LuminosityClass[LuminosityClass["Lum_VI"] = 7] = "Lum_VI";
    LuminosityClass[LuminosityClass["Lum_Unknown"] = 8] = "Lum_Unknown";
    LuminosityClass[LuminosityClass["Lum_Count"] = 9] = "Lum_Count";
})(LuminosityClass || (LuminosityClass = {}));
var LuminosityClassStr;
(function (LuminosityClassStr) {
    LuminosityClassStr[LuminosityClassStr["Ia0"] = 0] = "Ia0";
    LuminosityClassStr[LuminosityClassStr["Ia"] = 1] = "Ia";
    LuminosityClassStr[LuminosityClassStr["Ib"] = 2] = "Ib";
    LuminosityClassStr[LuminosityClassStr["II"] = 3] = "II";
    LuminosityClassStr[LuminosityClassStr["III"] = 4] = "III";
    LuminosityClassStr[LuminosityClassStr["IV"] = 5] = "IV";
    LuminosityClassStr[LuminosityClassStr["V"] = 6] = "V";
    LuminosityClassStr[LuminosityClassStr["VI"] = 7] = "VI";
    LuminosityClassStr[LuminosityClassStr[""] = 8] = "";
    LuminosityClassStr[LuminosityClassStr["Count"] = 9] = "Count";
})(LuminosityClassStr || (LuminosityClassStr = {}));
const LumStrClasses = [
    'I-a0',
    'I-a',
    'I-b',
    'II',
    'III',
    'IV',
    'V',
    'VI'
];
const SubClassUnknown = 10;
const WDClassCount = 8;
const unpackStellarClass = (st) => {
    let starType = st >> 12;
    let specClass;
    let subClass;
    let lumClass;
    switch (starType) {
        case StarType.NormalStar:
            specClass = st >> 8 & 0xf;
            subClass = st >> 4 & 0xf;
            lumClass = st & 0xf;
            break;
        case StarType.WhiteDwarf:
            if ((st >> 8 & 0xf) >= WDClassCount) {
                return null;
            }
            specClass = (st >> 8 & 0xf) + SpectralClass.Spectral_DA;
            subClass = st >> 4 & 0xf;
            lumClass = LuminosityClass.Lum_Unknown;
            break;
        case StarType.NeutronStar:
        case StarType.BlackHole:
            specClass = SpectralClass.Spectral_Unknown;
            subClass = SubClassUnknown;
            lumClass = LuminosityClass.Lum_Unknown;
            break;
        default:
            return null;
    }
    return {
        starType,
        specClass,
        subClass,
        lumClass
    };
};
const decodeSpectralClass = (st) => {
    let stellarClass = unpackStellarClass(st);
    let specClass;
    let subClass;
    let lumClass;
    if (stellarClass.starType === StarType.WhiteDwarf) {
        specClass = SpectralClassStr[stellarClass.specClass];
        subClass = '0123456789'[stellarClass.subClass] || '';
        lumClass = LuminosityClassStr[stellarClass.lumClass];
    }
    else if (stellarClass.starType === StarType.NeutronStar) {
        specClass = 'Q';
    }
    else if (stellarClass.starType === StarType.BlackHole) {
        specClass = 'X';
        subClass = '';
        lumClass = '';
    }
    else if (stellarClass.starType === StarType.NormalStar) {
        specClass = 'OBAFGKMRSNWW?LTC'[stellarClass.specClass] || '';
        subClass = '0123456789'[stellarClass.subClass] || '';
        lumClass = LumStrClasses[stellarClass.lumClass] || '';
    }
    else {
        specClass = '?';
    }
    return `${specClass}${subClass}${lumClass}`;
};
exports.default = decodeSpectralClass;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Unknown;
(function (Unknown) {
    Unknown[Unknown["Subclass_Unknown"] = 10] = "Subclass_Unknown";
})(Unknown || (Unknown = {}));
var ParseState;
(function (ParseState) {
    ParseState[ParseState["BeginState"] = 0] = "BeginState";
    ParseState[ParseState["EndState"] = 1] = "EndState";
    ParseState[ParseState["NormalStarState"] = 2] = "NormalStarState";
    ParseState[ParseState["WolfRayetTypeState"] = 3] = "WolfRayetTypeState";
    ParseState[ParseState["NormalStarClassState"] = 4] = "NormalStarClassState";
    ParseState[ParseState["NormalStarSubclassState"] = 5] = "NormalStarSubclassState";
    ParseState[ParseState["NormalStarSubclassDecimalState"] = 6] = "NormalStarSubclassDecimalState";
    ParseState[ParseState["NormalStarSubclassFinalState"] = 7] = "NormalStarSubclassFinalState";
    ParseState[ParseState["LumClassBeginState"] = 8] = "LumClassBeginState";
    ParseState[ParseState["LumClassIState"] = 9] = "LumClassIState";
    ParseState[ParseState["LumClassIIState"] = 10] = "LumClassIIState";
    ParseState[ParseState["LumClassVState"] = 11] = "LumClassVState";
    ParseState[ParseState["LumClassIdashState"] = 12] = "LumClassIdashState";
    ParseState[ParseState["LumClassIaState"] = 13] = "LumClassIaState";
    ParseState[ParseState["WDTypeState"] = 14] = "WDTypeState";
    ParseState[ParseState["WDExtendedTypeState"] = 15] = "WDExtendedTypeState";
    ParseState[ParseState["WDSubclassState"] = 16] = "WDSubclassState";
    ParseState[ParseState["SubdwarfPrefixState"] = 17] = "SubdwarfPrefixState";
})(ParseState || (ParseState = {}));
var StarType;
(function (StarType) {
    StarType[StarType["NormalStar"] = 0] = "NormalStar";
    StarType[StarType["WhiteDwarf"] = 1] = "WhiteDwarf";
    StarType[StarType["NeutronStar"] = 2] = "NeutronStar";
    StarType[StarType["BlackHole"] = 3] = "BlackHole";
})(StarType || (StarType = {}));
var SpectralClass;
(function (SpectralClass) {
    SpectralClass[SpectralClass["Spectral_O"] = 0] = "Spectral_O";
    SpectralClass[SpectralClass["Spectral_B"] = 1] = "Spectral_B";
    SpectralClass[SpectralClass["Spectral_A"] = 2] = "Spectral_A";
    SpectralClass[SpectralClass["Spectral_F"] = 3] = "Spectral_F";
    SpectralClass[SpectralClass["Spectral_G"] = 4] = "Spectral_G";
    SpectralClass[SpectralClass["Spectral_K"] = 5] = "Spectral_K";
    SpectralClass[SpectralClass["Spectral_M"] = 6] = "Spectral_M";
    SpectralClass[SpectralClass["Spectral_R"] = 7] = "Spectral_R";
    SpectralClass[SpectralClass["Spectral_S"] = 8] = "Spectral_S";
    SpectralClass[SpectralClass["Spectral_N"] = 9] = "Spectral_N";
    SpectralClass[SpectralClass["Spectral_WC"] = 10] = "Spectral_WC";
    SpectralClass[SpectralClass["Spectral_WN"] = 11] = "Spectral_WN";
    SpectralClass[SpectralClass["Spectral_Unknown"] = 12] = "Spectral_Unknown";
    SpectralClass[SpectralClass["Spectral_L"] = 13] = "Spectral_L";
    SpectralClass[SpectralClass["Spectral_T"] = 14] = "Spectral_T";
    SpectralClass[SpectralClass["Spectral_C"] = 15] = "Spectral_C";
    SpectralClass[SpectralClass["Spectral_DA"] = 16] = "Spectral_DA";
    SpectralClass[SpectralClass["Spectral_DB"] = 17] = "Spectral_DB";
    SpectralClass[SpectralClass["Spectral_DC"] = 18] = "Spectral_DC";
    SpectralClass[SpectralClass["Spectral_DO"] = 19] = "Spectral_DO";
    SpectralClass[SpectralClass["Spectral_DQ"] = 20] = "Spectral_DQ";
    SpectralClass[SpectralClass["Spectral_DZ"] = 21] = "Spectral_DZ";
    SpectralClass[SpectralClass["Spectral_D"] = 22] = "Spectral_D";
    SpectralClass[SpectralClass["Spectral_DX"] = 23] = "Spectral_DX";
    SpectralClass[SpectralClass["Spectral_Count"] = 24] = "Spectral_Count";
})(SpectralClass || (SpectralClass = {}));
var LuminosityClass;
(function (LuminosityClass) {
    LuminosityClass[LuminosityClass["Lum_Ia0"] = 0] = "Lum_Ia0";
    LuminosityClass[LuminosityClass["Lum_Ia"] = 1] = "Lum_Ia";
    LuminosityClass[LuminosityClass["Lum_Ib"] = 2] = "Lum_Ib";
    LuminosityClass[LuminosityClass["Lum_II"] = 3] = "Lum_II";
    LuminosityClass[LuminosityClass["Lum_III"] = 4] = "Lum_III";
    LuminosityClass[LuminosityClass["Lum_IV"] = 5] = "Lum_IV";
    LuminosityClass[LuminosityClass["Lum_V"] = 6] = "Lum_V";
    LuminosityClass[LuminosityClass["Lum_VI"] = 7] = "Lum_VI";
    LuminosityClass[LuminosityClass["Lum_Unknown"] = 8] = "Lum_Unknown";
    LuminosityClass[LuminosityClass["Lum_Count"] = 9] = "Lum_Count";
})(LuminosityClass || (LuminosityClass = {}));
const LumStrClasses = [
    'I-a0',
    'I-a',
    'I-b',
    'II',
    'III',
    'IV',
    'V',
    'VI'
];
const SubClassUnknown = 10;
const WDClassCount = 8;
function encodeSpectralClass(st) {
    let i = 0;
    let state = ParseState.BeginState;
    let starType = StarType.NormalStar;
    let specClass = SpectralClass.Spectral_Unknown;
    let lumClass = LuminosityClass.Lum_Unknown;
    let subClass = Unknown.Subclass_Unknown;
    while (state !== ParseState.EndState) {
        let c = i < st.length
            ? st.charAt(i)
            : null;
        switch (state) {
            case ParseState.BeginState:
                switch (c) {
                    case 'Q':
                        starType = StarType.NeutronStar;
                        state = ParseState.EndState;
                        break;
                    case 'X':
                        starType = StarType.BlackHole;
                        state = ParseState.EndState;
                        break;
                    case 'D':
                        starType = StarType.WhiteDwarf;
                        specClass = SpectralClass.Spectral_D;
                        state = ParseState.WDTypeState;
                        ++i;
                        break;
                    case 's':
                        state = ParseState.SubdwarfPrefixState;
                        ++i;
                        break;
                    case '?':
                        state = ParseState.EndState;
                        break;
                    default:
                        state = ParseState.NormalStarClassState;
                        break;
                }
                break;
            case ParseState.WolfRayetTypeState:
                switch (c) {
                    case 'C':
                        specClass = SpectralClass.Spectral_WC;
                        state = ParseState.NormalStarSubclassState;
                        ++i;
                        break;
                    case 'N':
                        specClass = SpectralClass.Spectral_WN;
                        state = ParseState.NormalStarSubclassState;
                        ++i;
                        break;
                    default:
                        specClass = SpectralClass.Spectral_WC;
                        state = ParseState.NormalStarSubclassState;
                        break;
                }
                break;
            case ParseState.SubdwarfPrefixState:
                if (c === 'd') {
                    lumClass = LuminosityClass.Lum_VI;
                    state = ParseState.NormalStarClassState;
                    ++i;
                    break;
                }
                else {
                    state = ParseState.EndState;
                }
                break;
            case ParseState.NormalStarClassState:
                switch (c) {
                    case 'W':
                        state = ParseState.WolfRayetTypeState;
                        break;
                    case 'O':
                        specClass = SpectralClass.Spectral_O;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    case 'B':
                        specClass = SpectralClass.Spectral_B;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    case 'A':
                        specClass = SpectralClass.Spectral_A;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    case 'F':
                        specClass = SpectralClass.Spectral_F;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    case 'G':
                        specClass = SpectralClass.Spectral_G;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    case 'K':
                        specClass = SpectralClass.Spectral_K;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    case 'M':
                        specClass = SpectralClass.Spectral_M;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    case 'R':
                        specClass = SpectralClass.Spectral_R;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    case 'S':
                        specClass = SpectralClass.Spectral_S;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    case 'N':
                        specClass = SpectralClass.Spectral_N;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    case 'L':
                        specClass = SpectralClass.Spectral_L;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    case 'T':
                        specClass = SpectralClass.Spectral_T;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    case 'C':
                        specClass = SpectralClass.Spectral_C;
                        state = ParseState.NormalStarSubclassState;
                        break;
                    default:
                        state = ParseState.EndState;
                        break;
                }
                ++i;
                break;
            case ParseState.NormalStarSubclassState:
                if (c !== null && c.match(/[0-9]/)) {
                    subClass = parseInt(c);
                    state = ParseState.NormalStarSubclassDecimalState;
                    ++i;
                }
                else {
                    state = ParseState.LumClassBeginState;
                }
                break;
            case ParseState.NormalStarSubclassDecimalState:
                if (c === '.') {
                    state = ParseState.NormalStarSubclassFinalState;
                    ++i;
                }
                else {
                    state = ParseState.LumClassBeginState;
                }
                break;
            case ParseState.NormalStarSubclassFinalState:
                if (c.match(/[0-9]/)) {
                    state = ParseState.LumClassBeginState;
                }
                else {
                    state = ParseState.EndState;
                }
                ++i;
                break;
            case ParseState.LumClassBeginState:
                switch (c) {
                    case 'I':
                        state = ParseState.LumClassIState;
                        break;
                    case 'V':
                        state = ParseState.LumClassVState;
                        break;
                    default:
                        state = ParseState.EndState;
                        break;
                }
                ++i;
                break;
            case ParseState.LumClassIState:
                switch (c) {
                    case 'I':
                        state = ParseState.LumClassIIState;
                        break;
                    case 'V':
                        lumClass = LuminosityClass.Lum_IV;
                        state = ParseState.EndState;
                        break;
                    case 'a':
                        state = ParseState.LumClassIaState;
                        break;
                    case 'b':
                        lumClass = LuminosityClass.Lum_Ib;
                        state = ParseState.EndState;
                        break;
                    case '-':
                        state = ParseState.LumClassIdashState;
                        break;
                    default:
                        lumClass = LuminosityClass.Lum_Ib;
                        state = ParseState.EndState;
                        break;
                }
                i++;
                break;
            case ParseState.LumClassIIState:
                switch (c) {
                    case 'I':
                        lumClass = LuminosityClass.Lum_III;
                        state = ParseState.EndState;
                        break;
                    default:
                        lumClass = LuminosityClass.Lum_II;
                        state = ParseState.EndState;
                        break;
                }
                break;
            case ParseState.LumClassIdashState:
                switch (c) {
                    case 'a':
                        state = ParseState.LumClassIaState;
                        ++i;
                        break;
                    case 'b':
                        lumClass = LuminosityClass.Lum_Ib;
                        state = ParseState.EndState;
                        break;
                    default:
                        lumClass = LuminosityClass.Lum_Ib;
                        state = ParseState.EndState;
                        break;
                }
                break;
            case ParseState.LumClassIaState:
                switch (c) {
                    case '0':
                        lumClass = LuminosityClass.Lum_Ia0;
                        state = ParseState.EndState;
                        break;
                    default:
                        lumClass = LuminosityClass.Lum_Ia;
                        state = ParseState.EndState;
                        break;
                }
                break;
            case ParseState.LumClassVState:
                switch (c) {
                    case 'I':
                        lumClass = LuminosityClass.Lum_VI;
                        state = ParseState.EndState;
                        break;
                    default:
                        lumClass = LuminosityClass.Lum_V;
                        state = ParseState.EndState;
                        break;
                }
                break;
            case ParseState.WDTypeState:
                switch (c) {
                    case 'A':
                        specClass = SpectralClass.Spectral_DA;
                        i++;
                        break;
                    case 'B':
                        specClass = SpectralClass.Spectral_DB;
                        i++;
                        break;
                    case 'C':
                        specClass = SpectralClass.Spectral_DC;
                        i++;
                        break;
                    case 'O':
                        specClass = SpectralClass.Spectral_DO;
                        i++;
                        break;
                    case 'Q':
                        specClass = SpectralClass.Spectral_DQ;
                        i++;
                        break;
                    case 'X':
                        specClass = SpectralClass.Spectral_DX;
                        i++;
                        break;
                    case 'Z':
                        specClass = SpectralClass.Spectral_DZ;
                        i++;
                        break;
                    default:
                        specClass = SpectralClass.Spectral_D;
                        break;
                }
                state = ParseState.WDExtendedTypeState;
                break;
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
                        i++;
                        break;
                    default:
                        state = ParseState.WDSubclassState;
                        break;
                }
                break;
            case ParseState.WDSubclassState:
                if (c !== null && c.match(/[0-9]/)) {
                    subClass = parseInt(c);
                    i++;
                }
                else {
                    subClass = Unknown.Subclass_Unknown;
                }
                state = ParseState.EndState;
                break;
            default:
                state = ParseState.EndState;
                break;
        }
    }
    let buffer = 0;
    buffer += (starType & 0xf) << 12;
    buffer += (specClass & 0xf) << 8;
    buffer += (subClass & 0xf) << 4;
    buffer += (lumClass & 0xf);
    return buffer;
}
exports.default = encodeSpectralClass;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ConfigWriter_1 = __webpack_require__(6);
exports.ConfigWriter = ConfigWriter_1.default;
const STCWriter_1 = __webpack_require__(33);
exports.STCWriter = STCWriter_1.default;
const SSCWriter_1 = __webpack_require__(34);
exports.SSCWriter = SSCWriter_1.default;
const DSCWriter_1 = __webpack_require__(35);
exports.DSCWriter = DSCWriter_1.default;
const CFGWriter_1 = __webpack_require__(36);
exports.CFGWriter = CFGWriter_1.default;
const DATWriter_1 = __webpack_require__(37);
exports.DATWriter = DATWriter_1.default;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const isObject_1 = __webpack_require__(26);
const isArray_1 = __webpack_require__(7);
const isNumber_1 = __webpack_require__(27);
const isString_1 = __webpack_require__(32);
class Serializer {
    static stringify(value, indent = 0) {
        if (isObject_1.default(value)) {
            if (isArray_1.default(value)) {
                return Serializer.writeArray(value, indent);
            }
            else {
                return Serializer.writeObject(value, indent);
            }
        }
        else {
            if (isNumber_1.default(value)) {
                return Serializer.writeNumber(value);
            }
            else if (isString_1.default(value)) {
                return Serializer.writeString(value);
            }
            else {
                return String(value);
            }
        }
    }
    static writeArray(array, indent) {
        return '[ ' + array.map(function (item) {
            return Serializer.stringify(item, indent + 2);
        }).join(' ') + ' ]';
    }
    static writeObject(value, indent) {
        if (Object.keys(value).length === 0) {
            return '{ }';
        }
        const entries = Object.keys(value)
            .map(function (key) {
            return Serializer.writeField(key, Serializer.stringify(value[key], indent + 2), indent + 2);
        })
            .join('\n');
        return '{\n' + entries + '\n' + ' '.repeat(indent) + '}';
    }
    static writeString(value) {
        return '"' + value + '"';
    }
    static writeNumber(value, precision = 6) {
        return String(Math.floor(value * 10 ** precision) / 10 ** precision);
    }
    static writeField(key, value, indent) {
        return ' '.repeat(indent) + key + ' ' + value;
    }
}
exports.default = Serializer;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/* harmony default export */ __webpack_exports__["default"] = (isObject);


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__isObjectLike_js__ = __webpack_require__(10);



/** `Object#toString` result references. */
var numberTag = '[object Number]';

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (Object(__WEBPACK_IMPORTED_MODULE_1__isObjectLike_js__["a" /* default */])(value) && Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) == numberTag);
}

/* harmony default export */ __webpack_exports__["default"] = (isNumber);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(29);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(9);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__isArray_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(10);




/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!Object(__WEBPACK_IMPORTED_MODULE_1__isArray_js__["default"])(value) && Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) && Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) == stringTag);
}

/* harmony default export */ __webpack_exports__["default"] = (isString);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TextWriter_1 = __webpack_require__(4);
const Serializer_1 = __webpack_require__(1);
class STCWriter extends TextWriter_1.default {
    writeHeader(value) {
        const mode = (value.mode !== null && value.modeSet) ? value.mode : '';
        const type = (value.type !== null && value.typeSet) ? value.type : '';
        const HIP = value.number !== null ? value.number : '';
        const names = (value.names !== null && value.nameSet) ? Serializer_1.Serializer.writeString(value.names.join(':')) : '';
        return [mode, type, HIP, names].join(' ').trim();
    }
}
exports.default = STCWriter;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TextWriter_1 = __webpack_require__(4);
const Serializer_1 = __webpack_require__(1);
class SSCWriter extends TextWriter_1.default {
    writeHeader(value) {
        const mode = (value.mode !== null && value.modeSet) ? value.mode : '';
        const type = (value.type !== null && value.typeSet) ? value.type : '';
        const names = value.names !== null ? Serializer_1.Serializer.writeString(value.names.join(':')) : '';
        const parentName = value.pathToParent !== null ? Serializer_1.Serializer.writeString(value.pathToParent.join('/')) : '';
        return [mode, type, names, parentName].join(' ').trim();
    }
}
exports.default = SSCWriter;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TextWriter_1 = __webpack_require__(4);
const Serializer_1 = __webpack_require__(1);
class DSCWriter extends TextWriter_1.default {
    writeHeader(value) {
        const catalogNumber = value.number !== null ? String(value.number) : '';
        const type = value.type !== null ? value.type : '';
        const name = value.names !== null ? Serializer_1.Serializer.writeString(value.names.join(':')) : '';
        return [catalogNumber, type, name].join(' ');
    }
}
exports.default = DSCWriter;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ConfigWriter_1 = __webpack_require__(6);
class DSCWriter extends ConfigWriter_1.default {
    writeHeader(value) {
        return '';
    }
}
exports.default = DSCWriter;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BinaryWriter_1 = __webpack_require__(38);
const Constants_1 = __webpack_require__(2);
const utils_1 = __webpack_require__(5);
class DATWriter extends BinaryWriter_1.default {
    process(items) {
        const header = Constants_1.default.FILE_HEADER;
        const version = Constants_1.default.VERSION;
        const itemsCount = items.length;
        const headerOffset = header.length + 6;
        const buffer = Buffer.alloc(headerOffset + itemsCount * 20);
        buffer.write(header, 0);
        buffer.writeUInt16LE(version, Constants_1.default.FILE_HEADER.length);
        buffer.writeUInt32LE(itemsCount, Constants_1.default.FILE_HEADER.length + 2);
        let offset = headerOffset;
        for (let i = 0; i < itemsCount; ++i) {
            buffer.writeUInt32LE(items[i].meta.number, offset, true);
            buffer.writeFloatLE(items[i].properties.Distance, offset + 4, true);
            buffer.writeFloatLE(items[i].properties.RA, offset + 8, true);
            buffer.writeFloatLE(items[i].properties.Dec, offset + 12, true);
            buffer.writeInt16LE(items[i].properties.AbsMag, offset + 16, true);
            buffer.writeUInt16LE(utils_1.encodeSpectralClass(items[i].properties.SpectralType), offset + 18, true);
            offset += 20;
        }
        return buffer;
    }
}
exports.default = DATWriter;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(0);
class BinaryWriter {
    constructor() {
        this.defaultWriteMode = {
            mode: 0o644,
            flag: 'w+'
        };
    }
    write(fullPath, items, options = this.defaultWriteMode) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fullPath, this.process(items), options, (error) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }
}
exports.default = BinaryWriter;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CFGGrammar = __webpack_require__(40);
const DSCGrammar = __webpack_require__(41);
const SSCGrammar = __webpack_require__(42);
const STCGrammar = __webpack_require__(43);
exports.default = {
    CFGGrammar,
    DSCGrammar,
    SSCGrammar,
    STCGrammar
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

  const fromPairs = function (input) {
    return input.reduce((acc, i) => {
        acc[i[0]] = i[1]
        return acc
    }, {})
  }
  const moo = __webpack_require__(3)

  const nuller = x => null

  const lexer = moo.compile({
    CONFIG_KEYWORD: /Configuration\b/,

    ADD_MODE: /Add\b/,
    MODIFY_MODE: /Modify\b/,
    REPLACE_MODE: /Replace\b/,

    SSC_BODY_TYPE: /Body\b/,
    SSC_REF_POINT_TYPE: /ReferencePoint\b/,
    SSC_SURF_POINT_TYPE: /SurfacePoint\b/,
    SSC_ALT_SURFACE: /AltSurface\b/,
    SSC_LOCATION: /Location\b/,

    STC_STAR_TYPE: /Star\b/,
    STC_BARYCENTER_TYPE: /Barycenter\b/,

    DSC_GALAXY_TYPE: /Galaxy\b/,
    DSC_GLOBULAR_TYPE: /Globular\b/,
    DSC_NEBULA_TYPE: /Nebula\b/,
    DSC_OPEN_CLUSTER_TYPE: /OpenCluster\b/,

    TRUE: /true/,
    FALSE: /false/,

    NUMBER: /[+-]?[0-9]+(?:\.[0-9]+)?(?:[eE][+-][0-9]+)?/,
    WORD: /[\w]+\b/,
    STRING: /"(?:\\[#"\\]|[^\n"\\])*"/,
    BRACE_L: '{',
    BRACE_R: '}',
    SQU_BRA_L: '[',
    SQU_BRA_R: ']',
    WS: {
      match: /[\s]+/,
      lineBreaks: true
    },
    COMMENT: {
      match: /#.*?\r\n/,
      lineBreaks: true
    }
  })
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "VALUE", "symbols": ["BOOLEAN"]},
    {"name": "VALUE", "symbols": ["NUMBER"]},
    {"name": "VALUE", "symbols": ["STRING"]},
    {"name": "VALUE", "symbols": ["GROUP"]},
    {"name": "VALUE", "symbols": ["ARRAY"]},
    {"name": "GROUP$ebnf$1", "symbols": []},
    {"name": "GROUP$ebnf$1", "symbols": ["GROUP$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "GROUP$ebnf$2", "symbols": []},
    {"name": "GROUP$ebnf$2", "symbols": ["GROUP$ebnf$2", "GROUP_PROPERTY"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "GROUP", "symbols": [(lexer.has("BRACE_L") ? {type: "BRACE_L"} : BRACE_L), "GROUP$ebnf$1", "GROUP$ebnf$2", (lexer.has("BRACE_R") ? {type: "BRACE_R"} : BRACE_R)], "postprocess": data => fromPairs(data[2])},
    {"name": "GROUP_PROPERTY$ebnf$1", "symbols": []},
    {"name": "GROUP_PROPERTY$ebnf$1", "symbols": ["GROUP_PROPERTY$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "GROUP_PROPERTY", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD), "WS", "VALUE", "GROUP_PROPERTY$ebnf$1"], "postprocess": data => [ data[0].value, data[2][0] ]},
    {"name": "ARRAY$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "ARRAY$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ARRAY$ebnf$2", "symbols": []},
    {"name": "ARRAY$ebnf$2", "symbols": ["ARRAY$ebnf$2", "ARRAY_ELEMENT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ARRAY", "symbols": [(lexer.has("SQU_BRA_L") ? {type: "SQU_BRA_L"} : SQU_BRA_L), "ARRAY$ebnf$1", "ARRAY$ebnf$2", (lexer.has("SQU_BRA_R") ? {type: "SQU_BRA_R"} : SQU_BRA_R)], "postprocess": data => data[2]},
    {"name": "ARRAY_ELEMENT$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "ARRAY_ELEMENT$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ARRAY_ELEMENT", "symbols": ["VALUE", "ARRAY_ELEMENT$ebnf$1"], "postprocess": data => data[0][0]},
    {"name": "BOOLEAN", "symbols": [(lexer.has("TRUE") ? {type: "TRUE"} : TRUE)], "postprocess": data => data[0].value === 'true'},
    {"name": "BOOLEAN", "symbols": [(lexer.has("FALSE") ? {type: "FALSE"} : FALSE)], "postprocess": data => data[0].value === 'true'},
    {"name": "WORD", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": data => data[0].value},
    {"name": "NUMBER", "symbols": [(lexer.has("NUMBER") ? {type: "NUMBER"} : NUMBER)], "postprocess": data => parseFloat(data[0].value)},
    {"name": "STRING", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": data => data[0].value.split('"')[1]},
    {"name": "WS", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": nuller},
    {"name": "WS", "symbols": [(lexer.has("COMMENT") ? {type: "COMMENT"} : COMMENT)], "postprocess": nuller},
    {"name": "CONFIG", "symbols": ["CONFIG_KEYWORD", "CONFIG_DESCRIPTION"], "postprocess": ([keyword, params]) => params},
    {"name": "CONFIG_KEYWORD$ebnf$1", "symbols": []},
    {"name": "CONFIG_KEYWORD$ebnf$1", "symbols": ["CONFIG_KEYWORD$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "CONFIG_KEYWORD$ebnf$2", "symbols": []},
    {"name": "CONFIG_KEYWORD$ebnf$2", "symbols": ["CONFIG_KEYWORD$ebnf$2", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "CONFIG_KEYWORD", "symbols": ["CONFIG_KEYWORD$ebnf$1", (lexer.has("CONFIG_KEYWORD") ? {type: "CONFIG_KEYWORD"} : CONFIG_KEYWORD), "CONFIG_KEYWORD$ebnf$2"], "postprocess": ([keyword]) => keyword[0]},
    {"name": "CONFIG_DESCRIPTION$ebnf$1", "symbols": []},
    {"name": "CONFIG_DESCRIPTION$ebnf$1", "symbols": ["CONFIG_DESCRIPTION$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "CONFIG_DESCRIPTION", "symbols": ["GROUP", "CONFIG_DESCRIPTION$ebnf$1"], "postprocess": ([properties]) => properties}
]
  , ParserStart: "CONFIG"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

  let globalId = 0


  const fromPairs = function (input) {
    return input.reduce((acc, i) => {
        acc[i[0]] = i[1]
        return acc
    }, {})
  }
  const moo = __webpack_require__(3)

  const nuller = x => null

  const lexer = moo.compile({
    CONFIG_KEYWORD: /Configuration\b/,

    ADD_MODE: /Add\b/,
    MODIFY_MODE: /Modify\b/,
    REPLACE_MODE: /Replace\b/,

    SSC_BODY_TYPE: /Body\b/,
    SSC_REF_POINT_TYPE: /ReferencePoint\b/,
    SSC_SURF_POINT_TYPE: /SurfacePoint\b/,
    SSC_ALT_SURFACE: /AltSurface\b/,
    SSC_LOCATION: /Location\b/,

    STC_STAR_TYPE: /Star\b/,
    STC_BARYCENTER_TYPE: /Barycenter\b/,

    DSC_GALAXY_TYPE: /Galaxy\b/,
    DSC_GLOBULAR_TYPE: /Globular\b/,
    DSC_NEBULA_TYPE: /Nebula\b/,
    DSC_OPEN_CLUSTER_TYPE: /OpenCluster\b/,

    TRUE: /true/,
    FALSE: /false/,

    NUMBER: /[+-]?[0-9]+(?:\.[0-9]+)?(?:[eE][+-][0-9]+)?/,
    WORD: /[\w]+\b/,
    STRING: /"(?:\\[#"\\]|[^\n"\\])*"/,
    BRACE_L: '{',
    BRACE_R: '}',
    SQU_BRA_L: '[',
    SQU_BRA_R: ']',
    WS: {
      match: /[\s]+/,
      lineBreaks: true
    },
    COMMENT: {
      match: /#.*?\r\n/,
      lineBreaks: true
    }
  })
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "VALUE", "symbols": ["BOOLEAN"]},
    {"name": "VALUE", "symbols": ["NUMBER"]},
    {"name": "VALUE", "symbols": ["STRING"]},
    {"name": "VALUE", "symbols": ["GROUP"]},
    {"name": "VALUE", "symbols": ["ARRAY"]},
    {"name": "GROUP$ebnf$1", "symbols": []},
    {"name": "GROUP$ebnf$1", "symbols": ["GROUP$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "GROUP$ebnf$2", "symbols": []},
    {"name": "GROUP$ebnf$2", "symbols": ["GROUP$ebnf$2", "GROUP_PROPERTY"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "GROUP", "symbols": [(lexer.has("BRACE_L") ? {type: "BRACE_L"} : BRACE_L), "GROUP$ebnf$1", "GROUP$ebnf$2", (lexer.has("BRACE_R") ? {type: "BRACE_R"} : BRACE_R)], "postprocess": data => fromPairs(data[2])},
    {"name": "GROUP_PROPERTY$ebnf$1", "symbols": []},
    {"name": "GROUP_PROPERTY$ebnf$1", "symbols": ["GROUP_PROPERTY$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "GROUP_PROPERTY", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD), "WS", "VALUE", "GROUP_PROPERTY$ebnf$1"], "postprocess": data => [ data[0].value, data[2][0] ]},
    {"name": "ARRAY$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "ARRAY$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ARRAY$ebnf$2", "symbols": []},
    {"name": "ARRAY$ebnf$2", "symbols": ["ARRAY$ebnf$2", "ARRAY_ELEMENT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ARRAY", "symbols": [(lexer.has("SQU_BRA_L") ? {type: "SQU_BRA_L"} : SQU_BRA_L), "ARRAY$ebnf$1", "ARRAY$ebnf$2", (lexer.has("SQU_BRA_R") ? {type: "SQU_BRA_R"} : SQU_BRA_R)], "postprocess": data => data[2]},
    {"name": "ARRAY_ELEMENT$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "ARRAY_ELEMENT$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ARRAY_ELEMENT", "symbols": ["VALUE", "ARRAY_ELEMENT$ebnf$1"], "postprocess": data => data[0][0]},
    {"name": "BOOLEAN", "symbols": [(lexer.has("TRUE") ? {type: "TRUE"} : TRUE)], "postprocess": data => data[0].value === 'true'},
    {"name": "BOOLEAN", "symbols": [(lexer.has("FALSE") ? {type: "FALSE"} : FALSE)], "postprocess": data => data[0].value === 'true'},
    {"name": "WORD", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": data => data[0].value},
    {"name": "NUMBER", "symbols": [(lexer.has("NUMBER") ? {type: "NUMBER"} : NUMBER)], "postprocess": data => parseFloat(data[0].value)},
    {"name": "STRING", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": data => data[0].value.split('"')[1]},
    {"name": "WS", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": nuller},
    {"name": "WS", "symbols": [(lexer.has("COMMENT") ? {type: "COMMENT"} : COMMENT)], "postprocess": nuller},
    {"name": "DSC_CATALOG$ebnf$1", "symbols": []},
    {"name": "DSC_CATALOG$ebnf$1", "symbols": ["DSC_CATALOG$ebnf$1", "DSC_DEFINITION"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "DSC_CATALOG", "symbols": ["DSC_CATALOG$ebnf$1"], "postprocess": id},
    {"name": "DSC_DEFINITION$ebnf$1", "symbols": []},
    {"name": "DSC_DEFINITION$ebnf$1", "symbols": ["DSC_DEFINITION$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "DSC_DEFINITION$ebnf$2", "symbols": ["DSC_NUMBER"], "postprocess": id},
    {"name": "DSC_DEFINITION$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "DSC_DEFINITION", "symbols": ["DSC_DEFINITION$ebnf$1", "DSC_DEFINITION$ebnf$2", "DSC_OBJECT_TYPE", "DSC_NAME", "DSC_PROPERTIES"], "postprocess": 
        ([, number, type, name, properties]) => {
          if (number === null) {
            number = globalId++
          }
        
          return {
            meta: {
              type,
              number,
              names: name.split(':')
            },
            properties
          }
        }
        },
    {"name": "DSC_PROPERTIES", "symbols": ["GROUP", "WS"], "postprocess": data => data[0]},
    {"name": "DSC_NUMBER", "symbols": ["NUMBER", "WS"], "postprocess": data => data[0]},
    {"name": "DSC_NAME", "symbols": ["STRING", "WS"], "postprocess": data => data[0]},
    {"name": "DSC_OBJECT_TYPE", "symbols": [(lexer.has("DSC_GALAXY_TYPE") ? {type: "DSC_GALAXY_TYPE"} : DSC_GALAXY_TYPE), "WS"], "postprocess": data => data[0].value},
    {"name": "DSC_OBJECT_TYPE", "symbols": [(lexer.has("DSC_GLOBULAR_TYPE") ? {type: "DSC_GLOBULAR_TYPE"} : DSC_GLOBULAR_TYPE), "WS"], "postprocess": data => data[0].value},
    {"name": "DSC_OBJECT_TYPE", "symbols": [(lexer.has("DSC_NEBULA_TYPE") ? {type: "DSC_NEBULA_TYPE"} : DSC_NEBULA_TYPE), "WS"], "postprocess": data => data[0].value},
    {"name": "DSC_OBJECT_TYPE", "symbols": [(lexer.has("DSC_OPEN_CLUSTER_TYPE") ? {type: "DSC_OPEN_CLUSTER_TYPE"} : DSC_OPEN_CLUSTER_TYPE), "WS"], "postprocess": data => data[0].value}
]
  , ParserStart: "DSC_CATALOG"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

  const fromPairs = function (input) {
    return input.reduce((acc, i) => {
        acc[i[0]] = i[1]
        return acc
    }, {})
  }
  const moo = __webpack_require__(3)

  const nuller = x => null

  const lexer = moo.compile({
    CONFIG_KEYWORD: /Configuration\b/,

    ADD_MODE: /Add\b/,
    MODIFY_MODE: /Modify\b/,
    REPLACE_MODE: /Replace\b/,

    SSC_BODY_TYPE: /Body\b/,
    SSC_REF_POINT_TYPE: /ReferencePoint\b/,
    SSC_SURF_POINT_TYPE: /SurfacePoint\b/,
    SSC_ALT_SURFACE: /AltSurface\b/,
    SSC_LOCATION: /Location\b/,

    STC_STAR_TYPE: /Star\b/,
    STC_BARYCENTER_TYPE: /Barycenter\b/,

    DSC_GALAXY_TYPE: /Galaxy\b/,
    DSC_GLOBULAR_TYPE: /Globular\b/,
    DSC_NEBULA_TYPE: /Nebula\b/,
    DSC_OPEN_CLUSTER_TYPE: /OpenCluster\b/,

    TRUE: /true/,
    FALSE: /false/,

    NUMBER: /[+-]?[0-9]+(?:\.[0-9]+)?(?:[eE][+-][0-9]+)?/,
    WORD: /[\w]+\b/,
    STRING: /"(?:\\[#"\\]|[^\n"\\])*"/,
    BRACE_L: '{',
    BRACE_R: '}',
    SQU_BRA_L: '[',
    SQU_BRA_R: ']',
    WS: {
      match: /[\s]+/,
      lineBreaks: true
    },
    COMMENT: {
      match: /#.*?\r\n/,
      lineBreaks: true
    }
  })
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "VALUE", "symbols": ["BOOLEAN"]},
    {"name": "VALUE", "symbols": ["NUMBER"]},
    {"name": "VALUE", "symbols": ["STRING"]},
    {"name": "VALUE", "symbols": ["GROUP"]},
    {"name": "VALUE", "symbols": ["ARRAY"]},
    {"name": "GROUP$ebnf$1", "symbols": []},
    {"name": "GROUP$ebnf$1", "symbols": ["GROUP$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "GROUP$ebnf$2", "symbols": []},
    {"name": "GROUP$ebnf$2", "symbols": ["GROUP$ebnf$2", "GROUP_PROPERTY"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "GROUP", "symbols": [(lexer.has("BRACE_L") ? {type: "BRACE_L"} : BRACE_L), "GROUP$ebnf$1", "GROUP$ebnf$2", (lexer.has("BRACE_R") ? {type: "BRACE_R"} : BRACE_R)], "postprocess": data => fromPairs(data[2])},
    {"name": "GROUP_PROPERTY$ebnf$1", "symbols": []},
    {"name": "GROUP_PROPERTY$ebnf$1", "symbols": ["GROUP_PROPERTY$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "GROUP_PROPERTY", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD), "WS", "VALUE", "GROUP_PROPERTY$ebnf$1"], "postprocess": data => [ data[0].value, data[2][0] ]},
    {"name": "ARRAY$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "ARRAY$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ARRAY$ebnf$2", "symbols": []},
    {"name": "ARRAY$ebnf$2", "symbols": ["ARRAY$ebnf$2", "ARRAY_ELEMENT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ARRAY", "symbols": [(lexer.has("SQU_BRA_L") ? {type: "SQU_BRA_L"} : SQU_BRA_L), "ARRAY$ebnf$1", "ARRAY$ebnf$2", (lexer.has("SQU_BRA_R") ? {type: "SQU_BRA_R"} : SQU_BRA_R)], "postprocess": data => data[2]},
    {"name": "ARRAY_ELEMENT$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "ARRAY_ELEMENT$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ARRAY_ELEMENT", "symbols": ["VALUE", "ARRAY_ELEMENT$ebnf$1"], "postprocess": data => data[0][0]},
    {"name": "BOOLEAN", "symbols": [(lexer.has("TRUE") ? {type: "TRUE"} : TRUE)], "postprocess": data => data[0].value === 'true'},
    {"name": "BOOLEAN", "symbols": [(lexer.has("FALSE") ? {type: "FALSE"} : FALSE)], "postprocess": data => data[0].value === 'true'},
    {"name": "WORD", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": data => data[0].value},
    {"name": "NUMBER", "symbols": [(lexer.has("NUMBER") ? {type: "NUMBER"} : NUMBER)], "postprocess": data => parseFloat(data[0].value)},
    {"name": "STRING", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": data => data[0].value.split('"')[1]},
    {"name": "WS", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": nuller},
    {"name": "WS", "symbols": [(lexer.has("COMMENT") ? {type: "COMMENT"} : COMMENT)], "postprocess": nuller},
    {"name": "SSC_CATALOG$ebnf$1", "symbols": []},
    {"name": "SSC_CATALOG$ebnf$1", "symbols": ["SSC_CATALOG$ebnf$1", "SSC_DEFINITION"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "SSC_CATALOG", "symbols": ["SSC_CATALOG$ebnf$1"], "postprocess": id},
    {"name": "SSC_DEFINITION$ebnf$1", "symbols": []},
    {"name": "SSC_DEFINITION$ebnf$1", "symbols": ["SSC_DEFINITION$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "SSC_DEFINITION$ebnf$2", "symbols": ["SSC_OBJECT_MODE"], "postprocess": id},
    {"name": "SSC_DEFINITION$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SSC_DEFINITION$ebnf$3", "symbols": ["SSC_OBJECT_TYPE"], "postprocess": id},
    {"name": "SSC_DEFINITION$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SSC_DEFINITION", "symbols": ["SSC_DEFINITION$ebnf$1", "SSC_DEFINITION$ebnf$2", "SSC_DEFINITION$ebnf$3", "SSC_NAME", "SSC_PARENT_NAME", "SSC_PROPERTIES"], "postprocess": 
        ([, mode = 'Add', type = 'Body', name, pathToParent, properties]) => {
          return {
            meta: {
              mode: mode !== null ? mode : 'Add',
              modeSet: mode !== null,
              type: type !== null ? type : 'Body',
              typeSet: type !== null,
              names: name.split(':'),
              pathToParent: pathToParent.split('/')
            },
            properties
          }
        }
        },
    {"name": "SSC_PROPERTIES", "symbols": ["GROUP", "WS"], "postprocess": data => data[0]},
    {"name": "SSC_OBJECT_MODE", "symbols": [(lexer.has("MODIFY_MODE") ? {type: "MODIFY_MODE"} : MODIFY_MODE), "WS"], "postprocess": data => data[0].value},
    {"name": "SSC_OBJECT_MODE", "symbols": [(lexer.has("ADD_MODE") ? {type: "ADD_MODE"} : ADD_MODE), "WS"], "postprocess": data => data[0].value},
    {"name": "SSC_OBJECT_MODE", "symbols": [(lexer.has("REPLACE_MODE") ? {type: "REPLACE_MODE"} : REPLACE_MODE), "WS"], "postprocess": data => data[0].value},
    {"name": "SSC_PARENT_NAME", "symbols": ["STRING", "WS"], "postprocess": data => data[0]},
    {"name": "SSC_NAME", "symbols": ["STRING", "WS"], "postprocess": data => data[0]},
    {"name": "SSC_OBJECT_TYPE", "symbols": [(lexer.has("SSC_BODY_TYPE") ? {type: "SSC_BODY_TYPE"} : SSC_BODY_TYPE), "WS"], "postprocess": data => data[0].value},
    {"name": "SSC_OBJECT_TYPE", "symbols": [(lexer.has("SSC_REF_POINT_TYPE") ? {type: "SSC_REF_POINT_TYPE"} : SSC_REF_POINT_TYPE), "WS"], "postprocess": data => data[0].value},
    {"name": "SSC_OBJECT_TYPE", "symbols": [(lexer.has("SSC_SURF_POINT_TYPE") ? {type: "SSC_SURF_POINT_TYPE"} : SSC_SURF_POINT_TYPE), "WS"], "postprocess": data => data[0].value},
    {"name": "SSC_OBJECT_TYPE", "symbols": [(lexer.has("SSC_ALT_SURFACE") ? {type: "SSC_ALT_SURFACE"} : SSC_ALT_SURFACE), "WS"], "postprocess": data => data[0].value},
    {"name": "SSC_OBJECT_TYPE", "symbols": [(lexer.has("SSC_LOCATION") ? {type: "SSC_LOCATION"} : SSC_LOCATION), "WS"], "postprocess": data => data[0].value}
]
  , ParserStart: "SSC_CATALOG"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

  const validModes = ['Modify', 'Add', 'Replace']
  const validTypes = ['Star', 'Barycenter']


  const fromPairs = function (input) {
    return input.reduce((acc, i) => {
        acc[i[0]] = i[1]
        return acc
    }, {})
  }
  const moo = __webpack_require__(3)

  const nuller = x => null

  const lexer = moo.compile({
    CONFIG_KEYWORD: /Configuration\b/,

    ADD_MODE: /Add\b/,
    MODIFY_MODE: /Modify\b/,
    REPLACE_MODE: /Replace\b/,

    SSC_BODY_TYPE: /Body\b/,
    SSC_REF_POINT_TYPE: /ReferencePoint\b/,
    SSC_SURF_POINT_TYPE: /SurfacePoint\b/,
    SSC_ALT_SURFACE: /AltSurface\b/,
    SSC_LOCATION: /Location\b/,

    STC_STAR_TYPE: /Star\b/,
    STC_BARYCENTER_TYPE: /Barycenter\b/,

    DSC_GALAXY_TYPE: /Galaxy\b/,
    DSC_GLOBULAR_TYPE: /Globular\b/,
    DSC_NEBULA_TYPE: /Nebula\b/,
    DSC_OPEN_CLUSTER_TYPE: /OpenCluster\b/,

    TRUE: /true/,
    FALSE: /false/,

    NUMBER: /[+-]?[0-9]+(?:\.[0-9]+)?(?:[eE][+-][0-9]+)?/,
    WORD: /[\w]+\b/,
    STRING: /"(?:\\[#"\\]|[^\n"\\])*"/,
    BRACE_L: '{',
    BRACE_R: '}',
    SQU_BRA_L: '[',
    SQU_BRA_R: ']',
    WS: {
      match: /[\s]+/,
      lineBreaks: true
    },
    COMMENT: {
      match: /#.*?\r\n/,
      lineBreaks: true
    }
  })
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "VALUE", "symbols": ["BOOLEAN"]},
    {"name": "VALUE", "symbols": ["NUMBER"]},
    {"name": "VALUE", "symbols": ["STRING"]},
    {"name": "VALUE", "symbols": ["GROUP"]},
    {"name": "VALUE", "symbols": ["ARRAY"]},
    {"name": "GROUP$ebnf$1", "symbols": []},
    {"name": "GROUP$ebnf$1", "symbols": ["GROUP$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "GROUP$ebnf$2", "symbols": []},
    {"name": "GROUP$ebnf$2", "symbols": ["GROUP$ebnf$2", "GROUP_PROPERTY"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "GROUP", "symbols": [(lexer.has("BRACE_L") ? {type: "BRACE_L"} : BRACE_L), "GROUP$ebnf$1", "GROUP$ebnf$2", (lexer.has("BRACE_R") ? {type: "BRACE_R"} : BRACE_R)], "postprocess": data => fromPairs(data[2])},
    {"name": "GROUP_PROPERTY$ebnf$1", "symbols": []},
    {"name": "GROUP_PROPERTY$ebnf$1", "symbols": ["GROUP_PROPERTY$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "GROUP_PROPERTY", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD), "WS", "VALUE", "GROUP_PROPERTY$ebnf$1"], "postprocess": data => [ data[0].value, data[2][0] ]},
    {"name": "ARRAY$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "ARRAY$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ARRAY$ebnf$2", "symbols": []},
    {"name": "ARRAY$ebnf$2", "symbols": ["ARRAY$ebnf$2", "ARRAY_ELEMENT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ARRAY", "symbols": [(lexer.has("SQU_BRA_L") ? {type: "SQU_BRA_L"} : SQU_BRA_L), "ARRAY$ebnf$1", "ARRAY$ebnf$2", (lexer.has("SQU_BRA_R") ? {type: "SQU_BRA_R"} : SQU_BRA_R)], "postprocess": data => data[2]},
    {"name": "ARRAY_ELEMENT$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "ARRAY_ELEMENT$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ARRAY_ELEMENT", "symbols": ["VALUE", "ARRAY_ELEMENT$ebnf$1"], "postprocess": data => data[0][0]},
    {"name": "BOOLEAN", "symbols": [(lexer.has("TRUE") ? {type: "TRUE"} : TRUE)], "postprocess": data => data[0].value === 'true'},
    {"name": "BOOLEAN", "symbols": [(lexer.has("FALSE") ? {type: "FALSE"} : FALSE)], "postprocess": data => data[0].value === 'true'},
    {"name": "WORD", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": data => data[0].value},
    {"name": "NUMBER", "symbols": [(lexer.has("NUMBER") ? {type: "NUMBER"} : NUMBER)], "postprocess": data => parseFloat(data[0].value)},
    {"name": "STRING", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": data => data[0].value.split('"')[1]},
    {"name": "WS", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": nuller},
    {"name": "WS", "symbols": [(lexer.has("COMMENT") ? {type: "COMMENT"} : COMMENT)], "postprocess": nuller},
    {"name": "CATALOG$ebnf$1", "symbols": []},
    {"name": "CATALOG$ebnf$1", "symbols": ["CATALOG$ebnf$1", "STC_DEFINITION"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "CATALOG", "symbols": ["CATALOG$ebnf$1"], "postprocess": id},
    {"name": "STC_DEFINITION$ebnf$1", "symbols": []},
    {"name": "STC_DEFINITION$ebnf$1", "symbols": ["STC_DEFINITION$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "STC_DEFINITION$ebnf$2", "symbols": ["STC_OBJECT_MODE"], "postprocess": id},
    {"name": "STC_DEFINITION$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "STC_DEFINITION$ebnf$3", "symbols": ["STC_OBJECT_TYPE"], "postprocess": id},
    {"name": "STC_DEFINITION$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "STC_DEFINITION$ebnf$4", "symbols": ["STC_HIP_NUMBER"], "postprocess": id},
    {"name": "STC_DEFINITION$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "STC_DEFINITION$ebnf$5", "symbols": ["STC_NAME"], "postprocess": id},
    {"name": "STC_DEFINITION$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "STC_DEFINITION", "symbols": ["STC_DEFINITION$ebnf$1", "STC_DEFINITION$ebnf$2", "STC_DEFINITION$ebnf$3", "STC_DEFINITION$ebnf$4", "STC_DEFINITION$ebnf$5", "STC_PROPERTIES"], "postprocess": 
        ([, mode, type, number, name, properties], l) => {
          if (number === null && name === null) {
            throw new Error(`Incorrect object definition at line ${l}`)
          }
        
          if (mode !== null && validModes.indexOf(mode) === -1) {
            throw new Error(`Wrong object creation mode "${mode}" at line ${l}`)
          }
        
          if (type !== null && validTypes.indexOf(type) === -1) {
            if (validModes.indexOf(type) !== -1) {
              mode = type
              type = null
            } else {
              throw new Error(`Wrong object type "${type}" at line ${l}`)
            }
          }
        
          return {
            meta:{
              mode: mode !== null ? mode : 'Add',
              modeSet: mode !== null,
              type: type !== null ? type : 'Star',
              typeSet: type !== null,
              names: name !== null ? name.split(':') : [],
              nameSet: name !== null,
              number: number !== null ? number : {}
            },
            properties
          }
        }
        },
    {"name": "STC_PROPERTIES", "symbols": ["GROUP", "WS"], "postprocess": data => data[0]},
    {"name": "STC_HIP_NUMBER$ebnf$1", "symbols": []},
    {"name": "STC_HIP_NUMBER$ebnf$1", "symbols": ["STC_HIP_NUMBER$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "STC_HIP_NUMBER", "symbols": ["NUMBER", "STC_HIP_NUMBER$ebnf$1"], "postprocess": data => data[0]},
    {"name": "STC_NAME", "symbols": ["STRING", "WS"], "postprocess": data => data[0]},
    {"name": "STC_OBJECT_MODE", "symbols": [(lexer.has("MODIFY_MODE") ? {type: "MODIFY_MODE"} : MODIFY_MODE), "WS"], "postprocess": data => data[0].value},
    {"name": "STC_OBJECT_MODE", "symbols": [(lexer.has("ADD_MODE") ? {type: "ADD_MODE"} : ADD_MODE), "WS"], "postprocess": data => data[0].value},
    {"name": "STC_OBJECT_MODE", "symbols": [(lexer.has("REPLACE_MODE") ? {type: "REPLACE_MODE"} : REPLACE_MODE), "WS"], "postprocess": data => data[0].value},
    {"name": "STC_OBJECT_TYPE", "symbols": [(lexer.has("STC_STAR_TYPE") ? {type: "STC_STAR_TYPE"} : STC_STAR_TYPE), "WS"], "postprocess": data => data[0].value},
    {"name": "STC_OBJECT_TYPE", "symbols": [(lexer.has("STC_BARYCENTER_TYPE") ? {type: "STC_BARYCENTER_TYPE"} : STC_BARYCENTER_TYPE), "WS"], "postprocess": data => data[0].value}
]
  , ParserStart: "CATALOG"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FormatsChecker_1 = __webpack_require__(45);
exports.FormatsChecker = FormatsChecker_1.FormatsChecker;
exports.FormatType = FormatsChecker_1.FormatType;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const reduce = function (input) {
    return Object.keys(input).reduce((acc, key) => {
        return [].concat(acc, input[key]);
    }, []);
};
var FormatType;
(function (FormatType) {
    FormatType[FormatType["TEXT"] = 0] = "TEXT";
    FormatType[FormatType["BINARY"] = 1] = "BINARY";
    FormatType[FormatType["INCORRECT"] = 2] = "INCORRECT";
})(FormatType || (FormatType = {}));
exports.FormatType = FormatType;
class FormatsChecker {
    static get viableFormats() {
        return reduce(FormatsChecker._viableFormats);
    }
    static isCorrectExtension(extension) {
        return FormatsChecker.viableFormats.indexOf(extension.toLowerCase()) !== -1;
    }
    static formatType(extension) {
        if (!FormatsChecker.isCorrectExtension(extension)) {
            return FormatType.INCORRECT;
        }
        if (FormatsChecker._viableFormats.text.indexOf(extension) !== -1) {
            return FormatType.TEXT;
        }
        else {
            return FormatType.BINARY;
        }
    }
}
FormatsChecker._viableFormats = {
    text: ['stc', 'ssc', 'dsc', 'cfg'],
    binary: ['dat']
};
exports.FormatsChecker = FormatsChecker;


/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTY2N2RjNzdmNDNhOGM1YTEzYmEiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vLi9zcmMvU2VyaWFsaXplci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb28vbW9vLmpzIiwid2VicGFjazovLy8uL3NyYy9Xcml0ZXIvVGV4dFdyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1dyaXRlci9Db25maWdXcml0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2VsaW8vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NlbGlvL0NlbGlvLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vLi9zcmMvSW5qZWN0b3IvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0luamVjdG9yL0luamVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9SZWFkZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlYWRlci9OZWFybGV5QmFzZWRSZWFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lYXJsZXkvbGliL25lYXJsZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlYWRlci9EQVRSZWFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NvbnZlcnNpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kZWNvZGVTcGVjdHJhbENsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9lbmNvZGVTcGVjdHJhbENsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy9Xcml0ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlcmlhbGl6ZXIvU2VyaWFsaXplci50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNOdW1iZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcm9vdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzU3RyaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9Xcml0ZXIvU1RDV3JpdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Xcml0ZXIvU1NDV3JpdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Xcml0ZXIvRFNDV3JpdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Xcml0ZXIvQ0ZHV3JpdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Xcml0ZXIvREFUV3JpdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Xcml0ZXIvQmluYXJ5V3JpdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFtbWFyL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9ncmFtbWFyL2NmZ3BhcnNlci5uZSIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhbW1hci9kc2NwYXJzZXIubmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dyYW1tYXIvc3NjcGFyc2VyLm5lIiwid2VicGFjazovLy8uL3NyYy9ncmFtbWFyL3N0Y3BhcnNlci5uZSIsIndlYnBhY2s6Ly8vLi9zcmMvRm9ybWF0c0NoZWNrZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Zvcm1hdHNDaGVja2VyL0Zvcm1hdHNDaGVja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSwrQjs7Ozs7Ozs7O0FDQUEsNkNBQXFDO0FBR25DLHFCQUhLLG9CQUFVLENBR0w7Ozs7Ozs7Ozs7QUNIWixNQUFNLFNBQVMsR0FBRztJQUNoQixZQUFZLEVBQUUsSUFBSTtJQUNsQixNQUFNLEVBQUUsUUFBUTtJQUNoQixhQUFhLEVBQUUsT0FBTztJQUN0QixTQUFTLEVBQUUsZUFBZTtJQUUxQixTQUFTLEVBQUUsV0FBVztJQUN0QixTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDNUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBRXBELGFBQWEsRUFBRSxNQUFNO0lBRXJCLGVB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QUs7b0JBRVAsS0FBSyxHQUFHO3dCQUNOLFNBQVMsR0FBRyxhQUFhLENBQUMsVUFBVTt3QkFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQyx1QkFBdUI7d0JBQzFDLEtBQUs7b0JBRVAsS0FBSyxHQUFHO3dCQUNOLFNBQVMsR0FBRyxhQUFhLENBQUMsVUFBVTt3QkFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQyx1QkFBdUI7d0JBQzFDLEtBQUs7b0JBRVAsS0FBSyxHQUFHO3dCQUNOLFNBQVMsR0FBRyxhQUFhLENBQUMsVUFBVTt3QkFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQyx1QkFBdUI7d0JBQzFDLEtBQUs7b0JBRVAsS0FBSyxHQUFHO3dCQUNOLFNBQVMsR0FBRyxhQUFhLENBQUMsVUFBVTt3QkFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQyx1QkFBdUI7d0JBQzFDLEtBQUs7b0JBRVAsS0FBSyxHQUFHO3dCQUNOLFNBQVMsR0FBRyxhQUFhLENBQUMsVUFBVTt3QkFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQyx1QkFBdUI7d0JBQzFDLEtBQUs7b0JBRVAsS0FBSyxHQUFHO3dCQUNOLFNBQVMsR0FBRyxhQUFhLENBQUMsVUFBVTt3QkFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQyx1QkFBdUI7d0JBQzFDLEtBQUs7b0JBRVAsS0FBSyxHQUFHO3dCQUNOLFNBQVMsR0FBRyxhQUFhLENBQUMsVUFBVTt3QkFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQyx1QkFBdUI7d0JBQzFDLEtBQUs7b0JBRVAsS0FBSyxHQUFHO3dCQUNOLFNBQVMsR0FBRyxhQUFhLENBQUMsVUFBVTt3QkFDcEMsS0FBSyxHQUFHLFVBQVUsQ0FBQyx1QkFBdUI7d0JBQzFDLEtBQUs7b0JBRVA7d0JBQ0UsS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRO3dCQUMzQixLQUFLO2dCQUNULENBQUM7Z0JBQ0QsRUFBRSxDQUFDO2dCQUNILEtBQUs7WUFFUCxLQUFLLFVBQVUsQ0FBQyx1QkFBdUI7Z0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN0QixLQUFLLEdBQUcsVUFBVSxDQUFDLDhCQUE4QjtvQkFDakQsRUFBRSxDQUFDO2dCQUNMLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sS0FBSyxHQUFHLFVBQVUsQ0FBQyxrQkFBa0I7Z0JBQ3ZDLENBQUM7Z0JBQ0QsS0FBSztZQUVQLEtBQUssVUFBVSxDQUFDLDhCQUE4QjtnQkFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2QsS0FBSyxHQUFHLFVBQVUsQ0FBQyw0QkFBNEI7b0JBQy9DLEVBQUUsQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLEtBQUssR0FBRyxVQUFVLENBQUMsa0JBQWtCO2dCQUN2QyxDQUFDO2dCQUNELEtBQUs7WUFFUCxLQUFLLFVBQVUsQ0FBQyw0QkFBNEI7Z0JBQzFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixLQUFLLEdBQUcsVUFBVSxDQUFDLGtCQUFrQjtnQkFDdkMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVE7Z0JBQzdCLENBQUM7Z0JBQ0QsRUFBRSxDQUFDO2dCQUNILEtBQUs7WUFFUCxLQUFLLFVBQVUsQ0FBQyxrQkFBa0I7Z0JBQ2hDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1YsS0FBSyxHQUFHO3dCQUNOLEtBQUssR0FBRyxVQUFVLENBQUMsY0FBYzt3QkFDakMsS0FBSztvQkFFUCxLQUFLLEdBQUc7d0JBQ04sS0FBSyxHQUFHLFVBQVUsQ0FBQyxjQUFjO3dCQUNqQyxLQUFLO29CQUVQO3dCQUNFLEtBQUssR0FBRyxVQUFVLENBQUMsUUFBUTt3QkFDM0IsS0FBSztnQkFDVCxDQUFDO2dCQUNELEVBQUUsQ0FBQztnQkFDSCxLQUFLO1lBRVAsS0FBSyxVQUFVLENBQUMsY0FBYztnQkFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVixLQUFLLEdBQUc7d0JBQ04sS0FBSyxHQUFHLFVBQVUsQ0FBQyxlQUFlO3dCQUNsQyxLQUFLO29CQUVQLEtBQUssR0FBRzt3QkFDTixRQUFRLEdBQUcsZUFBZSxDQUFDLE1BQU07d0JBQ2pDLEtBQUssR0FBRyxVQUFVLENBQUMsUUFBUTt3QkFDM0IsS0FBSztvQkFFUCxLQUFLLEdBQUc7d0JBQ04sS0FBSyxHQUFHLFVBQVUsQ0FBQyxlQUFlO3dCQUNsQyxLQUFLO29CQUVQLEtBQUssR0FBRzt3QkFDTixRQUFRLEdBQUcsZUFBZSxDQUFDLE1BQU07d0JBQ2pDLEtBQUssR0FBRyxVQUFVLENBQUMsUUFBUTt3QkFDM0IsS0FBSztvQkFFUCxLQUFLLEdBQUc7d0JBQ04sS0FBSyxHQUFHLFVBQVUsQ0FBQyxrQkFBa0I7d0JBQ3JDLEtBQUs7b0JBRVA7d0JBQ0UsUUFBUSxHQUFHLGVBQWUsQ0FBQyxNQUFNO3dCQUNqQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVE7d0JBQzNCLEtBQUs7Z0JBQ1QsQ0FBQztnQkFDRCxDQUFDLEVBQUU7Z0JBQ0gsS0FBSztZQUVQLEtBQUssVUFBVSxDQUFDLGVBQWU7Z0JBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1YsS0FBSyxHQUFHO3dCQUNOLFFBQVEsR0FBRyxlQUFlLENBQUMsT0FBTzt3QkFDbEMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRO3dCQUMzQixLQUFLO29CQUVQO3dCQUNFLFFBQVEsR0FBRyxlQUFlLENBQUMsTUFBTTt3QkFDakMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRO3dCQUMzQixLQUFLO2dCQUNULENBQUM7Z0JBQ0QsS0FBSztZQUVQLEtBQUssVUFBVSxDQUFDLGtCQUFrQjtnQkFDaEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVixLQUFLLEdBQUc7d0JBQ04sS0FBSyxHQUFHLFVBQVUsQ0FBQyxlQUFlO3dCQUNsQyxFQUFFLENBQUM7d0JBQ0gsS0FBSztvQkFFUCxLQUFLLEdBQUc7d0JBQ04sUUFBUSxHQUFHLGVBQWUsQ0FBQyxNQUFNO3dCQUNqQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVE7d0JBQzNCLEtBQUs7b0JBRVA7d0JBQ0UsUUFBUSxHQUFHLGVBQWUsQ0FBQyxNQUFNO3dCQUNqQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVE7d0JBQzNCLEtBQUs7Z0JBQ1QsQ0FBQztnQkFDRCxLQUFLO1lBRVAsS0FBSyxVQUFVLENBQUMsZUFBZTtnQkFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVixLQUFLLEdBQUc7d0JBQ04sUUFBUSxHQUFHLGVBQWUsQ0FBQyxPQUFPO3dCQUNsQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVE7d0JBQzNCLEtBQUs7b0JBRVA7d0JBQ0UsUUFBUSxHQUFHLGVBQWUsQ0FBQyxNQUFNO3dCQUNqQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVE7d0JBQzNCLEtBQUs7Z0JBQ1QsQ0FBQztnQkFDRCxLQUFLO1lBRVAsS0FBSyxVQUFVLENBQUMsY0FBYztnQkFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVixLQUFLLEdBQUc7d0JBQ04sUUFBUSxHQUFHLGVBQWUsQ0FBQyxNQUFNO3dCQUNqQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVE7d0JBQzNCLEtBQUs7b0JBRVA7d0JBQ0UsUUFBUSxHQUFHLGVBQWUsQ0FBQyxLQUFLO3dCQUNoQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVE7d0JBQzNCLEtBQUs7Z0JBQ1QsQ0FBQztnQkFDRCxLQUFLO1lBRVAsS0FBSyxVQUFVLENBQUMsV0FBVztnQkFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVixLQUFLLEdBQUc7d0JBQ04sU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXO3dCQUNyQyxDQUFDLEVBQUU7d0JBQ0gsS0FBSztvQkFFUCxLQUFLLEdBQUc7d0JBQ04sU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXO3dCQUNyQyxDQUFDLEVBQUU7d0JBQ0gsS0FBSztvQkFFUCxLQUFLLEdBQUc7d0JBQ04sU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXO3dCQUNyQyxDQUFDLEVBQUU7d0JBQ0gsS0FBSztvQkFFUCxLQUFLLEdBQUc7d0JBQ04sU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXO3dCQUNyQyxDQUFDLEVBQUU7d0JBQ0gsS0FBSztvQkFFUCxLQUFLLEdBQUc7d0JBQ04sU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXO3dCQUNyQyxDQUFDLEVBQUU7d0JBQ0gsS0FBSztvQkFFUCxLQUFLLEdBQUc7d0JBQ04sU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXO3dCQUNyQyxDQUFDLEVBQUU7d0JBQ0gsS0FBSztvQkFFUCxLQUFLLEdBQUc7d0JBQ04sU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXO3dCQUNyQyxDQUFDLEVBQUU7d0JBQ0gsS0FBSztvQkFFUDt3QkFDRSxTQUFTLEdBQUcsYUFBYSxDQUFDLFVBQVU7d0JBQ3BDLEtBQUs7Z0JBQ1QsQ0FBQztnQkFDRCxLQUFLLEdBQUcsVUFBVSxDQUFDLG1CQUFtQjtnQkFDdEMsS0FBSztZQUVQLEtBQUssVUFBVSxDQUFDLG1CQUFtQjtnQkFDakMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVixLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUc7d0JBQ04sQ0FBQyxFQUFFO3dCQUNILEtBQUs7b0JBRVA7d0JBQ0UsS0FBSyxHQUFHLFVBQVUsQ0FBQyxlQUFlO3dCQUNsQyxLQUFLO2dCQUNULENBQUM7Z0JBQ0QsS0FBSztZQUVQLEtBQUssVUFBVSxDQUFDLGVBQWU7Z0JBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN0QixDQUFDLEVBQUU7Z0JBQ0wsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixRQUFRLEdBQUcsT0FBTyxDQUFDLGdCQUFnQjtnQkFDckMsQ0FBQztnQkFDRCxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVE7Z0JBQzNCLEtBQUs7WUFFUDtnQkFDRSxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVE7Z0JBQzNCLEtBQUs7UUFDVCxDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksTUFBTSxHQUFHLENBQUM7SUFFZCxNQUFNLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRTtJQUNoQyxNQUFNLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNoQyxNQUFNLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUMvQixNQUFNLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBRTFCLE1BQU0sQ0FBQyxNQUFNO0FBQ2YsQ0FBQztBQUVELGtCQUFlLG1CQUFtQjs7Ozs7Ozs7OztBQzFkbEMsOENBQXlDO0FBU3ZDLHVCQVRLLHNCQUFZLENBU0w7QUFSZCw0Q0FBbUM7QUFTakMsb0JBVEssbUJBQVMsQ0FTTDtBQVJYLDRDQUFtQztBQVNqQyxvQkFUSyxtQkFBUyxDQVNMO0FBUlgsNENBQW1DO0FBU2pDLG9CQVRLLG1CQUFTLENBU0w7QUFSWCw0Q0FBbUM7QUFTakMsb0JBVEssbUJBQVMsQ0FTTDtBQVJYLDRDQUFtQztBQVNqQyxvQkFUSyxtQkFBUyxDQVNMOzs7Ozs7Ozs7O0FDZlgsMkNBQXlDO0FBQ3pDLHlDQUF1QztBQUN2QywyQ0FBeUM7QUFDekMsMkNBQXlDO0FBRXpDO0lBQ0UsTUFBTSxDQUFDLFNBQVMsQ0FBRSxLQUFVLEVBQUUsTUFBTSxHQUFHLENBQUM7UUFDdEMsRUFBRSxDQUFDLENBQUMsa0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsaUJBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7WUFDN0MsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7WUFDOUMsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEVBQUUsQ0FBQyxDQUFDLGtCQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFFLEtBQVksRUFBRSxNQUFjO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUk7WUFDcEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUk7SUFDckIsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFXLENBQUUsS0FBYSxFQUFFLE1BQWM7UUFDL0MsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsS0FBSztRQUNkLENBQUM7UUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUMvQixHQUFHLENBQUMsVUFBVSxHQUFHO1lBQ2hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM3RixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRWIsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRztJQUMxRCxDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBRSxLQUFhO1FBQy9CLE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUc7SUFDMUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFXLENBQUUsS0FBYSxFQUFFLFNBQVMsR0FBRyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxTQUFTLENBQUM7SUFDdEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUUsR0FBVyxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSztJQUMvQyxDQUFDO0NBQ0Y7QUFsREQsNkJBa0RDOzs7Ozs7OztBQ3ZERDtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUM5QkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDckNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNSQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUNIQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQzdDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQzdCQSw0Q0FBcUM7QUFDckMsNENBQTBDO0FBRTFDLGVBQWdCLFNBQVEsb0JBQVU7SUFDaEMsV0FBVyxDQUFFLEtBQVU7UUFDckIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDckUsTUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDckUsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDckQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDMUcsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtJQUNsRCxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxTQUFTOzs7Ozs7Ozs7O0FDYnhCLDRDQUFxQztBQUNyQyw0Q0FBMEM7QUFFMUMsZUFBZ0IsU0FBUSxvQkFBVTtJQUNoQyxXQUFXLENBQUUsS0FBVTtRQUNyQixNQUFNLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNyRSxNQUFNLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNyRSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsdUJBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN2RixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsdUJBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMxRyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFO0lBQ3pELENBQUM7Q0FDRjtBQUVELGtCQUFlLFNBQVM7Ozs7Ozs7Ozs7QUNieEIsNENBQXFDO0FBQ3JDLDRDQUEwQztBQUUxQyxlQUFnQixTQUFRLG9CQUFVO0lBQ2hDLFdBQVcsQ0FBRSxLQUFVO1FBQ3JCLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3ZFLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2xELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3RGLE1BQU0sQ0FBQyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUM5QyxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxTQUFTOzs7Ozs7Ozs7O0FDWnhCLDhDQUF5QztBQUV6QyxlQUFnQixTQUFRLHNCQUFZO0lBQ2xDLFdBQVcsQ0FBRSxLQUFVO1FBQ3JCLE1BQU0sQ0FBQyxFQUFFO0lBQ1gsQ0FBQztDQUNGO0FBRUQsa0JBQWUsU0FBUzs7Ozs7Ozs7OztBQ1J4QiwrQ0FBeUM7QUFDekMsMkNBQTBDO0FBQzFDLHVDQUE4QztBQUU5QyxlQUFnQixTQUFRLHNCQUFZO0lBQ2xDLE9BQU8sQ0FBRSxLQUFZO1FBQ25CLE1BQU0sTUFBTSxHQUFHLG1CQUFTLENBQUMsV0FBVztRQUNwQyxNQUFNLE9BQU8sR0FBRyxtQkFBUyxDQUFDLE9BQU87UUFDakMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU07UUFDL0IsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDM0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLG1CQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxtQkFBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRWxFLElBQUksTUFBTSxHQUFHLFlBQVk7UUFFekIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNwQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDeEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUNuRSxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDO1lBQzdELE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7WUFDL0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQztZQUNsRSxNQUFNLENBQUMsYUFBYSxDQUFDLDJCQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7WUFDOUYsTUFBTSxJQUFJLEVBQUU7UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU07SUFDZixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxTQUFTOzs7Ozs7Ozs7O0FDOUJ4QixrQ0FBd0I7QUFHeEI7SUFBQTtRQUNFLHFCQUFnQixHQUFHO1lBQ2pCLElBQUksRUFBRSxLQUFLO1lBQ1gsSUFBSSxFQUFFLElBQUk7U0FDWDtJQWVILENBQUM7SUFiQyxLQUFLLENBQUUsUUFBZ0IsRUFBRSxLQUFZLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0I7UUFDcEUsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzdELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNsQixDQUFDLENBQUM7UUFDSixDQUFDLENBQUM7SUFDSixDQUFDO0NBR0Y7QUFFRCxrQkFBZSxZQUFZOzs7Ozs7Ozs7O0FDeEIzQiwyQ0FBNEM7QUFDNUMsMkNBQTRDO0FBQzVDLDJDQUE0QztBQUM1QywyQ0FBNEM7QUFFNUMsa0JBQWU7SUFDYixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0NBQ1g7Ozs7Ozs7QUNWRDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsWUFBWTs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLElBQUk7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLLHdDQUF3QztBQUM3QyxLQUFLLHVDQUF1QztBQUM1QyxLQUFLLHVDQUF1QztBQUM1QyxLQUFLLHNDQUFzQztBQUMzQyxLQUFLLHNDQUFzQztBQUMzQyxLQUFLLHNDQUFzQztBQUMzQyxLQUFLLCtGQUErRiw2QkFBNkI7QUFDakksS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSywyR0FBMkcsNkJBQTZCO0FBQzdJLEtBQUssc0RBQXNELGdCQUFnQixzRUFBc0UsZ0JBQWdCLHdEQUF3RDtBQUN6TixLQUFLLCtDQUErQztBQUNwRCxLQUFLLGlIQUFpSCw2QkFBNkI7QUFDbkosS0FBSyw0REFBNEQsYUFBYSx3R0FBd0c7QUFDdEwsS0FBSyw2REFBNkQ7QUFDbEUsS0FBSyxtRUFBbUUsY0FBYztBQUN0RixLQUFLLHNDQUFzQztBQUMzQyxLQUFLLDBHQUEwRyw2QkFBNkI7QUFDNUksS0FBSyx3REFBd0Qsa0JBQWtCLDBFQUEwRSxrQkFBa0IsK0NBQStDO0FBQzFOLEtBQUsscUVBQXFFO0FBQzFFLEtBQUssMkVBQTJFLGNBQWM7QUFDOUYsS0FBSyx5R0FBeUc7QUFDOUcsS0FBSyxxREFBcUQsYUFBYSwyREFBMkQ7QUFDbEksS0FBSyxzREFBc0QsY0FBYyw0REFBNEQ7QUFDckksS0FBSyxrREFBa0QsYUFBYSxnREFBZ0Q7QUFDcEgsS0FBSyxzREFBc0QsZUFBZSw4REFBOEQ7QUFDeEksS0FBSyxzREFBc0QsZUFBZSxnRUFBZ0U7QUFDMUksS0FBSyw4Q0FBOEMsV0FBVywrQkFBK0I7QUFDN0YsS0FBSyxtREFBbUQsZ0JBQWdCLG9DQUFvQztBQUM1RyxLQUFLLG9IQUFvSDtBQUN6SCxLQUFLLCtDQUErQztBQUNwRCxLQUFLLGlIQUFpSCw2QkFBNkI7QUFDbkosS0FBSywrQ0FBK0M7QUFDcEQsS0FBSyxpSEFBaUgsNkJBQTZCO0FBQ25KLEtBQUssK0ZBQStGLHVCQUF1Qix1RkFBdUY7QUFDbE4sS0FBSyxtREFBbUQ7QUFDeEQsS0FBSyx5SEFBeUgsNkJBQTZCO0FBQzNKLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O0FDdkdEO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZOztBQUU1Qjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLElBQUk7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLLHdDQUF3QztBQUM3QyxLQUFLLHVDQUF1QztBQUM1QyxLQUFLLHVDQUF1QztBQUM1QyxLQUFLLHNDQUFzQztBQUMzQyxLQUFLLHNDQUFzQztBQUMzQyxLQUFLLHNDQUFzQztBQUMzQyxLQUFLLCtGQUErRiw2QkFBNkI7QUFDakksS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSywyR0FBMkcsNkJBQTZCO0FBQzdJLEtBQUssc0RBQXNELGdCQUFnQixzRUFBc0UsZ0JBQWdCLHdEQUF3RDtBQUN6TixLQUFLLCtDQUErQztBQUNwRCxLQUFLLGlIQUFpSCw2QkFBNkI7QUFDbkosS0FBSyw0REFBNEQsYUFBYSx3R0FBd0c7QUFDdEwsS0FBSyw2REFBNkQ7QUFDbEUsS0FBSyxtRUFBbUUsY0FBYztBQUN0RixLQUFLLHNDQUFzQztBQUMzQyxLQUFLLDBHQUEwRyw2QkFBNkI7QUFDNUksS0FBSyx3REFBd0Qsa0JBQWtCLDBFQUEwRSxrQkFBa0IsK0NBQStDO0FBQzFOLEtBQUsscUVBQXFFO0FBQzFFLEtBQUssMkVBQTJFLGNBQWM7QUFDOUYsS0FBSyx5R0FBeUc7QUFDOUcsS0FBSyxxREFBcUQsYUFBYSwyREFBMkQ7QUFDbEksS0FBSyxzREFBc0QsY0FBYyw0REFBNEQ7QUFDckksS0FBSyxrREFBa0QsYUFBYSxnREFBZ0Q7QUFDcEgsS0FBSyxzREFBc0QsZUFBZSw4REFBOEQ7QUFDeEksS0FBSyxzREFBc0QsZUFBZSxnRUFBZ0U7QUFDMUksS0FBSyw4Q0FBOEMsV0FBVywrQkFBK0I7QUFDN0YsS0FBSyxtREFBbUQsZ0JBQWdCLG9DQUFvQztBQUM1RyxLQUFLLDRDQUE0QztBQUNqRCxLQUFLLHVIQUF1SCw2QkFBNkI7QUFDekosS0FBSyw0RUFBNEU7QUFDakYsS0FBSywrQ0FBK0M7QUFDcEQsS0FBSyxpSEFBaUgsNkJBQTZCO0FBQ25KLEtBQUssOEVBQThFO0FBQ25GLEtBQUssNEVBQTRFLGNBQWM7QUFDL0YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUsscUZBQXFGO0FBQzFGLEtBQUssa0ZBQWtGO0FBQ3ZGLEtBQUssZ0ZBQWdGO0FBQ3JGLEtBQUssd0VBQXdFLHdCQUF3QixpRUFBaUU7QUFDdEssS0FBSywwRUFBMEUsMEJBQTBCLG1FQUFtRTtBQUM1SyxLQUFLLHdFQUF3RSx3QkFBd0IsaUVBQWlFO0FBQ3RLLEtBQUssOEVBQThFLDhCQUE4QjtBQUNqSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O0FDL0hEO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSTtBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUssd0NBQXdDO0FBQzdDLEtBQUssdUNBQXVDO0FBQzVDLEtBQUssdUNBQXVDO0FBQzVDLEtBQUssc0NBQXNDO0FBQzNDLEtBQUssc0NBQXNDO0FBQzNDLEtBQUssc0NBQXNDO0FBQzNDLEtBQUssK0ZBQStGLDZCQUE2QjtBQUNqSSxLQUFLLHNDQUFzQztBQUMzQyxLQUFLLDJHQUEyRyw2QkFBNkI7QUFDN0ksS0FBSyxzREFBc0QsZ0JBQWdCLHNFQUFzRSxnQkFBZ0Isd0RBQXdEO0FBQ3pOLEtBQUssK0NBQStDO0FBQ3BELEtBQUssaUhBQWlILDZCQUE2QjtBQUNuSixLQUFLLDREQUE0RCxhQUFhLHdHQUF3RztBQUN0TCxLQUFLLDZEQUE2RDtBQUNsRSxLQUFLLG1FQUFtRSxjQUFjO0FBQ3RGLEtBQUssc0NBQXNDO0FBQzNDLEtBQUssMEdBQTBHLDZCQUE2QjtBQUM1SSxLQUFLLHdEQUF3RCxrQkFBa0IsMEVBQTBFLGtCQUFrQiwrQ0FBK0M7QUFDMU4sS0FBSyxxRUFBcUU7QUFDMUUsS0FBSywyRUFBMkUsY0FBYztBQUM5RixLQUFLLHlHQUF5RztBQUM5RyxLQUFLLHFEQUFxRCxhQUFhLDJEQUEyRDtBQUNsSSxLQUFLLHNEQUFzRCxjQUFjLDREQUE0RDtBQUNySSxLQUFLLGtEQUFrRCxhQUFhLGdEQUFnRDtBQUNwSCxLQUFLLHNEQUFzRCxlQUFlLDhEQUE4RDtBQUN4SSxLQUFLLHNEQUFzRCxlQUFlLGdFQUFnRTtBQUMxSSxLQUFLLDhDQUE4QyxXQUFXLCtCQUErQjtBQUM3RixLQUFLLG1EQUFtRCxnQkFBZ0Isb0NBQW9DO0FBQzVHLEtBQUssNENBQTRDO0FBQ2pELEtBQUssdUhBQXVILDZCQUE2QjtBQUN6SixLQUFLLDRFQUE0RTtBQUNqRixLQUFLLCtDQUErQztBQUNwRCxLQUFLLGlIQUFpSCw2QkFBNkI7QUFDbkosS0FBSyxtRkFBbUY7QUFDeEYsS0FBSyw0RUFBNEUsY0FBYztBQUMvRixLQUFLLG1GQUFtRjtBQUN4RixLQUFLLDRFQUE0RSxjQUFjO0FBQy9GLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUsscUZBQXFGO0FBQzFGLEtBQUssb0VBQW9FLG9CQUFvQiw2REFBNkQ7QUFDMUosS0FBSyxpRUFBaUUsaUJBQWlCLDBEQUEwRDtBQUNqSixLQUFLLHFFQUFxRSxxQkFBcUIsOERBQThEO0FBQzdKLEtBQUssdUZBQXVGO0FBQzVGLEtBQUssZ0ZBQWdGO0FBQ3JGLEtBQUssc0VBQXNFLHNCQUFzQiwrREFBK0Q7QUFDaEssS0FBSywyRUFBMkUsMkJBQTJCLG9FQUFvRTtBQUMvSyxLQUFLLDRFQUE0RSw0QkFBNEIscUVBQXFFO0FBQ2xMLEtBQUssd0VBQXdFLHdCQUF3QixpRUFBaUU7QUFDdEssS0FBSyxxRUFBcUUscUJBQXFCO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7QUNqSUQ7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFlBQVk7O0FBRTVCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSyx3Q0FBd0M7QUFDN0MsS0FBSyx1Q0FBdUM7QUFDNUMsS0FBSyx1Q0FBdUM7QUFDNUMsS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSywrRkFBK0YsNkJBQTZCO0FBQ2pJLEtBQUssc0NBQXNDO0FBQzNDLEtBQUssMkdBQTJHLDZCQUE2QjtBQUM3SSxLQUFLLHNEQUFzRCxnQkFBZ0Isc0VBQXNFLGdCQUFnQix3REFBd0Q7QUFDek4sS0FBSywrQ0FBK0M7QUFDcEQsS0FBSyxpSEFBaUgsNkJBQTZCO0FBQ25KLEtBQUssNERBQTRELGFBQWEsd0dBQXdHO0FBQ3RMLEtBQUssNkRBQTZEO0FBQ2xFLEtBQUssbUVBQW1FLGNBQWM7QUFDdEYsS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSywwR0FBMEcsNkJBQTZCO0FBQzVJLEtBQUssd0RBQXdELGtCQUFrQiwwRUFBMEUsa0JBQWtCLCtDQUErQztBQUMxTixLQUFLLHFFQUFxRTtBQUMxRSxLQUFLLDJFQUEyRSxjQUFjO0FBQzlGLEtBQUsseUdBQXlHO0FBQzlHLEtBQUsscURBQXFELGFBQWEsMkRBQTJEO0FBQ2xJLEtBQUssc0RBQXNELGNBQWMsNERBQTREO0FBQ3JJLEtBQUssa0RBQWtELGFBQWEsZ0RBQWdEO0FBQ3BILEtBQUssc0RBQXNELGVBQWUsOERBQThEO0FBQ3hJLEtBQUssc0RBQXNELGVBQWUsZ0VBQWdFO0FBQzFJLEtBQUssOENBQThDLFdBQVcsK0JBQStCO0FBQzdGLEtBQUssbURBQW1ELGdCQUFnQixvQ0FBb0M7QUFDNUcsS0FBSyx3Q0FBd0M7QUFDN0MsS0FBSywrR0FBK0csNkJBQTZCO0FBQ2pKLEtBQUssb0VBQW9FO0FBQ3pFLEtBQUssK0NBQStDO0FBQ3BELEtBQUssaUhBQWlILDZCQUE2QjtBQUNuSixLQUFLLG1GQUFtRjtBQUN4RixLQUFLLDRFQUE0RSxjQUFjO0FBQy9GLEtBQUssbUZBQW1GO0FBQ3hGLEtBQUssNEVBQTRFLGNBQWM7QUFDL0YsS0FBSyxrRkFBa0Y7QUFDdkYsS0FBSyw0RUFBNEUsY0FBYztBQUMvRixLQUFLLDRFQUE0RTtBQUNqRixLQUFLLDRFQUE0RSxjQUFjO0FBQy9GLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUVBQW1FLEVBQUU7QUFDckU7O0FBRUE7QUFDQSwyREFBMkQsS0FBSyxZQUFZLEVBQUU7QUFDOUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2Isb0RBQW9ELEtBQUssWUFBWSxFQUFFO0FBQ3ZFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLLHFGQUFxRjtBQUMxRixLQUFLLCtDQUErQztBQUNwRCxLQUFLLGlIQUFpSCw2QkFBNkI7QUFDbkosS0FBSyx5R0FBeUc7QUFDOUcsS0FBSyxnRkFBZ0Y7QUFDckYsS0FBSyxvRUFBb0Usb0JBQW9CLDZEQUE2RDtBQUMxSixLQUFLLGlFQUFpRSxpQkFBaUIsMERBQTBEO0FBQ2pKLEtBQUsscUVBQXFFLHFCQUFxQiw4REFBOEQ7QUFDN0osS0FBSyxzRUFBc0Usc0JBQXNCLCtEQUErRDtBQUNoSyxLQUFLLDRFQUE0RSw0QkFBNEI7QUFDN0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7OztBQzFKRCxpREFBNkQ7QUFHM0QseUJBSE8sK0JBQWMsQ0FHUDtBQUNkLHFCQUp1QiwyQkFBVSxDQUl2Qjs7Ozs7Ozs7OztBQ0paLE1BQU0sTUFBTSxHQUFHLFVBQWMsS0FBVTtJQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDNUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ1IsQ0FBQztBQUVELElBQUssVUFJSjtBQUpELFdBQUssVUFBVTtJQUNiLDJDQUFJO0lBQ0osK0NBQU07SUFDTixxREFBUztBQUNYLENBQUMsRUFKSSxVQUFVLEtBQVYsVUFBVSxRQUlkO0FBK0JDLGdDQUFVO0FBN0JaO0lBTUUsTUFBTSxLQUFLLGFBQWE7UUFDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO0lBQzlDLENBQUM7SUFFRCxNQUFNLENBQUMsa0JBQWtCLENBQUUsU0FBaUI7UUFDMUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBRSxTQUFpQjtRQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTO1FBQzdCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSTtRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU07UUFDMUIsQ0FBQztJQUNILENBQUM7O0FBdkJjLDZCQUFjLEdBQUc7SUFDOUIsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQ2xDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztDQUNoQjtBQXdCRCx3Q0FBYyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTY2N2RjNzdmNDNhOGM1YTEzYmEiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFNlcmlhbGl6ZXIgZnJvbSAnLi9TZXJpYWxpemVyJ1xyXG5cclxuZXhwb3J0IHtcclxuICBTZXJpYWxpemVyXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NlcmlhbGl6ZXIvaW5kZXgudHMiLCJjb25zdCBDb25zdGFudHMgPSB7XHJcbiAgU09MQVJfQUJTTUFHOiA0LjgzLFxyXG4gIExOX01BRzogMS4wODU3MzYsXHJcbiAgTFlfUEVSX1BBUlNFQzogMy4yNjE2NyxcclxuICBLTV9QRVJfTFk6IDk0NjA3MzA0NzI1ODAuOCxcclxuXHJcbiAgS01fUEVSX0FVOiAxNDk1OTc4NzAuNyxcclxuICBBVV9QRVJfTFk6ICh0aGlzLktNX1BFUl9MWSAvIHRoaXMuS01fUEVSX0FVKSxcclxuICBLTV9QRVJfUEFSU0VDOiAodGhpcy5LTV9QRVJfTFkgKiB0aGlzLkxZX1BFUl9QQVJTRUMpLFxyXG5cclxuICBEQVlTX1BFUl9ZRUFSOiAzNjUuMjUsXHJcblxyXG4gIFNFQ09ORFNfUEVSX0RBWTogODY0MDAuMCxcclxuICBNSU5VVEVTX1BFUl9EQVk6IDE0NDAuMCxcclxuICBIT1VSU19QRVJfREFZOiAyNC4wLFxyXG5cclxuICBNSU5VVEVTX1BFUl9ERUc6IDYwLjAsXHJcbiAgU0VDT05EU19QRVJfREVHOiAzNjAwLjAsXHJcbiAgREVHX1BFUl9IUkE6IDE1LjAsXHJcblxyXG4gIEVBUlRIX1JBRElVUzogNjM3OC4xNCxcclxuICBKVVBJVEVSX1JBRElVUzogNzE0OTIuMCxcclxuICBTT0xBUl9SQURJVVM6IDY5NjAwMC4wLFxyXG5cclxuICBTUEVFRF9PRl9MSUdIVDogMjk5NzkyLjQ1OCxcclxuICBHOiA2LjY3MmUtMTEsXHJcblxyXG4gIFNPTEFSX01BU1M6IDEuOTg5ZTMwLFxyXG4gIEVBUlRIX01BU1M6IDUuOTc2ZTI0LFxyXG4gIExVTkFSX01BU1M6IDcuMzU0ZTIyLFxyXG5cclxuICBTT0xBUl9JUlJBRElBTkNFOiAxMzY3LjYsIC8vIFdhdHRzIC8gbV4yXHJcbiAgU09MQVJfUE9XRVI6IDMuODQ2MmUyNiwgLy8gV2F0dHNcclxuICBGSUxFX0hFQURFUjogJ0NFTFNUQVJTJyxcclxuICBWRVJTSU9OOiAweDAxMDAsXHJcbiAgSEVBREVSX09GRlNFVDogMTRcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uc3RhbnRzXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9Db25zdGFudHMudHMiLCIoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KSAvKiBnbG9iYWwgZGVmaW5lICovXG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKVxuICB9IGVsc2Uge1xuICAgIHJvb3QubW9vID0gZmFjdG9yeSgpXG4gIH1cbn0odGhpcywgZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG5cbiAgLy8gcG9seWZpbGwgYXNzaWduKCksIHNvIHdlIHN1cHBvcnQgSUU5K1xuICB2YXIgYXNzaWduID0gdHlwZW9mIE9iamVjdC5hc3NpZ24gPT09ICdmdW5jdGlvbicgPyBPYmplY3QuYXNzaWduIDpcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuYXNzaWduXG4gICAgZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2VzKSB7XG4gICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgdGFyZ2V0ID0gT2JqZWN0KHRhcmdldClcblxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuICAgICAgICBpZiAoc291cmNlID09IG51bGwpIGNvbnRpbnVlXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRhcmdldFxuICAgIH1cblxuICB2YXIgaGFzU3RpY2t5ID0gdHlwZW9mIG5ldyBSZWdFeHAoKS5zdGlja3kgPT09ICdib29sZWFuJ1xuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgZnVuY3Rpb24gaXNSZWdFeHAobykgeyByZXR1cm4gbyAmJiBvLmNvbnN0cnVjdG9yID09PSBSZWdFeHAgfVxuICBmdW5jdGlvbiBpc09iamVjdChvKSB7IHJldHVybiBvICYmIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBvLmNvbnN0cnVjdG9yICE9PSBSZWdFeHAgJiYgIUFycmF5LmlzQXJyYXkobykgfVxuXG4gIGZ1bmN0aW9uIHJlRXNjYXBlKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKVxuICB9XG4gIGZ1bmN0aW9uIHJlR3JvdXBzKHMpIHtcbiAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKCd8JyArIHMpXG4gICAgcmV0dXJuIHJlLmV4ZWMoJycpLmxlbmd0aCAtIDFcbiAgfVxuICBmdW5jdGlvbiByZUNhcHR1cmUocykge1xuICAgIHJldHVybiAnKCcgKyBzICsgJyknXG4gIH1cbiAgZnVuY3Rpb24gcmVVbmlvbihyZWdleHBzKSB7XG4gICAgdmFyIHNvdXJjZSA9ICByZWdleHBzLm1hcChmdW5jdGlvbihzKSB7XG4gICAgICByZXR1cm4gXCIoPzpcIiArIHMgKyBcIilcIlxuICAgIH0pLmpvaW4oJ3wnKVxuICAgIHJldHVybiBcIig/OlwiICsgc291cmNlICsgXCIpXCJcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2V4cE9yTGl0ZXJhbChvYmopIHtcbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiAnKD86JyArIHJlRXNjYXBlKG9iaikgKyAnKSdcblxuICAgIH0gZWxzZSBpZiAoaXNSZWdFeHAob2JqKSkge1xuICAgICAgLy8gVE9ETzogY29uc2lkZXIgL3Ugc3VwcG9ydFxuICAgICAgaWYgKG9iai5pZ25vcmVDYXNlKSB7IHRocm93IG5ldyBFcnJvcignUmVnRXhwIC9pIGZsYWcgbm90IGFsbG93ZWQnKSB9XG4gICAgICBpZiAob2JqLmdsb2JhbCkgeyB0aHJvdyBuZXcgRXJyb3IoJ1JlZ0V4cCAvZyBmbGFnIGlzIGltcGxpZWQnKSB9XG4gICAgICBpZiAob2JqLnN0aWNreSkgeyB0aHJvdyBuZXcgRXJyb3IoJ1JlZ0V4cCAveSBmbGFnIGlzIGltcGxpZWQnKSB9XG4gICAgICBpZiAob2JqLm11bHRpbGluZSkgeyB0aHJvdyBuZXcgRXJyb3IoJ1JlZ0V4cCAvbSBmbGFnIGlzIGltcGxpZWQnKSB9XG4gICAgICByZXR1cm4gb2JqLnNvdXJjZVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGEgcGF0dGVybjogJyArIG9iailcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvYmplY3RUb1J1bGVzKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KVxuICAgIHZhciByZXN1bHQgPSBbXVxuICAgIGZvciAodmFyIGk9MDsgaTxrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgdmFyIHRoaW5nID0gb2JqZWN0W2tleV1cbiAgICAgIHZhciBydWxlcyA9IEFycmF5LmlzQXJyYXkodGhpbmcpID8gdGhpbmcgOiBbdGhpbmddXG4gICAgICB2YXIgbWF0Y2ggPSBbXVxuICAgICAgcnVsZXMuZm9yRWFjaChmdW5jdGlvbihydWxlKSB7XG4gICAgICAgIGlmIChpc09iamVjdChydWxlKSkge1xuICAgICAgICAgIGlmIChtYXRjaC5sZW5ndGgpIHJlc3VsdC5wdXNoKHJ1bGVPcHRpb25zKGtleSwgbWF0Y2gpKVxuICAgICAgICAgIHJlc3VsdC5wdXNoKHJ1bGVPcHRpb25zKGtleSwgcnVsZSkpXG4gICAgICAgICAgbWF0Y2ggPSBbXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hdGNoLnB1c2gocnVsZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmIChtYXRjaC5sZW5ndGgpIHJlc3VsdC5wdXNoKHJ1bGVPcHRpb25zKGtleSwgbWF0Y2gpKVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBmdW5jdGlvbiBhcnJheVRvUnVsZXMoYXJyYXkpIHtcbiAgICB2YXIgcmVzdWx0ID0gW11cbiAgICBmb3IgKHZhciBpPTA7IGk8YXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBvYmogPSBhcnJheVtpXVxuICAgICAgaWYgKCFvYmoubmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1J1bGUgaGFzIG5vIG5hbWU6ICcgKyBKU09OLnN0cmluZ2lmeShvYmopKVxuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2gocnVsZU9wdGlvbnMob2JqLm5hbWUsIG9iaikpXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bGVPcHRpb25zKG5hbWUsIG9iaikge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KG9iaikgfHwgaXNSZWdFeHAob2JqKSkge1xuICAgICAgb2JqID0geyBtYXRjaDogb2JqIH1cbiAgICB9XG5cbiAgICAvLyBuYi4gZXJyb3IgaW1wbGllcyBsaW5lQnJlYWtzXG4gICAgdmFyIG9wdGlvbnMgPSBhc3NpZ24oe1xuICAgICAgdG9rZW5UeXBlOiBuYW1lLFxuICAgICAgbGluZUJyZWFrczogISFvYmouZXJyb3IsXG4gICAgICBwb3A6IGZhbHNlLFxuICAgICAgbmV4dDogbnVsbCxcbiAgICAgIHB1c2g6IG51bGwsXG4gICAgICBlcnJvcjogZmFsc2UsXG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGdldFR5cGU6IG51bGwsXG4gICAgfSwgb2JqKVxuXG4gICAgLy8gY29udmVydCB0byBhcnJheVxuICAgIHZhciBtYXRjaCA9IG9wdGlvbnMubWF0Y2hcbiAgICBvcHRpb25zLm1hdGNoID0gQXJyYXkuaXNBcnJheShtYXRjaCkgPyBtYXRjaCA6IG1hdGNoID8gW21hdGNoXSA6IFtdXG4gICAgb3B0aW9ucy5tYXRjaC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBpc1JlZ0V4cChhKSAmJiBpc1JlZ0V4cChiKSA/IDBcbiAgICAgICAgICAgOiBpc1JlZ0V4cChiKSA/IC0xIDogaXNSZWdFeHAoYSkgPyArMSA6IGIubGVuZ3RoIC0gYS5sZW5ndGhcbiAgICB9KVxuICAgIGlmIChvcHRpb25zLmtleXdvcmRzKSB7XG4gICAgICBvcHRpb25zLmdldFR5cGUgPSBrZXl3b3JkVHJhbnNmb3JtKG9wdGlvbnMua2V5d29yZHMpXG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zXG4gIH1cblxuICBmdW5jdGlvbiBjb21waWxlUnVsZXMocnVsZXMsIGhhc1N0YXRlcykge1xuICAgIHJ1bGVzID0gQXJyYXkuaXNBcnJheShydWxlcykgPyBhcnJheVRvUnVsZXMocnVsZXMpIDogb2JqZWN0VG9SdWxlcyhydWxlcylcblxuICAgIHZhciBlcnJvclJ1bGUgPSBudWxsXG4gICAgdmFyIGdyb3VwcyA9IFtdXG4gICAgdmFyIHBhcnRzID0gW11cbiAgICBmb3IgKHZhciBpPTA7IGk8cnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBvcHRpb25zID0gcnVsZXNbaV1cblxuICAgICAgaWYgKG9wdGlvbnMuZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yUnVsZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11bHRpcGxlIGVycm9yIHJ1bGVzIG5vdCBhbGxvd2VkOiAoZm9yIHRva2VuICdcIiArIG9wdGlvbnMudG9rZW5UeXBlICsgXCInKVwiKVxuICAgICAgICB9XG4gICAgICAgIGVycm9yUnVsZSA9IG9wdGlvbnNcbiAgICAgIH1cblxuICAgICAgLy8gc2tpcCBydWxlcyB3aXRoIG5vIG1hdGNoXG4gICAgICBpZiAob3B0aW9ucy5tYXRjaC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGdyb3Vwcy5wdXNoKG9wdGlvbnMpXG5cbiAgICAgIC8vIGNvbnZlcnQgdG8gUmVnRXhwXG4gICAgICB2YXIgcGF0ID0gcmVVbmlvbihvcHRpb25zLm1hdGNoLm1hcChyZWdleHBPckxpdGVyYWwpKVxuXG4gICAgICAvLyB2YWxpZGF0ZVxuICAgICAgdmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAocGF0KVxuICAgICAgaWYgKHJlZ2V4cC50ZXN0KFwiXCIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlZ0V4cCBtYXRjaGVzIGVtcHR5IHN0cmluZzogXCIgKyByZWdleHApXG4gICAgICB9XG4gICAgICB2YXIgZ3JvdXBDb3VudCA9IHJlR3JvdXBzKHBhdClcbiAgICAgIGlmIChncm91cENvdW50ID4gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWdFeHAgaGFzIGNhcHR1cmUgZ3JvdXBzOiBcIiArIHJlZ2V4cCArIFwiXFxuVXNlICg/OiDigKYgKSBpbnN0ZWFkXCIpXG4gICAgICB9XG4gICAgICBpZiAoIWhhc1N0YXRlcyAmJiAob3B0aW9ucy5wb3AgfHwgb3B0aW9ucy5wdXNoIHx8IG9wdGlvbnMubmV4dCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU3RhdGUtc3dpdGNoaW5nIG9wdGlvbnMgYXJlIG5vdCBhbGxvd2VkIGluIHN0YXRlbGVzcyBsZXhlcnMgKGZvciB0b2tlbiAnXCIgKyBvcHRpb25zLnRva2VuVHlwZSArIFwiJylcIilcbiAgICAgIH1cblxuICAgICAgLy8gdHJ5IGFuZCBkZXRlY3QgcnVsZXMgbWF0Y2hpbmcgbmV3bGluZXNcbiAgICAgIGlmICghb3B0aW9ucy5saW5lQnJlYWtzICYmIHJlZ2V4cC50ZXN0KCdcXG4nKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1J1bGUgc2hvdWxkIGRlY2xhcmUgbGluZUJyZWFrczogJyArIHJlZ2V4cClcbiAgICAgIH1cblxuICAgICAgLy8gc3RvcmUgcmVnZXhcbiAgICAgIHBhcnRzLnB1c2gocmVDYXB0dXJlKHBhdCkpXG4gICAgfVxuXG4gICAgdmFyIHN1ZmZpeCA9IGhhc1N0aWNreSA/ICcnIDogJ3woPzopJ1xuICAgIHZhciBmbGFncyA9IGhhc1N0aWNreSA/ICd5bScgOiAnZ20nXG4gICAgdmFyIGNvbWJpbmVkID0gbmV3IFJlZ0V4cChyZVVuaW9uKHBhcnRzKSArIHN1ZmZpeCwgZmxhZ3MpXG5cbiAgICByZXR1cm4ge3JlZ2V4cDogY29tYmluZWQsIGdyb3VwczogZ3JvdXBzLCBlcnJvcjogZXJyb3JSdWxlfVxuICB9XG5cbiAgZnVuY3Rpb24gY29tcGlsZShydWxlcykge1xuICAgIHZhciByZXN1bHQgPSBjb21waWxlUnVsZXMocnVsZXMpXG4gICAgcmV0dXJuIG5ldyBMZXhlcih7c3RhcnQ6IHJlc3VsdH0sICdzdGFydCcpXG4gIH1cblxuICBmdW5jdGlvbiBjb21waWxlU3RhdGVzKHN0YXRlcywgc3RhcnQpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHN0YXRlcylcbiAgICBpZiAoIXN0YXJ0KSBzdGFydCA9IGtleXNbMF1cblxuICAgIHZhciBtYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgZm9yICh2YXIgaT0wOyBpPGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICBtYXBba2V5XSA9IGNvbXBpbGVSdWxlcyhzdGF0ZXNba2V5XSwgdHJ1ZSlcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGdyb3VwcyA9IG1hcFtrZXlzW2ldXS5ncm91cHNcbiAgICAgIGZvciAodmFyIGo9MDsgajxncm91cHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIGcgPSBncm91cHNbal1cbiAgICAgICAgdmFyIHN0YXRlID0gZyAmJiAoZy5wdXNoIHx8IGcubmV4dClcbiAgICAgICAgaWYgKHN0YXRlICYmICFtYXBbc3RhdGVdKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBzdGF0ZSAnXCIgKyBzdGF0ZSArIFwiJyAoaW4gdG9rZW4gJ1wiICsgZy50b2tlblR5cGUgKyBcIicgb2Ygc3RhdGUgJ1wiICsga2V5c1tpXSArIFwiJylcIilcbiAgICAgICAgfVxuICAgICAgICBpZiAoZyAmJiBnLnBvcCAmJiArZy5wb3AgIT09IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwb3AgbXVzdCBiZSAxIChpbiB0b2tlbiAnXCIgKyBnLnRva2VuVHlwZSArIFwiJyBvZiBzdGF0ZSAnXCIgKyBrZXlzW2ldICsgXCInKVwiKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBMZXhlcihtYXAsIHN0YXJ0KVxuICB9XG5cbiAgZnVuY3Rpb24ga2V5d29yZFRyYW5zZm9ybShtYXApIHtcbiAgICB2YXIgcmV2ZXJzZU1hcCA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB2YXIgYnlMZW5ndGggPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgdmFyIHR5cGVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobWFwKVxuICAgIGZvciAodmFyIGk9MDsgaTx0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuVHlwZSA9IHR5cGVzW2ldXG4gICAgICB2YXIgaXRlbSA9IG1hcFt0b2tlblR5cGVdXG4gICAgICB2YXIga2V5d29yZExpc3QgPSBBcnJheS5pc0FycmF5KGl0ZW0pID8gaXRlbSA6IFtpdGVtXVxuICAgICAga2V5d29yZExpc3QuZm9yRWFjaChmdW5jdGlvbihrZXl3b3JkKSB7XG4gICAgICAgIChieUxlbmd0aFtrZXl3b3JkLmxlbmd0aF0gPSBieUxlbmd0aFtrZXl3b3JkLmxlbmd0aF0gfHwgW10pLnB1c2goa2V5d29yZClcbiAgICAgICAgaWYgKHR5cGVvZiBrZXl3b3JkICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImtleXdvcmQgbXVzdCBiZSBzdHJpbmcgKGluIGtleXdvcmQgJ1wiICsgdG9rZW5UeXBlICsgXCInKVwiKVxuICAgICAgICB9XG4gICAgICAgIHJldmVyc2VNYXBba2V5d29yZF0gPSB0b2tlblR5cGVcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gZmFzdCBzdHJpbmcgbG9va3VwXG4gICAgLy8gaHR0cHM6Ly9qc3BlcmYuY29tL3N0cmluZy1sb29rdXBzXG4gICAgZnVuY3Rpb24gc3RyKHgpIHsgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHgpIH1cbiAgICB2YXIgc291cmNlID0gJydcbiAgICBzb3VyY2UgKz0gJyhmdW5jdGlvbih2YWx1ZSkge1xcbidcbiAgICBzb3VyY2UgKz0gJ3N3aXRjaCAodmFsdWUubGVuZ3RoKSB7XFxuJ1xuICAgIGZvciAodmFyIGxlbmd0aCBpbiBieUxlbmd0aCkge1xuICAgICAgdmFyIGtleXdvcmRzID0gYnlMZW5ndGhbbGVuZ3RoXVxuICAgICAgc291cmNlICs9ICdjYXNlICcgKyBsZW5ndGggKyAnOlxcbidcbiAgICAgIHNvdXJjZSArPSAnc3dpdGNoICh2YWx1ZSkge1xcbidcbiAgICAgIGtleXdvcmRzLmZvckVhY2goZnVuY3Rpb24oa2V5d29yZCkge1xuICAgICAgICB2YXIgdG9rZW5UeXBlID0gcmV2ZXJzZU1hcFtrZXl3b3JkXVxuICAgICAgICBzb3VyY2UgKz0gJ2Nhc2UgJyArIHN0cihrZXl3b3JkKSArICc6IHJldHVybiAnICsgc3RyKHRva2VuVHlwZSkgKyAnXFxuJ1xuICAgICAgfSlcbiAgICAgIHNvdXJjZSArPSAnfVxcbidcbiAgICB9XG4gICAgc291cmNlICs9ICd9XFxuJ1xuICAgIHNvdXJjZSArPSAnfSknXG4gICAgcmV0dXJuIGV2YWwoc291cmNlKSAvLyBnZXRUeXBlXG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIHZhciBMZXhlciA9IGZ1bmN0aW9uKHN0YXRlcywgc3RhdGUpIHtcbiAgICB0aGlzLnN0YXJ0U3RhdGUgPSBzdGF0ZVxuICAgIHRoaXMuc3RhdGVzID0gc3RhdGVzXG4gICAgdGhpcy5idWZmZXIgPSAnJ1xuICAgIHRoaXMuc3RhY2sgPSBbXVxuICAgIHRoaXMucmVzZXQoKVxuICB9XG5cbiAgTGV4ZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oZGF0YSwgaW5mbykge1xuICAgIHRoaXMuYnVmZmVyID0gZGF0YSB8fCAnJ1xuICAgIHRoaXMuaW5kZXggPSAwXG4gICAgdGhpcy5saW5lID0gaW5mbyA/IGluZm8ubGluZSA6IDFcbiAgICB0aGlzLmNvbCA9IGluZm8gPyBpbmZvLmNvbCA6IDFcbiAgICB0aGlzLnNldFN0YXRlKGluZm8gPyBpbmZvLnN0YXRlIDogdGhpcy5zdGFydFN0YXRlKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBMZXhlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsaW5lOiB0aGlzLmxpbmUsXG4gICAgICBjb2w6IHRoaXMuY29sLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgfVxuICB9XG5cbiAgTGV4ZXIucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICBpZiAoIXN0YXRlIHx8IHRoaXMuc3RhdGUgPT09IHN0YXRlKSByZXR1cm5cbiAgICB0aGlzLnN0YXRlID0gc3RhdGVcbiAgICB2YXIgaW5mbyA9IHRoaXMuc3RhdGVzW3N0YXRlXVxuICAgIHRoaXMuZ3JvdXBzID0gaW5mby5ncm91cHNcbiAgICB0aGlzLmVycm9yID0gaW5mby5lcnJvciB8fCB7bGluZUJyZWFrczogdHJ1ZSwgc2hvdWxkVGhyb3c6IHRydWV9XG4gICAgdGhpcy5yZSA9IGluZm8ucmVnZXhwXG4gIH1cblxuICBMZXhlci5wcm90b3R5cGUucG9wU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuc3RhY2sucG9wKCkpXG4gIH1cblxuICBMZXhlci5wcm90b3R5cGUucHVzaFN0YXRlID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICB0aGlzLnN0YWNrLnB1c2godGhpcy5zdGF0ZSlcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlKVxuICB9XG5cbiAgTGV4ZXIucHJvdG90eXBlLl9lYXQgPSBoYXNTdGlja3kgPyBmdW5jdGlvbihyZSkgeyAvLyBhc3N1bWUgcmUgaXMgL3lcbiAgICByZXR1cm4gcmUuZXhlYyh0aGlzLmJ1ZmZlcilcbiAgfSA6IGZ1bmN0aW9uKHJlKSB7IC8vIGFzc3VtZSByZSBpcyAvZ1xuICAgIHZhciBtYXRjaCA9IHJlLmV4ZWModGhpcy5idWZmZXIpXG4gICAgLy8gd2lsbCBhbHdheXMgbWF0Y2gsIHNpbmNlIHdlIHVzZWQgdGhlIHwoPzopIHRyaWNrXG4gICAgaWYgKG1hdGNoWzBdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoXG4gIH1cblxuICBMZXhlci5wcm90b3R5cGUuX2dldEdyb3VwID0gZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIHZhciBncm91cENvdW50ID0gdGhpcy5ncm91cHMubGVuZ3RoXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncm91cENvdW50OyBpKyspIHtcbiAgICAgIGlmIChtYXRjaFtpICsgMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gaVxuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ29vcHMnKVxuICB9XG5cbiAgZnVuY3Rpb24gdG9rZW5Ub1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZVxuICB9XG5cbiAgTGV4ZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmUgPSB0aGlzLnJlXG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyXG5cbiAgICB2YXIgaW5kZXggPSByZS5sYXN0SW5kZXggPSB0aGlzLmluZGV4XG4gICAgaWYgKGluZGV4ID09PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gLy8gRU9GXG4gICAgfVxuXG4gICAgdmFyIG1hdGNoID0gdGhpcy5fZWF0KHJlKVxuICAgIHZhciBpID0gdGhpcy5fZ2V0R3JvdXAobWF0Y2gpXG5cbiAgICB2YXIgZ3JvdXAsIHRleHRcbiAgICBpZiAoaSA9PT0gLTEpIHtcbiAgICAgIGdyb3VwID0gdGhpcy5lcnJvclxuXG4gICAgICAvLyBjb25zdW1lIHJlc3Qgb2YgYnVmZmVyXG4gICAgICB0ZXh0ID0gYnVmZmVyLnNsaWNlKGluZGV4KVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRleHQgPSBtYXRjaFswXVxuICAgICAgZ3JvdXAgPSB0aGlzLmdyb3Vwc1tpXVxuICAgIH1cblxuICAgIC8vIGNvdW50IGxpbmUgYnJlYWtzXG4gICAgdmFyIGxpbmVCcmVha3MgPSAwXG4gICAgaWYgKGdyb3VwLmxpbmVCcmVha3MpIHtcbiAgICAgIHZhciBtYXRjaE5MID0gL1xcbi9nXG4gICAgICB2YXIgbmwgPSAxXG4gICAgICBpZiAodGV4dCA9PT0gJ1xcbicpIHtcbiAgICAgICAgbGluZUJyZWFrcyA9IDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlIChtYXRjaE5MLmV4ZWModGV4dCkpIHsgbGluZUJyZWFrcysrOyBubCA9IG1hdGNoTkwubGFzdEluZGV4IH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdG9rZW4gPSB7XG4gICAgICB0eXBlOiAoZ3JvdXAuZ2V0VHlwZSAmJiBncm91cC5nZXRUeXBlKHRleHQpKSB8fCBncm91cC50b2tlblR5cGUsXG4gICAgICB2YWx1ZTogZ3JvdXAudmFsdWUgPyBncm91cC52YWx1ZSh0ZXh0KSA6IHRleHQsXG4gICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgdG9TdHJpbmc6IHRva2VuVG9TdHJpbmcsXG4gICAgICBvZmZzZXQ6IGluZGV4LFxuICAgICAgbGluZUJyZWFrczogbGluZUJyZWFrcyxcbiAgICAgIGxpbmU6IHRoaXMubGluZSxcbiAgICAgIGNvbDogdGhpcy5jb2wsXG4gICAgfVxuICAgIC8vIG5iLiBhZGRpbmcgbW9yZSBwcm9wcyB0byB0b2tlbiBvYmplY3Qgd2lsbCBtYWtlIFY4IHNhZCFcblxuICAgIHZhciBzaXplID0gdGV4dC5sZW5ndGhcbiAgICB0aGlzLmluZGV4ICs9IHNpemVcbiAgICB0aGlzLmxpbmUgKz0gbGluZUJyZWFrc1xuICAgIGlmIChsaW5lQnJlYWtzICE9PSAwKSB7XG4gICAgICB0aGlzLmNvbCA9IHNpemUgLSBubCArIDFcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2wgKz0gc2l6ZVxuICAgIH1cbiAgICAvLyB0aHJvdywgaWYgbm8gcnVsZSB3aXRoIHtlcnJvcjogdHJ1ZX1cbiAgICBpZiAoZ3JvdXAuc2hvdWxkVGhyb3cpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmZvcm1hdEVycm9yKHRva2VuLCBcImludmFsaWQgc3ludGF4XCIpKVxuICAgIH1cblxuICAgIGlmIChncm91cC5wb3ApIHRoaXMucG9wU3RhdGUoKVxuICAgIGVsc2UgaWYgKGdyb3VwLnB1c2gpIHRoaXMucHVzaFN0YXRlKGdyb3VwLnB1c2gpXG4gICAgZWxzZSBpZiAoZ3JvdXAubmV4dCkgdGhpcy5zZXRTdGF0ZShncm91cC5uZXh0KVxuICAgIHJldHVybiB0b2tlblxuICB9XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5pdGVyYXRvcikge1xuICAgIHZhciBMZXhlckl0ZXJhdG9yID0gZnVuY3Rpb24obGV4ZXIpIHtcbiAgICAgIHRoaXMubGV4ZXIgPSBsZXhlclxuICAgIH1cblxuICAgIExleGVySXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0b2tlbiA9IHRoaXMubGV4ZXIubmV4dCgpXG4gICAgICByZXR1cm4ge3ZhbHVlOiB0b2tlbiwgZG9uZTogIXRva2VufVxuICAgIH1cblxuICAgIExleGVySXRlcmF0b3IucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgTGV4ZXIucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgTGV4ZXJJdGVyYXRvcih0aGlzKVxuICAgIH1cbiAgfVxuXG4gIExleGVyLnByb3RvdHlwZS5mb3JtYXRFcnJvciA9IGZ1bmN0aW9uKHRva2VuLCBtZXNzYWdlKSB7XG4gICAgdmFyIHZhbHVlID0gdG9rZW4udmFsdWVcbiAgICB2YXIgaW5kZXggPSB0b2tlbi5vZmZzZXRcbiAgICB2YXIgZW9sID0gdG9rZW4ubGluZUJyZWFrcyA/IHZhbHVlLmluZGV4T2YoJ1xcbicpIDogdmFsdWUubGVuZ3RoXG4gICAgdmFyIHN0YXJ0ID0gTWF0aC5tYXgoMCwgaW5kZXggLSB0b2tlbi5jb2wgKyAxKVxuICAgIHZhciBmaXJzdExpbmUgPSB0aGlzLmJ1ZmZlci5zdWJzdHJpbmcoc3RhcnQsIGluZGV4ICsgZW9sKVxuICAgIG1lc3NhZ2UgKz0gXCIgYXQgbGluZSBcIiArIHRva2VuLmxpbmUgKyBcIiBjb2wgXCIgKyB0b2tlbi5jb2wgKyBcIjpcXG5cXG5cIlxuICAgIG1lc3NhZ2UgKz0gXCIgIFwiICsgZmlyc3RMaW5lICsgXCJcXG5cIlxuICAgIG1lc3NhZ2UgKz0gXCIgIFwiICsgQXJyYXkodG9rZW4uY29sKS5qb2luKFwiIFwiKSArIFwiXlwiXG4gICAgcmV0dXJuIG1lc3NhZ2VcbiAgfVxuXG4gIExleGVyLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgTGV4ZXIodGhpcy5zdGF0ZXMsIHRoaXMuc3RhdGUpXG4gIH1cblxuICBMZXhlci5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24odG9rZW5UeXBlKSB7XG4gICAgZm9yICh2YXIgcyBpbiB0aGlzLnN0YXRlcykge1xuICAgICAgdmFyIGdyb3VwcyA9IHRoaXMuc3RhdGVzW3NdLmdyb3Vwc1xuICAgICAgZm9yICh2YXIgaT0wOyBpPGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZ3JvdXAgPSBncm91cHNbaV1cbiAgICAgICAgaWYgKGdyb3VwLnRva2VuVHlwZSA9PT0gdG9rZW5UeXBlKSByZXR1cm4gdHJ1ZVxuICAgICAgICBpZiAoZ3JvdXAua2V5d29yZHMgJiYgaGFzT3duUHJvcGVydHkuY2FsbChncm91cC5rZXl3b3JkcywgdG9rZW5UeXBlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuXG4gIHJldHVybiB7XG4gICAgY29tcGlsZTogY29tcGlsZSxcbiAgICBzdGF0ZXM6IGNvbXBpbGVTdGF0ZXMsXG4gICAgZXJyb3I6IE9iamVjdC5mcmVlemUoe2Vycm9yOiB0cnVlfSksXG4gIH1cblxufSkpXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb28vbW9vLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJ1xyXG5pbXBvcnQgQWJzdHJhY3RXcml0ZXIgZnJvbSAnLi9BYnN0cmFjdFdyaXRlcidcclxuaW1wb3J0IHsgU2VyaWFsaXplciB9IGZyb20gJy4uL1NlcmlhbGl6ZXInXHJcblxyXG5hYnN0cmFjdCBjbGFzcyBUZXh0V3JpdGVyIGltcGxlbWVudHMgQWJzdHJhY3RXcml0ZXIge1xyXG4gIGRlZmF1bHRXcml0ZU1vZGUgPSB7XHJcbiAgICBlbmNvZGluZzogJ3V0Zi04JyxcclxuICAgIG1vZGU6IDBvNjQ0LFxyXG4gICAgZmxhZzogJ3cnXHJcbiAgfVxyXG5cclxuICB3cml0ZSAoZnVsbFBhdGg6IHN0cmluZywgaXRlbXM6IGFueVtdLCBvcHRpb25zID0gdGhpcy5kZWZhdWx0V3JpdGVNb2RlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBvdXRwdXQgPSB0aGlzLnRyYW5zZm9ybShpdGVtcylcclxuXHJcbiAgICAgIGZzLndyaXRlRmlsZShmdWxsUGF0aCwgb3V0cHV0LCBvcHRpb25zLCAoZXJyb3IpID0+IHtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtIChpdGVtczogYW55W10pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGl0ZW1zLm1hcChpdGVtID0+IHRoaXMudHJhbnNmb3JtSXRlbShpdGVtKSkuam9pbignXFxuJylcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybUl0ZW0gKGl0ZW06IGFueSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBvYmplY3RIZWFkZXIgPSB0aGlzLndyaXRlSGVhZGVyKGl0ZW0ubWV0YSlcclxuICAgIGNvbnN0IG9iamVjdFByb3BlcnRpZXMgPSBTZXJpYWxpemVyLnN0cmluZ2lmeShpdGVtLnByb3BlcnRpZXMpXHJcbiAgICByZXR1cm4gb2JqZWN0SGVhZGVyICsgJyAnICsgb2JqZWN0UHJvcGVydGllcyArICdcXG4nXHJcbiAgfVxyXG5cclxuICBhYnN0cmFjdCB3cml0ZUhlYWRlciAodmFsdWU6IE9iamVjdCk6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0V3JpdGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Xcml0ZXIvVGV4dFdyaXRlci50cyIsImltcG9ydCBDb25zdGFudHMgZnJvbSAnLi9Db25zdGFudHMnXHJcbmltcG9ydCBDb252ZXJzaW9ucyBmcm9tICcuL0NvbnZlcnNpb25zJ1xyXG5pbXBvcnQgZGVjb2RlU3BlY3RyYWxDbGFzcyBmcm9tICcuL2RlY29kZVNwZWN0cmFsQ2xhc3MnXHJcbmltcG9ydCBlbmNvZGVTcGVjdHJhbENsYXNzIGZyb20gJy4vZW5jb2RlU3BlY3RyYWxDbGFzcydcclxuXHJcbmV4cG9ydCB7XHJcbiAgQ29uc3RhbnRzLFxyXG4gIENvbnZlcnNpb25zLFxyXG4gIGRlY29kZVNwZWN0cmFsQ2xhc3MsXHJcbiAgZW5jb2RlU3BlY3RyYWxDbGFzc1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9pbmRleC50cyIsImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJ1xyXG5pbXBvcnQgQWJzdHJhY3RXcml0ZXIgZnJvbSAnLi9BYnN0cmFjdFdyaXRlcidcclxuaW1wb3J0IHsgU2VyaWFsaXplciB9IGZyb20gJy4uL1NlcmlhbGl6ZXInXHJcblxyXG5hYnN0cmFjdCBjbGFzcyBDb25maWdXcml0ZXIgaW1wbGVtZW50cyBBYnN0cmFjdFdyaXRlciB7XHJcbiAgZGVmYXVsdFdyaXRlTW9kZSA9IHtcclxuICAgIGVuY29kaW5nOiAndXRmLTgnLFxyXG4gICAgbW9kZTogMG82NDQsXHJcbiAgICBmbGFnOiAndydcclxuICB9XHJcblxyXG4gIHdyaXRlIChmdWxsUGF0aDogc3RyaW5nLCBjb25maWc6IGFueSwgb3B0aW9ucyA9IHRoaXMuZGVmYXVsdFdyaXRlTW9kZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3Qgb3V0cHV0ID0gU2VyaWFsaXplci5zdHJpbmdpZnkoY29uZmlnKVxyXG5cclxuICAgICAgZnMud3JpdGVGaWxlKGZ1bGxQYXRoLCBvdXRwdXQsIG9wdGlvbnMsIChlcnJvcikgPT4ge1xyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXNvbHZlKClcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWdXcml0ZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1dyaXRlci9Db25maWdXcml0ZXIudHMiLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuZXhwb3J0IGRlZmF1bHQgaXNBcnJheTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0TGlrZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IENlbGlvIH0gZnJvbSAnLi9DZWxpbydcclxuXHJcbmV4cG9ydCB7IENlbGlvIH1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiaW1wb3J0IENlbGlvIGZyb20gJy4vQ2VsaW8nXHJcblxyXG5leHBvcnQge1xyXG4gIENlbGlvXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NlbGlvL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJy4uL0luamVjdG9yJ1xyXG5cclxuY2xhc3MgQ2VsaW8ge1xyXG4gIHN0YXRpYyByZWFkIChmaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxhbnlbXT4ge1xyXG4gICAgY29uc3QgZnVsbFBhdGggPSBwYXRoLnJlc29sdmUoZmlsZVBhdGgpXHJcbiAgICBjb25zdCBmaWxlRXh0ZW5zaW9uID0gcGF0aC5leHRuYW1lKGZ1bGxQYXRoKVxyXG4gICAgY29uc3QgdHlwZSA9IGZpbGVFeHRlbnNpb24uc3BsaXQoJy4nKVsxXVxyXG4gICAgY29uc3QgUmVhZGVyID0gSW5qZWN0b3IubWFrZVJlYWRlcih0eXBlKVxyXG5cclxuICAgIHJldHVybiBSZWFkZXIucmVhZChmdWxsUGF0aClcclxuICB9XHJcblxyXG4gIHN0YXRpYyB3cml0ZSAoZmlsZVBhdGg6IHN0cmluZywgaXRlbXM6IGFueVtdKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBmaWxlRXh0ZW5zaW9uID0gcGF0aC5leHRuYW1lKGZpbGVQYXRoKVxyXG4gICAgY29uc3QgdHlwZSA9IGZpbGVFeHRlbnNpb24uc3BsaXQoJy4nKVsxXVxyXG4gICAgY29uc3QgV3JpdGVyID0gSW5qZWN0b3IubWFrZVdyaXRlcih0eXBlKVxyXG5cclxuICAgIHJldHVybiBXcml0ZXIud3JpdGUoZmlsZVBhdGgsIGl0ZW1zKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2VsaW9cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NlbGlvL0NlbGlvLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEluamVjdG9yIGZyb20gJy4vSW5qZWN0b3InXHJcblxyXG5leHBvcnQge1xyXG4gIEluamVjdG9yXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0luamVjdG9yL2luZGV4LnRzIiwiaW1wb3J0IHsgQWJzdHJhY3RSZWFkZXIsIERBVFJlYWRlciwgTmVhcmxleUJhc2VkUmVhZGVyIH0gZnJvbSAnLi4vUmVhZGVyJ1xyXG5pbXBvcnQgeyBBYnN0cmFjdFdyaXRlciwgU1RDV3JpdGVyLCBTU0NXcml0ZXIsIERTQ1dyaXRlciwgQ0ZHV3JpdGVyLCBEQVRXcml0ZXIgfSBmcm9tICcuLi9Xcml0ZXInXHJcbmltcG9ydCBHcmFtbWFycyBmcm9tICcuLi9ncmFtbWFyJ1xyXG5pbXBvcnQgeyBGb3JtYXRzQ2hlY2tlciwgRm9ybWF0VHlwZSB9IGZyb20gJy4uL0Zvcm1hdHNDaGVja2VyJ1xyXG5cclxuY2xhc3MgSW5qZWN0b3Ige1xyXG4gIHN0YXRpYyBtYWtlUmVhZGVyIChleHRlbnNpb246IHN0cmluZyk6IEFic3RyYWN0UmVhZGVyIHtcclxuICAgIHN3aXRjaCAoRm9ybWF0c0NoZWNrZXIuZm9ybWF0VHlwZShleHRlbnNpb24pKSB7XHJcbiAgICAgIGNhc2UgRm9ybWF0VHlwZS5CSU5BUlk6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEQVRSZWFkZXIoKVxyXG5cclxuICAgICAgY2FzZSBGb3JtYXRUeXBlLlRFWFQ6XHJcbiAgICAgICAgY29uc3QgR3JhbW1hciA9IGV4dGVuc2lvbi50b1VwcGVyQ2FzZSgpICsgJ0dyYW1tYXInXHJcbiAgICAgICAgcmV0dXJuIG5ldyBOZWFybGV5QmFzZWRSZWFkZXIoR3JhbW1hcnNbR3JhbW1hcl0pXHJcblxyXG4gICAgICBjYXNlIEZvcm1hdFR5cGUuSU5DT1JSRUNUOlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW5jb3JyZWN0IGZpbGUgZm9ybWF0YClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBtYWtlV3JpdGVyIChleHRlbnNpb246IHN0cmluZyk6IEFic3RyYWN0V3JpdGVyIHtcclxuICAgIHN3aXRjaCAoRm9ybWF0c0NoZWNrZXIuZm9ybWF0VHlwZShleHRlbnNpb24pKSB7XHJcbiAgICAgIGNhc2UgRm9ybWF0VHlwZS5CSU5BUlk6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEQVRXcml0ZXIoKVxyXG5cclxuICAgICAgY2FzZSBGb3JtYXRUeXBlLlRFWFQ6XHJcbiAgICAgICAgc3dpdGNoIChleHRlbnNpb24pIHtcclxuICAgICAgICAgIGNhc2UgJ3N0Yyc6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU1RDV3JpdGVyKClcclxuXHJcbiAgICAgICAgICBjYXNlICdzc2MnOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNTQ1dyaXRlcigpXHJcblxyXG4gICAgICAgICAgY2FzZSAnZHNjJzpcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEU0NXcml0ZXIoKVxyXG5cclxuICAgICAgICAgIGNhc2UgJ2NmZyc6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ0ZHV3JpdGVyKClcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEluY29ycmVjdCBmaWxlIGZvcm1hdGApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgY2FzZSBGb3JtYXRUeXBlLklOQ09SUkVDVDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEluY29ycmVjdCBmaWxlIGZvcm1hdGApXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbmplY3RvclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSW5qZWN0b3IvSW5qZWN0b3IudHMiLCJpbXBvcnQgTmVhcmxleUJhc2VkUmVhZGVyIGZyb20gJy4vTmVhcmxleUJhc2VkUmVhZGVyJ1xyXG5pbXBvcnQgREFUUmVhZGVyIGZyb20gJy4vREFUUmVhZGVyJ1xyXG5pbXBvcnQgQWJzdHJhY3RSZWFkZXIgZnJvbSAnLi9BYnN0cmFjdFJlYWRlcidcclxuXHJcbmV4cG9ydCB7XHJcbiAgTmVhcmxleUJhc2VkUmVhZGVyLFxyXG4gIERBVFJlYWRlcixcclxuICBBYnN0cmFjdFJlYWRlcixcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVhZGVyL2luZGV4LnRzIiwiaW1wb3J0IHsgR3JhbW1hciwgUGFyc2VyIH0gZnJvbSAnbmVhcmxleSdcclxuaW1wb3J0IEFic3RyYWN0UmVhZGVyIGZyb20gJy4vQWJzdHJhY3RSZWFkZXInXHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJ1xyXG5cclxuY2xhc3MgTmVhcmxleUJhc2VkUmVhZGVyIGltcGxlbWVudHMgQWJzdHJhY3RSZWFkZXIge1xyXG4gIHBhcnNlcjogYW55XHJcblxyXG4gIGNvbnN0cnVjdG9yIChncmFtbWFyKSB7XHJcbiAgICB0aGlzLnBhcnNlciA9IG5ldyBQYXJzZXIoR3JhbW1hci5mcm9tQ29tcGlsZWQoZ3JhbW1hcikpXHJcbiAgfVxyXG5cclxuICByZWFkIChmaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxhbnlbXT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgZnMucmVhZEZpbGUoZmlsZVBhdGgsICd1dGYtOCcsIChlcnJvciwgZGF0YSkgPT4ge1xyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucGFyc2VyLmZlZWQoZGF0YSkucmVzdWx0c1swXVxyXG5cclxuICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIHtcclxuICAgICAgICAgIHJlamVjdChgVW5hYmxlIHRvIHJlYWQgZmlsZSAke2ZpbGVQYXRofWApXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZWFybGV5QmFzZWRSZWFkZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlYWRlci9OZWFybGV5QmFzZWRSZWFkZXIudHMiLCIoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290Lm5lYXJsZXkgPSBmYWN0b3J5KCk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbigpIHtcblxuZnVuY3Rpb24gUnVsZShuYW1lLCBzeW1ib2xzLCBwb3N0cHJvY2Vzcykge1xuICAgIHRoaXMuaWQgPSArK1J1bGUuaGlnaGVzdElkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5zeW1ib2xzID0gc3ltYm9sczsgICAgICAgIC8vIGEgbGlzdCBvZiBsaXRlcmFsIHwgcmVnZXggY2xhc3MgfCBub250ZXJtaW5hbFxuICAgIHRoaXMucG9zdHByb2Nlc3MgPSBwb3N0cHJvY2VzcztcbiAgICByZXR1cm4gdGhpcztcbn1cblJ1bGUuaGlnaGVzdElkID0gMDtcblxuUnVsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbih3aXRoQ3Vyc29yQXQpIHtcbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlTeW1ib2xTZXF1ZW5jZSAoZSkge1xuICAgICAgICByZXR1cm4gZS5saXRlcmFsID8gSlNPTi5zdHJpbmdpZnkoZS5saXRlcmFsKSA6XG4gICAgICAgICAgICAgICBlLnR5cGUgPyAnJScgKyBlLnR5cGUgOiBlLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHZhciBzeW1ib2xTZXF1ZW5jZSA9ICh0eXBlb2Ygd2l0aEN1cnNvckF0ID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zeW1ib2xzLm1hcChzdHJpbmdpZnlTeW1ib2xTZXF1ZW5jZSkuam9pbignICcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgOiAoICAgdGhpcy5zeW1ib2xzLnNsaWNlKDAsIHdpdGhDdXJzb3JBdCkubWFwKHN0cmluZ2lmeVN5bWJvbFNlcXVlbmNlKS5qb2luKCcgJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiDil48gXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLnN5bWJvbHMuc2xpY2Uod2l0aEN1cnNvckF0KS5tYXAoc3RyaW5naWZ5U3ltYm9sU2VxdWVuY2UpLmpvaW4oJyAnKSAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgXCIg4oaSIFwiICsgc3ltYm9sU2VxdWVuY2U7XG59XG5cblxuLy8gYSBTdGF0ZSBpcyBhIHJ1bGUgYXQgYSBwb3NpdGlvbiBmcm9tIGEgZ2l2ZW4gc3RhcnRpbmcgcG9pbnQgaW4gdGhlIGlucHV0IHN0cmVhbSAocmVmZXJlbmNlKVxuZnVuY3Rpb24gU3RhdGUocnVsZSwgZG90LCByZWZlcmVuY2UsIHdhbnRlZEJ5KSB7XG4gICAgdGhpcy5ydWxlID0gcnVsZTtcbiAgICB0aGlzLmRvdCA9IGRvdDtcbiAgICB0aGlzLnJlZmVyZW5jZSA9IHJlZmVyZW5jZTtcbiAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICB0aGlzLndhbnRlZEJ5ID0gd2FudGVkQnk7XG4gICAgdGhpcy5pc0NvbXBsZXRlID0gdGhpcy5kb3QgPT09IHJ1bGUuc3ltYm9scy5sZW5ndGg7XG59XG5cblN0YXRlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIntcIiArIHRoaXMucnVsZS50b1N0cmluZyh0aGlzLmRvdCkgKyBcIn0sIGZyb206IFwiICsgKHRoaXMucmVmZXJlbmNlIHx8IDApO1xufTtcblxuU3RhdGUucHJvdG90eXBlLm5leHRTdGF0ZSA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgdmFyIHN0YXRlID0gbmV3IFN0YXRlKHRoaXMucnVsZSwgdGhpcy5kb3QgKyAxLCB0aGlzLnJlZmVyZW5jZSwgdGhpcy53YW50ZWRCeSk7XG4gICAgc3RhdGUubGVmdCA9IHRoaXM7XG4gICAgc3RhdGUucmlnaHQgPSBjaGlsZDtcbiAgICBpZiAoc3RhdGUuaXNDb21wbGV0ZSkge1xuICAgICAgICBzdGF0ZS5kYXRhID0gc3RhdGUuYnVpbGQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcblxuU3RhdGUucHJvdG90eXBlLmJ1aWxkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gW107XG4gICAgdmFyIG5vZGUgPSB0aGlzO1xuICAgIGRvIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChub2RlLnJpZ2h0LmRhdGEpO1xuICAgICAgICBub2RlID0gbm9kZS5sZWZ0O1xuICAgIH0gd2hpbGUgKG5vZGUubGVmdCk7XG4gICAgY2hpbGRyZW4ucmV2ZXJzZSgpO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbn07XG5cblN0YXRlLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5ydWxlLnBvc3Rwcm9jZXNzKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMucnVsZS5wb3N0cHJvY2Vzcyh0aGlzLmRhdGEsIHRoaXMucmVmZXJlbmNlLCBQYXJzZXIuZmFpbCk7XG4gICAgfVxufTtcblxuXG5mdW5jdGlvbiBDb2x1bW4oZ3JhbW1hciwgaW5kZXgpIHtcbiAgICB0aGlzLmdyYW1tYXIgPSBncmFtbWFyO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLnN0YXRlcyA9IFtdO1xuICAgIHRoaXMud2FudHMgPSB7fTsgLy8gc3RhdGVzIGluZGV4ZWQgYnkgdGhlIG5vbi10ZXJtaW5hbCB0aGV5IGV4cGVjdFxuICAgIHRoaXMuc2Nhbm5hYmxlID0gW107IC8vIGxpc3Qgb2Ygc3RhdGVzIHRoYXQgZXhwZWN0IGEgdG9rZW5cbiAgICB0aGlzLmNvbXBsZXRlZCA9IHt9OyAvLyBzdGF0ZXMgdGhhdCBhcmUgbnVsbGFibGVcbn1cblxuXG5Db2x1bW4ucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbihuZXh0Q29sdW1uKSB7XG4gICAgdmFyIHN0YXRlcyA9IHRoaXMuc3RhdGVzO1xuICAgIHZhciB3YW50cyA9IHRoaXMud2FudHM7XG4gICAgdmFyIGNvbXBsZXRlZCA9IHRoaXMuY29tcGxldGVkO1xuXG4gICAgZm9yICh2YXIgdyA9IDA7IHcgPCBzdGF0ZXMubGVuZ3RoOyB3KyspIHsgLy8gbmIuIHdlIHB1c2goKSBkdXJpbmcgaXRlcmF0aW9uXG4gICAgICAgIHZhciBzdGF0ZSA9IHN0YXRlc1t3XTtcblxuICAgICAgICBpZiAoc3RhdGUuaXNDb21wbGV0ZSkge1xuICAgICAgICAgICAgc3RhdGUuZmluaXNoKCk7XG4gICAgICAgICAgICBpZiAoc3RhdGUuZGF0YSAhPT0gUGFyc2VyLmZhaWwpIHtcbiAgICAgICAgICAgICAgICAvLyBjb21wbGV0ZVxuICAgICAgICAgICAgICAgIHZhciB3YW50ZWRCeSA9IHN0YXRlLndhbnRlZEJ5O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSB3YW50ZWRCeS5sZW5ndGg7IGktLTsgKSB7IC8vIHRoaXMgbGluZSBpcyBob3RcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlZnQgPSB3YW50ZWRCeVtpXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZShsZWZ0LCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gc3BlY2lhbC1jYXNlIG51bGxhYmxlc1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5yZWZlcmVuY2UgPT09IHRoaXMuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGZ1dHVyZSBwcmVkaWN0b3JzIG9mIHRoaXMgcnVsZSBnZXQgY29tcGxldGVkLlxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwID0gc3RhdGUucnVsZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAodGhpcy5jb21wbGV0ZWRbZXhwXSA9IHRoaXMuY29tcGxldGVkW2V4cF0gfHwgW10pLnB1c2goc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcXVldWUgc2Nhbm5hYmxlIHN0YXRlc1xuICAgICAgICAgICAgdmFyIGV4cCA9IHN0YXRlLnJ1bGUuc3ltYm9sc1tzdGF0ZS5kb3RdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FubmFibGUucHVzaChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHByZWRpY3RcbiAgICAgICAgICAgIGlmICh3YW50c1tleHBdKSB7XG4gICAgICAgICAgICAgICAgd2FudHNbZXhwXS5wdXNoKHN0YXRlKTtcblxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuaGFzT3duUHJvcGVydHkoZXhwKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVsbHMgPSBjb21wbGV0ZWRbZXhwXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbnVsbHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlKHN0YXRlLCByaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdhbnRzW2V4cF0gPSBbc3RhdGVdO1xuICAgICAgICAgICAgICAgIHRoaXMucHJlZGljdChleHApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5Db2x1bW4ucHJvdG90eXBlLnByZWRpY3QgPSBmdW5jdGlvbihleHApIHtcbiAgICB2YXIgcnVsZXMgPSB0aGlzLmdyYW1tYXIuYnlOYW1lW2V4cF0gfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciByID0gcnVsZXNbaV07XG4gICAgICAgIHZhciB3YW50ZWRCeSA9IHRoaXMud2FudHNbZXhwXTtcbiAgICAgICAgdmFyIHMgPSBuZXcgU3RhdGUociwgMCwgdGhpcy5pbmRleCwgd2FudGVkQnkpO1xuICAgICAgICB0aGlzLnN0YXRlcy5wdXNoKHMpO1xuICAgIH1cbn1cblxuQ29sdW1uLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgdmFyIGlucCA9IHJpZ2h0LnJ1bGUubmFtZTtcbiAgICBpZiAobGVmdC5ydWxlLnN5bWJvbHNbbGVmdC5kb3RdID09PSBpbnApIHtcbiAgICAgICAgdmFyIGNvcHkgPSBsZWZ0Lm5leHRTdGF0ZShyaWdodCk7XG4gICAgICAgIHRoaXMuc3RhdGVzLnB1c2goY29weSk7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIEdyYW1tYXIocnVsZXMsIHN0YXJ0KSB7XG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydCB8fCB0aGlzLnJ1bGVzWzBdLm5hbWU7XG4gICAgdmFyIGJ5TmFtZSA9IHRoaXMuYnlOYW1lID0ge307XG4gICAgdGhpcy5ydWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHJ1bGUpIHtcbiAgICAgICAgaWYgKCFieU5hbWUuaGFzT3duUHJvcGVydHkocnVsZS5uYW1lKSkge1xuICAgICAgICAgICAgYnlOYW1lW3J1bGUubmFtZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBieU5hbWVbcnVsZS5uYW1lXS5wdXNoKHJ1bGUpO1xuICAgIH0pO1xufVxuXG4vLyBTbyB3ZSBjYW4gYWxsb3cgcGFzc2luZyAocnVsZXMsIHN0YXJ0KSBkaXJlY3RseSB0byBQYXJzZXIgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5HcmFtbWFyLmZyb21Db21waWxlZCA9IGZ1bmN0aW9uKHJ1bGVzLCBzdGFydCkge1xuICAgIHZhciBsZXhlciA9IHJ1bGVzLkxleGVyO1xuICAgIGlmIChydWxlcy5QYXJzZXJTdGFydCkge1xuICAgICAgc3RhcnQgPSBydWxlcy5QYXJzZXJTdGFydDtcbiAgICAgIHJ1bGVzID0gcnVsZXMuUGFyc2VyUnVsZXM7XG4gICAgfVxuICAgIHZhciBydWxlcyA9IHJ1bGVzLm1hcChmdW5jdGlvbiAocikgeyByZXR1cm4gKG5ldyBSdWxlKHIubmFtZSwgci5zeW1ib2xzLCByLnBvc3Rwcm9jZXNzKSk7IH0pO1xuICAgIHZhciBnID0gbmV3IEdyYW1tYXIocnVsZXMsIHN0YXJ0KTtcbiAgICBnLmxleGVyID0gbGV4ZXI7IC8vIG5iLiBzdG9yaW5nIGxleGVyIG9uIEdyYW1tYXIgaXMgaWZmeSwgYnV0IHVuYXZvaWRhYmxlXG4gICAgcmV0dXJuIGc7XG59XG5cblxuZnVuY3Rpb24gU3RyZWFtTGV4ZXIoKSB7XG4gIHRoaXMucmVzZXQoXCJcIik7XG59XG5cblN0cmVhbUxleGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKGRhdGEsIHN0YXRlKSB7XG4gICAgdGhpcy5idWZmZXIgPSBkYXRhO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMubGluZSA9IHN0YXRlID8gc3RhdGUubGluZSA6IDE7XG4gICAgdGhpcy5sYXN0TGluZUJyZWFrID0gc3RhdGUgPyAtc3RhdGUuY29sIDogMDtcbn1cblxuU3RyZWFtTGV4ZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICB2YXIgY2ggPSB0aGlzLmJ1ZmZlclt0aGlzLmluZGV4KytdO1xuICAgICAgICBpZiAoY2ggPT09ICdcXG4nKSB7XG4gICAgICAgICAgdGhpcy5saW5lICs9IDE7XG4gICAgICAgICAgdGhpcy5sYXN0TGluZUJyZWFrID0gdGhpcy5pbmRleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3ZhbHVlOiBjaH07XG4gICAgfVxufVxuXG5TdHJlYW1MZXhlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIGxpbmU6IHRoaXMubGluZSxcbiAgICBjb2w6IHRoaXMuaW5kZXggLSB0aGlzLmxhc3RMaW5lQnJlYWssXG4gIH1cbn1cblxuU3RyZWFtTGV4ZXIucHJvdG90eXBlLmZvcm1hdEVycm9yID0gZnVuY3Rpb24odG9rZW4sIG1lc3NhZ2UpIHtcbiAgICAvLyBuYi4gdGhpcyBnZXRzIGNhbGxlZCBhZnRlciBjb25zdW1pbmcgdGhlIG9mZmVuZGluZyB0b2tlbixcbiAgICAvLyBzbyB0aGUgY3VscHJpdCBpcyBpbmRleC0xXG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIGlmICh0eXBlb2YgYnVmZmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgbmV4dExpbmVCcmVhayA9IGJ1ZmZlci5pbmRleE9mKCdcXG4nLCB0aGlzLmluZGV4KTtcbiAgICAgICAgaWYgKG5leHRMaW5lQnJlYWsgPT09IC0xKSBuZXh0TGluZUJyZWFrID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgdmFyIGxpbmUgPSBidWZmZXIuc3Vic3RyaW5nKHRoaXMubGFzdExpbmVCcmVhaywgbmV4dExpbmVCcmVhaylcbiAgICAgICAgdmFyIGNvbCA9IHRoaXMuaW5kZXggLSB0aGlzLmxhc3RMaW5lQnJlYWs7XG4gICAgICAgIG1lc3NhZ2UgKz0gXCIgYXQgbGluZSBcIiArIHRoaXMubGluZSArIFwiIGNvbCBcIiArIGNvbCArIFwiOlxcblxcblwiO1xuICAgICAgICBtZXNzYWdlICs9IFwiICBcIiArIGxpbmUgKyBcIlxcblwiXG4gICAgICAgIG1lc3NhZ2UgKz0gXCIgIFwiICsgQXJyYXkoY29sKS5qb2luKFwiIFwiKSArIFwiXlwiXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlICsgXCIgYXQgaW5kZXggXCIgKyAodGhpcy5pbmRleCAtIDEpO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBQYXJzZXIocnVsZXMsIHN0YXJ0LCBvcHRpb25zKSB7XG4gICAgaWYgKHJ1bGVzIGluc3RhbmNlb2YgR3JhbW1hcikge1xuICAgICAgICB2YXIgZ3JhbW1hciA9IHJ1bGVzO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHN0YXJ0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBncmFtbWFyID0gR3JhbW1hci5mcm9tQ29tcGlsZWQocnVsZXMsIHN0YXJ0KTtcbiAgICB9XG4gICAgdGhpcy5ncmFtbWFyID0gZ3JhbW1hcjtcblxuICAgIC8vIFJlYWQgb3B0aW9uc1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAga2VlcEhpc3Rvcnk6IGZhbHNlLFxuICAgICAgICBsZXhlcjogZ3JhbW1hci5sZXhlciB8fCBuZXcgU3RyZWFtTGV4ZXIsXG4gICAgfTtcbiAgICBmb3IgKHZhciBrZXkgaW4gKG9wdGlvbnMgfHwge30pKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgIH1cblxuICAgIC8vIFNldHVwIGxleGVyXG4gICAgdGhpcy5sZXhlciA9IHRoaXMub3B0aW9ucy5sZXhlcjtcbiAgICB0aGlzLmxleGVyU3RhdGUgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBTZXR1cCBhIHRhYmxlXG4gICAgdmFyIGNvbHVtbiA9IG5ldyBDb2x1bW4oZ3JhbW1hciwgMCk7XG4gICAgdmFyIHRhYmxlID0gdGhpcy50YWJsZSA9IFtjb2x1bW5dO1xuXG4gICAgLy8gSSBjb3VsZCBiZSBleHBlY3RpbmcgYW55dGhpbmcuXG4gICAgY29sdW1uLndhbnRzW2dyYW1tYXIuc3RhcnRdID0gW107XG4gICAgY29sdW1uLnByZWRpY3QoZ3JhbW1hci5zdGFydCk7XG4gICAgLy8gVE9ETyB3aGF0IGlmIHN0YXJ0IHJ1bGUgaXMgbnVsbGFibGU/XG4gICAgY29sdW1uLnByb2Nlc3MoKTtcbiAgICB0aGlzLmN1cnJlbnQgPSAwOyAvLyB0b2tlbiBpbmRleFxufVxuXG4vLyBjcmVhdGUgYSByZXNlcnZlZCB0b2tlbiBmb3IgaW5kaWNhdGluZyBhIHBhcnNlIGZhaWxcblBhcnNlci5mYWlsID0ge307XG5cblBhcnNlci5wcm90b3R5cGUuZmVlZCA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gICAgdmFyIGxleGVyID0gdGhpcy5sZXhlcjtcbiAgICBsZXhlci5yZXNldChjaHVuaywgdGhpcy5sZXhlclN0YXRlKTtcblxuICAgIHZhciB0b2tlbjtcbiAgICB3aGlsZSAodG9rZW4gPSBsZXhlci5uZXh0KCkpIHtcbiAgICAgICAgLy8gV2UgYWRkIG5ldyBzdGF0ZXMgdG8gdGFibGVbY3VycmVudCsxXVxuICAgICAgICB2YXIgY29sdW1uID0gdGhpcy50YWJsZVt0aGlzLmN1cnJlbnRdO1xuXG4gICAgICAgIC8vIEdDIHVudXNlZCBzdGF0ZXNcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMua2VlcEhpc3RvcnkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnRhYmxlW3RoaXMuY3VycmVudCAtIDFdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG4gPSB0aGlzLmN1cnJlbnQgKyAxO1xuICAgICAgICB2YXIgbmV4dENvbHVtbiA9IG5ldyBDb2x1bW4odGhpcy5ncmFtbWFyLCBuKTtcbiAgICAgICAgdGhpcy50YWJsZS5wdXNoKG5leHRDb2x1bW4pO1xuXG4gICAgICAgIC8vIEFkdmFuY2UgYWxsIHRva2VucyB0aGF0IGV4cGVjdCB0aGUgc3ltYm9sXG4gICAgICAgIHZhciBsaXRlcmFsID0gdG9rZW4udmFsdWU7XG4gICAgICAgIHZhciB2YWx1ZSA9IGxleGVyLmNvbnN0cnVjdG9yID09PSBTdHJlYW1MZXhlciA/IHRva2VuLnZhbHVlIDogdG9rZW47XG4gICAgICAgIHZhciBzY2FubmFibGUgPSBjb2x1bW4uc2Nhbm5hYmxlO1xuICAgICAgICBmb3IgKHZhciB3ID0gc2Nhbm5hYmxlLmxlbmd0aDsgdy0tOyApIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHNjYW5uYWJsZVt3XTtcbiAgICAgICAgICAgIHZhciBleHBlY3QgPSBzdGF0ZS5ydWxlLnN5bWJvbHNbc3RhdGUuZG90XTtcbiAgICAgICAgICAgIC8vIFRyeSB0byBjb25zdW1lIHRoZSB0b2tlblxuICAgICAgICAgICAgLy8gZWl0aGVyIHJlZ2V4IG9yIGxpdGVyYWxcbiAgICAgICAgICAgIGlmIChleHBlY3QudGVzdCA/IGV4cGVjdC50ZXN0KHZhbHVlKSA6XG4gICAgICAgICAgICAgICAgZXhwZWN0LnR5cGUgPyBleHBlY3QudHlwZSA9PT0gdG9rZW4udHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZXhwZWN0LmxpdGVyYWwgPT09IGxpdGVyYWwpIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgaXRcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IHN0YXRlLm5leHRTdGF0ZSh7ZGF0YTogdmFsdWUsIHRva2VuOiB0b2tlbiwgaXNUb2tlbjogdHJ1ZSwgcmVmZXJlbmNlOiBuIC0gMX0pO1xuICAgICAgICAgICAgICAgIG5leHRDb2x1bW4uc3RhdGVzLnB1c2gobmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOZXh0LCBmb3IgZWFjaCBvZiB0aGUgcnVsZXMsIHdlIGVpdGhlclxuICAgICAgICAvLyAoYSkgY29tcGxldGUgaXQsIGFuZCB0cnkgdG8gc2VlIGlmIHRoZSByZWZlcmVuY2Ugcm93IGV4cGVjdGVkIHRoYXRcbiAgICAgICAgLy8gICAgIHJ1bGVcbiAgICAgICAgLy8gKGIpIHByZWRpY3QgdGhlIG5leHQgbm9udGVybWluYWwgaXQgZXhwZWN0cyBieSBhZGRpbmcgdGhhdFxuICAgICAgICAvLyAgICAgbm9udGVybWluYWwncyBzdGFydCBzdGF0ZVxuICAgICAgICAvLyBUbyBwcmV2ZW50IGR1cGxpY2F0aW9uLCB3ZSBhbHNvIGtlZXAgdHJhY2sgb2YgcnVsZXMgd2UgaGF2ZSBhbHJlYWR5XG4gICAgICAgIC8vIGFkZGVkXG5cbiAgICAgICAgbmV4dENvbHVtbi5wcm9jZXNzKCk7XG5cbiAgICAgICAgLy8gSWYgbmVlZGVkLCB0aHJvdyBhbiBlcnJvcjpcbiAgICAgICAgaWYgKG5leHRDb2x1bW4uc3RhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gTm8gc3RhdGVzIGF0IGFsbCEgVGhpcyBpcyBub3QgZ29vZC5cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy5sZXhlci5mb3JtYXRFcnJvcih0b2tlbiwgXCJpbnZhbGlkIHN5bnRheFwiKSArIFwiXFxuXCI7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiVW5leHBlY3RlZCBcIiArICh0b2tlbi50eXBlID8gdG9rZW4udHlwZSArIFwiIHRva2VuOiBcIiA6IFwiXCIpO1xuICAgICAgICAgICAgbWVzc2FnZSArPSBKU09OLnN0cmluZ2lmeSh0b2tlbi52YWx1ZSAhPT0gdW5kZWZpbmVkID8gdG9rZW4udmFsdWUgOiB0b2tlbikgKyBcIlxcblwiO1xuICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgIGVyci5vZmZzZXQgPSB0aGlzLmN1cnJlbnQ7XG4gICAgICAgICAgICBlcnIudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1heWJlIHNhdmUgbGV4ZXIgc3RhdGVcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5rZWVwSGlzdG9yeSkge1xuICAgICAgICAgIGNvbHVtbi5sZXhlclN0YXRlID0gbGV4ZXIuc2F2ZSgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnQrKztcbiAgICB9XG4gICAgaWYgKGNvbHVtbikge1xuICAgICAgdGhpcy5sZXhlclN0YXRlID0gbGV4ZXIuc2F2ZSgpXG4gICAgfVxuXG4gICAgLy8gSW5jcmVtZW50YWxseSBrZWVwIHRyYWNrIG9mIHJlc3VsdHNcbiAgICB0aGlzLnJlc3VsdHMgPSB0aGlzLmZpbmlzaCgpO1xuXG4gICAgLy8gQWxsb3cgY2hhaW5pbmcsIGZvciB3aGF0ZXZlciBpdCdzIHdvcnRoXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29sdW1uID0gdGhpcy50YWJsZVt0aGlzLmN1cnJlbnRdO1xuICAgIGNvbHVtbi5sZXhlclN0YXRlID0gdGhpcy5sZXhlclN0YXRlO1xuICAgIHJldHVybiBjb2x1bW47XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbihjb2x1bW4pIHtcbiAgICB2YXIgaW5kZXggPSBjb2x1bW4uaW5kZXg7XG4gICAgdGhpcy5jdXJyZW50ID0gaW5kZXg7XG4gICAgdGhpcy50YWJsZVtpbmRleF0gPSBjb2x1bW47XG4gICAgdGhpcy50YWJsZS5zcGxpY2UoaW5kZXggKyAxKTtcbiAgICB0aGlzLmxleGVyU3RhdGUgPSBjb2x1bW4ubGV4ZXJTdGF0ZTtcblxuICAgIC8vIEluY3JlbWVudGFsbHkga2VlcCB0cmFjayBvZiByZXN1bHRzXG4gICAgdGhpcy5yZXN1bHRzID0gdGhpcy5maW5pc2goKTtcbn07XG5cbi8vIG5iLiBkZXByZWNhdGVkOiB1c2Ugc2F2ZS9yZXN0b3JlIGluc3RlYWQhXG5QYXJzZXIucHJvdG90eXBlLnJld2luZCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMua2VlcEhpc3RvcnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXQgb3B0aW9uIGBrZWVwSGlzdG9yeWAgdG8gZW5hYmxlIHJld2luZGluZycpXG4gICAgfVxuICAgIC8vIG5iLiByZWNhbGwgY29sdW1uICh0YWJsZSkgaW5kaWNpZXMgZmFsbCBiZXR3ZWVuIHRva2VuIGluZGljaWVzLlxuICAgIC8vICAgICAgICBjb2wgMCAgIC0tICAgdG9rZW4gMCAgIC0tICAgY29sIDFcbiAgICB0aGlzLnJlc3RvcmUodGhpcy50YWJsZVtpbmRleF0pO1xufTtcblxuUGFyc2VyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAvLyBSZXR1cm4gdGhlIHBvc3NpYmxlIHBhcnNpbmdzXG4gICAgdmFyIGNvbnNpZGVyYXRpb25zID0gW107XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5ncmFtbWFyLnN0YXJ0O1xuICAgIHZhciBjb2x1bW4gPSB0aGlzLnRhYmxlW3RoaXMudGFibGUubGVuZ3RoIC0gMV1cbiAgICBjb2x1bW4uc3RhdGVzLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHQucnVsZS5uYW1lID09PSBzdGFydFxuICAgICAgICAgICAgICAgICYmIHQuZG90ID09PSB0LnJ1bGUuc3ltYm9scy5sZW5ndGhcbiAgICAgICAgICAgICAgICAmJiB0LnJlZmVyZW5jZSA9PT0gMFxuICAgICAgICAgICAgICAgICYmIHQuZGF0YSAhPT0gUGFyc2VyLmZhaWwpIHtcbiAgICAgICAgICAgIGNvbnNpZGVyYXRpb25zLnB1c2godCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29uc2lkZXJhdGlvbnMubWFwKGZ1bmN0aW9uKGMpIHtyZXR1cm4gYy5kYXRhOyB9KTtcbn07XG5cbnJldHVybiB7XG4gICAgUGFyc2VyOiBQYXJzZXIsXG4gICAgR3JhbW1hcjogR3JhbW1hcixcbiAgICBSdWxlOiBSdWxlLFxufTtcblxufSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbmVhcmxleS9saWIvbmVhcmxleS5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZGVjb2RlU3BlY3RyYWxDbGFzcyB9IGZyb20gJy4uL3V0aWxzJ1xyXG5pbXBvcnQgQWJzdHJhY3RSZWFkZXIgZnJvbSAnLi9BYnN0cmFjdFJlYWRlcidcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnXHJcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vdXRpbHMvQ29uc3RhbnRzJ1xyXG5cclxuY2xhc3MgREFUUmVhZGVyIGltcGxlbWVudHMgQWJzdHJhY3RSZWFkZXIge1xyXG4gIHByaXZhdGUgc3RhdGljIHBhcnNlIChkYXRhOiBCdWZmZXIpOiBhbnlbXSB7XHJcbiAgICBsZXQgc3RhcnNJbkZpbGUgPSAwXHJcblxyXG4gICAgY29uc3QgaGVhZGVyID0gZGF0YS50b1N0cmluZygndXRmLTgnLCAwLCBDb25zdGFudHMuRklMRV9IRUFERVIubGVuZ3RoKVxyXG4gICAgY29uc3QgdmVyc2lvbiA9IGRhdGEucmVhZFVJbnQxNkxFKENvbnN0YW50cy5GSUxFX0hFQURFUi5sZW5ndGgpXHJcblxyXG4gICAgaWYgKGhlYWRlciAhPT0gQ29uc3RhbnRzLkZJTEVfSEVBREVSKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgZmlsZSBzaWduYXR1cmUnKVxyXG4gICAgfSBlbHNlIGlmICh2ZXJzaW9uICE9PSBDb25zdGFudHMuVkVSU0lPTikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGZpbGUgdmVyc2lvbicpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFyc0luRmlsZSA9IGRhdGEucmVhZFVJbnQzMkxFKENvbnN0YW50cy5GSUxFX0hFQURFUi5sZW5ndGggKyAyKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHQgPSBbXVxyXG4gICAgbGV0IHN0YXJOdW1iZXIgPSAwXHJcbiAgICB3aGlsZSAoc3Rhck51bWJlciA8IHN0YXJzSW5GaWxlKSB7XHJcbiAgICAgIGxldCBvZmZzZXQgPSBDb25zdGFudHMuSEVBREVSX09GRlNFVCArIHN0YXJOdW1iZXIgKiAyMFxyXG4gICAgICBsZXQgY2F0YWxvZ051bWJlciA9IGRhdGEucmVhZFVJbnQzMkxFKG9mZnNldClcclxuICAgICAgbGV0IERpc3RhbmNlID0gZGF0YS5yZWFkRmxvYXRMRShvZmZzZXQgKyA0KVxyXG4gICAgICBsZXQgUkEgPSBkYXRhLnJlYWRGbG9hdExFKG9mZnNldCArIDgpXHJcbiAgICAgIGxldCBEZWMgPSBkYXRhLnJlYWRGbG9hdExFKG9mZnNldCArIDEyKVxyXG4gICAgICBsZXQgQWJzTWFnID0gZGF0YS5yZWFkSW50MTZMRShvZmZzZXQgKyAxNilcclxuICAgICAgbGV0IFNwZWN0cmFsVHlwZSA9IGRlY29kZVNwZWN0cmFsQ2xhc3MoZGF0YS5yZWFkVUludDE2TEUob2Zmc2V0ICsgMTgpKVxyXG5cclxuICAgICAgcmVzdWx0LnB1c2goe1xyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIHR5cGU6ICdTdGFyJyxcclxuICAgICAgICAgIG1vZGU6ICdNb2RpZnlTdGFyJyxcclxuICAgICAgICAgIG51bWJlcjogY2F0YWxvZ051bWJlclxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgRGlzdGFuY2UsXHJcbiAgICAgICAgICBSQSxcclxuICAgICAgICAgIERlYyxcclxuICAgICAgICAgIEFic01hZyxcclxuICAgICAgICAgIFNwZWN0cmFsVHlwZVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgICsrc3Rhck51bWJlclxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gIH1cclxuXHJcbiAgcmVhZCAoZmlsZU5hbWUpOiBQcm9taXNlPGFueVtdPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBmcy5yZWFkRmlsZShmaWxlTmFtZSwgKGVycm9yLCBkYXRhOiBCdWZmZXIpID0+IHtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzb2x2ZShEQVRSZWFkZXIucGFyc2UoZGF0YSkpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgREFUUmVhZGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZWFkZXIvREFUUmVhZGVyLnRzIiwiaW1wb3J0IENvbnN0YW50cyBmcm9tICcuL0NvbnN0YW50cydcclxuXHJcbmNvbnN0IENvbnZlcnNpb25zID0ge1xyXG4gIGx1bVRvQWJzTWFnOiAobHVtOiBudW1iZXIpOiBudW1iZXIgPT4gQ29uc3RhbnRzLlNPTEFSX0FCU01BRyAtIE1hdGgubG9nKGx1bSkgKiBDb25zdGFudHMuTE5fTUFHLFxyXG4gIGx1bVRvQXBwTWFnOiAobHVtOiBudW1iZXIsIGx5cnM6IG51bWJlcik6IG51bWJlciA9PiB0aGlzLmFic1RvQXBwTWFnKHRoaXMubHVtVG9BYnNNYWcobHVtKSwgbHlycyksXHJcbiAgYWJzTWFnVG9MdW06IChtYWc6IG51bWJlcik6IG51bWJlciA9PiBNYXRoLmV4cCgoQ29uc3RhbnRzLlNPTEFSX0FCU01BRyAtIG1hZykgLyBDb25zdGFudHMuTE5fTUFHKSxcclxuICBhcHBNYWdUb0x1bTogKG1hZzogbnVtYmVyLCBseXJzKSA9PiB0aGlzLmFic01hZ1RvTHVtKHRoaXMuYXBwVG9BYnNNYWcobWFnLCBseXJzKSksXHJcbiAgYXBwVG9BYnNNYWc6IChhcHBNYWc6IG51bWJlciwgbHlyczogbnVtYmVyKTogbnVtYmVyID0+IChhcHBNYWcgKyA1IC0gNSAqIE1hdGgubG9nMTAobHlycyAvIENvbnN0YW50cy5MWV9QRVJfUEFSU0VDKSksXHJcbiAgYWJzVG9BcHBNYWc6IChhYnNNYWc6IG51bWJlciwgbHlyczogbnVtYmVyKTogbnVtYmVyID0+IChhYnNNYWcgLSA1ICsgNSAqIE1hdGgubG9nMTAobHlycyAvIENvbnN0YW50cy5MWV9QRVJfUEFSU0VDKSksXHJcbiAgbGlnaHRZZWFyc1RvUGFyc2VjczogKGx5OiBudW1iZXIpID0+IGx5IC8gQ29uc3RhbnRzLkxZX1BFUl9QQVJTRUMsXHJcbiAgcGFyc2Vjc1RvTGlnaHRZZWFyczogKHBjOiBudW1iZXIpID0+IHBjICogQ29uc3RhbnRzLkxZX1BFUl9QQVJTRUMsXHJcbiAgbGlnaHRZZWFyc1RvS2lsb21ldGVyczogKGx5OiBudW1iZXIpID0+IGx5ICogQ29uc3RhbnRzLktNX1BFUl9MWSxcclxuICBraWxvbWV0ZXJzVG9MaWdodFllYXJzOiAoa206IG51bWJlcikgPT4ga20gLyBDb25zdGFudHMuS01fUEVSX0xZLFxyXG4gIGxpZ2h0WWVhcnNUb0FVOiAobHk6IG51bWJlcikgPT4gbHkgKiBDb25zdGFudHMuQVVfUEVSX0xZLFxyXG4gIEFVdG9LaWxvbWV0ZXJzOiAoYXU6IG51bWJlcikgPT4gYXUgKiBDb25zdGFudHMuS01fUEVSX0FVLFxyXG4gIGtpbG9tZXRlcnNUb0FVOiAoa206IG51bWJlcikgPT4ga20gLyBDb25zdGFudHMuS01fUEVSX0FVLFxyXG4gIHNlY29uZHNUb0p1bGlhbkRhdGU6IChzZWM6IG51bWJlcikgPT4gc2VjIC8gQ29uc3RhbnRzLlNFQ09ORFNfUEVSX0RBWSxcclxuICBkZWNpbWFsVG9EZWdNaW5TZWM6IChhbmdsZTogbnVtYmVyKSA9PiB7XHJcbiAgICBsZXQgZGVncmVlcyA9IE1hdGguZmxvb3IoYW5nbGUpXHJcblxyXG4gICAgbGV0IEEgPSBhbmdsZSAtIGRlZ3JlZXNcclxuICAgIGxldCBCID0gQSAqIDYwLjBcclxuICAgIGxldCBtaW51dGVzID0gQlxyXG4gICAgbGV0IEMgPSBCIC0gbWludXRlc1xyXG4gICAgbGV0IHNlY29uZHMgPSBDICogNjAuMFxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGRlZ3JlZXMsXHJcbiAgICAgIG1pbnV0ZXMsXHJcbiAgICAgIHNlY29uZHNcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnZlcnNpb25zXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9Db252ZXJzaW9ucy50cyIsImVudW0gU3RhclR5cGUge1xyXG4gIE5vcm1hbFN0YXIsXHJcbiAgV2hpdGVEd2FyZixcclxuICBOZXV0cm9uU3RhcixcclxuICBCbGFja0hvbGUsXHJcbn1cclxuXHJcbmVudW0gU3BlY3RyYWxDbGFzcyB7XHJcbiAgU3BlY3RyYWxfTyxcclxuICBTcGVjdHJhbF9CLFxyXG4gIFNwZWN0cmFsX0EsXHJcbiAgU3BlY3RyYWxfRixcclxuICBTcGVjdHJhbF9HLFxyXG4gIFNwZWN0cmFsX0ssXHJcbiAgU3BlY3RyYWxfTSxcclxuICBTcGVjdHJhbF9SLCAvLyBzdXBlcmNlZGVkIGJ5IGNsYXNzIENcclxuICBTcGVjdHJhbF9TLFxyXG4gIFNwZWN0cmFsX04sIC8vIHN1cGVyY2VkZWQgYnkgY2xhc3MgQ1xyXG4gIFNwZWN0cmFsX1dDLFxyXG4gIFNwZWN0cmFsX1dOLFxyXG4gIFNwZWN0cmFsX1Vua25vd24sXHJcbiAgU3BlY3RyYWxfTCxcclxuICBTcGVjdHJhbF9ULFxyXG4gIFNwZWN0cmFsX0MsXHJcbiAgU3BlY3RyYWxfREEsIC8vIHdoaXRlIGR3YXJmIEEgKEJhbG1lciBsaW5lcywgbm8gSGUgSSBvciBtZXRhbHMpXHJcbiAgU3BlY3RyYWxfREIsIC8vIHdoaXRlIGR3YXJmIEIgKEhlIEkgbGluZXMsIG5vIEggb3IgbWV0YWxzKVxyXG4gIFNwZWN0cmFsX0RDLCAvLyB3aGl0ZSBkd2FyZiBDLCBjb250aW51b3VzIHNwZWN0cnVtXHJcbiAgU3BlY3RyYWxfRE8sIC8vIHdoaXRlIGR3YXJmIE8sIEhlIElJIHN0cm9uZywgSGUgSSBvciBIXHJcbiAgU3BlY3RyYWxfRFEsIC8vIHdoaXRlIGR3YXJmIFEsIGNhcmJvbiBmZWF0dXJlc1xyXG4gIFNwZWN0cmFsX0RaLCAvLyB3aGl0ZSBkd2FyZiBaLCBtZXRhbCBsaW5lcyBvbmx5LCBubyBIIG9yIEhlXHJcbiAgU3BlY3RyYWxfRCwgLy8gZ2VuZXJpYyB3aGl0ZSBkd2FyZiwgbm8gYWRkaXRpb25hbCBkYXRhXHJcbiAgU3BlY3RyYWxfRFgsXHJcbiAgU3BlY3RyYWxfQ291bnRcclxufVxyXG5cclxuZW51bSBTcGVjdHJhbENsYXNzU3RyIHtcclxuICBPLFxyXG4gIEIsXHJcbiAgQSxcclxuICBGLFxyXG4gIEcsXHJcbiAgSyxcclxuICBNLFxyXG4gIFIsIC8vIHN1cGVyY2VkZWQgYnkgY2xhc3MgQ1xyXG4gIFMsXHJcbiAgTiwgLy8gc3VwZXJjZWRlZCBieSBjbGFzcyBDXHJcbiAgV0MsXHJcbiAgV04sXHJcbiAgJycsXHJcbiAgTCxcclxuICBULFxyXG4gIEMsXHJcbiAgREEsIC8vIHdoaXRlIGR3YXJmIEEgKEJhbG1lciBsaW5lcywgbm8gSGUgSSBvciBtZXRhbHMpXHJcbiAgREIsIC8vIHdoaXRlIGR3YXJmIEIgKEhlIEkgbGluZXMsIG5vIEggb3IgbWV0YWxzKVxyXG4gIERDLCAvLyB3aGl0ZSBkd2FyZiBDLCBjb250aW51b3VzIHNwZWN0cnVtXHJcbiAgRE8sIC8vIHdoaXRlIGR3YXJmIE8sIEhlIElJIHN0cm9uZywgSGUgSSBvciBIXHJcbiAgRFEsIC8vIHdoaXRlIGR3YXJmIFEsIGNhcmJvbiBmZWF0dXJlc1xyXG4gIERaLCAvLyB3aGl0ZSBkd2FyZiBaLCBtZXRhbCBsaW5lcyBvbmx5LCBubyBIIG9yIEhlXHJcbiAgRCwgLy8gZ2VuZXJpYyB3aGl0ZSBkd2FyZiwgbm8gYWRkaXRpb25hbCBkYXRhXHJcbiAgRFgsXHJcbiAgQ291bnRcclxufVxyXG5cclxuZW51bSBMdW1pbm9zaXR5Q2xhc3Mge1xyXG4gIEx1bV9JYTAsXHJcbiAgTHVtX0lhLFxyXG4gIEx1bV9JYixcclxuICBMdW1fSUksXHJcbiAgTHVtX0lJSSxcclxuICBMdW1fSVYsXHJcbiAgTHVtX1YsXHJcbiAgTHVtX1ZJLFxyXG4gIEx1bV9Vbmtub3duLFxyXG4gIEx1bV9Db3VudFxyXG59XHJcblxyXG5lbnVtIEx1bWlub3NpdHlDbGFzc1N0ciB7XHJcbiAgSWEwLFxyXG4gIElhLFxyXG4gIEliLFxyXG4gIElJLFxyXG4gIElJSSxcclxuICBJVixcclxuICBWLFxyXG4gIFZJLFxyXG4gICcnLFxyXG4gIENvdW50XHJcbn1cclxuXHJcbmNvbnN0IEx1bVN0ckNsYXNzZXMgPSBbXHJcbiAgJ0ktYTAnLFxyXG4gICdJLWEnLFxyXG4gICdJLWInLFxyXG4gICdJSScsXHJcbiAgJ0lJSScsXHJcbiAgJ0lWJyxcclxuICAnVicsXHJcbiAgJ1ZJJ1xyXG5dXHJcbmNvbnN0IFN1YkNsYXNzVW5rbm93biA9IDEwXHJcbmNvbnN0IFdEQ2xhc3NDb3VudCA9IDhcclxuXHJcbmNvbnN0IHVucGFja1N0ZWxsYXJDbGFzcyA9IChzdDogbnVtYmVyKTogYW55ID0+IHtcclxuICBsZXQgc3RhclR5cGUgPSBzdCA+PiAxMlxyXG4gIGxldCBzcGVjQ2xhc3NcclxuICBsZXQgc3ViQ2xhc3NcclxuICBsZXQgbHVtQ2xhc3NcclxuXHJcbiAgc3dpdGNoIChzdGFyVHlwZSkge1xyXG4gICAgY2FzZSBTdGFyVHlwZS5Ob3JtYWxTdGFyIDpcclxuICAgICAgc3BlY0NsYXNzID0gc3QgPj4gOCAmIDB4ZlxyXG4gICAgICBzdWJDbGFzcyA9IHN0ID4+IDQgJiAweGZcclxuICAgICAgbHVtQ2xhc3MgPSBzdCAmIDB4ZlxyXG4gICAgICBicmVha1xyXG4gICAgY2FzZSBTdGFyVHlwZS5XaGl0ZUR3YXJmOlxyXG4gICAgICBpZiAoKHN0ID4+IDggJiAweGYpID49IFdEQ2xhc3NDb3VudCkge1xyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgIH1cclxuICAgICAgc3BlY0NsYXNzID0gKHN0ID4+IDggJiAweGYpICsgU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9EQVxyXG4gICAgICBzdWJDbGFzcyA9IHN0ID4+IDQgJiAweGZcclxuICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX1Vua25vd25cclxuICAgICAgYnJlYWtcclxuICAgIGNhc2UgU3RhclR5cGUuTmV1dHJvblN0YXI6XHJcbiAgICBjYXNlIFN0YXJUeXBlLkJsYWNrSG9sZTpcclxuICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9Vbmtub3duXHJcbiAgICAgIHN1YkNsYXNzID0gU3ViQ2xhc3NVbmtub3duXHJcbiAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9Vbmtub3duXHJcbiAgICAgIGJyZWFrXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXJUeXBlLFxyXG4gICAgc3BlY0NsYXNzLFxyXG4gICAgc3ViQ2xhc3MsXHJcbiAgICBsdW1DbGFzc1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgZGVjb2RlU3BlY3RyYWxDbGFzcyA9IChzdDogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICBsZXQgc3RlbGxhckNsYXNzID0gdW5wYWNrU3RlbGxhckNsYXNzKHN0KVxyXG4gIGxldCBzcGVjQ2xhc3NcclxuICBsZXQgc3ViQ2xhc3NcclxuICBsZXQgbHVtQ2xhc3NcclxuXHJcbiAgaWYgKHN0ZWxsYXJDbGFzcy5zdGFyVHlwZSA9PT0gU3RhclR5cGUuV2hpdGVEd2FyZikge1xyXG4gICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzc1N0cltzdGVsbGFyQ2xhc3Muc3BlY0NsYXNzXVxyXG4gICAgc3ViQ2xhc3MgPSAnMDEyMzQ1Njc4OSdbc3RlbGxhckNsYXNzLnN1YkNsYXNzXSB8fCAnJ1xyXG4gICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3NTdHJbc3RlbGxhckNsYXNzLmx1bUNsYXNzXVxyXG4gIH0gZWxzZSBpZiAoc3RlbGxhckNsYXNzLnN0YXJUeXBlID09PSBTdGFyVHlwZS5OZXV0cm9uU3Rhcikge1xyXG4gICAgc3BlY0NsYXNzID0gJ1EnXHJcbiAgfSBlbHNlIGlmIChzdGVsbGFyQ2xhc3Muc3RhclR5cGUgPT09IFN0YXJUeXBlLkJsYWNrSG9sZSkge1xyXG4gICAgc3BlY0NsYXNzID0gJ1gnXHJcbiAgICBzdWJDbGFzcyA9ICcnXHJcbiAgICBsdW1DbGFzcyA9ICcnXHJcbiAgfSBlbHNlIGlmIChzdGVsbGFyQ2xhc3Muc3RhclR5cGUgPT09IFN0YXJUeXBlLk5vcm1hbFN0YXIpIHtcclxuICAgIHNwZWNDbGFzcyA9ICdPQkFGR0tNUlNOV1c/TFRDJ1tzdGVsbGFyQ2xhc3Muc3BlY0NsYXNzXSB8fCAnJ1xyXG4gICAgc3ViQ2xhc3MgPSAnMDEyMzQ1Njc4OSdbc3RlbGxhckNsYXNzLnN1YkNsYXNzXSB8fCAnJ1xyXG4gICAgbHVtQ2xhc3MgPSBMdW1TdHJDbGFzc2VzW3N0ZWxsYXJDbGFzcy5sdW1DbGFzc10gfHwgJydcclxuICB9IGVsc2Uge1xyXG4gICAgc3BlY0NsYXNzID0gJz8nXHJcbiAgfVxyXG5cclxuICByZXR1cm4gYCR7c3BlY0NsYXNzfSR7c3ViQ2xhc3N9JHtsdW1DbGFzc31gXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlY29kZVNwZWN0cmFsQ2xhc3NcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2RlY29kZVNwZWN0cmFsQ2xhc3MudHMiLCJlbnVtIFVua25vd24ge1xyXG4gIFN1YmNsYXNzX1Vua25vd24gPSAxMFxyXG59XHJcblxyXG5lbnVtIFBhcnNlU3RhdGUge1xyXG4gIEJlZ2luU3RhdGUsXHJcbiAgRW5kU3RhdGUsXHJcbiAgTm9ybWFsU3RhclN0YXRlLFxyXG4gIFdvbGZSYXlldFR5cGVTdGF0ZSxcclxuICBOb3JtYWxTdGFyQ2xhc3NTdGF0ZSxcclxuICBOb3JtYWxTdGFyU3ViY2xhc3NTdGF0ZSxcclxuICBOb3JtYWxTdGFyU3ViY2xhc3NEZWNpbWFsU3RhdGUsXHJcbiAgTm9ybWFsU3RhclN1YmNsYXNzRmluYWxTdGF0ZSxcclxuICBMdW1DbGFzc0JlZ2luU3RhdGUsXHJcbiAgTHVtQ2xhc3NJU3RhdGUsXHJcbiAgTHVtQ2xhc3NJSVN0YXRlLFxyXG4gIEx1bUNsYXNzVlN0YXRlLFxyXG4gIEx1bUNsYXNzSWRhc2hTdGF0ZSxcclxuICBMdW1DbGFzc0lhU3RhdGUsXHJcbiAgV0RUeXBlU3RhdGUsXHJcbiAgV0RFeHRlbmRlZFR5cGVTdGF0ZSxcclxuICBXRFN1YmNsYXNzU3RhdGUsXHJcbiAgU3ViZHdhcmZQcmVmaXhTdGF0ZSxcclxufVxyXG5cclxuZW51bSBTdGFyVHlwZSB7XHJcbiAgTm9ybWFsU3RhcixcclxuICBXaGl0ZUR3YXJmLFxyXG4gIE5ldXRyb25TdGFyLFxyXG4gIEJsYWNrSG9sZSxcclxufVxyXG5cclxuZW51bSBTcGVjdHJhbENsYXNzIHtcclxuICBTcGVjdHJhbF9PLFxyXG4gIFNwZWN0cmFsX0IsXHJcbiAgU3BlY3RyYWxfQSxcclxuICBTcGVjdHJhbF9GLFxyXG4gIFNwZWN0cmFsX0csXHJcbiAgU3BlY3RyYWxfSyxcclxuICBTcGVjdHJhbF9NLFxyXG4gIFNwZWN0cmFsX1IsXHJcbiAgU3BlY3RyYWxfUyxcclxuICBTcGVjdHJhbF9OLFxyXG4gIFNwZWN0cmFsX1dDLFxyXG4gIFNwZWN0cmFsX1dOLFxyXG4gIFNwZWN0cmFsX1Vua25vd24sXHJcbiAgU3BlY3RyYWxfTCxcclxuICBTcGVjdHJhbF9ULFxyXG4gIFNwZWN0cmFsX0MsXHJcbiAgU3BlY3RyYWxfREEsXHJcbiAgU3BlY3RyYWxfREIsXHJcbiAgU3BlY3RyYWxfREMsXHJcbiAgU3BlY3RyYWxfRE8sXHJcbiAgU3BlY3RyYWxfRFEsXHJcbiAgU3BlY3RyYWxfRFosXHJcbiAgU3BlY3RyYWxfRCxcclxuICBTcGVjdHJhbF9EWCxcclxuICBTcGVjdHJhbF9Db3VudCxcclxufVxyXG5cclxuZW51bSBMdW1pbm9zaXR5Q2xhc3Mge1xyXG4gIEx1bV9JYTAsXHJcbiAgTHVtX0lhLFxyXG4gIEx1bV9JYixcclxuICBMdW1fSUksXHJcbiAgTHVtX0lJSSxcclxuICBMdW1fSVYsXHJcbiAgTHVtX1YsXHJcbiAgTHVtX1ZJLFxyXG4gIEx1bV9Vbmtub3duLFxyXG4gIEx1bV9Db3VudFxyXG59XHJcblxyXG5jb25zdCBMdW1TdHJDbGFzc2VzID0gW1xyXG4gICdJLWEwJyxcclxuICAnSS1hJyxcclxuICAnSS1iJyxcclxuICAnSUknLFxyXG4gICdJSUknLFxyXG4gICdJVicsXHJcbiAgJ1YnLFxyXG4gICdWSSdcclxuXVxyXG5cclxuY29uc3QgU3ViQ2xhc3NVbmtub3duID0gMTBcclxuY29uc3QgV0RDbGFzc0NvdW50ID0gOFxyXG5cclxuZnVuY3Rpb24gZW5jb2RlU3BlY3RyYWxDbGFzcyAoc3Q6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgbGV0IGkgPSAwXHJcbiAgbGV0IHN0YXRlID0gUGFyc2VTdGF0ZS5CZWdpblN0YXRlXHJcbiAgbGV0IHN0YXJUeXBlID0gU3RhclR5cGUuTm9ybWFsU3RhclxyXG4gIGxldCBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX1Vua25vd25cclxuICBsZXQgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX1Vua25vd25cclxuICBsZXQgc3ViQ2xhc3MgPSBVbmtub3duLlN1YmNsYXNzX1Vua25vd25cclxuXHJcbiAgd2hpbGUgKHN0YXRlICE9PSBQYXJzZVN0YXRlLkVuZFN0YXRlKSB7XHJcbiAgICBsZXQgYyA9IGkgPCBzdC5sZW5ndGhcclxuICAgICAgPyBzdC5jaGFyQXQoaSlcclxuICAgICAgOiBudWxsXHJcblxyXG4gICAgc3dpdGNoIChzdGF0ZSkge1xyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuQmVnaW5TdGF0ZTpcclxuICAgICAgICBzd2l0Y2ggKGMpIHtcclxuICAgICAgICAgIGNhc2UgJ1EnOlxyXG4gICAgICAgICAgICBzdGFyVHlwZSA9IFN0YXJUeXBlLk5ldXRyb25TdGFyXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ1gnOlxyXG4gICAgICAgICAgICBzdGFyVHlwZSA9IFN0YXJUeXBlLkJsYWNrSG9sZVxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdEJzpcclxuICAgICAgICAgICAgc3RhclR5cGUgPSBTdGFyVHlwZS5XaGl0ZUR3YXJmXHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfRFxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuV0RUeXBlU3RhdGVcclxuICAgICAgICAgICAgKytpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAncyc6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5TdWJkd2FyZlByZWZpeFN0YXRlXHJcbiAgICAgICAgICAgICsraVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJz8nOlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhckNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5Xb2xmUmF5ZXRUeXBlU3RhdGU6XHJcbiAgICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgICBjYXNlICdDJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9XQ1xyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgKytpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnTic6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfV05cclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgICsraVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfV0NcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuU3ViZHdhcmZQcmVmaXhTdGF0ZTpcclxuICAgICAgICBpZiAoYyA9PT0gJ2QnKSB7XHJcbiAgICAgICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fVklcclxuICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyQ2xhc3NTdGF0ZVxyXG4gICAgICAgICAgKytpXHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyQ2xhc3NTdGF0ZTpcclxuICAgICAgICBzd2l0Y2ggKGMpIHtcclxuICAgICAgICAgIGNhc2UgJ1cnOlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuV29sZlJheWV0VHlwZVN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnTyc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfT1xyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdCJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9CXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ0EnOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0FcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnRic6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfRlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdHJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9HXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ0snOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0tcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnTSc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfTVxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdSJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9SXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ1MnOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX1NcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnTic6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfTlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdMJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9MXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ1QnOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX1RcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnQyc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfQ1xyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgKytpXHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZTpcclxuICAgICAgICBpZiAoYyAhPT0gbnVsbCAmJiBjLm1hdGNoKC9bMC05XS8pKSB7XHJcbiAgICAgICAgICBzdWJDbGFzcyA9IHBhcnNlSW50KGMpXHJcbiAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzRGVjaW1hbFN0YXRlXHJcbiAgICAgICAgICArK2lcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkx1bUNsYXNzQmVnaW5TdGF0ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc0RlY2ltYWxTdGF0ZTpcclxuICAgICAgICBpZiAoYyA9PT0gJy4nKSB7XHJcbiAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzRmluYWxTdGF0ZVxyXG4gICAgICAgICAgKytpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5MdW1DbGFzc0JlZ2luU3RhdGVcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NGaW5hbFN0YXRlOlxyXG4gICAgICAgIGlmIChjLm1hdGNoKC9bMC05XS8pKSB7XHJcbiAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTHVtQ2xhc3NCZWdpblN0YXRlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgIH1cclxuICAgICAgICArK2lcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLkx1bUNsYXNzQmVnaW5TdGF0ZTpcclxuICAgICAgICBzd2l0Y2ggKGMpIHtcclxuICAgICAgICAgIGNhc2UgJ0knOlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTHVtQ2xhc3NJU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdWJzpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkx1bUNsYXNzVlN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgICsraVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuTHVtQ2xhc3NJU3RhdGU6XHJcbiAgICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgICBjYXNlICdJJzpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkx1bUNsYXNzSUlTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ1YnOlxyXG4gICAgICAgICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fSVZcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnYSc6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5MdW1DbGFzc0lhU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdiJzpcclxuICAgICAgICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX0liXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJy0nOlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTHVtQ2xhc3NJZGFzaFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX0liXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICBpKytcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLkx1bUNsYXNzSUlTdGF0ZTpcclxuICAgICAgICBzd2l0Y2ggKGMpIHtcclxuICAgICAgICAgIGNhc2UgJ0knOlxyXG4gICAgICAgICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fSUlJXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9JSVxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5MdW1DbGFzc0lkYXNoU3RhdGU6XHJcbiAgICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgICBjYXNlICdhJzpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkx1bUNsYXNzSWFTdGF0ZVxyXG4gICAgICAgICAgICArK2lcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdiJzpcclxuICAgICAgICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX0liXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9JYlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5MdW1DbGFzc0lhU3RhdGU6XHJcbiAgICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgICBjYXNlICcwJzpcclxuICAgICAgICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX0lhMFxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fSWFcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuTHVtQ2xhc3NWU3RhdGU6XHJcbiAgICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgICBjYXNlICdJJzpcclxuICAgICAgICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX1ZJXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9WXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLldEVHlwZVN0YXRlOlxyXG4gICAgICAgIHN3aXRjaCAoYykge1xyXG4gICAgICAgICAgY2FzZSAnQSc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfREFcclxuICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnQic6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfREJcclxuICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnQyc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfRENcclxuICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnTyc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfRE9cclxuICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnUSc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfRFFcclxuICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnWCc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfRFhcclxuICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnWic6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfRFpcclxuICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9EXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5XREV4dGVuZGVkVHlwZVN0YXRlXHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5XREV4dGVuZGVkVHlwZVN0YXRlOlxyXG4gICAgICAgIHN3aXRjaCAoYykge1xyXG4gICAgICAgICAgY2FzZSAnQSc6XHJcbiAgICAgICAgICBjYXNlICdCJzpcclxuICAgICAgICAgIGNhc2UgJ0MnOlxyXG4gICAgICAgICAgY2FzZSAnTyc6XHJcbiAgICAgICAgICBjYXNlICdRJzpcclxuICAgICAgICAgIGNhc2UgJ1onOlxyXG4gICAgICAgICAgY2FzZSAnWCc6XHJcbiAgICAgICAgICBjYXNlICdWJzpcclxuICAgICAgICAgIGNhc2UgJ1AnOlxyXG4gICAgICAgICAgY2FzZSAnSCc6XHJcbiAgICAgICAgICBjYXNlICdFJzpcclxuICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLldEU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLldEU3ViY2xhc3NTdGF0ZTpcclxuICAgICAgICBpZiAoYyAhPT0gbnVsbCAmJiBjLm1hdGNoKC9bMC05XS8pKSB7XHJcbiAgICAgICAgICBzdWJDbGFzcyA9IHBhcnNlSW50KGMpXHJcbiAgICAgICAgICBpKytcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3ViQ2xhc3MgPSBVbmtub3duLlN1YmNsYXNzX1Vua25vd25cclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgYnJlYWtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxldCBidWZmZXIgPSAwXHJcblxyXG4gIGJ1ZmZlciArPSAoc3RhclR5cGUgJiAweGYpIDw8IDEyXHJcbiAgYnVmZmVyICs9IChzcGVjQ2xhc3MgJiAweGYpIDw8IDhcclxuICBidWZmZXIgKz0gKHN1YkNsYXNzICYgMHhmKSA8PCA0XHJcbiAgYnVmZmVyICs9IChsdW1DbGFzcyAmIDB4ZilcclxuXHJcbiAgcmV0dXJuIGJ1ZmZlclxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBlbmNvZGVTcGVjdHJhbENsYXNzXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9lbmNvZGVTcGVjdHJhbENsYXNzLnRzIiwiaW1wb3J0IEFic3RyYWN0V3JpdGVyIGZyb20gJy4vQWJzdHJhY3RXcml0ZXInXHJcbmltcG9ydCBDb25maWdXcml0ZXIgZnJvbSAnLi9Db25maWdXcml0ZXInXHJcbmltcG9ydCBTVENXcml0ZXIgZnJvbSAnLi9TVENXcml0ZXInXHJcbmltcG9ydCBTU0NXcml0ZXIgZnJvbSAnLi9TU0NXcml0ZXInXHJcbmltcG9ydCBEU0NXcml0ZXIgZnJvbSAnLi9EU0NXcml0ZXInXHJcbmltcG9ydCBDRkdXcml0ZXIgZnJvbSAnLi9DRkdXcml0ZXInXHJcbmltcG9ydCBEQVRXcml0ZXIgZnJvbSAnLi9EQVRXcml0ZXInXHJcblxyXG5leHBvcnQge1xyXG4gIEFic3RyYWN0V3JpdGVyLFxyXG4gIENvbmZpZ1dyaXRlcixcclxuICBTVENXcml0ZXIsXHJcbiAgU1NDV3JpdGVyLFxyXG4gIERTQ1dyaXRlcixcclxuICBDRkdXcml0ZXIsXHJcbiAgREFUV3JpdGVyXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1dyaXRlci9pbmRleC50cyIsImltcG9ydCBpc09iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNPYmplY3QnXHJcbmltcG9ydCBpc0FycmF5IGZyb20gJ2xvZGFzaC1lcy9pc0FycmF5J1xyXG5pbXBvcnQgaXNOdW1iZXIgZnJvbSAnbG9kYXNoLWVzL2lzTnVtYmVyJ1xyXG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnbG9kYXNoLWVzL2lzU3RyaW5nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VyaWFsaXplciB7XHJcbiAgc3RhdGljIHN0cmluZ2lmeSAodmFsdWU6IGFueSwgaW5kZW50ID0gMCk6IHN0cmluZyB7XHJcbiAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybiBTZXJpYWxpemVyLndyaXRlQXJyYXkodmFsdWUsIGluZGVudClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gU2VyaWFsaXplci53cml0ZU9iamVjdCh2YWx1ZSwgaW5kZW50KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6ZXIud3JpdGVOdW1iZXIodmFsdWUpXHJcbiAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6ZXIud3JpdGVTdHJpbmcodmFsdWUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHdyaXRlQXJyYXkgKGFycmF5OiBhbnlbXSwgaW5kZW50OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICdbICcgKyBhcnJheS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIFNlcmlhbGl6ZXIuc3RyaW5naWZ5KGl0ZW0sIGluZGVudCArIDIpXHJcbiAgICB9KS5qb2luKCcgJykgKyAnIF0nXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgd3JpdGVPYmplY3QgKHZhbHVlOiBPYmplY3QsIGluZGVudDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGlmIChPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiAneyB9J1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3Qua2V5cyh2YWx1ZSlcclxuICAgICAgLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6ZXIud3JpdGVGaWVsZChrZXksIFNlcmlhbGl6ZXIuc3RyaW5naWZ5KHZhbHVlW2tleV0sIGluZGVudCArIDIpLCBpbmRlbnQgKyAyKVxyXG4gICAgICB9KVxyXG4gICAgICAuam9pbignXFxuJylcclxuXHJcbiAgICByZXR1cm4gJ3tcXG4nICsgZW50cmllcyArICdcXG4nICsgJyAnLnJlcGVhdChpbmRlbnQpICsgJ30nXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgd3JpdGVTdHJpbmcgKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICdcIicgKyB2YWx1ZSArICdcIidcclxuICB9XHJcblxyXG4gIHN0YXRpYyB3cml0ZU51bWJlciAodmFsdWU6IG51bWJlciwgcHJlY2lzaW9uID0gNik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU3RyaW5nKE1hdGguZmxvb3IodmFsdWUgKiAxMCAqKiBwcmVjaXNpb24pIC8gMTAgKiogcHJlY2lzaW9uKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHdyaXRlRmllbGQgKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBpbmRlbnQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gJyAnLnJlcGVhdChpbmRlbnQpICsga2V5ICsgJyAnICsgdmFsdWVcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NlcmlhbGl6ZXIvU2VyaWFsaXplci50cyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgTnVtYmVyYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqICoqTm90ZToqKiBUbyBleGNsdWRlIGBJbmZpbml0eWAsIGAtSW5maW5pdHlgLCBhbmQgYE5hTmAsIHdoaWNoIGFyZVxuICogY2xhc3NpZmllZCBhcyBudW1iZXJzLCB1c2UgdGhlIGBfLmlzRmluaXRlYCBtZXRob2QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBudW1iZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc051bWJlcigzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOdW1iZXIoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBudW1iZXJUYWcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc051bWJlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc051bWJlci5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX29iamVjdFRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3RyaW5nYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3RyaW5nLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTdHJpbmcoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTdHJpbmcoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8XG4gICAgKCFpc0FycmF5KHZhbHVlKSAmJiBpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN0cmluZ1RhZyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzU3RyaW5nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzU3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgVGV4dFdyaXRlciBmcm9tICcuL1RleHRXcml0ZXInXHJcbmltcG9ydCB7IFNlcmlhbGl6ZXIgfSBmcm9tICcuLi9TZXJpYWxpemVyJ1xyXG5cclxuY2xhc3MgU1RDV3JpdGVyIGV4dGVuZHMgVGV4dFdyaXRlciB7XHJcbiAgd3JpdGVIZWFkZXIgKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbW9kZSA9ICh2YWx1ZS5tb2RlICE9PSBudWxsICYmIHZhbHVlLm1vZGVTZXQpID8gdmFsdWUubW9kZSA6ICcnXHJcbiAgICBjb25zdCB0eXBlID0gKHZhbHVlLnR5cGUgIT09IG51bGwgJiYgdmFsdWUudHlwZVNldCkgPyB2YWx1ZS50eXBlIDogJydcclxuICAgIGNvbnN0IEhJUCA9IHZhbHVlLm51bWJlciAhPT0gbnVsbCA/IHZhbHVlLm51bWJlciA6ICcnXHJcbiAgICBjb25zdCBuYW1lcyA9ICh2YWx1ZS5uYW1lcyAhPT0gbnVsbCAmJiB2YWx1ZS5uYW1lU2V0KSA/IFNlcmlhbGl6ZXIud3JpdGVTdHJpbmcodmFsdWUubmFtZXMuam9pbignOicpKSA6ICcnXHJcbiAgICByZXR1cm4gW21vZGUsIHR5cGUsIEhJUCwgbmFtZXNdLmpvaW4oJyAnKS50cmltKClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNUQ1dyaXRlclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvV3JpdGVyL1NUQ1dyaXRlci50cyIsImltcG9ydCBUZXh0V3JpdGVyIGZyb20gJy4vVGV4dFdyaXRlcidcclxuaW1wb3J0IHsgU2VyaWFsaXplciB9IGZyb20gJy4uL1NlcmlhbGl6ZXInXHJcblxyXG5jbGFzcyBTU0NXcml0ZXIgZXh0ZW5kcyBUZXh0V3JpdGVyIHtcclxuICB3cml0ZUhlYWRlciAodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBtb2RlID0gKHZhbHVlLm1vZGUgIT09IG51bGwgJiYgdmFsdWUubW9kZVNldCkgPyB2YWx1ZS5tb2RlIDogJydcclxuICAgIGNvbnN0IHR5cGUgPSAodmFsdWUudHlwZSAhPT0gbnVsbCAmJiB2YWx1ZS50eXBlU2V0KSA/IHZhbHVlLnR5cGUgOiAnJ1xyXG4gICAgY29uc3QgbmFtZXMgPSB2YWx1ZS5uYW1lcyAhPT0gbnVsbCA/IFNlcmlhbGl6ZXIud3JpdGVTdHJpbmcodmFsdWUubmFtZXMuam9pbignOicpKSA6ICcnXHJcbiAgICBjb25zdCBwYXJlbnROYW1lID0gdmFsdWUucGF0aFRvUGFyZW50ICE9PSBudWxsID8gU2VyaWFsaXplci53cml0ZVN0cmluZyh2YWx1ZS5wYXRoVG9QYXJlbnQuam9pbignLycpKSA6ICcnXHJcbiAgICByZXR1cm4gW21vZGUsIHR5cGUsIG5hbWVzLCBwYXJlbnROYW1lXS5qb2luKCcgJykudHJpbSgpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTU0NXcml0ZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1dyaXRlci9TU0NXcml0ZXIudHMiLCJpbXBvcnQgVGV4dFdyaXRlciBmcm9tICcuL1RleHRXcml0ZXInXHJcbmltcG9ydCB7IFNlcmlhbGl6ZXIgfSBmcm9tICcuLi9TZXJpYWxpemVyJ1xyXG5cclxuY2xhc3MgRFNDV3JpdGVyIGV4dGVuZHMgVGV4dFdyaXRlciB7XHJcbiAgd3JpdGVIZWFkZXIgKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgY2F0YWxvZ051bWJlciA9IHZhbHVlLm51bWJlciAhPT0gbnVsbCA/IFN0cmluZyh2YWx1ZS5udW1iZXIpIDogJydcclxuICAgIGNvbnN0IHR5cGUgPSB2YWx1ZS50eXBlICE9PSBudWxsID8gdmFsdWUudHlwZSA6ICcnXHJcbiAgICBjb25zdCBuYW1lID0gdmFsdWUubmFtZXMgIT09IG51bGwgPyBTZXJpYWxpemVyLndyaXRlU3RyaW5nKHZhbHVlLm5hbWVzLmpvaW4oJzonKSkgOiAnJ1xyXG4gICAgcmV0dXJuIFtjYXRhbG9nTnVtYmVyLCB0eXBlLCBuYW1lXS5qb2luKCcgJylcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERTQ1dyaXRlclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvV3JpdGVyL0RTQ1dyaXRlci50cyIsImltcG9ydCBDb25maWdXcml0ZXIgZnJvbSAnLi9Db25maWdXcml0ZXInXHJcblxyXG5jbGFzcyBEU0NXcml0ZXIgZXh0ZW5kcyBDb25maWdXcml0ZXIge1xyXG4gIHdyaXRlSGVhZGVyICh2YWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgIHJldHVybiAnJ1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRFNDV3JpdGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Xcml0ZXIvQ0ZHV3JpdGVyLnRzIiwiaW1wb3J0IEJpbmFyeVdyaXRlciBmcm9tICcuL0JpbmFyeVdyaXRlcidcclxuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi91dGlscy9Db25zdGFudHMnXHJcbmltcG9ydCB7IGVuY29kZVNwZWN0cmFsQ2xhc3MgfSBmcm9tICcuLi91dGlscydcclxuXHJcbmNsYXNzIERBVFdyaXRlciBleHRlbmRzIEJpbmFyeVdyaXRlciB7XHJcbiAgcHJvY2VzcyAoaXRlbXM6IGFueVtdKTogQnVmZmVyIHtcclxuICAgIGNvbnN0IGhlYWRlciA9IENvbnN0YW50cy5GSUxFX0hFQURFUlxyXG4gICAgY29uc3QgdmVyc2lvbiA9IENvbnN0YW50cy5WRVJTSU9OICAgLy8gMiBieXRlc1xyXG4gICAgY29uc3QgaXRlbXNDb3VudCA9IGl0ZW1zLmxlbmd0aCAgICAgLy8gNCBieXRlc1xyXG4gICAgY29uc3QgaGVhZGVyT2Zmc2V0ID0gaGVhZGVyLmxlbmd0aCArIDZcclxuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5hbGxvYyhoZWFkZXJPZmZzZXQgKyBpdGVtc0NvdW50ICogMjApXHJcbiAgICBidWZmZXIud3JpdGUoaGVhZGVyLCAwKVxyXG4gICAgYnVmZmVyLndyaXRlVUludDE2TEUodmVyc2lvbiwgQ29uc3RhbnRzLkZJTEVfSEVBREVSLmxlbmd0aClcclxuICAgIGJ1ZmZlci53cml0ZVVJbnQzMkxFKGl0ZW1zQ291bnQsIENvbnN0YW50cy5GSUxFX0hFQURFUi5sZW5ndGggKyAyKVxyXG5cclxuICAgIGxldCBvZmZzZXQgPSBoZWFkZXJPZmZzZXRcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zQ291bnQ7ICsraSkge1xyXG4gICAgICBidWZmZXIud3JpdGVVSW50MzJMRShpdGVtc1tpXS5tZXRhLm51bWJlciwgb2Zmc2V0LCB0cnVlKVxyXG4gICAgICBidWZmZXIud3JpdGVGbG9hdExFKGl0ZW1zW2ldLnByb3BlcnRpZXMuRGlzdGFuY2UsIG9mZnNldCArIDQsIHRydWUpXHJcbiAgICAgIGJ1ZmZlci53cml0ZUZsb2F0TEUoaXRlbXNbaV0ucHJvcGVydGllcy5SQSwgb2Zmc2V0ICsgOCwgdHJ1ZSlcclxuICAgICAgYnVmZmVyLndyaXRlRmxvYXRMRShpdGVtc1tpXS5wcm9wZXJ0aWVzLkRlYywgb2Zmc2V0ICsgMTIsIHRydWUpXHJcbiAgICAgIGJ1ZmZlci53cml0ZUludDE2TEUoaXRlbXNbaV0ucHJvcGVydGllcy5BYnNNYWcsIG9mZnNldCArIDE2LCB0cnVlKVxyXG4gICAgICBidWZmZXIud3JpdGVVSW50MTZMRShlbmNvZGVTcGVjdHJhbENsYXNzKGl0ZW1zW2ldLnByb3BlcnRpZXMuU3BlY3RyYWxUeXBlKSwgb2Zmc2V0ICsgMTgsIHRydWUpXHJcbiAgICAgIG9mZnNldCArPSAyMFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJ1ZmZlclxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgREFUV3JpdGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Xcml0ZXIvREFUV3JpdGVyLnRzIiwiaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnXHJcbmltcG9ydCBBYnN0cmFjdFdyaXRlciBmcm9tICcuL0Fic3RyYWN0V3JpdGVyJ1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmluYXJ5V3JpdGVyIGltcGxlbWVudHMgQWJzdHJhY3RXcml0ZXIge1xyXG4gIGRlZmF1bHRXcml0ZU1vZGUgPSB7XHJcbiAgICBtb2RlOiAwbzY0NCxcclxuICAgIGZsYWc6ICd3KydcclxuICB9XHJcblxyXG4gIHdyaXRlIChmdWxsUGF0aDogc3RyaW5nLCBpdGVtczogYW55W10sIG9wdGlvbnMgPSB0aGlzLmRlZmF1bHRXcml0ZU1vZGUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGZzLndyaXRlRmlsZShmdWxsUGF0aCwgdGhpcy5wcm9jZXNzKGl0ZW1zKSwgb3B0aW9ucywgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGFic3RyYWN0IHByb2Nlc3MgKGl0ZW1zOiBhbnlbXSk6IEJ1ZmZlclxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCaW5hcnlXcml0ZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1dyaXRlci9CaW5hcnlXcml0ZXIudHMiLCJpbXBvcnQgKiBhcyBDRkdHcmFtbWFyIGZyb20gJy4vY2ZncGFyc2VyLm5lJ1xyXG5pbXBvcnQgKiBhcyBEU0NHcmFtbWFyIGZyb20gJy4vZHNjcGFyc2VyLm5lJ1xyXG5pbXBvcnQgKiBhcyBTU0NHcmFtbWFyIGZyb20gJy4vc3NjcGFyc2VyLm5lJ1xyXG5pbXBvcnQgKiBhcyBTVENHcmFtbWFyIGZyb20gJy4vc3RjcGFyc2VyLm5lJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIENGR0dyYW1tYXIsXHJcbiAgRFNDR3JhbW1hcixcclxuICBTU0NHcmFtbWFyLFxyXG4gIFNUQ0dyYW1tYXJcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ3JhbW1hci9pbmRleC50cyIsIi8vIEdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IG5lYXJsZXlcbi8vIGh0dHA6Ly9naXRodWIuY29tL0hhcmRtYXRoMTIzL25lYXJsZXlcbihmdW5jdGlvbiAoKSB7XG5mdW5jdGlvbiBpZCh4KSB7cmV0dXJuIHhbMF07IH1cblxyXG4gIGNvbnN0IGZyb21QYWlycyA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgcmV0dXJuIGlucHV0LnJlZHVjZSgoYWNjLCBpKSA9PiB7XHJcbiAgICAgICAgYWNjW2lbMF1dID0gaVsxXVxyXG4gICAgICAgIHJldHVybiBhY2NcclxuICAgIH0sIHt9KVxyXG4gIH1cclxuICBjb25zdCBtb28gPSByZXF1aXJlKCdtb28nKVxyXG5cclxuICBjb25zdCBudWxsZXIgPSB4ID0+IG51bGxcclxuXHJcbiAgY29uc3QgbGV4ZXIgPSBtb28uY29tcGlsZSh7XHJcbiAgICBDT05GSUdfS0VZV09SRDogL0NvbmZpZ3VyYXRpb25cXGIvLFxyXG5cclxuICAgIEFERF9NT0RFOiAvQWRkXFxiLyxcclxuICAgIE1PRElGWV9NT0RFOiAvTW9kaWZ5XFxiLyxcclxuICAgIFJFUExBQ0VfTU9ERTogL1JlcGxhY2VcXGIvLFxyXG5cclxuICAgIFNTQ19CT0RZX1RZUEU6IC9Cb2R5XFxiLyxcclxuICAgIFNTQ19SRUZfUE9JTlRfVFlQRTogL1JlZmVyZW5jZVBvaW50XFxiLyxcclxuICAgIFNTQ19TVVJGX1BPSU5UX1RZUEU6IC9TdXJmYWNlUG9pbnRcXGIvLFxyXG4gICAgU1NDX0FMVF9TVVJGQUNFOiAvQWx0U3VyZmFjZVxcYi8sXHJcbiAgICBTU0NfTE9DQVRJT046IC9Mb2NhdGlvblxcYi8sXHJcblxyXG4gICAgU1RDX1NUQVJfVFlQRTogL1N0YXJcXGIvLFxyXG4gICAgU1RDX0JBUllDRU5URVJfVFlQRTogL0JhcnljZW50ZXJcXGIvLFxyXG5cclxuICAgIERTQ19HQUxBWFlfVFlQRTogL0dhbGF4eVxcYi8sXHJcbiAgICBEU0NfR0xPQlVMQVJfVFlQRTogL0dsb2J1bGFyXFxiLyxcclxuICAgIERTQ19ORUJVTEFfVFlQRTogL05lYnVsYVxcYi8sXHJcbiAgICBEU0NfT1BFTl9DTFVTVEVSX1RZUEU6IC9PcGVuQ2x1c3RlclxcYi8sXHJcblxyXG4gICAgVFJVRTogL3RydWUvLFxyXG4gICAgRkFMU0U6IC9mYWxzZS8sXHJcblxyXG4gICAgTlVNQkVSOiAvWystXT9bMC05XSsoPzpcXC5bMC05XSspPyg/OltlRV1bKy1dWzAtOV0rKT8vLFxyXG4gICAgV09SRDogL1tcXHddK1xcYi8sXHJcbiAgICBTVFJJTkc6IC9cIig/OlxcXFxbI1wiXFxcXF18W15cXG5cIlxcXFxdKSpcIi8sXHJcbiAgICBCUkFDRV9MOiAneycsXHJcbiAgICBCUkFDRV9SOiAnfScsXHJcbiAgICBTUVVfQlJBX0w6ICdbJyxcclxuICAgIFNRVV9CUkFfUjogJ10nLFxyXG4gICAgV1M6IHtcclxuICAgICAgbWF0Y2g6IC9bXFxzXSsvLFxyXG4gICAgICBsaW5lQnJlYWtzOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgQ09NTUVOVDoge1xyXG4gICAgICBtYXRjaDogLyMuKj9cXHJcXG4vLFxyXG4gICAgICBsaW5lQnJlYWtzOiB0cnVlXHJcbiAgICB9XHJcbiAgfSlcclxudmFyIGdyYW1tYXIgPSB7XG4gICAgTGV4ZXI6IGxleGVyLFxuICAgIFBhcnNlclJ1bGVzOiBbXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJCT09MRUFOXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIk5VTUJFUlwiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJTVFJJTkdcIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBcIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiQVJSQVlcIl19LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUCRlYm5mJDFcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVAkZWJuZiQyXCIsIFwiR1JPVVBfUFJPUEVSVFlcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkJSQUNFX0xcIikgPyB7dHlwZTogXCJCUkFDRV9MXCJ9IDogQlJBQ0VfTCksIFwiR1JPVVAkZWJuZiQxXCIsIFwiR1JPVVAkZWJuZiQyXCIsIChsZXhlci5oYXMoXCJCUkFDRV9SXCIpID8ge3R5cGU6IFwiQlJBQ0VfUlwifSA6IEJSQUNFX1IpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGZyb21QYWlycyhkYXRhWzJdKX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUF9QUk9QRVJUWVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJXT1JEXCIpID8ge3R5cGU6IFwiV09SRFwifSA6IFdPUkQpLCBcIldTXCIsIFwiVkFMVUVcIiwgXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBbIGRhdGFbMF0udmFsdWUsIGRhdGFbMl1bMF0gXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiQVJSQVkkZWJuZiQyXCIsIFwiQVJSQVlfRUxFTUVOVFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiU1FVX0JSQV9MXCIpID8ge3R5cGU6IFwiU1FVX0JSQV9MXCJ9IDogU1FVX0JSQV9MKSwgXCJBUlJBWSRlYm5mJDFcIiwgXCJBUlJBWSRlYm5mJDJcIiwgKGxleGVyLmhhcyhcIlNRVV9CUkFfUlwiKSA/IHt0eXBlOiBcIlNRVV9CUkFfUlwifSA6IFNRVV9CUkFfUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVsyXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlRcIiwgXCJzeW1ib2xzXCI6IFtcIlZBTFVFXCIsIFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiQk9PTEVBTlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJUUlVFXCIpID8ge3R5cGU6IFwiVFJVRVwifSA6IFRSVUUpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUgPT09ICd0cnVlJ30sXG4gICAge1wibmFtZVwiOiBcIkJPT0xFQU5cIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiRkFMU0VcIikgPyB7dHlwZTogXCJGQUxTRVwifSA6IEZBTFNFKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlID09PSAndHJ1ZSd9LFxuICAgIHtcIm5hbWVcIjogXCJXT1JEXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIldPUkRcIikgPyB7dHlwZTogXCJXT1JEXCJ9IDogV09SRCldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIk5VTUJFUlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJOVU1CRVJcIikgPyB7dHlwZTogXCJOVU1CRVJcIn0gOiBOVU1CRVIpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IHBhcnNlRmxvYXQoZGF0YVswXS52YWx1ZSl9LFxuICAgIHtcIm5hbWVcIjogXCJTVFJJTkdcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiU1RSSU5HXCIpID8ge3R5cGU6IFwiU1RSSU5HXCJ9IDogU1RSSU5HKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlLnNwbGl0KCdcIicpWzFdfSxcbiAgICB7XCJuYW1lXCI6IFwiV1NcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiV1NcIikgPyB7dHlwZTogXCJXU1wifSA6IFdTKV0sIFwicG9zdHByb2Nlc3NcIjogbnVsbGVyfSxcbiAgICB7XCJuYW1lXCI6IFwiV1NcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiQ09NTUVOVFwiKSA/IHt0eXBlOiBcIkNPTU1FTlRcIn0gOiBDT01NRU5UKV0sIFwicG9zdHByb2Nlc3NcIjogbnVsbGVyfSxcbiAgICB7XCJuYW1lXCI6IFwiQ09ORklHXCIsIFwic3ltYm9sc1wiOiBbXCJDT05GSUdfS0VZV09SRFwiLCBcIkNPTkZJR19ERVNDUklQVElPTlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW2tleXdvcmQsIHBhcmFtc10pID0+IHBhcmFtc30sXG4gICAge1wibmFtZVwiOiBcIkNPTkZJR19LRVlXT1JEJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJDT05GSUdfS0VZV09SRCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkNPTkZJR19LRVlXT1JEJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJDT05GSUdfS0VZV09SRCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiQ09ORklHX0tFWVdPUkQkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJDT05GSUdfS0VZV09SRCRlYm5mJDJcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQ09ORklHX0tFWVdPUkRcIiwgXCJzeW1ib2xzXCI6IFtcIkNPTkZJR19LRVlXT1JEJGVibmYkMVwiLCAobGV4ZXIuaGFzKFwiQ09ORklHX0tFWVdPUkRcIikgPyB7dHlwZTogXCJDT05GSUdfS0VZV09SRFwifSA6IENPTkZJR19LRVlXT1JEKSwgXCJDT05GSUdfS0VZV09SRCRlYm5mJDJcIl0sIFwicG9zdHByb2Nlc3NcIjogKFtrZXl3b3JkXSkgPT4ga2V5d29yZFswXX0sXG4gICAge1wibmFtZVwiOiBcIkNPTkZJR19ERVNDUklQVElPTiRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiQ09ORklHX0RFU0NSSVBUSU9OJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiQ09ORklHX0RFU0NSSVBUSU9OJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJDT05GSUdfREVTQ1JJUFRJT05cIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQXCIsIFwiQ09ORklHX0RFU0NSSVBUSU9OJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW3Byb3BlcnRpZXNdKSA9PiBwcm9wZXJ0aWVzfVxuXVxuICAsIFBhcnNlclN0YXJ0OiBcIkNPTkZJR1wiXG59XG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICBtb2R1bGUuZXhwb3J0cyA9IGdyYW1tYXI7XG59IGVsc2Uge1xuICAgd2luZG93LmdyYW1tYXIgPSBncmFtbWFyO1xufVxufSkoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2dyYW1tYXIvY2ZncGFyc2VyLm5lXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBHZW5lcmF0ZWQgYXV0b21hdGljYWxseSBieSBuZWFybGV5XG4vLyBodHRwOi8vZ2l0aHViLmNvbS9IYXJkbWF0aDEyMy9uZWFybGV5XG4oZnVuY3Rpb24gKCkge1xuZnVuY3Rpb24gaWQoeCkge3JldHVybiB4WzBdOyB9XG5cclxuICBsZXQgZ2xvYmFsSWQgPSAwXHJcblxuXHJcbiAgY29uc3QgZnJvbVBhaXJzID0gZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICByZXR1cm4gaW5wdXQucmVkdWNlKChhY2MsIGkpID0+IHtcclxuICAgICAgICBhY2NbaVswXV0gPSBpWzFdXHJcbiAgICAgICAgcmV0dXJuIGFjY1xyXG4gICAgfSwge30pXHJcbiAgfVxyXG4gIGNvbnN0IG1vbyA9IHJlcXVpcmUoJ21vbycpXHJcblxyXG4gIGNvbnN0IG51bGxlciA9IHggPT4gbnVsbFxyXG5cclxuICBjb25zdCBsZXhlciA9IG1vby5jb21waWxlKHtcclxuICAgIENPTkZJR19LRVlXT1JEOiAvQ29uZmlndXJhdGlvblxcYi8sXHJcblxyXG4gICAgQUREX01PREU6IC9BZGRcXGIvLFxyXG4gICAgTU9ESUZZX01PREU6IC9Nb2RpZnlcXGIvLFxyXG4gICAgUkVQTEFDRV9NT0RFOiAvUmVwbGFjZVxcYi8sXHJcblxyXG4gICAgU1NDX0JPRFlfVFlQRTogL0JvZHlcXGIvLFxyXG4gICAgU1NDX1JFRl9QT0lOVF9UWVBFOiAvUmVmZXJlbmNlUG9pbnRcXGIvLFxyXG4gICAgU1NDX1NVUkZfUE9JTlRfVFlQRTogL1N1cmZhY2VQb2ludFxcYi8sXHJcbiAgICBTU0NfQUxUX1NVUkZBQ0U6IC9BbHRTdXJmYWNlXFxiLyxcclxuICAgIFNTQ19MT0NBVElPTjogL0xvY2F0aW9uXFxiLyxcclxuXHJcbiAgICBTVENfU1RBUl9UWVBFOiAvU3RhclxcYi8sXHJcbiAgICBTVENfQkFSWUNFTlRFUl9UWVBFOiAvQmFyeWNlbnRlclxcYi8sXHJcblxyXG4gICAgRFNDX0dBTEFYWV9UWVBFOiAvR2FsYXh5XFxiLyxcclxuICAgIERTQ19HTE9CVUxBUl9UWVBFOiAvR2xvYnVsYXJcXGIvLFxyXG4gICAgRFNDX05FQlVMQV9UWVBFOiAvTmVidWxhXFxiLyxcclxuICAgIERTQ19PUEVOX0NMVVNURVJfVFlQRTogL09wZW5DbHVzdGVyXFxiLyxcclxuXHJcbiAgICBUUlVFOiAvdHJ1ZS8sXHJcbiAgICBGQUxTRTogL2ZhbHNlLyxcclxuXHJcbiAgICBOVU1CRVI6IC9bKy1dP1swLTldKyg/OlxcLlswLTldKyk/KD86W2VFXVsrLV1bMC05XSspPy8sXHJcbiAgICBXT1JEOiAvW1xcd10rXFxiLyxcclxuICAgIFNUUklORzogL1wiKD86XFxcXFsjXCJcXFxcXXxbXlxcblwiXFxcXF0pKlwiLyxcclxuICAgIEJSQUNFX0w6ICd7JyxcclxuICAgIEJSQUNFX1I6ICd9JyxcclxuICAgIFNRVV9CUkFfTDogJ1snLFxyXG4gICAgU1FVX0JSQV9SOiAnXScsXHJcbiAgICBXUzoge1xyXG4gICAgICBtYXRjaDogL1tcXHNdKy8sXHJcbiAgICAgIGxpbmVCcmVha3M6IHRydWVcclxuICAgIH0sXHJcbiAgICBDT01NRU5UOiB7XHJcbiAgICAgIG1hdGNoOiAvIy4qP1xcclxcbi8sXHJcbiAgICAgIGxpbmVCcmVha3M6IHRydWVcclxuICAgIH1cclxuICB9KVxyXG52YXIgZ3JhbW1hciA9IHtcbiAgICBMZXhlcjogbGV4ZXIsXG4gICAgUGFyc2VyUnVsZXM6IFtcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIkJPT0xFQU5cIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiTlVNQkVSXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIlNUUklOR1wiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUFwiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJBUlJBWVwiXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUCRlYm5mJDJcIiwgXCJHUk9VUF9QUk9QRVJUWVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiQlJBQ0VfTFwiKSA/IHt0eXBlOiBcIkJSQUNFX0xcIn0gOiBCUkFDRV9MKSwgXCJHUk9VUCRlYm5mJDFcIiwgXCJHUk9VUCRlYm5mJDJcIiwgKGxleGVyLmhhcyhcIkJSQUNFX1JcIikgPyB7dHlwZTogXCJCUkFDRV9SXCJ9IDogQlJBQ0VfUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZnJvbVBhaXJzKGRhdGFbMl0pfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIldPUkRcIikgPyB7dHlwZTogXCJXT1JEXCJ9IDogV09SRCksIFwiV1NcIiwgXCJWQUxVRVwiLCBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IFsgZGF0YVswXS52YWx1ZSwgZGF0YVsyXVswXSBdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJBUlJBWSRlYm5mJDJcIiwgXCJBUlJBWV9FTEVNRU5UXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTUVVfQlJBX0xcIikgPyB7dHlwZTogXCJTUVVfQlJBX0xcIn0gOiBTUVVfQlJBX0wpLCBcIkFSUkFZJGVibmYkMVwiLCBcIkFSUkFZJGVibmYkMlwiLCAobGV4ZXIuaGFzKFwiU1FVX0JSQV9SXCIpID8ge3R5cGU6IFwiU1FVX0JSQV9SXCJ9IDogU1FVX0JSQV9SKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzJdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVFwiLCBcInN5bWJvbHNcIjogW1wiVkFMVUVcIiwgXCJBUlJBWV9FTEVNRU5UJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF1bMF19LFxuICAgIHtcIm5hbWVcIjogXCJCT09MRUFOXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlRSVUVcIikgPyB7dHlwZTogXCJUUlVFXCJ9IDogVFJVRSldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZSA9PT0gJ3RydWUnfSxcbiAgICB7XCJuYW1lXCI6IFwiQk9PTEVBTlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJGQUxTRVwiKSA/IHt0eXBlOiBcIkZBTFNFXCJ9IDogRkFMU0UpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUgPT09ICd0cnVlJ30sXG4gICAge1wibmFtZVwiOiBcIldPUkRcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiV09SRFwiKSA/IHt0eXBlOiBcIldPUkRcIn0gOiBXT1JEKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiTlVNQkVSXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIk5VTUJFUlwiKSA/IHt0eXBlOiBcIk5VTUJFUlwifSA6IE5VTUJFUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gcGFyc2VGbG9hdChkYXRhWzBdLnZhbHVlKX0sXG4gICAge1wibmFtZVwiOiBcIlNUUklOR1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTVFJJTkdcIikgPyB7dHlwZTogXCJTVFJJTkdcIn0gOiBTVFJJTkcpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUuc3BsaXQoJ1wiJylbMV19LFxuICAgIHtcIm5hbWVcIjogXCJXU1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJXU1wiKSA/IHt0eXBlOiBcIldTXCJ9IDogV1MpXSwgXCJwb3N0cHJvY2Vzc1wiOiBudWxsZXJ9LFxuICAgIHtcIm5hbWVcIjogXCJXU1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJDT01NRU5UXCIpID8ge3R5cGU6IFwiQ09NTUVOVFwifSA6IENPTU1FTlQpXSwgXCJwb3N0cHJvY2Vzc1wiOiBudWxsZXJ9LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfQ0FUQUxPRyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX0NBVEFMT0ckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJEU0NfQ0FUQUxPRyRlYm5mJDFcIiwgXCJEU0NfREVGSU5JVElPTlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX0NBVEFMT0dcIiwgXCJzeW1ib2xzXCI6IFtcIkRTQ19DQVRBTE9HJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkRTQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfREVGSU5JVElPTiRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkRTQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfREVGSU5JVElPTiRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcIkRTQ19OVU1CRVJcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfREVGSU5JVElPTiRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX0RFRklOSVRJT05cIiwgXCJzeW1ib2xzXCI6IFtcIkRTQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcIkRTQ19ERUZJTklUSU9OJGVibmYkMlwiLCBcIkRTQ19PQkpFQ1RfVFlQRVwiLCBcIkRTQ19OQU1FXCIsIFwiRFNDX1BST1BFUlRJRVNcIl0sIFwicG9zdHByb2Nlc3NcIjogXHJcbiAgICAgICAgKFssIG51bWJlciwgdHlwZSwgbmFtZSwgcHJvcGVydGllc10pID0+IHtcclxuICAgICAgICAgIGlmIChudW1iZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgbnVtYmVyID0gZ2xvYmFsSWQrK1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgICAgbnVtYmVyLFxyXG4gICAgICAgICAgICAgIG5hbWVzOiBuYW1lLnNwbGl0KCc6JylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJvcGVydGllc1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfUFJPUEVSVElFU1wiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF19LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfTlVNQkVSXCIsIFwic3ltYm9sc1wiOiBbXCJOVU1CRVJcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF19LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfTkFNRVwiLCBcInN5bWJvbHNcIjogW1wiU1RSSU5HXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkRTQ19HQUxBWFlfVFlQRVwiKSA/IHt0eXBlOiBcIkRTQ19HQUxBWFlfVFlQRVwifSA6IERTQ19HQUxBWFlfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkRTQ19HTE9CVUxBUl9UWVBFXCIpID8ge3R5cGU6IFwiRFNDX0dMT0JVTEFSX1RZUEVcIn0gOiBEU0NfR0xPQlVMQVJfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkRTQ19ORUJVTEFfVFlQRVwiKSA/IHt0eXBlOiBcIkRTQ19ORUJVTEFfVFlQRVwifSA6IERTQ19ORUJVTEFfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkRTQ19PUEVOX0NMVVNURVJfVFlQRVwiKSA/IHt0eXBlOiBcIkRTQ19PUEVOX0NMVVNURVJfVFlQRVwifSA6IERTQ19PUEVOX0NMVVNURVJfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfVxuXVxuICAsIFBhcnNlclN0YXJ0OiBcIkRTQ19DQVRBTE9HXCJcbn1cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIG1vZHVsZS5leHBvcnRzID0gZ3JhbW1hcjtcbn0gZWxzZSB7XG4gICB3aW5kb3cuZ3JhbW1hciA9IGdyYW1tYXI7XG59XG59KSgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ3JhbW1hci9kc2NwYXJzZXIubmVcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IG5lYXJsZXlcbi8vIGh0dHA6Ly9naXRodWIuY29tL0hhcmRtYXRoMTIzL25lYXJsZXlcbihmdW5jdGlvbiAoKSB7XG5mdW5jdGlvbiBpZCh4KSB7cmV0dXJuIHhbMF07IH1cblxyXG4gIGNvbnN0IGZyb21QYWlycyA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgcmV0dXJuIGlucHV0LnJlZHVjZSgoYWNjLCBpKSA9PiB7XHJcbiAgICAgICAgYWNjW2lbMF1dID0gaVsxXVxyXG4gICAgICAgIHJldHVybiBhY2NcclxuICAgIH0sIHt9KVxyXG4gIH1cclxuICBjb25zdCBtb28gPSByZXF1aXJlKCdtb28nKVxyXG5cclxuICBjb25zdCBudWxsZXIgPSB4ID0+IG51bGxcclxuXHJcbiAgY29uc3QgbGV4ZXIgPSBtb28uY29tcGlsZSh7XHJcbiAgICBDT05GSUdfS0VZV09SRDogL0NvbmZpZ3VyYXRpb25cXGIvLFxyXG5cclxuICAgIEFERF9NT0RFOiAvQWRkXFxiLyxcclxuICAgIE1PRElGWV9NT0RFOiAvTW9kaWZ5XFxiLyxcclxuICAgIFJFUExBQ0VfTU9ERTogL1JlcGxhY2VcXGIvLFxyXG5cclxuICAgIFNTQ19CT0RZX1RZUEU6IC9Cb2R5XFxiLyxcclxuICAgIFNTQ19SRUZfUE9JTlRfVFlQRTogL1JlZmVyZW5jZVBvaW50XFxiLyxcclxuICAgIFNTQ19TVVJGX1BPSU5UX1RZUEU6IC9TdXJmYWNlUG9pbnRcXGIvLFxyXG4gICAgU1NDX0FMVF9TVVJGQUNFOiAvQWx0U3VyZmFjZVxcYi8sXHJcbiAgICBTU0NfTE9DQVRJT046IC9Mb2NhdGlvblxcYi8sXHJcblxyXG4gICAgU1RDX1NUQVJfVFlQRTogL1N0YXJcXGIvLFxyXG4gICAgU1RDX0JBUllDRU5URVJfVFlQRTogL0JhcnljZW50ZXJcXGIvLFxyXG5cclxuICAgIERTQ19HQUxBWFlfVFlQRTogL0dhbGF4eVxcYi8sXHJcbiAgICBEU0NfR0xPQlVMQVJfVFlQRTogL0dsb2J1bGFyXFxiLyxcclxuICAgIERTQ19ORUJVTEFfVFlQRTogL05lYnVsYVxcYi8sXHJcbiAgICBEU0NfT1BFTl9DTFVTVEVSX1RZUEU6IC9PcGVuQ2x1c3RlclxcYi8sXHJcblxyXG4gICAgVFJVRTogL3RydWUvLFxyXG4gICAgRkFMU0U6IC9mYWxzZS8sXHJcblxyXG4gICAgTlVNQkVSOiAvWystXT9bMC05XSsoPzpcXC5bMC05XSspPyg/OltlRV1bKy1dWzAtOV0rKT8vLFxyXG4gICAgV09SRDogL1tcXHddK1xcYi8sXHJcbiAgICBTVFJJTkc6IC9cIig/OlxcXFxbI1wiXFxcXF18W15cXG5cIlxcXFxdKSpcIi8sXHJcbiAgICBCUkFDRV9MOiAneycsXHJcbiAgICBCUkFDRV9SOiAnfScsXHJcbiAgICBTUVVfQlJBX0w6ICdbJyxcclxuICAgIFNRVV9CUkFfUjogJ10nLFxyXG4gICAgV1M6IHtcclxuICAgICAgbWF0Y2g6IC9bXFxzXSsvLFxyXG4gICAgICBsaW5lQnJlYWtzOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgQ09NTUVOVDoge1xyXG4gICAgICBtYXRjaDogLyMuKj9cXHJcXG4vLFxyXG4gICAgICBsaW5lQnJlYWtzOiB0cnVlXHJcbiAgICB9XHJcbiAgfSlcclxudmFyIGdyYW1tYXIgPSB7XG4gICAgTGV4ZXI6IGxleGVyLFxuICAgIFBhcnNlclJ1bGVzOiBbXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJCT09MRUFOXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIk5VTUJFUlwiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJTVFJJTkdcIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBcIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiQVJSQVlcIl19LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUCRlYm5mJDFcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVAkZWJuZiQyXCIsIFwiR1JPVVBfUFJPUEVSVFlcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkJSQUNFX0xcIikgPyB7dHlwZTogXCJCUkFDRV9MXCJ9IDogQlJBQ0VfTCksIFwiR1JPVVAkZWJuZiQxXCIsIFwiR1JPVVAkZWJuZiQyXCIsIChsZXhlci5oYXMoXCJCUkFDRV9SXCIpID8ge3R5cGU6IFwiQlJBQ0VfUlwifSA6IEJSQUNFX1IpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGZyb21QYWlycyhkYXRhWzJdKX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUF9QUk9QRVJUWVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJXT1JEXCIpID8ge3R5cGU6IFwiV09SRFwifSA6IFdPUkQpLCBcIldTXCIsIFwiVkFMVUVcIiwgXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBbIGRhdGFbMF0udmFsdWUsIGRhdGFbMl1bMF0gXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiQVJSQVkkZWJuZiQyXCIsIFwiQVJSQVlfRUxFTUVOVFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiU1FVX0JSQV9MXCIpID8ge3R5cGU6IFwiU1FVX0JSQV9MXCJ9IDogU1FVX0JSQV9MKSwgXCJBUlJBWSRlYm5mJDFcIiwgXCJBUlJBWSRlYm5mJDJcIiwgKGxleGVyLmhhcyhcIlNRVV9CUkFfUlwiKSA/IHt0eXBlOiBcIlNRVV9CUkFfUlwifSA6IFNRVV9CUkFfUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVsyXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlRcIiwgXCJzeW1ib2xzXCI6IFtcIlZBTFVFXCIsIFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiQk9PTEVBTlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJUUlVFXCIpID8ge3R5cGU6IFwiVFJVRVwifSA6IFRSVUUpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUgPT09ICd0cnVlJ30sXG4gICAge1wibmFtZVwiOiBcIkJPT0xFQU5cIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiRkFMU0VcIikgPyB7dHlwZTogXCJGQUxTRVwifSA6IEZBTFNFKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlID09PSAndHJ1ZSd9LFxuICAgIHtcIm5hbWVcIjogXCJXT1JEXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIldPUkRcIikgPyB7dHlwZTogXCJXT1JEXCJ9IDogV09SRCldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIk5VTUJFUlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJOVU1CRVJcIikgPyB7dHlwZTogXCJOVU1CRVJcIn0gOiBOVU1CRVIpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IHBhcnNlRmxvYXQoZGF0YVswXS52YWx1ZSl9LFxuICAgIHtcIm5hbWVcIjogXCJTVFJJTkdcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiU1RSSU5HXCIpID8ge3R5cGU6IFwiU1RSSU5HXCJ9IDogU1RSSU5HKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlLnNwbGl0KCdcIicpWzFdfSxcbiAgICB7XCJuYW1lXCI6IFwiV1NcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiV1NcIikgPyB7dHlwZTogXCJXU1wifSA6IFdTKV0sIFwicG9zdHByb2Nlc3NcIjogbnVsbGVyfSxcbiAgICB7XCJuYW1lXCI6IFwiV1NcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiQ09NTUVOVFwiKSA/IHt0eXBlOiBcIkNPTU1FTlRcIn0gOiBDT01NRU5UKV0sIFwicG9zdHByb2Nlc3NcIjogbnVsbGVyfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX0NBVEFMT0ckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19DQVRBTE9HJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiU1NDX0NBVEFMT0ckZWJuZiQxXCIsIFwiU1NDX0RFRklOSVRJT05cIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19DQVRBTE9HXCIsIFwic3ltYm9sc1wiOiBbXCJTU0NfQ0FUQUxPRyRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfREVGSU5JVElPTiRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX0RFRklOSVRJT04kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJTU0NfREVGSU5JVElPTiRlYm5mJDFcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX0RFRklOSVRJT04kZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJTU0NfT0JKRUNUX01PREVcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfREVGSU5JVElPTiRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX0RFRklOSVRJT04kZWJuZiQzXCIsIFwic3ltYm9sc1wiOiBbXCJTU0NfT0JKRUNUX1RZUEVcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfREVGSU5JVElPTiRlYm5mJDNcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX0RFRklOSVRJT05cIiwgXCJzeW1ib2xzXCI6IFtcIlNTQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcIlNTQ19ERUZJTklUSU9OJGVibmYkMlwiLCBcIlNTQ19ERUZJTklUSU9OJGVibmYkM1wiLCBcIlNTQ19OQU1FXCIsIFwiU1NDX1BBUkVOVF9OQU1FXCIsIFwiU1NDX1BST1BFUlRJRVNcIl0sIFwicG9zdHByb2Nlc3NcIjogXHJcbiAgICAgICAgKFssIG1vZGUgPSAnQWRkJywgdHlwZSA9ICdCb2R5JywgbmFtZSwgcGF0aFRvUGFyZW50LCBwcm9wZXJ0aWVzXSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgIG1vZGU6IG1vZGUgIT09IG51bGwgPyBtb2RlIDogJ0FkZCcsXHJcbiAgICAgICAgICAgICAgbW9kZVNldDogbW9kZSAhPT0gbnVsbCxcclxuICAgICAgICAgICAgICB0eXBlOiB0eXBlICE9PSBudWxsID8gdHlwZSA6ICdCb2R5JyxcclxuICAgICAgICAgICAgICB0eXBlU2V0OiB0eXBlICE9PSBudWxsLFxyXG4gICAgICAgICAgICAgIG5hbWVzOiBuYW1lLnNwbGl0KCc6JyksXHJcbiAgICAgICAgICAgICAgcGF0aFRvUGFyZW50OiBwYXRoVG9QYXJlbnQuc3BsaXQoJy8nKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19QUk9QRVJUSUVTXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUFwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXX0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19PQkpFQ1RfTU9ERVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJNT0RJRllfTU9ERVwiKSA/IHt0eXBlOiBcIk1PRElGWV9NT0RFXCJ9IDogTU9ESUZZX01PREUpLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19PQkpFQ1RfTU9ERVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJBRERfTU9ERVwiKSA/IHt0eXBlOiBcIkFERF9NT0RFXCJ9IDogQUREX01PREUpLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19PQkpFQ1RfTU9ERVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJSRVBMQUNFX01PREVcIikgPyB7dHlwZTogXCJSRVBMQUNFX01PREVcIn0gOiBSRVBMQUNFX01PREUpLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19QQVJFTlRfTkFNRVwiLCBcInN5bWJvbHNcIjogW1wiU1RSSU5HXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX05BTUVcIiwgXCJzeW1ib2xzXCI6IFtcIlNUUklOR1wiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXX0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19PQkpFQ1RfVFlQRVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTU0NfQk9EWV9UWVBFXCIpID8ge3R5cGU6IFwiU1NDX0JPRFlfVFlQRVwifSA6IFNTQ19CT0RZX1RZUEUpLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19PQkpFQ1RfVFlQRVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTU0NfUkVGX1BPSU5UX1RZUEVcIikgPyB7dHlwZTogXCJTU0NfUkVGX1BPSU5UX1RZUEVcIn0gOiBTU0NfUkVGX1BPSU5UX1RZUEUpLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19PQkpFQ1RfVFlQRVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTU0NfU1VSRl9QT0lOVF9UWVBFXCIpID8ge3R5cGU6IFwiU1NDX1NVUkZfUE9JTlRfVFlQRVwifSA6IFNTQ19TVVJGX1BPSU5UX1RZUEUpLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19PQkpFQ1RfVFlQRVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTU0NfQUxUX1NVUkZBQ0VcIikgPyB7dHlwZTogXCJTU0NfQUxUX1NVUkZBQ0VcIn0gOiBTU0NfQUxUX1NVUkZBQ0UpLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19PQkpFQ1RfVFlQRVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTU0NfTE9DQVRJT05cIikgPyB7dHlwZTogXCJTU0NfTE9DQVRJT05cIn0gOiBTU0NfTE9DQVRJT04pLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX1cbl1cbiAgLCBQYXJzZXJTdGFydDogXCJTU0NfQ0FUQUxPR1wiXG59XG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICBtb2R1bGUuZXhwb3J0cyA9IGdyYW1tYXI7XG59IGVsc2Uge1xuICAgd2luZG93LmdyYW1tYXIgPSBncmFtbWFyO1xufVxufSkoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2dyYW1tYXIvc3NjcGFyc2VyLm5lXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBHZW5lcmF0ZWQgYXV0b21hdGljYWxseSBieSBuZWFybGV5XG4vLyBodHRwOi8vZ2l0aHViLmNvbS9IYXJkbWF0aDEyMy9uZWFybGV5XG4oZnVuY3Rpb24gKCkge1xuZnVuY3Rpb24gaWQoeCkge3JldHVybiB4WzBdOyB9XG5cclxuICBjb25zdCB2YWxpZE1vZGVzID0gWydNb2RpZnknLCAnQWRkJywgJ1JlcGxhY2UnXVxyXG4gIGNvbnN0IHZhbGlkVHlwZXMgPSBbJ1N0YXInLCAnQmFyeWNlbnRlciddXHJcblxuXHJcbiAgY29uc3QgZnJvbVBhaXJzID0gZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICByZXR1cm4gaW5wdXQucmVkdWNlKChhY2MsIGkpID0+IHtcclxuICAgICAgICBhY2NbaVswXV0gPSBpWzFdXHJcbiAgICAgICAgcmV0dXJuIGFjY1xyXG4gICAgfSwge30pXHJcbiAgfVxyXG4gIGNvbnN0IG1vbyA9IHJlcXVpcmUoJ21vbycpXHJcblxyXG4gIGNvbnN0IG51bGxlciA9IHggPT4gbnVsbFxyXG5cclxuICBjb25zdCBsZXhlciA9IG1vby5jb21waWxlKHtcclxuICAgIENPTkZJR19LRVlXT1JEOiAvQ29uZmlndXJhdGlvblxcYi8sXHJcblxyXG4gICAgQUREX01PREU6IC9BZGRcXGIvLFxyXG4gICAgTU9ESUZZX01PREU6IC9Nb2RpZnlcXGIvLFxyXG4gICAgUkVQTEFDRV9NT0RFOiAvUmVwbGFjZVxcYi8sXHJcblxyXG4gICAgU1NDX0JPRFlfVFlQRTogL0JvZHlcXGIvLFxyXG4gICAgU1NDX1JFRl9QT0lOVF9UWVBFOiAvUmVmZXJlbmNlUG9pbnRcXGIvLFxyXG4gICAgU1NDX1NVUkZfUE9JTlRfVFlQRTogL1N1cmZhY2VQb2ludFxcYi8sXHJcbiAgICBTU0NfQUxUX1NVUkZBQ0U6IC9BbHRTdXJmYWNlXFxiLyxcclxuICAgIFNTQ19MT0NBVElPTjogL0xvY2F0aW9uXFxiLyxcclxuXHJcbiAgICBTVENfU1RBUl9UWVBFOiAvU3RhclxcYi8sXHJcbiAgICBTVENfQkFSWUNFTlRFUl9UWVBFOiAvQmFyeWNlbnRlclxcYi8sXHJcblxyXG4gICAgRFNDX0dBTEFYWV9UWVBFOiAvR2FsYXh5XFxiLyxcclxuICAgIERTQ19HTE9CVUxBUl9UWVBFOiAvR2xvYnVsYXJcXGIvLFxyXG4gICAgRFNDX05FQlVMQV9UWVBFOiAvTmVidWxhXFxiLyxcclxuICAgIERTQ19PUEVOX0NMVVNURVJfVFlQRTogL09wZW5DbHVzdGVyXFxiLyxcclxuXHJcbiAgICBUUlVFOiAvdHJ1ZS8sXHJcbiAgICBGQUxTRTogL2ZhbHNlLyxcclxuXHJcbiAgICBOVU1CRVI6IC9bKy1dP1swLTldKyg/OlxcLlswLTldKyk/KD86W2VFXVsrLV1bMC05XSspPy8sXHJcbiAgICBXT1JEOiAvW1xcd10rXFxiLyxcclxuICAgIFNUUklORzogL1wiKD86XFxcXFsjXCJcXFxcXXxbXlxcblwiXFxcXF0pKlwiLyxcclxuICAgIEJSQUNFX0w6ICd7JyxcclxuICAgIEJSQUNFX1I6ICd9JyxcclxuICAgIFNRVV9CUkFfTDogJ1snLFxyXG4gICAgU1FVX0JSQV9SOiAnXScsXHJcbiAgICBXUzoge1xyXG4gICAgICBtYXRjaDogL1tcXHNdKy8sXHJcbiAgICAgIGxpbmVCcmVha3M6IHRydWVcclxuICAgIH0sXHJcbiAgICBDT01NRU5UOiB7XHJcbiAgICAgIG1hdGNoOiAvIy4qP1xcclxcbi8sXHJcbiAgICAgIGxpbmVCcmVha3M6IHRydWVcclxuICAgIH1cclxuICB9KVxyXG52YXIgZ3JhbW1hciA9IHtcbiAgICBMZXhlcjogbGV4ZXIsXG4gICAgUGFyc2VyUnVsZXM6IFtcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIkJPT0xFQU5cIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiTlVNQkVSXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIlNUUklOR1wiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUFwiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJBUlJBWVwiXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUCRlYm5mJDJcIiwgXCJHUk9VUF9QUk9QRVJUWVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiQlJBQ0VfTFwiKSA/IHt0eXBlOiBcIkJSQUNFX0xcIn0gOiBCUkFDRV9MKSwgXCJHUk9VUCRlYm5mJDFcIiwgXCJHUk9VUCRlYm5mJDJcIiwgKGxleGVyLmhhcyhcIkJSQUNFX1JcIikgPyB7dHlwZTogXCJCUkFDRV9SXCJ9IDogQlJBQ0VfUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZnJvbVBhaXJzKGRhdGFbMl0pfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIldPUkRcIikgPyB7dHlwZTogXCJXT1JEXCJ9IDogV09SRCksIFwiV1NcIiwgXCJWQUxVRVwiLCBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IFsgZGF0YVswXS52YWx1ZSwgZGF0YVsyXVswXSBdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJBUlJBWSRlYm5mJDJcIiwgXCJBUlJBWV9FTEVNRU5UXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTUVVfQlJBX0xcIikgPyB7dHlwZTogXCJTUVVfQlJBX0xcIn0gOiBTUVVfQlJBX0wpLCBcIkFSUkFZJGVibmYkMVwiLCBcIkFSUkFZJGVibmYkMlwiLCAobGV4ZXIuaGFzKFwiU1FVX0JSQV9SXCIpID8ge3R5cGU6IFwiU1FVX0JSQV9SXCJ9IDogU1FVX0JSQV9SKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzJdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVFwiLCBcInN5bWJvbHNcIjogW1wiVkFMVUVcIiwgXCJBUlJBWV9FTEVNRU5UJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF1bMF19LFxuICAgIHtcIm5hbWVcIjogXCJCT09MRUFOXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlRSVUVcIikgPyB7dHlwZTogXCJUUlVFXCJ9IDogVFJVRSldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZSA9PT0gJ3RydWUnfSxcbiAgICB7XCJuYW1lXCI6IFwiQk9PTEVBTlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJGQUxTRVwiKSA/IHt0eXBlOiBcIkZBTFNFXCJ9IDogRkFMU0UpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUgPT09ICd0cnVlJ30sXG4gICAge1wibmFtZVwiOiBcIldPUkRcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiV09SRFwiKSA/IHt0eXBlOiBcIldPUkRcIn0gOiBXT1JEKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiTlVNQkVSXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIk5VTUJFUlwiKSA/IHt0eXBlOiBcIk5VTUJFUlwifSA6IE5VTUJFUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gcGFyc2VGbG9hdChkYXRhWzBdLnZhbHVlKX0sXG4gICAge1wibmFtZVwiOiBcIlNUUklOR1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTVFJJTkdcIikgPyB7dHlwZTogXCJTVFJJTkdcIn0gOiBTVFJJTkcpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUuc3BsaXQoJ1wiJylbMV19LFxuICAgIHtcIm5hbWVcIjogXCJXU1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJXU1wiKSA/IHt0eXBlOiBcIldTXCJ9IDogV1MpXSwgXCJwb3N0cHJvY2Vzc1wiOiBudWxsZXJ9LFxuICAgIHtcIm5hbWVcIjogXCJXU1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJDT01NRU5UXCIpID8ge3R5cGU6IFwiQ09NTUVOVFwifSA6IENPTU1FTlQpXSwgXCJwb3N0cHJvY2Vzc1wiOiBudWxsZXJ9LFxuICAgIHtcIm5hbWVcIjogXCJDQVRBTE9HJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJDQVRBTE9HJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiQ0FUQUxPRyRlYm5mJDFcIiwgXCJTVENfREVGSU5JVElPTlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQ0FUQUxPR1wiLCBcInN5bWJvbHNcIjogW1wiQ0FUQUxPRyRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJTVENfREVGSU5JVElPTiRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0RFRklOSVRJT04kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJTVENfREVGSU5JVElPTiRlYm5mJDFcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0RFRklOSVRJT04kZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJTVENfT0JKRUNUX01PREVcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJTVENfREVGSU5JVElPTiRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0RFRklOSVRJT04kZWJuZiQzXCIsIFwic3ltYm9sc1wiOiBbXCJTVENfT0JKRUNUX1RZUEVcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJTVENfREVGSU5JVElPTiRlYm5mJDNcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0RFRklOSVRJT04kZWJuZiQ0XCIsIFwic3ltYm9sc1wiOiBbXCJTVENfSElQX05VTUJFUlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ERUZJTklUSU9OJGVibmYkNFwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJTVENfREVGSU5JVElPTiRlYm5mJDVcIiwgXCJzeW1ib2xzXCI6IFtcIlNUQ19OQU1FXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0RFRklOSVRJT04kZWJuZiQ1XCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ERUZJTklUSU9OXCIsIFwic3ltYm9sc1wiOiBbXCJTVENfREVGSU5JVElPTiRlYm5mJDFcIiwgXCJTVENfREVGSU5JVElPTiRlYm5mJDJcIiwgXCJTVENfREVGSU5JVElPTiRlYm5mJDNcIiwgXCJTVENfREVGSU5JVElPTiRlYm5mJDRcIiwgXCJTVENfREVGSU5JVElPTiRlYm5mJDVcIiwgXCJTVENfUFJPUEVSVElFU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcclxuICAgICAgICAoWywgbW9kZSwgdHlwZSwgbnVtYmVyLCBuYW1lLCBwcm9wZXJ0aWVzXSwgbCkgPT4ge1xyXG4gICAgICAgICAgaWYgKG51bWJlciA9PT0gbnVsbCAmJiBuYW1lID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW5jb3JyZWN0IG9iamVjdCBkZWZpbml0aW9uIGF0IGxpbmUgJHtsfWApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICBpZiAobW9kZSAhPT0gbnVsbCAmJiB2YWxpZE1vZGVzLmluZGV4T2YobW9kZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgV3Jvbmcgb2JqZWN0IGNyZWF0aW9uIG1vZGUgXCIke21vZGV9XCIgYXQgbGluZSAke2x9YClcclxuICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgIGlmICh0eXBlICE9PSBudWxsICYmIHZhbGlkVHlwZXMuaW5kZXhPZih0eXBlKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgaWYgKHZhbGlkTW9kZXMuaW5kZXhPZih0eXBlKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICBtb2RlID0gdHlwZVxyXG4gICAgICAgICAgICAgIHR5cGUgPSBudWxsXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBXcm9uZyBvYmplY3QgdHlwZSBcIiR7dHlwZX1cIiBhdCBsaW5lICR7bH1gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtZXRhOntcclxuICAgICAgICAgICAgICBtb2RlOiBtb2RlICE9PSBudWxsID8gbW9kZSA6ICdBZGQnLFxyXG4gICAgICAgICAgICAgIG1vZGVTZXQ6IG1vZGUgIT09IG51bGwsXHJcbiAgICAgICAgICAgICAgdHlwZTogdHlwZSAhPT0gbnVsbCA/IHR5cGUgOiAnU3RhcicsXHJcbiAgICAgICAgICAgICAgdHlwZVNldDogdHlwZSAhPT0gbnVsbCxcclxuICAgICAgICAgICAgICBuYW1lczogbmFtZSAhPT0gbnVsbCA/IG5hbWUuc3BsaXQoJzonKSA6IFtdLFxyXG4gICAgICAgICAgICAgIG5hbWVTZXQ6IG5hbWUgIT09IG51bGwsXHJcbiAgICAgICAgICAgICAgbnVtYmVyOiBudW1iZXIgIT09IG51bGwgPyBudW1iZXIgOiB7fVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19QUk9QRVJUSUVTXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUFwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ISVBfTlVNQkVSJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJTVENfSElQX05VTUJFUiRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIlNUQ19ISVBfTlVNQkVSJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJTVENfSElQX05VTUJFUlwiLCBcInN5bWJvbHNcIjogW1wiTlVNQkVSXCIsIFwiU1RDX0hJUF9OVU1CRVIkZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19OQU1FXCIsIFwic3ltYm9sc1wiOiBbXCJTVFJJTkdcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF19LFxuICAgIHtcIm5hbWVcIjogXCJTVENfT0JKRUNUX01PREVcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiTU9ESUZZX01PREVcIikgPyB7dHlwZTogXCJNT0RJRllfTU9ERVwifSA6IE1PRElGWV9NT0RFKSwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWV9LFxuICAgIHtcIm5hbWVcIjogXCJTVENfT0JKRUNUX01PREVcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiQUREX01PREVcIikgPyB7dHlwZTogXCJBRERfTU9ERVwifSA6IEFERF9NT0RFKSwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWV9LFxuICAgIHtcIm5hbWVcIjogXCJTVENfT0JKRUNUX01PREVcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiUkVQTEFDRV9NT0RFXCIpID8ge3R5cGU6IFwiUkVQTEFDRV9NT0RFXCJ9IDogUkVQTEFDRV9NT0RFKSwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWV9LFxuICAgIHtcIm5hbWVcIjogXCJTVENfT0JKRUNUX1RZUEVcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiU1RDX1NUQVJfVFlQRVwiKSA/IHt0eXBlOiBcIlNUQ19TVEFSX1RZUEVcIn0gOiBTVENfU1RBUl9UWVBFKSwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWV9LFxuICAgIHtcIm5hbWVcIjogXCJTVENfT0JKRUNUX1RZUEVcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiU1RDX0JBUllDRU5URVJfVFlQRVwiKSA/IHt0eXBlOiBcIlNUQ19CQVJZQ0VOVEVSX1RZUEVcIn0gOiBTVENfQkFSWUNFTlRFUl9UWVBFKSwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWV9XG5dXG4gICwgUGFyc2VyU3RhcnQ6IFwiQ0FUQUxPR1wiXG59XG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICBtb2R1bGUuZXhwb3J0cyA9IGdyYW1tYXI7XG59IGVsc2Uge1xuICAgd2luZG93LmdyYW1tYXIgPSBncmFtbWFyO1xufVxufSkoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2dyYW1tYXIvc3RjcGFyc2VyLm5lXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBGb3JtYXRzQ2hlY2tlciwgRm9ybWF0VHlwZSB9IGZyb20gJy4vRm9ybWF0c0NoZWNrZXInXHJcblxyXG5leHBvcnQge1xyXG4gIEZvcm1hdHNDaGVja2VyLFxyXG4gIEZvcm1hdFR5cGVcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRm9ybWF0c0NoZWNrZXIvaW5kZXgudHMiLCJjb25zdCByZWR1Y2UgPSBmdW5jdGlvbiA8VD4gKGlucHV0OiBhbnkpOiBhbnlbXSB7XHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGlucHV0KS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XHJcbiAgICByZXR1cm4gW10uY29uY2F0KGFjYywgaW5wdXRba2V5XSlcclxuICB9LCBbXSlcclxufVxyXG5cclxuZW51bSBGb3JtYXRUeXBlIHtcclxuICBURVhULFxyXG4gIEJJTkFSWSxcclxuICBJTkNPUlJFQ1RcclxufVxyXG5cclxuY2xhc3MgRm9ybWF0c0NoZWNrZXIge1xyXG4gIHByaXZhdGUgc3RhdGljIF92aWFibGVGb3JtYXRzID0ge1xyXG4gICAgdGV4dDogWydzdGMnLCAnc3NjJywgJ2RzYycsICdjZmcnXSxcclxuICAgIGJpbmFyeTogWydkYXQnXVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldCB2aWFibGVGb3JtYXRzICgpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gcmVkdWNlKEZvcm1hdHNDaGVja2VyLl92aWFibGVGb3JtYXRzKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzQ29ycmVjdEV4dGVuc2lvbiAoZXh0ZW5zaW9uOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBGb3JtYXRzQ2hlY2tlci52aWFibGVGb3JtYXRzLmluZGV4T2YoZXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCkpICE9PSAtMVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZvcm1hdFR5cGUgKGV4dGVuc2lvbjogc3RyaW5nKTogRm9ybWF0VHlwZSB7XHJcbiAgICBpZiAoIUZvcm1hdHNDaGVja2VyLmlzQ29ycmVjdEV4dGVuc2lvbihleHRlbnNpb24pKSB7XHJcbiAgICAgIHJldHVybiBGb3JtYXRUeXBlLklOQ09SUkVDVFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChGb3JtYXRzQ2hlY2tlci5fdmlhYmxlRm9ybWF0cy50ZXh0LmluZGV4T2YoZXh0ZW5zaW9uKSAhPT0gLTEpIHtcclxuICAgICAgcmV0dXJuIEZvcm1hdFR5cGUuVEVYVFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIEZvcm1hdFR5cGUuQklOQVJZXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIEZvcm1hdHNDaGVja2VyLFxyXG4gIEZvcm1hdFR5cGVcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRm9ybWF0c0NoZWNrZXIvRm9ybWF0c0NoZWNrZXIudHMiXSwic291cmNlUm9vdCI6IiJ9