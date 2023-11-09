import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'
import bcrypt from 'bcrypt'
import { response } from '../../../services/response'

dbConnect()

const secret = process.env.SECRET

export default async (req, res) => {
  const { email, password } = req.body
  let newError = {}
  if (email?.trim() == '' || email == undefined) {
    newError = { ...newError, emailError: 'Please enter email!' }
  }
  if (password?.trim() == '' || password == undefined) {
    newError = { ...newError, passwordError: 'Please enter password!' }
  }
  if (newError.hasOwnProperty('emailError') || newError.hasOwnProperty('passwordError')) {
    return response({ res, status_code: 400, success: false, error: newError })
  } else {
    let result = null
    try {
      const user = await User.findOne({
        email
      })
      const decryptPassword = await bcrypt.compare(password, user.password)
      if (decryptPassword) {
        result = user
      } else {
        result = null
      }
    } catch (error) { }
    if (result) {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          id: result._id,
          role: result.role,
        },
        secret
      )
      const serialized = serialize('OursiteJWT', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
      res.setHeader('Set-Cookie', serialized)
      res.status(200).json({ success: true, data: result })
    } else {
      res.json({
        success: false,
        errors: { emailError: 'Wrong password or email!' },
      })
    }
  }
}
