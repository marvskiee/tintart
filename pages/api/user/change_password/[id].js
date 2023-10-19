import dbConnect from '../../../../utils/dbConnect'
import User from '../../../../models/User'
import { response } from '../../../../services/response'
import bcrypt from 'bcrypt'
dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req
  switch (req.method) {
    case 'PUT':
      const { newPassword, oldPassword, confirmPassword } = req.body
      let newError = {}
      if (newPassword?.trim() == '' || newPassword == undefined) {
        newError = {
          ...newError,
          newPasswordError: 'Please enter new password!',
        }
      }
      if (oldPassword?.trim() == '' || oldPassword == undefined) {
        newError = {
          ...newError,
          oldPasswordError: 'Please enter old password!',
        }
      }
      if (
        confirmPassword?.trim() == '' ||
        newPassword?.trim() == '' ||
        confirmPassword == undefined ||
        newPassword == undefined ||
        confirmPassword?.trim() != newPassword?.trim()
      ) {
        newError = { ...newError, confirmPasswordError: 'Password mismatch!' }
      }
      if (Object.keys(newError).length > 0) {
        res.status(400).json({
          success: false,
          errors: newError,
        })
      } else {
        try {
          const old = await User.findById(id)
          const decryptPassword = await bcrypt.compare(oldPassword, old.password)
          const salt = await bcrypt.genSalt(Number(process.env.SALT))
          const hashPassword = await bcrypt.hash(newPassword, salt)
          if (decryptPassword) {
            const user = await User.findByIdAndUpdate(
              { _id: id },
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
          }
          return res.status(400).json({
            success: false,
            errors: {
              oldPasswordError: 'Wrong Password',
            },
          })
        } catch (error) {
          const err = error.errors
          res.status(400).json({
            success: false,
            errors: {
              newPasswordError: err?.password?.message,
            },
          })
        }
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
