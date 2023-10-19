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
  total_price: {
    type: String,
    required: [true, 'Total Price must not be empty!'],
  },
  is_paid: {
    type: Boolean,
    required: [true, 'Is Paid must not be empty!'],
  },
  status: {
    type: String,
    required: [true, 'Status must not be empty!'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.models.OrderDetails || mongoose.model('OrderDetails', OrderDetailsSchema)
