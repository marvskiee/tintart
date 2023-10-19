const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    shop_name: {
        type: String,
        required: [true, 'Shop Name must not be empty'],
    },
    images: {
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
        type: String,
        required: [true, 'Price must not be empty'],
    },
    category: {
        type: [{
            type: String,
        }],
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
        type: String,
    },
    is_archived: {
        type: String,
    },
    is_sold_out: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)
