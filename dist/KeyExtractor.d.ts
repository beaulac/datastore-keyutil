/// <reference types="google-cloud__datastore" />
import { DatastoreKey } from '@google-cloud/datastore/entity';
import { DatastoreKeylike } from './isKeylike';
import { DatastoreKeyExtractable, KeyErrorThrower } from './key.types';
import { KeyBuilder } from './KeyBuilder';
import Datastore = require('@google-cloud/datastore');
export declare class KeyExtractor {
    private errorFn;
    private KEY_SYMBOL;
    private isKey;
    private builder;
    constructor(datastore: Datastore, keyBuilder: KeyBuilder, errorFn: KeyErrorThrower);
    coerceKeylikeToKey(keylike: DatastoreKeylike): DatastoreKey;
    extractKey(entity: DatastoreKeyExtractable): DatastoreKey;
    extractPossibleKey(entity: DatastoreKeyExtractable): DatastoreKey | undefined | null;
    extractParentKey(entity: DatastoreKeyExtractable): DatastoreKey;
    private _extractKeyFromEntity(entity);
    private _parentOf<T>(key);
}
