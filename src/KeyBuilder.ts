import { DatastoreInt, DatastoreKey, DatastoreKeyPath } from '@google-cloud/datastore/entity';
import * as debug from 'debug';
import {
    DatastoreIdLike,
    isValidDsIntString,
    isValidNumericId,
    isValidStringPathElement
} from './id.string.conversion';
import Datastore = require('@google-cloud/datastore');

const _DEBUG = debug('datastore-keyutil');

export class KeyBuilder {
    private dsInt: (x: string | number) => DatastoreInt;
    private isDsInt: (x: any) => x is DatastoreInt;

    constructor(private datastore: Datastore,
                private errorFn: (errMsg: string, data?: any) => never) {
        const _DatastoreInt = datastore.int(0).constructor; // is there prettier way of getting this?
        this.isDsInt = (x: any): x is DatastoreInt => x instanceof _DatastoreInt;
        this.dsInt = datastore.int.bind(datastore);
    }

    public buildMixedKey(keyPath: DatastoreKeyPath): DatastoreKey {
        this._validateIsNonEmptyMappable(keyPath);

        return this.datastore.key(keyPath.map((e, i) => this._parseMixedPathElement(e, i)));
    }

    public buildNamedKey(keyPath: DatastoreKeyPath): DatastoreKey {
        this._validateIsNonEmptyMappable(keyPath);
        if (keyPath.every(e => isValidStringPathElement(e))) {
            return this.datastore.key(keyPath);
        } else {
            return this.errorFn('key.invalidName');
        }
    }

    public buildNumericKey(keyPath: DatastoreKeyPath): DatastoreKey {
        this._validateIsNonEmptyMappable(keyPath);

        return this.datastore.key(keyPath.map((e, i) => this._parsePathElement(e, i)));
    }

    private _parsePathElement(pathElement: DatastoreIdLike, idx: number): DatastoreIdLike {
        if (idx % 2 === 0) {
            return pathElement;
        } else {
            return this._parseId(pathElement) || this.errorFn('key.invalidId', pathElement);
        }
    }

    private _parseMixedPathElement(pathElement: DatastoreIdLike, idx: number): DatastoreIdLike {
        return (idx % 2)
            ? this._parseIdentifier(pathElement) || this.errorFn('key.invalidIdentifier', pathElement)
            : this._parseKind(pathElement) || this.errorFn('key.invalidKind', pathElement);
    }

    private _validateIsNonEmptyMappable(keyPath: DatastoreIdLike[]): void {
        if (!(keyPath && keyPath.length)) {
            _DEBUG(`Received an empty path: ${JSON.stringify(keyPath)}`);
            return this.errorFn('key.noPath');
        }
        if (typeof keyPath.map !== 'function') {
            _DEBUG(`Received an invalid path: ${JSON.stringify(keyPath)}`);
            return this.errorFn('key.invalidPath', keyPath);
        }
    }

    private _parseKind(pathElement: DatastoreIdLike) {
        if (isValidStringPathElement(pathElement)) {
            return pathElement;
        }
        _DEBUG(`Received an invalid kind: ${JSON.stringify(pathElement)}`);
    }

    private _parseIdentifier(pathElement: DatastoreIdLike): DatastoreIdLike | undefined {
        return this._parseId(pathElement) || this._parseName(pathElement);
    }

    private _parseId(pathElement: DatastoreIdLike): number | DatastoreInt | undefined {
        if (this.isDsInt(pathElement)) { // Guard clause, don't double-convert.
            _DEBUG('Was passed a pre-converted datastore int: ', pathElement);
            return pathElement;
        }
        if (isValidDsIntString(pathElement) || isValidNumericId(pathElement)) {
            return this.dsInt(pathElement);
        }
    }

    private _parseName(pathElement: DatastoreIdLike): string | undefined {
        if (isValidStringPathElement(pathElement)) {
            return pathElement;
        }
        _DEBUG(`Received an invalid Identifier: ${pathElement}`);
    }
}
