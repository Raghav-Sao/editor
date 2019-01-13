import request from './request'

const BASE_URL = 'http://localhost:3000'

export const fetchEditorCard = ({ _id }) => {
  console.log(_id)
  const url = `${BASE_URL}/api/user/card/template/${_id}`
  return request({
    method: 'get',
    url,
  })
}
