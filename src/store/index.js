import { applyMiddleware, createStore, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

import rootEpic from './epics'
import reducer from 'reducers'

const epicMiddleware = createEpicMiddleware()
const store = createStore(
  reducer,
  compose(
    applyMiddleware(logger, epicMiddleware),
    composeWithDevTools()
  )
)
epicMiddleware.run(rootEpic)

export default store
