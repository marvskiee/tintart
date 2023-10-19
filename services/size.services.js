import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllSize = async () =>
    getHTTPFormat({ url: '/size' })

export const addSize = async (newData) =>
    postHTTPFormat({ newData, url: '/size' })

export const updateSize = async (newData, id) =>
    updateHTTPFormat({ newData, url: '/size/update/' + id })

export const deleteSize = async (id) =>
    deleteHTTPFormat({ url: '/size/delete/' + id })