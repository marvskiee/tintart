import dbConnect from '../../../../utils/dbConnect'
import Student from '../../../../models/Student'
import { response } from '../../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'PUT':
      let newError
      try {
        const student = await Student.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!student) {
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
            data: student,
          })
        }
      } catch (error) {
        if (error.code === 11000) {
          if (error.keyPattern?.lrn) {
            newError = {
              lrnError: 'lrn already exist!',
            }
          }
        }
        response({ res, status_code: 400, success: false, error: newError })
      }
      break
    default:
      response({ res, status_code: 400, success: false, error: 'asd' })
      break
  }
}
