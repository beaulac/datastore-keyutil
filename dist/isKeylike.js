"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isKeylike(k) {
    return k
        && k.kind
        && (k.id || k.name)
        && k.path
        && Array.isArray(k.path);
}
exports.isKeylike = isKeylike;
