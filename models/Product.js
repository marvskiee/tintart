const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    images: {
        type: [{
            type: String,
        }],
    },
    logos: {
        type: [{
            type: String,
        }],
    },
    description: {
        type: String,
        required: [true, 'Description must not be empty'],
    },
    product_name: {
        type: String,
        required: [true, 'Product Name must not be empty'],
    },
    price: {
        type: Number,
        required: [true, 'Price must not be empty'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    merchandise: {
        type: String,
        required: [true, 'Merchandise must not be empty'],
    },
    colors: {
        type: [{
            type: String,
        }],
    },
    sizes: {
        type: [{
            type: String,
        }],
    },
    is_featured: {
        type: Boolean,
    },
    is_archived: {
        type: Boolean,
    },
    is_sold_out: {
        type: Boolean,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)
