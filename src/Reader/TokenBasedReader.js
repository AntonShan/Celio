"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Reader_1 = require("./Reader");
const Tokenizer_1 = require("../Tokenizer");
const Parser_1 = require("../Parser");
class TokenBasedReader extends Reader_1.default {
    constructor(data) {
        super();
        this.tokenizer = new Tokenizer_1.Tokenizer(data);
        this.parser = new Parser_1.Parser(this.tokenizer);
    }
    read() {
        return [{}];
    }
    write() { }
}
exports.default = TokenBasedReader;
//# sourceMappingURL=TokenBasedReader.js.map