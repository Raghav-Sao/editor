import { FETCH_TEMPLATES, FETCH_TEMPLATES_FULFILLED } from './TemplateActions.js';

const initialState = [];
const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_TEMPLATES_FULFILLED: {
            return { ...payload };
        }

        default: {
            return state;
        }
    }
};
export default reducer;
