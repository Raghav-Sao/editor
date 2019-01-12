import { combineReducers } from 'redux'

import adminReducer from './AdminReducer'
import imageEditor from './ImageEditorReducer'
import editorSpace from './EditorSpaceReducer'
import galleryReducer from './GalleryReducer'
import templateReducer from 'store/Template/TemplateReducer'

export default combineReducers({
  adminReducer,
  editorSpace,
  galleryReducer,
  imageEditor,
  templateReducer,
})
