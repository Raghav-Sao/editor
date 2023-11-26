import imageStickers from 'assests/images/marriage-icons';
import { textStickers } from 'data';
import { pages } from 'Containers/Pages/data';
import * as actionType from 'store/actions';

const initialState = {
    activeSticker: {},
    textStickers,
    imageStickers,
    activePageId: null,
    status: 'All Changes Saved',
    pages,
};

const getPageItems = ({ pages = {}, pageId, stickerId } = {}) => {
    const { [pageId]: page = {} } = pages;
    const { stickers = {} } = page;
    const { [stickerId]: sticker = {} } = stickers;
    return { pages, page, stickers, sticker };
};

const EditorSpace = (state = initialState, { payload, type }) => {
    const { pages: currentPages } = state;
    switch (type) {
        case actionType.ADD_STICKER: {
            const { pageId, sticker } = payload;
            const { id: stickerId } = sticker;
            return {
                ...state,
                activePageId: pageId,
                activeSticker: sticker,
                pages: {
                    ...state.pages,
                    [pageId]: {
                        ...state.pages[pageId],
                        stickers: {
                            ...state.pages[pageId].stickers,
                            [stickerId]: {
                                ...sticker,
                            },
                        },
                    },
                },
            };
        }
        case actionType.UPDATE_STICKER: {
            const { id: stickerId, calculatedStyle, pageId } = payload;
            const { page: currentPage, sticker: currentSticker, stickers: currentStickers } = getPageItems({
                pages: currentPages,
                pageId,
                stickerId,
            });
            debugger
            const sticker = {
                ...currentSticker,
                styles: {
                    ...currentSticker.styles,
                    ...calculatedStyle
                },
            };

            const stickers = {
                ...currentStickers,
                [stickerId]: sticker,
            };

            const page = {
                ...currentPage,
                stickers,
            };

            const pages = {
                ...currentPages,
                [pageId]: page,
            };
            debugger
            return {
                ...state,
                pages,
                activeSticker: sticker
            };
        }
        case actionType.UPDATE_STICKER_TEXT: {
            debugger
            const { stickerId, text: resource, pageId } = payload;
            const { page: currentPage, sticker: currentSticker, stickers: currentStickers } = getPageItems({
                pages: currentPages,
                pageId,
                stickerId,
            });
            const sticker = {
                ...currentSticker,
                resource,
            };

            const stickers = {
                ...currentStickers,
                [stickerId]: sticker,
            };

            const page = {
                ...currentPage,
                stickers,
            };

            const pages = {
                ...currentPages,
                [pageId]: page,
            };
            return {
                ...state,
                pages,
                activeSticker: sticker
            };
        }
        case actionType.MOVE_STICKER: {
            const { id: stickerId, calculatedStyle, pageId } = payload;
            const { page: currentPage, sticker: currentSticker, stickers: currentStickers } = getPageItems({
                pages: currentPages,
                pageId,
                stickerId,
            });
            const {
                styles,
                styles: { width: defaultWidth, translate: { translateX: defaultTranslateX, translateY: defaultTranslateY }, rotation: defaultRotation, position: defaultPosition },
            } = currentSticker;
            const { translateX = defaultTranslateX, translateY = defaultTranslateY, position = defaultPosition, rotation = defaultRotation, width = defaultWidth } = calculatedStyle;
            const sticker = {
                ...currentSticker,
                styles: {
                    ...styles,
                    width,
                    position,
                    translate: {
                        translateX,
                        translateY,
                    },
                    rotation
                },
            };

            const stickers = {
                ...currentStickers,
                [stickerId]: sticker,
            };

            const page = {
                ...currentPage,
                stickers,
            };

            const pages = {
                ...currentPages,
                [pageId]: page,
            };
            return {
                ...state,
                activePageId: pageId,
                activeSticker: sticker, /* plz check if its required always or we can optimise */
                pages,
            };
        }
        case actionType.UPDATE_ACTIVE_STICKER: {
            const { stickerId,  pageId: activePageId } = payload;
            return  {
                ...state,
                activePageId,
                activeSticker: currentPages[activePageId].stickers[stickerId]
            };
        }
        case actionType.RESET_ACTIVE_STICKER: {
            return  {
                ...state,
                activeSticker: {}
            };
        }
        case actionType.DELETE_STICKER: {
            const { pageId, stickerId } = payload;
            const { [pageId]: { stickers } = {}} = currentPages;
            const {[stickerId]:_, ...restSticker} = stickers
            return {
                ...state,
                activeSticker: {},
                pages: {
                    ...state.pages,
                    [pageId]: {
                        ...state.pages[pageId],
                        stickers: {
                            ...restSticker
                        },
                    },
                },
            };
        }
        default:
            return state;
    }
};

export default EditorSpace;
/* todo: check for common reducer and batter function to pas minimum data */