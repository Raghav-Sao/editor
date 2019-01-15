import request from './request';
import {authApi} from './apiConstants';

export const loginUser = (provider) => {
  const url = `${authApi}/${provider}/login`;
  return request({
    method: 'get',
    url,
  });
};