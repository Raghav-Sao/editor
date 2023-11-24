import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import Root from 'Containers/Root';

import './App.scss';
import './Generic.css';

const Routes = props => {
    const { store } = props;
    return (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <Router>
                    <Route path="/" component={Root} />
                </Router>
            </DndProvider>
        </Provider>
    );
};

export default Routes;
