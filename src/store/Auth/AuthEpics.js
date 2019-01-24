import 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { loginUser } from 'APIS/authApis';

const loginSuccess = payload => ({ type: 'LOGIN_SUCCESS', payload });

const loginFailure = payload => ({ type: 'LOGIN_FAILURE', payload });


const loginUserEpic = action$ =>
  action$.pipe(
    ofType('LOGIN_USER'),
    mergeMap(action => loginUser(action.payload.provider).pipe(map(response => (response.status === 'success' ? loginSuccess(response) : loginFailure(response)))))
  )

export default [loginUserEpic]
