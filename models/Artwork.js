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
    // shirt, photocard, sintraboard
    canvas_color: {
        type: String,
    },
    // front image
    front_image: {
        type: String,
    },
    front_image_location: {
        type: String,
        default: "0,0"

    },
    front_image_size: {
        type: String,
    },
    // front text
    front_text: {
        type: String,
    },
    front_text_size: {
        type: String,
    },
    front_text_location: {
        type: String,
        default: "0,0"
    },
    front_color: {
        type: String,
    },
    // back image
    back_image: {
        type: String,
    },
    back_image_location: {
        type: String,
        default: "0,0"

    },
    back_image_size: {
        type: String,
    },
    // back text
    back_text: {
        type: String,
    },
    back_text_size: {
        type: String,
    },
    back_text_location: {
        type: String,
        default: "0,0"

    },
    back_color: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.models?.Artwork || mongoose.model('Artwork', ArtworkSchema);