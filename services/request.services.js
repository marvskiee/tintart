import { getHTTPFormat, postHTTPFormat } from './tools'

export const getAllRequest = async id => getHTTPFormat({ url: '/request/' + id })

export const createRequest = async newData => postHTTPFormat({ url: '/request', newData })
