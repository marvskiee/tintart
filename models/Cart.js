const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: String,
    required: [true, 'Quantity must not be empty!'],
  },
  user_id: {
    type: String,
    required: [true, 'User Id must not be empty!'],
  },
  color: {
    type: String,
    required: [true, 'Color must not be empty!'],
  },
  size: {
    type: String,
    required: [true, 'Size must not be empty!'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.models.Cart || mongoose.model('Cart', CartSchema)
