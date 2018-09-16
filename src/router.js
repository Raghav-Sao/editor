import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import App from './App'
import Gallery from 'components/Gallery'
import ContentDetails from 'components/Gallery/ContentDetails'
import CardCreation from 'components/Admin/CardCreation'
import './index.css'

const Root = ({ store }) => (
  <DragDropContextProvider backend={HTML5Backend}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/gallery/details/:id" component={ContentDetails} />
          <Route exact path="/admin/card-creation" component={CardCreation} />
        </Switch>
      </Router>
    </Provider>
  </DragDropContextProvider>
)

export default Root
