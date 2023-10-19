import { getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllOrderDetails = async () =>
    getHTTPFormat({ url: '/order_details' })

export const addOrderDetails = async (newData) =>
    postHTTPFormat({ newData, url: '/order_details' })

export const updateOrderDetails = async (newData, id) =>
    updateHTTPFormat({ newData, url: '/order_details/update/' + id })
