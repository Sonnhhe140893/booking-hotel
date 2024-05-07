const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const roomSchema = new Schema(
    {
        name: {
            type: String,
            required: 'name cannot be blank'
        },
        avatar: {
            type: String,
        },
        room_code: {
            type: String,
        },
        status: {
            type: String,
            default: "EMPTY"
        },
        floors: {
            type: Number,
        },
        price: {
            type: Number,
        },
        size: {
            type: Number,
        },
        bed: {
            type: Number,
        },
		customer: {
            type: Number,
        },
        total_vote: {
            type: Number,
        },
        total_star: {
            type: Number,
        },
        description: {
            type: String,
        },
        room_content: {
            type: String,
        },
        category_id: {type: String, required: 'category_id cannot be blank'},
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        albums: {
            type: Array
        },
		updated_by: { type: String },
		admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        created_at : { type: Date, default: Date.now }
    },
    { collection: 'rooms' }
);

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema);
