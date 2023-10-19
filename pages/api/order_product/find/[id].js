import dbConnect from '../../../../utils/dbConnect'
import OrderProduct from '../../../../models/OrderProduct'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const order_product = await OrderProduct.find({ order_details_id: req.query.id })
                return response({
                    res,
                    status_code: 200,
                    success: true,
                    data: order_product,
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
