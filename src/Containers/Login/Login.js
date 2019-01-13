
import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import authReducer from 'store/Auth/AuthReducer';
import { actionCreator } from 'store/actionCreator';
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    onClick = () => {
        console.log(actionCreator);
        this.props.dispatch(actionCreator.LOGIN_USER({ provider: 'google' }));

        // this.props.dispatch();  
    }

    render() {
        return (
            <div className="login-page">
                <button className="loginBtn loginBtn--google" onClick={this.onClick}>
                    Login with Google
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => state.authReducer;

export default connect(mapStateToProps)(Login)