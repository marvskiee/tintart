import dbConnect from '../../../../utils/dbConnect'
import Artwork from '../../../../models/Artwork'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'DELETE':
            try {
                const artwork = await Artwork.findByIdAndDelete(req.query.id)
                return response({
                    res,
                    status_code: 200,
                    success: true,
                    data: artwork,
                })
            } catch (error) {
                response({ res, status_code: 400, success: false, error })
            }
            break
        default:
            response({ res, status_code: 400, success: false, error: 'asd' })
            break
    }
}
