import { DatastoreKey } from '@google-cloud/datastore/entity';

export interface DatastoreKeylike extends Pick<DatastoreKey, 'path'> {
}

export function isKeylike(k: any): k is DatastoreKeylike {
    return k && Array.isArray(k.path);
}
