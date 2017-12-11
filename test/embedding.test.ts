import * as Datastore from '@google-cloud/datastore';
import { KeyUtil, KeyUtilAugmentedDatastore } from '../src';
import { FakeDatastore } from './test.support';

describe('Key Utility Embedding', function () {

    it('embeds on the prototype', function () {
        const fakeDS = new FakeDatastore();
        const keyUtil = new KeyUtil(fakeDS as any as Datastore, { embed: true });

        (fakeDS as any as KeyUtilAugmentedDatastore).keyUtil.should.deep.equal(keyUtil);
    });

    it('embeds on the namespace', function () {
        const fakeDS = new FakeDatastore();
        const keyUtil = new KeyUtil(fakeDS as any as Datastore, { embed: true });

        (FakeDatastore as any as KeyUtilAugmentedDatastore).keyUtil.should.deep.equal(keyUtil);
    });
});
