"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emptyUID = '';
function keyToUID(key) {
    return (key && key.kind)
        ? `[${stringifyPath(key)}]`
        : emptyUID;
}
exports.keyToUID = keyToUID;
function keyToGQL(key) {
    return (key && key.kind)
        ? `Key(${stringifyPath(key)})`
        : emptyUID;
}
exports.keyToGQL = keyToGQL;
function stringifyPath(key) {
    let uid = emptyUID;
    while (key) {
        uid = `,"${key.kind}","${key.id || key.name}"${uid}`;
        key = key.parent;
    }
    return uid.slice(1);
}
