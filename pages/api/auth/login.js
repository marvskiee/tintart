import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
import dbConnect from '../../../utils/dbConnect'
import Student from '../../../models/Student'
import bcrypt from 'bcrypt'
import { response } from '../../../services/response'

dbConnect()

const secret = process.env.SECRET

export default async (req, res) => {
  const { lrn, password } = req.body
  let newError = {}
  if (lrn?.trim() == '' || lrn == undefined) {
    newError = { ...newError, lrnError: 'Please enter lrn!' }
  }
  if (password?.trim() == '' || password == undefined) {
    newError = { ...newError, passwordError: 'Please enter password!' }
  }
  if (newError.hasOwnProperty('lrnError') || newError.hasOwnProperty('passwordError')) {
    return response({ res, status_code: 400, success: false, error: newError })
  } else {
    let result = null
    try {
      const user = await Student.findOne({
        lrn,
        status: true,
      })
      const decryptPassword = await bcrypt.compare(password, user.password)
      if (decryptPassword) {
        result = user
      } else {
        result = null
      }
    } catch (error) {}

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
        errors: { lrnError: 'Wrong password or lrn!' },
      })
    }
  }
}
