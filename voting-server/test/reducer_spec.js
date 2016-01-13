import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Mr. Nobody']};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Mr. Nobody']
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Mr. Nobody', 'First Contact']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Mr. Nobody', 'First Contact']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Mr. Nobody', 'First Contact']
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'Mr. Nobody'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Mr. Nobody', 'First Contact'],
                tally: {'Mr. Nobody': 1}
            },
            entries: []
        }));
    });
});
