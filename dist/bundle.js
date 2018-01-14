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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Serializer_1 = __webpack_require__(16);
exports.Serializer = Serializer_1.default;


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const META = {
    FILE_HEADER: 'CELSTARS',
    VERSION: 0x0100,
    HEADER_OFFSET: 14
};
exports.default = META;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Serializer_1 = __webpack_require__(0);
class TextWriter {
    write(type, items) {
        return new Promise((resolve, reject) => {
            try {
                return resolve(this.transform(items));
            }
            catch (error) {
                reject(error);
            }
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DatMeta_1 = __webpack_require__(2);
exports.META = DatMeta_1.default;
const decodeSpectralClass_1 = __webpack_require__(13);
exports.decodeSpectralClass = decodeSpectralClass_1.default;
const encodeSpectralClass_1 = __webpack_require__(14);
exports.encodeSpectralClass = encodeSpectralClass_1.default;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Serializer_1 = __webpack_require__(0);
class ConfigWriter {
    write(type, config) {
        return new Promise((resolve, reject) => {
            try {
                return resolve(Serializer_1.Serializer.stringify(config));
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = ConfigWriter;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Injector_1 = __webpack_require__(7);
class Celio {
    static read(buffer, type) {
        const Reader = Injector_1.Injector.makeReader(type);
        return Reader.read(buffer);
    }
    static write(type, items) {
        const Writer = Injector_1.Injector.makeWriter(type);
        return Writer.write(type, items);
    }
}
exports.Celio = Celio;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Injector_1 = __webpack_require__(8);
exports.Injector = Injector_1.default;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Reader_1 = __webpack_require__(9);
const Writer_1 = __webpack_require__(15);
const grammar_1 = __webpack_require__(23);
const FormatsChecker_1 = __webpack_require__(28);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const NearleyBasedReader_1 = __webpack_require__(10);
exports.NearleyBasedReader = NearleyBasedReader_1.default;
const DATReader_1 = __webpack_require__(12);
exports.DATReader = DATReader_1.default;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const nearley_1 = __webpack_require__(11);
class NearleyBasedReader {
    constructor(grammar) {
        this.parser = new nearley_1.Parser(nearley_1.Grammar.fromCompiled(grammar));
    }
    read(data) {
        return new Promise((resolve, reject) => {
            try {
                const result = this.parser.feed(data).results[0];
                resolve(result);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = NearleyBasedReader;


/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(4);
const DatMeta_1 = __webpack_require__(2);
class DATReader {
    static parse(data) {
        let starsInFile = 0;
        const header = data.toString('utf-8', 0, DatMeta_1.default.FILE_HEADER.length);
        const version = data.readUInt16LE(DatMeta_1.default.FILE_HEADER.length);
        if (header !== DatMeta_1.default.FILE_HEADER) {
            throw new Error('Wrong file signature');
        }
        else if (version !== DatMeta_1.default.VERSION) {
            throw new Error('Wrong file version');
        }
        else {
            starsInFile = data.readUInt32LE(DatMeta_1.default.FILE_HEADER.length + 2);
        }
        let result = [];
        let starNumber = 0;
        while (starNumber < starsInFile) {
            let offset = DatMeta_1.default.HEADER_OFFSET + starNumber * 20;
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
    read(buffer) {
        return new Promise((resolve, reject) => {
            try {
                return resolve(DATReader.parse(buffer));
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = DATReader;


/***/ }),
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ConfigWriter_1 = __webpack_require__(5);
exports.ConfigWriter = ConfigWriter_1.default;
const STCWriter_1 = __webpack_require__(17);
exports.STCWriter = STCWriter_1.default;
const SSCWriter_1 = __webpack_require__(18);
exports.SSCWriter = SSCWriter_1.default;
const DSCWriter_1 = __webpack_require__(19);
exports.DSCWriter = DSCWriter_1.default;
const CFGWriter_1 = __webpack_require__(20);
exports.CFGWriter = CFGWriter_1.default;
const DATWriter_1 = __webpack_require__(21);
exports.DATWriter = DATWriter_1.default;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isObject(value) {
    const type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}
function isArray(value) {
    return Array.isArray(value);
}
function isNumber(value) {
    return typeof value == 'number';
}
function isString(value) {
    return typeof value === 'string';
}
class Serializer {
    static stringify(value, indent = 0) {
        if (isObject(value)) {
            if (isArray(value)) {
                return Serializer.writeArray(value, indent);
            }
            else {
                return Serializer.writeObject(value, indent);
            }
        }
        else {
            if (isNumber(value)) {
                return Serializer.writeNumber(value);
            }
            else if (isString(value)) {
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TextWriter_1 = __webpack_require__(3);
const Serializer_1 = __webpack_require__(0);
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TextWriter_1 = __webpack_require__(3);
const Serializer_1 = __webpack_require__(0);
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TextWriter_1 = __webpack_require__(3);
const Serializer_1 = __webpack_require__(0);
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ConfigWriter_1 = __webpack_require__(5);
class DSCWriter extends ConfigWriter_1.default {
    writeHeader(value) {
        return 'Configuration ';
    }
}
exports.default = DSCWriter;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BinaryWriter_1 = __webpack_require__(22);
const DatMeta_1 = __webpack_require__(2);
const utils_1 = __webpack_require__(4);
class DATWriter extends BinaryWriter_1.default {
    process(items) {
        const header = DatMeta_1.default.FILE_HEADER;
        const version = DatMeta_1.default.VERSION;
        const itemsCount = items.length;
        const headerOffset = header.length + 6;
        const buffer = Buffer.alloc(headerOffset + itemsCount * 20);
        buffer.write(header, 0);
        buffer.writeUInt16LE(version, DatMeta_1.default.FILE_HEADER.length);
        buffer.writeUInt32LE(itemsCount, DatMeta_1.default.FILE_HEADER.length + 2);
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BinaryWriter {
    write(type, items) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.process(items));
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = BinaryWriter;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CFGGrammar = __webpack_require__(24);
const DSCGrammar = __webpack_require__(25);
const SSCGrammar = __webpack_require__(26);
const STCGrammar = __webpack_require__(27);
exports.default = {
    CFGGrammar,
    DSCGrammar,
    SSCGrammar,
    STCGrammar
};


/***/ }),
/* 24 */
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
  const moo = __webpack_require__(1)

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
    {"name": "CONFIG", "symbols": ["CONFIG_KEYWORD", "CONFIG_DESCRIPTION"], "postprocess":  ([keyword, params]) => {
          debugger
          return params
        } },
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
/* 25 */
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
  const moo = __webpack_require__(1)

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
/* 26 */
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
  const moo = __webpack_require__(1)

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
/* 27 */
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
  const moo = __webpack_require__(1)

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const FormatsChecker_1 = __webpack_require__(29);
exports.FormatsChecker = FormatsChecker_1.FormatsChecker;
exports.FormatType = FormatsChecker_1.FormatType;


/***/ }),
/* 29 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2IxOTlmYzlmZGEyMjk1ZTk2YTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlcmlhbGl6ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vby9tb28uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0RhdE1ldGEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1dyaXRlci9UZXh0V3JpdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL0NvbmZpZ1dyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2VsaW8vQ2VsaW8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0luamVjdG9yL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9JbmplY3Rvci9JbmplY3Rvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVhZGVyL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9SZWFkZXIvTmVhcmxleUJhc2VkUmVhZGVyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZWFybGV5L2xpYi9uZWFybGV5LmpzIiwid2VicGFjazovLy8uL3NyYy9SZWFkZXIvREFUUmVhZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kZWNvZGVTcGVjdHJhbENsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9lbmNvZGVTcGVjdHJhbENsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy9Xcml0ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlcmlhbGl6ZXIvU2VyaWFsaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL1NUQ1dyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL1NTQ1dyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL0RTQ1dyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL0NGR1dyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL0RBVFdyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL0JpbmFyeVdyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhbW1hci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhbW1hci9jZmdwYXJzZXIubmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dyYW1tYXIvZHNjcGFyc2VyLm5lIiwid2VicGFjazovLy8uL3NyYy9ncmFtbWFyL3NzY3BhcnNlci5uZSIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhbW1hci9zdGNwYXJzZXIubmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Zvcm1hdHNDaGVja2VyL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9Gb3JtYXRzQ2hlY2tlci9Gb3JtYXRzQ2hlY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEsNkNBQXFDO0FBR25DLHFCQUhLLG9CQUFVLENBR0w7Ozs7Ozs7QUNIWjtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUN0RCxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxpQkFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTdELElBQUksTUFBTSxHQUFHLFlBQVk7UUFFekIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNwQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDeEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUNuRSxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDO1lBQzdELE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7WUFDL0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQztZQUNsRSxNQUFNLENBQUMsYUFBYSxDQUFDLDJCQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7WUFDOUYsTUFBTSxJQUFJLEVBQUU7UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU07SUFDZixDQUFDO0NBQ0Y7QUFF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LFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBRSxTQUFpQjtRQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTO1FBQzdCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSTtRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU07UUFDMUIsQ0FBQztJQUNILENBQUM7O0FBdkJjLDZCQUFjLEdBQUc7SUFDOUIsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQ2xDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztDQUNoQjtBQXdCRCx3Q0FBYyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3YjE5OWZjOWZkYTIyOTVlOTZhNiIsImltcG9ydCBTZXJpYWxpemVyIGZyb20gJy4vU2VyaWFsaXplcidcclxuXHJcbmV4cG9ydCB7XHJcbiAgU2VyaWFsaXplclxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TZXJpYWxpemVyL2luZGV4LnRzIiwiKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZmFjdG9yeSkgLyogZ2xvYmFsIGRlZmluZSAqL1xuICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcbiAgfSBlbHNlIHtcbiAgICByb290Lm1vbyA9IGZhY3RvcnkoKVxuICB9XG59KHRoaXMsIGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuXG4gIC8vIHBvbHlmaWxsIGFzc2lnbigpLCBzbyB3ZSBzdXBwb3J0IElFOStcbiAgdmFyIGFzc2lnbiA9IHR5cGVvZiBPYmplY3QuYXNzaWduID09PSAnZnVuY3Rpb24nID8gT2JqZWN0LmFzc2lnbiA6XG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmFzc2lnblxuICAgIGZ1bmN0aW9uKHRhcmdldCwgc291cmNlcykge1xuICAgICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RhcmdldCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgICAgIH1cbiAgICAgIHRhcmdldCA9IE9iamVjdCh0YXJnZXQpXG5cbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cbiAgICAgICAgaWYgKHNvdXJjZSA9PSBudWxsKSBjb250aW51ZVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0YXJnZXRcbiAgICB9XG5cbiAgdmFyIGhhc1N0aWNreSA9IHR5cGVvZiBuZXcgUmVnRXhwKCkuc3RpY2t5ID09PSAnYm9vbGVhbidcblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIGZ1bmN0aW9uIGlzUmVnRXhwKG8pIHsgcmV0dXJuIG8gJiYgby5jb25zdHJ1Y3RvciA9PT0gUmVnRXhwIH1cbiAgZnVuY3Rpb24gaXNPYmplY3QobykgeyByZXR1cm4gbyAmJiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgby5jb25zdHJ1Y3RvciAhPT0gUmVnRXhwICYmICFBcnJheS5pc0FycmF5KG8pIH1cblxuICBmdW5jdGlvbiByZUVzY2FwZShzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJylcbiAgfVxuICBmdW5jdGlvbiByZUdyb3VwcyhzKSB7XG4gICAgdmFyIHJlID0gbmV3IFJlZ0V4cCgnfCcgKyBzKVxuICAgIHJldHVybiByZS5leGVjKCcnKS5sZW5ndGggLSAxXG4gIH1cbiAgZnVuY3Rpb24gcmVDYXB0dXJlKHMpIHtcbiAgICByZXR1cm4gJygnICsgcyArICcpJ1xuICB9XG4gIGZ1bmN0aW9uIHJlVW5pb24ocmVnZXhwcykge1xuICAgIHZhciBzb3VyY2UgPSAgcmVnZXhwcy5tYXAoZnVuY3Rpb24ocykge1xuICAgICAgcmV0dXJuIFwiKD86XCIgKyBzICsgXCIpXCJcbiAgICB9KS5qb2luKCd8JylcbiAgICByZXR1cm4gXCIoPzpcIiArIHNvdXJjZSArIFwiKVwiXG4gIH1cblxuICBmdW5jdGlvbiByZWdleHBPckxpdGVyYWwob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gJyg/OicgKyByZUVzY2FwZShvYmopICsgJyknXG5cbiAgICB9IGVsc2UgaWYgKGlzUmVnRXhwKG9iaikpIHtcbiAgICAgIC8vIFRPRE86IGNvbnNpZGVyIC91IHN1cHBvcnRcbiAgICAgIGlmIChvYmouaWdub3JlQ2FzZSkgeyB0aHJvdyBuZXcgRXJyb3IoJ1JlZ0V4cCAvaSBmbGFnIG5vdCBhbGxvd2VkJykgfVxuICAgICAgaWYgKG9iai5nbG9iYWwpIHsgdGhyb3cgbmV3IEVycm9yKCdSZWdFeHAgL2cgZmxhZyBpcyBpbXBsaWVkJykgfVxuICAgICAgaWYgKG9iai5zdGlja3kpIHsgdGhyb3cgbmV3IEVycm9yKCdSZWdFeHAgL3kgZmxhZyBpcyBpbXBsaWVkJykgfVxuICAgICAgaWYgKG9iai5tdWx0aWxpbmUpIHsgdGhyb3cgbmV3IEVycm9yKCdSZWdFeHAgL20gZmxhZyBpcyBpbXBsaWVkJykgfVxuICAgICAgcmV0dXJuIG9iai5zb3VyY2VcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBhIHBhdHRlcm46ICcgKyBvYmopXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0VG9SdWxlcyhvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdClcbiAgICB2YXIgcmVzdWx0ID0gW11cbiAgICBmb3IgKHZhciBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgIHZhciB0aGluZyA9IG9iamVjdFtrZXldXG4gICAgICB2YXIgcnVsZXMgPSBBcnJheS5pc0FycmF5KHRoaW5nKSA/IHRoaW5nIDogW3RoaW5nXVxuICAgICAgdmFyIG1hdGNoID0gW11cbiAgICAgIHJ1bGVzLmZvckVhY2goZnVuY3Rpb24ocnVsZSkge1xuICAgICAgICBpZiAoaXNPYmplY3QocnVsZSkpIHtcbiAgICAgICAgICBpZiAobWF0Y2gubGVuZ3RoKSByZXN1bHQucHVzaChydWxlT3B0aW9ucyhrZXksIG1hdGNoKSlcbiAgICAgICAgICByZXN1bHQucHVzaChydWxlT3B0aW9ucyhrZXksIHJ1bGUpKVxuICAgICAgICAgIG1hdGNoID0gW11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXRjaC5wdXNoKHJ1bGUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZiAobWF0Y2gubGVuZ3RoKSByZXN1bHQucHVzaChydWxlT3B0aW9ucyhrZXksIG1hdGNoKSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZnVuY3Rpb24gYXJyYXlUb1J1bGVzKGFycmF5KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgZm9yICh2YXIgaT0wOyBpPGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgb2JqID0gYXJyYXlbaV1cbiAgICAgIGlmICghb2JqLm5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSdWxlIGhhcyBubyBuYW1lOiAnICsgSlNPTi5zdHJpbmdpZnkob2JqKSlcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHJ1bGVPcHRpb25zKG9iai5uYW1lLCBvYmopKVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBmdW5jdGlvbiBydWxlT3B0aW9ucyhuYW1lLCBvYmopIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShvYmopIHx8IGlzUmVnRXhwKG9iaikpIHtcbiAgICAgIG9iaiA9IHsgbWF0Y2g6IG9iaiB9XG4gICAgfVxuXG4gICAgLy8gbmIuIGVycm9yIGltcGxpZXMgbGluZUJyZWFrc1xuICAgIHZhciBvcHRpb25zID0gYXNzaWduKHtcbiAgICAgIHRva2VuVHlwZTogbmFtZSxcbiAgICAgIGxpbmVCcmVha3M6ICEhb2JqLmVycm9yLFxuICAgICAgcG9wOiBmYWxzZSxcbiAgICAgIG5leHQ6IG51bGwsXG4gICAgICBwdXNoOiBudWxsLFxuICAgICAgZXJyb3I6IGZhbHNlLFxuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBnZXRUeXBlOiBudWxsLFxuICAgIH0sIG9iailcblxuICAgIC8vIGNvbnZlcnQgdG8gYXJyYXlcbiAgICB2YXIgbWF0Y2ggPSBvcHRpb25zLm1hdGNoXG4gICAgb3B0aW9ucy5tYXRjaCA9IEFycmF5LmlzQXJyYXkobWF0Y2gpID8gbWF0Y2ggOiBtYXRjaCA/IFttYXRjaF0gOiBbXVxuICAgIG9wdGlvbnMubWF0Y2guc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gaXNSZWdFeHAoYSkgJiYgaXNSZWdFeHAoYikgPyAwXG4gICAgICAgICAgIDogaXNSZWdFeHAoYikgPyAtMSA6IGlzUmVnRXhwKGEpID8gKzEgOiBiLmxlbmd0aCAtIGEubGVuZ3RoXG4gICAgfSlcbiAgICBpZiAob3B0aW9ucy5rZXl3b3Jkcykge1xuICAgICAgb3B0aW9ucy5nZXRUeXBlID0ga2V5d29yZFRyYW5zZm9ybShvcHRpb25zLmtleXdvcmRzKVxuICAgIH1cbiAgICByZXR1cm4gb3B0aW9uc1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcGlsZVJ1bGVzKHJ1bGVzLCBoYXNTdGF0ZXMpIHtcbiAgICBydWxlcyA9IEFycmF5LmlzQXJyYXkocnVsZXMpID8gYXJyYXlUb1J1bGVzKHJ1bGVzKSA6IG9iamVjdFRvUnVsZXMocnVsZXMpXG5cbiAgICB2YXIgZXJyb3JSdWxlID0gbnVsbFxuICAgIHZhciBncm91cHMgPSBbXVxuICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgZm9yICh2YXIgaT0wOyBpPHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHJ1bGVzW2ldXG5cbiAgICAgIGlmIChvcHRpb25zLmVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvclJ1bGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdWx0aXBsZSBlcnJvciBydWxlcyBub3QgYWxsb3dlZDogKGZvciB0b2tlbiAnXCIgKyBvcHRpb25zLnRva2VuVHlwZSArIFwiJylcIilcbiAgICAgICAgfVxuICAgICAgICBlcnJvclJ1bGUgPSBvcHRpb25zXG4gICAgICB9XG5cbiAgICAgIC8vIHNraXAgcnVsZXMgd2l0aCBubyBtYXRjaFxuICAgICAgaWYgKG9wdGlvbnMubWF0Y2gubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBncm91cHMucHVzaChvcHRpb25zKVxuXG4gICAgICAvLyBjb252ZXJ0IHRvIFJlZ0V4cFxuICAgICAgdmFyIHBhdCA9IHJlVW5pb24ob3B0aW9ucy5tYXRjaC5tYXAocmVnZXhwT3JMaXRlcmFsKSlcblxuICAgICAgLy8gdmFsaWRhdGVcbiAgICAgIHZhciByZWdleHAgPSBuZXcgUmVnRXhwKHBhdClcbiAgICAgIGlmIChyZWdleHAudGVzdChcIlwiKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWdFeHAgbWF0Y2hlcyBlbXB0eSBzdHJpbmc6IFwiICsgcmVnZXhwKVxuICAgICAgfVxuICAgICAgdmFyIGdyb3VwQ291bnQgPSByZUdyb3VwcyhwYXQpXG4gICAgICBpZiAoZ3JvdXBDb3VudCA+IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVnRXhwIGhhcyBjYXB0dXJlIGdyb3VwczogXCIgKyByZWdleHAgKyBcIlxcblVzZSAoPzog4oCmICkgaW5zdGVhZFwiKVxuICAgICAgfVxuICAgICAgaWYgKCFoYXNTdGF0ZXMgJiYgKG9wdGlvbnMucG9wIHx8IG9wdGlvbnMucHVzaCB8fCBvcHRpb25zLm5leHQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlN0YXRlLXN3aXRjaGluZyBvcHRpb25zIGFyZSBub3QgYWxsb3dlZCBpbiBzdGF0ZWxlc3MgbGV4ZXJzIChmb3IgdG9rZW4gJ1wiICsgb3B0aW9ucy50b2tlblR5cGUgKyBcIicpXCIpXG4gICAgICB9XG5cbiAgICAgIC8vIHRyeSBhbmQgZGV0ZWN0IHJ1bGVzIG1hdGNoaW5nIG5ld2xpbmVzXG4gICAgICBpZiAoIW9wdGlvbnMubGluZUJyZWFrcyAmJiByZWdleHAudGVzdCgnXFxuJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSdWxlIHNob3VsZCBkZWNsYXJlIGxpbmVCcmVha3M6ICcgKyByZWdleHApXG4gICAgICB9XG5cbiAgICAgIC8vIHN0b3JlIHJlZ2V4XG4gICAgICBwYXJ0cy5wdXNoKHJlQ2FwdHVyZShwYXQpKVxuICAgIH1cblxuICAgIHZhciBzdWZmaXggPSBoYXNTdGlja3kgPyAnJyA6ICd8KD86KSdcbiAgICB2YXIgZmxhZ3MgPSBoYXNTdGlja3kgPyAneW0nIDogJ2dtJ1xuICAgIHZhciBjb21iaW5lZCA9IG5ldyBSZWdFeHAocmVVbmlvbihwYXJ0cykgKyBzdWZmaXgsIGZsYWdzKVxuXG4gICAgcmV0dXJuIHtyZWdleHA6IGNvbWJpbmVkLCBncm91cHM6IGdyb3VwcywgZXJyb3I6IGVycm9yUnVsZX1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBpbGUocnVsZXMpIHtcbiAgICB2YXIgcmVzdWx0ID0gY29tcGlsZVJ1bGVzKHJ1bGVzKVxuICAgIHJldHVybiBuZXcgTGV4ZXIoe3N0YXJ0OiByZXN1bHR9LCAnc3RhcnQnKVxuICB9XG5cbiAgZnVuY3Rpb24gY29tcGlsZVN0YXRlcyhzdGF0ZXMsIHN0YXJ0KSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzdGF0ZXMpXG4gICAgaWYgKCFzdGFydCkgc3RhcnQgPSBrZXlzWzBdXG5cbiAgICB2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgIGZvciAodmFyIGk9MDsgaTxrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgbWFwW2tleV0gPSBjb21waWxlUnVsZXMoc3RhdGVzW2tleV0sIHRydWUpXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaT0wOyBpPGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBncm91cHMgPSBtYXBba2V5c1tpXV0uZ3JvdXBzXG4gICAgICBmb3IgKHZhciBqPTA7IGo8Z3JvdXBzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBnID0gZ3JvdXBzW2pdXG4gICAgICAgIHZhciBzdGF0ZSA9IGcgJiYgKGcucHVzaCB8fCBnLm5leHQpXG4gICAgICAgIGlmIChzdGF0ZSAmJiAhbWFwW3N0YXRlXSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3Npbmcgc3RhdGUgJ1wiICsgc3RhdGUgKyBcIicgKGluIHRva2VuICdcIiArIGcudG9rZW5UeXBlICsgXCInIG9mIHN0YXRlICdcIiArIGtleXNbaV0gKyBcIicpXCIpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGcgJiYgZy5wb3AgJiYgK2cucG9wICE9PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicG9wIG11c3QgYmUgMSAoaW4gdG9rZW4gJ1wiICsgZy50b2tlblR5cGUgKyBcIicgb2Ygc3RhdGUgJ1wiICsga2V5c1tpXSArIFwiJylcIilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgTGV4ZXIobWFwLCBzdGFydClcbiAgfVxuXG4gIGZ1bmN0aW9uIGtleXdvcmRUcmFuc2Zvcm0obWFwKSB7XG4gICAgdmFyIHJldmVyc2VNYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgdmFyIGJ5TGVuZ3RoID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgIHZhciB0eXBlcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG1hcClcbiAgICBmb3IgKHZhciBpPTA7IGk8dHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB0b2tlblR5cGUgPSB0eXBlc1tpXVxuICAgICAgdmFyIGl0ZW0gPSBtYXBbdG9rZW5UeXBlXVxuICAgICAgdmFyIGtleXdvcmRMaXN0ID0gQXJyYXkuaXNBcnJheShpdGVtKSA/IGl0ZW0gOiBbaXRlbV1cbiAgICAgIGtleXdvcmRMaXN0LmZvckVhY2goZnVuY3Rpb24oa2V5d29yZCkge1xuICAgICAgICAoYnlMZW5ndGhba2V5d29yZC5sZW5ndGhdID0gYnlMZW5ndGhba2V5d29yZC5sZW5ndGhdIHx8IFtdKS5wdXNoKGtleXdvcmQpXG4gICAgICAgIGlmICh0eXBlb2Yga2V5d29yZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJrZXl3b3JkIG11c3QgYmUgc3RyaW5nIChpbiBrZXl3b3JkICdcIiArIHRva2VuVHlwZSArIFwiJylcIilcbiAgICAgICAgfVxuICAgICAgICByZXZlcnNlTWFwW2tleXdvcmRdID0gdG9rZW5UeXBlXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIGZhc3Qgc3RyaW5nIGxvb2t1cFxuICAgIC8vIGh0dHBzOi8vanNwZXJmLmNvbS9zdHJpbmctbG9va3Vwc1xuICAgIGZ1bmN0aW9uIHN0cih4KSB7IHJldHVybiBKU09OLnN0cmluZ2lmeSh4KSB9XG4gICAgdmFyIHNvdXJjZSA9ICcnXG4gICAgc291cmNlICs9ICcoZnVuY3Rpb24odmFsdWUpIHtcXG4nXG4gICAgc291cmNlICs9ICdzd2l0Y2ggKHZhbHVlLmxlbmd0aCkge1xcbidcbiAgICBmb3IgKHZhciBsZW5ndGggaW4gYnlMZW5ndGgpIHtcbiAgICAgIHZhciBrZXl3b3JkcyA9IGJ5TGVuZ3RoW2xlbmd0aF1cbiAgICAgIHNvdXJjZSArPSAnY2FzZSAnICsgbGVuZ3RoICsgJzpcXG4nXG4gICAgICBzb3VyY2UgKz0gJ3N3aXRjaCAodmFsdWUpIHtcXG4nXG4gICAgICBrZXl3b3Jkcy5mb3JFYWNoKGZ1bmN0aW9uKGtleXdvcmQpIHtcbiAgICAgICAgdmFyIHRva2VuVHlwZSA9IHJldmVyc2VNYXBba2V5d29yZF1cbiAgICAgICAgc291cmNlICs9ICdjYXNlICcgKyBzdHIoa2V5d29yZCkgKyAnOiByZXR1cm4gJyArIHN0cih0b2tlblR5cGUpICsgJ1xcbidcbiAgICAgIH0pXG4gICAgICBzb3VyY2UgKz0gJ31cXG4nXG4gICAgfVxuICAgIHNvdXJjZSArPSAnfVxcbidcbiAgICBzb3VyY2UgKz0gJ30pJ1xuICAgIHJldHVybiBldmFsKHNvdXJjZSkgLy8gZ2V0VHlwZVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICB2YXIgTGV4ZXIgPSBmdW5jdGlvbihzdGF0ZXMsIHN0YXRlKSB7XG4gICAgdGhpcy5zdGFydFN0YXRlID0gc3RhdGVcbiAgICB0aGlzLnN0YXRlcyA9IHN0YXRlc1xuICAgIHRoaXMuYnVmZmVyID0gJydcbiAgICB0aGlzLnN0YWNrID0gW11cbiAgICB0aGlzLnJlc2V0KClcbiAgfVxuXG4gIExleGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKGRhdGEsIGluZm8pIHtcbiAgICB0aGlzLmJ1ZmZlciA9IGRhdGEgfHwgJydcbiAgICB0aGlzLmluZGV4ID0gMFxuICAgIHRoaXMubGluZSA9IGluZm8gPyBpbmZvLmxpbmUgOiAxXG4gICAgdGhpcy5jb2wgPSBpbmZvID8gaW5mby5jb2wgOiAxXG4gICAgdGhpcy5zZXRTdGF0ZShpbmZvID8gaW5mby5zdGF0ZSA6IHRoaXMuc3RhcnRTdGF0ZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgTGV4ZXIucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluZTogdGhpcy5saW5lLFxuICAgICAgY29sOiB0aGlzLmNvbCxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgIH1cbiAgfVxuXG4gIExleGVyLnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgaWYgKCFzdGF0ZSB8fCB0aGlzLnN0YXRlID09PSBzdGF0ZSkgcmV0dXJuXG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlXG4gICAgdmFyIGluZm8gPSB0aGlzLnN0YXRlc1tzdGF0ZV1cbiAgICB0aGlzLmdyb3VwcyA9IGluZm8uZ3JvdXBzXG4gICAgdGhpcy5lcnJvciA9IGluZm8uZXJyb3IgfHwge2xpbmVCcmVha3M6IHRydWUsIHNob3VsZFRocm93OiB0cnVlfVxuICAgIHRoaXMucmUgPSBpbmZvLnJlZ2V4cFxuICB9XG5cbiAgTGV4ZXIucHJvdG90eXBlLnBvcFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLnN0YWNrLnBvcCgpKVxuICB9XG5cbiAgTGV4ZXIucHJvdG90eXBlLnB1c2hTdGF0ZSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgdGhpcy5zdGFjay5wdXNoKHRoaXMuc3RhdGUpXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSlcbiAgfVxuXG4gIExleGVyLnByb3RvdHlwZS5fZWF0ID0gaGFzU3RpY2t5ID8gZnVuY3Rpb24ocmUpIHsgLy8gYXNzdW1lIHJlIGlzIC95XG4gICAgcmV0dXJuIHJlLmV4ZWModGhpcy5idWZmZXIpXG4gIH0gOiBmdW5jdGlvbihyZSkgeyAvLyBhc3N1bWUgcmUgaXMgL2dcbiAgICB2YXIgbWF0Y2ggPSByZS5leGVjKHRoaXMuYnVmZmVyKVxuICAgIC8vIHdpbGwgYWx3YXlzIG1hdGNoLCBzaW5jZSB3ZSB1c2VkIHRoZSB8KD86KSB0cmlja1xuICAgIGlmIChtYXRjaFswXS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHJldHVybiBtYXRjaFxuICB9XG5cbiAgTGV4ZXIucHJvdG90eXBlLl9nZXRHcm91cCA9IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG5cbiAgICB2YXIgZ3JvdXBDb3VudCA9IHRoaXMuZ3JvdXBzLmxlbmd0aFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBDb3VudDsgaSsrKSB7XG4gICAgICBpZiAobWF0Y2hbaSArIDFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGlcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdvb3BzJylcbiAgfVxuXG4gIGZ1bmN0aW9uIHRva2VuVG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVcbiAgfVxuXG4gIExleGVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlID0gdGhpcy5yZVxuICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlclxuXG4gICAgdmFyIGluZGV4ID0gcmUubGFzdEluZGV4ID0gdGhpcy5pbmRleFxuICAgIGlmIChpbmRleCA9PT0gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIC8vIEVPRlxuICAgIH1cblxuICAgIHZhciBtYXRjaCA9IHRoaXMuX2VhdChyZSlcbiAgICB2YXIgaSA9IHRoaXMuX2dldEdyb3VwKG1hdGNoKVxuXG4gICAgdmFyIGdyb3VwLCB0ZXh0XG4gICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICBncm91cCA9IHRoaXMuZXJyb3JcblxuICAgICAgLy8gY29uc3VtZSByZXN0IG9mIGJ1ZmZlclxuICAgICAgdGV4dCA9IGJ1ZmZlci5zbGljZShpbmRleClcblxuICAgIH0gZWxzZSB7XG4gICAgICB0ZXh0ID0gbWF0Y2hbMF1cbiAgICAgIGdyb3VwID0gdGhpcy5ncm91cHNbaV1cbiAgICB9XG5cbiAgICAvLyBjb3VudCBsaW5lIGJyZWFrc1xuICAgIHZhciBsaW5lQnJlYWtzID0gMFxuICAgIGlmIChncm91cC5saW5lQnJlYWtzKSB7XG4gICAgICB2YXIgbWF0Y2hOTCA9IC9cXG4vZ1xuICAgICAgdmFyIG5sID0gMVxuICAgICAgaWYgKHRleHQgPT09ICdcXG4nKSB7XG4gICAgICAgIGxpbmVCcmVha3MgPSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAobWF0Y2hOTC5leGVjKHRleHQpKSB7IGxpbmVCcmVha3MrKzsgbmwgPSBtYXRjaE5MLmxhc3RJbmRleCB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHRva2VuID0ge1xuICAgICAgdHlwZTogKGdyb3VwLmdldFR5cGUgJiYgZ3JvdXAuZ2V0VHlwZSh0ZXh0KSkgfHwgZ3JvdXAudG9rZW5UeXBlLFxuICAgICAgdmFsdWU6IGdyb3VwLnZhbHVlID8gZ3JvdXAudmFsdWUodGV4dCkgOiB0ZXh0LFxuICAgICAgdGV4dDogdGV4dCxcbiAgICAgIHRvU3RyaW5nOiB0b2tlblRvU3RyaW5nLFxuICAgICAgb2Zmc2V0OiBpbmRleCxcbiAgICAgIGxpbmVCcmVha3M6IGxpbmVCcmVha3MsXG4gICAgICBsaW5lOiB0aGlzLmxpbmUsXG4gICAgICBjb2w6IHRoaXMuY29sLFxuICAgIH1cbiAgICAvLyBuYi4gYWRkaW5nIG1vcmUgcHJvcHMgdG8gdG9rZW4gb2JqZWN0IHdpbGwgbWFrZSBWOCBzYWQhXG5cbiAgICB2YXIgc2l6ZSA9IHRleHQubGVuZ3RoXG4gICAgdGhpcy5pbmRleCArPSBzaXplXG4gICAgdGhpcy5saW5lICs9IGxpbmVCcmVha3NcbiAgICBpZiAobGluZUJyZWFrcyAhPT0gMCkge1xuICAgICAgdGhpcy5jb2wgPSBzaXplIC0gbmwgKyAxXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29sICs9IHNpemVcbiAgICB9XG4gICAgLy8gdGhyb3csIGlmIG5vIHJ1bGUgd2l0aCB7ZXJyb3I6IHRydWV9XG4gICAgaWYgKGdyb3VwLnNob3VsZFRocm93KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5mb3JtYXRFcnJvcih0b2tlbiwgXCJpbnZhbGlkIHN5bnRheFwiKSlcbiAgICB9XG5cbiAgICBpZiAoZ3JvdXAucG9wKSB0aGlzLnBvcFN0YXRlKClcbiAgICBlbHNlIGlmIChncm91cC5wdXNoKSB0aGlzLnB1c2hTdGF0ZShncm91cC5wdXNoKVxuICAgIGVsc2UgaWYgKGdyb3VwLm5leHQpIHRoaXMuc2V0U3RhdGUoZ3JvdXAubmV4dClcbiAgICByZXR1cm4gdG9rZW5cbiAgfVxuXG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuaXRlcmF0b3IpIHtcbiAgICB2YXIgTGV4ZXJJdGVyYXRvciA9IGZ1bmN0aW9uKGxleGVyKSB7XG4gICAgICB0aGlzLmxleGVyID0gbGV4ZXJcbiAgICB9XG5cbiAgICBMZXhlckl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdG9rZW4gPSB0aGlzLmxleGVyLm5leHQoKVxuICAgICAgcmV0dXJuIHt2YWx1ZTogdG9rZW4sIGRvbmU6ICF0b2tlbn1cbiAgICB9XG5cbiAgICBMZXhlckl0ZXJhdG9yLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIExleGVyLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IExleGVySXRlcmF0b3IodGhpcylcbiAgICB9XG4gIH1cblxuICBMZXhlci5wcm90b3R5cGUuZm9ybWF0RXJyb3IgPSBmdW5jdGlvbih0b2tlbiwgbWVzc2FnZSkge1xuICAgIHZhciB2YWx1ZSA9IHRva2VuLnZhbHVlXG4gICAgdmFyIGluZGV4ID0gdG9rZW4ub2Zmc2V0XG4gICAgdmFyIGVvbCA9IHRva2VuLmxpbmVCcmVha3MgPyB2YWx1ZS5pbmRleE9mKCdcXG4nKSA6IHZhbHVlLmxlbmd0aFxuICAgIHZhciBzdGFydCA9IE1hdGgubWF4KDAsIGluZGV4IC0gdG9rZW4uY29sICsgMSlcbiAgICB2YXIgZmlyc3RMaW5lID0gdGhpcy5idWZmZXIuc3Vic3RyaW5nKHN0YXJ0LCBpbmRleCArIGVvbClcbiAgICBtZXNzYWdlICs9IFwiIGF0IGxpbmUgXCIgKyB0b2tlbi5saW5lICsgXCIgY29sIFwiICsgdG9rZW4uY29sICsgXCI6XFxuXFxuXCJcbiAgICBtZXNzYWdlICs9IFwiICBcIiArIGZpcnN0TGluZSArIFwiXFxuXCJcbiAgICBtZXNzYWdlICs9IFwiICBcIiArIEFycmF5KHRva2VuLmNvbCkuam9pbihcIiBcIikgKyBcIl5cIlxuICAgIHJldHVybiBtZXNzYWdlXG4gIH1cblxuICBMZXhlci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IExleGVyKHRoaXMuc3RhdGVzLCB0aGlzLnN0YXRlKVxuICB9XG5cbiAgTGV4ZXIucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKHRva2VuVHlwZSkge1xuICAgIGZvciAodmFyIHMgaW4gdGhpcy5zdGF0ZXMpIHtcbiAgICAgIHZhciBncm91cHMgPSB0aGlzLnN0YXRlc1tzXS5ncm91cHNcbiAgICAgIGZvciAodmFyIGk9MDsgaTxncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGdyb3VwID0gZ3JvdXBzW2ldXG4gICAgICAgIGlmIChncm91cC50b2tlblR5cGUgPT09IHRva2VuVHlwZSkgcmV0dXJuIHRydWVcbiAgICAgICAgaWYgKGdyb3VwLmtleXdvcmRzICYmIGhhc093blByb3BlcnR5LmNhbGwoZ3JvdXAua2V5d29yZHMsIHRva2VuVHlwZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cblxuICByZXR1cm4ge1xuICAgIGNvbXBpbGU6IGNvbXBpbGUsXG4gICAgc3RhdGVzOiBjb21waWxlU3RhdGVzLFxuICAgIGVycm9yOiBPYmplY3QuZnJlZXplKHtlcnJvcjogdHJ1ZX0pLFxuICB9XG5cbn0pKVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9vL21vby5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBNRVRBID0ge1xyXG4gIEZJTEVfSEVBREVSOiAnQ0VMU1RBUlMnLFxyXG4gIFZFUlNJT046IDB4MDEwMCxcclxuICBIRUFERVJfT0ZGU0VUOiAxNFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNRVRBXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9EYXRNZXRhLnRzIiwiaW1wb3J0IEFic3RyYWN0V3JpdGVyIGZyb20gJy4vQWJzdHJhY3RXcml0ZXInXHJcbmltcG9ydCB7IFNlcmlhbGl6ZXIgfSBmcm9tICcuLi9TZXJpYWxpemVyJ1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgVGV4dFdyaXRlciBpbXBsZW1lbnRzIEFic3RyYWN0V3JpdGVyIHtcclxuICB3cml0ZSAodHlwZTogc3RyaW5nLCBpdGVtczogYW55W10pOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLnRyYW5zZm9ybShpdGVtcykpXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtIChpdGVtczogYW55W10pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGl0ZW1zLm1hcChpdGVtID0+IHRoaXMudHJhbnNmb3JtSXRlbShpdGVtKSkuam9pbignXFxuJylcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybUl0ZW0gKGl0ZW06IGFueSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBvYmplY3RIZWFkZXIgPSB0aGlzLndyaXRlSGVhZGVyKGl0ZW0ubWV0YSlcclxuICAgIGNvbnN0IG9iamVjdFByb3BlcnRpZXMgPSBTZXJpYWxpemVyLnN0cmluZ2lmeShpdGVtLnByb3BlcnRpZXMpXHJcbiAgICByZXR1cm4gb2JqZWN0SGVhZGVyICsgJyAnICsgb2JqZWN0UHJvcGVydGllcyArICdcXG4nXHJcbiAgfVxyXG5cclxuICBhYnN0cmFjdCB3cml0ZUhlYWRlciAodmFsdWU6IE9iamVjdCk6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0V3JpdGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Xcml0ZXIvVGV4dFdyaXRlci50cyIsImltcG9ydCBNRVRBIGZyb20gJy4vRGF0TWV0YSdcclxuaW1wb3J0IGRlY29kZVNwZWN0cmFsQ2xhc3MgZnJvbSAnLi9kZWNvZGVTcGVjdHJhbENsYXNzJ1xyXG5pbXBvcnQgZW5jb2RlU3BlY3RyYWxDbGFzcyBmcm9tICcuL2VuY29kZVNwZWN0cmFsQ2xhc3MnXHJcblxyXG5leHBvcnQge1xyXG4gIE1FVEEsXHJcbiAgZGVjb2RlU3BlY3RyYWxDbGFzcyxcclxuICBlbmNvZGVTcGVjdHJhbENsYXNzXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2luZGV4LnRzIiwiaW1wb3J0IEFic3RyYWN0V3JpdGVyIGZyb20gJy4vQWJzdHJhY3RXcml0ZXInXHJcbmltcG9ydCB7IFNlcmlhbGl6ZXIgfSBmcm9tICcuLi9TZXJpYWxpemVyJ1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgQ29uZmlnV3JpdGVyIGltcGxlbWVudHMgQWJzdHJhY3RXcml0ZXIge1xyXG4gIHdyaXRlICh0eXBlOiBzdHJpbmcsIGNvbmZpZzogYW55KTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoU2VyaWFsaXplci5zdHJpbmdpZnkoY29uZmlnKSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWdXcml0ZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1dyaXRlci9Db25maWdXcml0ZXIudHMiLCJpbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJy4uL0luamVjdG9yJ1xyXG5cclxuZXhwb3J0IGNsYXNzIENlbGlvIHtcclxuICBzdGF0aWMgcmVhZCAoYnVmZmVyOiBCdWZmZXIsIHR5cGU6IHN0cmluZyk6IFByb21pc2U8YW55W10+IHtcclxuICAgIGNvbnN0IFJlYWRlciA9IEluamVjdG9yLm1ha2VSZWFkZXIodHlwZSlcclxuXHJcbiAgICByZXR1cm4gUmVhZGVyLnJlYWQoYnVmZmVyKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHdyaXRlICh0eXBlOiBzdHJpbmcsIGl0ZW1zOiBhbnlbXSk6IFByb21pc2U8QnVmZmVyIHwgc3RyaW5nPiB7XHJcbiAgICBjb25zdCBXcml0ZXIgPSBJbmplY3Rvci5tYWtlV3JpdGVyKHR5cGUpXHJcblxyXG4gICAgcmV0dXJuIFdyaXRlci53cml0ZSh0eXBlLCBpdGVtcylcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NlbGlvL0NlbGlvLnRzIiwiaW1wb3J0IEluamVjdG9yIGZyb20gJy4vSW5qZWN0b3InXHJcblxyXG5leHBvcnQge1xyXG4gIEluamVjdG9yXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0luamVjdG9yL2luZGV4LnRzIiwiaW1wb3J0IHsgQWJzdHJhY3RSZWFkZXIsIERBVFJlYWRlciwgTmVhcmxleUJhc2VkUmVhZGVyIH0gZnJvbSAnLi4vUmVhZGVyJ1xyXG5pbXBvcnQgeyBBYnN0cmFjdFdyaXRlciwgU1RDV3JpdGVyLCBTU0NXcml0ZXIsIERTQ1dyaXRlciwgQ0ZHV3JpdGVyLCBEQVRXcml0ZXIgfSBmcm9tICcuLi9Xcml0ZXInXHJcbmltcG9ydCBHcmFtbWFycyBmcm9tICcuLi9ncmFtbWFyJ1xyXG5pbXBvcnQgeyBGb3JtYXRzQ2hlY2tlciwgRm9ybWF0VHlwZSB9IGZyb20gJy4uL0Zvcm1hdHNDaGVja2VyJ1xyXG5cclxuY2xhc3MgSW5qZWN0b3Ige1xyXG4gIHN0YXRpYyBtYWtlUmVhZGVyIChleHRlbnNpb246IHN0cmluZyk6IEFic3RyYWN0UmVhZGVyIHtcclxuICAgIHN3aXRjaCAoRm9ybWF0c0NoZWNrZXIuZm9ybWF0VHlwZShleHRlbnNpb24pKSB7XHJcbiAgICAgIGNhc2UgRm9ybWF0VHlwZS5CSU5BUlk6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEQVRSZWFkZXIoKVxyXG5cclxuICAgICAgY2FzZSBGb3JtYXRUeXBlLlRFWFQ6XHJcbiAgICAgICAgY29uc3QgR3JhbW1hciA9IGV4dGVuc2lvbi50b1VwcGVyQ2FzZSgpICsgJ0dyYW1tYXInXHJcbiAgICAgICAgcmV0dXJuIG5ldyBOZWFybGV5QmFzZWRSZWFkZXIoR3JhbW1hcnNbR3JhbW1hcl0pXHJcblxyXG4gICAgICBjYXNlIEZvcm1hdFR5cGUuSU5DT1JSRUNUOlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW5jb3JyZWN0IGZpbGUgZm9ybWF0YClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBtYWtlV3JpdGVyIChleHRlbnNpb246IHN0cmluZyk6IEFic3RyYWN0V3JpdGVyIHtcclxuICAgIHN3aXRjaCAoRm9ybWF0c0NoZWNrZXIuZm9ybWF0VHlwZShleHRlbnNpb24pKSB7XHJcbiAgICAgIGNhc2UgRm9ybWF0VHlwZS5CSU5BUlk6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEQVRXcml0ZXIoKVxyXG5cclxuICAgICAgY2FzZSBGb3JtYXRUeXBlLlRFWFQ6XHJcbiAgICAgICAgc3dpdGNoIChleHRlbnNpb24pIHtcclxuICAgICAgICAgIGNhc2UgJ3N0Yyc6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU1RDV3JpdGVyKClcclxuXHJcbiAgICAgICAgICBjYXNlICdzc2MnOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNTQ1dyaXRlcigpXHJcblxyXG4gICAgICAgICAgY2FzZSAnZHNjJzpcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEU0NXcml0ZXIoKVxyXG5cclxuICAgICAgICAgIGNhc2UgJ2NmZyc6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ0ZHV3JpdGVyKClcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEluY29ycmVjdCBmaWxlIGZvcm1hdGApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgY2FzZSBGb3JtYXRUeXBlLklOQ09SUkVDVDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEluY29ycmVjdCBmaWxlIGZvcm1hdGApXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbmplY3RvclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSW5qZWN0b3IvSW5qZWN0b3IudHMiLCJpbXBvcnQgTmVhcmxleUJhc2VkUmVhZGVyIGZyb20gJy4vTmVhcmxleUJhc2VkUmVhZGVyJ1xyXG5pbXBvcnQgREFUUmVhZGVyIGZyb20gJy4vREFUUmVhZGVyJ1xyXG5pbXBvcnQgQWJzdHJhY3RSZWFkZXIgZnJvbSAnLi9BYnN0cmFjdFJlYWRlcidcclxuXHJcbmV4cG9ydCB7XHJcbiAgTmVhcmxleUJhc2VkUmVhZGVyLFxyXG4gIERBVFJlYWRlcixcclxuICBBYnN0cmFjdFJlYWRlcixcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVhZGVyL2luZGV4LnRzIiwiaW1wb3J0IHsgR3JhbW1hciwgUGFyc2VyIH0gZnJvbSAnbmVhcmxleSdcclxuaW1wb3J0IEFic3RyYWN0UmVhZGVyIGZyb20gJy4vQWJzdHJhY3RSZWFkZXInXHJcblxyXG5jbGFzcyBOZWFybGV5QmFzZWRSZWFkZXIgaW1wbGVtZW50cyBBYnN0cmFjdFJlYWRlciB7XHJcbiAgcGFyc2VyOiBhbnlcclxuXHJcbiAgY29uc3RydWN0b3IgKGdyYW1tYXIpIHtcclxuICAgIHRoaXMucGFyc2VyID0gbmV3IFBhcnNlcihHcmFtbWFyLmZyb21Db21waWxlZChncmFtbWFyKSlcclxuICB9XHJcblxyXG4gIHJlYWQgKGRhdGE6IHN0cmluZyk6IFByb21pc2U8YW55W10+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5wYXJzZXIuZmVlZChkYXRhKS5yZXN1bHRzWzBdXHJcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVqZWN0IChlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5lYXJsZXlCYXNlZFJlYWRlclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVhZGVyL05lYXJsZXlCYXNlZFJlYWRlci50cyIsIihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QubmVhcmxleSA9IGZhY3RvcnkoKTtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uKCkge1xuXG5mdW5jdGlvbiBSdWxlKG5hbWUsIHN5bWJvbHMsIHBvc3Rwcm9jZXNzKSB7XG4gICAgdGhpcy5pZCA9ICsrUnVsZS5oaWdoZXN0SWQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnN5bWJvbHMgPSBzeW1ib2xzOyAgICAgICAgLy8gYSBsaXN0IG9mIGxpdGVyYWwgfCByZWdleCBjbGFzcyB8IG5vbnRlcm1pbmFsXG4gICAgdGhpcy5wb3N0cHJvY2VzcyA9IHBvc3Rwcm9jZXNzO1xuICAgIHJldHVybiB0aGlzO1xufVxuUnVsZS5oaWdoZXN0SWQgPSAwO1xuXG5SdWxlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKHdpdGhDdXJzb3JBdCkge1xuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeVN5bWJvbFNlcXVlbmNlIChlKSB7XG4gICAgICAgIHJldHVybiBlLmxpdGVyYWwgPyBKU09OLnN0cmluZ2lmeShlLmxpdGVyYWwpIDpcbiAgICAgICAgICAgICAgIGUudHlwZSA/ICclJyArIGUudHlwZSA6IGUudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdmFyIHN5bWJvbFNlcXVlbmNlID0gKHR5cGVvZiB3aXRoQ3Vyc29yQXQgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN5bWJvbHMubWFwKHN0cmluZ2lmeVN5bWJvbFNlcXVlbmNlKS5qb2luKCcgJylcbiAgICAgICAgICAgICAgICAgICAgICAgICA6ICggICB0aGlzLnN5bWJvbHMuc2xpY2UoMCwgd2l0aEN1cnNvckF0KS5tYXAoc3RyaW5naWZ5U3ltYm9sU2VxdWVuY2UpLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiIOKXjyBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIHRoaXMuc3ltYm9scy5zbGljZSh3aXRoQ3Vyc29yQXQpLm1hcChzdHJpbmdpZnlTeW1ib2xTZXF1ZW5jZSkuam9pbignICcpICAgICApO1xuICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIiDihpIgXCIgKyBzeW1ib2xTZXF1ZW5jZTtcbn1cblxuXG4vLyBhIFN0YXRlIGlzIGEgcnVsZSBhdCBhIHBvc2l0aW9uIGZyb20gYSBnaXZlbiBzdGFydGluZyBwb2ludCBpbiB0aGUgaW5wdXQgc3RyZWFtIChyZWZlcmVuY2UpXG5mdW5jdGlvbiBTdGF0ZShydWxlLCBkb3QsIHJlZmVyZW5jZSwgd2FudGVkQnkpIHtcbiAgICB0aGlzLnJ1bGUgPSBydWxlO1xuICAgIHRoaXMuZG90ID0gZG90O1xuICAgIHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIHRoaXMud2FudGVkQnkgPSB3YW50ZWRCeTtcbiAgICB0aGlzLmlzQ29tcGxldGUgPSB0aGlzLmRvdCA9PT0gcnVsZS5zeW1ib2xzLmxlbmd0aDtcbn1cblxuU3RhdGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwie1wiICsgdGhpcy5ydWxlLnRvU3RyaW5nKHRoaXMuZG90KSArIFwifSwgZnJvbTogXCIgKyAodGhpcy5yZWZlcmVuY2UgfHwgMCk7XG59O1xuXG5TdGF0ZS5wcm90b3R5cGUubmV4dFN0YXRlID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICB2YXIgc3RhdGUgPSBuZXcgU3RhdGUodGhpcy5ydWxlLCB0aGlzLmRvdCArIDEsIHRoaXMucmVmZXJlbmNlLCB0aGlzLndhbnRlZEJ5KTtcbiAgICBzdGF0ZS5sZWZ0ID0gdGhpcztcbiAgICBzdGF0ZS5yaWdodCA9IGNoaWxkO1xuICAgIGlmIChzdGF0ZS5pc0NvbXBsZXRlKSB7XG4gICAgICAgIHN0YXRlLmRhdGEgPSBzdGF0ZS5idWlsZCgpO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG59O1xuXG5TdGF0ZS5wcm90b3R5cGUuYnVpbGQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBbXTtcbiAgICB2YXIgbm9kZSA9IHRoaXM7XG4gICAgZG8ge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKG5vZGUucmlnaHQuZGF0YSk7XG4gICAgICAgIG5vZGUgPSBub2RlLmxlZnQ7XG4gICAgfSB3aGlsZSAobm9kZS5sZWZ0KTtcbiAgICBjaGlsZHJlbi5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xufTtcblxuU3RhdGUucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnJ1bGUucG9zdHByb2Nlc3MpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5ydWxlLnBvc3Rwcm9jZXNzKHRoaXMuZGF0YSwgdGhpcy5yZWZlcmVuY2UsIFBhcnNlci5mYWlsKTtcbiAgICB9XG59O1xuXG5cbmZ1bmN0aW9uIENvbHVtbihncmFtbWFyLCBpbmRleCkge1xuICAgIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuc3RhdGVzID0gW107XG4gICAgdGhpcy53YW50cyA9IHt9OyAvLyBzdGF0ZXMgaW5kZXhlZCBieSB0aGUgbm9uLXRlcm1pbmFsIHRoZXkgZXhwZWN0XG4gICAgdGhpcy5zY2FubmFibGUgPSBbXTsgLy8gbGlzdCBvZiBzdGF0ZXMgdGhhdCBleHBlY3QgYSB0b2tlblxuICAgIHRoaXMuY29tcGxldGVkID0ge307IC8vIHN0YXRlcyB0aGF0IGFyZSBudWxsYWJsZVxufVxuXG5cbkNvbHVtbi5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uKG5leHRDb2x1bW4pIHtcbiAgICB2YXIgc3RhdGVzID0gdGhpcy5zdGF0ZXM7XG4gICAgdmFyIHdhbnRzID0gdGhpcy53YW50cztcbiAgICB2YXIgY29tcGxldGVkID0gdGhpcy5jb21wbGV0ZWQ7XG5cbiAgICBmb3IgKHZhciB3ID0gMDsgdyA8IHN0YXRlcy5sZW5ndGg7IHcrKykgeyAvLyBuYi4gd2UgcHVzaCgpIGR1cmluZyBpdGVyYXRpb25cbiAgICAgICAgdmFyIHN0YXRlID0gc3RhdGVzW3ddO1xuXG4gICAgICAgIGlmIChzdGF0ZS5pc0NvbXBsZXRlKSB7XG4gICAgICAgICAgICBzdGF0ZS5maW5pc2goKTtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5kYXRhICE9PSBQYXJzZXIuZmFpbCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgdmFyIHdhbnRlZEJ5ID0gc3RhdGUud2FudGVkQnk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHdhbnRlZEJ5Lmxlbmd0aDsgaS0tOyApIHsgLy8gdGhpcyBsaW5lIGlzIGhvdFxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdCA9IHdhbnRlZEJ5W2ldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlKGxlZnQsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBzcGVjaWFsLWNhc2UgbnVsbGFibGVzXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLnJlZmVyZW5jZSA9PT0gdGhpcy5pbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgZnV0dXJlIHByZWRpY3RvcnMgb2YgdGhpcyBydWxlIGdldCBjb21wbGV0ZWQuXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHAgPSBzdGF0ZS5ydWxlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmNvbXBsZXRlZFtleHBdID0gdGhpcy5jb21wbGV0ZWRbZXhwXSB8fCBbXSkucHVzaChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBxdWV1ZSBzY2FubmFibGUgc3RhdGVzXG4gICAgICAgICAgICB2YXIgZXhwID0gc3RhdGUucnVsZS5zeW1ib2xzW3N0YXRlLmRvdF07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGV4cCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5uYWJsZS5wdXNoKHN0YXRlKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcHJlZGljdFxuICAgICAgICAgICAgaWYgKHdhbnRzW2V4cF0pIHtcbiAgICAgICAgICAgICAgICB3YW50c1tleHBdLnB1c2goc3RhdGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5oYXNPd25Qcm9wZXJ0eShleHApKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBudWxscyA9IGNvbXBsZXRlZFtleHBdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmlnaHQgPSBudWxsc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGUoc3RhdGUsIHJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2FudHNbZXhwXSA9IFtzdGF0ZV07XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVkaWN0KGV4cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkNvbHVtbi5wcm90b3R5cGUucHJlZGljdCA9IGZ1bmN0aW9uKGV4cCkge1xuICAgIHZhciBydWxlcyA9IHRoaXMuZ3JhbW1hci5ieU5hbWVbZXhwXSB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHIgPSBydWxlc1tpXTtcbiAgICAgICAgdmFyIHdhbnRlZEJ5ID0gdGhpcy53YW50c1tleHBdO1xuICAgICAgICB2YXIgcyA9IG5ldyBTdGF0ZShyLCAwLCB0aGlzLmluZGV4LCB3YW50ZWRCeSk7XG4gICAgICAgIHRoaXMuc3RhdGVzLnB1c2gocyk7XG4gICAgfVxufVxuXG5Db2x1bW4ucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgICB2YXIgaW5wID0gcmlnaHQucnVsZS5uYW1lO1xuICAgIGlmIChsZWZ0LnJ1bGUuc3ltYm9sc1tsZWZ0LmRvdF0gPT09IGlucCkge1xuICAgICAgICB2YXIgY29weSA9IGxlZnQubmV4dFN0YXRlKHJpZ2h0KTtcbiAgICAgICAgdGhpcy5zdGF0ZXMucHVzaChjb3B5KTtcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gR3JhbW1hcihydWxlcywgc3RhcnQpIHtcbiAgICB0aGlzLnJ1bGVzID0gcnVsZXM7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0IHx8IHRoaXMucnVsZXNbMF0ubmFtZTtcbiAgICB2YXIgYnlOYW1lID0gdGhpcy5ieU5hbWUgPSB7fTtcbiAgICB0aGlzLnJ1bGVzLmZvckVhY2goZnVuY3Rpb24ocnVsZSkge1xuICAgICAgICBpZiAoIWJ5TmFtZS5oYXNPd25Qcm9wZXJ0eShydWxlLm5hbWUpKSB7XG4gICAgICAgICAgICBieU5hbWVbcnVsZS5uYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGJ5TmFtZVtydWxlLm5hbWVdLnB1c2gocnVsZSk7XG4gICAgfSk7XG59XG5cbi8vIFNvIHdlIGNhbiBhbGxvdyBwYXNzaW5nIChydWxlcywgc3RhcnQpIGRpcmVjdGx5IHRvIFBhcnNlciBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbkdyYW1tYXIuZnJvbUNvbXBpbGVkID0gZnVuY3Rpb24ocnVsZXMsIHN0YXJ0KSB7XG4gICAgdmFyIGxleGVyID0gcnVsZXMuTGV4ZXI7XG4gICAgaWYgKHJ1bGVzLlBhcnNlclN0YXJ0KSB7XG4gICAgICBzdGFydCA9IHJ1bGVzLlBhcnNlclN0YXJ0O1xuICAgICAgcnVsZXMgPSBydWxlcy5QYXJzZXJSdWxlcztcbiAgICB9XG4gICAgdmFyIHJ1bGVzID0gcnVsZXMubWFwKGZ1bmN0aW9uIChyKSB7IHJldHVybiAobmV3IFJ1bGUoci5uYW1lLCByLnN5bWJvbHMsIHIucG9zdHByb2Nlc3MpKTsgfSk7XG4gICAgdmFyIGcgPSBuZXcgR3JhbW1hcihydWxlcywgc3RhcnQpO1xuICAgIGcubGV4ZXIgPSBsZXhlcjsgLy8gbmIuIHN0b3JpbmcgbGV4ZXIgb24gR3JhbW1hciBpcyBpZmZ5LCBidXQgdW5hdm9pZGFibGVcbiAgICByZXR1cm4gZztcbn1cblxuXG5mdW5jdGlvbiBTdHJlYW1MZXhlcigpIHtcbiAgdGhpcy5yZXNldChcIlwiKTtcbn1cblxuU3RyZWFtTGV4ZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oZGF0YSwgc3RhdGUpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IGRhdGE7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gICAgdGhpcy5saW5lID0gc3RhdGUgPyBzdGF0ZS5saW5lIDogMTtcbiAgICB0aGlzLmxhc3RMaW5lQnJlYWsgPSBzdGF0ZSA/IC1zdGF0ZS5jb2wgOiAwO1xufVxuXG5TdHJlYW1MZXhlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmluZGV4IDwgdGhpcy5idWZmZXIubGVuZ3RoKSB7XG4gICAgICAgIHZhciBjaCA9IHRoaXMuYnVmZmVyW3RoaXMuaW5kZXgrK107XG4gICAgICAgIGlmIChjaCA9PT0gJ1xcbicpIHtcbiAgICAgICAgICB0aGlzLmxpbmUgKz0gMTtcbiAgICAgICAgICB0aGlzLmxhc3RMaW5lQnJlYWsgPSB0aGlzLmluZGV4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7dmFsdWU6IGNofTtcbiAgICB9XG59XG5cblN0cmVhbUxleGVyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgbGluZTogdGhpcy5saW5lLFxuICAgIGNvbDogdGhpcy5pbmRleCAtIHRoaXMubGFzdExpbmVCcmVhayxcbiAgfVxufVxuXG5TdHJlYW1MZXhlci5wcm90b3R5cGUuZm9ybWF0RXJyb3IgPSBmdW5jdGlvbih0b2tlbiwgbWVzc2FnZSkge1xuICAgIC8vIG5iLiB0aGlzIGdldHMgY2FsbGVkIGFmdGVyIGNvbnN1bWluZyB0aGUgb2ZmZW5kaW5nIHRva2VuLFxuICAgIC8vIHNvIHRoZSBjdWxwcml0IGlzIGluZGV4LTFcbiAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgaWYgKHR5cGVvZiBidWZmZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBuZXh0TGluZUJyZWFrID0gYnVmZmVyLmluZGV4T2YoJ1xcbicsIHRoaXMuaW5kZXgpO1xuICAgICAgICBpZiAobmV4dExpbmVCcmVhayA9PT0gLTEpIG5leHRMaW5lQnJlYWsgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICB2YXIgbGluZSA9IGJ1ZmZlci5zdWJzdHJpbmcodGhpcy5sYXN0TGluZUJyZWFrLCBuZXh0TGluZUJyZWFrKVxuICAgICAgICB2YXIgY29sID0gdGhpcy5pbmRleCAtIHRoaXMubGFzdExpbmVCcmVhaztcbiAgICAgICAgbWVzc2FnZSArPSBcIiBhdCBsaW5lIFwiICsgdGhpcy5saW5lICsgXCIgY29sIFwiICsgY29sICsgXCI6XFxuXFxuXCI7XG4gICAgICAgIG1lc3NhZ2UgKz0gXCIgIFwiICsgbGluZSArIFwiXFxuXCJcbiAgICAgICAgbWVzc2FnZSArPSBcIiAgXCIgKyBBcnJheShjb2wpLmpvaW4oXCIgXCIpICsgXCJeXCJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UgKyBcIiBhdCBpbmRleCBcIiArICh0aGlzLmluZGV4IC0gMSk7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIFBhcnNlcihydWxlcywgc3RhcnQsIG9wdGlvbnMpIHtcbiAgICBpZiAocnVsZXMgaW5zdGFuY2VvZiBHcmFtbWFyKSB7XG4gICAgICAgIHZhciBncmFtbWFyID0gcnVsZXM7XG4gICAgICAgIHZhciBvcHRpb25zID0gc3RhcnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGdyYW1tYXIgPSBHcmFtbWFyLmZyb21Db21waWxlZChydWxlcywgc3RhcnQpO1xuICAgIH1cbiAgICB0aGlzLmdyYW1tYXIgPSBncmFtbWFyO1xuXG4gICAgLy8gUmVhZCBvcHRpb25zXG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICBrZWVwSGlzdG9yeTogZmFsc2UsXG4gICAgICAgIGxleGVyOiBncmFtbWFyLmxleGVyIHx8IG5ldyBTdHJlYW1MZXhlcixcbiAgICB9O1xuICAgIGZvciAodmFyIGtleSBpbiAob3B0aW9ucyB8fCB7fSkpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfVxuXG4gICAgLy8gU2V0dXAgbGV4ZXJcbiAgICB0aGlzLmxleGVyID0gdGhpcy5vcHRpb25zLmxleGVyO1xuICAgIHRoaXMubGV4ZXJTdGF0ZSA9IHVuZGVmaW5lZDtcblxuICAgIC8vIFNldHVwIGEgdGFibGVcbiAgICB2YXIgY29sdW1uID0gbmV3IENvbHVtbihncmFtbWFyLCAwKTtcbiAgICB2YXIgdGFibGUgPSB0aGlzLnRhYmxlID0gW2NvbHVtbl07XG5cbiAgICAvLyBJIGNvdWxkIGJlIGV4cGVjdGluZyBhbnl0aGluZy5cbiAgICBjb2x1bW4ud2FudHNbZ3JhbW1hci5zdGFydF0gPSBbXTtcbiAgICBjb2x1bW4ucHJlZGljdChncmFtbWFyLnN0YXJ0KTtcbiAgICAvLyBUT0RPIHdoYXQgaWYgc3RhcnQgcnVsZSBpcyBudWxsYWJsZT9cbiAgICBjb2x1bW4ucHJvY2VzcygpO1xuICAgIHRoaXMuY3VycmVudCA9IDA7IC8vIHRva2VuIGluZGV4XG59XG5cbi8vIGNyZWF0ZSBhIHJlc2VydmVkIHRva2VuIGZvciBpbmRpY2F0aW5nIGEgcGFyc2UgZmFpbFxuUGFyc2VyLmZhaWwgPSB7fTtcblxuUGFyc2VyLnByb3RvdHlwZS5mZWVkID0gZnVuY3Rpb24oY2h1bmspIHtcbiAgICB2YXIgbGV4ZXIgPSB0aGlzLmxleGVyO1xuICAgIGxleGVyLnJlc2V0KGNodW5rLCB0aGlzLmxleGVyU3RhdGUpO1xuXG4gICAgdmFyIHRva2VuO1xuICAgIHdoaWxlICh0b2tlbiA9IGxleGVyLm5leHQoKSkge1xuICAgICAgICAvLyBXZSBhZGQgbmV3IHN0YXRlcyB0byB0YWJsZVtjdXJyZW50KzFdXG4gICAgICAgIHZhciBjb2x1bW4gPSB0aGlzLnRhYmxlW3RoaXMuY3VycmVudF07XG5cbiAgICAgICAgLy8gR0MgdW51c2VkIHN0YXRlc1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5rZWVwSGlzdG9yeSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMudGFibGVbdGhpcy5jdXJyZW50IC0gMV07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbiA9IHRoaXMuY3VycmVudCArIDE7XG4gICAgICAgIHZhciBuZXh0Q29sdW1uID0gbmV3IENvbHVtbih0aGlzLmdyYW1tYXIsIG4pO1xuICAgICAgICB0aGlzLnRhYmxlLnB1c2gobmV4dENvbHVtbik7XG5cbiAgICAgICAgLy8gQWR2YW5jZSBhbGwgdG9rZW5zIHRoYXQgZXhwZWN0IHRoZSBzeW1ib2xcbiAgICAgICAgdmFyIGxpdGVyYWwgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgdmFyIHZhbHVlID0gbGV4ZXIuY29uc3RydWN0b3IgPT09IFN0cmVhbUxleGVyID8gdG9rZW4udmFsdWUgOiB0b2tlbjtcbiAgICAgICAgdmFyIHNjYW5uYWJsZSA9IGNvbHVtbi5zY2FubmFibGU7XG4gICAgICAgIGZvciAodmFyIHcgPSBzY2FubmFibGUubGVuZ3RoOyB3LS07ICkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gc2Nhbm5hYmxlW3ddO1xuICAgICAgICAgICAgdmFyIGV4cGVjdCA9IHN0YXRlLnJ1bGUuc3ltYm9sc1tzdGF0ZS5kb3RdO1xuICAgICAgICAgICAgLy8gVHJ5IHRvIGNvbnN1bWUgdGhlIHRva2VuXG4gICAgICAgICAgICAvLyBlaXRoZXIgcmVnZXggb3IgbGl0ZXJhbFxuICAgICAgICAgICAgaWYgKGV4cGVjdC50ZXN0ID8gZXhwZWN0LnRlc3QodmFsdWUpIDpcbiAgICAgICAgICAgICAgICBleHBlY3QudHlwZSA/IGV4cGVjdC50eXBlID09PSB0b2tlbi50eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBleHBlY3QubGl0ZXJhbCA9PT0gbGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBpdFxuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gc3RhdGUubmV4dFN0YXRlKHtkYXRhOiB2YWx1ZSwgdG9rZW46IHRva2VuLCBpc1Rva2VuOiB0cnVlLCByZWZlcmVuY2U6IG4gLSAxfSk7XG4gICAgICAgICAgICAgICAgbmV4dENvbHVtbi5zdGF0ZXMucHVzaChuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5leHQsIGZvciBlYWNoIG9mIHRoZSBydWxlcywgd2UgZWl0aGVyXG4gICAgICAgIC8vIChhKSBjb21wbGV0ZSBpdCwgYW5kIHRyeSB0byBzZWUgaWYgdGhlIHJlZmVyZW5jZSByb3cgZXhwZWN0ZWQgdGhhdFxuICAgICAgICAvLyAgICAgcnVsZVxuICAgICAgICAvLyAoYikgcHJlZGljdCB0aGUgbmV4dCBub250ZXJtaW5hbCBpdCBleHBlY3RzIGJ5IGFkZGluZyB0aGF0XG4gICAgICAgIC8vICAgICBub250ZXJtaW5hbCdzIHN0YXJ0IHN0YXRlXG4gICAgICAgIC8vIFRvIHByZXZlbnQgZHVwbGljYXRpb24sIHdlIGFsc28ga2VlcCB0cmFjayBvZiBydWxlcyB3ZSBoYXZlIGFscmVhZHlcbiAgICAgICAgLy8gYWRkZWRcblxuICAgICAgICBuZXh0Q29sdW1uLnByb2Nlc3MoKTtcblxuICAgICAgICAvLyBJZiBuZWVkZWQsIHRocm93IGFuIGVycm9yOlxuICAgICAgICBpZiAobmV4dENvbHVtbi5zdGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBObyBzdGF0ZXMgYXQgYWxsISBUaGlzIGlzIG5vdCBnb29kLlxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB0aGlzLmxleGVyLmZvcm1hdEVycm9yKHRva2VuLCBcImludmFsaWQgc3ludGF4XCIpICsgXCJcXG5cIjtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gXCJVbmV4cGVjdGVkIFwiICsgKHRva2VuLnR5cGUgPyB0b2tlbi50eXBlICsgXCIgdG9rZW46IFwiIDogXCJcIik7XG4gICAgICAgICAgICBtZXNzYWdlICs9IEpTT04uc3RyaW5naWZ5KHRva2VuLnZhbHVlICE9PSB1bmRlZmluZWQgPyB0b2tlbi52YWx1ZSA6IHRva2VuKSArIFwiXFxuXCI7XG4gICAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAgICAgZXJyLm9mZnNldCA9IHRoaXMuY3VycmVudDtcbiAgICAgICAgICAgIGVyci50b2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWF5YmUgc2F2ZSBsZXhlciBzdGF0ZVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmtlZXBIaXN0b3J5KSB7XG4gICAgICAgICAgY29sdW1uLmxleGVyU3RhdGUgPSBsZXhlci5zYXZlKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VycmVudCsrO1xuICAgIH1cbiAgICBpZiAoY29sdW1uKSB7XG4gICAgICB0aGlzLmxleGVyU3RhdGUgPSBsZXhlci5zYXZlKClcbiAgICB9XG5cbiAgICAvLyBJbmNyZW1lbnRhbGx5IGtlZXAgdHJhY2sgb2YgcmVzdWx0c1xuICAgIHRoaXMucmVzdWx0cyA9IHRoaXMuZmluaXNoKCk7XG5cbiAgICAvLyBBbGxvdyBjaGFpbmluZywgZm9yIHdoYXRldmVyIGl0J3Mgd29ydGhcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblBhcnNlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb2x1bW4gPSB0aGlzLnRhYmxlW3RoaXMuY3VycmVudF07XG4gICAgY29sdW1uLmxleGVyU3RhdGUgPSB0aGlzLmxleGVyU3RhdGU7XG4gICAgcmV0dXJuIGNvbHVtbjtcbn07XG5cblBhcnNlci5wcm90b3R5cGUucmVzdG9yZSA9IGZ1bmN0aW9uKGNvbHVtbikge1xuICAgIHZhciBpbmRleCA9IGNvbHVtbi5pbmRleDtcbiAgICB0aGlzLmN1cnJlbnQgPSBpbmRleDtcbiAgICB0aGlzLnRhYmxlW2luZGV4XSA9IGNvbHVtbjtcbiAgICB0aGlzLnRhYmxlLnNwbGljZShpbmRleCArIDEpO1xuICAgIHRoaXMubGV4ZXJTdGF0ZSA9IGNvbHVtbi5sZXhlclN0YXRlO1xuXG4gICAgLy8gSW5jcmVtZW50YWxseSBrZWVwIHRyYWNrIG9mIHJlc3VsdHNcbiAgICB0aGlzLnJlc3VsdHMgPSB0aGlzLmZpbmlzaCgpO1xufTtcblxuLy8gbmIuIGRlcHJlY2F0ZWQ6IHVzZSBzYXZlL3Jlc3RvcmUgaW5zdGVhZCFcblBhcnNlci5wcm90b3R5cGUucmV3aW5kID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5rZWVwSGlzdG9yeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldCBvcHRpb24gYGtlZXBIaXN0b3J5YCB0byBlbmFibGUgcmV3aW5kaW5nJylcbiAgICB9XG4gICAgLy8gbmIuIHJlY2FsbCBjb2x1bW4gKHRhYmxlKSBpbmRpY2llcyBmYWxsIGJldHdlZW4gdG9rZW4gaW5kaWNpZXMuXG4gICAgLy8gICAgICAgIGNvbCAwICAgLS0gICB0b2tlbiAwICAgLS0gICBjb2wgMVxuICAgIHRoaXMucmVzdG9yZSh0aGlzLnRhYmxlW2luZGV4XSk7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFJldHVybiB0aGUgcG9zc2libGUgcGFyc2luZ3NcbiAgICB2YXIgY29uc2lkZXJhdGlvbnMgPSBbXTtcbiAgICB2YXIgc3RhcnQgPSB0aGlzLmdyYW1tYXIuc3RhcnQ7XG4gICAgdmFyIGNvbHVtbiA9IHRoaXMudGFibGVbdGhpcy50YWJsZS5sZW5ndGggLSAxXVxuICAgIGNvbHVtbi5zdGF0ZXMuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAodC5ydWxlLm5hbWUgPT09IHN0YXJ0XG4gICAgICAgICAgICAgICAgJiYgdC5kb3QgPT09IHQucnVsZS5zeW1ib2xzLmxlbmd0aFxuICAgICAgICAgICAgICAgICYmIHQucmVmZXJlbmNlID09PSAwXG4gICAgICAgICAgICAgICAgJiYgdC5kYXRhICE9PSBQYXJzZXIuZmFpbCkge1xuICAgICAgICAgICAgY29uc2lkZXJhdGlvbnMucHVzaCh0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb25zaWRlcmF0aW9ucy5tYXAoZnVuY3Rpb24oYykge3JldHVybiBjLmRhdGE7IH0pO1xufTtcblxucmV0dXJuIHtcbiAgICBQYXJzZXI6IFBhcnNlcixcbiAgICBHcmFtbWFyOiBHcmFtbWFyLFxuICAgIFJ1bGU6IFJ1bGUsXG59O1xuXG59KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9uZWFybGV5L2xpYi9uZWFybGV5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBkZWNvZGVTcGVjdHJhbENsYXNzIH0gZnJvbSAnLi4vdXRpbHMnXHJcbmltcG9ydCBBYnN0cmFjdFJlYWRlciBmcm9tICcuL0Fic3RyYWN0UmVhZGVyJ1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcydcclxuaW1wb3J0IE1FVEEgZnJvbSAnLi4vdXRpbHMvRGF0TWV0YSdcclxuXHJcbmNsYXNzIERBVFJlYWRlciBpbXBsZW1lbnRzIEFic3RyYWN0UmVhZGVyIHtcclxuICBwcml2YXRlIHN0YXRpYyBwYXJzZSAoZGF0YTogQnVmZmVyKTogYW55W10ge1xyXG4gICAgbGV0IHN0YXJzSW5GaWxlID0gMFxyXG5cclxuICAgIGNvbnN0IGhlYWRlciA9IGRhdGEudG9TdHJpbmcoJ3V0Zi04JywgMCwgTUVUQS5GSUxFX0hFQURFUi5sZW5ndGgpXHJcbiAgICBjb25zdCB2ZXJzaW9uID0gZGF0YS5yZWFkVUludDE2TEUoTUVUQS5GSUxFX0hFQURFUi5sZW5ndGgpXHJcblxyXG4gICAgaWYgKGhlYWRlciAhPT0gTUVUQS5GSUxFX0hFQURFUikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGZpbGUgc2lnbmF0dXJlJylcclxuICAgIH0gZWxzZSBpZiAodmVyc2lvbiAhPT0gTUVUQS5WRVJTSU9OKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgZmlsZSB2ZXJzaW9uJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0YXJzSW5GaWxlID0gZGF0YS5yZWFkVUludDMyTEUoTUVUQS5GSUxFX0hFQURFUi5sZW5ndGggKyAyKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHQgPSBbXVxyXG4gICAgbGV0IHN0YXJOdW1iZXIgPSAwXHJcbiAgICB3aGlsZSAoc3Rhck51bWJlciA8IHN0YXJzSW5GaWxlKSB7XHJcbiAgICAgIGxldCBvZmZzZXQgPSBNRVRBLkhFQURFUl9PRkZTRVQgKyBzdGFyTnVtYmVyICogMjBcclxuICAgICAgbGV0IGNhdGFsb2dOdW1iZXIgPSBkYXRhLnJlYWRVSW50MzJMRShvZmZzZXQpXHJcbiAgICAgIGxldCBEaXN0YW5jZSA9IGRhdGEucmVhZEZsb2F0TEUob2Zmc2V0ICsgNClcclxuICAgICAgbGV0IFJBID0gZGF0YS5yZWFkRmxvYXRMRShvZmZzZXQgKyA4KVxyXG4gICAgICBsZXQgRGVjID0gZGF0YS5yZWFkRmxvYXRMRShvZmZzZXQgKyAxMilcclxuICAgICAgbGV0IEFic01hZyA9IGRhdGEucmVhZEludDE2TEUob2Zmc2V0ICsgMTYpXHJcbiAgICAgIGxldCBTcGVjdHJhbFR5cGUgPSBkZWNvZGVTcGVjdHJhbENsYXNzKGRhdGEucmVhZFVJbnQxNkxFKG9mZnNldCArIDE4KSlcclxuXHJcbiAgICAgIHJlc3VsdC5wdXNoKHtcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICB0eXBlOiAnU3RhcicsXHJcbiAgICAgICAgICBtb2RlOiAnTW9kaWZ5U3RhcicsXHJcbiAgICAgICAgICBudW1iZXI6IGNhdGFsb2dOdW1iZXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAgIERpc3RhbmNlLFxyXG4gICAgICAgICAgUkEsXHJcbiAgICAgICAgICBEZWMsXHJcbiAgICAgICAgICBBYnNNYWcsXHJcbiAgICAgICAgICBTcGVjdHJhbFR5cGVcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICArK3N0YXJOdW1iZXJcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHRcclxuICB9XHJcblxyXG4gIHJlYWQgKGJ1ZmZlcjogQnVmZmVyKTogUHJvbWlzZTxhbnlbXT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gcmVzb2x2ZShEQVRSZWFkZXIucGFyc2UoYnVmZmVyKSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEQVRSZWFkZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlYWRlci9EQVRSZWFkZXIudHMiLCJlbnVtIFN0YXJUeXBlIHtcclxuICBOb3JtYWxTdGFyLFxyXG4gIFdoaXRlRHdhcmYsXHJcbiAgTmV1dHJvblN0YXIsXHJcbiAgQmxhY2tIb2xlLFxyXG59XHJcblxyXG5lbnVtIFNwZWN0cmFsQ2xhc3Mge1xyXG4gIFNwZWN0cmFsX08sXHJcbiAgU3BlY3RyYWxfQixcclxuICBTcGVjdHJhbF9BLFxyXG4gIFNwZWN0cmFsX0YsXHJcbiAgU3BlY3RyYWxfRyxcclxuICBTcGVjdHJhbF9LLFxyXG4gIFNwZWN0cmFsX00sXHJcbiAgU3BlY3RyYWxfUiwgLy8gc3VwZXJjZWRlZCBieSBjbGFzcyBDXHJcbiAgU3BlY3RyYWxfUyxcclxuICBTcGVjdHJhbF9OLCAvLyBzdXBlcmNlZGVkIGJ5IGNsYXNzIENcclxuICBTcGVjdHJhbF9XQyxcclxuICBTcGVjdHJhbF9XTixcclxuICBTcGVjdHJhbF9Vbmtub3duLFxyXG4gIFNwZWN0cmFsX0wsXHJcbiAgU3BlY3RyYWxfVCxcclxuICBTcGVjdHJhbF9DLFxyXG4gIFNwZWN0cmFsX0RBLCAvLyB3aGl0ZSBkd2FyZiBBIChCYWxtZXIgbGluZXMsIG5vIEhlIEkgb3IgbWV0YWxzKVxyXG4gIFNwZWN0cmFsX0RCLCAvLyB3aGl0ZSBkd2FyZiBCIChIZSBJIGxpbmVzLCBubyBIIG9yIG1ldGFscylcclxuICBTcGVjdHJhbF9EQywgLy8gd2hpdGUgZHdhcmYgQywgY29udGludW91cyBzcGVjdHJ1bVxyXG4gIFNwZWN0cmFsX0RPLCAvLyB3aGl0ZSBkd2FyZiBPLCBIZSBJSSBzdHJvbmcsIEhlIEkgb3IgSFxyXG4gIFNwZWN0cmFsX0RRLCAvLyB3aGl0ZSBkd2FyZiBRLCBjYXJib24gZmVhdHVyZXNcclxuICBTcGVjdHJhbF9EWiwgLy8gd2hpdGUgZHdhcmYgWiwgbWV0YWwgbGluZXMgb25seSwgbm8gSCBvciBIZVxyXG4gIFNwZWN0cmFsX0QsIC8vIGdlbmVyaWMgd2hpdGUgZHdhcmYsIG5vIGFkZGl0aW9uYWwgZGF0YVxyXG4gIFNwZWN0cmFsX0RYLFxyXG4gIFNwZWN0cmFsX0NvdW50XHJcbn1cclxuXHJcbmVudW0gU3BlY3RyYWxDbGFzc1N0ciB7XHJcbiAgTyxcclxuICBCLFxyXG4gIEEsXHJcbiAgRixcclxuICBHLFxyXG4gIEssXHJcbiAgTSxcclxuICBSLCAvLyBzdXBlcmNlZGVkIGJ5IGNsYXNzIENcclxuICBTLFxyXG4gIE4sIC8vIHN1cGVyY2VkZWQgYnkgY2xhc3MgQ1xyXG4gIFdDLFxyXG4gIFdOLFxyXG4gICcnLFxyXG4gIEwsXHJcbiAgVCxcclxuICBDLFxyXG4gIERBLCAvLyB3aGl0ZSBkd2FyZiBBIChCYWxtZXIgbGluZXMsIG5vIEhlIEkgb3IgbWV0YWxzKVxyXG4gIERCLCAvLyB3aGl0ZSBkd2FyZiBCIChIZSBJIGxpbmVzLCBubyBIIG9yIG1ldGFscylcclxuICBEQywgLy8gd2hpdGUgZHdhcmYgQywgY29udGludW91cyBzcGVjdHJ1bVxyXG4gIERPLCAvLyB3aGl0ZSBkd2FyZiBPLCBIZSBJSSBzdHJvbmcsIEhlIEkgb3IgSFxyXG4gIERRLCAvLyB3aGl0ZSBkd2FyZiBRLCBjYXJib24gZmVhdHVyZXNcclxuICBEWiwgLy8gd2hpdGUgZHdhcmYgWiwgbWV0YWwgbGluZXMgb25seSwgbm8gSCBvciBIZVxyXG4gIEQsIC8vIGdlbmVyaWMgd2hpdGUgZHdhcmYsIG5vIGFkZGl0aW9uYWwgZGF0YVxyXG4gIERYLFxyXG4gIENvdW50XHJcbn1cclxuXHJcbmVudW0gTHVtaW5vc2l0eUNsYXNzIHtcclxuICBMdW1fSWEwLFxyXG4gIEx1bV9JYSxcclxuICBMdW1fSWIsXHJcbiAgTHVtX0lJLFxyXG4gIEx1bV9JSUksXHJcbiAgTHVtX0lWLFxyXG4gIEx1bV9WLFxyXG4gIEx1bV9WSSxcclxuICBMdW1fVW5rbm93bixcclxuICBMdW1fQ291bnRcclxufVxyXG5cclxuZW51bSBMdW1pbm9zaXR5Q2xhc3NTdHIge1xyXG4gIElhMCxcclxuICBJYSxcclxuICBJYixcclxuICBJSSxcclxuICBJSUksXHJcbiAgSVYsXHJcbiAgVixcclxuICBWSSxcclxuICAnJyxcclxuICBDb3VudFxyXG59XHJcblxyXG5jb25zdCBMdW1TdHJDbGFzc2VzID0gW1xyXG4gICdJLWEwJyxcclxuICAnSS1hJyxcclxuICAnSS1iJyxcclxuICAnSUknLFxyXG4gICdJSUknLFxyXG4gICdJVicsXHJcbiAgJ1YnLFxyXG4gICdWSSdcclxuXVxyXG5jb25zdCBTdWJDbGFzc1Vua25vd24gPSAxMFxyXG5jb25zdCBXRENsYXNzQ291bnQgPSA4XHJcblxyXG5jb25zdCB1bnBhY2tTdGVsbGFyQ2xhc3MgPSAoc3Q6IG51bWJlcik6IGFueSA9PiB7XHJcbiAgbGV0IHN0YXJUeXBlID0gc3QgPj4gMTJcclxuICBsZXQgc3BlY0NsYXNzXHJcbiAgbGV0IHN1YkNsYXNzXHJcbiAgbGV0IGx1bUNsYXNzXHJcblxyXG4gIHN3aXRjaCAoc3RhclR5cGUpIHtcclxuICAgIGNhc2UgU3RhclR5cGUuTm9ybWFsU3RhciA6XHJcbiAgICAgIHNwZWNDbGFzcyA9IHN0ID4+IDggJiAweGZcclxuICAgICAgc3ViQ2xhc3MgPSBzdCA+PiA0ICYgMHhmXHJcbiAgICAgIGx1bUNsYXNzID0gc3QgJiAweGZcclxuICAgICAgYnJlYWtcclxuICAgIGNhc2UgU3RhclR5cGUuV2hpdGVEd2FyZjpcclxuICAgICAgaWYgKChzdCA+PiA4ICYgMHhmKSA+PSBXRENsYXNzQ291bnQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICB9XHJcbiAgICAgIHNwZWNDbGFzcyA9IChzdCA+PiA4ICYgMHhmKSArIFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfREFcclxuICAgICAgc3ViQ2xhc3MgPSBzdCA+PiA0ICYgMHhmXHJcbiAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9Vbmtub3duXHJcbiAgICAgIGJyZWFrXHJcbiAgICBjYXNlIFN0YXJUeXBlLk5ldXRyb25TdGFyOlxyXG4gICAgY2FzZSBTdGFyVHlwZS5CbGFja0hvbGU6XHJcbiAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfVW5rbm93blxyXG4gICAgICBzdWJDbGFzcyA9IFN1YkNsYXNzVW5rbm93blxyXG4gICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fVW5rbm93blxyXG4gICAgICBicmVha1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIG51bGxcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdGFyVHlwZSxcclxuICAgIHNwZWNDbGFzcyxcclxuICAgIHN1YkNsYXNzLFxyXG4gICAgbHVtQ2xhc3NcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGRlY29kZVNwZWN0cmFsQ2xhc3MgPSAoc3Q6IG51bWJlcik6IHN0cmluZyA9PiB7XHJcbiAgbGV0IHN0ZWxsYXJDbGFzcyA9IHVucGFja1N0ZWxsYXJDbGFzcyhzdClcclxuICBsZXQgc3BlY0NsYXNzXHJcbiAgbGV0IHN1YkNsYXNzXHJcbiAgbGV0IGx1bUNsYXNzXHJcblxyXG4gIGlmIChzdGVsbGFyQ2xhc3Muc3RhclR5cGUgPT09IFN0YXJUeXBlLldoaXRlRHdhcmYpIHtcclxuICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3NTdHJbc3RlbGxhckNsYXNzLnNwZWNDbGFzc11cclxuICAgIHN1YkNsYXNzID0gJzAxMjM0NTY3ODknW3N0ZWxsYXJDbGFzcy5zdWJDbGFzc10gfHwgJydcclxuICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzU3RyW3N0ZWxsYXJDbGFzcy5sdW1DbGFzc11cclxuICB9IGVsc2UgaWYgKHN0ZWxsYXJDbGFzcy5zdGFyVHlwZSA9PT0gU3RhclR5cGUuTmV1dHJvblN0YXIpIHtcclxuICAgIHNwZWNDbGFzcyA9ICdRJ1xyXG4gIH0gZWxzZSBpZiAoc3RlbGxhckNsYXNzLnN0YXJUeXBlID09PSBTdGFyVHlwZS5CbGFja0hvbGUpIHtcclxuICAgIHNwZWNDbGFzcyA9ICdYJ1xyXG4gICAgc3ViQ2xhc3MgPSAnJ1xyXG4gICAgbHVtQ2xhc3MgPSAnJ1xyXG4gIH0gZWxzZSBpZiAoc3RlbGxhckNsYXNzLnN0YXJUeXBlID09PSBTdGFyVHlwZS5Ob3JtYWxTdGFyKSB7XHJcbiAgICBzcGVjQ2xhc3MgPSAnT0JBRkdLTVJTTldXP0xUQydbc3RlbGxhckNsYXNzLnNwZWNDbGFzc10gfHwgJydcclxuICAgIHN1YkNsYXNzID0gJzAxMjM0NTY3ODknW3N0ZWxsYXJDbGFzcy5zdWJDbGFzc10gfHwgJydcclxuICAgIGx1bUNsYXNzID0gTHVtU3RyQ2xhc3Nlc1tzdGVsbGFyQ2xhc3MubHVtQ2xhc3NdIHx8ICcnXHJcbiAgfSBlbHNlIHtcclxuICAgIHNwZWNDbGFzcyA9ICc/J1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGAke3NwZWNDbGFzc30ke3N1YkNsYXNzfSR7bHVtQ2xhc3N9YFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWNvZGVTcGVjdHJhbENsYXNzXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9kZWNvZGVTcGVjdHJhbENsYXNzLnRzIiwiZW51bSBVbmtub3duIHtcclxuICBTdWJjbGFzc19Vbmtub3duID0gMTBcclxufVxyXG5cclxuZW51bSBQYXJzZVN0YXRlIHtcclxuICBCZWdpblN0YXRlLFxyXG4gIEVuZFN0YXRlLFxyXG4gIE5vcm1hbFN0YXJTdGF0ZSxcclxuICBXb2xmUmF5ZXRUeXBlU3RhdGUsXHJcbiAgTm9ybWFsU3RhckNsYXNzU3RhdGUsXHJcbiAgTm9ybWFsU3RhclN1YmNsYXNzU3RhdGUsXHJcbiAgTm9ybWFsU3RhclN1YmNsYXNzRGVjaW1hbFN0YXRlLFxyXG4gIE5vcm1hbFN0YXJTdWJjbGFzc0ZpbmFsU3RhdGUsXHJcbiAgTHVtQ2xhc3NCZWdpblN0YXRlLFxyXG4gIEx1bUNsYXNzSVN0YXRlLFxyXG4gIEx1bUNsYXNzSUlTdGF0ZSxcclxuICBMdW1DbGFzc1ZTdGF0ZSxcclxuICBMdW1DbGFzc0lkYXNoU3RhdGUsXHJcbiAgTHVtQ2xhc3NJYVN0YXRlLFxyXG4gIFdEVHlwZVN0YXRlLFxyXG4gIFdERXh0ZW5kZWRUeXBlU3RhdGUsXHJcbiAgV0RTdWJjbGFzc1N0YXRlLFxyXG4gIFN1YmR3YXJmUHJlZml4U3RhdGUsXHJcbn1cclxuXHJcbmVudW0gU3RhclR5cGUge1xyXG4gIE5vcm1hbFN0YXIsXHJcbiAgV2hpdGVEd2FyZixcclxuICBOZXV0cm9uU3RhcixcclxuICBCbGFja0hvbGUsXHJcbn1cclxuXHJcbmVudW0gU3BlY3RyYWxDbGFzcyB7XHJcbiAgU3BlY3RyYWxfTyxcclxuICBTcGVjdHJhbF9CLFxyXG4gIFNwZWN0cmFsX0EsXHJcbiAgU3BlY3RyYWxfRixcclxuICBTcGVjdHJhbF9HLFxyXG4gIFNwZWN0cmFsX0ssXHJcbiAgU3BlY3RyYWxfTSxcclxuICBTcGVjdHJhbF9SLFxyXG4gIFNwZWN0cmFsX1MsXHJcbiAgU3BlY3RyYWxfTixcclxuICBTcGVjdHJhbF9XQyxcclxuICBTcGVjdHJhbF9XTixcclxuICBTcGVjdHJhbF9Vbmtub3duLFxyXG4gIFNwZWN0cmFsX0wsXHJcbiAgU3BlY3RyYWxfVCxcclxuICBTcGVjdHJhbF9DLFxyXG4gIFNwZWN0cmFsX0RBLFxyXG4gIFNwZWN0cmFsX0RCLFxyXG4gIFNwZWN0cmFsX0RDLFxyXG4gIFNwZWN0cmFsX0RPLFxyXG4gIFNwZWN0cmFsX0RRLFxyXG4gIFNwZWN0cmFsX0RaLFxyXG4gIFNwZWN0cmFsX0QsXHJcbiAgU3BlY3RyYWxfRFgsXHJcbiAgU3BlY3RyYWxfQ291bnQsXHJcbn1cclxuXHJcbmVudW0gTHVtaW5vc2l0eUNsYXNzIHtcclxuICBMdW1fSWEwLFxyXG4gIEx1bV9JYSxcclxuICBMdW1fSWIsXHJcbiAgTHVtX0lJLFxyXG4gIEx1bV9JSUksXHJcbiAgTHVtX0lWLFxyXG4gIEx1bV9WLFxyXG4gIEx1bV9WSSxcclxuICBMdW1fVW5rbm93bixcclxuICBMdW1fQ291bnRcclxufVxyXG5cclxuY29uc3QgTHVtU3RyQ2xhc3NlcyA9IFtcclxuICAnSS1hMCcsXHJcbiAgJ0ktYScsXHJcbiAgJ0ktYicsXHJcbiAgJ0lJJyxcclxuICAnSUlJJyxcclxuICAnSVYnLFxyXG4gICdWJyxcclxuICAnVkknXHJcbl1cclxuXHJcbmNvbnN0IFN1YkNsYXNzVW5rbm93biA9IDEwXHJcbmNvbnN0IFdEQ2xhc3NDb3VudCA9IDhcclxuXHJcbmZ1bmN0aW9uIGVuY29kZVNwZWN0cmFsQ2xhc3MgKHN0OiBzdHJpbmcpOiBudW1iZXIge1xyXG4gIGxldCBpID0gMFxyXG4gIGxldCBzdGF0ZSA9IFBhcnNlU3RhdGUuQmVnaW5TdGF0ZVxyXG4gIGxldCBzdGFyVHlwZSA9IFN0YXJUeXBlLk5vcm1hbFN0YXJcclxuICBsZXQgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9Vbmtub3duXHJcbiAgbGV0IGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9Vbmtub3duXHJcbiAgbGV0IHN1YkNsYXNzID0gVW5rbm93bi5TdWJjbGFzc19Vbmtub3duXHJcblxyXG4gIHdoaWxlIChzdGF0ZSAhPT0gUGFyc2VTdGF0ZS5FbmRTdGF0ZSkge1xyXG4gICAgbGV0IGMgPSBpIDwgc3QubGVuZ3RoXHJcbiAgICAgID8gc3QuY2hhckF0KGkpXHJcbiAgICAgIDogbnVsbFxyXG5cclxuICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLkJlZ2luU3RhdGU6XHJcbiAgICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgICBjYXNlICdRJzpcclxuICAgICAgICAgICAgc3RhclR5cGUgPSBTdGFyVHlwZS5OZXV0cm9uU3RhclxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdYJzpcclxuICAgICAgICAgICAgc3RhclR5cGUgPSBTdGFyVHlwZS5CbGFja0hvbGVcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnRCc6XHJcbiAgICAgICAgICAgIHN0YXJUeXBlID0gU3RhclR5cGUuV2hpdGVEd2FyZlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0RcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLldEVHlwZVN0YXRlXHJcbiAgICAgICAgICAgICsraVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ3MnOlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuU3ViZHdhcmZQcmVmaXhTdGF0ZVxyXG4gICAgICAgICAgICArK2lcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICc/JzpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJDbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuV29sZlJheWV0VHlwZVN0YXRlOlxyXG4gICAgICAgIHN3aXRjaCAoYykge1xyXG4gICAgICAgICAgY2FzZSAnQyc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfV0NcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgICsraVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ04nOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX1dOXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICArK2lcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX1dDXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLlN1YmR3YXJmUHJlZml4U3RhdGU6XHJcbiAgICAgICAgaWYgKGMgPT09ICdkJykge1xyXG4gICAgICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX1ZJXHJcbiAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhckNsYXNzU3RhdGVcclxuICAgICAgICAgICsraVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuTm9ybWFsU3RhckNsYXNzU3RhdGU6XHJcbiAgICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgICBjYXNlICdXJzpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLldvbGZSYXlldFR5cGVTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ08nOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX09cclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnQic6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfQlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdBJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9BXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ0YnOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0ZcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnRyc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfR1xyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdLJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9LXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ00nOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX01cclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnUic6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfUlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdTJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9TXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ04nOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX05cclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnTCc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfTFxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdUJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9UXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ0MnOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0NcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgICsraVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGU6XHJcbiAgICAgICAgaWYgKGMgIT09IG51bGwgJiYgYy5tYXRjaCgvWzAtOV0vKSkge1xyXG4gICAgICAgICAgc3ViQ2xhc3MgPSBwYXJzZUludChjKVxyXG4gICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc0RlY2ltYWxTdGF0ZVxyXG4gICAgICAgICAgKytpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5MdW1DbGFzc0JlZ2luU3RhdGVcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NEZWNpbWFsU3RhdGU6XHJcbiAgICAgICAgaWYgKGMgPT09ICcuJykge1xyXG4gICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc0ZpbmFsU3RhdGVcclxuICAgICAgICAgICsraVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTHVtQ2xhc3NCZWdpblN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzRmluYWxTdGF0ZTpcclxuICAgICAgICBpZiAoYy5tYXRjaCgvWzAtOV0vKSkge1xyXG4gICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkx1bUNsYXNzQmVnaW5TdGF0ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICB9XHJcbiAgICAgICAgKytpXHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5MdW1DbGFzc0JlZ2luU3RhdGU6XHJcbiAgICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgICBjYXNlICdJJzpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkx1bUNsYXNzSVN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnVic6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5MdW1DbGFzc1ZTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICArK2lcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLkx1bUNsYXNzSVN0YXRlOlxyXG4gICAgICAgIHN3aXRjaCAoYykge1xyXG4gICAgICAgICAgY2FzZSAnSSc6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5MdW1DbGFzc0lJU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdWJzpcclxuICAgICAgICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX0lWXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ2EnOlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTHVtQ2xhc3NJYVN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnYic6XHJcbiAgICAgICAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9JYlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICctJzpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkx1bUNsYXNzSWRhc2hTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9JYlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgaSsrXHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5MdW1DbGFzc0lJU3RhdGU6XHJcbiAgICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgICBjYXNlICdJJzpcclxuICAgICAgICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX0lJSVxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fSUlcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuTHVtQ2xhc3NJZGFzaFN0YXRlOlxyXG4gICAgICAgIHN3aXRjaCAoYykge1xyXG4gICAgICAgICAgY2FzZSAnYSc6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5MdW1DbGFzc0lhU3RhdGVcclxuICAgICAgICAgICAgKytpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnYic6XHJcbiAgICAgICAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9JYlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fSWJcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuTHVtQ2xhc3NJYVN0YXRlOlxyXG4gICAgICAgIHN3aXRjaCAoYykge1xyXG4gICAgICAgICAgY2FzZSAnMCc6XHJcbiAgICAgICAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9JYTBcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX0lhXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLkx1bUNsYXNzVlN0YXRlOlxyXG4gICAgICAgIHN3aXRjaCAoYykge1xyXG4gICAgICAgICAgY2FzZSAnSSc6XHJcbiAgICAgICAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9WSVxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fVlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5XRFR5cGVTdGF0ZTpcclxuICAgICAgICBzd2l0Y2ggKGMpIHtcclxuICAgICAgICAgIGNhc2UgJ0EnOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0RBXHJcbiAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ0InOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0RCXHJcbiAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ0MnOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0RDXHJcbiAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ08nOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0RPXHJcbiAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ1EnOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0RRXHJcbiAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ1gnOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0RYXHJcbiAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ1onOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0RaXHJcbiAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfRFxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuV0RFeHRlbmRlZFR5cGVTdGF0ZVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuV0RFeHRlbmRlZFR5cGVTdGF0ZTpcclxuICAgICAgICBzd2l0Y2ggKGMpIHtcclxuICAgICAgICAgIGNhc2UgJ0EnOlxyXG4gICAgICAgICAgY2FzZSAnQic6XHJcbiAgICAgICAgICBjYXNlICdDJzpcclxuICAgICAgICAgIGNhc2UgJ08nOlxyXG4gICAgICAgICAgY2FzZSAnUSc6XHJcbiAgICAgICAgICBjYXNlICdaJzpcclxuICAgICAgICAgIGNhc2UgJ1gnOlxyXG4gICAgICAgICAgY2FzZSAnVic6XHJcbiAgICAgICAgICBjYXNlICdQJzpcclxuICAgICAgICAgIGNhc2UgJ0gnOlxyXG4gICAgICAgICAgY2FzZSAnRSc6XHJcbiAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5XRFN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5XRFN1YmNsYXNzU3RhdGU6XHJcbiAgICAgICAgaWYgKGMgIT09IG51bGwgJiYgYy5tYXRjaCgvWzAtOV0vKSkge1xyXG4gICAgICAgICAgc3ViQ2xhc3MgPSBwYXJzZUludChjKVxyXG4gICAgICAgICAgaSsrXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1YkNsYXNzID0gVW5rbm93bi5TdWJjbGFzc19Vbmtub3duXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsZXQgYnVmZmVyID0gMFxyXG5cclxuICBidWZmZXIgKz0gKHN0YXJUeXBlICYgMHhmKSA8PCAxMlxyXG4gIGJ1ZmZlciArPSAoc3BlY0NsYXNzICYgMHhmKSA8PCA4XHJcbiAgYnVmZmVyICs9IChzdWJDbGFzcyAmIDB4ZikgPDwgNFxyXG4gIGJ1ZmZlciArPSAobHVtQ2xhc3MgJiAweGYpXHJcblxyXG4gIHJldHVybiBidWZmZXJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZW5jb2RlU3BlY3RyYWxDbGFzc1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvZW5jb2RlU3BlY3RyYWxDbGFzcy50cyIsImltcG9ydCBBYnN0cmFjdFdyaXRlciBmcm9tICcuL0Fic3RyYWN0V3JpdGVyJ1xyXG5pbXBvcnQgQ29uZmlnV3JpdGVyIGZyb20gJy4vQ29uZmlnV3JpdGVyJ1xyXG5pbXBvcnQgU1RDV3JpdGVyIGZyb20gJy4vU1RDV3JpdGVyJ1xyXG5pbXBvcnQgU1NDV3JpdGVyIGZyb20gJy4vU1NDV3JpdGVyJ1xyXG5pbXBvcnQgRFNDV3JpdGVyIGZyb20gJy4vRFNDV3JpdGVyJ1xyXG5pbXBvcnQgQ0ZHV3JpdGVyIGZyb20gJy4vQ0ZHV3JpdGVyJ1xyXG5pbXBvcnQgREFUV3JpdGVyIGZyb20gJy4vREFUV3JpdGVyJ1xyXG5cclxuZXhwb3J0IHtcclxuICBBYnN0cmFjdFdyaXRlcixcclxuICBDb25maWdXcml0ZXIsXHJcbiAgU1RDV3JpdGVyLFxyXG4gIFNTQ1dyaXRlcixcclxuICBEU0NXcml0ZXIsXHJcbiAgQ0ZHV3JpdGVyLFxyXG4gIERBVFdyaXRlclxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Xcml0ZXIvaW5kZXgudHMiLCJmdW5jdGlvbiBpc09iamVjdCAodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWVcclxuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQXJyYXkgKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBhbnlbXSB7XHJcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTnVtYmVyICh2YWx1ZTogYW55KTogdmFsdWUgaXMgbnVtYmVyIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzU3RyaW5nICh2YWx1ZTogYW55KTogdmFsdWUgaXMgc3RyaW5nIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJpYWxpemVyIHtcclxuICBzdGF0aWMgc3RyaW5naWZ5ICh2YWx1ZTogYW55LCBpbmRlbnQgPSAwKTogc3RyaW5nIHtcclxuICAgIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcclxuICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6ZXIud3JpdGVBcnJheSh2YWx1ZSwgaW5kZW50KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBTZXJpYWxpemVyLndyaXRlT2JqZWN0KHZhbHVlLCBpbmRlbnQpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChpc051bWJlcih2YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4gU2VyaWFsaXplci53cml0ZU51bWJlcih2YWx1ZSlcclxuICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4gU2VyaWFsaXplci53cml0ZVN0cmluZyh2YWx1ZSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgd3JpdGVBcnJheSAoYXJyYXk6IGFueVtdLCBpbmRlbnQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gJ1sgJyArIGFycmF5Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICByZXR1cm4gU2VyaWFsaXplci5zdHJpbmdpZnkoaXRlbSwgaW5kZW50ICsgMilcclxuICAgIH0pLmpvaW4oJyAnKSArICcgXSdcclxuICB9XHJcblxyXG4gIHN0YXRpYyB3cml0ZU9iamVjdCAodmFsdWU6IE9iamVjdCwgaW5kZW50OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgaWYgKE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuICd7IH0nXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5rZXlzKHZhbHVlKVxyXG4gICAgICAubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gU2VyaWFsaXplci53cml0ZUZpZWxkKGtleSwgU2VyaWFsaXplci5zdHJpbmdpZnkodmFsdWVba2V5XSwgaW5kZW50ICsgMiksIGluZGVudCArIDIpXHJcbiAgICAgIH0pXHJcbiAgICAgIC5qb2luKCdcXG4nKVxyXG5cclxuICAgIHJldHVybiAne1xcbicgKyBlbnRyaWVzICsgJ1xcbicgKyAnICcucmVwZWF0KGluZGVudCkgKyAnfSdcclxuICB9XHJcblxyXG4gIHN0YXRpYyB3cml0ZVN0cmluZyAodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gJ1wiJyArIHZhbHVlICsgJ1wiJ1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHdyaXRlTnVtYmVyICh2YWx1ZTogbnVtYmVyLCBwcmVjaXNpb24gPSA2KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBTdHJpbmcoTWF0aC5mbG9vcih2YWx1ZSAqIDEwICoqIHByZWNpc2lvbikgLyAxMCAqKiBwcmVjaXNpb24pXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgd3JpdGVGaWVsZCAoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGluZGVudDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAnICcucmVwZWF0KGluZGVudCkgKyBrZXkgKyAnICcgKyB2YWx1ZVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2VyaWFsaXplci9TZXJpYWxpemVyLnRzIiwiaW1wb3J0IFRleHRXcml0ZXIgZnJvbSAnLi9UZXh0V3JpdGVyJ1xyXG5pbXBvcnQgeyBTZXJpYWxpemVyIH0gZnJvbSAnLi4vU2VyaWFsaXplcidcclxuXHJcbmNsYXNzIFNUQ1dyaXRlciBleHRlbmRzIFRleHRXcml0ZXIge1xyXG4gIHdyaXRlSGVhZGVyICh2YWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG1vZGUgPSAodmFsdWUubW9kZSAhPT0gbnVsbCAmJiB2YWx1ZS5tb2RlU2V0KSA/IHZhbHVlLm1vZGUgOiAnJ1xyXG4gICAgY29uc3QgdHlwZSA9ICh2YWx1ZS50eXBlICE9PSBudWxsICYmIHZhbHVlLnR5cGVTZXQpID8gdmFsdWUudHlwZSA6ICcnXHJcbiAgICBjb25zdCBISVAgPSB2YWx1ZS5udW1iZXIgIT09IG51bGwgPyB2YWx1ZS5udW1iZXIgOiAnJ1xyXG4gICAgY29uc3QgbmFtZXMgPSAodmFsdWUubmFtZXMgIT09IG51bGwgJiYgdmFsdWUubmFtZVNldCkgPyBTZXJpYWxpemVyLndyaXRlU3RyaW5nKHZhbHVlLm5hbWVzLmpvaW4oJzonKSkgOiAnJ1xyXG4gICAgcmV0dXJuIFttb2RlLCB0eXBlLCBISVAsIG5hbWVzXS5qb2luKCcgJykudHJpbSgpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTVENXcml0ZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1dyaXRlci9TVENXcml0ZXIudHMiLCJpbXBvcnQgVGV4dFdyaXRlciBmcm9tICcuL1RleHRXcml0ZXInXHJcbmltcG9ydCB7IFNlcmlhbGl6ZXIgfSBmcm9tICcuLi9TZXJpYWxpemVyJ1xyXG5cclxuY2xhc3MgU1NDV3JpdGVyIGV4dGVuZHMgVGV4dFdyaXRlciB7XHJcbiAgd3JpdGVIZWFkZXIgKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbW9kZSA9ICh2YWx1ZS5tb2RlICE9PSBudWxsICYmIHZhbHVlLm1vZGVTZXQpID8gdmFsdWUubW9kZSA6ICcnXHJcbiAgICBjb25zdCB0eXBlID0gKHZhbHVlLnR5cGUgIT09IG51bGwgJiYgdmFsdWUudHlwZVNldCkgPyB2YWx1ZS50eXBlIDogJydcclxuICAgIGNvbnN0IG5hbWVzID0gdmFsdWUubmFtZXMgIT09IG51bGwgPyBTZXJpYWxpemVyLndyaXRlU3RyaW5nKHZhbHVlLm5hbWVzLmpvaW4oJzonKSkgOiAnJ1xyXG4gICAgY29uc3QgcGFyZW50TmFtZSA9IHZhbHVlLnBhdGhUb1BhcmVudCAhPT0gbnVsbCA/IFNlcmlhbGl6ZXIud3JpdGVTdHJpbmcodmFsdWUucGF0aFRvUGFyZW50LmpvaW4oJy8nKSkgOiAnJ1xyXG4gICAgcmV0dXJuIFttb2RlLCB0eXBlLCBuYW1lcywgcGFyZW50TmFtZV0uam9pbignICcpLnRyaW0oKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU1NDV3JpdGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Xcml0ZXIvU1NDV3JpdGVyLnRzIiwiaW1wb3J0IFRleHRXcml0ZXIgZnJvbSAnLi9UZXh0V3JpdGVyJ1xyXG5pbXBvcnQgeyBTZXJpYWxpemVyIH0gZnJvbSAnLi4vU2VyaWFsaXplcidcclxuXHJcbmNsYXNzIERTQ1dyaXRlciBleHRlbmRzIFRleHRXcml0ZXIge1xyXG4gIHdyaXRlSGVhZGVyICh2YWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGNhdGFsb2dOdW1iZXIgPSB2YWx1ZS5udW1iZXIgIT09IG51bGwgPyBTdHJpbmcodmFsdWUubnVtYmVyKSA6ICcnXHJcbiAgICBjb25zdCB0eXBlID0gdmFsdWUudHlwZSAhPT0gbnVsbCA/IHZhbHVlLnR5cGUgOiAnJ1xyXG4gICAgY29uc3QgbmFtZSA9IHZhbHVlLm5hbWVzICE9PSBudWxsID8gU2VyaWFsaXplci53cml0ZVN0cmluZyh2YWx1ZS5uYW1lcy5qb2luKCc6JykpIDogJydcclxuICAgIHJldHVybiBbY2F0YWxvZ051bWJlciwgdHlwZSwgbmFtZV0uam9pbignICcpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEU0NXcml0ZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1dyaXRlci9EU0NXcml0ZXIudHMiLCJpbXBvcnQgQ29uZmlnV3JpdGVyIGZyb20gJy4vQ29uZmlnV3JpdGVyJ1xyXG5cclxuY2xhc3MgRFNDV3JpdGVyIGV4dGVuZHMgQ29uZmlnV3JpdGVyIHtcclxuICB3cml0ZUhlYWRlciAodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gJ0NvbmZpZ3VyYXRpb24gJ1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRFNDV3JpdGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Xcml0ZXIvQ0ZHV3JpdGVyLnRzIiwiaW1wb3J0IEJpbmFyeVdyaXRlciBmcm9tICcuL0JpbmFyeVdyaXRlcidcclxuaW1wb3J0IE1FVEEgZnJvbSAnLi4vdXRpbHMvRGF0TWV0YSdcclxuaW1wb3J0IHsgZW5jb2RlU3BlY3RyYWxDbGFzcyB9IGZyb20gJy4uL3V0aWxzJ1xyXG5cclxuY2xhc3MgREFUV3JpdGVyIGV4dGVuZHMgQmluYXJ5V3JpdGVyIHtcclxuICBwcm9jZXNzIChpdGVtczogYW55W10pOiBCdWZmZXIge1xyXG4gICAgY29uc3QgaGVhZGVyID0gTUVUQS5GSUxFX0hFQURFUlxyXG4gICAgY29uc3QgdmVyc2lvbiA9IE1FVEEuVkVSU0lPTiAgIC8vIDIgYnl0ZXNcclxuICAgIGNvbnN0IGl0ZW1zQ291bnQgPSBpdGVtcy5sZW5ndGggICAgIC8vIDQgYnl0ZXNcclxuICAgIGNvbnN0IGhlYWRlck9mZnNldCA9IGhlYWRlci5sZW5ndGggKyA2XHJcbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuYWxsb2MoaGVhZGVyT2Zmc2V0ICsgaXRlbXNDb3VudCAqIDIwKVxyXG4gICAgYnVmZmVyLndyaXRlKGhlYWRlciwgMClcclxuICAgIGJ1ZmZlci53cml0ZVVJbnQxNkxFKHZlcnNpb24sIE1FVEEuRklMRV9IRUFERVIubGVuZ3RoKVxyXG4gICAgYnVmZmVyLndyaXRlVUludDMyTEUoaXRlbXNDb3VudCwgTUVUQS5GSUxFX0hFQURFUi5sZW5ndGggKyAyKVxyXG5cclxuICAgIGxldCBvZmZzZXQgPSBoZWFkZXJPZmZzZXRcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zQ291bnQ7ICsraSkge1xyXG4gICAgICBidWZmZXIud3JpdGVVSW50MzJMRShpdGVtc1tpXS5tZXRhLm51bWJlciwgb2Zmc2V0LCB0cnVlKVxyXG4gICAgICBidWZmZXIud3JpdGVGbG9hdExFKGl0ZW1zW2ldLnByb3BlcnRpZXMuRGlzdGFuY2UsIG9mZnNldCArIDQsIHRydWUpXHJcbiAgICAgIGJ1ZmZlci53cml0ZUZsb2F0TEUoaXRlbXNbaV0ucHJvcGVydGllcy5SQSwgb2Zmc2V0ICsgOCwgdHJ1ZSlcclxuICAgICAgYnVmZmVyLndyaXRlRmxvYXRMRShpdGVtc1tpXS5wcm9wZXJ0aWVzLkRlYywgb2Zmc2V0ICsgMTIsIHRydWUpXHJcbiAgICAgIGJ1ZmZlci53cml0ZUludDE2TEUoaXRlbXNbaV0ucHJvcGVydGllcy5BYnNNYWcsIG9mZnNldCArIDE2LCB0cnVlKVxyXG4gICAgICBidWZmZXIud3JpdGVVSW50MTZMRShlbmNvZGVTcGVjdHJhbENsYXNzKGl0ZW1zW2ldLnByb3BlcnRpZXMuU3BlY3RyYWxUeXBlKSwgb2Zmc2V0ICsgMTgsIHRydWUpXHJcbiAgICAgIG9mZnNldCArPSAyMFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJ1ZmZlclxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgREFUV3JpdGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Xcml0ZXIvREFUV3JpdGVyLnRzIiwiaW1wb3J0IEFic3RyYWN0V3JpdGVyIGZyb20gJy4vQWJzdHJhY3RXcml0ZXInXHJcblxyXG5hYnN0cmFjdCBjbGFzcyBCaW5hcnlXcml0ZXIgaW1wbGVtZW50cyBBYnN0cmFjdFdyaXRlciB7XHJcbiAgd3JpdGUgKHR5cGU6IHN0cmluZywgaXRlbXM6IGFueVtdKTogUHJvbWlzZTxCdWZmZXI+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0aGlzLnByb2Nlc3MoaXRlbXMpKVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGFic3RyYWN0IHByb2Nlc3MgKGl0ZW1zOiBhbnlbXSk6IEJ1ZmZlclxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCaW5hcnlXcml0ZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1dyaXRlci9CaW5hcnlXcml0ZXIudHMiLCJpbXBvcnQgKiBhcyBDRkdHcmFtbWFyIGZyb20gJy4vY2ZncGFyc2VyLm5lJ1xyXG5pbXBvcnQgKiBhcyBEU0NHcmFtbWFyIGZyb20gJy4vZHNjcGFyc2VyLm5lJ1xyXG5pbXBvcnQgKiBhcyBTU0NHcmFtbWFyIGZyb20gJy4vc3NjcGFyc2VyLm5lJ1xyXG5pbXBvcnQgKiBhcyBTVENHcmFtbWFyIGZyb20gJy4vc3RjcGFyc2VyLm5lJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIENGR0dyYW1tYXIsXHJcbiAgRFNDR3JhbW1hcixcclxuICBTU0NHcmFtbWFyLFxyXG4gIFNUQ0dyYW1tYXJcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ3JhbW1hci9pbmRleC50cyIsIi8vIEdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IG5lYXJsZXlcbi8vIGh0dHA6Ly9naXRodWIuY29tL0hhcmRtYXRoMTIzL25lYXJsZXlcbihmdW5jdGlvbiAoKSB7XG5mdW5jdGlvbiBpZCh4KSB7cmV0dXJuIHhbMF07IH1cblxyXG4gIGNvbnN0IGZyb21QYWlycyA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgcmV0dXJuIGlucHV0LnJlZHVjZSgoYWNjLCBpKSA9PiB7XHJcbiAgICAgICAgYWNjW2lbMF1dID0gaVsxXVxyXG4gICAgICAgIHJldHVybiBhY2NcclxuICAgIH0sIHt9KVxyXG4gIH1cclxuICBjb25zdCBtb28gPSByZXF1aXJlKCdtb28nKVxyXG5cclxuICBjb25zdCBudWxsZXIgPSB4ID0+IG51bGxcclxuXHJcbiAgY29uc3QgbGV4ZXIgPSBtb28uY29tcGlsZSh7XHJcbiAgICBDT05GSUdfS0VZV09SRDogL0NvbmZpZ3VyYXRpb25cXGIvLFxyXG5cclxuICAgIEFERF9NT0RFOiAvQWRkXFxiLyxcclxuICAgIE1PRElGWV9NT0RFOiAvTW9kaWZ5XFxiLyxcclxuICAgIFJFUExBQ0VfTU9ERTogL1JlcGxhY2VcXGIvLFxyXG5cclxuICAgIFNTQ19CT0RZX1RZUEU6IC9Cb2R5XFxiLyxcclxuICAgIFNTQ19SRUZfUE9JTlRfVFlQRTogL1JlZmVyZW5jZVBvaW50XFxiLyxcclxuICAgIFNTQ19TVVJGX1BPSU5UX1RZUEU6IC9TdXJmYWNlUG9pbnRcXGIvLFxyXG4gICAgU1NDX0FMVF9TVVJGQUNFOiAvQWx0U3VyZmFjZVxcYi8sXHJcbiAgICBTU0NfTE9DQVRJT046IC9Mb2NhdGlvblxcYi8sXHJcblxyXG4gICAgU1RDX1NUQVJfVFlQRTogL1N0YXJcXGIvLFxyXG4gICAgU1RDX0JBUllDRU5URVJfVFlQRTogL0JhcnljZW50ZXJcXGIvLFxyXG5cclxuICAgIERTQ19HQUxBWFlfVFlQRTogL0dhbGF4eVxcYi8sXHJcbiAgICBEU0NfR0xPQlVMQVJfVFlQRTogL0dsb2J1bGFyXFxiLyxcclxuICAgIERTQ19ORUJVTEFfVFlQRTogL05lYnVsYVxcYi8sXHJcbiAgICBEU0NfT1BFTl9DTFVTVEVSX1RZUEU6IC9PcGVuQ2x1c3RlclxcYi8sXHJcblxyXG4gICAgVFJVRTogL3RydWUvLFxyXG4gICAgRkFMU0U6IC9mYWxzZS8sXHJcblxyXG4gICAgTlVNQkVSOiAvWystXT9bMC05XSsoPzpcXC5bMC05XSspPyg/OltlRV1bKy1dWzAtOV0rKT8vLFxyXG4gICAgV09SRDogL1tcXHddK1xcYi8sXHJcbiAgICBTVFJJTkc6IC9cIig/OlxcXFxbI1wiXFxcXF18W15cXG5cIlxcXFxdKSpcIi8sXHJcbiAgICBCUkFDRV9MOiAneycsXHJcbiAgICBCUkFDRV9SOiAnfScsXHJcbiAgICBTUVVfQlJBX0w6ICdbJyxcclxuICAgIFNRVV9CUkFfUjogJ10nLFxyXG4gICAgV1M6IHtcclxuICAgICAgbWF0Y2g6IC9bXFxzXSsvLFxyXG4gICAgICBsaW5lQnJlYWtzOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgQ09NTUVOVDoge1xyXG4gICAgICBtYXRjaDogLyMuKj9cXHJcXG4vLFxyXG4gICAgICBsaW5lQnJlYWtzOiB0cnVlXHJcbiAgICB9XHJcbiAgfSlcclxudmFyIGdyYW1tYXIgPSB7XG4gICAgTGV4ZXI6IGxleGVyLFxuICAgIFBhcnNlclJ1bGVzOiBbXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJCT09MRUFOXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIk5VTUJFUlwiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJTVFJJTkdcIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBcIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiQVJSQVlcIl19LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUCRlYm5mJDFcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVAkZWJuZiQyXCIsIFwiR1JPVVBfUFJPUEVSVFlcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkJSQUNFX0xcIikgPyB7dHlwZTogXCJCUkFDRV9MXCJ9IDogQlJBQ0VfTCksIFwiR1JPVVAkZWJuZiQxXCIsIFwiR1JPVVAkZWJuZiQyXCIsIChsZXhlci5oYXMoXCJCUkFDRV9SXCIpID8ge3R5cGU6IFwiQlJBQ0VfUlwifSA6IEJSQUNFX1IpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGZyb21QYWlycyhkYXRhWzJdKX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUF9QUk9QRVJUWVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJXT1JEXCIpID8ge3R5cGU6IFwiV09SRFwifSA6IFdPUkQpLCBcIldTXCIsIFwiVkFMVUVcIiwgXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBbIGRhdGFbMF0udmFsdWUsIGRhdGFbMl1bMF0gXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiQVJSQVkkZWJuZiQyXCIsIFwiQVJSQVlfRUxFTUVOVFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiU1FVX0JSQV9MXCIpID8ge3R5cGU6IFwiU1FVX0JSQV9MXCJ9IDogU1FVX0JSQV9MKSwgXCJBUlJBWSRlYm5mJDFcIiwgXCJBUlJBWSRlYm5mJDJcIiwgKGxleGVyLmhhcyhcIlNRVV9CUkFfUlwiKSA/IHt0eXBlOiBcIlNRVV9CUkFfUlwifSA6IFNRVV9CUkFfUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVsyXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlRcIiwgXCJzeW1ib2xzXCI6IFtcIlZBTFVFXCIsIFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiQk9PTEVBTlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJUUlVFXCIpID8ge3R5cGU6IFwiVFJVRVwifSA6IFRSVUUpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUgPT09ICd0cnVlJ30sXG4gICAge1wibmFtZVwiOiBcIkJPT0xFQU5cIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiRkFMU0VcIikgPyB7dHlwZTogXCJGQUxTRVwifSA6IEZBTFNFKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlID09PSAndHJ1ZSd9LFxuICAgIHtcIm5hbWVcIjogXCJXT1JEXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIldPUkRcIikgPyB7dHlwZTogXCJXT1JEXCJ9IDogV09SRCldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIk5VTUJFUlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJOVU1CRVJcIikgPyB7dHlwZTogXCJOVU1CRVJcIn0gOiBOVU1CRVIpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IHBhcnNlRmxvYXQoZGF0YVswXS52YWx1ZSl9LFxuICAgIHtcIm5hbWVcIjogXCJTVFJJTkdcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiU1RSSU5HXCIpID8ge3R5cGU6IFwiU1RSSU5HXCJ9IDogU1RSSU5HKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlLnNwbGl0KCdcIicpWzFdfSxcbiAgICB7XCJuYW1lXCI6IFwiV1NcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiV1NcIikgPyB7dHlwZTogXCJXU1wifSA6IFdTKV0sIFwicG9zdHByb2Nlc3NcIjogbnVsbGVyfSxcbiAgICB7XCJuYW1lXCI6IFwiV1NcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiQ09NTUVOVFwiKSA/IHt0eXBlOiBcIkNPTU1FTlRcIn0gOiBDT01NRU5UKV0sIFwicG9zdHByb2Nlc3NcIjogbnVsbGVyfSxcbiAgICB7XCJuYW1lXCI6IFwiQ09ORklHXCIsIFwic3ltYm9sc1wiOiBbXCJDT05GSUdfS0VZV09SRFwiLCBcIkNPTkZJR19ERVNDUklQVElPTlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAgKFtrZXl3b3JkLCBwYXJhbXNdKSA9PiB7XHJcbiAgICAgICAgICBkZWJ1Z2dlclxyXG4gICAgICAgICAgcmV0dXJuIHBhcmFtc1xyXG4gICAgICAgIH0gfSxcbiAgICB7XCJuYW1lXCI6IFwiQ09ORklHX0tFWVdPUkQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkNPTkZJR19LRVlXT1JEJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiQ09ORklHX0tFWVdPUkQkZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkNPTkZJR19LRVlXT1JEJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJDT05GSUdfS0VZV09SRCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcIkNPTkZJR19LRVlXT1JEJGVibmYkMlwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJDT05GSUdfS0VZV09SRFwiLCBcInN5bWJvbHNcIjogW1wiQ09ORklHX0tFWVdPUkQkZWJuZiQxXCIsIChsZXhlci5oYXMoXCJDT05GSUdfS0VZV09SRFwiKSA/IHt0eXBlOiBcIkNPTkZJR19LRVlXT1JEXCJ9IDogQ09ORklHX0tFWVdPUkQpLCBcIkNPTkZJR19LRVlXT1JEJGVibmYkMlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoW2tleXdvcmRdKSA9PiBrZXl3b3JkWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiQ09ORklHX0RFU0NSSVBUSU9OJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJDT05GSUdfREVTQ1JJUFRJT04kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJDT05GSUdfREVTQ1JJUFRJT04kZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkNPTkZJR19ERVNDUklQVElPTlwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBcIiwgXCJDT05GSUdfREVTQ1JJUFRJT04kZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChbcHJvcGVydGllc10pID0+IHByb3BlcnRpZXN9XG5dXG4gICwgUGFyc2VyU3RhcnQ6IFwiQ09ORklHXCJcbn1cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIG1vZHVsZS5leHBvcnRzID0gZ3JhbW1hcjtcbn0gZWxzZSB7XG4gICB3aW5kb3cuZ3JhbW1hciA9IGdyYW1tYXI7XG59XG59KSgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ3JhbW1hci9jZmdwYXJzZXIubmVcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IG5lYXJsZXlcbi8vIGh0dHA6Ly9naXRodWIuY29tL0hhcmRtYXRoMTIzL25lYXJsZXlcbihmdW5jdGlvbiAoKSB7XG5mdW5jdGlvbiBpZCh4KSB7cmV0dXJuIHhbMF07IH1cblxyXG4gIGxldCBnbG9iYWxJZCA9IDBcclxuXG5cclxuICBjb25zdCBmcm9tUGFpcnMgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgIHJldHVybiBpbnB1dC5yZWR1Y2UoKGFjYywgaSkgPT4ge1xyXG4gICAgICAgIGFjY1tpWzBdXSA9IGlbMV1cclxuICAgICAgICByZXR1cm4gYWNjXHJcbiAgICB9LCB7fSlcclxuICB9XHJcbiAgY29uc3QgbW9vID0gcmVxdWlyZSgnbW9vJylcclxuXHJcbiAgY29uc3QgbnVsbGVyID0geCA9PiBudWxsXHJcblxyXG4gIGNvbnN0IGxleGVyID0gbW9vLmNvbXBpbGUoe1xyXG4gICAgQ09ORklHX0tFWVdPUkQ6IC9Db25maWd1cmF0aW9uXFxiLyxcclxuXHJcbiAgICBBRERfTU9ERTogL0FkZFxcYi8sXHJcbiAgICBNT0RJRllfTU9ERTogL01vZGlmeVxcYi8sXHJcbiAgICBSRVBMQUNFX01PREU6IC9SZXBsYWNlXFxiLyxcclxuXHJcbiAgICBTU0NfQk9EWV9UWVBFOiAvQm9keVxcYi8sXHJcbiAgICBTU0NfUkVGX1BPSU5UX1RZUEU6IC9SZWZlcmVuY2VQb2ludFxcYi8sXHJcbiAgICBTU0NfU1VSRl9QT0lOVF9UWVBFOiAvU3VyZmFjZVBvaW50XFxiLyxcclxuICAgIFNTQ19BTFRfU1VSRkFDRTogL0FsdFN1cmZhY2VcXGIvLFxyXG4gICAgU1NDX0xPQ0FUSU9OOiAvTG9jYXRpb25cXGIvLFxyXG5cclxuICAgIFNUQ19TVEFSX1RZUEU6IC9TdGFyXFxiLyxcclxuICAgIFNUQ19CQVJZQ0VOVEVSX1RZUEU6IC9CYXJ5Y2VudGVyXFxiLyxcclxuXHJcbiAgICBEU0NfR0FMQVhZX1RZUEU6IC9HYWxheHlcXGIvLFxyXG4gICAgRFNDX0dMT0JVTEFSX1RZUEU6IC9HbG9idWxhclxcYi8sXHJcbiAgICBEU0NfTkVCVUxBX1RZUEU6IC9OZWJ1bGFcXGIvLFxyXG4gICAgRFNDX09QRU5fQ0xVU1RFUl9UWVBFOiAvT3BlbkNsdXN0ZXJcXGIvLFxyXG5cclxuICAgIFRSVUU6IC90cnVlLyxcclxuICAgIEZBTFNFOiAvZmFsc2UvLFxyXG5cclxuICAgIE5VTUJFUjogL1srLV0/WzAtOV0rKD86XFwuWzAtOV0rKT8oPzpbZUVdWystXVswLTldKyk/LyxcclxuICAgIFdPUkQ6IC9bXFx3XStcXGIvLFxyXG4gICAgU1RSSU5HOiAvXCIoPzpcXFxcWyNcIlxcXFxdfFteXFxuXCJcXFxcXSkqXCIvLFxyXG4gICAgQlJBQ0VfTDogJ3snLFxyXG4gICAgQlJBQ0VfUjogJ30nLFxyXG4gICAgU1FVX0JSQV9MOiAnWycsXHJcbiAgICBTUVVfQlJBX1I6ICddJyxcclxuICAgIFdTOiB7XHJcbiAgICAgIG1hdGNoOiAvW1xcc10rLyxcclxuICAgICAgbGluZUJyZWFrczogdHJ1ZVxyXG4gICAgfSxcclxuICAgIENPTU1FTlQ6IHtcclxuICAgICAgbWF0Y2g6IC8jLio/XFxyXFxuLyxcclxuICAgICAgbGluZUJyZWFrczogdHJ1ZVxyXG4gICAgfVxyXG4gIH0pXHJcbnZhciBncmFtbWFyID0ge1xuICAgIExleGVyOiBsZXhlcixcbiAgICBQYXJzZXJSdWxlczogW1xuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiQk9PTEVBTlwiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJOVU1CRVJcIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiU1RSSU5HXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIkFSUkFZXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVAkZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQJGVibmYkMlwiLCBcIkdST1VQX1BST1BFUlRZXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUFwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJCUkFDRV9MXCIpID8ge3R5cGU6IFwiQlJBQ0VfTFwifSA6IEJSQUNFX0wpLCBcIkdST1VQJGVibmYkMVwiLCBcIkdST1VQJGVibmYkMlwiLCAobGV4ZXIuaGFzKFwiQlJBQ0VfUlwiKSA/IHt0eXBlOiBcIkJSQUNFX1JcIn0gOiBCUkFDRV9SKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBmcm9tUGFpcnMoZGF0YVsyXSl9LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBfUFJPUEVSVFlcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiV09SRFwiKSA/IHt0eXBlOiBcIldPUkRcIn0gOiBXT1JEKSwgXCJXU1wiLCBcIlZBTFVFXCIsIFwiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gWyBkYXRhWzBdLnZhbHVlLCBkYXRhWzJdWzBdIF19LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcIkFSUkFZJGVibmYkMlwiLCBcIkFSUkFZX0VMRU1FTlRcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNRVV9CUkFfTFwiKSA/IHt0eXBlOiBcIlNRVV9CUkFfTFwifSA6IFNRVV9CUkFfTCksIFwiQVJSQVkkZWJuZiQxXCIsIFwiQVJSQVkkZWJuZiQyXCIsIChsZXhlci5oYXMoXCJTUVVfQlJBX1JcIikgPyB7dHlwZTogXCJTUVVfQlJBX1JcIn0gOiBTUVVfQlJBX1IpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMl19LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWV9FTEVNRU5UJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWV9FTEVNRU5UJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWV9FTEVNRU5UXCIsIFwic3ltYm9sc1wiOiBbXCJWQUxVRVwiLCBcIkFSUkFZX0VMRU1FTlQkZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXVswXX0sXG4gICAge1wibmFtZVwiOiBcIkJPT0xFQU5cIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiVFJVRVwiKSA/IHt0eXBlOiBcIlRSVUVcIn0gOiBUUlVFKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlID09PSAndHJ1ZSd9LFxuICAgIHtcIm5hbWVcIjogXCJCT09MRUFOXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkZBTFNFXCIpID8ge3R5cGU6IFwiRkFMU0VcIn0gOiBGQUxTRSldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZSA9PT0gJ3RydWUnfSxcbiAgICB7XCJuYW1lXCI6IFwiV09SRFwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJXT1JEXCIpID8ge3R5cGU6IFwiV09SRFwifSA6IFdPUkQpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWV9LFxuICAgIHtcIm5hbWVcIjogXCJOVU1CRVJcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiTlVNQkVSXCIpID8ge3R5cGU6IFwiTlVNQkVSXCJ9IDogTlVNQkVSKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBwYXJzZUZsb2F0KGRhdGFbMF0udmFsdWUpfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RSSU5HXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNUUklOR1wiKSA/IHt0eXBlOiBcIlNUUklOR1wifSA6IFNUUklORyldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZS5zcGxpdCgnXCInKVsxXX0sXG4gICAge1wibmFtZVwiOiBcIldTXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIldTXCIpID8ge3R5cGU6IFwiV1NcIn0gOiBXUyldLCBcInBvc3Rwcm9jZXNzXCI6IG51bGxlcn0sXG4gICAge1wibmFtZVwiOiBcIldTXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkNPTU1FTlRcIikgPyB7dHlwZTogXCJDT01NRU5UXCJ9IDogQ09NTUVOVCldLCBcInBvc3Rwcm9jZXNzXCI6IG51bGxlcn0sXG4gICAge1wibmFtZVwiOiBcIkRTQ19DQVRBTE9HJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfQ0FUQUxPRyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkRTQ19DQVRBTE9HJGVibmYkMVwiLCBcIkRTQ19ERUZJTklUSU9OXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfQ0FUQUxPR1wiLCBcInN5bWJvbHNcIjogW1wiRFNDX0NBVEFMT0ckZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX0RFRklOSVRJT04kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkRTQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiRFNDX0RFRklOSVRJT04kZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkRTQ19ERUZJTklUSU9OJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiRFNDX05VTUJFUlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkRTQ19ERUZJTklUSU9OJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfREVGSU5JVElPTlwiLCBcInN5bWJvbHNcIjogW1wiRFNDX0RFRklOSVRJT04kZWJuZiQxXCIsIFwiRFNDX0RFRklOSVRJT04kZWJuZiQyXCIsIFwiRFNDX09CSkVDVF9UWVBFXCIsIFwiRFNDX05BTUVcIiwgXCJEU0NfUFJPUEVSVElFU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcclxuICAgICAgICAoWywgbnVtYmVyLCB0eXBlLCBuYW1lLCBwcm9wZXJ0aWVzXSkgPT4ge1xyXG4gICAgICAgICAgaWYgKG51bWJlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBudW1iZXIgPSBnbG9iYWxJZCsrXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgICBudW1iZXIsXHJcbiAgICAgICAgICAgICAgbmFtZXM6IG5hbWUuc3BsaXQoJzonKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcIkRTQ19QUk9QRVJUSUVTXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUFwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXX0sXG4gICAge1wibmFtZVwiOiBcIkRTQ19OVU1CRVJcIiwgXCJzeW1ib2xzXCI6IFtcIk5VTUJFUlwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXX0sXG4gICAge1wibmFtZVwiOiBcIkRTQ19OQU1FXCIsIFwic3ltYm9sc1wiOiBbXCJTVFJJTkdcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF19LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfT0JKRUNUX1RZUEVcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiRFNDX0dBTEFYWV9UWVBFXCIpID8ge3R5cGU6IFwiRFNDX0dBTEFYWV9UWVBFXCJ9IDogRFNDX0dBTEFYWV9UWVBFKSwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWV9LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfT0JKRUNUX1RZUEVcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiRFNDX0dMT0JVTEFSX1RZUEVcIikgPyB7dHlwZTogXCJEU0NfR0xPQlVMQVJfVFlQRVwifSA6IERTQ19HTE9CVUxBUl9UWVBFKSwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWV9LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfT0JKRUNUX1RZUEVcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiRFNDX05FQlVMQV9UWVBFXCIpID8ge3R5cGU6IFwiRFNDX05FQlVMQV9UWVBFXCJ9IDogRFNDX05FQlVMQV9UWVBFKSwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWV9LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfT0JKRUNUX1RZUEVcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiRFNDX09QRU5fQ0xVU1RFUl9UWVBFXCIpID8ge3R5cGU6IFwiRFNDX09QRU5fQ0xVU1RFUl9UWVBFXCJ9IDogRFNDX09QRU5fQ0xVU1RFUl9UWVBFKSwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWV9XG5dXG4gICwgUGFyc2VyU3RhcnQ6IFwiRFNDX0NBVEFMT0dcIlxufVxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgbW9kdWxlLmV4cG9ydHMgPSBncmFtbWFyO1xufSBlbHNlIHtcbiAgIHdpbmRvdy5ncmFtbWFyID0gZ3JhbW1hcjtcbn1cbn0pKCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ncmFtbWFyL2RzY3BhcnNlci5uZVxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gR2VuZXJhdGVkIGF1dG9tYXRpY2FsbHkgYnkgbmVhcmxleVxuLy8gaHR0cDovL2dpdGh1Yi5jb20vSGFyZG1hdGgxMjMvbmVhcmxleVxuKGZ1bmN0aW9uICgpIHtcbmZ1bmN0aW9uIGlkKHgpIHtyZXR1cm4geFswXTsgfVxuXHJcbiAgY29uc3QgZnJvbVBhaXJzID0gZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICByZXR1cm4gaW5wdXQucmVkdWNlKChhY2MsIGkpID0+IHtcclxuICAgICAgICBhY2NbaVswXV0gPSBpWzFdXHJcbiAgICAgICAgcmV0dXJuIGFjY1xyXG4gICAgfSwge30pXHJcbiAgfVxyXG4gIGNvbnN0IG1vbyA9IHJlcXVpcmUoJ21vbycpXHJcblxyXG4gIGNvbnN0IG51bGxlciA9IHggPT4gbnVsbFxyXG5cclxuICBjb25zdCBsZXhlciA9IG1vby5jb21waWxlKHtcclxuICAgIENPTkZJR19LRVlXT1JEOiAvQ29uZmlndXJhdGlvblxcYi8sXHJcblxyXG4gICAgQUREX01PREU6IC9BZGRcXGIvLFxyXG4gICAgTU9ESUZZX01PREU6IC9Nb2RpZnlcXGIvLFxyXG4gICAgUkVQTEFDRV9NT0RFOiAvUmVwbGFjZVxcYi8sXHJcblxyXG4gICAgU1NDX0JPRFlfVFlQRTogL0JvZHlcXGIvLFxyXG4gICAgU1NDX1JFRl9QT0lOVF9UWVBFOiAvUmVmZXJlbmNlUG9pbnRcXGIvLFxyXG4gICAgU1NDX1NVUkZfUE9JTlRfVFlQRTogL1N1cmZhY2VQb2ludFxcYi8sXHJcbiAgICBTU0NfQUxUX1NVUkZBQ0U6IC9BbHRTdXJmYWNlXFxiLyxcclxuICAgIFNTQ19MT0NBVElPTjogL0xvY2F0aW9uXFxiLyxcclxuXHJcbiAgICBTVENfU1RBUl9UWVBFOiAvU3RhclxcYi8sXHJcbiAgICBTVENfQkFSWUNFTlRFUl9UWVBFOiAvQmFyeWNlbnRlclxcYi8sXHJcblxyXG4gICAgRFNDX0dBTEFYWV9UWVBFOiAvR2FsYXh5XFxiLyxcclxuICAgIERTQ19HTE9CVUxBUl9UWVBFOiAvR2xvYnVsYXJcXGIvLFxyXG4gICAgRFNDX05FQlVMQV9UWVBFOiAvTmVidWxhXFxiLyxcclxuICAgIERTQ19PUEVOX0NMVVNURVJfVFlQRTogL09wZW5DbHVzdGVyXFxiLyxcclxuXHJcbiAgICBUUlVFOiAvdHJ1ZS8sXHJcbiAgICBGQUxTRTogL2ZhbHNlLyxcclxuXHJcbiAgICBOVU1CRVI6IC9bKy1dP1swLTldKyg/OlxcLlswLTldKyk/KD86W2VFXVsrLV1bMC05XSspPy8sXHJcbiAgICBXT1JEOiAvW1xcd10rXFxiLyxcclxuICAgIFNUUklORzogL1wiKD86XFxcXFsjXCJcXFxcXXxbXlxcblwiXFxcXF0pKlwiLyxcclxuICAgIEJSQUNFX0w6ICd7JyxcclxuICAgIEJSQUNFX1I6ICd9JyxcclxuICAgIFNRVV9CUkFfTDogJ1snLFxyXG4gICAgU1FVX0JSQV9SOiAnXScsXHJcbiAgICBXUzoge1xyXG4gICAgICBtYXRjaDogL1tcXHNdKy8sXHJcbiAgICAgIGxpbmVCcmVha3M6IHRydWVcclxuICAgIH0sXHJcbiAgICBDT01NRU5UOiB7XHJcbiAgICAgIG1hdGNoOiAvIy4qP1xcclxcbi8sXHJcbiAgICAgIGxpbmVCcmVha3M6IHRydWVcclxuICAgIH1cclxuICB9KVxyXG52YXIgZ3JhbW1hciA9IHtcbiAgICBMZXhlcjogbGV4ZXIsXG4gICAgUGFyc2VyUnVsZXM6IFtcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIkJPT0xFQU5cIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiTlVNQkVSXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIlNUUklOR1wiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUFwiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJBUlJBWVwiXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUCRlYm5mJDJcIiwgXCJHUk9VUF9QUk9QRVJUWVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiQlJBQ0VfTFwiKSA/IHt0eXBlOiBcIkJSQUNFX0xcIn0gOiBCUkFDRV9MKSwgXCJHUk9VUCRlYm5mJDFcIiwgXCJHUk9VUCRlYm5mJDJcIiwgKGxleGVyLmhhcyhcIkJSQUNFX1JcIikgPyB7dHlwZTogXCJCUkFDRV9SXCJ9IDogQlJBQ0VfUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZnJvbVBhaXJzKGRhdGFbMl0pfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIldPUkRcIikgPyB7dHlwZTogXCJXT1JEXCJ9IDogV09SRCksIFwiV1NcIiwgXCJWQUxVRVwiLCBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IFsgZGF0YVswXS52YWx1ZSwgZGF0YVsyXVswXSBdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJBUlJBWSRlYm5mJDJcIiwgXCJBUlJBWV9FTEVNRU5UXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTUVVfQlJBX0xcIikgPyB7dHlwZTogXCJTUVVfQlJBX0xcIn0gOiBTUVVfQlJBX0wpLCBcIkFSUkFZJGVibmYkMVwiLCBcIkFSUkFZJGVibmYkMlwiLCAobGV4ZXIuaGFzKFwiU1FVX0JSQV9SXCIpID8ge3R5cGU6IFwiU1FVX0JSQV9SXCJ9IDogU1FVX0JSQV9SKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzJdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVFwiLCBcInN5bWJvbHNcIjogW1wiVkFMVUVcIiwgXCJBUlJBWV9FTEVNRU5UJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF1bMF19LFxuICAgIHtcIm5hbWVcIjogXCJCT09MRUFOXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlRSVUVcIikgPyB7dHlwZTogXCJUUlVFXCJ9IDogVFJVRSldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZSA9PT0gJ3RydWUnfSxcbiAgICB7XCJuYW1lXCI6IFwiQk9PTEVBTlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJGQUxTRVwiKSA/IHt0eXBlOiBcIkZBTFNFXCJ9IDogRkFMU0UpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUgPT09ICd0cnVlJ30sXG4gICAge1wibmFtZVwiOiBcIldPUkRcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiV09SRFwiKSA/IHt0eXBlOiBcIldPUkRcIn0gOiBXT1JEKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiTlVNQkVSXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIk5VTUJFUlwiKSA/IHt0eXBlOiBcIk5VTUJFUlwifSA6IE5VTUJFUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gcGFyc2VGbG9hdChkYXRhWzBdLnZhbHVlKX0sXG4gICAge1wibmFtZVwiOiBcIlNUUklOR1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTVFJJTkdcIikgPyB7dHlwZTogXCJTVFJJTkdcIn0gOiBTVFJJTkcpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUuc3BsaXQoJ1wiJylbMV19LFxuICAgIHtcIm5hbWVcIjogXCJXU1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJXU1wiKSA/IHt0eXBlOiBcIldTXCJ9IDogV1MpXSwgXCJwb3N0cHJvY2Vzc1wiOiBudWxsZXJ9LFxuICAgIHtcIm5hbWVcIjogXCJXU1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJDT01NRU5UXCIpID8ge3R5cGU6IFwiQ09NTUVOVFwifSA6IENPTU1FTlQpXSwgXCJwb3N0cHJvY2Vzc1wiOiBudWxsZXJ9LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfQ0FUQUxPRyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX0NBVEFMT0ckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJTU0NfQ0FUQUxPRyRlYm5mJDFcIiwgXCJTU0NfREVGSU5JVElPTlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX0NBVEFMT0dcIiwgXCJzeW1ib2xzXCI6IFtcIlNTQ19DQVRBTE9HJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfREVGSU5JVElPTiRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIlNTQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfREVGSU5JVElPTiRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcIlNTQ19PQkpFQ1RfTU9ERVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19ERUZJTklUSU9OJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfREVGSU5JVElPTiRlYm5mJDNcIiwgXCJzeW1ib2xzXCI6IFtcIlNTQ19PQkpFQ1RfVFlQRVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19ERUZJTklUSU9OJGVibmYkM1wiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfREVGSU5JVElPTlwiLCBcInN5bWJvbHNcIjogW1wiU1NDX0RFRklOSVRJT04kZWJuZiQxXCIsIFwiU1NDX0RFRklOSVRJT04kZWJuZiQyXCIsIFwiU1NDX0RFRklOSVRJT04kZWJuZiQzXCIsIFwiU1NDX05BTUVcIiwgXCJTU0NfUEFSRU5UX05BTUVcIiwgXCJTU0NfUFJPUEVSVElFU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcclxuICAgICAgICAoWywgbW9kZSA9ICdBZGQnLCB0eXBlID0gJ0JvZHknLCBuYW1lLCBwYXRoVG9QYXJlbnQsIHByb3BlcnRpZXNdKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgbW9kZTogbW9kZSAhPT0gbnVsbCA/IG1vZGUgOiAnQWRkJyxcclxuICAgICAgICAgICAgICBtb2RlU2V0OiBtb2RlICE9PSBudWxsLFxyXG4gICAgICAgICAgICAgIHR5cGU6IHR5cGUgIT09IG51bGwgPyB0eXBlIDogJ0JvZHknLFxyXG4gICAgICAgICAgICAgIHR5cGVTZXQ6IHR5cGUgIT09IG51bGwsXHJcbiAgICAgICAgICAgICAgbmFtZXM6IG5hbWUuc3BsaXQoJzonKSxcclxuICAgICAgICAgICAgICBwYXRoVG9QYXJlbnQ6IHBhdGhUb1BhcmVudC5zcGxpdCgnLycpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXNcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX1BST1BFUlRJRVNcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9NT0RFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIk1PRElGWV9NT0RFXCIpID8ge3R5cGU6IFwiTU9ESUZZX01PREVcIn0gOiBNT0RJRllfTU9ERSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9NT0RFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkFERF9NT0RFXCIpID8ge3R5cGU6IFwiQUREX01PREVcIn0gOiBBRERfTU9ERSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9NT0RFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlJFUExBQ0VfTU9ERVwiKSA/IHt0eXBlOiBcIlJFUExBQ0VfTU9ERVwifSA6IFJFUExBQ0VfTU9ERSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX1BBUkVOVF9OQU1FXCIsIFwic3ltYm9sc1wiOiBbXCJTVFJJTkdcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF19LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfTkFNRVwiLCBcInN5bWJvbHNcIjogW1wiU1RSSU5HXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNTQ19CT0RZX1RZUEVcIikgPyB7dHlwZTogXCJTU0NfQk9EWV9UWVBFXCJ9IDogU1NDX0JPRFlfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNTQ19SRUZfUE9JTlRfVFlQRVwiKSA/IHt0eXBlOiBcIlNTQ19SRUZfUE9JTlRfVFlQRVwifSA6IFNTQ19SRUZfUE9JTlRfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNTQ19TVVJGX1BPSU5UX1RZUEVcIikgPyB7dHlwZTogXCJTU0NfU1VSRl9QT0lOVF9UWVBFXCJ9IDogU1NDX1NVUkZfUE9JTlRfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNTQ19BTFRfU1VSRkFDRVwiKSA/IHt0eXBlOiBcIlNTQ19BTFRfU1VSRkFDRVwifSA6IFNTQ19BTFRfU1VSRkFDRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNTQ19MT0NBVElPTlwiKSA/IHt0eXBlOiBcIlNTQ19MT0NBVElPTlwifSA6IFNTQ19MT0NBVElPTiksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfVxuXVxuICAsIFBhcnNlclN0YXJ0OiBcIlNTQ19DQVRBTE9HXCJcbn1cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIG1vZHVsZS5leHBvcnRzID0gZ3JhbW1hcjtcbn0gZWxzZSB7XG4gICB3aW5kb3cuZ3JhbW1hciA9IGdyYW1tYXI7XG59XG59KSgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ3JhbW1hci9zc2NwYXJzZXIubmVcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IG5lYXJsZXlcbi8vIGh0dHA6Ly9naXRodWIuY29tL0hhcmRtYXRoMTIzL25lYXJsZXlcbihmdW5jdGlvbiAoKSB7XG5mdW5jdGlvbiBpZCh4KSB7cmV0dXJuIHhbMF07IH1cblxyXG4gIGNvbnN0IHZhbGlkTW9kZXMgPSBbJ01vZGlmeScsICdBZGQnLCAnUmVwbGFjZSddXHJcbiAgY29uc3QgdmFsaWRUeXBlcyA9IFsnU3RhcicsICdCYXJ5Y2VudGVyJ11cclxuXG5cclxuICBjb25zdCBmcm9tUGFpcnMgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgIHJldHVybiBpbnB1dC5yZWR1Y2UoKGFjYywgaSkgPT4ge1xyXG4gICAgICAgIGFjY1tpWzBdXSA9IGlbMV1cclxuICAgICAgICByZXR1cm4gYWNjXHJcbiAgICB9LCB7fSlcclxuICB9XHJcbiAgY29uc3QgbW9vID0gcmVxdWlyZSgnbW9vJylcclxuXHJcbiAgY29uc3QgbnVsbGVyID0geCA9PiBudWxsXHJcblxyXG4gIGNvbnN0IGxleGVyID0gbW9vLmNvbXBpbGUoe1xyXG4gICAgQ09ORklHX0tFWVdPUkQ6IC9Db25maWd1cmF0aW9uXFxiLyxcclxuXHJcbiAgICBBRERfTU9ERTogL0FkZFxcYi8sXHJcbiAgICBNT0RJRllfTU9ERTogL01vZGlmeVxcYi8sXHJcbiAgICBSRVBMQUNFX01PREU6IC9SZXBsYWNlXFxiLyxcclxuXHJcbiAgICBTU0NfQk9EWV9UWVBFOiAvQm9keVxcYi8sXHJcbiAgICBTU0NfUkVGX1BPSU5UX1RZUEU6IC9SZWZlcmVuY2VQb2ludFxcYi8sXHJcbiAgICBTU0NfU1VSRl9QT0lOVF9UWVBFOiAvU3VyZmFjZVBvaW50XFxiLyxcclxuICAgIFNTQ19BTFRfU1VSRkFDRTogL0FsdFN1cmZhY2VcXGIvLFxyXG4gICAgU1NDX0xPQ0FUSU9OOiAvTG9jYXRpb25cXGIvLFxyXG5cclxuICAgIFNUQ19TVEFSX1RZUEU6IC9TdGFyXFxiLyxcclxuICAgIFNUQ19CQVJZQ0VOVEVSX1RZUEU6IC9CYXJ5Y2VudGVyXFxiLyxcclxuXHJcbiAgICBEU0NfR0FMQVhZX1RZUEU6IC9HYWxheHlcXGIvLFxyXG4gICAgRFNDX0dMT0JVTEFSX1RZUEU6IC9HbG9idWxhclxcYi8sXHJcbiAgICBEU0NfTkVCVUxBX1RZUEU6IC9OZWJ1bGFcXGIvLFxyXG4gICAgRFNDX09QRU5fQ0xVU1RFUl9UWVBFOiAvT3BlbkNsdXN0ZXJcXGIvLFxyXG5cclxuICAgIFRSVUU6IC90cnVlLyxcclxuICAgIEZBTFNFOiAvZmFsc2UvLFxyXG5cclxuICAgIE5VTUJFUjogL1srLV0/WzAtOV0rKD86XFwuWzAtOV0rKT8oPzpbZUVdWystXVswLTldKyk/LyxcclxuICAgIFdPUkQ6IC9bXFx3XStcXGIvLFxyXG4gICAgU1RSSU5HOiAvXCIoPzpcXFxcWyNcIlxcXFxdfFteXFxuXCJcXFxcXSkqXCIvLFxyXG4gICAgQlJBQ0VfTDogJ3snLFxyXG4gICAgQlJBQ0VfUjogJ30nLFxyXG4gICAgU1FVX0JSQV9MOiAnWycsXHJcbiAgICBTUVVfQlJBX1I6ICddJyxcclxuICAgIFdTOiB7XHJcbiAgICAgIG1hdGNoOiAvW1xcc10rLyxcclxuICAgICAgbGluZUJyZWFrczogdHJ1ZVxyXG4gICAgfSxcclxuICAgIENPTU1FTlQ6IHtcclxuICAgICAgbWF0Y2g6IC8jLio/XFxyXFxuLyxcclxuICAgICAgbGluZUJyZWFrczogdHJ1ZVxyXG4gICAgfVxyXG4gIH0pXHJcbnZhciBncmFtbWFyID0ge1xuICAgIExleGVyOiBsZXhlcixcbiAgICBQYXJzZXJSdWxlczogW1xuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiQk9PTEVBTlwiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJOVU1CRVJcIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiU1RSSU5HXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIkFSUkFZXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVAkZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQJGVibmYkMlwiLCBcIkdST1VQX1BST1BFUlRZXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUFwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJCUkFDRV9MXCIpID8ge3R5cGU6IFwiQlJBQ0VfTFwifSA6IEJSQUNFX0wpLCBcIkdST1VQJGVibmYkMVwiLCBcIkdST1VQJGVibmYkMlwiLCAobGV4ZXIuaGFzKFwiQlJBQ0VfUlwiKSA/IHt0eXBlOiBcIkJSQUNFX1JcIn0gOiBCUkFDRV9SKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBmcm9tUGFpcnMoZGF0YVsyXSl9LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBfUFJPUEVSVFlcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiV09SRFwiKSA/IHt0eXBlOiBcIldPUkRcIn0gOiBXT1JEKSwgXCJXU1wiLCBcIlZBTFVFXCIsIFwiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gWyBkYXRhWzBdLnZhbHVlLCBkYXRhWzJdWzBdIF19LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcIkFSUkFZJGVibmYkMlwiLCBcIkFSUkFZX0VMRU1FTlRcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNRVV9CUkFfTFwiKSA/IHt0eXBlOiBcIlNRVV9CUkFfTFwifSA6IFNRVV9CUkFfTCksIFwiQVJSQVkkZWJuZiQxXCIsIFwiQVJSQVkkZWJuZiQyXCIsIChsZXhlci5oYXMoXCJTUVVfQlJBX1JcIikgPyB7dHlwZTogXCJTUVVfQlJBX1JcIn0gOiBTUVVfQlJBX1IpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMl19LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWV9FTEVNRU5UJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWV9FTEVNRU5UJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWV9FTEVNRU5UXCIsIFwic3ltYm9sc1wiOiBbXCJWQUxVRVwiLCBcIkFSUkFZX0VMRU1FTlQkZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXVswXX0sXG4gICAge1wibmFtZVwiOiBcIkJPT0xFQU5cIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiVFJVRVwiKSA/IHt0eXBlOiBcIlRSVUVcIn0gOiBUUlVFKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlID09PSAndHJ1ZSd9LFxuICAgIHtcIm5hbWVcIjogXCJCT09MRUFOXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkZBTFNFXCIpID8ge3R5cGU6IFwiRkFMU0VcIn0gOiBGQUxTRSldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZSA9PT0gJ3RydWUnfSxcbiAgICB7XCJuYW1lXCI6IFwiV09SRFwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJXT1JEXCIpID8ge3R5cGU6IFwiV09SRFwifSA6IFdPUkQpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWV9LFxuICAgIHtcIm5hbWVcIjogXCJOVU1CRVJcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiTlVNQkVSXCIpID8ge3R5cGU6IFwiTlVNQkVSXCJ9IDogTlVNQkVSKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBwYXJzZUZsb2F0KGRhdGFbMF0udmFsdWUpfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RSSU5HXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNUUklOR1wiKSA/IHt0eXBlOiBcIlNUUklOR1wifSA6IFNUUklORyldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZS5zcGxpdCgnXCInKVsxXX0sXG4gICAge1wibmFtZVwiOiBcIldTXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIldTXCIpID8ge3R5cGU6IFwiV1NcIn0gOiBXUyldLCBcInBvc3Rwcm9jZXNzXCI6IG51bGxlcn0sXG4gICAge1wibmFtZVwiOiBcIldTXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkNPTU1FTlRcIikgPyB7dHlwZTogXCJDT01NRU5UXCJ9IDogQ09NTUVOVCldLCBcInBvc3Rwcm9jZXNzXCI6IG51bGxlcn0sXG4gICAge1wibmFtZVwiOiBcIkNBVEFMT0ckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkNBVEFMT0ckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJDQVRBTE9HJGVibmYkMVwiLCBcIlNUQ19ERUZJTklUSU9OXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJDQVRBTE9HXCIsIFwic3ltYm9sc1wiOiBbXCJDQVRBTE9HJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJTVENfREVGSU5JVElPTiRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIlNUQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJTVENfREVGSU5JVElPTiRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcIlNUQ19PQkpFQ1RfTU9ERVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ERUZJTklUSU9OJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJTVENfREVGSU5JVElPTiRlYm5mJDNcIiwgXCJzeW1ib2xzXCI6IFtcIlNUQ19PQkpFQ1RfVFlQRVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ERUZJTklUSU9OJGVibmYkM1wiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJTVENfREVGSU5JVElPTiRlYm5mJDRcIiwgXCJzeW1ib2xzXCI6IFtcIlNUQ19ISVBfTlVNQkVSXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0RFRklOSVRJT04kZWJuZiQ0XCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ERUZJTklUSU9OJGVibmYkNVwiLCBcInN5bWJvbHNcIjogW1wiU1RDX05BTUVcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJTVENfREVGSU5JVElPTiRlYm5mJDVcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0RFRklOSVRJT05cIiwgXCJzeW1ib2xzXCI6IFtcIlNUQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcIlNUQ19ERUZJTklUSU9OJGVibmYkMlwiLCBcIlNUQ19ERUZJTklUSU9OJGVibmYkM1wiLCBcIlNUQ19ERUZJTklUSU9OJGVibmYkNFwiLCBcIlNUQ19ERUZJTklUSU9OJGVibmYkNVwiLCBcIlNUQ19QUk9QRVJUSUVTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxyXG4gICAgICAgIChbLCBtb2RlLCB0eXBlLCBudW1iZXIsIG5hbWUsIHByb3BlcnRpZXNdLCBsKSA9PiB7XHJcbiAgICAgICAgICBpZiAobnVtYmVyID09PSBudWxsICYmIG5hbWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbmNvcnJlY3Qgb2JqZWN0IGRlZmluaXRpb24gYXQgbGluZSAke2x9YClcclxuICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgIGlmIChtb2RlICE9PSBudWxsICYmIHZhbGlkTW9kZXMuaW5kZXhPZihtb2RlKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBXcm9uZyBvYmplY3QgY3JlYXRpb24gbW9kZSBcIiR7bW9kZX1cIiBhdCBsaW5lICR7bH1gKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgaWYgKHR5cGUgIT09IG51bGwgJiYgdmFsaWRUeXBlcy5pbmRleE9mKHR5cGUpID09PSAtMSkge1xyXG4gICAgICAgICAgICBpZiAodmFsaWRNb2Rlcy5pbmRleE9mKHR5cGUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgIG1vZGUgPSB0eXBlXHJcbiAgICAgICAgICAgICAgdHlwZSA9IG51bGxcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFdyb25nIG9iamVjdCB0eXBlIFwiJHt0eXBlfVwiIGF0IGxpbmUgJHtsfWApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1ldGE6e1xyXG4gICAgICAgICAgICAgIG1vZGU6IG1vZGUgIT09IG51bGwgPyBtb2RlIDogJ0FkZCcsXHJcbiAgICAgICAgICAgICAgbW9kZVNldDogbW9kZSAhPT0gbnVsbCxcclxuICAgICAgICAgICAgICB0eXBlOiB0eXBlICE9PSBudWxsID8gdHlwZSA6ICdTdGFyJyxcclxuICAgICAgICAgICAgICB0eXBlU2V0OiB0eXBlICE9PSBudWxsLFxyXG4gICAgICAgICAgICAgIG5hbWVzOiBuYW1lICE9PSBudWxsID8gbmFtZS5zcGxpdCgnOicpIDogW10sXHJcbiAgICAgICAgICAgICAgbmFtZVNldDogbmFtZSAhPT0gbnVsbCxcclxuICAgICAgICAgICAgICBudW1iZXI6IG51bWJlciAhPT0gbnVsbCA/IG51bWJlciA6IHt9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXNcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX1BST1BFUlRJRVNcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0hJUF9OVU1CRVIkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ISVBfTlVNQkVSJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiU1RDX0hJUF9OVU1CRVIkZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ISVBfTlVNQkVSXCIsIFwic3ltYm9sc1wiOiBbXCJOVU1CRVJcIiwgXCJTVENfSElQX05VTUJFUiRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX05BTUVcIiwgXCJzeW1ib2xzXCI6IFtcIlNUUklOR1wiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19PQkpFQ1RfTU9ERVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJNT0RJRllfTU9ERVwiKSA/IHt0eXBlOiBcIk1PRElGWV9NT0RFXCJ9IDogTU9ESUZZX01PREUpLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19PQkpFQ1RfTU9ERVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJBRERfTU9ERVwiKSA/IHt0eXBlOiBcIkFERF9NT0RFXCJ9IDogQUREX01PREUpLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19PQkpFQ1RfTU9ERVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJSRVBMQUNFX01PREVcIikgPyB7dHlwZTogXCJSRVBMQUNFX01PREVcIn0gOiBSRVBMQUNFX01PREUpLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19PQkpFQ1RfVFlQRVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTVENfU1RBUl9UWVBFXCIpID8ge3R5cGU6IFwiU1RDX1NUQVJfVFlQRVwifSA6IFNUQ19TVEFSX1RZUEUpLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19PQkpFQ1RfVFlQRVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTVENfQkFSWUNFTlRFUl9UWVBFXCIpID8ge3R5cGU6IFwiU1RDX0JBUllDRU5URVJfVFlQRVwifSA6IFNUQ19CQVJZQ0VOVEVSX1RZUEUpLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX1cbl1cbiAgLCBQYXJzZXJTdGFydDogXCJDQVRBTE9HXCJcbn1cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIG1vZHVsZS5leHBvcnRzID0gZ3JhbW1hcjtcbn0gZWxzZSB7XG4gICB3aW5kb3cuZ3JhbW1hciA9IGdyYW1tYXI7XG59XG59KSgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ3JhbW1hci9zdGNwYXJzZXIubmVcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEZvcm1hdHNDaGVja2VyLCBGb3JtYXRUeXBlIH0gZnJvbSAnLi9Gb3JtYXRzQ2hlY2tlcidcclxuXHJcbmV4cG9ydCB7XHJcbiAgRm9ybWF0c0NoZWNrZXIsXHJcbiAgRm9ybWF0VHlwZVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Gb3JtYXRzQ2hlY2tlci9pbmRleC50cyIsImNvbnN0IHJlZHVjZSA9IGZ1bmN0aW9uIDxUPiAoaW5wdXQ6IGFueSk6IGFueVtdIHtcclxuICByZXR1cm4gT2JqZWN0LmtleXMoaW5wdXQpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuICAgIHJldHVybiBbXS5jb25jYXQoYWNjLCBpbnB1dFtrZXldKVxyXG4gIH0sIFtdKVxyXG59XHJcblxyXG5lbnVtIEZvcm1hdFR5cGUge1xyXG4gIFRFWFQsXHJcbiAgQklOQVJZLFxyXG4gIElOQ09SUkVDVFxyXG59XHJcblxyXG5jbGFzcyBGb3JtYXRzQ2hlY2tlciB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgX3ZpYWJsZUZvcm1hdHMgPSB7XHJcbiAgICB0ZXh0OiBbJ3N0YycsICdzc2MnLCAnZHNjJywgJ2NmZyddLFxyXG4gICAgYmluYXJ5OiBbJ2RhdCddXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0IHZpYWJsZUZvcm1hdHMgKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiByZWR1Y2UoRm9ybWF0c0NoZWNrZXIuX3ZpYWJsZUZvcm1hdHMpXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNDb3JyZWN0RXh0ZW5zaW9uIChleHRlbnNpb246IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIEZvcm1hdHNDaGVja2VyLnZpYWJsZUZvcm1hdHMuaW5kZXhPZihleHRlbnNpb24udG9Mb3dlckNhc2UoKSkgIT09IC0xXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZm9ybWF0VHlwZSAoZXh0ZW5zaW9uOiBzdHJpbmcpOiBGb3JtYXRUeXBlIHtcclxuICAgIGlmICghRm9ybWF0c0NoZWNrZXIuaXNDb3JyZWN0RXh0ZW5zaW9uKGV4dGVuc2lvbikpIHtcclxuICAgICAgcmV0dXJuIEZvcm1hdFR5cGUuSU5DT1JSRUNUXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEZvcm1hdHNDaGVja2VyLl92aWFibGVGb3JtYXRzLnRleHQuaW5kZXhPZihleHRlbnNpb24pICE9PSAtMSkge1xyXG4gICAgICByZXR1cm4gRm9ybWF0VHlwZS5URVhUXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gRm9ybWF0VHlwZS5CSU5BUllcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgRm9ybWF0c0NoZWNrZXIsXHJcbiAgRm9ybWF0VHlwZVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Gb3JtYXRzQ2hlY2tlci9Gb3JtYXRzQ2hlY2tlci50cyJdLCJzb3VyY2VSb290IjoiIn0=