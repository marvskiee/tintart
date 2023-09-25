import { updateHTTPFormat } from './tools'
export const updateStudent = async (newData, id) =>
  updateHTTPFormat({ newData, url: '/student/update/' + id })

export const changePassword = async (newData, id) =>
  updateHTTPFormat({ newData, url: '/student/change_password/' + id })
