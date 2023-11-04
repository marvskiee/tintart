import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllCart = async () =>
    getHTTPFormat({ url: '/cart' })

export const getUserCart = async (id) =>
    getHTTPFormat({ url: '/cart/find/' + id })

export const addCart = async (newData) =>
    postHTTPFormat({ newData, url: '/cart' })

export const updateCart = async (newData, id) =>
    updateHTTPFormat({ newData, url: '/cart/update/' + id })

export const deleteCart = async (id) =>
    deleteHTTPFormat({ url: '/cart/delete/' + id })