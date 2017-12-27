import * as Datastore from '@google-cloud/datastore';
import { DatastoreKey } from '@google-cloud/datastore/entity';
import { DatastoreKeylike, isKeylike } from './isKeylike';
import { DatastoreKeyExtractable, KeyErrorThrower } from './key.types';
import { KeyBuilder } from './KeyBuilder';

export class KeyExtractor {

    constructor(private datastore: Datastore,
                private keyBuilder: KeyBuilder,
                private errorFn: KeyErrorThrower) {
    }

    public coerceKeylikeToKey(k: DatastoreKeylike): DatastoreKey {
        return this.datastore.isKey(k)
            ? k
            : this.keyBuilder.buildMixedKey((k as DatastoreKeylike).path || this.errorFn('key.notKeylike', k));
    }

    public extractKey(entity: DatastoreKeyExtractable): DatastoreKey {
        return isKeylike(entity)
            ? this.coerceKeylikeToKey(entity)
            : this._extractKeyFromEntity(entity);
    }

    public extractPossibleKey(entity: DatastoreKeyExtractable): DatastoreKey | undefined | null {
        return entity ? this.extractKey(entity) : entity;
    }

    public extractParentKey(entity: DatastoreKeyExtractable): DatastoreKey {
        return this._parentOf(this.extractKey(entity));
    }

    private _extractKeyFromEntity(entity: DatastoreKeyExtractable) {
        return entity
            ? (entity[this.datastore.KEY] || entity.key)
            : this.errorFn('key.nonExtractable', entity);
    }

    private _parentOf<T>(key: { parent?: T }): T {
        return key.parent || this.errorFn('key.noParent', key);
    }
}
