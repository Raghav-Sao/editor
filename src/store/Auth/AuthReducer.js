import { LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAILURE } from 'actions/authActions';

const initialState = {};

export default function reducer(state = initialState, { type, payload }) {
      switch (type) {
        case LOGIN_USER: {
          return {
            ...state,
            isLogging: true,
          }
        }

        case LOGIN_SUCCESS: {
          const { token } = payload
          return {
            ...state,
            isLogging: false,
            isLoggedIn: true,
            token: token,
          }
        }

        case LOGIN_FAILURE: {
          const { response } = payload
          return {
            ...state,
            isLoggedIn: false,
            isLogging: false,
            authError: payload.response.error,
          }
        }
        
        default: {
          return state
        }
      }
}
