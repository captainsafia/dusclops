import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
    describe('setEntries', () => {
        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('Mr. Nobody', 'First Contact');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Mr. Nobody', 'First Contact')
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const entries = ['Mr. Nobody', 'First Contact'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Mr. Nobody', 'First Contact')
            }));
        });
    });

    describe('next', () => {
        it('takes the next two entires under vote', () => {
            const state = Map({
                entries: List.of('Mr. Nobody', 'First Contact', 'Flashdance')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Mr. Nobody', 'First Contact')
                }),
                entries: List.of('Flashdance')
            }));
        });
    });

    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state =  Map({
                vote: Map({
                    pair: List.of('Mr. Nobody', 'First Contact')
                }),
                entries: List()
            });
            const nextState = vote(state, 'Mr. Nobody');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Mr. Nobody', 'First Contact'),
                    tally: Map({
                        'Mr. Nobody' : 1
                    })
                }),
                entries: List()
            }));
        });
        
        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Mr. Nobody', 'First Contact'),
                    tally: Map({
                        'Mr. Nobody': 3,
                        'First Contact': 2
                    })
                }),
                entries: List()
            });
            const nextState = vote(state, 'Mr. Nobody');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Mr. Nobody', 'First Contact'),
                    tally: Map({
                        'Mr. Nobody': 4,
                        'First Contact': 2
                    })
                }),
                entries: List()
            }));
        });
    });
});
