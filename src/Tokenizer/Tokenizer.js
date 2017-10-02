"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const Exceptions_1 = require("../Exceptions");
var State;
(function (State) {
    State[State["StartState"] = 0] = "StartState";
    State[State["NameState"] = 1] = "NameState";
    State[State["NumberState"] = 2] = "NumberState";
    State[State["FractionState"] = 3] = "FractionState";
    State[State["ExponentState"] = 4] = "ExponentState";
    State[State["ExponentFirstState"] = 5] = "ExponentFirstState";
    State[State["DotState"] = 6] = "DotState";
    State[State["CommentState"] = 7] = "CommentState";
    State[State["StringState"] = 8] = "StringState";
    State[State["ErrorState"] = 9] = "ErrorState";
    State[State["StringEscapeState"] = 10] = "StringEscapeState";
    State[State["UnicodeEscapeState"] = 11] = "UnicodeEscapeState";
})(State || (State = {}));
exports.State = State;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["TokenName"] = 0] = "TokenName";
    TokenType[TokenType["TokenString"] = 1] = "TokenString";
    TokenType[TokenType["TokenNumber"] = 2] = "TokenNumber";
    TokenType[TokenType["TokenBegin"] = 3] = "TokenBegin";
    TokenType[TokenType["TokenEnd"] = 4] = "TokenEnd";
    TokenType[TokenType["TokenNull"] = 5] = "TokenNull";
    TokenType[TokenType["TokenBeginGroup"] = 6] = "TokenBeginGroup";
    TokenType[TokenType["TokenEndGroup"] = 7] = "TokenEndGroup";
    TokenType[TokenType["TokenBeginArray"] = 8] = "TokenBeginArray";
    TokenType[TokenType["TokenEndArray"] = 9] = "TokenEndArray";
    TokenType[TokenType["TokenEquals"] = 10] = "TokenEquals";
    TokenType[TokenType["TokenError"] = 11] = "TokenError";
    TokenType[TokenType["TokenBar"] = 12] = "TokenBar";
    TokenType[TokenType["TokenBeginUnits"] = 13] = "TokenBeginUnits";
    TokenType[TokenType["TokenEndUnits"] = 14] = "TokenEndUnits";
})(TokenType || (TokenType = {}));
exports.TokenType = TokenType;
class Tokenizer {
    constructor(data) {
        this.data = data;
        this.tokenType = TokenType.TokenBegin;
        this.haveValidNumber = false;
        this.haveValidName = false;
        this.haveValidString = false;
        this.pushedBack = false;
        this.lineNum = 1;
        this.currentIndex = 0;
        this.nextChar = '';
        this.value = null;
        this.unicodeValue = 0;
        this.unicodeEscapeDigits = 0;
    }
    nextToken() {
        let state = State.StartState;
        if (this.pushedBack) {
            this.pushedBack = false;
            return this.tokenType;
        }
        this.value = '';
        this.haveValidNumber = false;
        this.haveValidName = false;
        this.haveValidString = false;
        if (this.tokenType === TokenType.TokenBegin) {
            this.nextChar = this.readChar();
            if (this.nextChar === void 0) {
                return TokenType.TokenEnd;
            }
        }
        else if (this.tokenType === TokenType.TokenEnd) {
            return this.tokenType;
        }
        let integerValue = 0;
        let fractionValue = 0;
        let sign = 1;
        let fracExp = 1;
        let exponentValue = 0;
        let exponentSign = 1;
        let newToken = TokenType.TokenBegin;
        while (newToken === TokenType.TokenBegin) {
            switch (state) {
                case State.StartState:
                    if (utils_1.Utils.isSpace(this.nextChar)) {
                        state = State.StartState;
                    }
                    else if (utils_1.Utils.isDigit(this.nextChar)) {
                        state = State.NumberState;
                        integerValue = utils_1.Utils.atoi(this.nextChar);
                    }
                    else if (this.nextChar === '-') {
                        state = State.NumberState;
                        sign = -1;
                        integerValue = 0;
                    }
                    else if (this.nextChar === '+') {
                        state = State.NumberState;
                        sign = +1;
                        integerValue = 0;
                    }
                    else if (this.nextChar === '.') {
                        state = State.NumberState;
                        sign = +1;
                        integerValue = 0;
                    }
                    else if (utils_1.Utils.isAlpha(this.nextChar) || this.nextChar === '_') {
                        state = State.NameState;
                        this.value += this.nextChar;
                    }
                    else if (this.nextChar === '#') {
                        state = State.CommentState;
                    }
                    else if (this.nextChar === '"') {
                        state = State.StringState;
                    }
                    else if (this.nextChar === '{') {
                        newToken = TokenType.TokenBeginGroup;
                        this.nextChar = this.readChar();
                    }
                    else if (this.nextChar === '}') {
                        newToken = TokenType.TokenEndGroup;
                        this.nextChar = this.readChar();
                    }
                    else if (this.nextChar === '[') {
                        newToken = TokenType.TokenBeginArray;
                        this.nextChar = this.readChar();
                    }
                    else if (this.nextChar === ']') {
                        newToken = TokenType.TokenEndArray;
                        this.nextChar = this.readChar();
                    }
                    else if (this.nextChar === '=') {
                        newToken = TokenType.TokenEquals;
                        this.nextChar = this.readChar();
                    }
                    else if (this.nextChar === '|') {
                        newToken = TokenType.TokenBar;
                        this.nextChar = this.readChar();
                    }
                    else if (this.nextChar === '<') {
                        newToken = TokenType.TokenBeginUnits;
                        this.nextChar = this.readChar();
                    }
                    else if (this.nextChar === '>') {
                        newToken = TokenType.TokenEndUnits;
                        this.nextChar = this.readChar();
                    }
                    else if (this.nextChar === void 0) {
                        newToken = TokenType.TokenEnd;
                    }
                    else {
                        newToken = TokenType.TokenError;
                        this.syntaxError(`Bad character in stream at line ${this.getLineNumber()}`);
                    }
                    break;
                case State.NameState:
                    if (utils_1.Utils.isAlpha(this.nextChar) || utils_1.Utils.isDigit(this.nextChar) || this.nextChar === '_') {
                        state = State.NameState;
                        this.value += this.nextChar;
                    }
                    else {
                        newToken = TokenType.TokenName;
                        this.haveValidName = true;
                    }
                    break;
                case State.CommentState:
                    if (this.nextChar === '\n' || this.nextChar === '\r' || this.nextChar === void 0) {
                        state = State.StartState;
                    }
                    break;
                case State.StringState:
                    if (this.nextChar === '"') {
                        newToken = TokenType.TokenString;
                        this.haveValidString = true;
                        this.nextChar = this.readChar();
                    }
                    else if (this.nextChar === '\\') {
                        state = State.StringEscapeState;
                    }
                    else if (this.nextChar === void 0) {
                        newToken = TokenType.TokenError;
                        this.syntaxError('Unterminated string');
                    }
                    else {
                        state = State.StringState;
                        this.value += this.nextChar;
                    }
                    break;
                case State.StringEscapeState:
                    if (this.nextChar === '\\') {
                        this.value += '\\';
                        state = State.StringState;
                    }
                    else if (this.nextChar === 'n') {
                        this.value += 'n';
                        state = State.StringState;
                    }
                    else if (this.nextChar === '"') {
                        this.value += utils_1.Utils.codeOf('"');
                        state = State.StringState;
                    }
                    else if (this.nextChar === 'u') {
                        this.unicodeValue = 0;
                        this.unicodeEscapeDigits = 0;
                        state = State.UnicodeEscapeState;
                    }
                    else {
                        newToken = TokenType.TokenError;
                        state = State.StringState;
                        this.syntaxError(`Unknown escape code in string at line ${this.getLineNumber()}`);
                    }
                    break;
                case State.NumberState:
                    if (utils_1.Utils.isDigit(this.nextChar)) {
                        state = State.NumberState;
                        integerValue = integerValue * 10 + utils_1.Utils.atoi(this.nextChar);
                    }
                    else if (this.nextChar === '.') {
                        state = State.FractionState;
                    }
                    else if (this.nextChar === 'e' || this.nextChar === 'E') {
                        state = State.ExponentFirstState;
                    }
                    else if (utils_1.Utils.isSep(this.nextChar)) {
                        newToken = TokenType.TokenNumber;
                        this.haveValidNumber = true;
                    }
                    else {
                        newToken = TokenType.TokenError;
                        this.syntaxError(`Bad character in number at line ${this.getLineNumber()}`);
                    }
                    break;
                case State.FractionState:
                    if (utils_1.Utils.isDigit(this.nextChar)) {
                        state = State.FractionState;
                        fractionValue = fractionValue * 10 + utils_1.Utils.atoi(this.nextChar);
                        fracExp *= 10;
                    }
                    else if (this.nextChar === 'e' || this.nextChar === 'E') {
                        state = State.ExponentFirstState;
                    }
                    else if (utils_1.Utils.isSep(this.nextChar)) {
                        newToken = TokenType.TokenNumber;
                        this.haveValidNumber = true;
                    }
                    else {
                        newToken = TokenType.TokenError;
                        this.syntaxError(`Bad character in number at line ${this.getLineNumber()}`);
                    }
                    break;
                case State.ExponentFirstState:
                    if (utils_1.Utils.isDigit(this.nextChar)) {
                        state = State.ExponentState;
                        exponentValue = utils_1.Utils.atoi(this.nextChar);
                    }
                    else if (this.nextChar === '-') {
                        state = State.ExponentState;
                        exponentSign = -1;
                    }
                    else if (this.nextChar === '+') {
                        state = State.ExponentState;
                    }
                    else {
                        state = State.ErrorState;
                        this.syntaxError(`Bad character in number at line ${this.getLineNumber()}`);
                    }
                    break;
                case State.ExponentState:
                    if (utils_1.Utils.isDigit(this.nextChar)) {
                        state = State.ExponentState;
                        exponentValue = exponentValue * 10 + utils_1.Utils.atoi(this.nextChar);
                    }
                    else if (utils_1.Utils.isSep(this.nextChar)) {
                        newToken = TokenType.TokenNumber;
                        this.haveValidNumber = true;
                    }
                    else {
                        state = State.ErrorState;
                        this.syntaxError(`Bad character in number at line ${this.getLineNumber()}`);
                    }
                    break;
                case State.UnicodeEscapeState:
                    if (utils_1.Utils.isXDigit(this.nextChar)) {
                        let digitValue = utils_1.Utils.atoi(this.nextChar);
                        this.unicodeValue = (this.unicodeValue << 4) + digitValue;
                        this.unicodeEscapeDigits++;
                        if (this.unicodeEscapeDigits === 4) {
                            this.value += utils_1.UTF8Encode(this.unicodeValue);
                            state = State.StringState;
                        }
                    }
                    else {
                        state = State.ErrorState;
                        this.syntaxError(`Bad Unicode escape in string at line ${this.getLineNumber()}`);
                    }
                    break;
                case State.ErrorState:
                    break;
                default:
            }
            if (newToken === TokenType.TokenBegin) {
                this.nextChar = this.readChar();
            }
        }
        this.tokenType = newToken;
        if (this.haveValidNumber) {
            this.value = integerValue + fractionValue / fracExp;
            if (exponentValue !== 0) {
                this.value *= Math.pow(10.0, exponentValue * exponentSign);
            }
            this.value *= sign;
        }
        return this.tokenType;
    }
    getTokenType() {
        return this.tokenType;
    }
    pushBack() {
        this.pushedBack = true;
    }
    getValue() {
        return this.value;
    }
    getLineNumber() {
        return this.lineNum;
    }
    readChar() {
        const charCode = this.data[this.currentIndex++];
        const symbol = utils_1.Utils.charOf(charCode);
        if (charCode === void 0) {
            return charCode;
        }
        if (symbol === '\n') {
            this.lineNum++;
        }
        return symbol;
    }
    syntaxError(msg) {
        throw new Exceptions_1.InputSyntaxError(msg, this.lineNum);
    }
}
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=Tokenizer.js.map