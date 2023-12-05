import dbConnect from '../../../utils/dbConnect'
import Canvas from '../../../models/Canvas'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_canvas = await Canvas.find().sort({ created_at: -1 })
        response({ res, status_code: 200, success: true, data: all_canvas })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const all_canvas = await Canvas.find(req.body)
        if (all_canvas?.length > 0)
          return response({ res, status_code: 400, success: false, error: "Canvas already exist!" })

        const add_canvas = await Canvas.create(req.body)
        response({ res, status_code: 201, success: true, data: add_canvas })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
