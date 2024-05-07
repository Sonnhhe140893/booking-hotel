const Role = require("./../../models/Role.model") // new
const Permission = require("./../../models/Permission.model")
const Room = require("../../models/Room.model"); // new

exports.index = async (req, res) => {
    // destructure page and limit and set default values
    const page = req.query.page || 1; const page_size = req.query.page_size  || 10;

    try {
        // execute query with page and limit values
        const roles = await Role.find()
            .limit(page_size)
            .skip((page - 1) * page_size)
            .exec();

        // get total documents in the Posts collection
        const count = await Role.count();

        // return response with posts, total pages, and current page
        const meta = {
            total_page: Math.ceil(count / page_size),
            total: count,
            current_page: parseInt(page),
            page_size: parseInt(page_size)
        }
        const status =  200;
        const data = {
            roles: roles
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
        const role = await Role.findOne({ _id: req.params.id });
        console.log('------------- role: ', role);
        return res.status(200).json({ data: role, status : 200 });
    } catch {
        res.status(404)
        res.send({ error: "Role doesn't exist!" })
    }
};

exports.store = async (req, res) => {

    const role = await Role.create({
        name: req.body.name,
        description: req.body.description,
        permissions: req.body.permissions,
    })

    await Permission.updateMany({ '_id': role.permissions }, { $push: { roles: role._id } });
    return res.status(200).json({ data: role, status : 200 });
};

exports.update = async (req, res) => {
    try {
        // product <-> role
        const _id = req.params.id;
        const role = req.body;

        const newPermissions = role.permissions || [];

        const oldRole = await Role.findOne({ _id });
        const oldPermissions = oldRole.permissions;

        // const role = await Role.findOne({ _id: req.params.id })

        Object.assign(oldRole, role);
        const newRole = await oldRole.save();

        const added = difference(newPermissions, oldPermissions);
        const removed = difference(oldPermissions, newPermissions);

        await Permission.updateMany({ '_id': added }, { $addToSet: { roles: _id } });
        await Permission.updateMany({ '_id': removed }, { $pull: { roles: _id } });

        return res.status(200).json({ data: role, status: 200 });
    } catch (e){
        console.log('--------------------- E: ', e);
        res.status(404);
        res.send({ error: "Role doesn't exist!" })
    }
};

exports.delete = async (req, res) => {
    try {
        const _id = req.params.id;
        console.log('------ DELETE ID: => ', _id);
        const role = await Role.findOne({ _id });
        if (role) {
            console.log('--------- ROLE DELETE: ', role);
            await Role.deleteOne({ _id: _id })
            await Permission.updateMany({ '_id': role.permissions }, { $pull: { roles: _id } });
        }

        return res.status(200).json({ data: [], status: 200 });
    } catch (e){
        console.log('--------------------- E: ', e);
        res.status(404)
        res.send({ error: "Role doesn't exist!" })
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

