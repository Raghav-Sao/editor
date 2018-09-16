import { combineReducers } from 'redux'

import adminReducer from './AdminReducer'
import imageEditor from './ImageEditorReducer'
import gallery from './GalleryReducer'

export default combineReducers({
  adminReducer,
  imageEditor,
  gallery,
})
