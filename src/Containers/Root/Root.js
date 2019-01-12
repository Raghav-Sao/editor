
import React from 'react';
import ReactDOM from 'react-dom';
import { isLoggedIn } from '../../lib/auth';
import { Route, Redirect } from 'react-router';
import Login from '../Login';
import Gallery from '../Gallery';
import EditorSpace from '../EditorSpace';

class Root extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.children);
    }

    render() {
        return (
            <div className="root-app-container">
                <Route path="/login" component={Login} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/editor/:cardId" component={EditorSpace} />
                {!isLoggedIn() ? (<Redirect to="/login" />) : <Redirect to="/gallery" />}
            </div>
        );
    }
}

export default Root;