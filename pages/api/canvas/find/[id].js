import dbConnect from '../../../../utils/dbConnect'
import Canvas from '../../../../models/Canvas'
import { response } from '../../../../services/response'
import Product from '../../../../models/Product'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const canvas = await Canvas.find({ user_id: req.query.id }).populate("product")
                return response({
                    res,
                    status_code: 200,
                    success: true,
                    data: canvas,
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
