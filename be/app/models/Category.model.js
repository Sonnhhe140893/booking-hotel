const mongoose = require('mongoose');

const { Schema } = mongoose;

const modelSchema = new Schema(
    {
        name: {
            type: String,
            required: 'name cannot be blank'
        },
        created_at : { type: Date, default: Date.now }
    },
    { collection: 'categories' }
);

module.exports = mongoose.model('Category', modelSchema);
