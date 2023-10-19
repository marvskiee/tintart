import dbConnect from '../../../../utils/dbConnect'
import Category from '../../../../models/Category'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'DELETE':
            try {
                const category = await Category.findByIdAndDelete(req.query.id)
                return response({
                    res,
                    status_code: 200,
                    success: true,
                    data: category,
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
