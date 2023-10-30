const mongoose = require('mongoose')

const GallerySchema = new mongoose.Schema({
  artist: {
    type: String,
    required: [true, 'Artist must not be empty'],
  },
  image: {
    type: String,
    required: [true, 'Image must not be empty'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema)
