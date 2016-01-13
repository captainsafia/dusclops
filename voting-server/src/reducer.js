import {setEntries, next, vote} from './core';

export default function reducer(state, action) {
    // A reducer executes the function described by the action object on
    // the state that is passed in
    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return vote(state, action.entry);
    }
    return state;
}
