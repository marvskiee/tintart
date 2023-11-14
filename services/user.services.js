import { deleteHTTPFormat, getHTTPFormat, postHTTPFormat, updateHTTPFormat } from './tools'

export const addUser = async (newData) =>
  postHTTPFormat({ newData, url: '/user' })

export const updateUser = async (newData, id) =>
  updateHTTPFormat({ newData, url: '/user/update/' + id })

export const changePassword = async (newData, id) =>
  updateHTTPFormat({ newData, url: '/user/change_password/' + id })

export const getAllUser = async () =>
  getHTTPFormat({ url: '/user' })

export const getAdminUsers = async (Role) =>
  getHTTPFormat({ url: '/user/admin' })

export const getOneUser = async (id) =>
  getHTTPFormat({ url: '/user/view/' + id })

export const deleteUser = async (id) =>
  deleteHTTPFormat({ url: '/user/delete/' + id })

export const updateUserByEmail = async (newData, email) =>
  updateHTTPFormat({ newData, url: '/user/send_code/' + email })

export const recoveryPassword = async (newData, id) =>
  updateHTTPFormat({ newData, url: '/user/recover_password/' + id })

  export const validateCode = async (newData) =>
  getHTTPFormat({ newData, url: '/user/send_code'})
