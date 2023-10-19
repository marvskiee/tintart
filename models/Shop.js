const mongoose = require('mongoose')

const ShopSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: [true, 'Logo must not be empty'],
    },
    name: {
        type: String,
        required: [true, 'Name must not be empty'],
    },
    description: {
        type: String,
        required: [true, 'Description must not be empty'],
    },
    terms: {
        type: String,
        required: [true, 'Terms must not be empty'],
    },
    facebook_link: {
        type: String,
    },
    instagram_link: {
        type: String,
    },
    tiktok_link: {
        type: String,
    },
    shopee: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email must not be empty'],
    },
    contact_no: {
        type: String,
        required: [true, 'Contact must not be empty'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.models.Shop || mongoose.model('Shop', ShopSchema)
