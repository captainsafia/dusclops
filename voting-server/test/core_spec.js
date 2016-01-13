import {List, Map, fromJS} from 'immutable';
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

        it('puts winner of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Mr. Nobody', 'First Contact'),
                    tally: Map({
                        'Mr. Nobody': 4,
                        'First Contact': 2
                    })
                }),
                entries: List.of('Flashdance', 'Interstellar', 'The Notebook')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Flashdance', 'Interstellar')
                }),
                entries: List.of('The Notebook', 'Mr. Nobody')
            }));
        });

        it('puts both movies from tied vote back', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Mr. Nobody', 'First Contact'),
                    tally: Map({
                        'Mr. Nobody': 3,
                        'First Contact': 3
                    })
                }),
                entries: List.of('Flashdance', 'Interstellar', 'The Notebook')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Flashdance', 'Interstellar')
                }),
                entries: List.of('The Notebook', 'Mr. Nobody', 'First Contact')
            }));
        });

        it('marks winners when just one entry is left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Mr. Nobody', 'First Contact'),
                    tally: Map({
                        'Mr. Nobody': 4,
                        'First Contact': 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'Mr. Nobody'
            }));
        });
    });


    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state =  Map({
                pair: List.of('Mr. Nobody', 'First Contact')
            });
            const nextState = vote(state, 'Mr. Nobody');
            expect(nextState).to.equal(Map({
                pair: List.of('Mr. Nobody', 'First Contact'),
                tally: Map({
                    'Mr. Nobody' : 1
                })
            }));
        });
        
        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Mr. Nobody', 'First Contact'),
                tally: Map({
                    'Mr. Nobody': 3,
                    'First Contact': 2
                })
            });
            const nextState = vote(state, 'Mr. Nobody');
            expect(nextState).to.equal(fromJS(
                {
                    pair: ['Mr. Nobody', 'First Contact'],
                    tally: {
                        'Mr. Nobody': 4,
                        'First Contact': 2
                    }
                }));
        });
    });
});
