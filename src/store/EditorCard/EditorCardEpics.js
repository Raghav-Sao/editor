import 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import { fetchEditorCard } from 'APIS/editorCardAPIs'

const fetchUser = username => ({ type: 'FETCH_USER', payload: username })
const fetchEditorCardFulfilled = payload => ({ type: 'FETCH_EDITOR_CARD_FULFILLED', payload })
const BASE_URL = 'http://localhost:3000'

// epic
// const fetchTemplatesEpic = action$ =>
//   action$.pipe(
//     ofType('FETCH_TEMPLATES'),
//     mergeMap(action =>

//       ajax
//         .getJSON(`${BASE_URL}/api/user/cardTemplates`)
//         .pipe(map(response => fetchTemplateFulfilled(response)))
//     )
//  )

const fetchEditorCardEpic = action$ =>
  action$.pipe(
    ofType('FETCH_EDITOR_CARD'),
    mergeMap(({ payload: { _id } }) =>
      fetchEditorCard({ _id }).pipe(map(response => fetchEditorCardFulfilled(response)))
    )
  )

export default [fetchEditorCardEpic]
