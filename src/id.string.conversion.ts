import { DatastoreInt } from '@google-cloud/datastore/entity';

export type DatastoreIdLike = string | number | DatastoreInt;

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

function isDatastoreInt_(id: any): id is DatastoreInt {
    return (id instanceof Object) && id.value;
}

export function isPositiveIntString(str: DatastoreIdLike): boolean {
    return /^\d+$/.test(str.toString());
}
