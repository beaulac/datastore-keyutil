import { DatastoreKey } from '@google-cloud/datastore/entity';
import { DatastoreKeylike } from './isKeylike';

function _printPath(key?: DatastoreKeylike): string {
    let uid = '';

    while (key) {
        uid = `,"${key.kind}","${key.id || key.name}"${uid}`;
        key = key.parent;
    }

    return uid;
}

/**
 * Turns a key into JSON string of its path.
 * Useful for using {@link DatastoreKey}s as Object keys.
 *
 * @param {DatastoreKey} key
 * @returns {string} - Unique string representation of key. '' if key is falsy.
 */
export function keyToUID(key?: DatastoreKeylike): string {
    return (key && key.kind)
        ? `[${_printPath(key).slice(1)}]`
        : '';
}

/**
 * Turns a key into its GQL string representation
 *
 * @param {DatastoreKey} key
 * @returns {string} - Unique string representation of key. '' if key is falsy.
 */
export function keyToGQL(key?: DatastoreKey): string {
    return (key && key.kind)
        ? `Key(${_printPath(key).slice(1)})`
        : '';
}
