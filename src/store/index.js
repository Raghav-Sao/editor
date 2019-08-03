import { applyMiddleware, createStore, compose } from 'redux';
import { actionCreator } from 'store/actionCreator';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Observable, timer } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap, throttleTime, debounce, filter } from 'rxjs/operators';

import logger from 'redux-logger';

import reducer from 'reducers';
import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancer(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);

let currStore = null;
function getState$(store) {
    return new Observable(function(observer) {
        const unsubscribe = store.subscribe(function() {
            const prevStore = currStore;
            currStore = store.getState().editorSpace;
            if (prevStore && prevStore !== currStore) {
                observer.next(store.getState().editorSpace);
            }
        });
        return unsubscribe;
    });
}

const state$ = getState$(store);
const evenCounter$ = state$.pipe(debounce(() => timer(1000)));
// evenCounter$.subscribe(editorSpaceReducer => {
//     const {
//         activeCardIndex,
//         cards: { [activeCardIndex]: card },
//     } = editorSpaceReducer;
//     console.log(activeCardIndex, card);
//     // store.dispatch(actionCreator.SAVE_EDITOR_CARD_TO_SERVER({ card }));
// });

export default store;
