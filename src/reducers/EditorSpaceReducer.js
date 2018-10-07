import imageStickers from 'assests/images/marriage-icons'
import { textStickers, cards } from 'data'
import * as types from 'store/actions'

const initialState = {
  activeSticker: {},
  textStickers,
  imageStickers,
  cards,
}

const EditorSpace = (state = initialState, { payload, type }) => {
  switch (type) {
    case 'ADD_TEXT_STICKER': {
      const { sticker, cardIndex } = payload
      const id = Date.now()
      const updatedTemplate = {
        ...state.cards[cardIndex],
        stickers: [...state.cards[cardIndex].stickers, { ...sticker, id }],
      }
      return {
        ...state,
        activeSticker: { ...sticker, cardIndex },
        cards: [
          ...state.cards.slice(0, cardIndex),
          updatedTemplate,
          ...state.cards.slice(cardIndex + 1),
        ],
      }
    }

    case 'CHANGE_TEXT_STICKER_STYLE': {
      const { id, style } = payload
      const { cardIndex } = state.activeSticker
      const stickers = state.cards[cardIndex].stickers
      const index = stickers.findIndex(({ id: stickerId }) => stickerId === state.activeSticker.id)
      const sticker = {
        ...stickers[index],
        style: {
          ...stickers[index].style,
          ...style,
        },
      }
      const updatedTemplate = {
        ...state.cards[cardIndex],
        stickers: [...stickers.slice(0, index), sticker, ...stickers.slice(index + 1)],
      }
      return {
        ...state,
        activeSticker: { ...sticker, cardIndex },
        cards: [
          ...state.cards.slice(0, cardIndex),
          updatedTemplate,
          ...state.cards.slice(cardIndex + 1),
        ],
      }
    }

    case 'DELETE_STICKER': {
      const { id, cardIndex } = payload
      const stickers = state.cards[cardIndex].stickers
      const index = stickers.findIndex(({ id: stickerId }) => stickerId === state.activeSticker.id)
      const updatedTemplate = {
        ...state.cards[cardIndex],
        stickers: [...stickers.slice(0, index), ...stickers.slice(index + 1)],
      }
      return {
        ...state,
        activeSticker: {},
        cards: [
          ...state.cards.slice(0, cardIndex),
          updatedTemplate,
          ...state.cards.slice(cardIndex + 1),
        ],
      }
    }

    case 'MOVE_STICKER': {
      const { id, translate, cardIndex } = payload
      const stickers = state.cards[cardIndex].stickers
      const index = stickers.findIndex(({ id: stickerId }) => stickerId === id)
      const sticker = {
        ...stickers[index],
        style: {
          ...stickers[index].style,
          translate,
        },
      }
      const updatedTemplate = {
        ...state.cards[cardIndex],
        stickers: [...stickers.slice(0, index), sticker, ...stickers.slice(index + 1)],
      }
      console.log(updatedTemplate)
      return {
        ...state,
        activeSticker: { ...sticker, cardIndex },
        cards: [
          ...state.cards.slice(0, cardIndex),
          updatedTemplate,
          ...state.cards.slice(cardIndex + 1),
        ],
      }
    }

    case types.ON_INPUT_TEXT_CHANGE: {
      const { innerText: resource } = payload
      const { cardIndex } = state.activeSticker
      const stickers = state.cards[cardIndex].stickers
      const index = stickers.findIndex(({ id: stickerId }) => stickerId === state.activeSticker.id)
      const sticker = {
        ...stickers[index],
        resource,
      }
      const updatedTemplate = {
        ...state.cards[cardIndex],
        stickers: [...stickers.slice(0, index), sticker, ...stickers.slice(index + 1)],
      }
      return {
        ...state,
        activeSticker: { ...sticker, cardIndex },
        cards: [
          ...state.cards.slice(0, cardIndex),
          updatedTemplate,
          ...state.cards.slice(cardIndex + 1),
        ],
      }
    }

    case 'RESIZE_STICKER': {
      const { id, diff, leftDiff, topDiff, cardIndex } = payload,
        card = state.cards[cardIndex],
        { stickers } = card,
        index = stickers.findIndex(({ id: stickerId }) => stickerId === id),
        sticker = stickers[index],
        {
          style: {
            position: { left, top },
            width,
          },
        } = sticker,
        style = {
          ...sticker.style,
          width: width + diff,
          position: {
            left: left - leftDiff,
            top: top + topDiff,
          },
        },
        activeSticker = {
          ...sticker,
          style,
        },
        updatedCard = {
          ...card,
          stickers: [...stickers.slice(0, index), activeSticker, ...stickers.slice(index + 1)],
        }
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, cardIndex),
          updatedCard,
          ...state.cards.slice(cardIndex + 1),
        ],
        activeSticker: { ...sticker, cardIndex },
      }
    }

    case 'ROTATE_STICKER': {
      const { id, rotation, cardIndex } = payload,
        card = state.cards[cardIndex],
        { stickers } = card,
        index = stickers.findIndex(({ id: stickerId }) => stickerId === id),
        sticker = stickers[index],
        style = {
          ...sticker.style,
          rotation: {
            unit: 'rad',
            rotation,
          },
        },
        activeSticker = {
          ...sticker,
          style,
        },
        updatedCard = {
          ...card,
          stickers: [...stickers.slice(0, index), activeSticker, ...stickers.slice(index + 1)],
        }
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, cardIndex),
          updatedCard,
          ...state.cards.slice(cardIndex + 1),
        ],
        activeSticker: { ...sticker, cardIndex },
      }
    }

    case 'SET_ACTIVE_STICKER': {
      const { id, cardIndex } = payload
      if (id === null) {
        return {
          ...state,
          activeSticker: {},
        }
      }
      // const index = state.card[cardIndex].stickers.findIndex(s => s.id === id)
      // console.log(index)
      // return {
      //   ...state,
      //   activeSticker: state.card[cardIndex].stickers[index],
      // }
      return state
    }

    // case 'UPDATE_BACKGROUND_IMAGE_STATUS': {
    //   return {
    //     ...state,
    //     activeSticker: {},
    //   }
    // }

    default:
      return state
  }
}

export default EditorSpace