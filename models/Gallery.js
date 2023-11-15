const mongoose = require('mongoose')

const GallerySchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, 'User Id must not be empty'],
  },
  name: {
    type: String,
    required: [true, 'Name must not be empty'],
  },
  image: {
    type: String,
    required: [true, 'Image must not be empty'],
  },
  artwork_title: {
    type: String,
    required: [true, 'Title must not be empty'],
  },
  facebook_link: {
    type: String,
  },
  instagram_link: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema)
