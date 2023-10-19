import dbConnect from '../../../utils/dbConnect'
import Product from '../../../models/Product'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_product = await Product.find()
        response({ res, status_code: 200, success: true, data: all_product })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
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
