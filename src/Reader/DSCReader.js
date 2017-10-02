"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenBasedReader_1 = require("./TokenBasedReader");
const Exceptions_1 = require("../Exceptions");
class DSCReader extends TokenBasedReader_1.default {
    read() {
        throw new Exceptions_1.NotImplementedError(`.dsc reader isn't implemented yet`);
    }
    write() { }
}
exports.default = DSCReader;
//# sourceMappingURL=DSCReader.js.map