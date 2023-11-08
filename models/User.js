const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'First Name must not be empty!'],
  },
  last_name: {
    type: String,
    required: [true, 'Last Name must not be empty!'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email must not be empty'],
  },
  contact_no: {
    type: String,
    required: [true, 'Contact must not be empty'],
  },
  password: {
    type: String,
    required: [true, 'Password must not be empty'],
  },
  profile_image: {
    type: String,
  },
  // 0 = customer
  // 1 = artist
  // 2 = admin
  role: {
    type: Number,
    required: [true, 'Role must not be empty'],
  },
  shipping_id: {
    type: String,
  },
  recovery_code: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
