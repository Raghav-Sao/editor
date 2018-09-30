import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'

import CardEditorSpace from 'Containers/CardEditorSpace'
import './App.css'

const Root = ({ store }) => (
  <DragDropContextProvider backend={HTML5Backend}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={CardEditorSpace} />
        </Switch>
      </Router>
    </Provider>
  </DragDropContextProvider>
)

export default Root
