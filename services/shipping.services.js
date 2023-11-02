import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllShipping = async () =>
    getHTTPFormat({ url: '/shipping' })

export const getUserShipping = async (id) =>
    getHTTPFormat({ url: '/shipping/find/' + id })

export const addShipping = async (newData) =>
    postHTTPFormat({ newData, url: '/shipping' })

export const updateShipping = async (newData, id) =>
    updateHTTPFormat({ newData, url: '/shipping/update/' + id })

export const deleteShipping = async (id) =>
    deleteHTTPFormat({ url: '/shipping/delete/' + id })