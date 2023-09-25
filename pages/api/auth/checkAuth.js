import dbConnect from '../../../utils/dbConnect'
import { verify } from 'jsonwebtoken'
import Student from '../../../models/Student'

dbConnect()

export default async (req, res) => {
  const secret = process.env.SECRET
  try {
    const { cookies } = req
    const jwt = cookies.OursiteJWT
    if (!jwt) {
      return res.json({ success: false, message: 'no token' })
    }
    const student = verify(jwt, secret)
    const user_data = await Student.findById(student.id).select(['-password', '-__v'])
    if (user_data) {
      return res.json({ success: true, data: user_data })
    }
    res.status(400).json({ success: false })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}
