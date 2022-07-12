import request from './request'
export const verification = () => request.get('/captcha')