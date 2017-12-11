import { DatastoreIdLike } from './key.types';
export declare function encodeDsId(datastoreId: DatastoreIdLike): string;
export declare function decodeDsId(encodedId: string): number;
