import dbConnect from '../../../../utils/dbConnect'
import Color from '../../../../models/Color'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'PUT':
            let newError
            try {
                const { merchandise, values } = req.body
                
                const all_color = await Color.find({ merchandise, values })
                if (all_color?.length > 0)
                    return response({ res, status_code: 400, success: false, error: "Color already exist!" })
                
                const color = await Color.findByIdAndUpdate(req.query.id, { merchandise, values }, {
                    new: true,
                    runValidators: true,
                })
                if (!color) {
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
                        data: color,
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
