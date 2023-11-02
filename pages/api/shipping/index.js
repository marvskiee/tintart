import dbConnect from '../../../utils/dbConnect'
import Shipping from '../../../models/Shipping'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_shipping = await Shipping.find()
        response({ res, status_code: 200, success: true, data: all_shipping })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const add_shipping = await Shipping.create(req.body)
        response({ res, status_code: 201, success: true, data: add_shipping })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
