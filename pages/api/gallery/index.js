import dbConnect from '../../../utils/dbConnect'
import Gallery from '../../../models/Gallery'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_gallery = await Gallery.find()
        response({ res, status_code: 200, success: true, data: all_gallery })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const add_gallery = await Gallery.create(req.body)
        response({ res, status_code: 201, success: true, data: add_gallery })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
