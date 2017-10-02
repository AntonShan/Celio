"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenBasedReader_1 = require("./TokenBasedReader");
const Tokenizer_1 = require("../Tokenizer/Tokenizer");
const Exceptions_1 = require("../Exceptions");
const Disposition = {
    ModifyStar: 'ModifyStar',
    ReplaceStar: 'ReplaceStar',
    AddStar: 'AddStar'
};
class STCReader extends TokenBasedReader_1.default {
    read() {
        let result = [];
        while (this.tokenizer.nextToken() !== Tokenizer_1.TokenType.TokenEnd) {
            let newObject = {
                isStar: true,
                disposition: Disposition.AddStar,
                catalogNumber: -1,
                objectName: '',
                firstName: ''
            };
            if (this.tokenizer.getTokenType() === Tokenizer_1.TokenType.TokenName) {
                switch (this.tokenizer.getValue()) {
                    case 'Modify':
                        newObject.disposition = Disposition.ModifyStar;
                        this.tokenizer.nextToken();
                        break;
                    case 'Replace':
                        newObject.disposition = Disposition.ReplaceStar;
                        this.tokenizer.nextToken();
                        break;
                    case 'Add':
                        newObject.disposition = Disposition.AddStar;
                        this.tokenizer.nextToken();
                        break;
                }
            }
            if (this.tokenizer.getTokenType() === Tokenizer_1.TokenType.TokenName) {
                if (this.tokenizer.getValue() === 'Star') {
                    newObject.isStar = true;
                }
                else if (this.tokenizer.getValue() === 'Barycenter') {
                    newObject.isStar = false;
                }
                else {
                    throw new Exceptions_1.UnrecognizedObjectError();
                }
                this.tokenizer.nextToken();
            }
            if (this.tokenizer.getTokenType() === Tokenizer_1.TokenType.TokenNumber) {
                newObject.catalogNumber = this.tokenizer.getValue();
                this.tokenizer.nextToken();
            }
            if (this.tokenizer.getTokenType() === Tokenizer_1.TokenType.TokenString) {
                newObject.objectName = this.tokenizer.getValue();
                this.tokenizer.nextToken();
                if (newObject.objectName) {
                    newObject.firstName = newObject.objectName.split(':')[0];
                }
            }
            this.tokenizer.pushBack();
            newObject = Object.assign({}, newObject, {
                params: this.parser.readHash()
            });
            result.push(newObject);
        }
        return result;
    }
}
exports.default = STCReader;
//# sourceMappingURL=STCReader.js.map