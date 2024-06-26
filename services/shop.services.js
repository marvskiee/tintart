import { getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllShop = async () =>
    getHTTPFormat({ url: '/shop' })

export const addShop = async (newData) =>
    postHTTPFormat({ newData, url: '/shop' })

export const updateShop = async (newData, id) =>
    updateHTTPFormat({ newData, url: '/shop/update/' + id })
