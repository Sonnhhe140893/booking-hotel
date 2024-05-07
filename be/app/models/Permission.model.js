const mongoose = require('mongoose');

const { Schema } = mongoose;

const permissionSchema = new Schema(
    {
        name: {
            type: String,
            required: 'name cannot be blank'
        },
        description: {
            type: String,
            required: 'description cannot be blank'
        },
        path: {
            type: String,
            required: 'name cannot be blank'
        },
        roles:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
        created_at : { type: Date, default: Date.now }
    },
    { collection: 'permissions' }
);

module.exports = mongoose.model('permission', permissionSchema);
