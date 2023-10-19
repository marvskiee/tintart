import { postHTTPFormat, updateHTTPFormat } from './tools'

export const addUser = async (newData) =>
  postHTTPFormat({ newData, url: '/user' })

export const updateUser = async (newData, id) =>
  updateHTTPFormat({ newData, url: '/user/update/' + id })

export const changePassword = async (newData, id) =>
  updateHTTPFormat({ newData, url: '/user/change_password/' + id })
