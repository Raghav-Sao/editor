import { combineReducers } from 'redux';

import adminReducer from './AdminReducer';
import imageEditor from './ImageEditorReducer';
import editorSpace from './EditorSpaceReducer';
import galleryReducer from './GalleryReducer';
import templateReducer from 'store/Template/TemplateReducer';
import authReducer from 'store/Auth/AuthReducer';

export default combineReducers({
  adminReducer,
  editorSpace,
  galleryReducer,
  imageEditor,
  templateReducer,
  authReducer
})
