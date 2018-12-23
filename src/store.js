import { applyMiddleware, createStore, compose } from 'redux'

import logger from 'redux-logger'
// import thunk from 'redux-thunk';
// import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'

export default createStore(
  reducer,
  compose(
    applyMiddleware(logger),
    composeWithDevTools()
  )
  // other store enhancers if any
)
