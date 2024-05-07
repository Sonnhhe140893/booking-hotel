const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            required: 'name cannot be blank'
        },
        avatar: {
            type: String,
        },
        description: {
            type: String,
        },
        service_content: {
            type: String,
        },
        created_at : { type: Date, default: Date.now }
    },
    { collection: 'services' }
);

module.exports = mongoose.model('service', serviceSchema);
