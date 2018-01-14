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

    NUMBER: /[+-]?[0-9]+(?:\.(?:[0-9]+)?)?(?:[eE][+-][0-9]+)?/,
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
      match: /#.*/,
      lineBreaks: false
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
    {"name": "COMMENT", "symbols": [(lexer.has("COMMENT") ? {type: "COMMENT"} : COMMENT), (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": nuller},
    {"name": "CONFIG$ebnf$1", "symbols": []},
    {"name": "CONFIG$ebnf$1", "symbols": ["CONFIG$ebnf$1", "WS"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "CONFIG", "symbols": ["CONFIG$ebnf$1", "CONFIG_KEYWORD", "CONFIG_DESCRIPTION"], "postprocess": ([_ws, keyword, params]) => params},
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

    NUMBER: /[+-]?[0-9]+(?:\.(?:[0-9]+)?)?(?:[eE][+-][0-9]+)?/,
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
      match: /#.*/,
      lineBreaks: false
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
    {"name": "COMMENT", "symbols": [(lexer.has("COMMENT") ? {type: "COMMENT"} : COMMENT), (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": nuller},
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

    NUMBER: /[+-]?[0-9]+(?:\.(?:[0-9]+)?)?(?:[eE][+-][0-9]+)?/,
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
      match: /#.*/,
      lineBreaks: false
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
    {"name": "COMMENT", "symbols": [(lexer.has("COMMENT") ? {type: "COMMENT"} : COMMENT), (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": nuller},
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

    NUMBER: /[+-]?[0-9]+(?:\.(?:[0-9]+)?)?(?:[eE][+-][0-9]+)?/,
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
      match: /#.*/,
      lineBreaks: false
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
    {"name": "COMMENT", "symbols": [(lexer.has("COMMENT") ? {type: "COMMENT"} : COMMENT), (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": nuller},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjM2OGNlOTdhN2E3ZDAyZTA3OTciLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlcmlhbGl6ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vby9tb28uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0RhdE1ldGEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1dyaXRlci9UZXh0V3JpdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL0NvbmZpZ1dyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2VsaW8vQ2VsaW8udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0luamVjdG9yL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9JbmplY3Rvci9JbmplY3Rvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVhZGVyL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9SZWFkZXIvTmVhcmxleUJhc2VkUmVhZGVyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZWFybGV5L2xpYi9uZWFybGV5LmpzIiwid2VicGFjazovLy8uL3NyYy9SZWFkZXIvREFUUmVhZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kZWNvZGVTcGVjdHJhbENsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9lbmNvZGVTcGVjdHJhbENsYXNzLnRzIiwid2VicGFjazovLy8uL3NyYy9Xcml0ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlcmlhbGl6ZXIvU2VyaWFsaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL1NUQ1dyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL1NTQ1dyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL0RTQ1dyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL0NGR1dyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL0RBVFdyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvV3JpdGVyL0JpbmFyeVdyaXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhbW1hci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhbW1hci9jZmdwYXJzZXIubmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dyYW1tYXIvZHNjcGFyc2VyLm5lIiwid2VicGFjazovLy8uL3NyYy9ncmFtbWFyL3NzY3BhcnNlci5uZSIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhbW1hci9zdGNwYXJzZXIubmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Zvcm1hdHNDaGVja2VyL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9Gb3JtYXRzQ2hlY2tlci9Gb3JtYXRzQ2hlY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEsNkNBQXFDO0FBR25DLHFCQUhLLG9CQUFVLENBR0w7Ozs7Ozs7QUNIWjtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUN0RCxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxpQkFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTdELElBQUksTUFBTSxHQUFHLFlBQVk7UUFFekIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNwQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDeEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUNuRSxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDO1lBQzdELE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7WUFDL0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQztZQUNsRSxNQUFNLENBQUMsYUFBYSxDQUFDLDJCQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7WUFDOUYsTUFBTSxJQUFJLEVBQUU7UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU07SUFDZixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxTQUFTOzs7Ozs7Ozs7O0FDNUJ4QjtJQUNFLEtBQUssQ0FBRSxJQUFZLEVBQUUsS0FBWTtRQUMvQixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDO2dCQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDZixDQUFDO1FBQ0gsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUdGO0FBRUQsa0JBQWUsWUFBWTs7Ozs7Ozs7OztBQ2hCM0IsMkNBQTRDO0FBQzVDLDJDQUE0QztBQUM1QywyQ0FBNEM7QUFDNUMsMkNBQTRDO0FBRTVDLGtCQUFlO0lBQ2IsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtDQUNYOzs7Ozs7O0FDVkQ7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFlBQVk7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSyx3Q0FBd0M7QUFDN0MsS0FBSyx1Q0FBdUM7QUFDNUMsS0FBSyx1Q0FBdUM7QUFDNUMsS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSywrRkFBK0YsNkJBQTZCO0FBQ2pJLEtBQUssc0NBQXNDO0FBQzNDLEtBQUssMkdBQTJHLDZCQUE2QjtBQUM3SSxLQUFLLHNEQUFzRCxnQkFBZ0Isc0VBQXNFLGdCQUFnQix3REFBd0Q7QUFDek4sS0FBSywrQ0FBK0M7QUFDcEQsS0FBSyxpSEFBaUgsNkJBQTZCO0FBQ25KLEtBQUssNERBQTRELGFBQWEsd0dBQXdHO0FBQ3RMLEtBQUssNkRBQTZEO0FBQ2xFLEtBQUssbUVBQW1FLGNBQWM7QUFDdEYsS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSywwR0FBMEcsNkJBQTZCO0FBQzVJLEtBQUssd0RBQXdELGtCQUFrQiwwRUFBMEUsa0JBQWtCLCtDQUErQztBQUMxTixLQUFLLHFFQUFxRTtBQUMxRSxLQUFLLDJFQUEyRSxjQUFjO0FBQzlGLEtBQUsseUdBQXlHO0FBQzlHLEtBQUsscURBQXFELGFBQWEsMkRBQTJEO0FBQ2xJLEtBQUssc0RBQXNELGNBQWMsNERBQTREO0FBQ3JJLEtBQUssa0RBQWtELGFBQWEsZ0RBQWdEO0FBQ3BILEtBQUssc0RBQXNELGVBQWUsOERBQThEO0FBQ3hJLEtBQUssc0RBQXNELGVBQWUsZ0VBQWdFO0FBQzFJLEtBQUssOENBQThDLFdBQVcsK0JBQStCO0FBQzdGLEtBQUssbURBQW1ELGdCQUFnQixvQ0FBb0M7QUFDNUcsS0FBSyx3REFBd0QsZ0JBQWdCLGlDQUFpQyxXQUFXLCtCQUErQjtBQUN4SixLQUFLLHVDQUF1QztBQUM1QyxLQUFLLGlHQUFpRyw2QkFBNkI7QUFDbkksS0FBSywwSUFBMEk7QUFDL0ksS0FBSywrQ0FBK0M7QUFDcEQsS0FBSyxpSEFBaUgsNkJBQTZCO0FBQ25KLEtBQUssK0NBQStDO0FBQ3BELEtBQUssaUhBQWlILDZCQUE2QjtBQUNuSixLQUFLLCtGQUErRix1QkFBdUIsdUZBQXVGO0FBQ2xOLEtBQUssbURBQW1EO0FBQ3hELEtBQUsseUhBQXlILDZCQUE2QjtBQUMzSixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQzFHRDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsWUFBWTs7QUFFNUI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSyx3Q0FBd0M7QUFDN0MsS0FBSyx1Q0FBdUM7QUFDNUMsS0FBSyx1Q0FBdUM7QUFDNUMsS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSywrRkFBK0YsNkJBQTZCO0FBQ2pJLEtBQUssc0NBQXNDO0FBQzNDLEtBQUssMkdBQTJHLDZCQUE2QjtBQUM3SSxLQUFLLHNEQUFzRCxnQkFBZ0Isc0VBQXNFLGdCQUFnQix3REFBd0Q7QUFDek4sS0FBSywrQ0FBK0M7QUFDcEQsS0FBSyxpSEFBaUgsNkJBQTZCO0FBQ25KLEtBQUssNERBQTRELGFBQWEsd0dBQXdHO0FBQ3RMLEtBQUssNkRBQTZEO0FBQ2xFLEtBQUssbUVBQW1FLGNBQWM7QUFDdEYsS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSywwR0FBMEcsNkJBQTZCO0FBQzVJLEtBQUssd0RBQXdELGtCQUFrQiwwRUFBMEUsa0JBQWtCLCtDQUErQztBQUMxTixLQUFLLHFFQUFxRTtBQUMxRSxLQUFLLDJFQUEyRSxjQUFjO0FBQzlGLEtBQUsseUdBQXlHO0FBQzlHLEtBQUsscURBQXFELGFBQWEsMkRBQTJEO0FBQ2xJLEtBQUssc0RBQXNELGNBQWMsNERBQTREO0FBQ3JJLEtBQUssa0RBQWtELGFBQWEsZ0RBQWdEO0FBQ3BILEtBQUssc0RBQXNELGVBQWUsOERBQThEO0FBQ3hJLEtBQUssc0RBQXNELGVBQWUsZ0VBQWdFO0FBQzFJLEtBQUssOENBQThDLFdBQVcsK0JBQStCO0FBQzdGLEtBQUssbURBQW1ELGdCQUFnQixvQ0FBb0M7QUFDNUcsS0FBSyx3REFBd0QsZ0JBQWdCLGlDQUFpQyxXQUFXLCtCQUErQjtBQUN4SixLQUFLLDRDQUE0QztBQUNqRCxLQUFLLHVIQUF1SCw2QkFBNkI7QUFDekosS0FBSyw0RUFBNEU7QUFDakYsS0FBSywrQ0FBK0M7QUFDcEQsS0FBSyxpSEFBaUgsNkJBQTZCO0FBQ25KLEtBQUssOEVBQThFO0FBQ25GLEtBQUssNEVBQTRFLGNBQWM7QUFDL0YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUsscUZBQXFGO0FBQzFGLEtBQUssa0ZBQWtGO0FBQ3ZGLEtBQUssZ0ZBQWdGO0FBQ3JGLEtBQUssd0VBQXdFLHdCQUF3QixpRUFBaUU7QUFDdEssS0FBSywwRUFBMEUsMEJBQTBCLG1FQUFtRTtBQUM1SyxLQUFLLHdFQUF3RSx3QkFBd0IsaUVBQWlFO0FBQ3RLLEtBQUssOEVBQThFLDhCQUE4QjtBQUNqSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O0FDaElEO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSTtBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUssd0NBQXdDO0FBQzdDLEtBQUssdUNBQXVDO0FBQzVDLEtBQUssdUNBQXVDO0FBQzVDLEtBQUssc0NBQXNDO0FBQzNDLEtBQUssc0NBQXNDO0FBQzNDLEtBQUssc0NBQXNDO0FBQzNDLEtBQUssK0ZBQStGLDZCQUE2QjtBQUNqSSxLQUFLLHNDQUFzQztBQUMzQyxLQUFLLDJHQUEyRyw2QkFBNkI7QUFDN0ksS0FBSyxzREFBc0QsZ0JBQWdCLHNFQUFzRSxnQkFBZ0Isd0RBQXdEO0FBQ3pOLEtBQUssK0NBQStDO0FBQ3BELEtBQUssaUhBQWlILDZCQUE2QjtBQUNuSixLQUFLLDREQUE0RCxhQUFhLHdHQUF3RztBQUN0TCxLQUFLLDZEQUE2RDtBQUNsRSxLQUFLLG1FQUFtRSxjQUFjO0FBQ3RGLEtBQUssc0NBQXNDO0FBQzNDLEtBQUssMEdBQTBHLDZCQUE2QjtBQUM1SSxLQUFLLHdEQUF3RCxrQkFBa0IsMEVBQTBFLGtCQUFrQiwrQ0FBK0M7QUFDMU4sS0FBSyxxRUFBcUU7QUFDMUUsS0FBSywyRUFBMkUsY0FBYztBQUM5RixLQUFLLHlHQUF5RztBQUM5RyxLQUFLLHFEQUFxRCxhQUFhLDJEQUEyRDtBQUNsSSxLQUFLLHNEQUFzRCxjQUFjLDREQUE0RDtBQUNySSxLQUFLLGtEQUFrRCxhQUFhLGdEQUFnRDtBQUNwSCxLQUFLLHNEQUFzRCxlQUFlLDhEQUE4RDtBQUN4SSxLQUFLLHNEQUFzRCxlQUFlLGdFQUFnRTtBQUMxSSxLQUFLLDhDQUE4QyxXQUFXLCtCQUErQjtBQUM3RixLQUFLLG1EQUFtRCxnQkFBZ0Isb0NBQW9DO0FBQzVHLEtBQUssd0RBQXdELGdCQUFnQixpQ0FBaUMsV0FBVywrQkFBK0I7QUFDeEosS0FBSyw0Q0FBNEM7QUFDakQsS0FBSyx1SEFBdUgsNkJBQTZCO0FBQ3pKLEtBQUssNEVBQTRFO0FBQ2pGLEtBQUssK0NBQStDO0FBQ3BELEtBQUssaUhBQWlILDZCQUE2QjtBQUNuSixLQUFLLG1GQUFtRjtBQUN4RixLQUFLLDRFQUE0RSxjQUFjO0FBQy9GLEtBQUssbUZBQW1GO0FBQ3hGLEtBQUssNEVBQTRFLGNBQWM7QUFDL0YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSyxxRkFBcUY7QUFDMUYsS0FBSyxvRUFBb0Usb0JBQW9CLDZEQUE2RDtBQUMxSixLQUFLLGlFQUFpRSxpQkFBaUIsMERBQTBEO0FBQ2pKLEtBQUsscUVBQXFFLHFCQUFxQiw4REFBOEQ7QUFDN0osS0FBSyx1RkFBdUY7QUFDNUYsS0FBSyxnRkFBZ0Y7QUFDckYsS0FBSyxzRUFBc0Usc0JBQXNCLCtEQUErRDtBQUNoSyxLQUFLLDJFQUEyRSwyQkFBMkIsb0VBQW9FO0FBQy9LLEtBQUssNEVBQTRFLDRCQUE0QixxRUFBcUU7QUFDbEwsS0FBSyx3RUFBd0Usd0JBQXdCLGlFQUFpRTtBQUN0SyxLQUFLLHFFQUFxRSxxQkFBcUI7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQ2xJRDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsWUFBWTs7QUFFNUI7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLElBQUk7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLLHdDQUF3QztBQUM3QyxLQUFLLHVDQUF1QztBQUM1QyxLQUFLLHVDQUF1QztBQUM1QyxLQUFLLHNDQUFzQztBQUMzQyxLQUFLLHNDQUFzQztBQUMzQyxLQUFLLHNDQUFzQztBQUMzQyxLQUFLLCtGQUErRiw2QkFBNkI7QUFDakksS0FBSyxzQ0FBc0M7QUFDM0MsS0FBSywyR0FBMkcsNkJBQTZCO0FBQzdJLEtBQUssc0RBQXNELGdCQUFnQixzRUFBc0UsZ0JBQWdCLHdEQUF3RDtBQUN6TixLQUFLLCtDQUErQztBQUNwRCxLQUFLLGlIQUFpSCw2QkFBNkI7QUFDbkosS0FBSyw0REFBNEQsYUFBYSx3R0FBd0c7QUFDdEwsS0FBSyw2REFBNkQ7QUFDbEUsS0FBSyxtRUFBbUUsY0FBYztBQUN0RixLQUFLLHNDQUFzQztBQUMzQyxLQUFLLDBHQUEwRyw2QkFBNkI7QUFDNUksS0FBSyx3REFBd0Qsa0JBQWtCLDBFQUEwRSxrQkFBa0IsK0NBQStDO0FBQzFOLEtBQUsscUVBQXFFO0FBQzFFLEtBQUssMkVBQTJFLGNBQWM7QUFDOUYsS0FBSyx5R0FBeUc7QUFDOUcsS0FBSyxxREFBcUQsYUFBYSwyREFBMkQ7QUFDbEksS0FBSyxzREFBc0QsY0FBYyw0REFBNEQ7QUFDckksS0FBSyxrREFBa0QsYUFBYSxnREFBZ0Q7QUFDcEgsS0FBSyxzREFBc0QsZUFBZSw4REFBOEQ7QUFDeEksS0FBSyxzREFBc0QsZUFBZSxnRUFBZ0U7QUFDMUksS0FBSyw4Q0FBOEMsV0FBVywrQkFBK0I7QUFDN0YsS0FBSyxtREFBbUQsZ0JBQWdCLG9DQUFvQztBQUM1RyxLQUFLLHdEQUF3RCxnQkFBZ0IsaUNBQWlDLFdBQVcsK0JBQStCO0FBQ3hKLEtBQUssd0NBQXdDO0FBQzdDLEtBQUssK0dBQStHLDZCQUE2QjtBQUNqSixLQUFLLG9FQUFvRTtBQUN6RSxLQUFLLCtDQUErQztBQUNwRCxLQUFLLGlIQUFpSCw2QkFBNkI7QUFDbkosS0FBSyxtRkFBbUY7QUFDeEYsS0FBSyw0RUFBNEUsY0FBYztBQUMvRixLQUFLLG1GQUFtRjtBQUN4RixLQUFLLDRFQUE0RSxjQUFjO0FBQy9GLEtBQUssa0ZBQWtGO0FBQ3ZGLEtBQUssNEVBQTRFLGNBQWM7QUFDL0YsS0FBSyw0RUFBNEU7QUFDakYsS0FBSyw0RUFBNEUsY0FBYztBQUMvRixLQUFLO0FBQ0w7QUFDQTtBQUNBLG1FQUFtRSxFQUFFO0FBQ3JFOztBQUVBO0FBQ0EsMkRBQTJELEtBQUssWUFBWSxFQUFFO0FBQzlFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLG9EQUFvRCxLQUFLLFlBQVksRUFBRTtBQUN2RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSyxxRkFBcUY7QUFDMUYsS0FBSywrQ0FBK0M7QUFDcEQsS0FBSyxpSEFBaUgsNkJBQTZCO0FBQ25KLEtBQUsseUdBQXlHO0FBQzlHLEtBQUssZ0ZBQWdGO0FBQ3JGLEtBQUssb0VBQW9FLG9CQUFvQiw2REFBNkQ7QUFDMUosS0FBSyxpRUFBaUUsaUJBQWlCLDBEQUEwRDtBQUNqSixLQUFLLHFFQUFxRSxxQkFBcUIsOERBQThEO0FBQzdKLEtBQUssc0VBQXNFLHNCQUFzQiwrREFBK0Q7QUFDaEssS0FBSyw0RUFBNEUsNEJBQTRCO0FBQzdHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7QUMzSkQsaURBQTZEO0FBRzNELHlCQUhPLCtCQUFjLENBR1A7QUFDZCxxQkFKdUIsMkJBQVUsQ0FJdkI7Ozs7Ozs7Ozs7QUNKWixNQUFNLE1BQU0sR0FBRyxVQUFjLEtBQVU7SUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzVDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNSLENBQUM7QUFFRCxJQUFLLFVBSUo7QUFKRCxXQUFLLFVBQVU7SUFDYiwyQ0FBSTtJQUNKLCtDQUFNO0lBQ04scURBQVM7QUFDWCxDQUFDLEVBSkksVUFBVSxLQUFWLFVBQVUsUUFJZDtBQStCQyxnQ0FBVTtBQTdCWjtJQU1FLE1BQU0sS0FBSyxhQUFhO1FBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsTUFBTSxDQUFDLGtCQUFrQixDQUFFLFNBQWlCO1FBQzFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUUsU0FBaUI7UUFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUztRQUM3QixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUk7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1FBQzFCLENBQUM7SUFDSCxDQUFDOztBQXZCYyw2QkFBYyxHQUFHO0lBQzlCLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUNsQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7Q0FDaEI7QUF3QkQsd0NBQWMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjM2OGNlOTdhN2E3ZDAyZTA3OTciLCJpbXBvcnQgU2VyaWFsaXplciBmcm9tICcuL1NlcmlhbGl6ZXInXHJcblxyXG5leHBvcnQge1xyXG4gIFNlcmlhbGl6ZXJcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2VyaWFsaXplci9pbmRleC50cyIsIihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZhY3RvcnkpIC8qIGdsb2JhbCBkZWZpbmUgKi9cbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpXG4gIH0gZWxzZSB7XG4gICAgcm9vdC5tb28gPSBmYWN0b3J5KClcbiAgfVxufSh0aGlzLCBmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcblxuICAvLyBwb2x5ZmlsbCBhc3NpZ24oKSwgc28gd2Ugc3VwcG9ydCBJRTkrXG4gIHZhciBhc3NpZ24gPSB0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PT0gJ2Z1bmN0aW9uJyA/IE9iamVjdC5hc3NpZ24gOlxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5hc3NpZ25cbiAgICBmdW5jdGlvbih0YXJnZXQsIHNvdXJjZXMpIHtcbiAgICAgIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUYXJnZXQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICB9XG4gICAgICB0YXJnZXQgPSBPYmplY3QodGFyZ2V0KVxuXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG4gICAgICAgIGlmIChzb3VyY2UgPT0gbnVsbCkgY29udGludWVcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFyZ2V0XG4gICAgfVxuXG4gIHZhciBoYXNTdGlja3kgPSB0eXBlb2YgbmV3IFJlZ0V4cCgpLnN0aWNreSA9PT0gJ2Jvb2xlYW4nXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICBmdW5jdGlvbiBpc1JlZ0V4cChvKSB7IHJldHVybiBvICYmIG8uY29uc3RydWN0b3IgPT09IFJlZ0V4cCB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG8pIHsgcmV0dXJuIG8gJiYgdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIG8uY29uc3RydWN0b3IgIT09IFJlZ0V4cCAmJiAhQXJyYXkuaXNBcnJheShvKSB9XG5cbiAgZnVuY3Rpb24gcmVFc2NhcGUocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoL1stXFwvXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpXG4gIH1cbiAgZnVuY3Rpb24gcmVHcm91cHMocykge1xuICAgIHZhciByZSA9IG5ldyBSZWdFeHAoJ3wnICsgcylcbiAgICByZXR1cm4gcmUuZXhlYygnJykubGVuZ3RoIC0gMVxuICB9XG4gIGZ1bmN0aW9uIHJlQ2FwdHVyZShzKSB7XG4gICAgcmV0dXJuICcoJyArIHMgKyAnKSdcbiAgfVxuICBmdW5jdGlvbiByZVVuaW9uKHJlZ2V4cHMpIHtcbiAgICB2YXIgc291cmNlID0gIHJlZ2V4cHMubWFwKGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBcIig/OlwiICsgcyArIFwiKVwiXG4gICAgfSkuam9pbignfCcpXG4gICAgcmV0dXJuIFwiKD86XCIgKyBzb3VyY2UgKyBcIilcIlxuICB9XG5cbiAgZnVuY3Rpb24gcmVnZXhwT3JMaXRlcmFsKG9iaikge1xuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuICcoPzonICsgcmVFc2NhcGUob2JqKSArICcpJ1xuXG4gICAgfSBlbHNlIGlmIChpc1JlZ0V4cChvYmopKSB7XG4gICAgICAvLyBUT0RPOiBjb25zaWRlciAvdSBzdXBwb3J0XG4gICAgICBpZiAob2JqLmlnbm9yZUNhc2UpIHsgdGhyb3cgbmV3IEVycm9yKCdSZWdFeHAgL2kgZmxhZyBub3QgYWxsb3dlZCcpIH1cbiAgICAgIGlmIChvYmouZ2xvYmFsKSB7IHRocm93IG5ldyBFcnJvcignUmVnRXhwIC9nIGZsYWcgaXMgaW1wbGllZCcpIH1cbiAgICAgIGlmIChvYmouc3RpY2t5KSB7IHRocm93IG5ldyBFcnJvcignUmVnRXhwIC95IGZsYWcgaXMgaW1wbGllZCcpIH1cbiAgICAgIGlmIChvYmoubXVsdGlsaW5lKSB7IHRocm93IG5ldyBFcnJvcignUmVnRXhwIC9tIGZsYWcgaXMgaW1wbGllZCcpIH1cbiAgICAgIHJldHVybiBvYmouc291cmNlXG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgYSBwYXR0ZXJuOiAnICsgb2JqKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdFRvUnVsZXMob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmplY3QpXG4gICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgZm9yICh2YXIgaT0wOyBpPGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICB2YXIgdGhpbmcgPSBvYmplY3Rba2V5XVxuICAgICAgdmFyIHJ1bGVzID0gQXJyYXkuaXNBcnJheSh0aGluZykgPyB0aGluZyA6IFt0aGluZ11cbiAgICAgIHZhciBtYXRjaCA9IFtdXG4gICAgICBydWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHJ1bGUpIHtcbiAgICAgICAgaWYgKGlzT2JqZWN0KHJ1bGUpKSB7XG4gICAgICAgICAgaWYgKG1hdGNoLmxlbmd0aCkgcmVzdWx0LnB1c2gocnVsZU9wdGlvbnMoa2V5LCBtYXRjaCkpXG4gICAgICAgICAgcmVzdWx0LnB1c2gocnVsZU9wdGlvbnMoa2V5LCBydWxlKSlcbiAgICAgICAgICBtYXRjaCA9IFtdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWF0Y2gucHVzaChydWxlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKG1hdGNoLmxlbmd0aCkgcmVzdWx0LnB1c2gocnVsZU9wdGlvbnMoa2V5LCBtYXRjaCkpXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGZ1bmN0aW9uIGFycmF5VG9SdWxlcyhhcnJheSkge1xuICAgIHZhciByZXN1bHQgPSBbXVxuICAgIGZvciAodmFyIGk9MDsgaTxhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG9iaiA9IGFycmF5W2ldXG4gICAgICBpZiAoIW9iai5uYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUnVsZSBoYXMgbm8gbmFtZTogJyArIEpTT04uc3RyaW5naWZ5KG9iaikpXG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaChydWxlT3B0aW9ucyhvYmoubmFtZSwgb2JqKSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZnVuY3Rpb24gcnVsZU9wdGlvbnMobmFtZSwgb2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkob2JqKSB8fCBpc1JlZ0V4cChvYmopKSB7XG4gICAgICBvYmogPSB7IG1hdGNoOiBvYmogfVxuICAgIH1cblxuICAgIC8vIG5iLiBlcnJvciBpbXBsaWVzIGxpbmVCcmVha3NcbiAgICB2YXIgb3B0aW9ucyA9IGFzc2lnbih7XG4gICAgICB0b2tlblR5cGU6IG5hbWUsXG4gICAgICBsaW5lQnJlYWtzOiAhIW9iai5lcnJvcixcbiAgICAgIHBvcDogZmFsc2UsXG4gICAgICBuZXh0OiBudWxsLFxuICAgICAgcHVzaDogbnVsbCxcbiAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgZ2V0VHlwZTogbnVsbCxcbiAgICB9LCBvYmopXG5cbiAgICAvLyBjb252ZXJ0IHRvIGFycmF5XG4gICAgdmFyIG1hdGNoID0gb3B0aW9ucy5tYXRjaFxuICAgIG9wdGlvbnMubWF0Y2ggPSBBcnJheS5pc0FycmF5KG1hdGNoKSA/IG1hdGNoIDogbWF0Y2ggPyBbbWF0Y2hdIDogW11cbiAgICBvcHRpb25zLm1hdGNoLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIGlzUmVnRXhwKGEpICYmIGlzUmVnRXhwKGIpID8gMFxuICAgICAgICAgICA6IGlzUmVnRXhwKGIpID8gLTEgOiBpc1JlZ0V4cChhKSA/ICsxIDogYi5sZW5ndGggLSBhLmxlbmd0aFxuICAgIH0pXG4gICAgaWYgKG9wdGlvbnMua2V5d29yZHMpIHtcbiAgICAgIG9wdGlvbnMuZ2V0VHlwZSA9IGtleXdvcmRUcmFuc2Zvcm0ob3B0aW9ucy5rZXl3b3JkcylcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBpbGVSdWxlcyhydWxlcywgaGFzU3RhdGVzKSB7XG4gICAgcnVsZXMgPSBBcnJheS5pc0FycmF5KHJ1bGVzKSA/IGFycmF5VG9SdWxlcyhydWxlcykgOiBvYmplY3RUb1J1bGVzKHJ1bGVzKVxuXG4gICAgdmFyIGVycm9yUnVsZSA9IG51bGxcbiAgICB2YXIgZ3JvdXBzID0gW11cbiAgICB2YXIgcGFydHMgPSBbXVxuICAgIGZvciAodmFyIGk9MDsgaTxydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG9wdGlvbnMgPSBydWxlc1tpXVxuXG4gICAgICBpZiAob3B0aW9ucy5lcnJvcikge1xuICAgICAgICBpZiAoZXJyb3JSdWxlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVsdGlwbGUgZXJyb3IgcnVsZXMgbm90IGFsbG93ZWQ6IChmb3IgdG9rZW4gJ1wiICsgb3B0aW9ucy50b2tlblR5cGUgKyBcIicpXCIpXG4gICAgICAgIH1cbiAgICAgICAgZXJyb3JSdWxlID0gb3B0aW9uc1xuICAgICAgfVxuXG4gICAgICAvLyBza2lwIHJ1bGVzIHdpdGggbm8gbWF0Y2hcbiAgICAgIGlmIChvcHRpb25zLm1hdGNoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgZ3JvdXBzLnB1c2gob3B0aW9ucylcblxuICAgICAgLy8gY29udmVydCB0byBSZWdFeHBcbiAgICAgIHZhciBwYXQgPSByZVVuaW9uKG9wdGlvbnMubWF0Y2gubWFwKHJlZ2V4cE9yTGl0ZXJhbCkpXG5cbiAgICAgIC8vIHZhbGlkYXRlXG4gICAgICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChwYXQpXG4gICAgICBpZiAocmVnZXhwLnRlc3QoXCJcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVnRXhwIG1hdGNoZXMgZW1wdHkgc3RyaW5nOiBcIiArIHJlZ2V4cClcbiAgICAgIH1cbiAgICAgIHZhciBncm91cENvdW50ID0gcmVHcm91cHMocGF0KVxuICAgICAgaWYgKGdyb3VwQ291bnQgPiAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlZ0V4cCBoYXMgY2FwdHVyZSBncm91cHM6IFwiICsgcmVnZXhwICsgXCJcXG5Vc2UgKD86IOKApiApIGluc3RlYWRcIilcbiAgICAgIH1cbiAgICAgIGlmICghaGFzU3RhdGVzICYmIChvcHRpb25zLnBvcCB8fCBvcHRpb25zLnB1c2ggfHwgb3B0aW9ucy5uZXh0KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdGF0ZS1zd2l0Y2hpbmcgb3B0aW9ucyBhcmUgbm90IGFsbG93ZWQgaW4gc3RhdGVsZXNzIGxleGVycyAoZm9yIHRva2VuICdcIiArIG9wdGlvbnMudG9rZW5UeXBlICsgXCInKVwiKVxuICAgICAgfVxuXG4gICAgICAvLyB0cnkgYW5kIGRldGVjdCBydWxlcyBtYXRjaGluZyBuZXdsaW5lc1xuICAgICAgaWYgKCFvcHRpb25zLmxpbmVCcmVha3MgJiYgcmVnZXhwLnRlc3QoJ1xcbicpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUnVsZSBzaG91bGQgZGVjbGFyZSBsaW5lQnJlYWtzOiAnICsgcmVnZXhwKVxuICAgICAgfVxuXG4gICAgICAvLyBzdG9yZSByZWdleFxuICAgICAgcGFydHMucHVzaChyZUNhcHR1cmUocGF0KSlcbiAgICB9XG5cbiAgICB2YXIgc3VmZml4ID0gaGFzU3RpY2t5ID8gJycgOiAnfCg/OiknXG4gICAgdmFyIGZsYWdzID0gaGFzU3RpY2t5ID8gJ3ltJyA6ICdnbSdcbiAgICB2YXIgY29tYmluZWQgPSBuZXcgUmVnRXhwKHJlVW5pb24ocGFydHMpICsgc3VmZml4LCBmbGFncylcblxuICAgIHJldHVybiB7cmVnZXhwOiBjb21iaW5lZCwgZ3JvdXBzOiBncm91cHMsIGVycm9yOiBlcnJvclJ1bGV9XG4gIH1cblxuICBmdW5jdGlvbiBjb21waWxlKHJ1bGVzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNvbXBpbGVSdWxlcyhydWxlcylcbiAgICByZXR1cm4gbmV3IExleGVyKHtzdGFydDogcmVzdWx0fSwgJ3N0YXJ0JylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBpbGVTdGF0ZXMoc3RhdGVzLCBzdGFydCkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3RhdGVzKVxuICAgIGlmICghc3RhcnQpIHN0YXJ0ID0ga2V5c1swXVxuXG4gICAgdmFyIG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICBmb3IgKHZhciBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgIG1hcFtrZXldID0gY29tcGlsZVJ1bGVzKHN0YXRlc1trZXldLCB0cnVlKVxuICAgIH1cblxuICAgIGZvciAodmFyIGk9MDsgaTxrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZ3JvdXBzID0gbWFwW2tleXNbaV1dLmdyb3Vwc1xuICAgICAgZm9yICh2YXIgaj0wOyBqPGdyb3Vwcy5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgZyA9IGdyb3Vwc1tqXVxuICAgICAgICB2YXIgc3RhdGUgPSBnICYmIChnLnB1c2ggfHwgZy5uZXh0KVxuICAgICAgICBpZiAoc3RhdGUgJiYgIW1hcFtzdGF0ZV0pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHN0YXRlICdcIiArIHN0YXRlICsgXCInIChpbiB0b2tlbiAnXCIgKyBnLnRva2VuVHlwZSArIFwiJyBvZiBzdGF0ZSAnXCIgKyBrZXlzW2ldICsgXCInKVwiKVxuICAgICAgICB9XG4gICAgICAgIGlmIChnICYmIGcucG9wICYmICtnLnBvcCAhPT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInBvcCBtdXN0IGJlIDEgKGluIHRva2VuICdcIiArIGcudG9rZW5UeXBlICsgXCInIG9mIHN0YXRlICdcIiArIGtleXNbaV0gKyBcIicpXCIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IExleGVyKG1hcCwgc3RhcnQpXG4gIH1cblxuICBmdW5jdGlvbiBrZXl3b3JkVHJhbnNmb3JtKG1hcCkge1xuICAgIHZhciByZXZlcnNlTWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgIHZhciBieUxlbmd0aCA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB2YXIgdHlwZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhtYXApXG4gICAgZm9yICh2YXIgaT0wOyBpPHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdG9rZW5UeXBlID0gdHlwZXNbaV1cbiAgICAgIHZhciBpdGVtID0gbWFwW3Rva2VuVHlwZV1cbiAgICAgIHZhciBrZXl3b3JkTGlzdCA9IEFycmF5LmlzQXJyYXkoaXRlbSkgPyBpdGVtIDogW2l0ZW1dXG4gICAgICBrZXl3b3JkTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGtleXdvcmQpIHtcbiAgICAgICAgKGJ5TGVuZ3RoW2tleXdvcmQubGVuZ3RoXSA9IGJ5TGVuZ3RoW2tleXdvcmQubGVuZ3RoXSB8fCBbXSkucHVzaChrZXl3b3JkKVxuICAgICAgICBpZiAodHlwZW9mIGtleXdvcmQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwia2V5d29yZCBtdXN0IGJlIHN0cmluZyAoaW4ga2V5d29yZCAnXCIgKyB0b2tlblR5cGUgKyBcIicpXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV2ZXJzZU1hcFtrZXl3b3JkXSA9IHRva2VuVHlwZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBmYXN0IHN0cmluZyBsb29rdXBcbiAgICAvLyBodHRwczovL2pzcGVyZi5jb20vc3RyaW5nLWxvb2t1cHNcbiAgICBmdW5jdGlvbiBzdHIoeCkgeyByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeCkgfVxuICAgIHZhciBzb3VyY2UgPSAnJ1xuICAgIHNvdXJjZSArPSAnKGZ1bmN0aW9uKHZhbHVlKSB7XFxuJ1xuICAgIHNvdXJjZSArPSAnc3dpdGNoICh2YWx1ZS5sZW5ndGgpIHtcXG4nXG4gICAgZm9yICh2YXIgbGVuZ3RoIGluIGJ5TGVuZ3RoKSB7XG4gICAgICB2YXIga2V5d29yZHMgPSBieUxlbmd0aFtsZW5ndGhdXG4gICAgICBzb3VyY2UgKz0gJ2Nhc2UgJyArIGxlbmd0aCArICc6XFxuJ1xuICAgICAgc291cmNlICs9ICdzd2l0Y2ggKHZhbHVlKSB7XFxuJ1xuICAgICAga2V5d29yZHMuZm9yRWFjaChmdW5jdGlvbihrZXl3b3JkKSB7XG4gICAgICAgIHZhciB0b2tlblR5cGUgPSByZXZlcnNlTWFwW2tleXdvcmRdXG4gICAgICAgIHNvdXJjZSArPSAnY2FzZSAnICsgc3RyKGtleXdvcmQpICsgJzogcmV0dXJuICcgKyBzdHIodG9rZW5UeXBlKSArICdcXG4nXG4gICAgICB9KVxuICAgICAgc291cmNlICs9ICd9XFxuJ1xuICAgIH1cbiAgICBzb3VyY2UgKz0gJ31cXG4nXG4gICAgc291cmNlICs9ICd9KSdcbiAgICByZXR1cm4gZXZhbChzb3VyY2UpIC8vIGdldFR5cGVcbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgdmFyIExleGVyID0gZnVuY3Rpb24oc3RhdGVzLCBzdGF0ZSkge1xuICAgIHRoaXMuc3RhcnRTdGF0ZSA9IHN0YXRlXG4gICAgdGhpcy5zdGF0ZXMgPSBzdGF0ZXNcbiAgICB0aGlzLmJ1ZmZlciA9ICcnXG4gICAgdGhpcy5zdGFjayA9IFtdXG4gICAgdGhpcy5yZXNldCgpXG4gIH1cblxuICBMZXhlci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbihkYXRhLCBpbmZvKSB7XG4gICAgdGhpcy5idWZmZXIgPSBkYXRhIHx8ICcnXG4gICAgdGhpcy5pbmRleCA9IDBcbiAgICB0aGlzLmxpbmUgPSBpbmZvID8gaW5mby5saW5lIDogMVxuICAgIHRoaXMuY29sID0gaW5mbyA/IGluZm8uY29sIDogMVxuICAgIHRoaXMuc2V0U3RhdGUoaW5mbyA/IGluZm8uc3RhdGUgOiB0aGlzLnN0YXJ0U3RhdGUpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIExleGVyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbmU6IHRoaXMubGluZSxcbiAgICAgIGNvbDogdGhpcy5jb2wsXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICB9XG4gIH1cblxuICBMZXhlci5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgIGlmICghc3RhdGUgfHwgdGhpcy5zdGF0ZSA9PT0gc3RhdGUpIHJldHVyblxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZVxuICAgIHZhciBpbmZvID0gdGhpcy5zdGF0ZXNbc3RhdGVdXG4gICAgdGhpcy5ncm91cHMgPSBpbmZvLmdyb3Vwc1xuICAgIHRoaXMuZXJyb3IgPSBpbmZvLmVycm9yIHx8IHtsaW5lQnJlYWtzOiB0cnVlLCBzaG91bGRUaHJvdzogdHJ1ZX1cbiAgICB0aGlzLnJlID0gaW5mby5yZWdleHBcbiAgfVxuXG4gIExleGVyLnByb3RvdHlwZS5wb3BTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGFjay5wb3AoKSlcbiAgfVxuXG4gIExleGVyLnByb3RvdHlwZS5wdXNoU3RhdGUgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgIHRoaXMuc3RhY2sucHVzaCh0aGlzLnN0YXRlKVxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpXG4gIH1cblxuICBMZXhlci5wcm90b3R5cGUuX2VhdCA9IGhhc1N0aWNreSA/IGZ1bmN0aW9uKHJlKSB7IC8vIGFzc3VtZSByZSBpcyAveVxuICAgIHJldHVybiByZS5leGVjKHRoaXMuYnVmZmVyKVxuICB9IDogZnVuY3Rpb24ocmUpIHsgLy8gYXNzdW1lIHJlIGlzIC9nXG4gICAgdmFyIG1hdGNoID0gcmUuZXhlYyh0aGlzLmJ1ZmZlcilcbiAgICAvLyB3aWxsIGFsd2F5cyBtYXRjaCwgc2luY2Ugd2UgdXNlZCB0aGUgfCg/OikgdHJpY2tcbiAgICBpZiAobWF0Y2hbMF0ubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gbWF0Y2hcbiAgfVxuXG4gIExleGVyLnByb3RvdHlwZS5fZ2V0R3JvdXAgPSBmdW5jdGlvbihtYXRjaCkge1xuICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuXG4gICAgdmFyIGdyb3VwQ291bnQgPSB0aGlzLmdyb3Vwcy5sZW5ndGhcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyb3VwQ291bnQ7IGkrKykge1xuICAgICAgaWYgKG1hdGNoW2kgKyAxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBpXG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignb29wcycpXG4gIH1cblxuICBmdW5jdGlvbiB0b2tlblRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlXG4gIH1cblxuICBMZXhlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZSA9IHRoaXMucmVcbiAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXJcblxuICAgIHZhciBpbmRleCA9IHJlLmxhc3RJbmRleCA9IHRoaXMuaW5kZXhcbiAgICBpZiAoaW5kZXggPT09IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAvLyBFT0ZcbiAgICB9XG5cbiAgICB2YXIgbWF0Y2ggPSB0aGlzLl9lYXQocmUpXG4gICAgdmFyIGkgPSB0aGlzLl9nZXRHcm91cChtYXRjaClcblxuICAgIHZhciBncm91cCwgdGV4dFxuICAgIGlmIChpID09PSAtMSkge1xuICAgICAgZ3JvdXAgPSB0aGlzLmVycm9yXG5cbiAgICAgIC8vIGNvbnN1bWUgcmVzdCBvZiBidWZmZXJcbiAgICAgIHRleHQgPSBidWZmZXIuc2xpY2UoaW5kZXgpXG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGV4dCA9IG1hdGNoWzBdXG4gICAgICBncm91cCA9IHRoaXMuZ3JvdXBzW2ldXG4gICAgfVxuXG4gICAgLy8gY291bnQgbGluZSBicmVha3NcbiAgICB2YXIgbGluZUJyZWFrcyA9IDBcbiAgICBpZiAoZ3JvdXAubGluZUJyZWFrcykge1xuICAgICAgdmFyIG1hdGNoTkwgPSAvXFxuL2dcbiAgICAgIHZhciBubCA9IDFcbiAgICAgIGlmICh0ZXh0ID09PSAnXFxuJykge1xuICAgICAgICBsaW5lQnJlYWtzID0gMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKG1hdGNoTkwuZXhlYyh0ZXh0KSkgeyBsaW5lQnJlYWtzKys7IG5sID0gbWF0Y2hOTC5sYXN0SW5kZXggfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB0b2tlbiA9IHtcbiAgICAgIHR5cGU6IChncm91cC5nZXRUeXBlICYmIGdyb3VwLmdldFR5cGUodGV4dCkpIHx8IGdyb3VwLnRva2VuVHlwZSxcbiAgICAgIHZhbHVlOiBncm91cC52YWx1ZSA/IGdyb3VwLnZhbHVlKHRleHQpIDogdGV4dCxcbiAgICAgIHRleHQ6IHRleHQsXG4gICAgICB0b1N0cmluZzogdG9rZW5Ub1N0cmluZyxcbiAgICAgIG9mZnNldDogaW5kZXgsXG4gICAgICBsaW5lQnJlYWtzOiBsaW5lQnJlYWtzLFxuICAgICAgbGluZTogdGhpcy5saW5lLFxuICAgICAgY29sOiB0aGlzLmNvbCxcbiAgICB9XG4gICAgLy8gbmIuIGFkZGluZyBtb3JlIHByb3BzIHRvIHRva2VuIG9iamVjdCB3aWxsIG1ha2UgVjggc2FkIVxuXG4gICAgdmFyIHNpemUgPSB0ZXh0Lmxlbmd0aFxuICAgIHRoaXMuaW5kZXggKz0gc2l6ZVxuICAgIHRoaXMubGluZSArPSBsaW5lQnJlYWtzXG4gICAgaWYgKGxpbmVCcmVha3MgIT09IDApIHtcbiAgICAgIHRoaXMuY29sID0gc2l6ZSAtIG5sICsgMVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbCArPSBzaXplXG4gICAgfVxuICAgIC8vIHRocm93LCBpZiBubyBydWxlIHdpdGgge2Vycm9yOiB0cnVlfVxuICAgIGlmIChncm91cC5zaG91bGRUaHJvdykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuZm9ybWF0RXJyb3IodG9rZW4sIFwiaW52YWxpZCBzeW50YXhcIikpXG4gICAgfVxuXG4gICAgaWYgKGdyb3VwLnBvcCkgdGhpcy5wb3BTdGF0ZSgpXG4gICAgZWxzZSBpZiAoZ3JvdXAucHVzaCkgdGhpcy5wdXNoU3RhdGUoZ3JvdXAucHVzaClcbiAgICBlbHNlIGlmIChncm91cC5uZXh0KSB0aGlzLnNldFN0YXRlKGdyb3VwLm5leHQpXG4gICAgcmV0dXJuIHRva2VuXG4gIH1cblxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLml0ZXJhdG9yKSB7XG4gICAgdmFyIExleGVySXRlcmF0b3IgPSBmdW5jdGlvbihsZXhlcikge1xuICAgICAgdGhpcy5sZXhlciA9IGxleGVyXG4gICAgfVxuXG4gICAgTGV4ZXJJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRva2VuID0gdGhpcy5sZXhlci5uZXh0KClcbiAgICAgIHJldHVybiB7dmFsdWU6IHRva2VuLCBkb25lOiAhdG9rZW59XG4gICAgfVxuXG4gICAgTGV4ZXJJdGVyYXRvci5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBMZXhlci5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBMZXhlckl0ZXJhdG9yKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgTGV4ZXIucHJvdG90eXBlLmZvcm1hdEVycm9yID0gZnVuY3Rpb24odG9rZW4sIG1lc3NhZ2UpIHtcbiAgICB2YXIgdmFsdWUgPSB0b2tlbi52YWx1ZVxuICAgIHZhciBpbmRleCA9IHRva2VuLm9mZnNldFxuICAgIHZhciBlb2wgPSB0b2tlbi5saW5lQnJlYWtzID8gdmFsdWUuaW5kZXhPZignXFxuJykgOiB2YWx1ZS5sZW5ndGhcbiAgICB2YXIgc3RhcnQgPSBNYXRoLm1heCgwLCBpbmRleCAtIHRva2VuLmNvbCArIDEpXG4gICAgdmFyIGZpcnN0TGluZSA9IHRoaXMuYnVmZmVyLnN1YnN0cmluZyhzdGFydCwgaW5kZXggKyBlb2wpXG4gICAgbWVzc2FnZSArPSBcIiBhdCBsaW5lIFwiICsgdG9rZW4ubGluZSArIFwiIGNvbCBcIiArIHRva2VuLmNvbCArIFwiOlxcblxcblwiXG4gICAgbWVzc2FnZSArPSBcIiAgXCIgKyBmaXJzdExpbmUgKyBcIlxcblwiXG4gICAgbWVzc2FnZSArPSBcIiAgXCIgKyBBcnJheSh0b2tlbi5jb2wpLmpvaW4oXCIgXCIpICsgXCJeXCJcbiAgICByZXR1cm4gbWVzc2FnZVxuICB9XG5cbiAgTGV4ZXIucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBMZXhlcih0aGlzLnN0YXRlcywgdGhpcy5zdGF0ZSlcbiAgfVxuXG4gIExleGVyLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbih0b2tlblR5cGUpIHtcbiAgICBmb3IgKHZhciBzIGluIHRoaXMuc3RhdGVzKSB7XG4gICAgICB2YXIgZ3JvdXBzID0gdGhpcy5zdGF0ZXNbc10uZ3JvdXBzXG4gICAgICBmb3IgKHZhciBpPTA7IGk8Z3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBncm91cCA9IGdyb3Vwc1tpXVxuICAgICAgICBpZiAoZ3JvdXAudG9rZW5UeXBlID09PSB0b2tlblR5cGUpIHJldHVybiB0cnVlXG4gICAgICAgIGlmIChncm91cC5rZXl3b3JkcyAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGdyb3VwLmtleXdvcmRzLCB0b2tlblR5cGUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG5cbiAgcmV0dXJuIHtcbiAgICBjb21waWxlOiBjb21waWxlLFxuICAgIHN0YXRlczogY29tcGlsZVN0YXRlcyxcbiAgICBlcnJvcjogT2JqZWN0LmZyZWV6ZSh7ZXJyb3I6IHRydWV9KSxcbiAgfVxuXG59KSlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vby9tb28uanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgTUVUQSA9IHtcclxuICBGSUxFX0hFQURFUjogJ0NFTFNUQVJTJyxcclxuICBWRVJTSU9OOiAweDAxMDAsXHJcbiAgSEVBREVSX09GRlNFVDogMTRcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTUVUQVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvRGF0TWV0YS50cyIsImltcG9ydCBBYnN0cmFjdFdyaXRlciBmcm9tICcuL0Fic3RyYWN0V3JpdGVyJ1xyXG5pbXBvcnQgeyBTZXJpYWxpemVyIH0gZnJvbSAnLi4vU2VyaWFsaXplcidcclxuXHJcbmFic3RyYWN0IGNsYXNzIFRleHRXcml0ZXIgaW1wbGVtZW50cyBBYnN0cmFjdFdyaXRlciB7XHJcbiAgd3JpdGUgKHR5cGU6IHN0cmluZywgaXRlbXM6IGFueVtdKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy50cmFuc2Zvcm0oaXRlbXMpKVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybSAoaXRlbXM6IGFueVtdKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBpdGVtcy5tYXAoaXRlbSA9PiB0aGlzLnRyYW5zZm9ybUl0ZW0oaXRlbSkpLmpvaW4oJ1xcbicpXHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1JdGVtIChpdGVtOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb2JqZWN0SGVhZGVyID0gdGhpcy53cml0ZUhlYWRlcihpdGVtLm1ldGEpXHJcbiAgICBjb25zdCBvYmplY3RQcm9wZXJ0aWVzID0gU2VyaWFsaXplci5zdHJpbmdpZnkoaXRlbS5wcm9wZXJ0aWVzKVxyXG4gICAgcmV0dXJuIG9iamVjdEhlYWRlciArICcgJyArIG9iamVjdFByb3BlcnRpZXMgKyAnXFxuJ1xyXG4gIH1cclxuXHJcbiAgYWJzdHJhY3Qgd3JpdGVIZWFkZXIgKHZhbHVlOiBPYmplY3QpOiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dFdyaXRlclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvV3JpdGVyL1RleHRXcml0ZXIudHMiLCJpbXBvcnQgTUVUQSBmcm9tICcuL0RhdE1ldGEnXHJcbmltcG9ydCBkZWNvZGVTcGVjdHJhbENsYXNzIGZyb20gJy4vZGVjb2RlU3BlY3RyYWxDbGFzcydcclxuaW1wb3J0IGVuY29kZVNwZWN0cmFsQ2xhc3MgZnJvbSAnLi9lbmNvZGVTcGVjdHJhbENsYXNzJ1xyXG5cclxuZXhwb3J0IHtcclxuICBNRVRBLFxyXG4gIGRlY29kZVNwZWN0cmFsQ2xhc3MsXHJcbiAgZW5jb2RlU3BlY3RyYWxDbGFzc1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9pbmRleC50cyIsImltcG9ydCBBYnN0cmFjdFdyaXRlciBmcm9tICcuL0Fic3RyYWN0V3JpdGVyJ1xyXG5pbXBvcnQgeyBTZXJpYWxpemVyIH0gZnJvbSAnLi4vU2VyaWFsaXplcidcclxuXHJcbmFic3RyYWN0IGNsYXNzIENvbmZpZ1dyaXRlciBpbXBsZW1lbnRzIEFic3RyYWN0V3JpdGVyIHtcclxuICB3cml0ZSAodHlwZTogc3RyaW5nLCBjb25maWc6IGFueSk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiByZXNvbHZlKFNlcmlhbGl6ZXIuc3RyaW5naWZ5KGNvbmZpZykpXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnV3JpdGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Xcml0ZXIvQ29uZmlnV3JpdGVyLnRzIiwiaW1wb3J0IHsgSW5qZWN0b3IgfSBmcm9tICcuLi9JbmplY3RvcidcclxuXHJcbmV4cG9ydCBjbGFzcyBDZWxpbyB7XHJcbiAgc3RhdGljIHJlYWQgKGJ1ZmZlcjogQnVmZmVyLCB0eXBlOiBzdHJpbmcpOiBQcm9taXNlPGFueVtdPiB7XHJcbiAgICBjb25zdCBSZWFkZXIgPSBJbmplY3Rvci5tYWtlUmVhZGVyKHR5cGUpXHJcblxyXG4gICAgcmV0dXJuIFJlYWRlci5yZWFkKGJ1ZmZlcilcclxuICB9XHJcblxyXG4gIHN0YXRpYyB3cml0ZSAodHlwZTogc3RyaW5nLCBpdGVtczogYW55W10pOiBQcm9taXNlPEJ1ZmZlciB8IHN0cmluZz4ge1xyXG4gICAgY29uc3QgV3JpdGVyID0gSW5qZWN0b3IubWFrZVdyaXRlcih0eXBlKVxyXG5cclxuICAgIHJldHVybiBXcml0ZXIud3JpdGUodHlwZSwgaXRlbXMpXHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9DZWxpby9DZWxpby50cyIsImltcG9ydCBJbmplY3RvciBmcm9tICcuL0luamVjdG9yJ1xyXG5cclxuZXhwb3J0IHtcclxuICBJbmplY3RvclxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9JbmplY3Rvci9pbmRleC50cyIsImltcG9ydCB7IEFic3RyYWN0UmVhZGVyLCBEQVRSZWFkZXIsIE5lYXJsZXlCYXNlZFJlYWRlciB9IGZyb20gJy4uL1JlYWRlcidcclxuaW1wb3J0IHsgQWJzdHJhY3RXcml0ZXIsIFNUQ1dyaXRlciwgU1NDV3JpdGVyLCBEU0NXcml0ZXIsIENGR1dyaXRlciwgREFUV3JpdGVyIH0gZnJvbSAnLi4vV3JpdGVyJ1xyXG5pbXBvcnQgR3JhbW1hcnMgZnJvbSAnLi4vZ3JhbW1hcidcclxuaW1wb3J0IHsgRm9ybWF0c0NoZWNrZXIsIEZvcm1hdFR5cGUgfSBmcm9tICcuLi9Gb3JtYXRzQ2hlY2tlcidcclxuXHJcbmNsYXNzIEluamVjdG9yIHtcclxuICBzdGF0aWMgbWFrZVJlYWRlciAoZXh0ZW5zaW9uOiBzdHJpbmcpOiBBYnN0cmFjdFJlYWRlciB7XHJcbiAgICBzd2l0Y2ggKEZvcm1hdHNDaGVja2VyLmZvcm1hdFR5cGUoZXh0ZW5zaW9uKSkge1xyXG4gICAgICBjYXNlIEZvcm1hdFR5cGUuQklOQVJZOlxyXG4gICAgICAgIHJldHVybiBuZXcgREFUUmVhZGVyKClcclxuXHJcbiAgICAgIGNhc2UgRm9ybWF0VHlwZS5URVhUOlxyXG4gICAgICAgIGNvbnN0IEdyYW1tYXIgPSBleHRlbnNpb24udG9VcHBlckNhc2UoKSArICdHcmFtbWFyJ1xyXG4gICAgICAgIHJldHVybiBuZXcgTmVhcmxleUJhc2VkUmVhZGVyKEdyYW1tYXJzW0dyYW1tYXJdKVxyXG5cclxuICAgICAgY2FzZSBGb3JtYXRUeXBlLklOQ09SUkVDVDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEluY29ycmVjdCBmaWxlIGZvcm1hdGApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbWFrZVdyaXRlciAoZXh0ZW5zaW9uOiBzdHJpbmcpOiBBYnN0cmFjdFdyaXRlciB7XHJcbiAgICBzd2l0Y2ggKEZvcm1hdHNDaGVja2VyLmZvcm1hdFR5cGUoZXh0ZW5zaW9uKSkge1xyXG4gICAgICBjYXNlIEZvcm1hdFR5cGUuQklOQVJZOlxyXG4gICAgICAgIHJldHVybiBuZXcgREFUV3JpdGVyKClcclxuXHJcbiAgICAgIGNhc2UgRm9ybWF0VHlwZS5URVhUOlxyXG4gICAgICAgIHN3aXRjaCAoZXh0ZW5zaW9uKSB7XHJcbiAgICAgICAgICBjYXNlICdzdGMnOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNUQ1dyaXRlcigpXHJcblxyXG4gICAgICAgICAgY2FzZSAnc3NjJzpcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTU0NXcml0ZXIoKVxyXG5cclxuICAgICAgICAgIGNhc2UgJ2RzYyc6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRFNDV3JpdGVyKClcclxuXHJcbiAgICAgICAgICBjYXNlICdjZmcnOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENGR1dyaXRlcigpXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbmNvcnJlY3QgZmlsZSBmb3JtYXRgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIGNhc2UgRm9ybWF0VHlwZS5JTkNPUlJFQ1Q6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbmNvcnJlY3QgZmlsZSBmb3JtYXRgKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5qZWN0b3JcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0luamVjdG9yL0luamVjdG9yLnRzIiwiaW1wb3J0IE5lYXJsZXlCYXNlZFJlYWRlciBmcm9tICcuL05lYXJsZXlCYXNlZFJlYWRlcidcclxuaW1wb3J0IERBVFJlYWRlciBmcm9tICcuL0RBVFJlYWRlcidcclxuaW1wb3J0IEFic3RyYWN0UmVhZGVyIGZyb20gJy4vQWJzdHJhY3RSZWFkZXInXHJcblxyXG5leHBvcnQge1xyXG4gIE5lYXJsZXlCYXNlZFJlYWRlcixcclxuICBEQVRSZWFkZXIsXHJcbiAgQWJzdHJhY3RSZWFkZXIsXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlYWRlci9pbmRleC50cyIsImltcG9ydCB7IEdyYW1tYXIsIFBhcnNlciB9IGZyb20gJ25lYXJsZXknXHJcbmltcG9ydCBBYnN0cmFjdFJlYWRlciBmcm9tICcuL0Fic3RyYWN0UmVhZGVyJ1xyXG5cclxuY2xhc3MgTmVhcmxleUJhc2VkUmVhZGVyIGltcGxlbWVudHMgQWJzdHJhY3RSZWFkZXIge1xyXG4gIHBhcnNlcjogYW55XHJcblxyXG4gIGNvbnN0cnVjdG9yIChncmFtbWFyKSB7XHJcbiAgICB0aGlzLnBhcnNlciA9IG5ldyBQYXJzZXIoR3JhbW1hci5mcm9tQ29tcGlsZWQoZ3JhbW1hcikpXHJcbiAgfVxyXG5cclxuICByZWFkIChkYXRhOiBzdHJpbmcpOiBQcm9taXNlPGFueVtdPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucGFyc2VyLmZlZWQoZGF0YSkucmVzdWx0c1swXVxyXG4gICAgICAgIHJlc29sdmUocmVzdWx0KVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlamVjdCAoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZWFybGV5QmFzZWRSZWFkZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlYWRlci9OZWFybGV5QmFzZWRSZWFkZXIudHMiLCIoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290Lm5lYXJsZXkgPSBmYWN0b3J5KCk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbigpIHtcblxuZnVuY3Rpb24gUnVsZShuYW1lLCBzeW1ib2xzLCBwb3N0cHJvY2Vzcykge1xuICAgIHRoaXMuaWQgPSArK1J1bGUuaGlnaGVzdElkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5zeW1ib2xzID0gc3ltYm9sczsgICAgICAgIC8vIGEgbGlzdCBvZiBsaXRlcmFsIHwgcmVnZXggY2xhc3MgfCBub250ZXJtaW5hbFxuICAgIHRoaXMucG9zdHByb2Nlc3MgPSBwb3N0cHJvY2VzcztcbiAgICByZXR1cm4gdGhpcztcbn1cblJ1bGUuaGlnaGVzdElkID0gMDtcblxuUnVsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbih3aXRoQ3Vyc29yQXQpIHtcbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlTeW1ib2xTZXF1ZW5jZSAoZSkge1xuICAgICAgICByZXR1cm4gZS5saXRlcmFsID8gSlNPTi5zdHJpbmdpZnkoZS5saXRlcmFsKSA6XG4gICAgICAgICAgICAgICBlLnR5cGUgPyAnJScgKyBlLnR5cGUgOiBlLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHZhciBzeW1ib2xTZXF1ZW5jZSA9ICh0eXBlb2Ygd2l0aEN1cnNvckF0ID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zeW1ib2xzLm1hcChzdHJpbmdpZnlTeW1ib2xTZXF1ZW5jZSkuam9pbignICcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgOiAoICAgdGhpcy5zeW1ib2xzLnNsaWNlKDAsIHdpdGhDdXJzb3JBdCkubWFwKHN0cmluZ2lmeVN5bWJvbFNlcXVlbmNlKS5qb2luKCcgJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiDil48gXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLnN5bWJvbHMuc2xpY2Uod2l0aEN1cnNvckF0KS5tYXAoc3RyaW5naWZ5U3ltYm9sU2VxdWVuY2UpLmpvaW4oJyAnKSAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgXCIg4oaSIFwiICsgc3ltYm9sU2VxdWVuY2U7XG59XG5cblxuLy8gYSBTdGF0ZSBpcyBhIHJ1bGUgYXQgYSBwb3NpdGlvbiBmcm9tIGEgZ2l2ZW4gc3RhcnRpbmcgcG9pbnQgaW4gdGhlIGlucHV0IHN0cmVhbSAocmVmZXJlbmNlKVxuZnVuY3Rpb24gU3RhdGUocnVsZSwgZG90LCByZWZlcmVuY2UsIHdhbnRlZEJ5KSB7XG4gICAgdGhpcy5ydWxlID0gcnVsZTtcbiAgICB0aGlzLmRvdCA9IGRvdDtcbiAgICB0aGlzLnJlZmVyZW5jZSA9IHJlZmVyZW5jZTtcbiAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICB0aGlzLndhbnRlZEJ5ID0gd2FudGVkQnk7XG4gICAgdGhpcy5pc0NvbXBsZXRlID0gdGhpcy5kb3QgPT09IHJ1bGUuc3ltYm9scy5sZW5ndGg7XG59XG5cblN0YXRlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIntcIiArIHRoaXMucnVsZS50b1N0cmluZyh0aGlzLmRvdCkgKyBcIn0sIGZyb206IFwiICsgKHRoaXMucmVmZXJlbmNlIHx8IDApO1xufTtcblxuU3RhdGUucHJvdG90eXBlLm5leHRTdGF0ZSA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgdmFyIHN0YXRlID0gbmV3IFN0YXRlKHRoaXMucnVsZSwgdGhpcy5kb3QgKyAxLCB0aGlzLnJlZmVyZW5jZSwgdGhpcy53YW50ZWRCeSk7XG4gICAgc3RhdGUubGVmdCA9IHRoaXM7XG4gICAgc3RhdGUucmlnaHQgPSBjaGlsZDtcbiAgICBpZiAoc3RhdGUuaXNDb21wbGV0ZSkge1xuICAgICAgICBzdGF0ZS5kYXRhID0gc3RhdGUuYnVpbGQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcblxuU3RhdGUucHJvdG90eXBlLmJ1aWxkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gW107XG4gICAgdmFyIG5vZGUgPSB0aGlzO1xuICAgIGRvIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChub2RlLnJpZ2h0LmRhdGEpO1xuICAgICAgICBub2RlID0gbm9kZS5sZWZ0O1xuICAgIH0gd2hpbGUgKG5vZGUubGVmdCk7XG4gICAgY2hpbGRyZW4ucmV2ZXJzZSgpO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbn07XG5cblN0YXRlLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5ydWxlLnBvc3Rwcm9jZXNzKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMucnVsZS5wb3N0cHJvY2Vzcyh0aGlzLmRhdGEsIHRoaXMucmVmZXJlbmNlLCBQYXJzZXIuZmFpbCk7XG4gICAgfVxufTtcblxuXG5mdW5jdGlvbiBDb2x1bW4oZ3JhbW1hciwgaW5kZXgpIHtcbiAgICB0aGlzLmdyYW1tYXIgPSBncmFtbWFyO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLnN0YXRlcyA9IFtdO1xuICAgIHRoaXMud2FudHMgPSB7fTsgLy8gc3RhdGVzIGluZGV4ZWQgYnkgdGhlIG5vbi10ZXJtaW5hbCB0aGV5IGV4cGVjdFxuICAgIHRoaXMuc2Nhbm5hYmxlID0gW107IC8vIGxpc3Qgb2Ygc3RhdGVzIHRoYXQgZXhwZWN0IGEgdG9rZW5cbiAgICB0aGlzLmNvbXBsZXRlZCA9IHt9OyAvLyBzdGF0ZXMgdGhhdCBhcmUgbnVsbGFibGVcbn1cblxuXG5Db2x1bW4ucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbihuZXh0Q29sdW1uKSB7XG4gICAgdmFyIHN0YXRlcyA9IHRoaXMuc3RhdGVzO1xuICAgIHZhciB3YW50cyA9IHRoaXMud2FudHM7XG4gICAgdmFyIGNvbXBsZXRlZCA9IHRoaXMuY29tcGxldGVkO1xuXG4gICAgZm9yICh2YXIgdyA9IDA7IHcgPCBzdGF0ZXMubGVuZ3RoOyB3KyspIHsgLy8gbmIuIHdlIHB1c2goKSBkdXJpbmcgaXRlcmF0aW9uXG4gICAgICAgIHZhciBzdGF0ZSA9IHN0YXRlc1t3XTtcblxuICAgICAgICBpZiAoc3RhdGUuaXNDb21wbGV0ZSkge1xuICAgICAgICAgICAgc3RhdGUuZmluaXNoKCk7XG4gICAgICAgICAgICBpZiAoc3RhdGUuZGF0YSAhPT0gUGFyc2VyLmZhaWwpIHtcbiAgICAgICAgICAgICAgICAvLyBjb21wbGV0ZVxuICAgICAgICAgICAgICAgIHZhciB3YW50ZWRCeSA9IHN0YXRlLndhbnRlZEJ5O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSB3YW50ZWRCeS5sZW5ndGg7IGktLTsgKSB7IC8vIHRoaXMgbGluZSBpcyBob3RcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlZnQgPSB3YW50ZWRCeVtpXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZShsZWZ0LCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gc3BlY2lhbC1jYXNlIG51bGxhYmxlc1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5yZWZlcmVuY2UgPT09IHRoaXMuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGZ1dHVyZSBwcmVkaWN0b3JzIG9mIHRoaXMgcnVsZSBnZXQgY29tcGxldGVkLlxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwID0gc3RhdGUucnVsZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAodGhpcy5jb21wbGV0ZWRbZXhwXSA9IHRoaXMuY29tcGxldGVkW2V4cF0gfHwgW10pLnB1c2goc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcXVldWUgc2Nhbm5hYmxlIHN0YXRlc1xuICAgICAgICAgICAgdmFyIGV4cCA9IHN0YXRlLnJ1bGUuc3ltYm9sc1tzdGF0ZS5kb3RdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FubmFibGUucHVzaChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHByZWRpY3RcbiAgICAgICAgICAgIGlmICh3YW50c1tleHBdKSB7XG4gICAgICAgICAgICAgICAgd2FudHNbZXhwXS5wdXNoKHN0YXRlKTtcblxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuaGFzT3duUHJvcGVydHkoZXhwKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVsbHMgPSBjb21wbGV0ZWRbZXhwXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbnVsbHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlKHN0YXRlLCByaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdhbnRzW2V4cF0gPSBbc3RhdGVdO1xuICAgICAgICAgICAgICAgIHRoaXMucHJlZGljdChleHApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5Db2x1bW4ucHJvdG90eXBlLnByZWRpY3QgPSBmdW5jdGlvbihleHApIHtcbiAgICB2YXIgcnVsZXMgPSB0aGlzLmdyYW1tYXIuYnlOYW1lW2V4cF0gfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciByID0gcnVsZXNbaV07XG4gICAgICAgIHZhciB3YW50ZWRCeSA9IHRoaXMud2FudHNbZXhwXTtcbiAgICAgICAgdmFyIHMgPSBuZXcgU3RhdGUociwgMCwgdGhpcy5pbmRleCwgd2FudGVkQnkpO1xuICAgICAgICB0aGlzLnN0YXRlcy5wdXNoKHMpO1xuICAgIH1cbn1cblxuQ29sdW1uLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgdmFyIGlucCA9IHJpZ2h0LnJ1bGUubmFtZTtcbiAgICBpZiAobGVmdC5ydWxlLnN5bWJvbHNbbGVmdC5kb3RdID09PSBpbnApIHtcbiAgICAgICAgdmFyIGNvcHkgPSBsZWZ0Lm5leHRTdGF0ZShyaWdodCk7XG4gICAgICAgIHRoaXMuc3RhdGVzLnB1c2goY29weSk7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIEdyYW1tYXIocnVsZXMsIHN0YXJ0KSB7XG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydCB8fCB0aGlzLnJ1bGVzWzBdLm5hbWU7XG4gICAgdmFyIGJ5TmFtZSA9IHRoaXMuYnlOYW1lID0ge307XG4gICAgdGhpcy5ydWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHJ1bGUpIHtcbiAgICAgICAgaWYgKCFieU5hbWUuaGFzT3duUHJvcGVydHkocnVsZS5uYW1lKSkge1xuICAgICAgICAgICAgYnlOYW1lW3J1bGUubmFtZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBieU5hbWVbcnVsZS5uYW1lXS5wdXNoKHJ1bGUpO1xuICAgIH0pO1xufVxuXG4vLyBTbyB3ZSBjYW4gYWxsb3cgcGFzc2luZyAocnVsZXMsIHN0YXJ0KSBkaXJlY3RseSB0byBQYXJzZXIgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5HcmFtbWFyLmZyb21Db21waWxlZCA9IGZ1bmN0aW9uKHJ1bGVzLCBzdGFydCkge1xuICAgIHZhciBsZXhlciA9IHJ1bGVzLkxleGVyO1xuICAgIGlmIChydWxlcy5QYXJzZXJTdGFydCkge1xuICAgICAgc3RhcnQgPSBydWxlcy5QYXJzZXJTdGFydDtcbiAgICAgIHJ1bGVzID0gcnVsZXMuUGFyc2VyUnVsZXM7XG4gICAgfVxuICAgIHZhciBydWxlcyA9IHJ1bGVzLm1hcChmdW5jdGlvbiAocikgeyByZXR1cm4gKG5ldyBSdWxlKHIubmFtZSwgci5zeW1ib2xzLCByLnBvc3Rwcm9jZXNzKSk7IH0pO1xuICAgIHZhciBnID0gbmV3IEdyYW1tYXIocnVsZXMsIHN0YXJ0KTtcbiAgICBnLmxleGVyID0gbGV4ZXI7IC8vIG5iLiBzdG9yaW5nIGxleGVyIG9uIEdyYW1tYXIgaXMgaWZmeSwgYnV0IHVuYXZvaWRhYmxlXG4gICAgcmV0dXJuIGc7XG59XG5cblxuZnVuY3Rpb24gU3RyZWFtTGV4ZXIoKSB7XG4gIHRoaXMucmVzZXQoXCJcIik7XG59XG5cblN0cmVhbUxleGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKGRhdGEsIHN0YXRlKSB7XG4gICAgdGhpcy5idWZmZXIgPSBkYXRhO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMubGluZSA9IHN0YXRlID8gc3RhdGUubGluZSA6IDE7XG4gICAgdGhpcy5sYXN0TGluZUJyZWFrID0gc3RhdGUgPyAtc3RhdGUuY29sIDogMDtcbn1cblxuU3RyZWFtTGV4ZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICB2YXIgY2ggPSB0aGlzLmJ1ZmZlclt0aGlzLmluZGV4KytdO1xuICAgICAgICBpZiAoY2ggPT09ICdcXG4nKSB7XG4gICAgICAgICAgdGhpcy5saW5lICs9IDE7XG4gICAgICAgICAgdGhpcy5sYXN0TGluZUJyZWFrID0gdGhpcy5pbmRleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3ZhbHVlOiBjaH07XG4gICAgfVxufVxuXG5TdHJlYW1MZXhlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIGxpbmU6IHRoaXMubGluZSxcbiAgICBjb2w6IHRoaXMuaW5kZXggLSB0aGlzLmxhc3RMaW5lQnJlYWssXG4gIH1cbn1cblxuU3RyZWFtTGV4ZXIucHJvdG90eXBlLmZvcm1hdEVycm9yID0gZnVuY3Rpb24odG9rZW4sIG1lc3NhZ2UpIHtcbiAgICAvLyBuYi4gdGhpcyBnZXRzIGNhbGxlZCBhZnRlciBjb25zdW1pbmcgdGhlIG9mZmVuZGluZyB0b2tlbixcbiAgICAvLyBzbyB0aGUgY3VscHJpdCBpcyBpbmRleC0xXG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIGlmICh0eXBlb2YgYnVmZmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgbmV4dExpbmVCcmVhayA9IGJ1ZmZlci5pbmRleE9mKCdcXG4nLCB0aGlzLmluZGV4KTtcbiAgICAgICAgaWYgKG5leHRMaW5lQnJlYWsgPT09IC0xKSBuZXh0TGluZUJyZWFrID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgdmFyIGxpbmUgPSBidWZmZXIuc3Vic3RyaW5nKHRoaXMubGFzdExpbmVCcmVhaywgbmV4dExpbmVCcmVhaylcbiAgICAgICAgdmFyIGNvbCA9IHRoaXMuaW5kZXggLSB0aGlzLmxhc3RMaW5lQnJlYWs7XG4gICAgICAgIG1lc3NhZ2UgKz0gXCIgYXQgbGluZSBcIiArIHRoaXMubGluZSArIFwiIGNvbCBcIiArIGNvbCArIFwiOlxcblxcblwiO1xuICAgICAgICBtZXNzYWdlICs9IFwiICBcIiArIGxpbmUgKyBcIlxcblwiXG4gICAgICAgIG1lc3NhZ2UgKz0gXCIgIFwiICsgQXJyYXkoY29sKS5qb2luKFwiIFwiKSArIFwiXlwiXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlICsgXCIgYXQgaW5kZXggXCIgKyAodGhpcy5pbmRleCAtIDEpO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBQYXJzZXIocnVsZXMsIHN0YXJ0LCBvcHRpb25zKSB7XG4gICAgaWYgKHJ1bGVzIGluc3RhbmNlb2YgR3JhbW1hcikge1xuICAgICAgICB2YXIgZ3JhbW1hciA9IHJ1bGVzO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHN0YXJ0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBncmFtbWFyID0gR3JhbW1hci5mcm9tQ29tcGlsZWQocnVsZXMsIHN0YXJ0KTtcbiAgICB9XG4gICAgdGhpcy5ncmFtbWFyID0gZ3JhbW1hcjtcblxuICAgIC8vIFJlYWQgb3B0aW9uc1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAga2VlcEhpc3Rvcnk6IGZhbHNlLFxuICAgICAgICBsZXhlcjogZ3JhbW1hci5sZXhlciB8fCBuZXcgU3RyZWFtTGV4ZXIsXG4gICAgfTtcbiAgICBmb3IgKHZhciBrZXkgaW4gKG9wdGlvbnMgfHwge30pKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgIH1cblxuICAgIC8vIFNldHVwIGxleGVyXG4gICAgdGhpcy5sZXhlciA9IHRoaXMub3B0aW9ucy5sZXhlcjtcbiAgICB0aGlzLmxleGVyU3RhdGUgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBTZXR1cCBhIHRhYmxlXG4gICAgdmFyIGNvbHVtbiA9IG5ldyBDb2x1bW4oZ3JhbW1hciwgMCk7XG4gICAgdmFyIHRhYmxlID0gdGhpcy50YWJsZSA9IFtjb2x1bW5dO1xuXG4gICAgLy8gSSBjb3VsZCBiZSBleHBlY3RpbmcgYW55dGhpbmcuXG4gICAgY29sdW1uLndhbnRzW2dyYW1tYXIuc3RhcnRdID0gW107XG4gICAgY29sdW1uLnByZWRpY3QoZ3JhbW1hci5zdGFydCk7XG4gICAgLy8gVE9ETyB3aGF0IGlmIHN0YXJ0IHJ1bGUgaXMgbnVsbGFibGU/XG4gICAgY29sdW1uLnByb2Nlc3MoKTtcbiAgICB0aGlzLmN1cnJlbnQgPSAwOyAvLyB0b2tlbiBpbmRleFxufVxuXG4vLyBjcmVhdGUgYSByZXNlcnZlZCB0b2tlbiBmb3IgaW5kaWNhdGluZyBhIHBhcnNlIGZhaWxcblBhcnNlci5mYWlsID0ge307XG5cblBhcnNlci5wcm90b3R5cGUuZmVlZCA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gICAgdmFyIGxleGVyID0gdGhpcy5sZXhlcjtcbiAgICBsZXhlci5yZXNldChjaHVuaywgdGhpcy5sZXhlclN0YXRlKTtcblxuICAgIHZhciB0b2tlbjtcbiAgICB3aGlsZSAodG9rZW4gPSBsZXhlci5uZXh0KCkpIHtcbiAgICAgICAgLy8gV2UgYWRkIG5ldyBzdGF0ZXMgdG8gdGFibGVbY3VycmVudCsxXVxuICAgICAgICB2YXIgY29sdW1uID0gdGhpcy50YWJsZVt0aGlzLmN1cnJlbnRdO1xuXG4gICAgICAgIC8vIEdDIHVudXNlZCBzdGF0ZXNcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMua2VlcEhpc3RvcnkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnRhYmxlW3RoaXMuY3VycmVudCAtIDFdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG4gPSB0aGlzLmN1cnJlbnQgKyAxO1xuICAgICAgICB2YXIgbmV4dENvbHVtbiA9IG5ldyBDb2x1bW4odGhpcy5ncmFtbWFyLCBuKTtcbiAgICAgICAgdGhpcy50YWJsZS5wdXNoKG5leHRDb2x1bW4pO1xuXG4gICAgICAgIC8vIEFkdmFuY2UgYWxsIHRva2VucyB0aGF0IGV4cGVjdCB0aGUgc3ltYm9sXG4gICAgICAgIHZhciBsaXRlcmFsID0gdG9rZW4udmFsdWU7XG4gICAgICAgIHZhciB2YWx1ZSA9IGxleGVyLmNvbnN0cnVjdG9yID09PSBTdHJlYW1MZXhlciA/IHRva2VuLnZhbHVlIDogdG9rZW47XG4gICAgICAgIHZhciBzY2FubmFibGUgPSBjb2x1bW4uc2Nhbm5hYmxlO1xuICAgICAgICBmb3IgKHZhciB3ID0gc2Nhbm5hYmxlLmxlbmd0aDsgdy0tOyApIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHNjYW5uYWJsZVt3XTtcbiAgICAgICAgICAgIHZhciBleHBlY3QgPSBzdGF0ZS5ydWxlLnN5bWJvbHNbc3RhdGUuZG90XTtcbiAgICAgICAgICAgIC8vIFRyeSB0byBjb25zdW1lIHRoZSB0b2tlblxuICAgICAgICAgICAgLy8gZWl0aGVyIHJlZ2V4IG9yIGxpdGVyYWxcbiAgICAgICAgICAgIGlmIChleHBlY3QudGVzdCA/IGV4cGVjdC50ZXN0KHZhbHVlKSA6XG4gICAgICAgICAgICAgICAgZXhwZWN0LnR5cGUgPyBleHBlY3QudHlwZSA9PT0gdG9rZW4udHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZXhwZWN0LmxpdGVyYWwgPT09IGxpdGVyYWwpIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgaXRcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IHN0YXRlLm5leHRTdGF0ZSh7ZGF0YTogdmFsdWUsIHRva2VuOiB0b2tlbiwgaXNUb2tlbjogdHJ1ZSwgcmVmZXJlbmNlOiBuIC0gMX0pO1xuICAgICAgICAgICAgICAgIG5leHRDb2x1bW4uc3RhdGVzLnB1c2gobmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOZXh0LCBmb3IgZWFjaCBvZiB0aGUgcnVsZXMsIHdlIGVpdGhlclxuICAgICAgICAvLyAoYSkgY29tcGxldGUgaXQsIGFuZCB0cnkgdG8gc2VlIGlmIHRoZSByZWZlcmVuY2Ugcm93IGV4cGVjdGVkIHRoYXRcbiAgICAgICAgLy8gICAgIHJ1bGVcbiAgICAgICAgLy8gKGIpIHByZWRpY3QgdGhlIG5leHQgbm9udGVybWluYWwgaXQgZXhwZWN0cyBieSBhZGRpbmcgdGhhdFxuICAgICAgICAvLyAgICAgbm9udGVybWluYWwncyBzdGFydCBzdGF0ZVxuICAgICAgICAvLyBUbyBwcmV2ZW50IGR1cGxpY2F0aW9uLCB3ZSBhbHNvIGtlZXAgdHJhY2sgb2YgcnVsZXMgd2UgaGF2ZSBhbHJlYWR5XG4gICAgICAgIC8vIGFkZGVkXG5cbiAgICAgICAgbmV4dENvbHVtbi5wcm9jZXNzKCk7XG5cbiAgICAgICAgLy8gSWYgbmVlZGVkLCB0aHJvdyBhbiBlcnJvcjpcbiAgICAgICAgaWYgKG5leHRDb2x1bW4uc3RhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gTm8gc3RhdGVzIGF0IGFsbCEgVGhpcyBpcyBub3QgZ29vZC5cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy5sZXhlci5mb3JtYXRFcnJvcih0b2tlbiwgXCJpbnZhbGlkIHN5bnRheFwiKSArIFwiXFxuXCI7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiVW5leHBlY3RlZCBcIiArICh0b2tlbi50eXBlID8gdG9rZW4udHlwZSArIFwiIHRva2VuOiBcIiA6IFwiXCIpO1xuICAgICAgICAgICAgbWVzc2FnZSArPSBKU09OLnN0cmluZ2lmeSh0b2tlbi52YWx1ZSAhPT0gdW5kZWZpbmVkID8gdG9rZW4udmFsdWUgOiB0b2tlbikgKyBcIlxcblwiO1xuICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgIGVyci5vZmZzZXQgPSB0aGlzLmN1cnJlbnQ7XG4gICAgICAgICAgICBlcnIudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1heWJlIHNhdmUgbGV4ZXIgc3RhdGVcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5rZWVwSGlzdG9yeSkge1xuICAgICAgICAgIGNvbHVtbi5sZXhlclN0YXRlID0gbGV4ZXIuc2F2ZSgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnQrKztcbiAgICB9XG4gICAgaWYgKGNvbHVtbikge1xuICAgICAgdGhpcy5sZXhlclN0YXRlID0gbGV4ZXIuc2F2ZSgpXG4gICAgfVxuXG4gICAgLy8gSW5jcmVtZW50YWxseSBrZWVwIHRyYWNrIG9mIHJlc3VsdHNcbiAgICB0aGlzLnJlc3VsdHMgPSB0aGlzLmZpbmlzaCgpO1xuXG4gICAgLy8gQWxsb3cgY2hhaW5pbmcsIGZvciB3aGF0ZXZlciBpdCdzIHdvcnRoXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29sdW1uID0gdGhpcy50YWJsZVt0aGlzLmN1cnJlbnRdO1xuICAgIGNvbHVtbi5sZXhlclN0YXRlID0gdGhpcy5sZXhlclN0YXRlO1xuICAgIHJldHVybiBjb2x1bW47XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbihjb2x1bW4pIHtcbiAgICB2YXIgaW5kZXggPSBjb2x1bW4uaW5kZXg7XG4gICAgdGhpcy5jdXJyZW50ID0gaW5kZXg7XG4gICAgdGhpcy50YWJsZVtpbmRleF0gPSBjb2x1bW47XG4gICAgdGhpcy50YWJsZS5zcGxpY2UoaW5kZXggKyAxKTtcbiAgICB0aGlzLmxleGVyU3RhdGUgPSBjb2x1bW4ubGV4ZXJTdGF0ZTtcblxuICAgIC8vIEluY3JlbWVudGFsbHkga2VlcCB0cmFjayBvZiByZXN1bHRzXG4gICAgdGhpcy5yZXN1bHRzID0gdGhpcy5maW5pc2goKTtcbn07XG5cbi8vIG5iLiBkZXByZWNhdGVkOiB1c2Ugc2F2ZS9yZXN0b3JlIGluc3RlYWQhXG5QYXJzZXIucHJvdG90eXBlLnJld2luZCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMua2VlcEhpc3RvcnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXQgb3B0aW9uIGBrZWVwSGlzdG9yeWAgdG8gZW5hYmxlIHJld2luZGluZycpXG4gICAgfVxuICAgIC8vIG5iLiByZWNhbGwgY29sdW1uICh0YWJsZSkgaW5kaWNpZXMgZmFsbCBiZXR3ZWVuIHRva2VuIGluZGljaWVzLlxuICAgIC8vICAgICAgICBjb2wgMCAgIC0tICAgdG9rZW4gMCAgIC0tICAgY29sIDFcbiAgICB0aGlzLnJlc3RvcmUodGhpcy50YWJsZVtpbmRleF0pO1xufTtcblxuUGFyc2VyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAvLyBSZXR1cm4gdGhlIHBvc3NpYmxlIHBhcnNpbmdzXG4gICAgdmFyIGNvbnNpZGVyYXRpb25zID0gW107XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5ncmFtbWFyLnN0YXJ0O1xuICAgIHZhciBjb2x1bW4gPSB0aGlzLnRhYmxlW3RoaXMudGFibGUubGVuZ3RoIC0gMV1cbiAgICBjb2x1bW4uc3RhdGVzLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHQucnVsZS5uYW1lID09PSBzdGFydFxuICAgICAgICAgICAgICAgICYmIHQuZG90ID09PSB0LnJ1bGUuc3ltYm9scy5sZW5ndGhcbiAgICAgICAgICAgICAgICAmJiB0LnJlZmVyZW5jZSA9PT0gMFxuICAgICAgICAgICAgICAgICYmIHQuZGF0YSAhPT0gUGFyc2VyLmZhaWwpIHtcbiAgICAgICAgICAgIGNvbnNpZGVyYXRpb25zLnB1c2godCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29uc2lkZXJhdGlvbnMubWFwKGZ1bmN0aW9uKGMpIHtyZXR1cm4gYy5kYXRhOyB9KTtcbn07XG5cbnJldHVybiB7XG4gICAgUGFyc2VyOiBQYXJzZXIsXG4gICAgR3JhbW1hcjogR3JhbW1hcixcbiAgICBSdWxlOiBSdWxlLFxufTtcblxufSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbmVhcmxleS9saWIvbmVhcmxleS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZGVjb2RlU3BlY3RyYWxDbGFzcyB9IGZyb20gJy4uL3V0aWxzJ1xyXG5pbXBvcnQgQWJzdHJhY3RSZWFkZXIgZnJvbSAnLi9BYnN0cmFjdFJlYWRlcidcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnXHJcbmltcG9ydCBNRVRBIGZyb20gJy4uL3V0aWxzL0RhdE1ldGEnXHJcblxyXG5jbGFzcyBEQVRSZWFkZXIgaW1wbGVtZW50cyBBYnN0cmFjdFJlYWRlciB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcGFyc2UgKGRhdGE6IEJ1ZmZlcik6IGFueVtdIHtcclxuICAgIGxldCBzdGFyc0luRmlsZSA9IDBcclxuXHJcbiAgICBjb25zdCBoZWFkZXIgPSBkYXRhLnRvU3RyaW5nKCd1dGYtOCcsIDAsIE1FVEEuRklMRV9IRUFERVIubGVuZ3RoKVxyXG4gICAgY29uc3QgdmVyc2lvbiA9IGRhdGEucmVhZFVJbnQxNkxFKE1FVEEuRklMRV9IRUFERVIubGVuZ3RoKVxyXG5cclxuICAgIGlmIChoZWFkZXIgIT09IE1FVEEuRklMRV9IRUFERVIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBmaWxlIHNpZ25hdHVyZScpXHJcbiAgICB9IGVsc2UgaWYgKHZlcnNpb24gIT09IE1FVEEuVkVSU0lPTikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGZpbGUgdmVyc2lvbicpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFyc0luRmlsZSA9IGRhdGEucmVhZFVJbnQzMkxFKE1FVEEuRklMRV9IRUFERVIubGVuZ3RoICsgMilcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gW11cclxuICAgIGxldCBzdGFyTnVtYmVyID0gMFxyXG4gICAgd2hpbGUgKHN0YXJOdW1iZXIgPCBzdGFyc0luRmlsZSkge1xyXG4gICAgICBsZXQgb2Zmc2V0ID0gTUVUQS5IRUFERVJfT0ZGU0VUICsgc3Rhck51bWJlciAqIDIwXHJcbiAgICAgIGxldCBjYXRhbG9nTnVtYmVyID0gZGF0YS5yZWFkVUludDMyTEUob2Zmc2V0KVxyXG4gICAgICBsZXQgRGlzdGFuY2UgPSBkYXRhLnJlYWRGbG9hdExFKG9mZnNldCArIDQpXHJcbiAgICAgIGxldCBSQSA9IGRhdGEucmVhZEZsb2F0TEUob2Zmc2V0ICsgOClcclxuICAgICAgbGV0IERlYyA9IGRhdGEucmVhZEZsb2F0TEUob2Zmc2V0ICsgMTIpXHJcbiAgICAgIGxldCBBYnNNYWcgPSBkYXRhLnJlYWRJbnQxNkxFKG9mZnNldCArIDE2KVxyXG4gICAgICBsZXQgU3BlY3RyYWxUeXBlID0gZGVjb2RlU3BlY3RyYWxDbGFzcyhkYXRhLnJlYWRVSW50MTZMRShvZmZzZXQgKyAxOCkpXHJcblxyXG4gICAgICByZXN1bHQucHVzaCh7XHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgdHlwZTogJ1N0YXInLFxyXG4gICAgICAgICAgbW9kZTogJ01vZGlmeVN0YXInLFxyXG4gICAgICAgICAgbnVtYmVyOiBjYXRhbG9nTnVtYmVyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgICBEaXN0YW5jZSxcclxuICAgICAgICAgIFJBLFxyXG4gICAgICAgICAgRGVjLFxyXG4gICAgICAgICAgQWJzTWFnLFxyXG4gICAgICAgICAgU3BlY3RyYWxUeXBlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgKytzdGFyTnVtYmVyXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgfVxyXG5cclxuICByZWFkIChidWZmZXI6IEJ1ZmZlcik6IFByb21pc2U8YW55W10+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoREFUUmVhZGVyLnBhcnNlKGJ1ZmZlcikpXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgREFUUmVhZGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZWFkZXIvREFUUmVhZGVyLnRzIiwiZW51bSBTdGFyVHlwZSB7XHJcbiAgTm9ybWFsU3RhcixcclxuICBXaGl0ZUR3YXJmLFxyXG4gIE5ldXRyb25TdGFyLFxyXG4gIEJsYWNrSG9sZSxcclxufVxyXG5cclxuZW51bSBTcGVjdHJhbENsYXNzIHtcclxuICBTcGVjdHJhbF9PLFxyXG4gIFNwZWN0cmFsX0IsXHJcbiAgU3BlY3RyYWxfQSxcclxuICBTcGVjdHJhbF9GLFxyXG4gIFNwZWN0cmFsX0csXHJcbiAgU3BlY3RyYWxfSyxcclxuICBTcGVjdHJhbF9NLFxyXG4gIFNwZWN0cmFsX1IsIC8vIHN1cGVyY2VkZWQgYnkgY2xhc3MgQ1xyXG4gIFNwZWN0cmFsX1MsXHJcbiAgU3BlY3RyYWxfTiwgLy8gc3VwZXJjZWRlZCBieSBjbGFzcyBDXHJcbiAgU3BlY3RyYWxfV0MsXHJcbiAgU3BlY3RyYWxfV04sXHJcbiAgU3BlY3RyYWxfVW5rbm93bixcclxuICBTcGVjdHJhbF9MLFxyXG4gIFNwZWN0cmFsX1QsXHJcbiAgU3BlY3RyYWxfQyxcclxuICBTcGVjdHJhbF9EQSwgLy8gd2hpdGUgZHdhcmYgQSAoQmFsbWVyIGxpbmVzLCBubyBIZSBJIG9yIG1ldGFscylcclxuICBTcGVjdHJhbF9EQiwgLy8gd2hpdGUgZHdhcmYgQiAoSGUgSSBsaW5lcywgbm8gSCBvciBtZXRhbHMpXHJcbiAgU3BlY3RyYWxfREMsIC8vIHdoaXRlIGR3YXJmIEMsIGNvbnRpbnVvdXMgc3BlY3RydW1cclxuICBTcGVjdHJhbF9ETywgLy8gd2hpdGUgZHdhcmYgTywgSGUgSUkgc3Ryb25nLCBIZSBJIG9yIEhcclxuICBTcGVjdHJhbF9EUSwgLy8gd2hpdGUgZHdhcmYgUSwgY2FyYm9uIGZlYXR1cmVzXHJcbiAgU3BlY3RyYWxfRFosIC8vIHdoaXRlIGR3YXJmIFosIG1ldGFsIGxpbmVzIG9ubHksIG5vIEggb3IgSGVcclxuICBTcGVjdHJhbF9ELCAvLyBnZW5lcmljIHdoaXRlIGR3YXJmLCBubyBhZGRpdGlvbmFsIGRhdGFcclxuICBTcGVjdHJhbF9EWCxcclxuICBTcGVjdHJhbF9Db3VudFxyXG59XHJcblxyXG5lbnVtIFNwZWN0cmFsQ2xhc3NTdHIge1xyXG4gIE8sXHJcbiAgQixcclxuICBBLFxyXG4gIEYsXHJcbiAgRyxcclxuICBLLFxyXG4gIE0sXHJcbiAgUiwgLy8gc3VwZXJjZWRlZCBieSBjbGFzcyBDXHJcbiAgUyxcclxuICBOLCAvLyBzdXBlcmNlZGVkIGJ5IGNsYXNzIENcclxuICBXQyxcclxuICBXTixcclxuICAnJyxcclxuICBMLFxyXG4gIFQsXHJcbiAgQyxcclxuICBEQSwgLy8gd2hpdGUgZHdhcmYgQSAoQmFsbWVyIGxpbmVzLCBubyBIZSBJIG9yIG1ldGFscylcclxuICBEQiwgLy8gd2hpdGUgZHdhcmYgQiAoSGUgSSBsaW5lcywgbm8gSCBvciBtZXRhbHMpXHJcbiAgREMsIC8vIHdoaXRlIGR3YXJmIEMsIGNvbnRpbnVvdXMgc3BlY3RydW1cclxuICBETywgLy8gd2hpdGUgZHdhcmYgTywgSGUgSUkgc3Ryb25nLCBIZSBJIG9yIEhcclxuICBEUSwgLy8gd2hpdGUgZHdhcmYgUSwgY2FyYm9uIGZlYXR1cmVzXHJcbiAgRFosIC8vIHdoaXRlIGR3YXJmIFosIG1ldGFsIGxpbmVzIG9ubHksIG5vIEggb3IgSGVcclxuICBELCAvLyBnZW5lcmljIHdoaXRlIGR3YXJmLCBubyBhZGRpdGlvbmFsIGRhdGFcclxuICBEWCxcclxuICBDb3VudFxyXG59XHJcblxyXG5lbnVtIEx1bWlub3NpdHlDbGFzcyB7XHJcbiAgTHVtX0lhMCxcclxuICBMdW1fSWEsXHJcbiAgTHVtX0liLFxyXG4gIEx1bV9JSSxcclxuICBMdW1fSUlJLFxyXG4gIEx1bV9JVixcclxuICBMdW1fVixcclxuICBMdW1fVkksXHJcbiAgTHVtX1Vua25vd24sXHJcbiAgTHVtX0NvdW50XHJcbn1cclxuXHJcbmVudW0gTHVtaW5vc2l0eUNsYXNzU3RyIHtcclxuICBJYTAsXHJcbiAgSWEsXHJcbiAgSWIsXHJcbiAgSUksXHJcbiAgSUlJLFxyXG4gIElWLFxyXG4gIFYsXHJcbiAgVkksXHJcbiAgJycsXHJcbiAgQ291bnRcclxufVxyXG5cclxuY29uc3QgTHVtU3RyQ2xhc3NlcyA9IFtcclxuICAnSS1hMCcsXHJcbiAgJ0ktYScsXHJcbiAgJ0ktYicsXHJcbiAgJ0lJJyxcclxuICAnSUlJJyxcclxuICAnSVYnLFxyXG4gICdWJyxcclxuICAnVkknXHJcbl1cclxuY29uc3QgU3ViQ2xhc3NVbmtub3duID0gMTBcclxuY29uc3QgV0RDbGFzc0NvdW50ID0gOFxyXG5cclxuY29uc3QgdW5wYWNrU3RlbGxhckNsYXNzID0gKHN0OiBudW1iZXIpOiBhbnkgPT4ge1xyXG4gIGxldCBzdGFyVHlwZSA9IHN0ID4+IDEyXHJcbiAgbGV0IHNwZWNDbGFzc1xyXG4gIGxldCBzdWJDbGFzc1xyXG4gIGxldCBsdW1DbGFzc1xyXG5cclxuICBzd2l0Y2ggKHN0YXJUeXBlKSB7XHJcbiAgICBjYXNlIFN0YXJUeXBlLk5vcm1hbFN0YXIgOlxyXG4gICAgICBzcGVjQ2xhc3MgPSBzdCA+PiA4ICYgMHhmXHJcbiAgICAgIHN1YkNsYXNzID0gc3QgPj4gNCAmIDB4ZlxyXG4gICAgICBsdW1DbGFzcyA9IHN0ICYgMHhmXHJcbiAgICAgIGJyZWFrXHJcbiAgICBjYXNlIFN0YXJUeXBlLldoaXRlRHdhcmY6XHJcbiAgICAgIGlmICgoc3QgPj4gOCAmIDB4ZikgPj0gV0RDbGFzc0NvdW50KSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgfVxyXG4gICAgICBzcGVjQ2xhc3MgPSAoc3QgPj4gOCAmIDB4ZikgKyBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0RBXHJcbiAgICAgIHN1YkNsYXNzID0gc3QgPj4gNCAmIDB4ZlxyXG4gICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fVW5rbm93blxyXG4gICAgICBicmVha1xyXG4gICAgY2FzZSBTdGFyVHlwZS5OZXV0cm9uU3RhcjpcclxuICAgIGNhc2UgU3RhclR5cGUuQmxhY2tIb2xlOlxyXG4gICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX1Vua25vd25cclxuICAgICAgc3ViQ2xhc3MgPSBTdWJDbGFzc1Vua25vd25cclxuICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX1Vua25vd25cclxuICAgICAgYnJlYWtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3RhclR5cGUsXHJcbiAgICBzcGVjQ2xhc3MsXHJcbiAgICBzdWJDbGFzcyxcclxuICAgIGx1bUNsYXNzXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBkZWNvZGVTcGVjdHJhbENsYXNzID0gKHN0OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gIGxldCBzdGVsbGFyQ2xhc3MgPSB1bnBhY2tTdGVsbGFyQ2xhc3Moc3QpXHJcbiAgbGV0IHNwZWNDbGFzc1xyXG4gIGxldCBzdWJDbGFzc1xyXG4gIGxldCBsdW1DbGFzc1xyXG5cclxuICBpZiAoc3RlbGxhckNsYXNzLnN0YXJUeXBlID09PSBTdGFyVHlwZS5XaGl0ZUR3YXJmKSB7XHJcbiAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzU3RyW3N0ZWxsYXJDbGFzcy5zcGVjQ2xhc3NdXHJcbiAgICBzdWJDbGFzcyA9ICcwMTIzNDU2Nzg5J1tzdGVsbGFyQ2xhc3Muc3ViQ2xhc3NdIHx8ICcnXHJcbiAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzc1N0cltzdGVsbGFyQ2xhc3MubHVtQ2xhc3NdXHJcbiAgfSBlbHNlIGlmIChzdGVsbGFyQ2xhc3Muc3RhclR5cGUgPT09IFN0YXJUeXBlLk5ldXRyb25TdGFyKSB7XHJcbiAgICBzcGVjQ2xhc3MgPSAnUSdcclxuICB9IGVsc2UgaWYgKHN0ZWxsYXJDbGFzcy5zdGFyVHlwZSA9PT0gU3RhclR5cGUuQmxhY2tIb2xlKSB7XHJcbiAgICBzcGVjQ2xhc3MgPSAnWCdcclxuICAgIHN1YkNsYXNzID0gJydcclxuICAgIGx1bUNsYXNzID0gJydcclxuICB9IGVsc2UgaWYgKHN0ZWxsYXJDbGFzcy5zdGFyVHlwZSA9PT0gU3RhclR5cGUuTm9ybWFsU3Rhcikge1xyXG4gICAgc3BlY0NsYXNzID0gJ09CQUZHS01SU05XVz9MVEMnW3N0ZWxsYXJDbGFzcy5zcGVjQ2xhc3NdIHx8ICcnXHJcbiAgICBzdWJDbGFzcyA9ICcwMTIzNDU2Nzg5J1tzdGVsbGFyQ2xhc3Muc3ViQ2xhc3NdIHx8ICcnXHJcbiAgICBsdW1DbGFzcyA9IEx1bVN0ckNsYXNzZXNbc3RlbGxhckNsYXNzLmx1bUNsYXNzXSB8fCAnJ1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzcGVjQ2xhc3MgPSAnPydcclxuICB9XHJcblxyXG4gIHJldHVybiBgJHtzcGVjQ2xhc3N9JHtzdWJDbGFzc30ke2x1bUNsYXNzfWBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVjb2RlU3BlY3RyYWxDbGFzc1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvZGVjb2RlU3BlY3RyYWxDbGFzcy50cyIsImVudW0gVW5rbm93biB7XHJcbiAgU3ViY2xhc3NfVW5rbm93biA9IDEwXHJcbn1cclxuXHJcbmVudW0gUGFyc2VTdGF0ZSB7XHJcbiAgQmVnaW5TdGF0ZSxcclxuICBFbmRTdGF0ZSxcclxuICBOb3JtYWxTdGFyU3RhdGUsXHJcbiAgV29sZlJheWV0VHlwZVN0YXRlLFxyXG4gIE5vcm1hbFN0YXJDbGFzc1N0YXRlLFxyXG4gIE5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlLFxyXG4gIE5vcm1hbFN0YXJTdWJjbGFzc0RlY2ltYWxTdGF0ZSxcclxuICBOb3JtYWxTdGFyU3ViY2xhc3NGaW5hbFN0YXRlLFxyXG4gIEx1bUNsYXNzQmVnaW5TdGF0ZSxcclxuICBMdW1DbGFzc0lTdGF0ZSxcclxuICBMdW1DbGFzc0lJU3RhdGUsXHJcbiAgTHVtQ2xhc3NWU3RhdGUsXHJcbiAgTHVtQ2xhc3NJZGFzaFN0YXRlLFxyXG4gIEx1bUNsYXNzSWFTdGF0ZSxcclxuICBXRFR5cGVTdGF0ZSxcclxuICBXREV4dGVuZGVkVHlwZVN0YXRlLFxyXG4gIFdEU3ViY2xhc3NTdGF0ZSxcclxuICBTdWJkd2FyZlByZWZpeFN0YXRlLFxyXG59XHJcblxyXG5lbnVtIFN0YXJUeXBlIHtcclxuICBOb3JtYWxTdGFyLFxyXG4gIFdoaXRlRHdhcmYsXHJcbiAgTmV1dHJvblN0YXIsXHJcbiAgQmxhY2tIb2xlLFxyXG59XHJcblxyXG5lbnVtIFNwZWN0cmFsQ2xhc3Mge1xyXG4gIFNwZWN0cmFsX08sXHJcbiAgU3BlY3RyYWxfQixcclxuICBTcGVjdHJhbF9BLFxyXG4gIFNwZWN0cmFsX0YsXHJcbiAgU3BlY3RyYWxfRyxcclxuICBTcGVjdHJhbF9LLFxyXG4gIFNwZWN0cmFsX00sXHJcbiAgU3BlY3RyYWxfUixcclxuICBTcGVjdHJhbF9TLFxyXG4gIFNwZWN0cmFsX04sXHJcbiAgU3BlY3RyYWxfV0MsXHJcbiAgU3BlY3RyYWxfV04sXHJcbiAgU3BlY3RyYWxfVW5rbm93bixcclxuICBTcGVjdHJhbF9MLFxyXG4gIFNwZWN0cmFsX1QsXHJcbiAgU3BlY3RyYWxfQyxcclxuICBTcGVjdHJhbF9EQSxcclxuICBTcGVjdHJhbF9EQixcclxuICBTcGVjdHJhbF9EQyxcclxuICBTcGVjdHJhbF9ETyxcclxuICBTcGVjdHJhbF9EUSxcclxuICBTcGVjdHJhbF9EWixcclxuICBTcGVjdHJhbF9ELFxyXG4gIFNwZWN0cmFsX0RYLFxyXG4gIFNwZWN0cmFsX0NvdW50LFxyXG59XHJcblxyXG5lbnVtIEx1bWlub3NpdHlDbGFzcyB7XHJcbiAgTHVtX0lhMCxcclxuICBMdW1fSWEsXHJcbiAgTHVtX0liLFxyXG4gIEx1bV9JSSxcclxuICBMdW1fSUlJLFxyXG4gIEx1bV9JVixcclxuICBMdW1fVixcclxuICBMdW1fVkksXHJcbiAgTHVtX1Vua25vd24sXHJcbiAgTHVtX0NvdW50XHJcbn1cclxuXHJcbmNvbnN0IEx1bVN0ckNsYXNzZXMgPSBbXHJcbiAgJ0ktYTAnLFxyXG4gICdJLWEnLFxyXG4gICdJLWInLFxyXG4gICdJSScsXHJcbiAgJ0lJSScsXHJcbiAgJ0lWJyxcclxuICAnVicsXHJcbiAgJ1ZJJ1xyXG5dXHJcblxyXG5jb25zdCBTdWJDbGFzc1Vua25vd24gPSAxMFxyXG5jb25zdCBXRENsYXNzQ291bnQgPSA4XHJcblxyXG5mdW5jdGlvbiBlbmNvZGVTcGVjdHJhbENsYXNzIChzdDogc3RyaW5nKTogbnVtYmVyIHtcclxuICBsZXQgaSA9IDBcclxuICBsZXQgc3RhdGUgPSBQYXJzZVN0YXRlLkJlZ2luU3RhdGVcclxuICBsZXQgc3RhclR5cGUgPSBTdGFyVHlwZS5Ob3JtYWxTdGFyXHJcbiAgbGV0IHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfVW5rbm93blxyXG4gIGxldCBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fVW5rbm93blxyXG4gIGxldCBzdWJDbGFzcyA9IFVua25vd24uU3ViY2xhc3NfVW5rbm93blxyXG5cclxuICB3aGlsZSAoc3RhdGUgIT09IFBhcnNlU3RhdGUuRW5kU3RhdGUpIHtcclxuICAgIGxldCBjID0gaSA8IHN0Lmxlbmd0aFxyXG4gICAgICA/IHN0LmNoYXJBdChpKVxyXG4gICAgICA6IG51bGxcclxuXHJcbiAgICBzd2l0Y2ggKHN0YXRlKSB7XHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5CZWdpblN0YXRlOlxyXG4gICAgICAgIHN3aXRjaCAoYykge1xyXG4gICAgICAgICAgY2FzZSAnUSc6XHJcbiAgICAgICAgICAgIHN0YXJUeXBlID0gU3RhclR5cGUuTmV1dHJvblN0YXJcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnWCc6XHJcbiAgICAgICAgICAgIHN0YXJUeXBlID0gU3RhclR5cGUuQmxhY2tIb2xlXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ0QnOlxyXG4gICAgICAgICAgICBzdGFyVHlwZSA9IFN0YXJUeXBlLldoaXRlRHdhcmZcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9EXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5XRFR5cGVTdGF0ZVxyXG4gICAgICAgICAgICArK2lcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdzJzpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLlN1YmR3YXJmUHJlZml4U3RhdGVcclxuICAgICAgICAgICAgKytpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnPyc6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyQ2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLldvbGZSYXlldFR5cGVTdGF0ZTpcclxuICAgICAgICBzd2l0Y2ggKGMpIHtcclxuICAgICAgICAgIGNhc2UgJ0MnOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX1dDXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICArK2lcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdOJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9XTlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgKytpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9XQ1xyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5TdWJkd2FyZlByZWZpeFN0YXRlOlxyXG4gICAgICAgIGlmIChjID09PSAnZCcpIHtcclxuICAgICAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9WSVxyXG4gICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJDbGFzc1N0YXRlXHJcbiAgICAgICAgICArK2lcclxuICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJDbGFzc1N0YXRlOlxyXG4gICAgICAgIHN3aXRjaCAoYykge1xyXG4gICAgICAgICAgY2FzZSAnVyc6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Xb2xmUmF5ZXRUeXBlU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdPJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9PXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ0InOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0JcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnQSc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfQVxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdGJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9GXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ0cnOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0dcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnSyc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfS1xyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdNJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9NXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ1InOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX1JcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnUyc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfU1xyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdOJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9OXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ0wnOlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0xcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnVCc6XHJcbiAgICAgICAgICAgIHNwZWNDbGFzcyA9IFNwZWN0cmFsQ2xhc3MuU3BlY3RyYWxfVFxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdDJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9DXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICArK2lcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc1N0YXRlOlxyXG4gICAgICAgIGlmIChjICE9PSBudWxsICYmIGMubWF0Y2goL1swLTldLykpIHtcclxuICAgICAgICAgIHN1YkNsYXNzID0gcGFyc2VJbnQoYylcclxuICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NEZWNpbWFsU3RhdGVcclxuICAgICAgICAgICsraVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTHVtQ2xhc3NCZWdpblN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuTm9ybWFsU3RhclN1YmNsYXNzRGVjaW1hbFN0YXRlOlxyXG4gICAgICAgIGlmIChjID09PSAnLicpIHtcclxuICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5Ob3JtYWxTdGFyU3ViY2xhc3NGaW5hbFN0YXRlXHJcbiAgICAgICAgICArK2lcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkx1bUNsYXNzQmVnaW5TdGF0ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLk5vcm1hbFN0YXJTdWJjbGFzc0ZpbmFsU3RhdGU6XHJcbiAgICAgICAgaWYgKGMubWF0Y2goL1swLTldLykpIHtcclxuICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5MdW1DbGFzc0JlZ2luU3RhdGVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgICAgICsraVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuTHVtQ2xhc3NCZWdpblN0YXRlOlxyXG4gICAgICAgIHN3aXRjaCAoYykge1xyXG4gICAgICAgICAgY2FzZSAnSSc6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5MdW1DbGFzc0lTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ1YnOlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTHVtQ2xhc3NWU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgKytpXHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5MdW1DbGFzc0lTdGF0ZTpcclxuICAgICAgICBzd2l0Y2ggKGMpIHtcclxuICAgICAgICAgIGNhc2UgJ0knOlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTHVtQ2xhc3NJSVN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnVic6XHJcbiAgICAgICAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9JVlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdhJzpcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkx1bUNsYXNzSWFTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ2InOlxyXG4gICAgICAgICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fSWJcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgY2FzZSAnLSc6XHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5MdW1DbGFzc0lkYXNoU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fSWJcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGkrK1xyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuTHVtQ2xhc3NJSVN0YXRlOlxyXG4gICAgICAgIHN3aXRjaCAoYykge1xyXG4gICAgICAgICAgY2FzZSAnSSc6XHJcbiAgICAgICAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9JSUlcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX0lJXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLkx1bUNsYXNzSWRhc2hTdGF0ZTpcclxuICAgICAgICBzd2l0Y2ggKGMpIHtcclxuICAgICAgICAgIGNhc2UgJ2EnOlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuTHVtQ2xhc3NJYVN0YXRlXHJcbiAgICAgICAgICAgICsraVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGNhc2UgJ2InOlxyXG4gICAgICAgICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fSWJcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX0liXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLkx1bUNsYXNzSWFTdGF0ZTpcclxuICAgICAgICBzd2l0Y2ggKGMpIHtcclxuICAgICAgICAgIGNhc2UgJzAnOlxyXG4gICAgICAgICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fSWEwXHJcbiAgICAgICAgICAgIHN0YXRlID0gUGFyc2VTdGF0ZS5FbmRTdGF0ZVxyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGx1bUNsYXNzID0gTHVtaW5vc2l0eUNsYXNzLkx1bV9JYVxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgUGFyc2VTdGF0ZS5MdW1DbGFzc1ZTdGF0ZTpcclxuICAgICAgICBzd2l0Y2ggKGMpIHtcclxuICAgICAgICAgIGNhc2UgJ0knOlxyXG4gICAgICAgICAgICBsdW1DbGFzcyA9IEx1bWlub3NpdHlDbGFzcy5MdW1fVklcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgbHVtQ2xhc3MgPSBMdW1pbm9zaXR5Q2xhc3MuTHVtX1ZcclxuICAgICAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLkVuZFN0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuV0RUeXBlU3RhdGU6XHJcbiAgICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgICBjYXNlICdBJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9EQVxyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdCJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9EQlxyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdDJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9EQ1xyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdPJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9ET1xyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdRJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9EUVxyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdYJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9EWFxyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBjYXNlICdaJzpcclxuICAgICAgICAgICAgc3BlY0NsYXNzID0gU3BlY3RyYWxDbGFzcy5TcGVjdHJhbF9EWlxyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBzcGVjQ2xhc3MgPSBTcGVjdHJhbENsYXNzLlNwZWN0cmFsX0RcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGUgPSBQYXJzZVN0YXRlLldERXh0ZW5kZWRUeXBlU3RhdGVcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSBQYXJzZVN0YXRlLldERXh0ZW5kZWRUeXBlU3RhdGU6XHJcbiAgICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgICBjYXNlICdBJzpcclxuICAgICAgICAgIGNhc2UgJ0InOlxyXG4gICAgICAgICAgY2FzZSAnQyc6XHJcbiAgICAgICAgICBjYXNlICdPJzpcclxuICAgICAgICAgIGNhc2UgJ1EnOlxyXG4gICAgICAgICAgY2FzZSAnWic6XHJcbiAgICAgICAgICBjYXNlICdYJzpcclxuICAgICAgICAgIGNhc2UgJ1YnOlxyXG4gICAgICAgICAgY2FzZSAnUCc6XHJcbiAgICAgICAgICBjYXNlICdIJzpcclxuICAgICAgICAgIGNhc2UgJ0UnOlxyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuV0RTdWJjbGFzc1N0YXRlXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIFBhcnNlU3RhdGUuV0RTdWJjbGFzc1N0YXRlOlxyXG4gICAgICAgIGlmIChjICE9PSBudWxsICYmIGMubWF0Y2goL1swLTldLykpIHtcclxuICAgICAgICAgIHN1YkNsYXNzID0gcGFyc2VJbnQoYylcclxuICAgICAgICAgIGkrK1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJDbGFzcyA9IFVua25vd24uU3ViY2xhc3NfVW5rbm93blxyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBzdGF0ZSA9IFBhcnNlU3RhdGUuRW5kU3RhdGVcclxuICAgICAgICBicmVha1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGV0IGJ1ZmZlciA9IDBcclxuXHJcbiAgYnVmZmVyICs9IChzdGFyVHlwZSAmIDB4ZikgPDwgMTJcclxuICBidWZmZXIgKz0gKHNwZWNDbGFzcyAmIDB4ZikgPDwgOFxyXG4gIGJ1ZmZlciArPSAoc3ViQ2xhc3MgJiAweGYpIDw8IDRcclxuICBidWZmZXIgKz0gKGx1bUNsYXNzICYgMHhmKVxyXG5cclxuICByZXR1cm4gYnVmZmVyXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGVuY29kZVNwZWN0cmFsQ2xhc3NcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2VuY29kZVNwZWN0cmFsQ2xhc3MudHMiLCJpbXBvcnQgQWJzdHJhY3RXcml0ZXIgZnJvbSAnLi9BYnN0cmFjdFdyaXRlcidcclxuaW1wb3J0IENvbmZpZ1dyaXRlciBmcm9tICcuL0NvbmZpZ1dyaXRlcidcclxuaW1wb3J0IFNUQ1dyaXRlciBmcm9tICcuL1NUQ1dyaXRlcidcclxuaW1wb3J0IFNTQ1dyaXRlciBmcm9tICcuL1NTQ1dyaXRlcidcclxuaW1wb3J0IERTQ1dyaXRlciBmcm9tICcuL0RTQ1dyaXRlcidcclxuaW1wb3J0IENGR1dyaXRlciBmcm9tICcuL0NGR1dyaXRlcidcclxuaW1wb3J0IERBVFdyaXRlciBmcm9tICcuL0RBVFdyaXRlcidcclxuXHJcbmV4cG9ydCB7XHJcbiAgQWJzdHJhY3RXcml0ZXIsXHJcbiAgQ29uZmlnV3JpdGVyLFxyXG4gIFNUQ1dyaXRlcixcclxuICBTU0NXcml0ZXIsXHJcbiAgRFNDV3JpdGVyLFxyXG4gIENGR1dyaXRlcixcclxuICBEQVRXcml0ZXJcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvV3JpdGVyL2luZGV4LnRzIiwiZnVuY3Rpb24gaXNPYmplY3QgKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlXHJcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0FycmF5ICh2YWx1ZTogYW55KTogdmFsdWUgaXMgYW55W10ge1xyXG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc051bWJlciAodmFsdWU6IGFueSk6IHZhbHVlIGlzIG51bWJlciB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJ1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1N0cmluZyAodmFsdWU6IGFueSk6IHZhbHVlIGlzIHN0cmluZyB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VyaWFsaXplciB7XHJcbiAgc3RhdGljIHN0cmluZ2lmeSAodmFsdWU6IGFueSwgaW5kZW50ID0gMCk6IHN0cmluZyB7XHJcbiAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XHJcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybiBTZXJpYWxpemVyLndyaXRlQXJyYXkodmFsdWUsIGluZGVudClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gU2VyaWFsaXplci53cml0ZU9iamVjdCh2YWx1ZSwgaW5kZW50KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6ZXIud3JpdGVOdW1iZXIodmFsdWUpXHJcbiAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6ZXIud3JpdGVTdHJpbmcodmFsdWUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHdyaXRlQXJyYXkgKGFycmF5OiBhbnlbXSwgaW5kZW50OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICdbICcgKyBhcnJheS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIFNlcmlhbGl6ZXIuc3RyaW5naWZ5KGl0ZW0sIGluZGVudCArIDIpXHJcbiAgICB9KS5qb2luKCcgJykgKyAnIF0nXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgd3JpdGVPYmplY3QgKHZhbHVlOiBPYmplY3QsIGluZGVudDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGlmIChPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiAneyB9J1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3Qua2V5cyh2YWx1ZSlcclxuICAgICAgLm1hcChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6ZXIud3JpdGVGaWVsZChrZXksIFNlcmlhbGl6ZXIuc3RyaW5naWZ5KHZhbHVlW2tleV0sIGluZGVudCArIDIpLCBpbmRlbnQgKyAyKVxyXG4gICAgICB9KVxyXG4gICAgICAuam9pbignXFxuJylcclxuXHJcbiAgICByZXR1cm4gJ3tcXG4nICsgZW50cmllcyArICdcXG4nICsgJyAnLnJlcGVhdChpbmRlbnQpICsgJ30nXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgd3JpdGVTdHJpbmcgKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICdcIicgKyB2YWx1ZSArICdcIidcclxuICB9XHJcblxyXG4gIHN0YXRpYyB3cml0ZU51bWJlciAodmFsdWU6IG51bWJlciwgcHJlY2lzaW9uID0gNik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU3RyaW5nKE1hdGguZmxvb3IodmFsdWUgKiAxMCAqKiBwcmVjaXNpb24pIC8gMTAgKiogcHJlY2lzaW9uKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHdyaXRlRmllbGQgKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBpbmRlbnQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gJyAnLnJlcGVhdChpbmRlbnQpICsga2V5ICsgJyAnICsgdmFsdWVcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NlcmlhbGl6ZXIvU2VyaWFsaXplci50cyIsImltcG9ydCBUZXh0V3JpdGVyIGZyb20gJy4vVGV4dFdyaXRlcidcclxuaW1wb3J0IHsgU2VyaWFsaXplciB9IGZyb20gJy4uL1NlcmlhbGl6ZXInXHJcblxyXG5jbGFzcyBTVENXcml0ZXIgZXh0ZW5kcyBUZXh0V3JpdGVyIHtcclxuICB3cml0ZUhlYWRlciAodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBtb2RlID0gKHZhbHVlLm1vZGUgIT09IG51bGwgJiYgdmFsdWUubW9kZVNldCkgPyB2YWx1ZS5tb2RlIDogJydcclxuICAgIGNvbnN0IHR5cGUgPSAodmFsdWUudHlwZSAhPT0gbnVsbCAmJiB2YWx1ZS50eXBlU2V0KSA/IHZhbHVlLnR5cGUgOiAnJ1xyXG4gICAgY29uc3QgSElQID0gdmFsdWUubnVtYmVyICE9PSBudWxsID8gdmFsdWUubnVtYmVyIDogJydcclxuICAgIGNvbnN0IG5hbWVzID0gKHZhbHVlLm5hbWVzICE9PSBudWxsICYmIHZhbHVlLm5hbWVTZXQpID8gU2VyaWFsaXplci53cml0ZVN0cmluZyh2YWx1ZS5uYW1lcy5qb2luKCc6JykpIDogJydcclxuICAgIHJldHVybiBbbW9kZSwgdHlwZSwgSElQLCBuYW1lc10uam9pbignICcpLnRyaW0oKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU1RDV3JpdGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Xcml0ZXIvU1RDV3JpdGVyLnRzIiwiaW1wb3J0IFRleHRXcml0ZXIgZnJvbSAnLi9UZXh0V3JpdGVyJ1xyXG5pbXBvcnQgeyBTZXJpYWxpemVyIH0gZnJvbSAnLi4vU2VyaWFsaXplcidcclxuXHJcbmNsYXNzIFNTQ1dyaXRlciBleHRlbmRzIFRleHRXcml0ZXIge1xyXG4gIHdyaXRlSGVhZGVyICh2YWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG1vZGUgPSAodmFsdWUubW9kZSAhPT0gbnVsbCAmJiB2YWx1ZS5tb2RlU2V0KSA/IHZhbHVlLm1vZGUgOiAnJ1xyXG4gICAgY29uc3QgdHlwZSA9ICh2YWx1ZS50eXBlICE9PSBudWxsICYmIHZhbHVlLnR5cGVTZXQpID8gdmFsdWUudHlwZSA6ICcnXHJcbiAgICBjb25zdCBuYW1lcyA9IHZhbHVlLm5hbWVzICE9PSBudWxsID8gU2VyaWFsaXplci53cml0ZVN0cmluZyh2YWx1ZS5uYW1lcy5qb2luKCc6JykpIDogJydcclxuICAgIGNvbnN0IHBhcmVudE5hbWUgPSB2YWx1ZS5wYXRoVG9QYXJlbnQgIT09IG51bGwgPyBTZXJpYWxpemVyLndyaXRlU3RyaW5nKHZhbHVlLnBhdGhUb1BhcmVudC5qb2luKCcvJykpIDogJydcclxuICAgIHJldHVybiBbbW9kZSwgdHlwZSwgbmFtZXMsIHBhcmVudE5hbWVdLmpvaW4oJyAnKS50cmltKClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNTQ1dyaXRlclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvV3JpdGVyL1NTQ1dyaXRlci50cyIsImltcG9ydCBUZXh0V3JpdGVyIGZyb20gJy4vVGV4dFdyaXRlcidcclxuaW1wb3J0IHsgU2VyaWFsaXplciB9IGZyb20gJy4uL1NlcmlhbGl6ZXInXHJcblxyXG5jbGFzcyBEU0NXcml0ZXIgZXh0ZW5kcyBUZXh0V3JpdGVyIHtcclxuICB3cml0ZUhlYWRlciAodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBjYXRhbG9nTnVtYmVyID0gdmFsdWUubnVtYmVyICE9PSBudWxsID8gU3RyaW5nKHZhbHVlLm51bWJlcikgOiAnJ1xyXG4gICAgY29uc3QgdHlwZSA9IHZhbHVlLnR5cGUgIT09IG51bGwgPyB2YWx1ZS50eXBlIDogJydcclxuICAgIGNvbnN0IG5hbWUgPSB2YWx1ZS5uYW1lcyAhPT0gbnVsbCA/IFNlcmlhbGl6ZXIud3JpdGVTdHJpbmcodmFsdWUubmFtZXMuam9pbignOicpKSA6ICcnXHJcbiAgICByZXR1cm4gW2NhdGFsb2dOdW1iZXIsIHR5cGUsIG5hbWVdLmpvaW4oJyAnKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRFNDV3JpdGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Xcml0ZXIvRFNDV3JpdGVyLnRzIiwiaW1wb3J0IENvbmZpZ1dyaXRlciBmcm9tICcuL0NvbmZpZ1dyaXRlcidcclxuXHJcbmNsYXNzIERTQ1dyaXRlciBleHRlbmRzIENvbmZpZ1dyaXRlciB7XHJcbiAgd3JpdGVIZWFkZXIgKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICdDb25maWd1cmF0aW9uICdcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERTQ1dyaXRlclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvV3JpdGVyL0NGR1dyaXRlci50cyIsImltcG9ydCBCaW5hcnlXcml0ZXIgZnJvbSAnLi9CaW5hcnlXcml0ZXInXHJcbmltcG9ydCBNRVRBIGZyb20gJy4uL3V0aWxzL0RhdE1ldGEnXHJcbmltcG9ydCB7IGVuY29kZVNwZWN0cmFsQ2xhc3MgfSBmcm9tICcuLi91dGlscydcclxuXHJcbmNsYXNzIERBVFdyaXRlciBleHRlbmRzIEJpbmFyeVdyaXRlciB7XHJcbiAgcHJvY2VzcyAoaXRlbXM6IGFueVtdKTogQnVmZmVyIHtcclxuICAgIGNvbnN0IGhlYWRlciA9IE1FVEEuRklMRV9IRUFERVJcclxuICAgIGNvbnN0IHZlcnNpb24gPSBNRVRBLlZFUlNJT04gICAvLyAyIGJ5dGVzXHJcbiAgICBjb25zdCBpdGVtc0NvdW50ID0gaXRlbXMubGVuZ3RoICAgICAvLyA0IGJ5dGVzXHJcbiAgICBjb25zdCBoZWFkZXJPZmZzZXQgPSBoZWFkZXIubGVuZ3RoICsgNlxyXG4gICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jKGhlYWRlck9mZnNldCArIGl0ZW1zQ291bnQgKiAyMClcclxuICAgIGJ1ZmZlci53cml0ZShoZWFkZXIsIDApXHJcbiAgICBidWZmZXIud3JpdGVVSW50MTZMRSh2ZXJzaW9uLCBNRVRBLkZJTEVfSEVBREVSLmxlbmd0aClcclxuICAgIGJ1ZmZlci53cml0ZVVJbnQzMkxFKGl0ZW1zQ291bnQsIE1FVEEuRklMRV9IRUFERVIubGVuZ3RoICsgMilcclxuXHJcbiAgICBsZXQgb2Zmc2V0ID0gaGVhZGVyT2Zmc2V0XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtc0NvdW50OyArK2kpIHtcclxuICAgICAgYnVmZmVyLndyaXRlVUludDMyTEUoaXRlbXNbaV0ubWV0YS5udW1iZXIsIG9mZnNldCwgdHJ1ZSlcclxuICAgICAgYnVmZmVyLndyaXRlRmxvYXRMRShpdGVtc1tpXS5wcm9wZXJ0aWVzLkRpc3RhbmNlLCBvZmZzZXQgKyA0LCB0cnVlKVxyXG4gICAgICBidWZmZXIud3JpdGVGbG9hdExFKGl0ZW1zW2ldLnByb3BlcnRpZXMuUkEsIG9mZnNldCArIDgsIHRydWUpXHJcbiAgICAgIGJ1ZmZlci53cml0ZUZsb2F0TEUoaXRlbXNbaV0ucHJvcGVydGllcy5EZWMsIG9mZnNldCArIDEyLCB0cnVlKVxyXG4gICAgICBidWZmZXIud3JpdGVJbnQxNkxFKGl0ZW1zW2ldLnByb3BlcnRpZXMuQWJzTWFnLCBvZmZzZXQgKyAxNiwgdHJ1ZSlcclxuICAgICAgYnVmZmVyLndyaXRlVUludDE2TEUoZW5jb2RlU3BlY3RyYWxDbGFzcyhpdGVtc1tpXS5wcm9wZXJ0aWVzLlNwZWN0cmFsVHlwZSksIG9mZnNldCArIDE4LCB0cnVlKVxyXG4gICAgICBvZmZzZXQgKz0gMjBcclxuICAgIH1cclxuICAgIHJldHVybiBidWZmZXJcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERBVFdyaXRlclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvV3JpdGVyL0RBVFdyaXRlci50cyIsImltcG9ydCBBYnN0cmFjdFdyaXRlciBmcm9tICcuL0Fic3RyYWN0V3JpdGVyJ1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmluYXJ5V3JpdGVyIGltcGxlbWVudHMgQWJzdHJhY3RXcml0ZXIge1xyXG4gIHdyaXRlICh0eXBlOiBzdHJpbmcsIGl0ZW1zOiBhbnlbXSk6IFByb21pc2U8QnVmZmVyPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJlc29sdmUodGhpcy5wcm9jZXNzKGl0ZW1zKSlcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBhYnN0cmFjdCBwcm9jZXNzIChpdGVtczogYW55W10pOiBCdWZmZXJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmluYXJ5V3JpdGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Xcml0ZXIvQmluYXJ5V3JpdGVyLnRzIiwiaW1wb3J0ICogYXMgQ0ZHR3JhbW1hciBmcm9tICcuL2NmZ3BhcnNlci5uZSdcclxuaW1wb3J0ICogYXMgRFNDR3JhbW1hciBmcm9tICcuL2RzY3BhcnNlci5uZSdcclxuaW1wb3J0ICogYXMgU1NDR3JhbW1hciBmcm9tICcuL3NzY3BhcnNlci5uZSdcclxuaW1wb3J0ICogYXMgU1RDR3JhbW1hciBmcm9tICcuL3N0Y3BhcnNlci5uZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBDRkdHcmFtbWFyLFxyXG4gIERTQ0dyYW1tYXIsXHJcbiAgU1NDR3JhbW1hcixcclxuICBTVENHcmFtbWFyXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dyYW1tYXIvaW5kZXgudHMiLCIvLyBHZW5lcmF0ZWQgYXV0b21hdGljYWxseSBieSBuZWFybGV5XG4vLyBodHRwOi8vZ2l0aHViLmNvbS9IYXJkbWF0aDEyMy9uZWFybGV5XG4oZnVuY3Rpb24gKCkge1xuZnVuY3Rpb24gaWQoeCkge3JldHVybiB4WzBdOyB9XG5cclxuICBjb25zdCBmcm9tUGFpcnMgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgIHJldHVybiBpbnB1dC5yZWR1Y2UoKGFjYywgaSkgPT4ge1xyXG4gICAgICAgIGFjY1tpWzBdXSA9IGlbMV1cclxuICAgICAgICByZXR1cm4gYWNjXHJcbiAgICB9LCB7fSlcclxuICB9XHJcbiAgY29uc3QgbW9vID0gcmVxdWlyZSgnbW9vJylcclxuXHJcbiAgY29uc3QgbnVsbGVyID0geCA9PiBudWxsXHJcblxyXG4gIGNvbnN0IGxleGVyID0gbW9vLmNvbXBpbGUoe1xyXG4gICAgQ09ORklHX0tFWVdPUkQ6IC9Db25maWd1cmF0aW9uXFxiLyxcclxuXHJcbiAgICBBRERfTU9ERTogL0FkZFxcYi8sXHJcbiAgICBNT0RJRllfTU9ERTogL01vZGlmeVxcYi8sXHJcbiAgICBSRVBMQUNFX01PREU6IC9SZXBsYWNlXFxiLyxcclxuXHJcbiAgICBTU0NfQk9EWV9UWVBFOiAvQm9keVxcYi8sXHJcbiAgICBTU0NfUkVGX1BPSU5UX1RZUEU6IC9SZWZlcmVuY2VQb2ludFxcYi8sXHJcbiAgICBTU0NfU1VSRl9QT0lOVF9UWVBFOiAvU3VyZmFjZVBvaW50XFxiLyxcclxuICAgIFNTQ19BTFRfU1VSRkFDRTogL0FsdFN1cmZhY2VcXGIvLFxyXG4gICAgU1NDX0xPQ0FUSU9OOiAvTG9jYXRpb25cXGIvLFxyXG5cclxuICAgIFNUQ19TVEFSX1RZUEU6IC9TdGFyXFxiLyxcclxuICAgIFNUQ19CQVJZQ0VOVEVSX1RZUEU6IC9CYXJ5Y2VudGVyXFxiLyxcclxuXHJcbiAgICBEU0NfR0FMQVhZX1RZUEU6IC9HYWxheHlcXGIvLFxyXG4gICAgRFNDX0dMT0JVTEFSX1RZUEU6IC9HbG9idWxhclxcYi8sXHJcbiAgICBEU0NfTkVCVUxBX1RZUEU6IC9OZWJ1bGFcXGIvLFxyXG4gICAgRFNDX09QRU5fQ0xVU1RFUl9UWVBFOiAvT3BlbkNsdXN0ZXJcXGIvLFxyXG5cclxuICAgIFRSVUU6IC90cnVlLyxcclxuICAgIEZBTFNFOiAvZmFsc2UvLFxyXG5cclxuICAgIE5VTUJFUjogL1srLV0/WzAtOV0rKD86XFwuKD86WzAtOV0rKT8pPyg/OltlRV1bKy1dWzAtOV0rKT8vLFxyXG4gICAgV09SRDogL1tcXHddK1xcYi8sXHJcbiAgICBTVFJJTkc6IC9cIig/OlxcXFxbI1wiXFxcXF18W15cXG5cIlxcXFxdKSpcIi8sXHJcbiAgICBCUkFDRV9MOiAneycsXHJcbiAgICBCUkFDRV9SOiAnfScsXHJcbiAgICBTUVVfQlJBX0w6ICdbJyxcclxuICAgIFNRVV9CUkFfUjogJ10nLFxyXG4gICAgV1M6IHtcclxuICAgICAgbWF0Y2g6IC9bXFxzXSsvLFxyXG4gICAgICBsaW5lQnJlYWtzOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgQ09NTUVOVDoge1xyXG4gICAgICBtYXRjaDogLyMuKi8sXHJcbiAgICAgIGxpbmVCcmVha3M6IGZhbHNlXHJcbiAgICB9XHJcbiAgfSlcclxudmFyIGdyYW1tYXIgPSB7XG4gICAgTGV4ZXI6IGxleGVyLFxuICAgIFBhcnNlclJ1bGVzOiBbXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJCT09MRUFOXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIk5VTUJFUlwiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJTVFJJTkdcIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBcIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiQVJSQVlcIl19LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUCRlYm5mJDFcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVAkZWJuZiQyXCIsIFwiR1JPVVBfUFJPUEVSVFlcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkJSQUNFX0xcIikgPyB7dHlwZTogXCJCUkFDRV9MXCJ9IDogQlJBQ0VfTCksIFwiR1JPVVAkZWJuZiQxXCIsIFwiR1JPVVAkZWJuZiQyXCIsIChsZXhlci5oYXMoXCJCUkFDRV9SXCIpID8ge3R5cGU6IFwiQlJBQ0VfUlwifSA6IEJSQUNFX1IpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGZyb21QYWlycyhkYXRhWzJdKX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUF9QUk9QRVJUWVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJXT1JEXCIpID8ge3R5cGU6IFwiV09SRFwifSA6IFdPUkQpLCBcIldTXCIsIFwiVkFMVUVcIiwgXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBbIGRhdGFbMF0udmFsdWUsIGRhdGFbMl1bMF0gXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiQVJSQVkkZWJuZiQyXCIsIFwiQVJSQVlfRUxFTUVOVFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiU1FVX0JSQV9MXCIpID8ge3R5cGU6IFwiU1FVX0JSQV9MXCJ9IDogU1FVX0JSQV9MKSwgXCJBUlJBWSRlYm5mJDFcIiwgXCJBUlJBWSRlYm5mJDJcIiwgKGxleGVyLmhhcyhcIlNRVV9CUkFfUlwiKSA/IHt0eXBlOiBcIlNRVV9CUkFfUlwifSA6IFNRVV9CUkFfUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVsyXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlRcIiwgXCJzeW1ib2xzXCI6IFtcIlZBTFVFXCIsIFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiQk9PTEVBTlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJUUlVFXCIpID8ge3R5cGU6IFwiVFJVRVwifSA6IFRSVUUpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUgPT09ICd0cnVlJ30sXG4gICAge1wibmFtZVwiOiBcIkJPT0xFQU5cIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiRkFMU0VcIikgPyB7dHlwZTogXCJGQUxTRVwifSA6IEZBTFNFKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlID09PSAndHJ1ZSd9LFxuICAgIHtcIm5hbWVcIjogXCJXT1JEXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIldPUkRcIikgPyB7dHlwZTogXCJXT1JEXCJ9IDogV09SRCldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIk5VTUJFUlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJOVU1CRVJcIikgPyB7dHlwZTogXCJOVU1CRVJcIn0gOiBOVU1CRVIpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IHBhcnNlRmxvYXQoZGF0YVswXS52YWx1ZSl9LFxuICAgIHtcIm5hbWVcIjogXCJTVFJJTkdcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiU1RSSU5HXCIpID8ge3R5cGU6IFwiU1RSSU5HXCJ9IDogU1RSSU5HKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlLnNwbGl0KCdcIicpWzFdfSxcbiAgICB7XCJuYW1lXCI6IFwiV1NcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiV1NcIikgPyB7dHlwZTogXCJXU1wifSA6IFdTKV0sIFwicG9zdHByb2Nlc3NcIjogbnVsbGVyfSxcbiAgICB7XCJuYW1lXCI6IFwiV1NcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiQ09NTUVOVFwiKSA/IHt0eXBlOiBcIkNPTU1FTlRcIn0gOiBDT01NRU5UKV0sIFwicG9zdHByb2Nlc3NcIjogbnVsbGVyfSxcbiAgICB7XCJuYW1lXCI6IFwiQ09NTUVOVFwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJDT01NRU5UXCIpID8ge3R5cGU6IFwiQ09NTUVOVFwifSA6IENPTU1FTlQpLCAobGV4ZXIuaGFzKFwiV1NcIikgPyB7dHlwZTogXCJXU1wifSA6IFdTKV0sIFwicG9zdHByb2Nlc3NcIjogbnVsbGVyfSxcbiAgICB7XCJuYW1lXCI6IFwiQ09ORklHJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJDT05GSUckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJDT05GSUckZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkNPTkZJR1wiLCBcInN5bWJvbHNcIjogW1wiQ09ORklHJGVibmYkMVwiLCBcIkNPTkZJR19LRVlXT1JEXCIsIFwiQ09ORklHX0RFU0NSSVBUSU9OXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChbX3dzLCBrZXl3b3JkLCBwYXJhbXNdKSA9PiBwYXJhbXN9LFxuICAgIHtcIm5hbWVcIjogXCJDT05GSUdfS0VZV09SRCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiQ09ORklHX0tFWVdPUkQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJDT05GSUdfS0VZV09SRCRlYm5mJDFcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQ09ORklHX0tFWVdPUkQkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkNPTkZJR19LRVlXT1JEJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiQ09ORklHX0tFWVdPUkQkZWJuZiQyXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkNPTkZJR19LRVlXT1JEXCIsIFwic3ltYm9sc1wiOiBbXCJDT05GSUdfS0VZV09SRCRlYm5mJDFcIiwgKGxleGVyLmhhcyhcIkNPTkZJR19LRVlXT1JEXCIpID8ge3R5cGU6IFwiQ09ORklHX0tFWVdPUkRcIn0gOiBDT05GSUdfS0VZV09SRCksIFwiQ09ORklHX0tFWVdPUkQkZWJuZiQyXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChba2V5d29yZF0pID0+IGtleXdvcmRbMF19LFxuICAgIHtcIm5hbWVcIjogXCJDT05GSUdfREVTQ1JJUFRJT04kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkNPTkZJR19ERVNDUklQVElPTiRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkNPTkZJR19ERVNDUklQVElPTiRlYm5mJDFcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQ09ORklHX0RFU0NSSVBUSU9OXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUFwiLCBcIkNPTkZJR19ERVNDUklQVElPTiRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogKFtwcm9wZXJ0aWVzXSkgPT4gcHJvcGVydGllc31cbl1cbiAgLCBQYXJzZXJTdGFydDogXCJDT05GSUdcIlxufVxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgbW9kdWxlLmV4cG9ydHMgPSBncmFtbWFyO1xufSBlbHNlIHtcbiAgIHdpbmRvdy5ncmFtbWFyID0gZ3JhbW1hcjtcbn1cbn0pKCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ncmFtbWFyL2NmZ3BhcnNlci5uZVxuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gR2VuZXJhdGVkIGF1dG9tYXRpY2FsbHkgYnkgbmVhcmxleVxuLy8gaHR0cDovL2dpdGh1Yi5jb20vSGFyZG1hdGgxMjMvbmVhcmxleVxuKGZ1bmN0aW9uICgpIHtcbmZ1bmN0aW9uIGlkKHgpIHtyZXR1cm4geFswXTsgfVxuXHJcbiAgbGV0IGdsb2JhbElkID0gMFxyXG5cblxyXG4gIGNvbnN0IGZyb21QYWlycyA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgcmV0dXJuIGlucHV0LnJlZHVjZSgoYWNjLCBpKSA9PiB7XHJcbiAgICAgICAgYWNjW2lbMF1dID0gaVsxXVxyXG4gICAgICAgIHJldHVybiBhY2NcclxuICAgIH0sIHt9KVxyXG4gIH1cclxuICBjb25zdCBtb28gPSByZXF1aXJlKCdtb28nKVxyXG5cclxuICBjb25zdCBudWxsZXIgPSB4ID0+IG51bGxcclxuXHJcbiAgY29uc3QgbGV4ZXIgPSBtb28uY29tcGlsZSh7XHJcbiAgICBDT05GSUdfS0VZV09SRDogL0NvbmZpZ3VyYXRpb25cXGIvLFxyXG5cclxuICAgIEFERF9NT0RFOiAvQWRkXFxiLyxcclxuICAgIE1PRElGWV9NT0RFOiAvTW9kaWZ5XFxiLyxcclxuICAgIFJFUExBQ0VfTU9ERTogL1JlcGxhY2VcXGIvLFxyXG5cclxuICAgIFNTQ19CT0RZX1RZUEU6IC9Cb2R5XFxiLyxcclxuICAgIFNTQ19SRUZfUE9JTlRfVFlQRTogL1JlZmVyZW5jZVBvaW50XFxiLyxcclxuICAgIFNTQ19TVVJGX1BPSU5UX1RZUEU6IC9TdXJmYWNlUG9pbnRcXGIvLFxyXG4gICAgU1NDX0FMVF9TVVJGQUNFOiAvQWx0U3VyZmFjZVxcYi8sXHJcbiAgICBTU0NfTE9DQVRJT046IC9Mb2NhdGlvblxcYi8sXHJcblxyXG4gICAgU1RDX1NUQVJfVFlQRTogL1N0YXJcXGIvLFxyXG4gICAgU1RDX0JBUllDRU5URVJfVFlQRTogL0JhcnljZW50ZXJcXGIvLFxyXG5cclxuICAgIERTQ19HQUxBWFlfVFlQRTogL0dhbGF4eVxcYi8sXHJcbiAgICBEU0NfR0xPQlVMQVJfVFlQRTogL0dsb2J1bGFyXFxiLyxcclxuICAgIERTQ19ORUJVTEFfVFlQRTogL05lYnVsYVxcYi8sXHJcbiAgICBEU0NfT1BFTl9DTFVTVEVSX1RZUEU6IC9PcGVuQ2x1c3RlclxcYi8sXHJcblxyXG4gICAgVFJVRTogL3RydWUvLFxyXG4gICAgRkFMU0U6IC9mYWxzZS8sXHJcblxyXG4gICAgTlVNQkVSOiAvWystXT9bMC05XSsoPzpcXC4oPzpbMC05XSspPyk/KD86W2VFXVsrLV1bMC05XSspPy8sXHJcbiAgICBXT1JEOiAvW1xcd10rXFxiLyxcclxuICAgIFNUUklORzogL1wiKD86XFxcXFsjXCJcXFxcXXxbXlxcblwiXFxcXF0pKlwiLyxcclxuICAgIEJSQUNFX0w6ICd7JyxcclxuICAgIEJSQUNFX1I6ICd9JyxcclxuICAgIFNRVV9CUkFfTDogJ1snLFxyXG4gICAgU1FVX0JSQV9SOiAnXScsXHJcbiAgICBXUzoge1xyXG4gICAgICBtYXRjaDogL1tcXHNdKy8sXHJcbiAgICAgIGxpbmVCcmVha3M6IHRydWVcclxuICAgIH0sXHJcbiAgICBDT01NRU5UOiB7XHJcbiAgICAgIG1hdGNoOiAvIy4qLyxcclxuICAgICAgbGluZUJyZWFrczogZmFsc2VcclxuICAgIH1cclxuICB9KVxyXG52YXIgZ3JhbW1hciA9IHtcbiAgICBMZXhlcjogbGV4ZXIsXG4gICAgUGFyc2VyUnVsZXM6IFtcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIkJPT0xFQU5cIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiTlVNQkVSXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIlNUUklOR1wiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUFwiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJBUlJBWVwiXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUCRlYm5mJDJcIiwgXCJHUk9VUF9QUk9QRVJUWVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiQlJBQ0VfTFwiKSA/IHt0eXBlOiBcIkJSQUNFX0xcIn0gOiBCUkFDRV9MKSwgXCJHUk9VUCRlYm5mJDFcIiwgXCJHUk9VUCRlYm5mJDJcIiwgKGxleGVyLmhhcyhcIkJSQUNFX1JcIikgPyB7dHlwZTogXCJCUkFDRV9SXCJ9IDogQlJBQ0VfUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZnJvbVBhaXJzKGRhdGFbMl0pfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIldPUkRcIikgPyB7dHlwZTogXCJXT1JEXCJ9IDogV09SRCksIFwiV1NcIiwgXCJWQUxVRVwiLCBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IFsgZGF0YVswXS52YWx1ZSwgZGF0YVsyXVswXSBdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJBUlJBWSRlYm5mJDJcIiwgXCJBUlJBWV9FTEVNRU5UXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTUVVfQlJBX0xcIikgPyB7dHlwZTogXCJTUVVfQlJBX0xcIn0gOiBTUVVfQlJBX0wpLCBcIkFSUkFZJGVibmYkMVwiLCBcIkFSUkFZJGVibmYkMlwiLCAobGV4ZXIuaGFzKFwiU1FVX0JSQV9SXCIpID8ge3R5cGU6IFwiU1FVX0JSQV9SXCJ9IDogU1FVX0JSQV9SKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzJdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVFwiLCBcInN5bWJvbHNcIjogW1wiVkFMVUVcIiwgXCJBUlJBWV9FTEVNRU5UJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF1bMF19LFxuICAgIHtcIm5hbWVcIjogXCJCT09MRUFOXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlRSVUVcIikgPyB7dHlwZTogXCJUUlVFXCJ9IDogVFJVRSldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZSA9PT0gJ3RydWUnfSxcbiAgICB7XCJuYW1lXCI6IFwiQk9PTEVBTlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJGQUxTRVwiKSA/IHt0eXBlOiBcIkZBTFNFXCJ9IDogRkFMU0UpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUgPT09ICd0cnVlJ30sXG4gICAge1wibmFtZVwiOiBcIldPUkRcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiV09SRFwiKSA/IHt0eXBlOiBcIldPUkRcIn0gOiBXT1JEKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiTlVNQkVSXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIk5VTUJFUlwiKSA/IHt0eXBlOiBcIk5VTUJFUlwifSA6IE5VTUJFUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gcGFyc2VGbG9hdChkYXRhWzBdLnZhbHVlKX0sXG4gICAge1wibmFtZVwiOiBcIlNUUklOR1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTVFJJTkdcIikgPyB7dHlwZTogXCJTVFJJTkdcIn0gOiBTVFJJTkcpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUuc3BsaXQoJ1wiJylbMV19LFxuICAgIHtcIm5hbWVcIjogXCJXU1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJXU1wiKSA/IHt0eXBlOiBcIldTXCJ9IDogV1MpXSwgXCJwb3N0cHJvY2Vzc1wiOiBudWxsZXJ9LFxuICAgIHtcIm5hbWVcIjogXCJXU1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJDT01NRU5UXCIpID8ge3R5cGU6IFwiQ09NTUVOVFwifSA6IENPTU1FTlQpXSwgXCJwb3N0cHJvY2Vzc1wiOiBudWxsZXJ9LFxuICAgIHtcIm5hbWVcIjogXCJDT01NRU5UXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkNPTU1FTlRcIikgPyB7dHlwZTogXCJDT01NRU5UXCJ9IDogQ09NTUVOVCksIChsZXhlci5oYXMoXCJXU1wiKSA/IHt0eXBlOiBcIldTXCJ9IDogV1MpXSwgXCJwb3N0cHJvY2Vzc1wiOiBudWxsZXJ9LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfQ0FUQUxPRyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX0NBVEFMT0ckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJEU0NfQ0FUQUxPRyRlYm5mJDFcIiwgXCJEU0NfREVGSU5JVElPTlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX0NBVEFMT0dcIiwgXCJzeW1ib2xzXCI6IFtcIkRTQ19DQVRBTE9HJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkRTQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfREVGSU5JVElPTiRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkRTQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfREVGSU5JVElPTiRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcIkRTQ19OVU1CRVJcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfREVGSU5JVElPTiRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX0RFRklOSVRJT05cIiwgXCJzeW1ib2xzXCI6IFtcIkRTQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcIkRTQ19ERUZJTklUSU9OJGVibmYkMlwiLCBcIkRTQ19PQkpFQ1RfVFlQRVwiLCBcIkRTQ19OQU1FXCIsIFwiRFNDX1BST1BFUlRJRVNcIl0sIFwicG9zdHByb2Nlc3NcIjogXHJcbiAgICAgICAgKFssIG51bWJlciwgdHlwZSwgbmFtZSwgcHJvcGVydGllc10pID0+IHtcclxuICAgICAgICAgIGlmIChudW1iZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgbnVtYmVyID0gZ2xvYmFsSWQrK1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgICAgbnVtYmVyLFxyXG4gICAgICAgICAgICAgIG5hbWVzOiBuYW1lLnNwbGl0KCc6JylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJvcGVydGllc1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfUFJPUEVSVElFU1wiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF19LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfTlVNQkVSXCIsIFwic3ltYm9sc1wiOiBbXCJOVU1CRVJcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF19LFxuICAgIHtcIm5hbWVcIjogXCJEU0NfTkFNRVwiLCBcInN5bWJvbHNcIjogW1wiU1RSSU5HXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkRTQ19HQUxBWFlfVFlQRVwiKSA/IHt0eXBlOiBcIkRTQ19HQUxBWFlfVFlQRVwifSA6IERTQ19HQUxBWFlfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkRTQ19HTE9CVUxBUl9UWVBFXCIpID8ge3R5cGU6IFwiRFNDX0dMT0JVTEFSX1RZUEVcIn0gOiBEU0NfR0xPQlVMQVJfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkRTQ19ORUJVTEFfVFlQRVwiKSA/IHt0eXBlOiBcIkRTQ19ORUJVTEFfVFlQRVwifSA6IERTQ19ORUJVTEFfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiRFNDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkRTQ19PUEVOX0NMVVNURVJfVFlQRVwiKSA/IHt0eXBlOiBcIkRTQ19PUEVOX0NMVVNURVJfVFlQRVwifSA6IERTQ19PUEVOX0NMVVNURVJfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfVxuXVxuICAsIFBhcnNlclN0YXJ0OiBcIkRTQ19DQVRBTE9HXCJcbn1cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIG1vZHVsZS5leHBvcnRzID0gZ3JhbW1hcjtcbn0gZWxzZSB7XG4gICB3aW5kb3cuZ3JhbW1hciA9IGdyYW1tYXI7XG59XG59KSgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ3JhbW1hci9kc2NwYXJzZXIubmVcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IG5lYXJsZXlcbi8vIGh0dHA6Ly9naXRodWIuY29tL0hhcmRtYXRoMTIzL25lYXJsZXlcbihmdW5jdGlvbiAoKSB7XG5mdW5jdGlvbiBpZCh4KSB7cmV0dXJuIHhbMF07IH1cblxyXG4gIGNvbnN0IGZyb21QYWlycyA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgcmV0dXJuIGlucHV0LnJlZHVjZSgoYWNjLCBpKSA9PiB7XHJcbiAgICAgICAgYWNjW2lbMF1dID0gaVsxXVxyXG4gICAgICAgIHJldHVybiBhY2NcclxuICAgIH0sIHt9KVxyXG4gIH1cclxuICBjb25zdCBtb28gPSByZXF1aXJlKCdtb28nKVxyXG5cclxuICBjb25zdCBudWxsZXIgPSB4ID0+IG51bGxcclxuXHJcbiAgY29uc3QgbGV4ZXIgPSBtb28uY29tcGlsZSh7XHJcbiAgICBDT05GSUdfS0VZV09SRDogL0NvbmZpZ3VyYXRpb25cXGIvLFxyXG5cclxuICAgIEFERF9NT0RFOiAvQWRkXFxiLyxcclxuICAgIE1PRElGWV9NT0RFOiAvTW9kaWZ5XFxiLyxcclxuICAgIFJFUExBQ0VfTU9ERTogL1JlcGxhY2VcXGIvLFxyXG5cclxuICAgIFNTQ19CT0RZX1RZUEU6IC9Cb2R5XFxiLyxcclxuICAgIFNTQ19SRUZfUE9JTlRfVFlQRTogL1JlZmVyZW5jZVBvaW50XFxiLyxcclxuICAgIFNTQ19TVVJGX1BPSU5UX1RZUEU6IC9TdXJmYWNlUG9pbnRcXGIvLFxyXG4gICAgU1NDX0FMVF9TVVJGQUNFOiAvQWx0U3VyZmFjZVxcYi8sXHJcbiAgICBTU0NfTE9DQVRJT046IC9Mb2NhdGlvblxcYi8sXHJcblxyXG4gICAgU1RDX1NUQVJfVFlQRTogL1N0YXJcXGIvLFxyXG4gICAgU1RDX0JBUllDRU5URVJfVFlQRTogL0JhcnljZW50ZXJcXGIvLFxyXG5cclxuICAgIERTQ19HQUxBWFlfVFlQRTogL0dhbGF4eVxcYi8sXHJcbiAgICBEU0NfR0xPQlVMQVJfVFlQRTogL0dsb2J1bGFyXFxiLyxcclxuICAgIERTQ19ORUJVTEFfVFlQRTogL05lYnVsYVxcYi8sXHJcbiAgICBEU0NfT1BFTl9DTFVTVEVSX1RZUEU6IC9PcGVuQ2x1c3RlclxcYi8sXHJcblxyXG4gICAgVFJVRTogL3RydWUvLFxyXG4gICAgRkFMU0U6IC9mYWxzZS8sXHJcblxyXG4gICAgTlVNQkVSOiAvWystXT9bMC05XSsoPzpcXC4oPzpbMC05XSspPyk/KD86W2VFXVsrLV1bMC05XSspPy8sXHJcbiAgICBXT1JEOiAvW1xcd10rXFxiLyxcclxuICAgIFNUUklORzogL1wiKD86XFxcXFsjXCJcXFxcXXxbXlxcblwiXFxcXF0pKlwiLyxcclxuICAgIEJSQUNFX0w6ICd7JyxcclxuICAgIEJSQUNFX1I6ICd9JyxcclxuICAgIFNRVV9CUkFfTDogJ1snLFxyXG4gICAgU1FVX0JSQV9SOiAnXScsXHJcbiAgICBXUzoge1xyXG4gICAgICBtYXRjaDogL1tcXHNdKy8sXHJcbiAgICAgIGxpbmVCcmVha3M6IHRydWVcclxuICAgIH0sXHJcbiAgICBDT01NRU5UOiB7XHJcbiAgICAgIG1hdGNoOiAvIy4qLyxcclxuICAgICAgbGluZUJyZWFrczogZmFsc2VcclxuICAgIH1cclxuICB9KVxyXG52YXIgZ3JhbW1hciA9IHtcbiAgICBMZXhlcjogbGV4ZXIsXG4gICAgUGFyc2VyUnVsZXM6IFtcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIkJPT0xFQU5cIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiTlVNQkVSXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIlNUUklOR1wiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUFwiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJBUlJBWVwiXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUCRlYm5mJDJcIiwgXCJHUk9VUF9QUk9QRVJUWVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiQlJBQ0VfTFwiKSA/IHt0eXBlOiBcIkJSQUNFX0xcIn0gOiBCUkFDRV9MKSwgXCJHUk9VUCRlYm5mJDFcIiwgXCJHUk9VUCRlYm5mJDJcIiwgKGxleGVyLmhhcyhcIkJSQUNFX1JcIikgPyB7dHlwZTogXCJCUkFDRV9SXCJ9IDogQlJBQ0VfUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZnJvbVBhaXJzKGRhdGFbMl0pfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBfUFJPUEVSVFkkZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIldPUkRcIikgPyB7dHlwZTogXCJXT1JEXCJ9IDogV09SRCksIFwiV1NcIiwgXCJWQUxVRVwiLCBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IFsgZGF0YVswXS52YWx1ZSwgZGF0YVsyXVswXSBdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXCJBUlJBWSRlYm5mJDJcIiwgXCJBUlJBWV9FTEVNRU5UXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTUVVfQlJBX0xcIikgPyB7dHlwZTogXCJTUVVfQlJBX0xcIn0gOiBTUVVfQlJBX0wpLCBcIkFSUkFZJGVibmYkMVwiLCBcIkFSUkFZJGVibmYkMlwiLCAobGV4ZXIuaGFzKFwiU1FVX0JSQV9SXCIpID8ge3R5cGU6IFwiU1FVX0JSQV9SXCJ9IDogU1FVX0JSQV9SKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzJdfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlfRUxFTUVOVFwiLCBcInN5bWJvbHNcIjogW1wiVkFMVUVcIiwgXCJBUlJBWV9FTEVNRU5UJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF1bMF19LFxuICAgIHtcIm5hbWVcIjogXCJCT09MRUFOXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlRSVUVcIikgPyB7dHlwZTogXCJUUlVFXCJ9IDogVFJVRSldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZSA9PT0gJ3RydWUnfSxcbiAgICB7XCJuYW1lXCI6IFwiQk9PTEVBTlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJGQUxTRVwiKSA/IHt0eXBlOiBcIkZBTFNFXCJ9IDogRkFMU0UpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUgPT09ICd0cnVlJ30sXG4gICAge1wibmFtZVwiOiBcIldPUkRcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiV09SRFwiKSA/IHt0eXBlOiBcIldPUkRcIn0gOiBXT1JEKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiTlVNQkVSXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIk5VTUJFUlwiKSA/IHt0eXBlOiBcIk5VTUJFUlwifSA6IE5VTUJFUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gcGFyc2VGbG9hdChkYXRhWzBdLnZhbHVlKX0sXG4gICAge1wibmFtZVwiOiBcIlNUUklOR1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJTVFJJTkdcIikgPyB7dHlwZTogXCJTVFJJTkdcIn0gOiBTVFJJTkcpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUuc3BsaXQoJ1wiJylbMV19LFxuICAgIHtcIm5hbWVcIjogXCJXU1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJXU1wiKSA/IHt0eXBlOiBcIldTXCJ9IDogV1MpXSwgXCJwb3N0cHJvY2Vzc1wiOiBudWxsZXJ9LFxuICAgIHtcIm5hbWVcIjogXCJXU1wiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJDT01NRU5UXCIpID8ge3R5cGU6IFwiQ09NTUVOVFwifSA6IENPTU1FTlQpXSwgXCJwb3N0cHJvY2Vzc1wiOiBudWxsZXJ9LFxuICAgIHtcIm5hbWVcIjogXCJDT01NRU5UXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkNPTU1FTlRcIikgPyB7dHlwZTogXCJDT01NRU5UXCJ9IDogQ09NTUVOVCksIChsZXhlci5oYXMoXCJXU1wiKSA/IHt0eXBlOiBcIldTXCJ9IDogV1MpXSwgXCJwb3N0cHJvY2Vzc1wiOiBudWxsZXJ9LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfQ0FUQUxPRyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX0NBVEFMT0ckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJTU0NfQ0FUQUxPRyRlYm5mJDFcIiwgXCJTU0NfREVGSU5JVElPTlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX0NBVEFMT0dcIiwgXCJzeW1ib2xzXCI6IFtcIlNTQ19DQVRBTE9HJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfREVGSU5JVElPTiRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIlNTQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfREVGSU5JVElPTiRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcIlNTQ19PQkpFQ1RfTU9ERVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19ERUZJTklUSU9OJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfREVGSU5JVElPTiRlYm5mJDNcIiwgXCJzeW1ib2xzXCI6IFtcIlNTQ19PQkpFQ1RfVFlQRVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIlNTQ19ERUZJTklUSU9OJGVibmYkM1wiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfREVGSU5JVElPTlwiLCBcInN5bWJvbHNcIjogW1wiU1NDX0RFRklOSVRJT04kZWJuZiQxXCIsIFwiU1NDX0RFRklOSVRJT04kZWJuZiQyXCIsIFwiU1NDX0RFRklOSVRJT04kZWJuZiQzXCIsIFwiU1NDX05BTUVcIiwgXCJTU0NfUEFSRU5UX05BTUVcIiwgXCJTU0NfUFJPUEVSVElFU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcclxuICAgICAgICAoWywgbW9kZSA9ICdBZGQnLCB0eXBlID0gJ0JvZHknLCBuYW1lLCBwYXRoVG9QYXJlbnQsIHByb3BlcnRpZXNdKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgbW9kZTogbW9kZSAhPT0gbnVsbCA/IG1vZGUgOiAnQWRkJyxcclxuICAgICAgICAgICAgICBtb2RlU2V0OiBtb2RlICE9PSBudWxsLFxyXG4gICAgICAgICAgICAgIHR5cGU6IHR5cGUgIT09IG51bGwgPyB0eXBlIDogJ0JvZHknLFxyXG4gICAgICAgICAgICAgIHR5cGVTZXQ6IHR5cGUgIT09IG51bGwsXHJcbiAgICAgICAgICAgICAgbmFtZXM6IG5hbWUuc3BsaXQoJzonKSxcclxuICAgICAgICAgICAgICBwYXRoVG9QYXJlbnQ6IHBhdGhUb1BhcmVudC5zcGxpdCgnLycpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByb3BlcnRpZXNcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX1BST1BFUlRJRVNcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9NT0RFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIk1PRElGWV9NT0RFXCIpID8ge3R5cGU6IFwiTU9ESUZZX01PREVcIn0gOiBNT0RJRllfTU9ERSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9NT0RFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkFERF9NT0RFXCIpID8ge3R5cGU6IFwiQUREX01PREVcIn0gOiBBRERfTU9ERSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9NT0RFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlJFUExBQ0VfTU9ERVwiKSA/IHt0eXBlOiBcIlJFUExBQ0VfTU9ERVwifSA6IFJFUExBQ0VfTU9ERSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX1BBUkVOVF9OQU1FXCIsIFwic3ltYm9sc1wiOiBbXCJTVFJJTkdcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF19LFxuICAgIHtcIm5hbWVcIjogXCJTU0NfTkFNRVwiLCBcInN5bWJvbHNcIjogW1wiU1RSSU5HXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNTQ19CT0RZX1RZUEVcIikgPyB7dHlwZTogXCJTU0NfQk9EWV9UWVBFXCJ9IDogU1NDX0JPRFlfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNTQ19SRUZfUE9JTlRfVFlQRVwiKSA/IHt0eXBlOiBcIlNTQ19SRUZfUE9JTlRfVFlQRVwifSA6IFNTQ19SRUZfUE9JTlRfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNTQ19TVVJGX1BPSU5UX1RZUEVcIikgPyB7dHlwZTogXCJTU0NfU1VSRl9QT0lOVF9UWVBFXCJ9IDogU1NDX1NVUkZfUE9JTlRfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNTQ19BTFRfU1VSRkFDRVwiKSA/IHt0eXBlOiBcIlNTQ19BTFRfU1VSRkFDRVwifSA6IFNTQ19BTFRfU1VSRkFDRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1NDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNTQ19MT0NBVElPTlwiKSA/IHt0eXBlOiBcIlNTQ19MT0NBVElPTlwifSA6IFNTQ19MT0NBVElPTiksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfVxuXVxuICAsIFBhcnNlclN0YXJ0OiBcIlNTQ19DQVRBTE9HXCJcbn1cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIG1vZHVsZS5leHBvcnRzID0gZ3JhbW1hcjtcbn0gZWxzZSB7XG4gICB3aW5kb3cuZ3JhbW1hciA9IGdyYW1tYXI7XG59XG59KSgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ3JhbW1hci9zc2NwYXJzZXIubmVcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IG5lYXJsZXlcbi8vIGh0dHA6Ly9naXRodWIuY29tL0hhcmRtYXRoMTIzL25lYXJsZXlcbihmdW5jdGlvbiAoKSB7XG5mdW5jdGlvbiBpZCh4KSB7cmV0dXJuIHhbMF07IH1cblxyXG4gIGNvbnN0IHZhbGlkTW9kZXMgPSBbJ01vZGlmeScsICdBZGQnLCAnUmVwbGFjZSddXHJcbiAgY29uc3QgdmFsaWRUeXBlcyA9IFsnU3RhcicsICdCYXJ5Y2VudGVyJ11cclxuXG5cclxuICBjb25zdCBmcm9tUGFpcnMgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgIHJldHVybiBpbnB1dC5yZWR1Y2UoKGFjYywgaSkgPT4ge1xyXG4gICAgICAgIGFjY1tpWzBdXSA9IGlbMV1cclxuICAgICAgICByZXR1cm4gYWNjXHJcbiAgICB9LCB7fSlcclxuICB9XHJcbiAgY29uc3QgbW9vID0gcmVxdWlyZSgnbW9vJylcclxuXHJcbiAgY29uc3QgbnVsbGVyID0geCA9PiBudWxsXHJcblxyXG4gIGNvbnN0IGxleGVyID0gbW9vLmNvbXBpbGUoe1xyXG4gICAgQ09ORklHX0tFWVdPUkQ6IC9Db25maWd1cmF0aW9uXFxiLyxcclxuXHJcbiAgICBBRERfTU9ERTogL0FkZFxcYi8sXHJcbiAgICBNT0RJRllfTU9ERTogL01vZGlmeVxcYi8sXHJcbiAgICBSRVBMQUNFX01PREU6IC9SZXBsYWNlXFxiLyxcclxuXHJcbiAgICBTU0NfQk9EWV9UWVBFOiAvQm9keVxcYi8sXHJcbiAgICBTU0NfUkVGX1BPSU5UX1RZUEU6IC9SZWZlcmVuY2VQb2ludFxcYi8sXHJcbiAgICBTU0NfU1VSRl9QT0lOVF9UWVBFOiAvU3VyZmFjZVBvaW50XFxiLyxcclxuICAgIFNTQ19BTFRfU1VSRkFDRTogL0FsdFN1cmZhY2VcXGIvLFxyXG4gICAgU1NDX0xPQ0FUSU9OOiAvTG9jYXRpb25cXGIvLFxyXG5cclxuICAgIFNUQ19TVEFSX1RZUEU6IC9TdGFyXFxiLyxcclxuICAgIFNUQ19CQVJZQ0VOVEVSX1RZUEU6IC9CYXJ5Y2VudGVyXFxiLyxcclxuXHJcbiAgICBEU0NfR0FMQVhZX1RZUEU6IC9HYWxheHlcXGIvLFxyXG4gICAgRFNDX0dMT0JVTEFSX1RZUEU6IC9HbG9idWxhclxcYi8sXHJcbiAgICBEU0NfTkVCVUxBX1RZUEU6IC9OZWJ1bGFcXGIvLFxyXG4gICAgRFNDX09QRU5fQ0xVU1RFUl9UWVBFOiAvT3BlbkNsdXN0ZXJcXGIvLFxyXG5cclxuICAgIFRSVUU6IC90cnVlLyxcclxuICAgIEZBTFNFOiAvZmFsc2UvLFxyXG5cclxuICAgIE5VTUJFUjogL1srLV0/WzAtOV0rKD86XFwuKD86WzAtOV0rKT8pPyg/OltlRV1bKy1dWzAtOV0rKT8vLFxyXG4gICAgV09SRDogL1tcXHddK1xcYi8sXHJcbiAgICBTVFJJTkc6IC9cIig/OlxcXFxbI1wiXFxcXF18W15cXG5cIlxcXFxdKSpcIi8sXHJcbiAgICBCUkFDRV9MOiAneycsXHJcbiAgICBCUkFDRV9SOiAnfScsXHJcbiAgICBTUVVfQlJBX0w6ICdbJyxcclxuICAgIFNRVV9CUkFfUjogJ10nLFxyXG4gICAgV1M6IHtcclxuICAgICAgbWF0Y2g6IC9bXFxzXSsvLFxyXG4gICAgICBsaW5lQnJlYWtzOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgQ09NTUVOVDoge1xyXG4gICAgICBtYXRjaDogLyMuKi8sXHJcbiAgICAgIGxpbmVCcmVha3M6IGZhbHNlXHJcbiAgICB9XHJcbiAgfSlcclxudmFyIGdyYW1tYXIgPSB7XG4gICAgTGV4ZXI6IGxleGVyLFxuICAgIFBhcnNlclJ1bGVzOiBbXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJCT09MRUFOXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiVkFMVUVcIiwgXCJzeW1ib2xzXCI6IFtcIk5VTUJFUlwiXX0sXG4gICAge1wibmFtZVwiOiBcIlZBTFVFXCIsIFwic3ltYm9sc1wiOiBbXCJTVFJJTkdcIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBcIl19LFxuICAgIHtcIm5hbWVcIjogXCJWQUxVRVwiLCBcInN5bWJvbHNcIjogW1wiQVJSQVlcIl19LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJHUk9VUCRlYm5mJDFcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiR1JPVVAkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiR1JPVVAkZWJuZiQyXCIsIFwiR1JPVVBfUFJPUEVSVFlcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkJSQUNFX0xcIikgPyB7dHlwZTogXCJCUkFDRV9MXCJ9IDogQlJBQ0VfTCksIFwiR1JPVVAkZWJuZiQxXCIsIFwiR1JPVVAkZWJuZiQyXCIsIChsZXhlci5oYXMoXCJCUkFDRV9SXCIpID8ge3R5cGU6IFwiQlJBQ0VfUlwifSA6IEJSQUNFX1IpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGZyb21QYWlycyhkYXRhWzJdKX0sXG4gICAge1wibmFtZVwiOiBcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkdST1VQX1BST1BFUlRZJGVibmYkMVwiLCBcIldTXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJHUk9VUF9QUk9QRVJUWVwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJXT1JEXCIpID8ge3R5cGU6IFwiV09SRFwifSA6IFdPUkQpLCBcIldTXCIsIFwiVkFMVUVcIiwgXCJHUk9VUF9QUk9QRVJUWSRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBbIGRhdGFbMF0udmFsdWUsIGRhdGFbMl1bMF0gXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJBUlJBWSRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVkkZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiQVJSQVkkZWJuZiQyXCIsIFwiQVJSQVlfRUxFTUVOVFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiQVJSQVlcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiU1FVX0JSQV9MXCIpID8ge3R5cGU6IFwiU1FVX0JSQV9MXCJ9IDogU1FVX0JSQV9MKSwgXCJBUlJBWSRlYm5mJDFcIiwgXCJBUlJBWSRlYm5mJDJcIiwgKGxleGVyLmhhcyhcIlNRVV9CUkFfUlwiKSA/IHt0eXBlOiBcIlNRVV9CUkFfUlwifSA6IFNRVV9CUkFfUildLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVsyXX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIkFSUkFZX0VMRU1FTlRcIiwgXCJzeW1ib2xzXCI6IFtcIlZBTFVFXCIsIFwiQVJSQVlfRUxFTUVOVCRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiQk9PTEVBTlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJUUlVFXCIpID8ge3R5cGU6IFwiVFJVRVwifSA6IFRSVUUpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF0udmFsdWUgPT09ICd0cnVlJ30sXG4gICAge1wibmFtZVwiOiBcIkJPT0xFQU5cIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiRkFMU0VcIikgPyB7dHlwZTogXCJGQUxTRVwifSA6IEZBTFNFKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlID09PSAndHJ1ZSd9LFxuICAgIHtcIm5hbWVcIjogXCJXT1JEXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIldPUkRcIikgPyB7dHlwZTogXCJXT1JEXCJ9IDogV09SRCldLCBcInBvc3Rwcm9jZXNzXCI6IGRhdGEgPT4gZGF0YVswXS52YWx1ZX0sXG4gICAge1wibmFtZVwiOiBcIk5VTUJFUlwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJOVU1CRVJcIikgPyB7dHlwZTogXCJOVU1CRVJcIn0gOiBOVU1CRVIpXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IHBhcnNlRmxvYXQoZGF0YVswXS52YWx1ZSl9LFxuICAgIHtcIm5hbWVcIjogXCJTVFJJTkdcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiU1RSSU5HXCIpID8ge3R5cGU6IFwiU1RSSU5HXCJ9IDogU1RSSU5HKV0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlLnNwbGl0KCdcIicpWzFdfSxcbiAgICB7XCJuYW1lXCI6IFwiV1NcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiV1NcIikgPyB7dHlwZTogXCJXU1wifSA6IFdTKV0sIFwicG9zdHByb2Nlc3NcIjogbnVsbGVyfSxcbiAgICB7XCJuYW1lXCI6IFwiV1NcIiwgXCJzeW1ib2xzXCI6IFsobGV4ZXIuaGFzKFwiQ09NTUVOVFwiKSA/IHt0eXBlOiBcIkNPTU1FTlRcIn0gOiBDT01NRU5UKV0sIFwicG9zdHByb2Nlc3NcIjogbnVsbGVyfSxcbiAgICB7XCJuYW1lXCI6IFwiQ09NTUVOVFwiLCBcInN5bWJvbHNcIjogWyhsZXhlci5oYXMoXCJDT01NRU5UXCIpID8ge3R5cGU6IFwiQ09NTUVOVFwifSA6IENPTU1FTlQpLCAobGV4ZXIuaGFzKFwiV1NcIikgPyB7dHlwZTogXCJXU1wifSA6IFdTKV0sIFwicG9zdHByb2Nlc3NcIjogbnVsbGVyfSxcbiAgICB7XCJuYW1lXCI6IFwiQ0FUQUxPRyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiQ0FUQUxPRyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIkNBVEFMT0ckZWJuZiQxXCIsIFwiU1RDX0RFRklOSVRJT05cIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIkNBVEFMT0dcIiwgXCJzeW1ib2xzXCI6IFtcIkNBVEFMT0ckZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0RFRklOSVRJT04kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ERUZJTklUSU9OJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiU1RDX0RFRklOSVRJT04kZWJuZiQxXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ERUZJTklUSU9OJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiU1RDX09CSkVDVF9NT0RFXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0RFRklOSVRJT04kZWJuZiQyXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ERUZJTklUSU9OJGVibmYkM1wiLCBcInN5bWJvbHNcIjogW1wiU1RDX09CSkVDVF9UWVBFXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0RFRklOSVRJT04kZWJuZiQzXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ERUZJTklUSU9OJGVibmYkNFwiLCBcInN5bWJvbHNcIjogW1wiU1RDX0hJUF9OVU1CRVJcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJTVENfREVGSU5JVElPTiRlYm5mJDRcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0RFRklOSVRJT04kZWJuZiQ1XCIsIFwic3ltYm9sc1wiOiBbXCJTVENfTkFNRVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIlNUQ19ERUZJTklUSU9OJGVibmYkNVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJTVENfREVGSU5JVElPTlwiLCBcInN5bWJvbHNcIjogW1wiU1RDX0RFRklOSVRJT04kZWJuZiQxXCIsIFwiU1RDX0RFRklOSVRJT04kZWJuZiQyXCIsIFwiU1RDX0RFRklOSVRJT04kZWJuZiQzXCIsIFwiU1RDX0RFRklOSVRJT04kZWJuZiQ0XCIsIFwiU1RDX0RFRklOSVRJT04kZWJuZiQ1XCIsIFwiU1RDX1BST1BFUlRJRVNcIl0sIFwicG9zdHByb2Nlc3NcIjogXHJcbiAgICAgICAgKFssIG1vZGUsIHR5cGUsIG51bWJlciwgbmFtZSwgcHJvcGVydGllc10sIGwpID0+IHtcclxuICAgICAgICAgIGlmIChudW1iZXIgPT09IG51bGwgJiYgbmFtZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEluY29ycmVjdCBvYmplY3QgZGVmaW5pdGlvbiBhdCBsaW5lICR7bH1gKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgaWYgKG1vZGUgIT09IG51bGwgJiYgdmFsaWRNb2Rlcy5pbmRleE9mKG1vZGUpID09PSAtMSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFdyb25nIG9iamVjdCBjcmVhdGlvbiBtb2RlIFwiJHttb2RlfVwiIGF0IGxpbmUgJHtsfWApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICBpZiAodHlwZSAhPT0gbnVsbCAmJiB2YWxpZFR5cGVzLmluZGV4T2YodHlwZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWxpZE1vZGVzLmluZGV4T2YodHlwZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgbW9kZSA9IHR5cGVcclxuICAgICAgICAgICAgICB0eXBlID0gbnVsbFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgV3Jvbmcgb2JqZWN0IHR5cGUgXCIke3R5cGV9XCIgYXQgbGluZSAke2x9YClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWV0YTp7XHJcbiAgICAgICAgICAgICAgbW9kZTogbW9kZSAhPT0gbnVsbCA/IG1vZGUgOiAnQWRkJyxcclxuICAgICAgICAgICAgICBtb2RlU2V0OiBtb2RlICE9PSBudWxsLFxyXG4gICAgICAgICAgICAgIHR5cGU6IHR5cGUgIT09IG51bGwgPyB0eXBlIDogJ1N0YXInLFxyXG4gICAgICAgICAgICAgIHR5cGVTZXQ6IHR5cGUgIT09IG51bGwsXHJcbiAgICAgICAgICAgICAgbmFtZXM6IG5hbWUgIT09IG51bGwgPyBuYW1lLnNwbGl0KCc6JykgOiBbXSxcclxuICAgICAgICAgICAgICBuYW1lU2V0OiBuYW1lICE9PSBudWxsLFxyXG4gICAgICAgICAgICAgIG51bWJlcjogbnVtYmVyICE9PSBudWxsID8gbnVtYmVyIDoge31cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJvcGVydGllc1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJTVENfUFJPUEVSVElFU1wiLCBcInN5bWJvbHNcIjogW1wiR1JPVVBcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF19LFxuICAgIHtcIm5hbWVcIjogXCJTVENfSElQX05VTUJFUiRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0hJUF9OVU1CRVIkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJTVENfSElQX05VTUJFUiRlYm5mJDFcIiwgXCJXU1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX0hJUF9OVU1CRVJcIiwgXCJzeW1ib2xzXCI6IFtcIk5VTUJFUlwiLCBcIlNUQ19ISVBfTlVNQkVSJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBkYXRhID0+IGRhdGFbMF19LFxuICAgIHtcIm5hbWVcIjogXCJTVENfTkFNRVwiLCBcInN5bWJvbHNcIjogW1wiU1RSSU5HXCIsIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX09CSkVDVF9NT0RFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIk1PRElGWV9NT0RFXCIpID8ge3R5cGU6IFwiTU9ESUZZX01PREVcIn0gOiBNT0RJRllfTU9ERSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX09CSkVDVF9NT0RFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIkFERF9NT0RFXCIpID8ge3R5cGU6IFwiQUREX01PREVcIn0gOiBBRERfTU9ERSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX09CSkVDVF9NT0RFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlJFUExBQ0VfTU9ERVwiKSA/IHt0eXBlOiBcIlJFUExBQ0VfTU9ERVwifSA6IFJFUExBQ0VfTU9ERSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNUQ19TVEFSX1RZUEVcIikgPyB7dHlwZTogXCJTVENfU1RBUl9UWVBFXCJ9IDogU1RDX1NUQVJfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfSxcbiAgICB7XCJuYW1lXCI6IFwiU1RDX09CSkVDVF9UWVBFXCIsIFwic3ltYm9sc1wiOiBbKGxleGVyLmhhcyhcIlNUQ19CQVJZQ0VOVEVSX1RZUEVcIikgPyB7dHlwZTogXCJTVENfQkFSWUNFTlRFUl9UWVBFXCJ9IDogU1RDX0JBUllDRU5URVJfVFlQRSksIFwiV1NcIl0sIFwicG9zdHByb2Nlc3NcIjogZGF0YSA9PiBkYXRhWzBdLnZhbHVlfVxuXVxuICAsIFBhcnNlclN0YXJ0OiBcIkNBVEFMT0dcIlxufVxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgbW9kdWxlLmV4cG9ydHMgPSBncmFtbWFyO1xufSBlbHNlIHtcbiAgIHdpbmRvdy5ncmFtbWFyID0gZ3JhbW1hcjtcbn1cbn0pKCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ncmFtbWFyL3N0Y3BhcnNlci5uZVxuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgRm9ybWF0c0NoZWNrZXIsIEZvcm1hdFR5cGUgfSBmcm9tICcuL0Zvcm1hdHNDaGVja2VyJ1xyXG5cclxuZXhwb3J0IHtcclxuICBGb3JtYXRzQ2hlY2tlcixcclxuICBGb3JtYXRUeXBlXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0Zvcm1hdHNDaGVja2VyL2luZGV4LnRzIiwiY29uc3QgcmVkdWNlID0gZnVuY3Rpb24gPFQ+IChpbnB1dDogYW55KTogYW55W10ge1xyXG4gIHJldHVybiBPYmplY3Qua2V5cyhpbnB1dCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgcmV0dXJuIFtdLmNvbmNhdChhY2MsIGlucHV0W2tleV0pXHJcbiAgfSwgW10pXHJcbn1cclxuXHJcbmVudW0gRm9ybWF0VHlwZSB7XHJcbiAgVEVYVCxcclxuICBCSU5BUlksXHJcbiAgSU5DT1JSRUNUXHJcbn1cclxuXHJcbmNsYXNzIEZvcm1hdHNDaGVja2VyIHtcclxuICBwcml2YXRlIHN0YXRpYyBfdmlhYmxlRm9ybWF0cyA9IHtcclxuICAgIHRleHQ6IFsnc3RjJywgJ3NzYycsICdkc2MnLCAnY2ZnJ10sXHJcbiAgICBiaW5hcnk6IFsnZGF0J11cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXQgdmlhYmxlRm9ybWF0cyAoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIHJlZHVjZShGb3JtYXRzQ2hlY2tlci5fdmlhYmxlRm9ybWF0cylcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc0NvcnJlY3RFeHRlbnNpb24gKGV4dGVuc2lvbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gRm9ybWF0c0NoZWNrZXIudmlhYmxlRm9ybWF0cy5pbmRleE9mKGV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpKSAhPT0gLTFcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmb3JtYXRUeXBlIChleHRlbnNpb246IHN0cmluZyk6IEZvcm1hdFR5cGUge1xyXG4gICAgaWYgKCFGb3JtYXRzQ2hlY2tlci5pc0NvcnJlY3RFeHRlbnNpb24oZXh0ZW5zaW9uKSkge1xyXG4gICAgICByZXR1cm4gRm9ybWF0VHlwZS5JTkNPUlJFQ1RcclxuICAgIH1cclxuXHJcbiAgICBpZiAoRm9ybWF0c0NoZWNrZXIuX3ZpYWJsZUZvcm1hdHMudGV4dC5pbmRleE9mKGV4dGVuc2lvbikgIT09IC0xKSB7XHJcbiAgICAgIHJldHVybiBGb3JtYXRUeXBlLlRFWFRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBGb3JtYXRUeXBlLkJJTkFSWVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBGb3JtYXRzQ2hlY2tlcixcclxuICBGb3JtYXRUeXBlXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0Zvcm1hdHNDaGVja2VyL0Zvcm1hdHNDaGVja2VyLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==