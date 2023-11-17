const mongoose = require('mongoose')

const CanvasSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    user_id: {
        type: String,
        required: [true, 'User Id must not be empty!'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.models.Canvas || mongoose.model('Canvas', CanvasSchema)
