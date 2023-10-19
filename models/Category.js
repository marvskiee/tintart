const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category must not be empty'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema)
