import imageStickers from 'assests/images/marriage-icons'
import { textStickers, cards } from 'data'
import * as types from 'store/actions'

const initialState = {
  activeSticker: {},
  textStickers,
  imageStickers,
  cards,
  activeCardIndex: 0,
  status: 'All Changes Saved',
  cardCollection: {
    1234: {
      id: 1234,
      stickers: [],
    },
  }
}

const EditorSpace = (state = initialState, { payload, type }) => {
  switch (type) {
    case 'ADD_TEXT_STICKER': {
      const { sticker, cardId } = payload;
      const cardCollection = {...state.cardCollection};
      cardCollection[cardId].stickers.push(sticker);
      return {
        ...state,
        cardCollection,
      }
    }

    case 'SAVE_CARD_TO_STORE' : {
      const cardCollection = {...state.cardCollection};
      const cardId = payload.card.id;
      cardCollection[cardId] = payload.card;
      return {
        ...state,
        cardCollection,
      }
    }

    case 'UPDATE_CARD_STICKER_ID': {
      const { tempId, _id } = payload
      const { cardIndex } = state.activeSticker
      const stickers = state.cards[cardIndex].stickers
      const updatedStickers = stickers.map(sticker => {
        if (sticker.tempId === tempId) {
          return { ...sticker, _id, tempId: undefined }
        }
        return sticker
      })
      const updatedTemplate = {
        ...state.cards[cardIndex],
        stickers: updatedStickers,
      }
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, cardIndex),
          updatedTemplate,
          ...state.cards.slice(cardIndex + 1),
        ],
      }
    }

    case 'MOVE_STICKER': {
      const { _id, translate, cardIndex, boundingRect } = payload
      const stickers = state.cards[cardIndex].stickers
      const index = stickers.findIndex(({ _id: stickerId }) => stickerId === _id)
      const sticker = {
        ...stickers[index],
        styles: {
          ...stickers[index].styles,
          translate,
        },
        boundingRect,
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
        activeCardIndex: cardIndex,
      }
    }

    case types.ON_INPUT_TEXT_CHANGE: {
      const { innerText: resource } = payload
      const { cardIndex } = state.activeSticker
      const stickers = state.cards[cardIndex].stickers
      const index = stickers.findIndex(
        ({ _id: stickerId }) => stickerId === state.activeSticker._id
      )
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
      const { _id, diff, leftDiff, topDiff, cardIndex, boundingRect } = payload,
        card = state.cards[cardIndex],
        { stickers } = card,
        index = stickers.findIndex(({ _id: stickerId }) => stickerId === _id),
        sticker = stickers[index],
        {
          styles: {
            position: { left, top },
            width,
          },
        } = sticker,
        styles = {
          ...sticker.styles,
          width: width + diff,
          position: {
            left: left - leftDiff,
            top: top + topDiff,
          },
        },
        activeSticker = {
          ...sticker,
          styles,
          boundingRect,
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
      const { _id, rotation, cardIndex, boundingRect } = payload,
        card = state.cards[cardIndex],
        { stickers } = card,
        index = stickers.findIndex(({ _id: stickerId }) => stickerId === _id),
        sticker = stickers[index],
        styles = {
          ...sticker.styles,
          rotation: {
            unit: 'deg',
            rotation,
          },
        },
        activeSticker = {
          ...sticker,
          styles,
          boundingRect,
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
      const { _id, cardIndex } = payload
      if (_id === null) {
        return {
          ...state,
          activeSticker: {},
        }
      }
      const index = state.cards[cardIndex].stickers.findIndex(s => s._id === _id)
      return {
        ...state,
        activeSticker: { ...state.cards[cardIndex].stickers[index], cardIndex },
      }
      return state
    }

    case 'UPDATE_BACKGROUND_IMAGE_STATUS': {
      // const { isBackgroundImageSelected = false, cardIndex } = payload
      // const updatedTemplate = {
      //   ...state.cards[cardIndex],
      //   isBackgroundImageSelected,
      // }
      return {
        ...state,
        // cards: [
        //   ...state.cards.slice(0, cardIndex),
        //   updatedTemplate,
        //   ...state.cards.slice(cardIndex + 1),
        // ],
        activeSticker: {},
      }
    }

    case 'SET_BACKGROUND_IMAGE_STYLE': {
      const { cardIndex, height, width, boundingRect } = payload
      // if (height === 0) return state
      const background = state.cards[cardIndex].background
      const updatedTemplate = {
        ...state.cards[cardIndex],
        background: {
          ...background,
          styles: {
            width,
            height,
          },
          boundingRect,
        },
      }
      console.log(updatedTemplate)
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, cardIndex),
          updatedTemplate,
          ...state.cards.slice(cardIndex + 1),
        ],
      }
    }

    case types.UNDO_CHANGES:
    case types.REDO_CHANGES: {
      const { newState } = payload
      return {
        ...state,
        ...newState,
      }
    }

    case 'FETCH_EDITOR_CARD_FULFILLED': {
      const { owner, baseTemplate, pages } = payload

      const cards = [...payload]
      return {
        ...state,
        cards: [...pages],
      }
    }

    case types.UPDATE_EDITOR_DATA_SYNC_STATUS: {
      const { status } = payload
      return {
        ...state,
        status,
      }
    }

    default:
      return state
  }
}

export default EditorSpace
