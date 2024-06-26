import dbConnect from '../../../utils/dbConnect'
import Product from '../../../models/Product'
import Category from '../../../models/Category'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_product = await Product.find().populate("category").sort({ created_at: -1 })
        response({ res, status_code: 200, success: true, data: all_product })
      } catch (error) {
        response({ res, status_code: 400, success: false, error: error?.message })
      }
      break
    case 'POST':
      try {
        const add_product = await Product.create(req.body)
        response({ res, status_code: 201, success: true, data: add_product })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
