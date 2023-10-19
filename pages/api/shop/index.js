import dbConnect from '../../../utils/dbConnect'
import Shop from '../../../models/Shop'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_shop = await Shop.find()
        response({ res, status_code: 200, success: true, data: all_shop })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const add_shop = await Shop.create(req.body)
        response({ res, status_code: 201, success: true, data: add_shop })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
