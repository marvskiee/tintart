import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllCategory = async () =>
    getHTTPFormat({ url: '/category' })

export const addCategory = async (newData) =>
    postHTTPFormat({ newData, url: '/category' })

export const updateCategory = async (newData, id) =>
    updateHTTPFormat({ newData, url: '/category/update/' + id })

export const deleteCategory = async (id) =>
    deleteHTTPFormat({ url: '/category/delete/' + id })