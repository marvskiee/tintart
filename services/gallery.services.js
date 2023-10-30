import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllGallery = async () =>
    getHTTPFormat({ url: '/gallery' })

export const addGallery = async (newData) =>
    postHTTPFormat({ newData, url: '/gallery' })

export const updateGallery = async (newData, id) =>
    updateHTTPFormat({ newData, url: '/gallery/update/' + id })

export const deleteGallery = async (id) =>
    deleteHTTPFormat({ url: '/gallery/delete/' + id })