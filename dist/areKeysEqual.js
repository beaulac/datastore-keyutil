"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eq = require("equal-but-not-falsy");
function areKeysEqual(key, otherKey) {
    if (key && otherKey) {
        return eq(key.kind, otherKey.kind)
            && (eq(key.id, otherKey.id) || eq(key.name, otherKey.name))
            && areKeysEqual(key.parent, otherKey.parent);
    }
    else {
        return !key && !otherKey;
    }
}
exports.areKeysEqual = areKeysEqual;
