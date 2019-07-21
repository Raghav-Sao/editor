import request from './request';

const BASE_URL = 'http://13.232.230.56:3000';

export const fetchEditorCard = ({ _id }) => {
    const url = `${BASE_URL}/api/user/card/template/${_id}`;
    return request({
        method: 'get',
        url,
    });
};

export const updateEditorCard = ({ card, card: { _id } }) => {
    const url = `${BASE_URL}/api/user/card/update/${_id}`;
    return request({
        method: 'post',
        url,
        body: { card },
    });
};

export const addaEditorCardSticker = ({ _id, sticker }) => {
    const url = `${BASE_URL}/api/user/card/${_id}/updateField`;
    const payload = {
        updates: {
            type: 'insert',
            keyPath: ['stickers'],
            value: sticker,
        },
    };
    return request({
        method: 'post',
        url,
        body: payload,
    });
};
