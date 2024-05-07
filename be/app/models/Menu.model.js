const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSchema = new Schema(
    {
        name: {
            type: String,
            required: 'name cannot be blank'
        },
        created_at : { type: Date, default: Date.now }
    },
    { collection: 'menus' }
);

module.exports = mongoose.model('Menu', menuSchema);
