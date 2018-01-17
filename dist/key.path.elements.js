"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidIdString(intstr) {
    return /^[1-9][\d]{0,15}$/.test(intstr);
}
exports.isValidIdString = isValidIdString;
function isValidNumericId(id) {
    return Number.isSafeInteger(id) && id > 0;
}
exports.isValidNumericId = isValidNumericId;
function isValidNumericPathElement(e) {
    return (typeof e === 'string')
        ? isValidIdString(e)
        : isValidNumericId(e);
}
exports.isValidNumericPathElement = isValidNumericPathElement;
function isValidStringPathElement(e) {
    return (typeof e === 'string') && e.length > 0;
}
exports.isValidStringPathElement = isValidStringPathElement;
function idToString(id = '') {
    if (typeof id === 'number') {
        return id.toString();
    }
    if (_isDatastoreInt(id)) {
        return id.value;
    }
    return id;
}
exports.idToString = idToString;
function _isDatastoreInt(id) {
    return (id instanceof Object) && id.value;
}
