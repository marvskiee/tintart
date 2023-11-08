import { getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllReview = async () =>
    getHTTPFormat({ url: '/review' })

export const getProductReview = async (id) =>
    getHTTPFormat({ url: '/review/find/' + id })

export const addReview = async (newData) =>
    postHTTPFormat({ newData, url: '/review' })

