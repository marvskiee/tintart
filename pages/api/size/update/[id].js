import dbConnect from '../../../../utils/dbConnect'
import Size from '../../../../models/Size'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'PUT':
            let newError
            try {
                const { merchandise, values } = req.body
                const all_size = await Size.find({ merchandise, values })
                if (all_size?.length > 0)
                    return response({ res, status_code: 400, success: false, error: "Size already exist!" })
                const size = await Size.findByIdAndUpdate(req.query.id, { merchandise, values }, {
                    new: true,
                    runValidators: true,
                })
                if (!size) {
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
                        data: size,
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
