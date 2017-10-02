"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tokenizer_1 = require("../Tokenizer");
class Parser {
    constructor(_tokenizer) {
        this.tokenizer = _tokenizer;
    }
    readArray() {
        let tok = this.tokenizer.nextToken();
        if (tok !== Tokenizer_1.TokenType.TokenBeginArray) {
            this.tokenizer.pushBack();
            return null;
        }
        let array = [];
        let v = this.readValue();
        while (v !== null) {
            array.push(v);
            v = this.readValue();
        }
        tok = this.tokenizer.nextToken();
        if (tok !== Tokenizer_1.TokenType.TokenEndArray) {
            this.tokenizer.pushBack();
            array = null;
            return null;
        }
        return array;
    }
    readHash() {
        let tok = this.tokenizer.nextToken();
        if (tok !== Tokenizer_1.TokenType.TokenBeginGroup) {
            this.tokenizer.pushBack();
            return null;
        }
        let hash = {};
        tok = this.tokenizer.nextToken();
        while (tok !== Tokenizer_1.TokenType.TokenEndGroup) {
            if (tok !== Tokenizer_1.TokenType.TokenName) {
                this.tokenizer.pushBack();
                hash = null;
                return null;
            }
            let name = this.tokenizer.getValue();
            hash = this.readUnits(name, hash);
            let value = this.readValue();
            if (value === null) {
                hash = null;
                return null;
            }
            hash = Object.assign({}, hash, {
                [name]: value
            });
            tok = this.tokenizer.nextToken();
        }
        return hash;
    }
    readUnits(propertyName, hash) {
        let tok = this.tokenizer.nextToken();
        if (tok !== Tokenizer_1.TokenType.TokenBeginUnits) {
            this.tokenizer.pushBack();
            return hash;
        }
        tok = this.tokenizer.nextToken();
        while (tok !== Tokenizer_1.TokenType.TokenEndUnits) {
            if (tok !== Tokenizer_1.TokenType.TokenName) {
                this.tokenizer.pushBack();
                return hash;
            }
            tok = this.tokenizer.nextToken();
        }
        return Object.assign({}, hash);
    }
    readValue() {
        let tok = this.tokenizer.nextToken();
        switch (tok) {
            case Tokenizer_1.TokenType.TokenNumber:
            case Tokenizer_1.TokenType.TokenString:
            case Tokenizer_1.TokenType.TokenName:
            case Tokenizer_1.TokenType.TokenBeginArray:
            case Tokenizer_1.TokenType.TokenBeginGroup:
                return this.tokenizer.getValue();
            default:
                return null;
        }
    }
}
exports.default = Parser;
//# sourceMappingURL=Parser.js.map