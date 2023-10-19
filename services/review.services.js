import { getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'
export const getAllReview = async () =>
    getHTTPFormat({ url: '/review' })

export const getSortReview = async (id) =>
    getHTTPFormat({ url: '/review/find/' + id })

export const addReview = async (newData) =>
    postHTTPFormat({ newData, url: '/review' })

