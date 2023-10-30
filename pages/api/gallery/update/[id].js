import dbConnect from '../../../../utils/dbConnect'
import Gallery from '../../../../models/Gallery'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'PUT':
            let newError
            try {
                const gallery = await Gallery.findByIdAndUpdate(req.query.id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!gallery) {
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
                        data: gallery,
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
