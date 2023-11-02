import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getUserWishList = async (id) =>
    getHTTPFormat({ url: '/wishlist/find/' + id })

export const addWishList = async (newData) =>
    postHTTPFormat({ newData, url: '/wishlist' })

export const deleteWishList = async (id) =>
    deleteHTTPFormat({ url: '/wishlist/delete/' + id })