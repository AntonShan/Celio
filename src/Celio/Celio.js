"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Reader = require("../Reader");
class Celio {
    static read(filePath) {
        return new Promise((resolve, reject) => {
            let fullPath = path.resolve(filePath);
            fs.readFile(fullPath, (error, data) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    return reject(error);
                }
                const inputType = path.extname(fullPath);
                if (inputType.startsWith('.')) {
                    let type = inputType.split('.')[1].toUpperCase();
                    try {
                        const SpecificReader = Reader[`${type}Reader`];
                        resolve(new SpecificReader(data).read(filePath));
                    }
                    catch (e) {
                        return reject(e);
                    }
                }
                else {
                    throw new Error('Unknown file error');
                }
            }));
        });
    }
    static write(filePath) {
        return new Promise(resolve => resolve());
    }
}
exports.default = Celio;
//# sourceMappingURL=Celio.js.map