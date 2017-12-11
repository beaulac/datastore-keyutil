/// <reference types="google-cloud__datastore" />
import { DatastoreKey } from '@google-cloud/datastore/entity';
import { DatastoreKeylike } from './isKeylike';
export declare function keyToUID(key?: DatastoreKeylike): string;
export declare function keyToGQL(key?: DatastoreKey): string;
