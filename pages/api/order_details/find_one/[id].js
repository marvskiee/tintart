import dbConnect from '../../../../utils/dbConnect'
import OrderDetails from '../../../../models/OrderDetails'
import OrderProduct from "../../../../models/OrderProduct"
import { response } from '../../../../services/response'
dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const order_detail = await OrderDetails.findOne({ _id: req.query.id }).populate("products")
                return response({
                    res,
                    status_code: 200,
                    success: true,
                    data: order_detail,
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
