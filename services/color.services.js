import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllColor = async () =>
    getHTTPFormat({ url: '/color' })

export const addColor = async (newData) =>
    postHTTPFormat({ newData, url: '/color' })

export const updateColor = async (newData, id) =>
    updateHTTPFormat({ newData, url: '/color/update/' + id })

export const deleteColor = async (id) =>
    deleteHTTPFormat({ url: '/color/delete/' + id })