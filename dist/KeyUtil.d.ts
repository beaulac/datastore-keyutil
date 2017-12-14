/// <reference types="google-cloud__datastore" />
import * as Datastore from '@google-cloud/datastore';
import { DatastoreKey, DatastoreKeyPath } from '@google-cloud/datastore/entity';
import { DatastoreKeylike } from './isKeylike';
import { DatastoreKeyExtractable } from './key.types';
import { KeyUtilOptions } from './KeyUtilOptions';
export declare class KeyUtil {
    private datastore;
    KEY_SYMBOL: symbol;
    base64UidFor: (entity: any) => string;
    base64ParentUIDFor: (entity: any) => string;
    mapToKeys: (es: any[]) => DatastoreKey[];
    mapToParentKeys: (es: any[]) => DatastoreKey[];
    mapToIDs: (es: any[]) => string[];
    mapToParentIDs: (es: any[]) => string[];
    mapToNames: (es: any[]) => string[];
    mapToParentNames: (es: any[]) => string[];
    mapToUIDs: (es: any[]) => string[];
    mapToBase64UIDs: (es: any[]) => string[];
    mapToParentUIDs: (es: any[]) => string[];
    mapToBase64ParentUIDs: (es: any[]) => string[];
    private keyBuilder;
    private keyExtractor;
    private errorFn;
    constructor(datastore: Datastore, options?: Partial<KeyUtilOptions>);
    setKey<T>(entity: T, key: DatastoreKey): T;
    buildMixedKey(keyPath: DatastoreKeyPath): DatastoreKey;
    buildKey(keyPath: DatastoreKeyPath): DatastoreKey;
    buildNamedKey(keyPath: DatastoreKeyPath): DatastoreKey;
    coerceKeylikeToKey(keylike: DatastoreKeylike): DatastoreKey;
    allocateKeys(keyPath: DatastoreKeyPath | DatastoreKeylike, count?: number): Promise<DatastoreKey | DatastoreKey[]>;
    extractKey(entity: DatastoreKeyExtractable): DatastoreKey;
    idOf(entity: DatastoreKeyExtractable): string;
    parentIdOf(entity: DatastoreKeyExtractable): string;
    nameOf(entity: DatastoreKeyExtractable): string;
    parentNameOf(entity: DatastoreKeyExtractable): string;
    uidFor(entity: DatastoreKeyExtractable): string;
    parentUidFor(entity: DatastoreKeyExtractable): string;
    extractParentKey(entity: DatastoreKeyExtractable): DatastoreKey;
    uidToKey(uid: string): DatastoreKey;
    base64UidToKey(base64Uid: string): DatastoreKey;
    haveSameKey(entity: DatastoreKeyExtractable, other: DatastoreKeyExtractable): boolean;
    hasId(entity: DatastoreKeyExtractable, id: string): boolean;
    hasName(entity: DatastoreKeyExtractable, name: string): boolean;
    indexById<E extends DatastoreKeyExtractable>(entity: E | E[]): [string, E] | [string, E][];
    private _doIndexById<E>(entity);
}
