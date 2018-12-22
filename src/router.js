import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'

import EditorSpace from 'Containers/EditorSpace'
import Gallery from 'Containers/Gallery'
import CardDetails from 'Containers/Gallery/CardDetails'
import ContentDetails from 'oldComponents/Gallery/ContentDetails'
import CardCreation from 'oldComponents/Admin/CardCreation'
import './App.css'
import './Generic.css'

const Root = ({ store }) => (
  <DragDropContextProvider backend={HTML5Backend}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={EditorSpace} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/gallery-details/:id" component={CardDetails} />
        </Switch>
      </Router>
    </Provider>
  </DragDropContextProvider>
)

export default Root
