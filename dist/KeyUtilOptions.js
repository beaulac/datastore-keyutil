"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BadKeyError_1 = require("./BadKeyError");
function defaultOptions() {
    return {
        embed: false,
        errorFn: BadKeyError_1.throwBadKey
    };
}
exports.defaultOptions = defaultOptions;
