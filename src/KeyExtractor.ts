import Datastore = require('@google-cloud/datastore');
import { DatastoreKey, KeyedByProperty, KeyedBySymbol } from '@google-cloud/datastore/entity';
import { DatastoreKeylike, isKeylike } from './isKeylike';
import { DatastoreKeyExtractable, KeyedEntity, KeyErrorThrower } from './key.types';
import { KeyBuilder } from './KeyBuilder';

export class KeyExtractor {

    constructor(private keyBuilder: KeyBuilder,
                private errorFn: KeyErrorThrower) {
    }

    public coerceKeylikeToKey(k: DatastoreKeylike): DatastoreKey {
        return Datastore.isKey(k)
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

    private _extractKeyFromEntity(entity: KeyedEntity) {
        return entity
            ? ((entity as KeyedBySymbol)[Datastore.KEY] || (entity as KeyedByProperty).key)
            : this.errorFn('key.nonExtractable', entity);
    }

    private _parentOf<T>(key: { parent?: T }): T {
        return key.parent || this.errorFn('key.noParent', key);
    }
}
