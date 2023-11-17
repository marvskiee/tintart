import dbConnect from '../../../../utils/dbConnect'
import Canvas from '../../../../models/Canvas'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'PUT':
            let newError
            try {
                const { merchandise, values } = req.body
                
                const all_canvas = await Canvas.find({ merchandise, values })
                if (all_canvas?.length > 0)
                    return response({ res, status_code: 400, success: false, error: "Canvas already exist!" })
                
                const canvas = await Canvas.findByIdAndUpdate(req.query.id, { merchandise, values }, {
                    new: true,
                    runValidators: true,
                })
                if (!canvas) {
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
                        data: canvas,
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
