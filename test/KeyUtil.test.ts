import * as chai from 'chai';
import { KeyUtil } from '../src/KeyUtil';
import { randomKey, testDatastore } from './test.support';
import { DatastoreKey } from '@google-cloud/datastore/entity';

const should = chai.should();
const KEY_SYMBOL = testDatastore.KEY;

describe('The Key Utility', function () {
    const keyUtility = new KeyUtil(testDatastore);

    let theEntityKey: DatastoreKey;
    beforeEach(() => theEntityKey = randomKey());

    describe('sanity check', () => {
        it('re-exports same symbol', () => {
            keyUtility.KEY_SYMBOL.should.deep.equal(testDatastore.KEY);
        });
    });

    describe('#buildKey', () => {
        it('rejects non-numeric IDs', () => {
            (() => keyUtility.buildKey(['aKind', 'anInvalidID'])).should.throw('key.invalidId');
        });

        it('does not double convert datastore ints', () => {
            const builtKey = keyUtility.buildKey(['aKind', testDatastore.int('1234')]);
            builtKey.should.have.nested.property('path[0]', 'aKind');
            builtKey.should.have.nested.property('path[1]', '1234');
        });
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
                return (() => keyUtility.extractKey(undefined)).should.throw(/key.nonExtractable/);
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
                                            [KEY_SYMBOL]: theEntityKey
                                        })
                            .should.deep.equal(theEntityKey)
        );
    });


    describe('#uidFor', () => {
        it('creates a parseable UID for a key', () => {
            const keyUID = keyUtility.uidFor(theEntityKey);

            const parsedUidKey = keyUtility.uidToKey(keyUID);

            theEntityKey.path.should.deep.equal(parsedUidKey.path);
        });
    });

    describe('#extractParentKey', () => {
        it('extracts parent keys from entities', () => {
            const childKey = randomKey();
            childKey.parent = theEntityKey;

            keyUtility.extractParentKey({[KEY_SYMBOL]: childKey})
                      .should.deep.equal(theEntityKey);
        });

        it('extracts parent keys from rewritten entities', () => {
            const childKey = randomKey();
            childKey.parent = theEntityKey;

            keyUtility.extractParentKey({key: childKey})
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
            (() => keyUtility.mapToKeys(undefined as any as any[])).should.throw(/key.nonExtractable/);
        });

        it('extracts keys from entities', () => {
            let anEntity = {[KEY_SYMBOL]: theEntityKey};

            const extractedKeys = keyUtility.mapToKeys([anEntity]);

            extractedKeys.should.deep.equal([theEntityKey]);
        });
    });
});
