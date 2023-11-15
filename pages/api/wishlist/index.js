import dbConnect from '../../../utils/dbConnect'
import WishList from '../../../models/WishList'
import Product from '../../../models/Product'

import { response } from '../../../services/response'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const all_wishList = await WishList.find().populate("product_id")
        response({ res, status_code: 200, success: true, data: all_wishList })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    case 'POST':
      try {
        const add_wishList = await WishList.create(req.body)
        response({ res, status_code: 201, success: true, data: add_wishList })
      } catch (error) {
        response({ res, status_code: 400, success: false, error })
      }
      break
    default:
      response({ res, status_code: 400, success: false })
      break
  }
}
