const Service = require("./../../models/Service.model")

exports.index = async (req, res) => {
    const page = req.query.page || 1; const page_size = req.query.page_size  || 10;
	let condition = {}
    const services = await Service.find()
        .limit(page_size)
        .skip((page - 1) * page_size)
        .exec();

    // get total documents in the Posts collection
    const count = await Service.count().where(condition);

    // return response with posts, total pages, and current page
    const meta = {
        total_page: Math.ceil(count / page_size),
        total: count,
        current_page: parseInt(page),
        page_size: parseInt(page_size)
    }
    const status =  200;
    const data = {
        services: services
    }
    res.json({
        data,
        meta,
        status
    });
};

exports.show = async (req, res) => {
    try {
        const service = await Service.findOne({ _id: req.params.id })
        return res.status(200).json({ data: service, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Service doesn't exist!" })
    }
};
