import dbConnect from '../../../../utils/dbConnect'
import Artwork from '../../../../models/Artwork'
import { response } from '../../../../services/response'
import Product from '../../../../models/Product'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const artwork = await Artwork.find({ user_id: req.query.id }).sort({ created_at: -1 })
                return response({
                    res,
                    status_code: 200,
                    success: true,
                    data: artwork,
                })
            } catch (error) {
                response({ res, status_code: 400, success: false, error: error?.message })
            }
            break
        default:
            response({ res, status_code: 400, success: false, error: 'asd' })
            break
    }
}
