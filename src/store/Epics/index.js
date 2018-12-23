import { combineEpics } from 'redux-observable'

import { fetchUserEpic } from './StickerEpics'

export const rootEpic = combineEpics(fetchUserEpic)
