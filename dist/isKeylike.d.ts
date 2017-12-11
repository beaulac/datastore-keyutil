/// <reference types="google-cloud__datastore" />
import { DatastoreKey } from '@google-cloud/datastore/entity';
export interface DatastoreKeylike extends Pick<DatastoreKey, 'path' | 'kind' | 'id' | 'name'> {
    parent?: DatastoreKeylike;
}
export declare function isKeylike(k: any): k is DatastoreKeylike;
