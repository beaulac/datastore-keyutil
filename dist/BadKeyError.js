"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BadKeyError extends Error {
    constructor(msg, data) {
        super(msg);
        this.data = data;
    }
}
exports.BadKeyError = BadKeyError;
function throwBadKey(msg, data) {
    throw new BadKeyError(msg, data);
}
exports.throwBadKey = throwBadKey;
