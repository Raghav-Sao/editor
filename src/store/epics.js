import { combineEpics } from 'redux-observable'

import TemplateEpics from './Template/TemplateEpics'
import EditorCardEpics from './EditorCard/EditorCardEpics'

export default combineEpics(...TemplateEpics, ...EditorCardEpics)
