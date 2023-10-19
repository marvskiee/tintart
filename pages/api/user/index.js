import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_user = await User.find()
        response({ res, status_code: 200, success: true, data: all_user })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const add_user = await User.create(req.body)
        response({ res, status_code: 201, success: true, data: add_user })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
