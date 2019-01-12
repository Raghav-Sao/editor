import { applyMiddleware, createStore, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

import rootEpic from './epics'
import reducer from 'reducers'

const epicMiddleware = createEpicMiddleware()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancer(
    applyMiddleware(epicMiddleware)
  )
)
epicMiddleware.run(rootEpic)
store.subscribe(()=> {
  console.log(store.getState());
})
export default store
