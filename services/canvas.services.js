import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllCanvas = async () =>
    getHTTPFormat({ url: '/canvas' })

export const getUserCanvas = async (id) =>
    getHTTPFormat({ url: '/canvas/find/' + id })

export const addCanvas = async (newData) =>
    postHTTPFormat({ newData, url: '/canvas' })

export const deleteCanvas = async (id) =>
    deleteHTTPFormat({ url: '/canvas/delete/' + id })