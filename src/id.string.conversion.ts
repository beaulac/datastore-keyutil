import { DatastoreInt } from '@google-cloud/datastore/entity';
import * as debug from 'debug';

const _DEBUG = debug('datastore-keyutil');

export type DatastoreIdLike = string | number | DatastoreInt;

export function isValidDsIntString(intstr: DatastoreIdLike): intstr is string {
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
    if (isDatastoreInt_(id)) {
        return id.value;
    }
    if (typeof id === 'string') {
        return id;
    }
    return '';
}

export function dsIdToInt(datastoreId: DatastoreIdLike = ''): number {
    if (typeof datastoreId === 'number' && Number.isSafeInteger(datastoreId)) {
        return datastoreId;
    }

    datastoreId = dsIntToIntStr(datastoreId as DatastoreInt | string);

    if (isValidDsIntString(datastoreId)) {
        const result = parseInt(dsIntToIntStr(datastoreId));
        if (isValidNumericId(result)) {
            return result;
        }
    }

    _DEBUG(`Invalid DS ID: ${datastoreId}`);
    throw Error('key.invalidDsInt');
}

function isDatastoreInt_(id: any): id is DatastoreInt {
    return (id instanceof Object) && id.value;
}

function dsIntToIntStr(datastoreInt: DatastoreInt | string): string {
    return (datastoreInt as DatastoreInt).value || datastoreInt as string;
}
