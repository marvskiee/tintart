import { getHTTPFormat, postHTTPFormat } from './tools'

export const authLogin = async newData => postHTTPFormat({ newData, url: '/auth/login' })
export const authLogout = async () => postHTTPFormat({ url: '/auth/logout' })
export const getUser = async () => getHTTPFormat({ url: '/auth/checkAuth' })
