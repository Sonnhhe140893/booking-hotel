const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema(
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
        menu_id: {type: String, required: 'menu_id cannot be blank'},
        article_content: {
            type: String,
        },
        menu: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu"
        },
        created_at : { type: Date, default: Date.now }
    },
    { collection: 'articles' }
);

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
