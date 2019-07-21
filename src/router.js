import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import Root from 'Containers/Root';

import './App.css';
import './Generic.css';

const Routes = ({ store }) => (
  <DragDropContextProvider backend={HTML5Backend}>
      <Provider store={store}>
            <Router>
          <Route path="/" component={Root} />
        </Router>
    </Provider>
    </DragDropContextProvider>
);

export default Routes;
