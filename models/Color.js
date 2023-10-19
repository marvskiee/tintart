const mongoose = require('mongoose')

const ColorSchema = new mongoose.Schema({
  merchandise: {
    type: String,
    required: [true, 'Merchandise must not be empty'],
  },
  values: {
    type: String,
    required: [true, 'Values must not be empty!'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.models.Color || mongoose.model('Color', ColorSchema)
