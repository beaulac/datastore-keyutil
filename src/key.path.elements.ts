import { DatastoreInt } from '@google-cloud/datastore/entity';
import * as debug from 'debug';

const _DEBUG = debug('datastore-keyutil');

export type DatastoreIdLike = string | number | DatastoreInt;

export function isValidIdString(intstr: DatastoreIdLike): intstr is string {
    intstr = intstr.toString();
    return /^[1-9][\d]{0,15}$/.test(intstr);
}

export function isValidNumericId(id: number) {
    return (id > 0) && (id < Number.MAX_SAFE_INTEGER);
}

export function isValidStringPathElement(e: DatastoreIdLike): e is string {
    return (typeof e === 'string') && e.length > 0;
}

export function idToString(id: DatastoreIdLike): string {
    if (typeof id === 'number') {
        return id.toString();
    }
    if (_isDatastoreInt(id)) {
        return id.value;
    }
    if (typeof id === 'string') {
        return id;
    }
    return '';
}

export function coerceDsIdToInt(datastoreId: DatastoreIdLike = ''): number {
    if (typeof datastoreId === 'number') {
        return Number.isSafeInteger(datastoreId)
            ? datastoreId
            : _invalidDsInt(datastoreId);
    }

    datastoreId = coerceDsIntToIntStr(datastoreId);

    if (isValidIdString(datastoreId)) {
        const result = parseInt(coerceDsIntToIntStr(datastoreId));
        if (isValidNumericId(result)) {
            return result;
        }
    }

    return _invalidDsInt(datastoreId);
}

function coerceDsIntToIntStr(datastoreInt: DatastoreInt | string): string {
    if (typeof datastoreInt === 'string') {
        return datastoreInt;
    }
    return _isDsInt(datastoreInt) ? datastoreInt.value : _invalidDsInt(datastoreInt);
}

function _isDatastoreInt(id: any): id is DatastoreInt {
    return (id instanceof Object) && id.value;
}

function _isDsInt(maybeDsInt: any): maybeDsInt is DatastoreInt {
    return isValidIdString(maybeDsInt.value);
}

function _invalidDsInt(datastoreId: DatastoreIdLike): never {
    _DEBUG(`Invalid DS ID: ${datastoreId}`);
    throw Error('key.invalidDsInt');
}
