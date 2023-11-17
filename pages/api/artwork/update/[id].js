import dbConnect from '../../../../utils/dbConnect'
import Artwork from '../../../../models/Artwork'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'PUT':
            let newError
            try {
                const { merchandise, values } = req.body
                
                const all_artwork = await Artwork.find({ merchandise, values })
                if (all_artwork?.length > 0)
                    return response({ res, status_code: 400, success: false, error: "Artwork already exist!" })
                
                const artwork = await Artwork.findByIdAndUpdate(req.query.id, { merchandise, values }, {
                    new: true,
                    runValidators: true,
                })
                if (!artwork) {
                    return response({
                        res,
                        status_code: 400,
                        success: false,
                        error: newError,
                    })
                } else {
                    return response({
                        res,
                        status_code: 200,
                        success: true,
                        data: artwork,
                    })
                }
            } catch (error) {
                response({ res, status_code: 400, success: false, error })
            }
            break
        default:
            response({ res, status_code: 400, success: false, error: 'asd' })
            break
    }
}
