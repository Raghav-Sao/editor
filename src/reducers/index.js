import { combineReducers } from 'redux'

import adminReducer from './AdminReducer'
import imageEditor from './ImageEditorReducer'
import editorSpace from './EditorSpaceReducer'
import galleryReducer from './GalleryReducer'

export default combineReducers({
  adminReducer,
  editorSpace,
  galleryReducer,
  imageEditor,
})
