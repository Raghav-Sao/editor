import { UPLOAD_IMAGE, UPDATE_INPUT_DATA, UPDATE_PREVIEW_INDEX } from 'actions/AdminAction'
const initialState = {
  previewIndex: 0,
  images: [],
  formInput: {
    name: null,
    quantity: null,
    price: null,
    tags: null,
    type: null,
  },
}
const reducer = (state = initialState, action) => {
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
      const { previewIndex } = payload
      return {
        ...state,
        previewIndex,
      }
    }
    case UPDATE_INPUT_DATA: {
      const { name, value } = payload
      return {
        ...state,
        formInput: {
          ...state.formInput,
          [name]: value,
        },
      }
    }

    default: {
      return state
    }
  }
}
export default reducer
