import { DatastoreKey } from '@google-cloud/datastore/entity';
import eq = require('equal-but-not-falsy');

export function areKeysEqual(key: DatastoreKey | undefined,
                             otherKey: DatastoreKey | undefined): boolean {
    if (key && otherKey) {
        return eq(key.kind, otherKey.kind)
               && (eq(key.id, otherKey.id) || eq(key.name, otherKey.name))
               && areKeysEqual(key.parent, otherKey.parent);
    } else {
        return !key && !otherKey;
    }
}
