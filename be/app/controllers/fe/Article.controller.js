const Article = require("./../../models/Article.model") // new

exports.index = async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, page_size = 10, menu_id } = req.query;

    try {
        const condition = {};
        if (req.query.menu_id) condition.menu_id = req.query.menu_id;
        // execute query with page and limit values
        const articles = await Article.find()
            .where(condition)
            .limit(page_size)
            .skip((page - 1) * page_size)
            .exec();

        // get total documents in the Posts collection
        const count = await Article.count().where(condition);

        // return response with posts, total pages, and current page
        const meta = {
            total_page: Math.ceil(count / page_size),
            total: count,
            current_page: parseInt(page),
            page_size: parseInt(page_size)
        }
        const status =  200;
        const data = {
            articles: articles
        }
        res.json({
            data,
            meta,
            status
        });
    } catch (err) {
        console.error(err.message);
    }
};

exports.show = async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.id })
        return res.status(200).json({ data: article, status : 200 });
    } catch {
        res.status(404)
        res.send({ error: "Article doesn't exist!" })
    }
};
