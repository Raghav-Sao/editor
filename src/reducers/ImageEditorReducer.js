const initialState = {
	stickers: [],
	selectedSticker: null,
}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'DISMISS_ALERT': {
			return {
				...state,
				showAlert: !state.showAlert,
			}
			break
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
			return {
				...state,
				stickers: [...state.stickers.slice(0, index), sticker, ...state.stickers.slice(index + 1)],
			}
		}
		case 'ADD_TEXT_STICKER': {
			const textStyle = action.payload
			const id = Date.now()
			const sticker = { ...textStyle, id }
			return {
				...state,
				stickers: [...state.stickers, sticker],
			}
			break
		}
		case 'MOVE_STICKER': {
			const { id: id1, style: s } = action.payload
			const index = state.stickers.findIndex(data => data.id === id1)
			const sticker1 = {
				...state.stickers[index],
				style: {
					...state.stickers[index].style,
					...s,
				},
			}
			return {
				...state,
				stickers: [...state.stickers.slice(0, index), sticker1, ...state.stickers.slice(index + 1)],
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
			return {
				...state,
				stickers: [...state.stickers.slice(0, index), sticker, ...state.stickers.slice(index + 1)],
			}
			break
		}
		case 'ADD_IMAGE_STICKER': {
			return {
				...state,
			}
			break
		}
		default:
			return state
	}
}
