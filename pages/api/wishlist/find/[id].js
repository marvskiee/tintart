import dbConnect from '../../../../utils/dbConnect'
import WishList from '../../../../models/WishList'
import { response } from '../../../../services/response'
import Product from '../../../../models/Product'

dbConnect()

export default async (req, res) => {
switch (req.method) {
        case 'GET':
            try {
                const wishlist = await WishList.find({ user_id: req.query.id }).populate("product_id")
                return response({
                    res,
                    status_code: 200,
                    success: true,
                    data: wishlist,
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
