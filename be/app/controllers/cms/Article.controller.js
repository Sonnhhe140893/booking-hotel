const Article = require("./../../models/Article.model") // new

exports.index = async (req, res) => {
    // destructure page and limit and set default values
    const page = req.query.page || 1; 
	const page_size = req.query.page_size  || 10;

    try {
        // execute query with page and limit values
        const articles = await Article.find()
            .limit(page_size)
            .skip((page - 1) * page_size)
            .populate(['menu'])
            .exec();

        // get total documents in the Posts collection
        const count = await Article.count();

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

exports.store = async (req, res) => {
    const article = new Article({
        name: req.body.name,
        avatar: req.body.avatar || null,
        description: req.body.description,
        article_content: req.body.article_content,
        menu_id : req.body.menu_id
    })
    await article.save();
    return res.status(200).json({ data: article, status : 200 });
};

exports.update = async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.id })

        if (req.body.name) {
            article.name = req.body.name;
        }
        if (req.body.avatar) {
            article.avatar = req.body.avatar;
        }
        if (req.body.description) {
            article.description = req.body.description;
        }
        if (req.body.menu_id) {
            article.menu_id = req.body.menu_id;
        }
        if (req.body.article_content) {
            article.article_content = req.body.article_content;
        }

        await article.save();
        return res.status(200).json({ data: article, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Article doesn't exist!" })
    }
};

exports.delete = async (req, res) => {
    try {
        await Article.deleteOne({ _id: req.params.id })
        return res.status(200).json({ data: [], status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Article doesn't exist!" })
    }
};
