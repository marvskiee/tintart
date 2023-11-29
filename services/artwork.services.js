import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllArtwork = async () =>
    getHTTPFormat({ url: '/artwork' })

export const getUserArtwork = async (id) =>
    getHTTPFormat({ url: '/artwork/find/' + id })

export const addArtwork = async (newData) =>
    postHTTPFormat({ newData, url: '/artwork' })

export const updateArtwork = async (id, newData) =>
    updateHTTPFormat({ newData, url: '/artwork/update/' + id })

export const deleteArtwork = async (id) =>
    deleteHTTPFormat({ url: '/artwork/delete/' + id })