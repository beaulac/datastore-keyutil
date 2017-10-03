import { DatastoreKey } from '@google-cloud/datastore/entity';

export interface DatastoreKeylike extends Pick<DatastoreKey, 'path' | 'kind' | 'id' | 'name'> {
    parent?: DatastoreKeylike;
}

export function isKeylike(k: any): k is DatastoreKeylike {
    return k
           && k.kind
           && (k.id || k.name)
           && k.path
           && Array.isArray(k.path);
}
