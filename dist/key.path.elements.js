"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidIdString(intstr) {
    intstr = intstr.toString();
    return /^[1-9][\d]{0,15}$/.test(intstr);
}
exports.isValidIdString = isValidIdString;
function isValidNumericId(id) {
    return (id > 0) && (id < Number.MAX_SAFE_INTEGER);
}
exports.isValidNumericId = isValidNumericId;
function isValidStringPathElement(e) {
    return (typeof e === 'string') && e.length > 0;
}
exports.isValidStringPathElement = isValidStringPathElement;
function idToString(id) {
    if (typeof id === 'number') {
        return id.toString();
    }
    if (_isDatastoreInt(id)) {
        return id.value;
    }
    if (typeof id === 'string') {
        return id;
    }
    return '';
}
exports.idToString = idToString;
function _isDatastoreInt(id) {
    return (id instanceof Object) && id.value;
}
