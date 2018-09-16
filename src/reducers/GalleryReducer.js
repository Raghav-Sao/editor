import { COLOR, LANGUAGE } from 'actions/galleryAction'
const initialState = {
  test: 'test',
  color: {},
}
export default function reducer(state = initialState, action) {
  console.log(action.type, COLOR)
  switch (action.type) {
    case COLOR: {
      const { color } = action.payload
      return {
        ...state,
        color: { ...state.color, ...color },
      }
    }
    case LANGUAGE: {
      const { language } = action.payload
      return {
        ...state,
        language: { ...state.language, ...language },
      }
    }
    default: {
      return state
    }
  }
}
