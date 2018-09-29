import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import App from './App'

const Root = ({ store }) => (
  <DragDropContextProvider backend={HTML5Backend}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
        </Switch>
      </Router>
    </Provider>
  </DragDropContextProvider>
)

export default Root
