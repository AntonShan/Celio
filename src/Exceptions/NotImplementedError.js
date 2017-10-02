"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotImplementedError extends Error {
    constructor(msg) {
        super();
        this.name = 'NotImplementedError';
        this.message = `Not Implemented Error: ${msg}`;
    }
}
exports.default = NotImplementedError;
//# sourceMappingURL=NotImplementedError.js.map