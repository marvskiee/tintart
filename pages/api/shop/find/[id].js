import dbConnect from '../../../../utils/dbConnect'
import Shop from '../../../../models/Shop'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const shop = await Shop.findById(req.query.id)
                return response({
                    res,
                    status_code: 200,
                    success: true,
                    data: shop,
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
