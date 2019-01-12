import { combineEpics } from 'redux-observable'

import TemplateEpics from './Template/TemplateEpics'

export default combineEpics(...TemplateEpics)
