import dbConnect from '../../../../utils/dbConnect'
import User from '../../../../models/User'
import { response } from '../../../../services/response'
import bcrypt from 'bcrypt'

dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'PUT':
            try {
                const { email, password, confirm_password } = req.body;
                let newError = ""
                if (email)
                    if (
                        !email?.match(
                            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        )
                    ) {
                        newError = "Please enter valid email address!"
                    }

                if (newError) {
                    res.status(400).json({
                        success: false,
                        errors: newError,
                    });
                } else {
                    try {
                        let data = req.body
                        if (req.body.password) {
                            const salt = await bcrypt.genSalt(Number(process.env.SALT));
                            const hashPassword = await bcrypt.hash(req.body.password, salt);
                            data.password = hashPassword
                        }
                        const user = await User.findByIdAndUpdate(req.query.id, {
                            ...data
                        }, {
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
                        if (error.code === 11000 && error.keyPattern?.email) {
                            newError = "Email already exist!"
                        }
                        res.status(400).json({
                            success: false,
                            errors: newError || error.message,
                        });
                    }
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
