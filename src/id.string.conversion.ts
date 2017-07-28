import { DatastoreInt } from '@google-cloud/datastore/entity';
import { isNumber, isObject, isString } from 'util';

const isPositiveAndNumeric = (numstr: string) => /^\d+$/.test(numstr);

export type DatastoreIdLike = string | number | DatastoreInt;

export function idToString(id: DatastoreIdLike): string {
    if (isNumber(id)) {
        return Number.prototype.toString.call(id);
    }
    if (isDatastoreInt_(id)) {
        return id.value;
    }
    if (isString(id)) {
        return id;
    }
    return '';
}

function isDatastoreInt_(id: any): id is DatastoreInt {
    return isObject(id) && id.value;
}

export function isPositiveIntString(str: DatastoreIdLike): boolean {
    return isString(str) && isPositiveAndNumeric(str);
}
