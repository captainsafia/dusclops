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

    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['Mr. Nobody']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Mr. Nobody']
        }));
    });

    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Mr. Nobody', 'First Contact']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Mr. Nobody'},
            {type: 'VOTE', entry: 'First Contact'},
            {type: 'VOTE', entry: 'Mr. Nobody'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'Mr. Nobody'
        }));
    });
});
