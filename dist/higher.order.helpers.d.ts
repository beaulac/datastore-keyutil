/// <reference types="google-cloud__datastore" />
import { DatastoreKey } from '@google-cloud/datastore/entity';
export declare type Keyifier<E = object> = (entity: E) => DatastoreKey;
export declare type Stringifier<E = object> = (entity: E) => string;
export declare const pluralize: <E, U>(fn: (e: E) => U, ctx: any) => (es: E[]) => U[];
export declare const uidFromKey: <E>(keyFn: Keyifier<E>) => Stringifier<E>;
export declare const base64ify: <E>(uidFn: Stringifier<E>) => Stringifier<E>;
