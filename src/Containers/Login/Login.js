import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import authReducer from 'store/Auth/AuthReducer';
import { actionCreator } from 'store/actionCreator';
import './Login.scss';

export const authApi = 'https://eve123.herokuapp.com/api/auth';

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    onClick = () => {
        // console.log(actionCreator);
        // this.props.dispatch(actionCreator.LOGIN_USER({ provider: 'google' }));
        // this.props.dispatch();
    };

    render() {
        return (
            <div className="login-page">
                <a target="_blank" href={`${authApi}/google/login?target_path=${window.location.href}`}>
                    <button className="loginBtn loginBtn--google" onClick={this.onClick}>
                        Login with Google
                    </button>
                </a>
            </div>
        );
    }
}

const mapStateToProps = state => state.authReducer;

export default connect(mapStateToProps)(Login);
