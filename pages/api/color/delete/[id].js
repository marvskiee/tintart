import dbConnect from '../../../../utils/dbConnect'
import Color from '../../../../models/Color'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'DELETE':
            try {
                const color = await Color.findByIdAndDelete(req.query.id)
                return response({
                    res,
                    status_code: 200,
                    success: true,
                    data: color,
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
