const User = require("./../../models/User.model")
const bcrypt = require("bcryptjs");
const Role = require("../../models/Role.model");
const Permission = require("../../models/Permission.model"); // new

exports.index = async (req, res) => {
    // destructure page and limit and set default values
    const page = req.query.page || 1; 
	const page_size = req.query.page_size  || 10;

    try {
        const condition = {};
        condition.type = 'ADMIN';
        // execute query with page and limit values
        const users = await User.find()
            .where(condition)
            .limit(page_size)
            .skip((page - 1) * page_size)
            .populate(['roles'])
            .exec();

        // get total documents in the Posts collection
        const count = await User.count();

        // return response with posts, total pages, and current page
        const meta = {
            total_page: Math.ceil(count / page_size),
            total: count,
            current_page: parseInt(page),
            page_size: parseInt(page_size)
        }
        const status =  200;
        const data = {
            users: users
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
        const user = await User.findOne({ _id: req.params.id })
        return res.status(200).json({ data: user, status : 200 });
    } catch {
        res.status(404)
        res.send({ error: "Article doesn't exist!" })
    }
};

exports.store = async (req, res) => {
	const checkUser = await User.findOne( { email: req.body.email } );
	if ( checkUser ) return res.status( 200 ).json( { message: 'Email này đã được sử dụng', status: 400 } );
    const hashPassword = bcrypt.hashSync(req.body.password, 12);
    const user = new User({
        name: req.body.name,
        avatar: req.body.avatar || null,
        password: hashPassword,
        email: req.body.email,
        birthday: req.body.birthday,
        sex: req.body.sex,
		phone: req.body.phone,
        status: req.body.status || 1,
        type: "ADMIN",
        roles: req.body.roles || []
    })
    await user.save();
    await Role.updateMany({ '_id': user.roles }, { $push: { admins: user._id } });
    return res.status(200).json({ data: user, status : 200 });
};

exports.update = async (req, res) => {
    try {
        const _id = req.params.id;
        const user = req.body;

        if (user.password) {
            user.password = bcrypt.hashSync(user.password, 12);
        }

        // permission <-> role
        const newRoles = user.roles || [];
        console.log('------------- new ROLE: ', newRoles);
        const oldUser = await User.findOne({ _id });
        const oldRoles = oldUser.roles;

        Object.assign(oldUser, user);
        const newUser = await oldUser.save();

        const added = difference(newRoles, oldRoles);
        const removed = difference(oldRoles, newRoles);

        await Role.updateMany({ '_id': added }, { $addToSet: { admins: _id } });
        await Role.updateMany({ '_id': removed }, { $pull: { admins: _id } });

        return res.status(200).json({ data: newUser, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
};

exports.delete = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        return res.status(200).json({ data: [], status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
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
