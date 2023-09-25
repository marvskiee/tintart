import dbConnect from '../../../utils/dbConnect'
import Student from '../../../models/Student'
import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_student = await Student.find()
        response({ res, status_code: 200, success: true, data: all_student })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const add_student = await Student.create(req.body)
        response({ res, status_code: 201, success: true, data: add_student })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
