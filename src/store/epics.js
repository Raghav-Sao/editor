import { combineEpics } from 'redux-observable'

// import TemplateEpics from './Template/TemplateEpics'
// import EditorCardEpics from './EditorCard/EditorCardEpics'
import AuthEpics from './Auth/AuthEpics'

export default combineEpics(...AuthEpics)
