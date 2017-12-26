import { DatastoreKey, DatastoreKeyPath } from '@google-cloud/datastore/entity';

export interface DatastoreKeylike extends Pick<DatastoreKey, 'kind' | 'id' | 'name'> {
    parent?: DatastoreKeylike;
    path: DatastoreKeyPath;
}

export function isKeylike(k: any): k is DatastoreKeylike {
    return k
           && k.kind
           && (k.id || k.name)
           && k.path
           && Array.isArray(k.path);
}
