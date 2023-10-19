import dbConnect from '../../../utils/dbConnect'
import Size from '../../../models/Size'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_size = await Size.find()
        response({ res, status_code: 200, success: true, data: all_size })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const add_size = await Size.create(req.body)
        response({ res, status_code: 201, success: true, data: add_size })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
