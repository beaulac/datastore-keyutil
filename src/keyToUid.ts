import { DatastoreKey } from '@google-cloud/datastore/entity';

/**
 * Turns a key into JSON string of its path.
 * Useful for using {@link DatastoreKey}s as Object keys.
 *
 * @param {DatastoreKey} key
 * @returns {string} - Unique string representation of key. '' if key is falsy.
 */
export function keyToUID(key?: DatastoreKey): string {
    if (key && key.kind) {
        let uid = ']';

        while (key) {
            uid = `,"${key.kind}","${key.id || key.name}"${uid}`;
            key = key.parent;
        }

        return `[${uid.slice(1)}`;
    }
    return '';
}

/**
 * Turns a key into its GQL string representation
 *
 * @param {DatastoreKey} key
 * @returns {string} - Unique string representation of key. '' if key is falsy.
 */
export function keyToGQL(key: DatastoreKey | undefined): string {
    if (key && key.kind) {
        let uid = ')';

        while (key) {
            uid = `,"${key.kind}","${key.id || key.name}"${uid}`;
            key = key.parent;
        }

        return `Key(${uid.slice(1)})`;
    }
    return '';
}
