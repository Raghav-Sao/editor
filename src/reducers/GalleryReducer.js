import { COLOR, LANGUAGE, SORT_BY, TYPE } from 'actions/galleryAction';

const initialState = {
    sortBy: 'popularity',
    color: {},
    language: {},
    style: {},
    type: {},
};
export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case COLOR: {
            const { color } = payload;
            return {
                ...state,
                color: { ...state.color, ...color },
            };
        }

        case LANGUAGE: {
            const { language } = payload;
            return {
                ...state,
                language: { ...state.language, ...language },
            };
        }

        case TYPE: {
            const { type } = payload;
            return {
                ...state,
                type: { ...state.type, ...type },
            };
        }

        case SORT_BY: {
            const { sortBy } = payload;
            return {
                ...state,
                sortBy,
            };
        }

        default: {
            return state;
        }
    }
}
