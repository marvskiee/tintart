import { postHTTPFormat } from './tools'

export const sendMessage = async (newData) =>
    postHTTPFormat({ newData, url: '/email' })
