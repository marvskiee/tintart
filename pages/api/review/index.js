import dbConnect from '../../../utils/dbConnect'
import Review from '../../../models/Review'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_review = await Review.find()
        response({ res, status_code: 200, success: true, data: all_review })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const add_review = await Review.create(req.body)
        response({ res, status_code: 201, success: true, data: add_review })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
