import * as Datastore from '@google-cloud/datastore';
import { DatastoreInt, DatastoreKey, ObjOrPayload } from '@google-cloud/datastore/entity';
import * as debug from 'debug';
import { isString } from 'util';
import { areKeysEqual } from './areKeysEqual';
import { base64ify, pluralize } from './higher.order.helpers';
import { DatastoreIdLike, idToString, isPositiveIntString } from './id.string.conversion';
import { DatastoreKeylike, isKeylike } from './isKeylike';
import { keyToUID } from './keyToUid';
import { defaultOptions, KeyUtilOptions } from './KeyUtilOptions';

const _DEBUG = debug('datastore-keyutil');

export interface KeyUtilAugmentedDatastore extends Datastore {
    keyUtil: KeyUtil
}

export type DatastoreKeyExtractable<T = any> = ObjOrPayload<T> | DatastoreKey;

export class KeyUtil {
    public KEY_SYMBOL = this.datastore.KEY;

    /** Base64 UIDs for passing around in URLs */
    public base64UidFor = base64ify(this.uidFor);
    public base64ParentUIDFor = base64ify(this.parentUidFor);

    public mapToKeys = pluralize(this.extractKey, this);
    public mapToParentKeys = pluralize(this.extractParentKey, this);
    public mapToIDs = pluralize(this.idOf, this);
    public mapToParentIDs = pluralize(this.parentIdOf, this);
    public mapToNames = pluralize(this.nameOf, this);
    public mapToParentNames = pluralize(this.nameOf, this);
    public mapToUIDs = pluralize(this.uidFor, this);
    public mapToBase64UIDs = pluralize(this.base64UidFor, this);
    public mapToParentUIDs = pluralize(this.parentUidFor, this);
    public mapToBase64ParentUIDs = pluralize(this.base64ParentUIDFor, this);

    // Maybe there's a prettier way of getting a handle on these:
    private _DatastoreInteger = this.datastore.int(0).constructor;
    private isDsInt = (x: any): x is DatastoreInt => x instanceof this._DatastoreInteger;
    private _DatastoreKey = this.datastore.key({path: []}).constructor;
    private isKey = (k: any): k is DatastoreKey => k instanceof this._DatastoreKey;
    private errorFn: (msg: string, data?: any) => never;

    constructor(private datastore: Datastore, options?: KeyUtilOptions) {
        options = options
            ? Object.assign(defaultOptions(), options)
            : defaultOptions();

        this.errorFn = options.errorFn;

        if (options.embed) {
            (datastore as KeyUtilAugmentedDatastore).keyUtil = this;
        }
    }

    public setKey<T>(entity: T, key: DatastoreKey): T {
        if (entity) {
            (entity as any)[this.KEY_SYMBOL] = key;
        }
        return entity;
    }

    /**
     * Builds NUMERIC keys (keys with IDs, not names).
     * Named keys should be created with {@link buildNamedKey}.
     *
     * @param {Array.<DatastoreIdLike>} keyPath - Has form [ Kind, ID, Kind, ID, ... ]
     *
     * @throws 'key.noPath' when keyPath is falsy.
     * @throws 'key.invalidPath' when keyPath is non-mappable.
     * @throws 'key.invalidId' when keyPath contains non-numeric strings.
     *
     * @returns {DatastoreKey}
     */
    public buildKey(keyPath: DatastoreIdLike[]): DatastoreKey {
        if (!keyPath) {
            return this.errorFn('key.noPath', keyPath);
        }
        if (typeof keyPath.map !== 'function') {
            return this.errorFn('key.invalidPath', keyPath);
        }

        return this.datastore.key(keyPath.map((e, i) => this._parsePathElement(e, i)));
    }

    /**
     * Builds NAMED keys (keys with names, not IDs).
     * Numeric keys should be created with {@link buildKey}
     *
     * @param {Array.<string>} keyPath - Has form [ Kind, Name, Kind, Name, ... ]
     *
     * @throws 'key.noPath' when keyPath is falsy.
     * @throws 'key.invalidName' when keyPath contains non-string element.
     *
     * @returns {DatastoreKey}
     */
    public buildNamedKey(keyPath: string[]): DatastoreKey {
        if (!keyPath) {
            return this.errorFn('key.noPath', keyPath);
        }
        if (keyPath.every(isString)) {
            return this.datastore.key(keyPath);
        } else {
            return this.errorFn('key.invalidName');
        }
    }

    /**
     * Coerces any object (e.g. deserialized from Key JSON) to actual instance of {@link DatastoreKey}.
     * REQUIRES that the object have a valid 'path' property.
     *
     * @param {DatastoreKeylike} keylike
     *
     * @throws 'key.notKeylike' when key is falsy or has no path property.
     *
     * @returns {DatastoreKey}
     */
    public coerceKeylikeToKey(keylike: DatastoreKeylike): DatastoreKey {
        if (this.isKey(keylike)) {
            return keylike as DatastoreKey;
        }
        if (!isKeylike(keylike)) {
            return this.errorFn('key.notKeylike', keylike);
        }
        return this.buildKey(keylike.path);
    }

    /**
     * On GCDS entities, the key is hidden away as a symbol property.
     * The symbol itself is non-global, and only available on the datastore object.
     *
     * @param {DatastoreKeyExtractable} entity:
     *        - If passed an Object, extracts the datastore.KEY property
     *        - If passed a DatastorePayload, extracts the 'key' property
     *        - If passed a Key, returns it unchanged.
     *
     * @throws 'key.nonExtractable' when passed falsy value
     *
     * @returns {DatastoreKey}
     */
    public extractKey(entity: DatastoreKeyExtractable): DatastoreKey {
        if (!entity) {
            return this.errorFn('key.nonExtractable', entity);
        }
        if (this.isKey(entity)) {
            return entity;
        }
        return entity[this.KEY_SYMBOL] || entity.key;
    }

    public idOf(entity: DatastoreKeyExtractable): string {
        const {id = ''} = this.extractKey(entity) || {};
        return id && idToString(id);
    }

    public parentIdOf(entity: DatastoreKeyExtractable): string {
        return this.idOf(this.extractParentKey(entity));
    };

    public nameOf(entity: DatastoreKeyExtractable): string {
        const {name = ''} = this.extractKey(entity) || {};
        return name;
    }

    public parentNameOf(entity: DatastoreKeyExtractable): string {
        return this.nameOf(this.extractParentKey(entity));
    }

    /**
     * UIDs for string representations of keys
     */
    public uidFor(entity: DatastoreKeyExtractable): string {
        return keyToUID(this.extractKey(entity));
    }

    public parentUidFor(entity: DatastoreKeyExtractable): string {
        return keyToUID(this.extractParentKey(entity));
    }

    public extractParentKey(entity: DatastoreKeyExtractable): DatastoreKey {
        const datastoreKey = this.extractKey(entity);
        return datastoreKey.parent || this.errorFn('key.noParent', datastoreKey);
    }

    public uidToKey(uid: string): DatastoreKey {
        return this.buildKey(JSON.parse(uid));
    }

    public base64UidToKey(base64Uid: string): DatastoreKey {
        const decodedKey = Buffer.from(base64Uid, 'base64').toString();
        return this.uidToKey(decodedKey);
    }

    public haveSameKey(entity: DatastoreKeyExtractable, other: DatastoreKeyExtractable): boolean {
        return areKeysEqual(this.extractKey(entity), this.extractKey(other));
    }

    public hasId(entity: DatastoreKeyExtractable, id: string): boolean {
        return this.idOf(entity) === id;
    }

    public hasName(entity: DatastoreKeyExtractable, name: string): boolean {
        return this.nameOf(entity) === name;
    }

    public indexById<E extends DatastoreKeyExtractable>(entity: E | E[]): [string, E] | [string, E][] {
        return Array.isArray(entity) ? entity.map(this._doIndexById) : this._doIndexById(entity);
    }

    private _parsePathElement(pathElement: DatastoreIdLike, idx: number): DatastoreIdLike {
        return (idx % 2) ? this._parseId(pathElement) : pathElement;
    }

    private _parseId(pathElement: DatastoreIdLike): DatastoreInt {
        if (this.isDsInt(pathElement)) { // Guard clause, don't double-convert.
            _DEBUG('Was passed a pre-converted datastore int: ', pathElement);
            return pathElement;
        }
        if (isPositiveIntString(pathElement) || Number.isSafeInteger(pathElement as number)) {
            return this.datastore.int(pathElement);
        }
        return this.errorFn('key.invalidId', pathElement);
    }

    private _doIndexById<E extends DatastoreKeyExtractable>(entity: E): [string, E] {
        return [this.idOf(entity), (entity.data || entity)];
    }
}
