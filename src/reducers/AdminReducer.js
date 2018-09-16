import { UPLOAD_IMAGE, UPDATE_PREVIEW_INDEX } from 'actions/AdminAction'
const initialState = {
  previewIndex: 0,
  images: [],
}
const reducer = (state = initialState, action) => {
  console.log(action)
  const { payload, type } = action
  switch (type) {
    case UPLOAD_IMAGE: {
      const { dataURI } = payload
      return {
        ...state,
        images: [...state.images, ...dataURI],
      }
    }
    case UPDATE_PREVIEW_INDEX: {
      debugger
      const { previewIndex } = payload
      return {
        ...state,
        previewIndex,
      }
    }

    default: {
      return state
    }
  }
}
export default reducer
