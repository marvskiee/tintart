import dbConnect from '../../../utils/dbConnect'
import { response } from '../../../services/response'
import User from '../../../models/User'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_admin = await User.find({ role: 1 })
        response({ res, status_code: 200, success: true, data: all_admin })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const add_admin = await User.create(req.body)
        response({ res, status_code: 201, success: true, data: add_admin })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
