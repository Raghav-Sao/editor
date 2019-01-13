import 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { fetchTemplates } from 'APIS/templateAPIs';

const fetchUser = username => ({ type: 'FETCH_USER', payload: username });
const fetchTemplateFulfilled = payload => ({ type: 'FETCH_TEMPLATES_FULFILLED', payload });
const BASE_URL = 'http://localhost:3000';

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

const fetchTemplatesEpic = action$ =>
  action$.pipe(
    ofType('FETCH_TEMPLATES'),
    mergeMap(action => fetchTemplates().pipe(map(response => fetchTemplateFulfilled(response))))
  )

export default [fetchTemplatesEpic]
