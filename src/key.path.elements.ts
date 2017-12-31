import { DatastoreInt } from '@google-cloud/datastore/entity';
import { DatastoreIdLike } from './key.types';


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

function _isDatastoreInt(id: any): id is DatastoreInt {
    return (id instanceof Object) && id.value;
}
