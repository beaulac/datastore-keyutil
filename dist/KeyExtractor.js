"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isKeylike_1 = require("./isKeylike");
class KeyExtractor {
    constructor(datastore, keyBuilder, errorFn) {
        this.datastore = datastore;
        this.keyBuilder = keyBuilder;
        this.errorFn = errorFn;
    }
    coerceKeylikeToKey(k) {
        return this.datastore.isKey(k)
            ? k
            : this.keyBuilder.buildMixedKey(k.path || this.errorFn('key.notKeylike', k));
    }
    extractKey(entity) {
        return isKeylike_1.isKeylike(entity)
            ? this.coerceKeylikeToKey(entity)
            : this._extractKeyFromEntity(entity);
    }
    extractPossibleKey(entity) {
        return entity ? this.extractKey(entity) : entity;
    }
    extractParentKey(entity) {
        return this._parentOf(this.extractKey(entity));
    }
    _extractKeyFromEntity(entity) {
        return entity
            ? (entity[this.datastore.KEY] || entity.key)
            : this.errorFn('key.nonExtractable', entity);
    }
    _parentOf(key) {
        return key.parent || this.errorFn('key.noParent', key);
    }
}
exports.KeyExtractor = KeyExtractor;
