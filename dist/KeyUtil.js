"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ub64 = require("urlsafe-base64");
const areKeysEqual_1 = require("./areKeysEqual");
const higher_order_helpers_1 = require("./higher.order.helpers");
const key_path_elements_1 = require("./key.path.elements");
const KeyBuilder_1 = require("./KeyBuilder");
const KeyExtractor_1 = require("./KeyExtractor");
const KeyUtilOptions_1 = require("./KeyUtilOptions");
class KeyUtil {
    constructor(datastore, options) {
        this.datastore = datastore;
        this.KEY_SYMBOL = this.datastore.KEY;
        this.buildMixedKey = (keyPath) => this.keyBuilder.buildMixedKey(keyPath);
        this.buildKey = (keyPath) => this.keyBuilder.buildNumericKey(keyPath);
        this.buildNamedKey = (keyPath) => this.keyBuilder.buildNamedKey(keyPath);
        this.coerceKeylikeToKey = (keylike) => this.keyExtractor.coerceKeylikeToKey(keylike);
        this.extractKey = (entity) => this.keyExtractor.extractKey(entity);
        this.mapToKeys = higher_order_helpers_1.pluralize(this.extractKey);
        this.extractParentKey = (entity) => this.keyExtractor.extractParentKey(entity);
        this.mapToParentKeys = higher_order_helpers_1.pluralize(this.extractParentKey);
        this.idOf = (entity) => {
            const { id } = this.extractKey(entity);
            return key_path_elements_1.idToString(id);
        };
        this.mapToIDs = higher_order_helpers_1.pluralize(this.idOf);
        this.parentIdOf = (entity) => this.idOf(this.extractParentKey(entity));
        this.mapToParentIDs = higher_order_helpers_1.pluralize(this.parentIdOf);
        this.nameOf = (entity) => {
            const { name = '' } = this.extractKey(entity);
            return name;
        };
        this.mapToNames = higher_order_helpers_1.pluralize(this.nameOf);
        this.parentNameOf = (entity) => this.nameOf(this.extractParentKey(entity));
        this.mapToParentNames = higher_order_helpers_1.pluralize(this.nameOf);
        this.identifierOf = (entity) => {
            const key = this.extractKey(entity);
            return key.name || key.id;
        };
        this.mapToIdentifiers = higher_order_helpers_1.pluralize(this.identifierOf);
        this.parentIdentifierOf = (entity) => this.identifierOf(this.extractParentKey(entity));
        this.mapToParentIdentifiers = higher_order_helpers_1.pluralize(this.identifierOf);
        this.uidFor = higher_order_helpers_1.uidify(this.extractKey);
        this.mapToUIDs = higher_order_helpers_1.pluralize(this.uidFor);
        this.parentUidFor = higher_order_helpers_1.uidify(this.extractParentKey);
        this.mapToParentUIDs = higher_order_helpers_1.pluralize(this.parentUidFor);
        this.uidToKey = (uid) => this.buildMixedKey(JSON.parse(uid));
        this.base64UidFor = higher_order_helpers_1.base64ify(this.uidFor);
        this.mapToBase64UIDs = higher_order_helpers_1.pluralize(this.base64UidFor);
        this.base64ParentUIDFor = higher_order_helpers_1.base64ify(this.parentUidFor);
        this.mapToBase64ParentUIDs = higher_order_helpers_1.pluralize(this.base64ParentUIDFor);
        this.base64UidToKey = (base64UID) => this.uidToKey(ub64.decode(base64UID).toString());
        this.haveSameKey = (entity, other) => areKeysEqual_1.areKeysEqual(this.extractKey(entity), this.extractKey(other));
        this.hasId = (entity, id) => this.idOf(entity) === id;
        this.hasName = (entity, name) => this.nameOf(entity) === name;
        options = options
            ? Object.assign(KeyUtilOptions_1.defaultOptions(), options)
            : KeyUtilOptions_1.defaultOptions();
        this.errorFn = options.errorFn;
        this.keyBuilder = new KeyBuilder_1.KeyBuilder(this.datastore, this.errorFn);
        this.keyExtractor = new KeyExtractor_1.KeyExtractor(this.datastore, this.keyBuilder, this.errorFn);
        if (options.embed) {
            datastore.keyUtil = this;
            datastore.constructor.keyUtil = this;
        }
    }
    setKey(entity, key) {
        if (entity) {
            entity[this.KEY_SYMBOL] = key;
        }
        return entity;
    }
    allocateKeys(keyPath, count = 1) {
        const incompleteKey = Array.isArray(keyPath)
            ? this.buildMixedKey(keyPath)
            : this.coerceKeylikeToKey(keyPath);
        return this.datastore.allocateIds(incompleteKey, count)
            .then(([allocatedKeys]) => count > 1 ? allocatedKeys : allocatedKeys[0]);
    }
    indexById(entity) {
        return Array.isArray(entity) ? entity.map(this._doIndexById) : this._doIndexById(entity);
    }
    _doIndexById(entity) {
        return [this.idOf(entity), (entity.data || entity)];
    }
}
exports.KeyUtil = KeyUtil;
