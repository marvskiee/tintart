import dbConnect from '../../../utils/dbConnect'
import Size from '../../../models/Size'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_size = await Size.find().sort({ created_at: -1 })
        response({ res, status_code: 200, success: true, data: all_size })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        //check first 
        const all_size = await Size.find(req.body)
        if (all_size?.length > 0)
          return response({ res, status_code: 400, success: false, error: "Size already exist!" })

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
