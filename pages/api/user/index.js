import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'
import { response } from '../../../services/response'
import bcrypt from 'bcrypt'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_user = await User.find({ role: { $in: [0, 1, 2] } })
        response({ res, status_code: 200, success: true, data: all_user })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const { email, password, confirm_password } = req.body;
        let newError = ""
        if (
          !email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          newError = "Please enter valid email address!"
        }
        if (
          password.length < 8 ||
          password?.trim() == "" ||
          password == undefined
        ) {
          newError = "Please enter password and must be atleast 8 characters!"
        }
        if (
          confirm_password?.trim() == "" ||
          password?.trim() == "" ||
          confirm_password == undefined ||
          password == undefined ||
          confirm_password?.trim() != password?.trim()
        ) {
          newError = "Password mismatch!"
        }
        if (newError) {
          res.status(400).json({
            success: false,
            errors: newError,
          });
        } else {
          try {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const user = await User.create({
              ...req.body,
              password: hashPassword,
            });
            return res.status(201).json({ success: true, data: user });
          } catch (error) {
            if (error.code === 11000 && error.keyPattern?.email) {
              newError = "Email already exist!"
            }
            res.status(400).json({
              success: false,
              errors: newError,
            });
          }
        }
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
