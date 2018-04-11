import { DatastoreKey, KEY_SYMBOL, KeyedBySymbol } from '@google-cloud/datastore/entity';
import * as chai from 'chai';
import { KeyUtil } from '../src';
import { randomKey, randomNamedKey, testDatastore } from './test.support';

const should = chai.should();
const keySymbol: typeof KEY_SYMBOL = testDatastore.KEY;
const missingValue: any = undefined;

describe('The Key Utility', () => {
    const keyUtility = new KeyUtil(testDatastore);

    let theEntityKey: DatastoreKey;
    let namedKey: DatastoreKey;
    beforeEach(() => {
        theEntityKey = randomKey();
        namedKey = randomNamedKey();
    });

    describe('sanity check', () => {
        it('re-exports same symbol', () => {
            keyUtility.KEY_SYMBOL.should.deep.equal(testDatastore.KEY);
        });
    });

    describe('#buildKey', () => {
        it('allows numeric IDs',
           () => keyUtility.buildKey(['aKind', 123]).should.have.nested.property('path[1]', '123')
        );
        it('rejects non-numeric IDs', () =>
            (() => keyUtility.buildKey(['aKind', 'anInvalidID'])).should.throw('key.invalidId')
        );

        it('does not double convert datastore ints', () => {
            const builtKey = keyUtility.buildKey(aDsIntKeyPath());
            builtKey.should.have.nested.property('path[0]', 'aKind');
            builtKey.should.have.nested.property('path[1]', '1234');
        });
    });

    describe('#buildMixedKey', () => {
        it('allows non-numeric IDs', () => {
            keyUtility.buildMixedKey(['aKind', 'aName']).should.have.nested.property('path[1]', 'aName');
        });
        it('allows numeric IDs', () => {
            keyUtility.buildMixedKey(['aKind', 123]).should.have.nested.property('path[1]', '123');
        });
        it('does not double convert datastore ints', () => {
            const builtKey = keyUtility.buildMixedKey(aDsIntKeyPath());
            builtKey.should.have.nested.property('path[0]', 'aKind');
            builtKey.should.have.nested.property('path[1]', '1234');
        });
        it('rejects undefined path', () => {
            (() => keyUtility.buildMixedKey(undefined as any)).should.throw('key.noPath');
        });
        it('rejects invalid path structure', () => {
            (() => keyUtility.buildMixedKey({ length: 1 } as any)).should.throw('key.invalidPath');
        });
        it('rejects invalid kind', () => {
            (() => keyUtility.buildMixedKey([1, 1])).should.throw('key.invalidKind');
        });
        it('rejects empty name',
           () => (() => keyUtility.buildMixedKey(['aKind', ''])).should.throw('key.invalidIdentifier')
        );
        it('rejects undefined name',
           () => (() => keyUtility.buildMixedKey(['aKind', undefined] as any)).should.throw('key.invalidIdentifier')
        );
    });

    describe('#buildNamedKey', () => {
        it('rejects numeric IDs',
           () => (() => keyUtility.buildNamedKey(['aKind', 123])).should.throw('key.invalidName')
        );
        it('allows string IDs', () => {
            keyUtility.buildNamedKey(['aKind', 'aValidID']).should.have.nested.property('path[1]', 'aValidID');
        });
        it('rejects datastore ints', () =>
            (() => keyUtility.buildNamedKey(aDsIntKeyPath())).should.throw('key.invalidName')
        );
    });

    describe('#setKey', () => {
        it('ignores falsy objects', () => {
            const falsy = undefined;

            const objectAfterSet = keyUtility.setKey(falsy, theEntityKey);

            should.equal(objectAfterSet, falsy);
        });
    });

    describe('#extractKey', () => {
        it(
            'calls errorFn when passed undefined',
            () => {
                return (() => keyUtility.extractKey(missingValue)).should.throw(/key.nonExtractable/);
            }
        );

        it(
            'returns existing keys unchanged',
            () => keyUtility.extractKey(theEntityKey)
                            .should.deep.equal(theEntityKey)
        );

        it(
            'extracts keys from entities',
            () => keyUtility.extractKey({
                                            [keySymbol]: theEntityKey
                                        })
                            .should.deep.equal(theEntityKey)
        );
    });


    describe('#extractParentKey', () => {
        const key = testDatastore.key(['kind', 1]);
        const parent = testDatastore.key(['parentKind', 2]);
        key.parent = parent;

        it(
            'extracts parent key',
            () => keyUtility.extractParentKey({ key })
                            .should.deep.equal(parent)
        );

        it(
            'throws error when key has no parent',
            () => (() => keyUtility.extractParentKey({ key: parent })).should.throw(/key.noParent/)
        );
    });

    describe('#idOf', () => {
        it(
            'calls errorFn when passed undefined',
            () => {
                return (() => keyUtility.idOf(missingValue)).should.throw(/key.nonExtractable/);
            }
        );

        it(
            'returns id string from valid key',
            () => keyUtility.idOf({ [keySymbol]: theEntityKey })
                            .should.equal(theEntityKey.id)
        );
    });

    describe('#nameOf', () => {
        it(
            'calls errorFn when passed undefined',
            () => {
                return (() => keyUtility.nameOf(missingValue)).should.throw(/key.nonExtractable/);
            }
        );

        it(
            'returns name from named key',
            () => keyUtility.nameOf({ [keySymbol]: namedKey })
                            .should.equal(namedKey.name)
        );
    });

    describe('#identifierOf', () => {
        it(
            'calls errorFn when passed undefined',
            () => {
                return (() => keyUtility.nameOf(missingValue)).should.throw(/key.nonExtractable/);
            }
        );

        it(
            'returns name from named key',
            () => keyUtility.nameOf({ [keySymbol]: namedKey })
                            .should.equal(namedKey.name)
        );

        it(
            'returns id string from numeric key',
            () => keyUtility.idOf({ [keySymbol]: theEntityKey })
                            .should.equal(theEntityKey.id)
        );
    });

    describe('#uidFor', () => {
        it('creates a parseable UID for a key', () => {
            const keyUID = keyUtility.uidFor(theEntityKey);

            const parsedUidKey = keyUtility.uidToKey(keyUID);

            theEntityKey.path.should.deep.equal(parsedUidKey.path);
        });
    });

    describe('#base64UidFor', () => {
        it('creates a parseable base64 UID for a key', () => {
            const keyUID = keyUtility.base64UidFor(theEntityKey);

            const parsedUidKey = keyUtility.base64UidToKey(keyUID);

            theEntityKey.path.should.deep.equal(parsedUidKey.path);
        });
    });

    describe('#extractParentKey', () => {
        it('extracts parent keys from entities', () => {
            const childKey = randomKey();
            childKey.parent = theEntityKey;

            keyUtility.extractParentKey({ [keySymbol]: childKey })
                      .should.deep.equal(theEntityKey);
        });

        it('extracts parent keys from rewritten entities', () => {
            const childKey = randomKey();
            childKey.parent = theEntityKey;

            keyUtility.extractParentKey({ key: childKey })
                      .should.deep.equal(theEntityKey);
        });

        it('extracts parent keys from child keys', () => {
            const childKey = randomKey();
            childKey.parent = theEntityKey;

            keyUtility.extractParentKey(childKey)
                      .should.deep.equal(theEntityKey);
        });
    });

    describe('#extractKeys', () => {
        it('calls errorFn when passed undefined', () => {
            (() => keyUtility.mapToKeys(missingValue)).should.throw(/key.nonExtractable/);
        });

        it('extracts keys from entities', () => {
            const anEntity: KeyedBySymbol = { [keySymbol]: theEntityKey };

            const extractedKeys = keyUtility.mapToKeys([anEntity]);

            extractedKeys.should.deep.equal([theEntityKey]);
        });
    });

    describe('#allocateKeys', () => {
        it('allocates a key given a path', () => {
            const kind = 'a_kind';

            return keyUtility.allocateKeys([kind])
                             .then((key) => {
                                 key.should.have.property('kind', kind);
                                 key.should.have.property('id');
                             });
        });

        it('allocates a key given an incomplete key', () => {
            const kind = 'a_kind';

            return keyUtility.allocateKeys(testDatastore.key([kind]))
                             .then((key) => {
                                 key.should.have.property('kind', kind);
                                 key.should.have.property('id');
                             });
        });

        it('allocates keys given a path', () => {
            const kind = 'a_kind';

            return keyUtility.allocateKeys([kind], 2)
                             .then((keys: any) => {
                                 keys.should.have.lengthOf(2);

                                 keys[0].should.have.property('kind', kind);
                                 keys[0].should.have.property('id');
                                 keys[1].should.have.property('kind', kind);
                                 keys[1].should.have.property('id');
                             });
        });
        it('allocates keys given an incomplete key', () => {
            const kind = 'a_kind';

            return keyUtility.allocateKeys([kind], 2)
                             .then((keys: any) => {
                                 keys.should.have.lengthOf(2);

                                 keys[0].should.have.property('kind', kind);
                                 keys[0].should.have.property('id');
                                 keys[1].should.have.property('kind', kind);
                                 keys[1].should.have.property('id');
                             });
        });
    });

    function aDsIntKeyPath() {
        return ['aKind', testDatastore.int('1234')];
    }
});
