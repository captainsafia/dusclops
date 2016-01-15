import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {
    it('is a redux store configured with the proper reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['Mr. Nobody', 'First Contact']
        });
        expect(store.getState()).to.equal(fromJS({
            entries: ['Mr. Nobody', 'First Contact']
        }));
    });
});

        
