import dbConnect from '../../../../utils/dbConnect'
import User from '../../../../models/User'
import { response } from '../../../../services/response'
import bcrypt from 'bcrypt'
dbConnect()

export default async (req, res) => {
    switch (req.method) {
        case 'PUT':
            const { password } = req.body

            try {
                const salt = await bcrypt.genSalt(Number(process.env.SALT))
                const hashPassword = await bcrypt.hash(password, salt)
                const user = await User.findByIdAndUpdate(
                    req.query.id,
                    {
                        password: hashPassword,
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                )
                if (user) {
                    return res.status(200).json({ success: true })
                }
                return res.status(400).json({ success: false })


            } catch (error) {
                res.status(400).json({
                    success: false,
                    errors:
                        error.message
                })
            }
            break
        default:
            response({ res, status_code: 400, success: false })
            break
    }
}
