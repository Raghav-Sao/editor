import imageStickers from 'assests/images/marriage-icons';
import { textStickers } from 'data';
import { pages } from 'Containers/Pages/data'
import * as actionType from 'store/actions';
import Sticker from '../Containers/EditorSpace/Sticker';

const initialState = {
    activeSticker: {},
    textStickers,
    imageStickers,
    activeCardIndex: 0,
    status: 'All Changes Saved',
    pages
};

const getPageItems = ({ pages = {}, pageId, stickerId } = {}) => {
    const { [pageId]: page = {} } = pages;
    const { stickers = {} } = page;
    const { [stickerId]: sticker = {} } = stickers;
    return { pages, page, stickers, sticker }
}

const EditorSpace = (state = initialState, { payload, type }) => {
    const { pages: currentPages } = state;
    switch (type) {
        case actionType.ADD_STICKER: {
            const { pageId, sticker } = payload;
            const { id: stickerId } = sticker;
            return {
                ...state,
                pages:{
                    ...state.pages,
                    [pageId]: {
                        ...state.pages[pageId],
                        stickers: {
                            ...state.pages[pageId].stickers,
                            [stickerId]: {
                                ...sticker
                            }
                        }
                       
                    }
                }
            }
        }
        case actionType.MOVE_STICKER: {
            const { stickerId, calculatedStyle, pageId } = payload;
            const { translateX, translateY } = calculatedStyle;
            const { page: currentPage, sticker: currentSticker, stickers: currentStickers } = getPageItems({ pages: currentPages, pageId, stickerId })
            const { styles, styles: { translate }} = currentSticker;
            
            const sticker = {
                ...currentSticker,
                styles: {
                    ...styles,
                    translate: {
                        translateX,
                        translateY
                    }
                }
                
            }

            const stickers = {
                ...currentStickers,
                [stickerId]: sticker
            }

            const page = {
                ...currentPage,
                stickers
            }

            const pages = {
                ...currentPages,
                [pageId]: page,
            }
            return {
                ...state,
                pages
            };
        }

        default:
            return state;
    }
};

export default EditorSpace;
