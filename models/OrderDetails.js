const mongoose = require('mongoose')

const OrderDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name must not be empty'],
  },
  contact_no: {
    type: String,
    required: [true, 'Contact must not be empty!'],
  },
  address: {
    type: String,
    required: [true, 'Address must not be empty!'],
  },
  information: {
    type: String,
  },
  total_price: {
    type: String,
    required: [true, 'Total Price must not be empty!'],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'Products must not be empty'],
    },
  ],
  is_paid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: "PENDING PAYMENT"
  },
  mop: {
    type: String,
  },
  proof_image: {
    type: String,
  },
  user_id:{
    type: String,
    required: [true, 'User Id must not be empty!'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.models.OrderDetails || mongoose.model('OrderDetails', OrderDetailsSchema)
