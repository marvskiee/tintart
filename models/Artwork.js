const mongoose = require('mongoose')

const ArtworkSchema = new mongoose.Schema({
    merchandise: {
        type: String,
        required: [true, 'Merchandise must not be empty'],
    },
    user_id: {
        type: String,
        required: [true, 'User Id must not be empty!'],
    },
    title: {
        type: String,
        required: [true, 'Title must not be empty'],
    },
    front_image: {
        type: String,
    },
    front_image_location: {
        type: String,
    },
    front_text: {
        type: String,
    },
    front_text_size: {
        type: String,
    },
    front_text_location: {
        type: String,
    },
    back_image: {
        type: String,
    },
    back_image_location: {
        type: String,
    },
    back_text: {
        type: String,
    },
    back_text_size: {
        type: String,
    },
    back_text_location: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.models.Artwork || mongoose.model('Artwork', ArtworkSchema)
