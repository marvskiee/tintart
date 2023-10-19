import dbConnect from '../../../utils/dbConnect'
import Color from '../../../models/Color'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_color = await Color.find()
        response({ res, status_code: 200, success: true, data: all_color })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const add_color = await Color.create(req.body)
        response({ res, status_code: 201, success: true, data: add_color })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
