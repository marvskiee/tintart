import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllAdmin = async () =>
    getHTTPFormat({ url: '/admin' })

export const addAdmin = async (newData) =>
    postHTTPFormat({ newData, url: '/admin' })

export const updateAdmin = async (newData, id) =>
    updateHTTPFormat({ newData, url: '/admin/update/' + id })

export const deleteAdmin = async (id) =>
    deleteHTTPFormat({ url: '/admin/delete/' + id })