/// <reference types="google-cloud__datastore" />
import { DatastoreKey, DatastoreKeyPath } from '@google-cloud/datastore/entity';
import { KeyErrorThrower } from './key.types';
import Datastore = require('@google-cloud/datastore');
export declare class KeyBuilder {
    private datastore;
    private errorFn;
    private dsInt;
    private isDsInt;
    constructor(datastore: Datastore, errorFn: KeyErrorThrower);
    buildMixedKey(keyPath: DatastoreKeyPath): DatastoreKey;
    buildNamedKey(keyPath: DatastoreKeyPath): DatastoreKey;
    buildNumericKey(keyPath: DatastoreKeyPath): DatastoreKey;
    private _parseNumericPathElement(pathElement, idx);
    private _parseMixedPathElement(pathElement, idx);
    private _validateIsNonEmptyMappable(keyPath);
    private _parseKind(pathElement);
    private _parseIdentifier(pathElement);
    private _parseId(pathElement);
    private _parseName(pathElement);
}
