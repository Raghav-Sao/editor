import 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

// action creators
const fetchUser = username => ({ type: 'FETCH_USER', payload: username })
const fetchUserFulfilled = payload => ({ type: 'FETCH_USER_FULFILLED', payload })

// epic
export const fetchUserEpic = action$ =>
  action$.pipe(
    ofType('FETCH_USER'),
    mergeMap(action =>
      ajax
        .getJSON(`https://api.github.com/users/${action.payload}`)
        .pipe(map(response => fetchUserFulfilled(response)))
    )
  )
