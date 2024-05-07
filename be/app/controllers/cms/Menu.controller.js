const Menu = require("../../models/Menu.model");

exports.index = async (req, res) => {
    // destructure page and limit and set default values
    const page = req.query.page || 1; const page_size = req.query.page_size  || 10;

    try {
        const condition = {};
        // execute query with page and limit values
        const menus = await Menu.find()
            .where(condition)
            .limit(page_size)
            .skip((page - 1) * page_size)
            .exec();

        // get total documents in the Posts collection
        const count = await Menu.count();

        // return response with posts, total pages, and current page
        const meta = {
            total_page: Math.ceil(count / page_size),
            total: count,
            current_page: parseInt(page),
            page_size: parseInt(page_size)
        }
        const status =  200;
        const data = {
            menus: menus
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
        const menu = await Menu.findOne({ _id: req.params.id })
        return res.status(200).json({ data: menu, status : 200 });
    } catch {
        res.status(404)
        res.send({ error: "Menu doesn't exist!" })
    }
};

exports.store = async (req, res) => {
    let data = req.body;
    const menu = new Menu(data);
    await menu.save();
    return res.status(200).json({ data: menu, status : 200 });
};

exports.update = async (req, res) => {
    try {
        const menu = await Menu.findOne({ _id: req.params.id })

        if (req.body.name) {
            menu.name = req.body.name;
        }
        if (req.body.email) {
            menu.email = req.body.email;
        }
        if (req.body.subject) {
            menu.subject = req.body.subject;
        }
        if (req.body.message) {
            menu.message = req.body.message;
        }

        await menu.save();
        return res.status(200).json({ data: menu, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Menu doesn't exist!" })
    }
};

exports.delete = async (req, res) => {
    try {
        await Menu.deleteOne({ _id: req.params.id })
        return res.status(200).json({ data: [], status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Menu doesn't exist!" })
    }
};


function difference(A, B) {
    const arrA = Array.isArray(A) ? A.map(x => x.toString()) : [A.toString()];
    const arrB = Array.isArray(B) ? B.map(x => x.toString()) : [B.toString()];

    const result = [];
    for (const p of arrA) {
        if (arrB.indexOf(p) === -1) {
            result.push(p);
        }
    }

    return result;
}
