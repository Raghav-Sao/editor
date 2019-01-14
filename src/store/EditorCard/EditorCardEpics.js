import 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import * as editorAPIs from 'APIS/editorCardAPIs'
import {
  FETCH_EDITOR_CARD,
  FETCH_EDITOR_CARD_FULFILLED,
  SAVE_EDITOR_CARD_TO_SERVER,
} from './EditorCardActions'

const fetchEditorCardFulfilled = payload => ({ type: FETCH_EDITOR_CARD_FULFILLED, payload })
const updateEditorSyncStatus = payload => ({ type: 'UPDATE_EDITOR_DATA_SYNC_STATUS', payload })
const BASE_URL = 'http://localhost:3000'

const fetchEditorCardEpic = action$ =>
  action$.pipe(
    ofType(FETCH_EDITOR_CARD),
    mergeMap(({ payload: { _id } }) =>
      editorAPIs.fetchEditorCard({ _id }).pipe(map(response => fetchEditorCardFulfilled(response)))
    )
  )

const saveEditorCardToServerEpic = action$ =>
  action$.pipe(
    ofType(SAVE_EDITOR_CARD_TO_SERVER),
    mergeMap(({ payload: { card } }) =>
      editorAPIs
        .updateEditorCard({ card })
        .pipe(map(response => updateEditorSyncStatus({ status: 'done' })))
    )
  )

export default [fetchEditorCardEpic, saveEditorCardToServerEpic]
