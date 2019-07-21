import * as types from './actions';

export const actionCreator = Object.keys(types)
    .map(type => ({
        fn: payload => ({ payload, type: types[type] }),
        type,
    }))
    .reduce((acc, item) => ({ ...acc, [item.type]: item.fn }), {});
