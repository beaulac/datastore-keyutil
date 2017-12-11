"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isKeylike_1 = require("./isKeylike");
class KeyExtractor {
    constructor(datastore, keyBuilder, errorFn) {
        this.errorFn = errorFn;
        ({ KEY: this.KEY_SYMBOL } = datastore);
        const _DatastoreKey = datastore.key({ path: [] }).constructor;
        this.isKey = (k) => k instanceof _DatastoreKey;
        this.builder = path => keyBuilder.buildMixedKey(path);
    }
    coerceKeylikeToKey(keylike) {
        if (this.isKey(keylike)) {
            return keylike;
        }
        if (isKeylike_1.isKeylike(keylike)) {
            return this.builder(keylike.path);
        }
        return this.errorFn('key.notKeylike', keylike);
    }
    extractKey(entity) {
        const key = isKeylike_1.isKeylike(entity)
            ? entity
            : this._extractKeyFromEntity(entity);
        return this.coerceKeylikeToKey(key);
    }
    extractPossibleKey(entity) {
        return entity ? this.extractKey(entity) : entity;
    }
    extractParentKey(entity) {
        return this._parentOf(this.extractKey(entity));
    }
    _extractKeyFromEntity(entity) {
        return entity
            ? (entity[this.KEY_SYMBOL] || entity.key)
            : this.errorFn('key.nonExtractable', entity);
    }
    _parentOf(key) {
        return key.parent || this.errorFn('key.noParent', key);
    }
}
exports.KeyExtractor = KeyExtractor;
