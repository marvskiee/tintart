import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllOrderProduct = async () =>
    getHTTPFormat({ url: '/order_product'})

export const getSortOrderProduct = async (id) =>
    getHTTPFormat({ url: '/order_product/find/' + id })

export const addOrderProduct = async (newData) =>
    postHTTPFormat({ newData, url: '/order_product' })