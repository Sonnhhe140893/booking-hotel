const Service = require("./../../models/Service.model")
const Article = require("../../models/Article.model"); // new

exports.index = async (req, res) => {
    const page = req.query.page || 1; const page_size = req.query.page_size  || 10;
    const services = await Service.find()
        .limit(page_size)
        .skip((page - 1) * page_size)
        .exec();

    // get total documents in the Posts collection
    const count = await Service.count();

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

exports.store = async (req, res) => {
    const service = new Service({
        name: req.body.name,
        avatar: req.body.avatar || null,
        description: req.body.description,
        service_content: req.body.service_content
    })
    await service.save()
    return res.status(200).json({ data: service, status : 200 });
};

exports.update = async (req, res) => {
    try {
        const service = await Service.findOne({ _id: req.params.id })

        if (req.body.name) {
            service.name = req.body.name;
        }
        if (req.body.avatar) {
            service.avatar = req.body.avatar;
        }
        if (req.body.description) {
            service.description = req.body.description;
        }
        if (req.body.service_content) {
            service.service_content = req.body.service_content;
        }

        await service.save();
        return res.status(200).json({ data: service, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Service doesn't exist!" })
    }
};

exports.delete = async (req, res) => {
    try {
        await Service.deleteOne({ _id: req.params.id })
        return res.status(200).json({ data: [], status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Service doesn't exist!" })
    }
};
