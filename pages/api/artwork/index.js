import dbConnect from '../../../utils/dbConnect'
import { response } from '../../../services/response'
import Artwork from '../../../models/Artwork'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_artwork = await Artwork.find().sort({ created_at: 1})
        response({ res, status_code: 200, success: true, data: all_artwork })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const all_artwork = await Artwork.find(req.body)

        if (all_artwork?.length > 0)
          return response({ res, status_code: 400, success: false, error: "Artwork already exist!" })

        const add_artwork = await Artwork.create(req.body)
        response({ res, status_code: 201, success: true, data: add_artwork })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
