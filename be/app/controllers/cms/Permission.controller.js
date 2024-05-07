const Permission = require("./../../models/Permission.model")

exports.index = async (req, res) => {
    const page = req.query.page || 1; const page_size = req.query.page_size  || 10;

    try {
        // execute query with page and limit values
        const permissions = await Permission.find()
            .limit(page_size)
            .skip((page - 1) * page_size)
            .exec();

        // get total documents in the Posts collection
        const count = await Permission.count();

        // return response with posts, total pages, and current page
        const meta = {
            total_page: Math.ceil(count / page_size),
            total: count,
            current_page: parseInt(page),
            page_size: parseInt(page_size)
        }
        const status =  200;
        const data = {
            permissions: permissions
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
        const permission = await Permission.findOne({ _id: req.params.id })
        return res.status(200).json({ data: permission, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Permission doesn't exist!" })
    }
};

exports.store = async (req, res) => {
    const permission = new Permission({
        name: req.body.name,
        description: req.body.description || null,
        path: req.body.path || null
    })
    await permission.save()
    return res.status(200).json({ data: permission, status : 200 });
};

exports.update = async (req, res) => {
    try {
        const permission = await Permission.findOne({ _id: req.params.id })

        if (req.body.name) {
            permission.name = req.body.name;
        }
        if (req.body.description) {
            permission.description = req.body.description;
        }
        if (req.body.path) {
            permission.path = req.body.path;
        }

        await permission.save();
        return res.status(200).json({ data: permission, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Permission doesn't exist!" })
    }
};

exports.delete = async (req, res) => {
    try {
        await Permission.deleteOne({ _id: req.params.id })
        return res.status(200).json({ data: [], status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Permission doesn't exist!" })
    }
};

exports.seed = async (req, res) => {
    try {
        const permissions = [
            {
                name : 'List booking',
                description: 'Danh sách booking',
                path: '/booking/'
            },
            {
                name : 'show booking',
                description: 'show booking',
                path: '/booking/:id'
            },
            {
                name : 'Update booking',
                description: 'Update booking',
                path: '/booking/update/:id'
            },
            {
                name : 'List room',
                description: 'Danh sách phòng',
                path: '/room/'
            },
            {
                name : 'show room',
                description: 'show room',
                path: '/room/:id'
            },
            {
                name : 'add room',
                description: 'Thêm mới room',
                path: '/room/store'
            },
            {
                name : 'Update room',
                description: 'Update room',
                path: '/room/update/:id'
            },
            {
                name : 'List category',
                description: 'Danh sách category',
                path: '/category/'
            },
            {
                name : 'show category',
                description: 'show category',
                path: '/category/:id'
            },
            {
                name : 'add category',
                description: 'Thêm mới category',
                path: '/category/store'
            },
            {
                name : 'Update category',
                description: 'Update category',
                path: '/category/update/:id'
            },
            {
                name : 'List discount',
                description: 'Danh sách mã giảm giá',
                path: '/discount/'
            },
            {
                name : 'show discount',
                description: 'show discount',
                path: '/discount/:id'
            },
            {
                name : 'add discount',
                description: 'Thêm mới discount',
                path: '/discount/store'
            },
            {
                name : 'Update discount',
                description: 'Update discount',
                path: '/discount/update/:id'
            },
			{
                name : 'Send mail discount',
                description: 'Send mail discount',
                path: '/discount/send-mail/:id'
            },
            {
                name : 'List service',
                description: 'Danh sách service',
                path: '/service/'
            },
            {
                name : 'show service',
                description: 'show service',
                path: '/service/:id'
            },
            {
                name : 'add service',
                description: 'Thêm mới service',
                path: '/service/store'
            },
            {
                name : 'Update service',
                description: 'Update service',
                path: '/service/update/:id'
            },
            {
                name : 'List menu',
                description: 'Danh sách menu',
                path: '/menu/'
            },
            {
                name : 'show menu',
                description: 'show menu',
                path: '/menu/:id'
            },
            {
                name : 'add menu',
                description: 'Thêm mới menu',
                path: '/menu/store'
            },
            {
                name : 'Update menu',
                description: 'Update menu',
                path: '/menu/update/:id'
            },
            {
                name : 'List article',
                description: 'Danh sách article',
                path: '/article/'
            },
            {
                name : 'show article',
                description: 'show article',
                path: '/article/:id'
            },
            {
                name : 'add article',
                description: 'Thêm mới article',
                path: '/article/store'
            },
            {
                name : 'Update article',
                description: 'Update article',
                path: '/article/update/:id'
            },
            {
                name : 'List user',
                description: 'Danh sách user',
                path: '/user/'
            },
            {
                name : 'show user',
                description: 'show user',
                path: '/user/:id'
            },
            {
                name : 'add user',
                description: 'Thêm mới user',
                path: '/user/store'
            },
            {
                name : 'Update user',
                description: 'Update user',
                path: '/user/update/:id'
            },
            {
                name : 'List permission',
                description: 'Danh sách permission',
                path: '/permission/'
            },
            {
                name : 'show permission',
                description: 'show permission',
                path: '/permission/:id'
            },
            {
                name : 'add permission',
                description: 'Thêm mới permission',
                path: '/permission/store'
            },
            {
                name : 'Update permission',
                description: 'Update permission',
                path: '/permission/update/:id'
            },
            {
                name : 'List role',
                description: 'Danh sách role',
                path: '/role/'
            },
            {
                name : 'show role',
                description: 'show role',
                path: '/role/:id'
            },
            {
                name : 'add role',
                description: 'Thêm mới role',
                path: '/role/store'
            },
            {
                name : 'Update role',
                description: 'Update role',
                path: '/role/update/:id'
            },
            {
                name : 'List admin',
                description: 'Danh sách admin',
                path: '/admin/'
            },
            {
                name : 'show admin',
                description: 'show admin',
                path: '/admin/:id'
            },
            {
                name : 'add admin',
                description: 'Thêm mới admin',
                path: '/admin/store'
            },
            {
                name : 'Update admin',
                description: 'Update admin',
                path: '/admin/update/:id'
            },
            {
                name : 'Update profile',
                description: 'Update profile',
                path: '/profile'
            },

			{
                name : 'List vote',
                description: 'List vote',
                path: '/vote'
            },

			{
                name : 'Show vote',
                description: 'Show vote',
                path: '/vote/:id'
            },

			{
                name : 'Update Vote',
                description: 'Update Vote',
                path: '/vote/update/:id'
            },

			{
                name : 'Create Vote',
                description: 'Create Vote',
                path: '/vote/store'
            },

			{
                name : 'Delete vote',
                description: 'delete vote',
                path: '/vote/:id'
            },
			
        ]

        for(let i = 0 ; i < permissions.length ; i ++) {
            let permission = permissions[i];
            let check = await Permission.findOne({path: permission.path});
            console.log('------- CHECK: =>  ', check);
            if (!check) {
                const newData = new Permission(permission)
                await newData.save();
                console.log('------------- NEW PERMISSION: ', permission);
            }
        }

        return res.status(200).json({ data: [], status: 200 });
    } catch (e){
        console.log('--------------- E: ',e);
        res.status(404)
        res.send({ error: "Permission doesn't exist!" })
    }
};


