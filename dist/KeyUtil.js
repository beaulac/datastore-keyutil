"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const areKeysEqual_1 = require("./areKeysEqual");
const higher_order_helpers_1 = require("./higher.order.helpers");
const key_path_elements_1 = require("./key.path.elements");
const KeyBuilder_1 = require("./KeyBuilder");
const KeyExtractor_1 = require("./KeyExtractor");
const keyToUid_1 = require("./keyToUid");
const KeyUtilOptions_1 = require("./KeyUtilOptions");
class KeyUtil {
    constructor(datastore, options) {
        this.datastore = datastore;
        this.KEY_SYMBOL = this.datastore.KEY;
        this.base64UidFor = higher_order_helpers_1.base64ify(this.uidFor);
        this.base64ParentUIDFor = higher_order_helpers_1.base64ify(this.parentUidFor);
        this.mapToKeys = higher_order_helpers_1.pluralize(this.extractKey, this);
        this.mapToParentKeys = higher_order_helpers_1.pluralize(this.extractParentKey, this);
        this.mapToIDs = higher_order_helpers_1.pluralize(this.idOf, this);
        this.mapToParentIDs = higher_order_helpers_1.pluralize(this.parentIdOf, this);
        this.mapToNames = higher_order_helpers_1.pluralize(this.nameOf, this);
        this.mapToParentNames = higher_order_helpers_1.pluralize(this.nameOf, this);
        this.mapToUIDs = higher_order_helpers_1.pluralize(this.uidFor, this);
        this.mapToBase64UIDs = higher_order_helpers_1.pluralize(this.base64UidFor, this);
        this.mapToParentUIDs = higher_order_helpers_1.pluralize(this.parentUidFor, this);
        this.mapToBase64ParentUIDs = higher_order_helpers_1.pluralize(this.base64ParentUIDFor, this);
        options = options
            ? Object.assign(KeyUtilOptions_1.defaultOptions(), options)
            : KeyUtilOptions_1.defaultOptions();
        this.errorFn = options.errorFn;
        this.keyBuilder = new KeyBuilder_1.KeyBuilder(this.datastore, this.errorFn);
        this.keyExtractor = new KeyExtractor_1.KeyExtractor(this.datastore, this.keyBuilder, this.errorFn);
        if (options.embed) {
            datastore.keyUtil = this;
        }
    }
    setKey(entity, key) {
        if (entity) {
            entity[this.KEY_SYMBOL] = key;
        }
        return entity;
    }
    buildMixedKey(keyPath) {
        return this.keyBuilder.buildMixedKey(keyPath);
    }
    buildKey(keyPath) {
        return this.keyBuilder.buildNumericKey(keyPath);
    }
    buildNamedKey(keyPath) {
        return this.keyBuilder.buildNamedKey(keyPath);
    }
    coerceKeylikeToKey(keylike) {
        return this.keyExtractor.coerceKeylikeToKey(keylike);
    }
    extractKey(entity) {
        return this.keyExtractor.extractKey(entity);
    }
    idOf(entity) {
        const { id = '' } = this.extractKey(entity) || {};
        return id && key_path_elements_1.idToString(id);
    }
    parentIdOf(entity) {
        return this.idOf(this.extractParentKey(entity));
    }
    ;
    nameOf(entity) {
        const { name = '' } = this.extractKey(entity) || {};
        return name;
    }
    parentNameOf(entity) {
        return this.nameOf(this.extractParentKey(entity));
    }
    uidFor(entity) {
        return keyToUid_1.keyToUID(this.extractKey(entity));
    }
    parentUidFor(entity) {
        return keyToUid_1.keyToUID(this.extractParentKey(entity));
    }
    extractParentKey(entity) {
        return this.keyExtractor.extractParentKey(entity);
    }
    uidToKey(uid) {
        return this.buildMixedKey(JSON.parse(uid));
    }
    base64UidToKey(base64Uid) {
        const decodedKey = Buffer.from(base64Uid, 'base64').toString();
        return this.uidToKey(decodedKey);
    }
    haveSameKey(entity, other) {
        return areKeysEqual_1.areKeysEqual(this.extractKey(entity), this.extractKey(other));
    }
    hasId(entity, id) {
        return this.idOf(entity) === id;
    }
    hasName(entity, name) {
        return this.nameOf(entity) === name;
    }
    indexById(entity) {
        return Array.isArray(entity) ? entity.map(this._doIndexById) : this._doIndexById(entity);
    }
    _doIndexById(entity) {
        return [this.idOf(entity), (entity.data || entity)];
    }
}
exports.KeyUtil = KeyUtil;
