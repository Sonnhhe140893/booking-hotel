const User = require('./../models/User.model');
const Permission = require('./../models/Permission.model');
const {verify} = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
    // Lấy access token từ header
    // return next();
    let pathUrlRoute = req.route.path;
    console.log('=========> ROUTE PATH : ', pathUrlRoute);

    const accessTokenFromHeader = req.headers.x_authorization;

    if (!accessTokenFromHeader) {
        return res.status(401).send('Không tìm thấy access token!');
    }


    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await this.verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );

	console.log('verify-------> ', verified);

    if (!verified) {
        return res
            .status(401)
            .send({error: 'Bạn không có quyền truy cập vào tính năng này!'});
    }

    let user = await User.findOne({ email: verified.payload.email}).populate(['roles']);
    req.user = user;
    // console.log('------------- ADMIN LOGIN  => ', user);
    console.log('------------- req.path => ', req.path);
	if(user?.type === 'USER') {
		return next();
	}
    let roles = user.roles;
    // console.log('=========> CHECK ROLES <=============', roles);
    if (roles.length !== 0) {
        for (let i = 0 ; i < roles.length; i ++) {
            let permissions = roles[i].permissions;
            console.log('=========> ROLE  <=============', roles[i].name);
            for (let j = 0; j < permissions.length ; j ++) {
                let permissionDB = await Permission.findOne({_id: permissions[j]})
                if (permissionDB) {
                    let checkPath = permissionDB.path;
                    if (checkPath.includes(pathUrlRoute)) {
                        console.log('============= PERMISSION PATH: ', checkPath);
                        console.log('============= PERMISSION pathUrlRoute: ', pathUrlRoute);
                        return next();
                    }
                }
            }
        }
        console.log('=========> KHÔNG CÓ QUYỀN TRUY CẬP <=============');
    }
    return res
        .status(403)
        .send('Bạn không có quyền truy cập vào tính năng này!');
    // return res.status(401).json({ data: [], status: 401 });
};

exports.verifyToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
        console.log(`Error in verify access token:  + ${token}`);
        console.log(`Error in verify access token:  + ${secretKey}`);
        return null;
    }
};
