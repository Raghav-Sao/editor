import * as type from 'store/imageEditor/actions'
const initialState = {
	stickers: [],
	activeSticker: {},
	isBackgroundImageSelected: false,
	backgroundImage:
		'http://www.couponsaregreat.net/wp-content/uploads/2012/07/treat-two-hearts-wedding-card.png',
}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'ADD_TEXT_STICKER': {
			const textStyle = action.payload
			const id = Date.now()
			const sticker = { ...textStyle, id }
			state.activeSticker = sticker
			return {
				...state,
				stickers: [...state.stickers, sticker],
			}
			break
		}

		case 'CHANGE_BACKGRUOND_IMAGE': {
			const { backgroundImage } = action.payload
			return {
				...state,
				backgroundImage,
			}
		}

		case 'DISMISS_ALERT': {
			return {
				...state,
				showAlert: !state.showAlert,
			}
			break
		}

		case 'DELETE_STICKER': {
			const { id } = state.activeSticker
			const stickers = state.stickers.filter(s => s.id !== id)
			const activeSticker = {}
			console.log(initialState)
			return {
				...state,
				stickers,
				activeSticker,
			}
		}

		case 'RESIZE_STICKER': {
			const { id, left, diff, isLeftResize, leftDiff, topDiff } = action.payload
			const index = state.stickers.findIndex(s => s.id === id)
			const st = state.stickers[index].style
			console.log('width:', st.width, 'diff:', diff)
			let style = { width: st.width + diff, left: st.left - leftDiff, top: st.top + topDiff }
			if (isLeftResize) {
				style = {
					left: state.stickers[index].style.left - diff,
					width: state.stickers[index].style.width + diff,
				}
			}
			const sticker = {
				...state.stickers[index],
				style: {
					...state.stickers[index].style,
					...style,
				},
			}
			state.activeSticker = sticker
			return {
				...state,
				stickers: [...state.stickers.slice(0, index), sticker, ...state.stickers.slice(index + 1)],
			}
		}

		case 'MOVE_STICKER': {
			const { id: id1, style: s } = action.payload
			const index = state.stickers.findIndex(data => data.id === id1)
			const sticker = {
				...state.stickers[index],
				style: {
					...state.stickers[index].style,
					...s,
				},
			}
			state.activeSticker = sticker
			return {
				...state,
				stickers: [...state.stickers.slice(0, index), sticker, ...state.stickers.slice(index + 1)],
			}
			break
		}

		case 'ROTATE_STICKER': {
			const { id, transform } = action.payload
			const index = state.stickers.findIndex(s => s.id === id)
			const sticker = {
				...state.stickers[index],
				style: {
					...state.stickers[index].style,
					transform,
				},
			}
			state.activeSticker = sticker
			return {
				...state,
				stickers: [...state.stickers.slice(0, index), sticker, ...state.stickers.slice(index + 1)],
			}
			break
		}

		case 'CHANGE_TEXT_STICKER_STYLE': {
			debugger
			const style = action.payload.style
			const sticker = {
				...state.activeSticker,
				style: { ...state.activeSticker.style, ...style },
			}
			const index = state.stickers.findIndex(s => s.id === sticker.id)

			state.activeSticker = sticker
			return {
				...state,
				stickers: [...state.stickers.slice(0, index), sticker, ...state.stickers.slice(index + 1)],
			}
		}

		case 'ADD_IMAGE_STICKER': {
			return {
				...state,
			}
			break
		}

		case 'SET_ACTIVE_STICKER': {
			const { id } = action.payload
			if (id === null) {
				return {
					...state,
					activeSticker: {},
				}
			}
			const index = state.stickers.findIndex(s => s.id === id)
			return {
				...state,
				activeSticker: state.stickers[index],
			}
			break
		}

		case 'UPDATE_BACKGROUND_IMAGE_STATUS': {
			const { isBackgroundImageSelected } = action.payload
			return {
				...state,
				isBackgroundImageSelected,
			}
		}

		default:
			return state
	}
}
