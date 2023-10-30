import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllProduct = async () =>
    getHTTPFormat({ url: '/product' })

export const getOneProduct = async (id) =>
    getHTTPFormat({ url: '/product/find/' + id })

export const addProduct = async (newData) =>
    postHTTPFormat({ newData, url: '/product' })

export const updateProduct = async (newData, id) =>
    updateHTTPFormat({ newData, url: '/product/update/' + id })

export const deleteProduct = async (id) =>
    deleteHTTPFormat({ url: '/product/delete/' + id })