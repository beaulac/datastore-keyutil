import { DatastoreKey, DatastoreKeyPath } from '@google-cloud/datastore/entity';
import { DatastoreKeylike, isKeylike } from './isKeylike';
import { DatastoreKeyExtractable } from './KeyUtil';
import Datastore = require('@google-cloud/datastore');
import { KeyBuilder } from './KeyBuilder';

export class KeyExtractor {
    private KEY_SYMBOL: symbol;
    private isKey: (k: any) => boolean;
    private builder: (path: DatastoreKeyPath) => DatastoreKey;

    constructor(datastore: Datastore,
                keyBuilder: KeyBuilder,
                private errorFn: (msg: string, data?: any) => never) {
        ({KEY: this.KEY_SYMBOL} = datastore);

        const _DatastoreKey = datastore.key({path: []}).constructor;
        this.isKey = (k: any): k is DatastoreKey => k instanceof _DatastoreKey;
        this.builder = path => keyBuilder.buildMixedKey(path);
    }

    public coerceKeylikeToKey(keylike: DatastoreKeylike): DatastoreKey {
        if (this.isKey(keylike)) {
            return keylike;
        }
        if (isKeylike(keylike)) {
            return this.builder(keylike.path);
        }
        return this.errorFn('key.notKeylike', keylike);
    }

    public extractKey(entity: DatastoreKeyExtractable): DatastoreKey {
        if (!entity) {
            return entity;
        }

        const key = isKeylike(entity)
            ? entity
            : this._extractKeyFromEntity(entity);

        return this.coerceKeylikeToKey(key);
    }

    public extractParentKey(entity: DatastoreKeyExtractable): DatastoreKey {
        return this._parentOf(this.extractKey(entity));
    }

    private _extractKeyFromEntity(entity: DatastoreKeyExtractable) {
        return entity
            ? (entity[this.KEY_SYMBOL] || entity.key)
            : this.errorFn('key.nonExtractable', entity);
    }

    private _parentOf<T>(key: { parent?: T }): T {
        return key.parent || this.errorFn('key.noParent', key);
    }
}
