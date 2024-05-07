const mongoose = require('mongoose');

const { Schema } = mongoose;

const discountSchema = new Schema(
    {
        name: {
            type: String,
            required: 'name cannot be blank'
        },
        price: {
            type: Number,
        },
        status: {
            type: Number,
            default: 1
        },
        max_use: {
            type: Number,
        },
        max_process: {
            type: Number,
            default: 0
        },
		code: {
            type: String,
			required: 'code cannot be blank'
        },
        created_at : { type: Date, default: Date.now }
    },
    { collection: 'discounts' }
);

module.exports = mongoose.model('discount', discountSchema);
