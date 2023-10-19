import dbConnect from '../../../../utils/dbConnect'
import User from '../../../../models/User'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'PUT':
            let newError
            try {
                const user = await User.findByIdAndUpdate(req.query.id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!user) {
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
                        data: user,
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
