import request from './request'
export const verification = () => request.get('/captcha')
export const login = (data) => request.post('/login?' + data)
export const menu = () => request.get('/menu/nav')
export const info = () => request.get('/user/info')