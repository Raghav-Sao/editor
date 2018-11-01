const initialState = {
    activeSticker: {},
    card: [
        {
            backgroundImage:
                'https://images-na.ssl-images-amazon.com/images/I/A1zCDGS7n-L._SY879_.jpg',
            backgroundImageStyle: {},
            isBackgroundImageSelected: false,
            pageNo: 0,
            stickers: [],
            type: 'page',
        },
        {
            backgroundImage:
                'http://www.designprint.in/webfile/files/Wedding-Cards-Design-&-Print/Big/JPG/wedding-cards-design.gif',
            backgroundImageStyle: {},
            isBackgroundImageSelected: false,
            pageNo: 1,
            stickers: [],
            type: 'page',
        },
        {
            backgroundImage:
                'http://www.designprint.in/webfile/files/Wedding-Cards-Design-&-Print/Big/JPG/wedding-cards-design.gif',
            backgroundImageStyle: {},
            isBackgroundImageSelected: false,
            pageNo: 3,
            stickers: [],
            type: 'page',
        },
    ],
}
export default function reducer(state = initialState, { payload, type }) {
    switch (type) {
        // case 'ADD_TEXT_STICKER': {
        //   const { style, cardIndex } = payload
        //   const id = Date.now()
        //   const sticker = { ...style, id }
        //   const updatedTemplate = {
        //     ...state.card[cardIndex],
        //     stickers: [...state.card[cardIndex].stickers, sticker],
        //   }
        //   return {
        //     ...state,
        //     activeSticker: sticker,
        //     card: [
        //       ...state.card.slice(0, cardIndex),
        //       updatedTemplate,
        //       ...state.card.slice(cardIndex + 1),
        //     ],
        //   }
        // }

        // case 'CHANGE_BACKGRUOND_IMAGE': {
        //   const { backgroundImage } = payload
        //   return {
        //     ...state,
        //     backgroundImage,
        //   }
        // }

        // case 'CHANGE_BACKGRUOND_IMAGE_STYLE': {
        //   const { backgroundImageStyle } = payload
        //   return {
        //     ...state,
        //     backgroundImageStyle,
        //   }
        // }

        // case 'DISMISS_ALERT': {
        //   return {
        //     ...state,
        //     showAlert: !state.showAlert,
        //   }
        // }

        // case 'DELETE_STICKER': {
        //   const { id } = state.activeSticker
        //   const stickers = state.stickers.filter(s => s.id !== id)
        //   const activeSticker = {}
        //   console.log(initialState)
        //   return {
        //     ...state,
        //     stickers,
        //     activeSticker,
        //   }
        // }

        // case 'RESIZE_STICKER': {
        //   const { id, diff, leftDiff, topDiff, cardIndex } = payload
        //   const index = state.card[cardIndex].stickers.findIndex(s => s.id === id)
        //   const st = state.card[cardIndex].stickers[index].style
        //   console.log('width:', st.width, 'diff:', diff)
        //   let style = { width: st.width + diff, left: st.left - leftDiff, top: st.top + topDiff }
        //   // if (isLeftResize) {
        //   //  style = {
        //   //    left: st.left - diff,
        //   //    top: st.top - topDiff,
        //   //    width: state.stickers[index].style.width + diff,
        //   //  }
        //   // }
        //   const activeSticker = {
        //     ...state.card[cardIndex].stickers[index],
        //     style: {
        //       ...state.card[cardIndex].stickers.style,
        //       ...style,
        //     },
        //   }
        //   const updatedCard = {
        //     ...state.card[cardIndex],
        //     stickers: [
        //       ...state.card[cardIndex].stickers.slice(0, index),
        //       activeSticker,
        //       ...state.card[cardIndex].stickers.slice(index + 1),
        //     ],
        //   }
        //   return {
        //     ...state,
        //     card: [...state.card.slice(0, cardIndex), updatedCard, ...state.card.slice(cardIndex + 1)],
        //     activeSticker,
        //   }
        // }

        // case 'MOVE_STICKER': {
        //   const { id, style } = payload
        //   const index = state.stickers.findIndex(data => data.id === id)
        //   const sticker = {
        //     ...state.stickers[index],
        //     style: {
        //       ...state.stickers[index].style,
        //       ...style,
        //     },
        //   }
        //   // state.activeSticker = sticker
        //   return {
        //     ...state,
        //     stickers: [...state.stickers.slice(0, index), sticker, ...state.stickers.slice(index + 1)],
        //   }
        // }

        // case 'ROTATE_STICKER': {
        //   const { id, transform } = payload
        //   const index = state.stickers.findIndex(s => s.id === id)
        //   const sticker = {
        //     ...state.stickers[index],
        //     style: {
        //       ...state.stickers[index].style,
        //       transform,
        //     },
        //   }
        //   state.activeSticker = sticker
        //   return {
        //     ...state,
        //     stickers: [...state.stickers.slice(0, index), sticker, ...state.stickers.slice(index + 1)],
        //   }
        // }

        // case 'CHANGE_TEXT_STICKER_STYLE': {
        //   debugger
        //   const style = payload.style
        //   const sticker = {
        //     ...state.activeSticker,
        //     style: { ...state.activeSticker.style, ...style },
        //   }
        //   const index = state.stickers.findIndex(s => s.id === sticker.id)

        //   state.activeSticker = sticker
        //   return {
        //     ...state,
        //     stickers: [...state.stickers.slice(0, index), sticker, ...state.stickers.slice(index + 1)],
        //   }
        // }

        // case 'ADD_IMAGE_STICKER': {
        //   return {
        //     ...state,
        //   }
        // }

        // case 'SET_ACTIVE_STICKER': {
        //   const { id, cardIndex } = payload
        //   if (id === null) {
        //     return {
        //       ...state,
        //       activeSticker: {},
        //     }
        //   }
        //   const index = state.card[cardIndex].stickers.findIndex(s => s.id === id)
        //   console.log(index)
        //   return {
        //     ...state,
        //     activeSticker: state.card[cardIndex].stickers[index],
        //   }
        // }

        // case 'UPDATE_BACKGROUND_IMAGE_STATUS': {
        //   const { isBackgroundImageSelected, cardIndex } = payload
        //   const updatedTemplate = {
        //     ...state.card[cardIndex],
        //     isBackgroundImageSelected,
        //   }
        //   return {
        //     ...state,
        //     card: [
        //       ...state.card.slice(0, cardIndex),
        //       updatedTemplate,
        //       ...state.card.slice(cardIndex + 1),
        //     ],
        //     activeSticker: {},
        //   }
        // }

        default:
            return state
    }
}
