import dbConnect from '../../../../utils/dbConnect'
import User from '../../../../models/User'
import { response } from '../../../../services/response'
import bcrypt from 'bcrypt'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'PUT':
            try {

                try {

                    const user = await User.findOneAndUpdate({ email: req.query.email }, {
                        ...req.body
                    }, {
                        new: true,
                        runValidators: true,
                    })
                    if (!user) {
                        return response({
                            res,
                            status_code: 400,
                            success: false,
                            error: "Email does not exist!",
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
                    res.status(400).json({
                        success: false,
                        errors: error.message,
                    });
                }
            }
            catch (error) {
                response({ res, status_code: 400, success: false, error: error?.message })
            }
            break
        default:
            response({ res, status_code: 400, success: false, error: 'asd' })
            break
    }
}
