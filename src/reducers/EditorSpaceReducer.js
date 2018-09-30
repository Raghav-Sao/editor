import imageStickers from 'assests/images/marriage-icons'
import { textStickers } from 'data'
const initialState = {
  textStickers,
  imageStickers,
}

const EditorSpace = (state = initialState, { payload, type }) => {
  switch (type) {
    default:
      return state
  }
}

export default EditorSpace
