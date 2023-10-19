const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    order_details_id: {
        type: String,
        required: [true, 'Order Details Id must not be empty'],
    },
    name: {
        type: String,
        required: [true, 'Name must not be empty'],
    },
    size: {
        type: String,
        required: [true, 'Size must not be empty!'],
    },
    category: {
        type: String,
        required: [true, 'Category must not be empty!'],
    },
    color: {
        type: String,
        required: [true, 'Color must not be empty!'],
    },
    price: {
        type: String,
        required: [true, 'Price must not be empty!'],
    },
    quantity: {
        type: Boolean,
        required: [true, 'Quantity must not be empty!'],
    },
    sub_total: {
        type: String,
        required: [true, 'Sub Total must not be empty!'],
    },
    image: {
        type: String,
        required: [true, 'Image must not be empty!'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema)
