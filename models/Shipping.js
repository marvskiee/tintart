const mongoose = require('mongoose')

const ShippingSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, 'User Id must not be empty'],
    },
    receiver_name: {
        type: String,
        required: [true, 'Name must not be empty'],
    },
    contact_no: {
        type: String,
        required: [true, 'Contact must not be empty'],
    },
    region: {
        type: String,
    },
    street: {
        type: String,
    },
    unit: {
        type: String,
    },
    information: {
        type: String,
    },
    is_default: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.models.Shipping || mongoose.model('Shipping', ShippingSchema)
