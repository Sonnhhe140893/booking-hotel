const mongoose = require('mongoose');

const { Schema } = mongoose;

const roleSchema = new Schema(
    {
        name: {
            type: String,
            required: 'name cannot be blank'
        },
        description: {
            type: String,
            required: 'description cannot be blank'
        },
        permissions:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
        admins:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        created_at : { type: Date, default: Date.now }
    },
    { collection: 'roles' }
);

module.exports = mongoose.models.Role || mongoose.model('Role', roleSchema);
