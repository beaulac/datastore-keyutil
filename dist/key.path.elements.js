"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_debugging_1 = require("./key.debugging");
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
function coerceDsIdToInt(datastoreId = '') {
    if (typeof datastoreId === 'number') {
        return Number.isSafeInteger(datastoreId)
            ? datastoreId
            : _invalidDsInt(datastoreId);
    }
    datastoreId = coerceDsIntToIntStr(datastoreId);
    if (isValidIdString(datastoreId)) {
        const result = parseInt(coerceDsIntToIntStr(datastoreId));
        if (isValidNumericId(result)) {
            return result;
        }
    }
    return _invalidDsInt(datastoreId);
}
exports.coerceDsIdToInt = coerceDsIdToInt;
function coerceDsIntToIntStr(datastoreInt) {
    if (typeof datastoreInt === 'string') {
        return datastoreInt;
    }
    return _isDsInt(datastoreInt) ? datastoreInt.value : _invalidDsInt(datastoreInt);
}
function _isDatastoreInt(id) {
    return (id instanceof Object) && id.value;
}
function _isDsInt(maybeDsInt) {
    return isValidIdString(maybeDsInt.value);
}
function _invalidDsInt(datastoreId) {
    key_debugging_1._DEBUG(`Invalid DS ID: ${datastoreId}`);
    throw Error('key.invalidDsInt');
}
