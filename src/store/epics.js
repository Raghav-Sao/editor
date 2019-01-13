import { combineEpics } from 'redux-observable'

import TemplateEpics from './Template/TemplateEpics'
import AuthEpics from './Auth/AuthEpics'

export default combineEpics(...TemplateEpics, ...AuthEpics);
