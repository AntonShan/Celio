"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenBasedReader_1 = require("./TokenBasedReader");
const Exceptions_1 = require("../Exceptions");
class SSCReader extends TokenBasedReader_1.default {
    read() {
        throw new Exceptions_1.NotImplementedError(`.ssc reader isn't implemented yet`);
    }
    write() { }
}
exports.default = SSCReader;
//# sourceMappingURL=SSCReader.js.map