import request from './request';
import {authApi} from './apiConstants';

export const loginUser = (provider) => {
  const url = `${window.location.origin}/${provider}/login`;
  return request({
    method: 'get',
    url,
  });
};