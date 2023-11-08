import dbConnect from '../../../../utils/dbConnect'
import Product from '../../../../models/Product'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const product = await Product.findOne({ _id: req.query.id, is_sold_out: false, is_archived: false }).populate("category")
                return response({
                    res,
                    status_code: 200,
                    success: true,
                    data: product,
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
