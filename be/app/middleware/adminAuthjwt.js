const User = require( '../models/User.model' );
const Permission = require( '../models/Permission.model' );
const { verify } = require( "jsonwebtoken" );

exports.roleGuards = async ( req, res, next ) =>
{
	// Lấy access token từ header
	// return next();
	try
	{
		let pathUrlRoute = req.route.path;

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

		console.log( 'verify admin-------> ', verified );

		if ( !verified )
		{
			throw { message: 'Vui lòng đăng nhập lại!', status: 401, code: '401' };
		}

		let user = await User.findOne( { email: verified.payload.email } ).populate( [ 'roles' ] );
		req.user = user;
		// console.log('------------- ADMIN LOGIN  => ', user);
		// console.log( '------------- req.path admin => ', req.path );
		if ( !user )
		{
			throw { message: 'Vui lòng đăng nhập lại!', status: 401, code: '401' };
		}
		if ( user?.type == 'USER' )
		{
			throw { message: 'Bạn không có quyền truy cập vào tính năng này!', status: 403, code: '403' };
		}
		let roles = user?.roles;
		// console.log( 'roles admin--------> ', roles );
		// console.log('=========> CHECK ROLES <=============', roles);
		if ( roles?.length > 0 )
		{
			for ( let i = 0; i < roles.length; i++ )
			{
				let permissions = roles[ i ].permissions;
				// console.log( '=========> ROLE  <=============', roles[ i ].name );
				for ( let j = 0; j < permissions.length; j++ )
				{
					let permissionDB = await Permission.findOne( { _id: permissions[ j ] } )
					if ( permissionDB )
					{
						let checkPath = permissionDB.path;
						if ( checkPath.includes( pathUrlRoute ) )
						{
							// console.log( '============= PERMISSION PATH: ', checkPath );
							// console.log( '============= PERMISSION pathUrlRoute: ', pathUrlRoute );
							return next();
						}
					}
				}
			}
			console.log( '=========> KHÔNG CÓ QUYỀN TRUY CẬP <=============' );
		}
		throw { message: 'Bạn không có quyền truy cập vào tính năng này!', status: 403, code: '403' }
	} catch ( error )
	{
		console.log( 'admin middleware error-------> ', error );
		return res.json( error );
	}


};

exports.verifyToken = async ( token, secretKey ) =>
{
	try
	{
		return await verify( token, secretKey );
	} catch ( error )
	{
		console.log( `Error in verify access token:  + ${ error }` );
		console.log( `Error in verify access token:  + ${ token }` );
		console.log( `Error in verify access token:  + ${ secretKey }` );
		return null;
	}
};
