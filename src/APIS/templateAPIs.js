import request from './request'

const BASE_URL = 'http://localhost:3000'

export const fetchTemplates = () => {
  const url = `${BASE_URL}/api/user/cardTemplates`
  return request({
    method: 'get',
    url,
  });
}