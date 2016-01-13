import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

function getWinners(vote) {
    if (!vote) {
        return [];
    }

    const [movieA, movieB] = vote.get('pair');
    const movieAVotes = vote.getIn(['tally', movieA], 0);
    const movieBVotes = vote.getIn(['tally', movieB], 0);

    if (movieAVotes > movieBVotes) {
        return [movieA];
    } else if (movieAVotes < movieBVotes) {
        return [movieB];
    } else {
        return [movieA, movieB];
    }
}

export function next(state) {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));
    if (entries.size == 1) {
        // Why do we remove from the existing state instead of just returning a Map
        // of the winner? Well, in case we have additional data in the state that we
        // want to maintain even when returning the winner (for example, movie showing
        // date) we would like to have.
        //
        // In general, it is a good idea when building immutable apps we want to modify
        // existing state instead of creating a new one.
        return state.remove('vote').remove('entries').set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        });
    }
}

export function vote(state, entry) {
    // Pretty accessor syntax for updating a value inside a nested dictionary
    return state.updateIn(['vote', 'tally', entry], 0, tally => tally + 1);
}
