import dbConnect from '../../../utils/dbConnect'
import Category from '../../../models/Category'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_category = await Category.find().sort({ created_at: -1 })
        response({ res, status_code: 200, success: true, data: all_category })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const add_category = await Category.create(req.body)
        response({ res, status_code: 201, success: true, data: add_category })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
