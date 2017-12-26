/// <reference types="google-cloud__datastore" />
import { DatastoreKey, DatastoreKeyPath } from '@google-cloud/datastore/entity';
export interface DatastoreKeylike extends Pick<DatastoreKey, 'kind' | 'id' | 'name'> {
    parent?: DatastoreKeylike;
    path: DatastoreKeyPath;
}
export declare function isKeylike(k: any): k is DatastoreKeylike;
