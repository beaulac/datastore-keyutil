import { DatastoreInt } from '@google-cloud/datastore/entity';
import { DatastoreIdLike } from './key.types';


export function isValidIdString(intstr: string): intstr is string {
    return /^[1-9][\d]{0,15}$/.test(intstr);
}

export function isValidNumericId(id: number): id is number {
    return Number.isSafeInteger(id) && id > 0;
}

export function isValidNumericPathElement(e: string | number): boolean {
    return (typeof e === 'string')
        ? isValidIdString(e)
        : isValidNumericId(e);
}

export function isValidStringPathElement(e: DatastoreIdLike): e is string {
    return (typeof e === 'string') && e.length > 0;
}

export function idToString(id: DatastoreIdLike = ''): string {
    if (typeof id === 'number') {
        return id.toString();
    }
    if (_isDatastoreInt(id)) {
        return id.value;
    }
    return id;
}

function _isDatastoreInt(id: any): id is DatastoreInt {
    return (id instanceof Object) && id.value;
}
