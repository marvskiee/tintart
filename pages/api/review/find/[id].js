import dbConnect from '../../../../utils/dbConnect'
import { response } from '../../../../services/response'
import Review from '../../../../models/Review'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const all_review = await Review.findBy({ product_id: req.query.id })
                response({ res, status_code: 200, success: true, data: all_review })
            } catch (error) {
                response({ res, status_code: 400, success: false, error })
            }
            break
        default:
            response({ res, status_code: 400, success: false, error: 'asd' })
            break
    }
}
