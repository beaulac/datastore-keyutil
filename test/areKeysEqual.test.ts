import { areKeysEqual } from '../src';
import { testDatastore } from './test.support';

describe('"areKeysEqual" determines that keys ', () => {
    const keyToCompare = testDatastore.key(['one', 1, 'two', 'three']);

    it('with the same ID at all levels are equal', () => {
        const otherKey = testDatastore.key(['one', 1, 'two', 'three']);
        areKeysEqual(keyToCompare, otherKey).should.be.true;
    });

    it('with the different kind at base are unequal', () => {
        const otherKey = testDatastore.key(['one', 1, 'notTwo', 2]);
        areKeysEqual(keyToCompare, otherKey).should.be.false;
    });

    it('with the different kind at parent are unequal', () => {
        const otherKey = testDatastore.key(['notOne', 1, 'two', 2]);
        areKeysEqual(keyToCompare, otherKey).should.be.false;
    });

    it('with different IDs at the same level are unequal', () => {
        const otherKey = testDatastore.key(['one', 1, 'two', 3]);
        areKeysEqual(keyToCompare, otherKey).should.be.false;
    });

    it('with different IDs at the same level are unequal', () => {
        const otherKey = testDatastore.key(['one', 0, 'two', 2]);
        areKeysEqual(keyToCompare, otherKey).should.be.false;
    });

    it('with different IDs at different levels are unequal', () => {
        const otherKey = testDatastore.key(['one', 0, 'two', 2]);
        areKeysEqual(keyToCompare, otherKey).should.be.false;
    });

    it('where one has smaller path are unequal', () => {
        const otherKey = testDatastore.key(['two', 2]);
        areKeysEqual(keyToCompare, otherKey).should.be.false;
    });

    it('where one has larger path are unequal', () => {
        const otherKey = testDatastore.key(['zero', 0, 'one', 1, 'two', 2]);
        areKeysEqual(keyToCompare, otherKey).should.be.false;
    });
});
