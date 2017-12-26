/// <reference types="google-cloud__datastore" />
import * as Datastore from '@google-cloud/datastore';
import { DatastoreKey } from '@google-cloud/datastore/entity';
import { DatastoreKeylike } from './isKeylike';
import { DatastoreKeyExtractable, KeyErrorThrower } from './key.types';
import { KeyBuilder } from './KeyBuilder';
export declare class KeyExtractor {
    private datastore;
    private keyBuilder;
    private errorFn;
    constructor(datastore: Datastore, keyBuilder: KeyBuilder, errorFn: KeyErrorThrower);
    coerceKeylikeToKey(k: DatastoreKeylike): DatastoreKey;
    extractKey(entity: DatastoreKeyExtractable): DatastoreKey;
    extractPossibleKey(entity: DatastoreKeyExtractable): DatastoreKey | undefined | null;
    extractParentKey(entity: DatastoreKeyExtractable): DatastoreKey;
    private _extractKeyFromEntity(entity);
    private _parentOf<T>(key);
}
