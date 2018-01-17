"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_debugging_1 = require("./key.debugging");
const key_path_elements_1 = require("./key.path.elements");
class KeyBuilder {
    constructor(datastore, errorFn) {
        this.datastore = datastore;
        this.errorFn = errorFn;
    }
    buildMixedKey(keyPath) {
        this._validateIsNonEmptyMappable(keyPath);
        return this.datastore.key(keyPath.map((e, i) => this._parseMixedPathElement(e, i)));
    }
    buildNamedKey(keyPath) {
        this._validateIsNonEmptyMappable(keyPath);
        if (keyPath.every(e => key_path_elements_1.isValidStringPathElement(e))) {
            return this.datastore.key(keyPath);
        }
        else {
            return this.errorFn('key.invalidName');
        }
    }
    buildNumericKey(keyPath) {
        this._validateIsNonEmptyMappable(keyPath);
        return this.datastore.key(keyPath.map((e, i) => this._parseNumericPathElement(e, i)));
    }
    _parseNumericPathElement(pathElement, idx) {
        if (idx % 2 === 0) {
            return pathElement;
        }
        else {
            return this._parseId(pathElement) || this.errorFn('key.invalidId', pathElement);
        }
    }
    _parseMixedPathElement(pathElement, idx) {
        return (idx % 2)
            ? this._parseIdentifier(pathElement)
            : this._parseKind(pathElement);
    }
    _validateIsNonEmptyMappable(keyPath) {
        if (!(keyPath && keyPath.length)) {
            key_debugging_1._DEBUG(`Received an empty path: ${JSON.stringify(keyPath)}`);
            return this.errorFn('key.noPath');
        }
        if (typeof keyPath.map !== 'function') {
            key_debugging_1._DEBUG(`Received an invalid path: ${JSON.stringify(keyPath)}`);
            return this.errorFn('key.invalidPath', keyPath);
        }
    }
    _parseKind(pathElement) {
        if (key_path_elements_1.isValidStringPathElement(pathElement)) {
            return pathElement;
        }
        key_debugging_1._DEBUG(`Received an invalid kind: ${JSON.stringify(pathElement)}`);
        return this.errorFn('key.invalidKind', pathElement);
    }
    _parseIdentifier(pathElement) {
        return this._parseId(pathElement) || this._parseName(pathElement);
    }
    _parseId(pathElement) {
        if (this.datastore.isInt(pathElement)) {
            key_debugging_1._DEBUG('Was passed a pre-converted datastore int: ', pathElement);
            return pathElement;
        }
        if (key_path_elements_1.isValidNumericPathElement(pathElement)) {
            return this.datastore.int(pathElement);
        }
    }
    _parseName(pathElement) {
        if (key_path_elements_1.isValidStringPathElement(pathElement)) {
            return pathElement;
        }
        key_debugging_1._DEBUG(`Received an invalid Identifier: ${pathElement}`);
        return this.errorFn('key.invalidIdentifier', pathElement);
    }
}
exports.KeyBuilder = KeyBuilder;
