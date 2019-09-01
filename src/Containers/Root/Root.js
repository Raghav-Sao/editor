import React from 'react';
import { Route } from 'react-router';
import Cookie from 'js-cookie';
import Login from '../Login';
import Gallery from '../Gallery';
import EditorSpace from '../EditorSpace';

import './Root.css';

class Root extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        if (props.location.search) {
            const token = props.location.search.split('=')[1];
            if (token) {
                Cookie.set('_session', token);
                window.close();
            }
        }
    }

    render() {
        return (
            <div className="root-app-container">
                <Route path="/login" component={Login} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/editor" component={EditorSpace} />
                {/* {!isLoggedIn() ? (<Redirect to="/login" />) : <Redirect to="/gallery" />} */}
                {/*! isLoggedIn() ? (<Redirect to="/login" />) : <Redirect to="/gallery" /> */}
          </div>
        );
    }
}

export default Root;
