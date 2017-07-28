import { DatastoreInt, DatastoreKey } from '@google-cloud/datastore/entity';

import * as debug from 'debug';
import { isString } from 'util';
import { DatastoreIdLike, isPositiveIntString } from './id.string.conversion';
import Datastore = require('@google-cloud/datastore');

const _DEBUG = debug('datastore-keyutil');

export class KeyBuilder {
    private dsInt: (x: string | number) => DatastoreInt;
    private isDsInt: (x: any) => x is DatastoreInt;

    constructor(private datastore: Datastore,
                private errorFn: (msg: string, data?: any) => never) {
        const _DatastoreInt = datastore.int(0).constructor; // is there prettier way of getting this?
        this.isDsInt = (x: any): x is DatastoreInt => x instanceof _DatastoreInt;
        this.dsInt = datastore.int.bind(datastore);
    }

    // TODO
    // public buildMixedKey(keyPath: string[]): DatastoreKey {
    //
    // }

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

    public buildNumericKey(keyPath: DatastoreIdLike[]): DatastoreKey {
        if (!keyPath) {
            return this.errorFn('key.noPath', keyPath);
        }
        if (typeof keyPath.map !== 'function') {
            return this.errorFn('key.invalidPath', keyPath);
        }

        return this.datastore.key(keyPath.map((e, i) => this._parsePathElement(e, i)));
    }

    private _parsePathElement(pathElement: DatastoreIdLike, idx: number): DatastoreIdLike {
        return (idx % 2)
            ? this._parseId(pathElement) || this.errorFn('key.invalidId', pathElement)
            : pathElement;
    }

    private _parseId(pathElement: DatastoreIdLike): DatastoreInt | undefined {
        if (this.isDsInt(pathElement)) { // Guard clause, don't double-convert.
            _DEBUG('Was passed a pre-converted datastore int: ', pathElement);
            return pathElement;
        }
        if (isPositiveIntString(pathElement)
            || Number.isSafeInteger(Number.parseInt({}.toString.call(pathElement)))) {
            return this.dsInt(pathElement);
        }
    }
}
