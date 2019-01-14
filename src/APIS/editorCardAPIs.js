import request from './request'

const BASE_URL = 'http://localhost:3000'

export const fetchEditorCard = ({ _id }) => {
  const url = `${BASE_URL}/api/user/card/template/${_id}`
  return request({
    method: 'get',
    url,
  })
}

export const updateEditorCard = ({ card, card: { _id } }) => {
  const url = `${BASE_URL}/api/user/card/update/${_id}`
  return request({
    method: 'post',
    url,
    body: { card },
  })
}
