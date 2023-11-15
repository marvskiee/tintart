const mongoose = require('mongoose')

const WishListSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, 'User Id must not be empty'],
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    image: {
        type: String,
        required: [true, 'Image must not be empty!'],
    },
    title: {
        type: String,
        required: [true, 'Title must not be empty!'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.models.WishList || mongoose.model('WishList', WishListSchema)
