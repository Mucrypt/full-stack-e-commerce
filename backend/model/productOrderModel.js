// backend/model/productOrderModel.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productDetails: {
        type: Array,
        default: [],
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        default: '',
        index: true 
    },
    paymentDetails: {
        paymentStatus: {
            type: String,
            required: true,
        },
        paymentIntentId: {
            type: String,
            required: true,
        },
        amountSubtotal: {
            type: Number,
            required: true,
        },
        shippingAmount: {
            type: Number,
            required: true,
        },
        amountTotal: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: Object,
            required: true,
            default: {},
        }
    },
    shippingDetails: {
        address: {
            type: Object,
            default: {},
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        }
    },
    shippingOption: {
        type: Object,
        default: null,
        required: false,
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'completed', 'refunded', 'canceled'],
        default: 'pending',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('ProductOrder', orderSchema);
