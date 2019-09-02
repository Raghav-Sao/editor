import { combineReducers } from 'redux';

import templateReducer from 'store/Template/TemplateReducer';
import authReducer from 'store/Auth/AuthReducer';
import adminReducer from './AdminReducer';
import imageEditor from './ImageEditorReducer';
import editorSpace from './EditorSpaceReducer';
import editorReducer from './editorReducer';
import galleryReducer from './GalleryReducer';

export default combineReducers({
    adminReducer,
    editorSpace,
    galleryReducer,
    imageEditor,
    templateReducer,
    authReducer,
    editorReducer,
});
