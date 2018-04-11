import Datastore = require('@google-cloud/datastore');
import * as Entity from '@google-cloud/datastore/entity';
import { ObjOrPayload, ShortPayload } from '@google-cloud/datastore/entity';
import * as ub64 from 'urlsafe-base64';
import { areKeysEqual } from './areKeysEqual';
import './AugmentedDatastore';
import { base64ify, pluralize, uidify } from './higher.order.helpers';
import { DatastoreKeylike } from './isKeylike';
import { idToString } from './key.path.elements';
import { DatastoreKeyExtractable, KeyErrorThrower } from './key.types';
import { KeyBuilder } from './KeyBuilder';
import { KeyExtractor } from './KeyExtractor';
import { keyToUID } from './keyToUid';
import { defaultOptions, KeyUtilOptions } from './KeyUtilOptions';

export class KeyUtil {
    public KEY_SYMBOL = Datastore.KEY;

    private readonly keyBuilder: KeyBuilder;
    private keyExtractor: KeyExtractor;
    private readonly errorFn: KeyErrorThrower;

    constructor(private datastore: Datastore, options?: Partial<KeyUtilOptions>) {
        options = options
            ? Object.assign(defaultOptions(), options)
            : defaultOptions();

        this.errorFn = (options as KeyUtilOptions).errorFn;

        this.keyBuilder = new KeyBuilder(this.datastore, this.errorFn);
        this.keyExtractor = new KeyExtractor(this.keyBuilder, this.errorFn);

        if (options.embed) {
            (datastore as any).keyUtil = this;
            Datastore.keyUtil = this;
        }
    }

    public setKey = <T>(entity: T, key: Entity.DatastoreKey): T => {
        if (entity) {
            (entity as any)[this.KEY_SYMBOL] = key;
        }
        return entity;
    }

    /**
     * Builds MIXED keys (keys with IDs OR names).
     *
     * @param {Array.<Entity.PathElement>} keyPath - Has form [ Kind, Identifier, Kind, Identifier, ... ]
     *
     * @throws 'key.noPath' when keyPath is falsy.
     * @throws 'key.invalidPath' when keyPath is non-mappable.
     * @throws 'key.invalidIdentifier' when keyPath contains invalid ID or name.
     *
     * @returns {DatastoreKey}
     */
    public buildMixedKey = (keyPath: Entity.DatastoreKeyPath) => this.keyBuilder.buildMixedKey(keyPath);

    /**
     * Builds NUMERIC keys (keys with IDs, not names).
     * Named keys should be created with {@link buildNamedKey}.
     *
     * @param {Array.<Entity.PathElement>} keyPath - Has form [ Kind, ID, Kind, ID, ... ]
     *
     * @throws 'key.noPath' when keyPath is falsy.
     * @throws 'key.invalidPath' when keyPath is non-mappable.
     * @throws 'key.invalidId' when keyPath contains non-numeric strings.
     *
     * @returns {DatastoreKey}
     */
    public buildKey = (keyPath: Entity.DatastoreKeyPath) => this.keyBuilder.buildNumericKey(keyPath);

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
    public buildNamedKey = (keyPath: Entity.DatastoreKeyPath) => this.keyBuilder.buildNamedKey(keyPath);

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
    public coerceKeylikeToKey = (keylike: DatastoreKeylike) => this.keyExtractor.coerceKeylikeToKey(keylike);


    public allocateKeys(keyPath: Entity.DatastoreKeyPath | DatastoreKeylike,
                        count = 1): Promise<Entity.DatastoreKey | Entity.DatastoreKey[]> {
        const incompleteKey = Array.isArray(keyPath)
            ? this.buildMixedKey(keyPath)
            : this.coerceKeylikeToKey(keyPath);

        return this.datastore.allocateIds(incompleteKey, count)
                   .then(([allocatedKeys]) => count > 1 ? allocatedKeys : allocatedKeys[0]);
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
    public extractKey = (entity: DatastoreKeyExtractable) => this.keyExtractor.extractKey(entity);
    public mapToKeys = pluralize(this.extractKey);


    public extractParentKey = (entity: DatastoreKeyExtractable) => this.keyExtractor.extractParentKey(entity);
    public mapToParentKeys = pluralize(this.extractParentKey);


    public idOf = (entity: DatastoreKeyExtractable) => {
        const { id } = this.extractKey(entity);
        return idToString(id);
    }
    public mapToIDs = pluralize(this.idOf);

    public parentIdOf = (entity: DatastoreKeyExtractable) => this.idOf(this.extractParentKey(entity));
    public mapToParentIDs = pluralize(this.parentIdOf);


    public nameOf = (entity: DatastoreKeyExtractable) => {
        const { name = '' } = this.extractKey(entity);
        return name;
    }
    public mapToNames = pluralize(this.nameOf);


    public parentNameOf = (entity: DatastoreKeyExtractable) => this.nameOf(this.extractParentKey(entity));
    public mapToParentNames = pluralize(this.nameOf);


    public identifierOf = (entity: DatastoreKeyExtractable) => {
        const key = this.extractKey(entity);
        return key.name || key.id;
    }
    public mapToIdentifiers = pluralize(this.identifierOf);


    public parentIdentifierOf = (entity: DatastoreKeyExtractable) => this.identifierOf(this.extractParentKey(entity));
    public mapToParentIdentifiers = pluralize(this.identifierOf);


    /**
     * UIDs for string representations of keys
     */
    public uidFor = uidify(this.extractKey);
    public mapToUIDs = pluralize(this.uidFor);

    public parentUidFor = uidify(this.extractParentKey);
    public mapToParentUIDs = pluralize(this.parentUidFor);

    public uidToKey = (uid: string) => this.buildMixedKey(JSON.parse(uid));
    public keyToUid = keyToUID;

    /**
     * Base64 UIDs for passing around in URLs
     */
    public base64UidFor = base64ify(this.uidFor);
    public mapToBase64UIDs = pluralize(this.base64UidFor);
    public base64ParentUIDFor = base64ify(this.parentUidFor);
    public mapToBase64ParentUIDs = pluralize(this.base64ParentUIDFor);

    public base64UidToKey = (base64UID: string) => this.uidToKey(ub64.decode(base64UID).toString());

    /**
     * Key predicates
     */
    public haveSameKey = (entity: DatastoreKeyExtractable,
                          other: DatastoreKeyExtractable) => areKeysEqual(this.extractKey(entity),
                                                                          this.extractKey(other),
    )

    public hasId = (entity: DatastoreKeyExtractable, id: string) => this.idOf(entity) === id;
    public hasName = (entity: DatastoreKeyExtractable, name: string) => this.nameOf(entity) === name;


    public indexById<E extends ObjOrPayload>(entity: E | E[]): [string, E] | Array<[string, E]> {
        return Array.isArray(entity) ? entity.map(this._doIndexById) : this._doIndexById(entity);
    }

    private _doIndexById<E extends ObjOrPayload>(entity: E): [string, E] {
        return [this.idOf(entity), ((entity as ShortPayload<E>).data || entity)];
    }
}
