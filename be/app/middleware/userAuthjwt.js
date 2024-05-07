const User = require('../models/User.model');
const Permission = require('../models/Permission.model');
const {verify} = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
    // Lấy access token từ header
    // return next();
	try
	{

		const accessTokenFromHeader = req.headers.x_authorization;

		if ( !accessTokenFromHeader )
		{
			throw { code: '401', message: 'Không tìm thấy access token!' };
		}


		const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

		const verified = await this.verifyToken(
			accessTokenFromHeader,
			accessTokenSecret,
		);

		console.log( 'verify user-------> ', verified );

		if ( !verified )
		{
			throw { message: 'Vui lòng đăng nhập lại!', status: 401, code: '401' };
		}

		let user = await User.findOne( { email: verified.payload.email } );
		req.user = user;
		if ( user )
		{
			return next();
		}
		
		throw { message: 'Vui lòng đăng nhập lại!', status: 401, code: '401' };

	} catch ( error )
	{
		console.log( 'user middleware error-------> ', error );
		return res.json( error );
	}
   
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
