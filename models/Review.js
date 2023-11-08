const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: [true, 'Product Id must not be empty'],
    },
    comment: {
        type: String,
        required: [true, 'Product Id must not be empty'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    rating: {
        type: String,
        required: [true, 'Product Id must not be empty'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.models.Review || mongoose.model('Review', ReviewSchema)
