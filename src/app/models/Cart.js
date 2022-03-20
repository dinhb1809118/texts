const mongoose = require('mongoose');
const Customers = require('./Customers');
const Product = require('./Product');
const Schema = mongoose.Schema;
const Cart = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            size: { type: String },
            color: {
                type: String
            },
            quantity: Number,
            price: Number,
        }
    ],
    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    collection: 'cart'
});
module.exports = mongoose.model('cart', Cart);