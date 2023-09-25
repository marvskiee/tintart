const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
  lrn: {
    type: String,
    unique: true,
    required: [true, 'LRN must not be empty'],
  },
  first_name: {
    type: String,
    required: [true, 'Password must not be empty!'],
  },
  last_name: {
    type: String,
    required: [true, 'Password must not be empty!'],
  },
  grade: {
    type: String,
    required: [true, 'Grade must not be empty'],
  },
  track: {
    type: String,
    required: [true, 'Track must not be empty'],
  },
  section: {
    type: String,
    required: [true, 'Section must not be empty'],
  },
  gender: {
    type: String,
    required: [true, 'Gender must not be empty'],
  },
  password: {
    type: String,
    required: [true, 'Password must not be empty'],
  },
  birthday: {
    type: Date,
    required: [true, 'Birthday must not be empty'],
  },
  school_year: {
    type: String,
    required: [true, 'School year must not be empty'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  profile_image: {
    type: String,
    // required: [true, "Profile Image must not be empty!"],
  },
})

module.exports = mongoose.models.Student || mongoose.model('Student', StudentSchema)
