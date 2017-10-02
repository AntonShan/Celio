"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InputSyntaxError extends Error {
    constructor(msg, line) {
        super();
        this.name = 'InputSyntaxError';
        this.message = `Syntax error at line ${line}
    Details: ${msg}`;
    }
}
exports.default = InputSyntaxError;
//# sourceMappingURL=InputSyntaxError.js.map