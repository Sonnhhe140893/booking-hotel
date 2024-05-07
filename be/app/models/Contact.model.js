const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: 'name cannot be blank'
        },
        email: {
            type: String,
        },
        subject: {
            type: String,
        },
        message: {
            type: String,
        },
        created_at : { type: Date, default: Date.now }
    },
    { collection: 'contacts' }
);

module.exports = mongoose.model('Contact', contactSchema);
