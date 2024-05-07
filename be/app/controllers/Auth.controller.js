const User = require( "./../models/User.model" ) // new
const bcrypt = require( 'bcryptjs' );

const jwt = require( 'jsonwebtoken' );
const promisify = require( 'util' ).promisify;

const sign = promisify( jwt.sign ).bind( jwt );
const verify = promisify( jwt.verify ).bind( jwt );

const authMiddleware = require( './../../app/middleware/userAuthjwt' );
const Article = require( "../models/Article.model" );
const { makeid } = require( "../helpers/buildData.helper" );
const nodemailer = require( 'nodemailer' );
const isAuth = authMiddleware.isAuth;

exports.register = async ( req, res ) =>
{
	try
	{
		console.log( '----------- req: ', req.body );
		const email = req.body.email.toLowerCase();
		const checkUser = await User.findOne( { email: email } );
		if ( checkUser ) return res.status( 200 ).json( { message: 'Email này đã được sử dụng', status: 400 } );

		const hashPassword = bcrypt.hashSync( req.body.password, 12 );
		console.log( '---------- hasPassword', hashPassword );
		const user = new User( {
			email: email,
			password: hashPassword,
			name: req.body.name,
			age: req.body.age,
			sex: req.body.sex,
			birthday: req.body.birthday,
			phone: req.body.phone
		} );

		console.log( '----------- user: ', user );

		await user.save();

		console.log( '--------- user: ', user );

		return res.status( 200 ).json( { data: user, status: 200 } );
	} catch (e){
		res.status( 404 )
		res.send( { message: e?.message } )
	}
};

exports.login = async ( req, res ) =>
{
	try
	{
		const email = req.body.email.toLowerCase();
		const user = await User.findOne( { email: email } );
		if ( !user ) return res.status( 200 ).json( { message: 'Tài khoản không tồn tại', status: 400 } );

		const isPasswordValid = bcrypt.compareSync( req.body.password, user.password );
		if ( !isPasswordValid )
		{
			return res.status( 200 ).json( { message: 'Mật khẩu không chính xác', status: 400 } );
		}

		const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
		const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

		const dataForAccessToken = {
			email: user.email,
		};
		const accessToken = await this.generateToken(
			dataForAccessToken,
			accessTokenSecret,
			accessTokenLife,
		);
		if ( !accessToken )
		{
			return res
				.status( 401 )
				.send( { message: 'Đăng nhập không thành công, vui lòng thử lại.' } );
		}
		const response = {
			accessToken: accessToken,
			user: user
		}
		return res.status( 200 ).json( { data: response, status: 200 } );
	} catch (e){
		res.status( 404 )
		res.send( { message: e?.message } )
	}
};
exports.getProfile = async ( req, res ) =>
{
	try
	{
		const user = req.user;
		const response = {
			user: user
		}
		return res.status( 200 ).json( { data: response, status: 200 } );
	} catch {
		res.status( 404 )
		res.send( { error: "register doesn't exist!" } )
	}
};

exports.updateInfo = async ( req, res ) =>
{
	try
	{
		const user = req.body;
		console.log( '------------------ USer', user );


		const userUpdate = await User.findOne( { _id: req.user._id } )
		console.log( '------------------ USER UPDATE', userUpdate );
		if ( user.name )
		{
			userUpdate.name = user.name;
		}
		if ( user.avatar )
		{
			userUpdate.avatar = user.avatar;
		}

		if ( user.birthday )
		{
			userUpdate.birthday = user.birthday;
		}

		if ( user.phone )
		{
			userUpdate.phone = user.phone;
		}

		await userUpdate.save();

		const response = {
			user: userUpdate
		}
		return res.status( 200 ).json( { data: response, status: 200 } );
	} catch ( e )
	{
		console.log( '------------- e', e );
		res.status( 501 );
		res.send( { error: "updateInfo error!".e } )
	}
};

exports.changePassword = async ( req, res ) =>
{
	try
	{
		const passwordData = req.body;
		if ( !passwordData || !passwordData.old_password || !passwordData?.new_password )
		{
			res.send( { error: "Password not empty!" } );
		}
		const user = req.user;
		if ( !user && !passwordData.email )
		{
			res.send( { status: 400, message: "Vui lòng nhập email của bạn!" } );
		}
		let condition = {};
		if ( passwordData.email )
		{
			condition.email = passwordData.email.trim();
		} else
		{
			condition._id = user?._id;
		}


		const userUpdate = await User.findOne( condition )
		console.log( '------------------ USER UPDATE', userUpdate );
		if ( userUpdate )
		{
			const isPasswordValid = bcrypt.compareSync( passwordData.old_password, userUpdate?.password );
			if ( !isPasswordValid )
			{
				return res.status( 200 ).json( { message: 'Mật khẩu không chính xác', status: 403 } );
			}
			userUpdate.password = bcrypt.hashSync( passwordData.new_password.trim(), 12 );
			await userUpdate.save();
		}

		const response = {
			user: userUpdate
		}
		return res.status( 200 ).json( { data: response, status: 200 } );
	} catch ( e )
	{
		console.log(e);
		res.status( 501 );
		res.send( { error: "updateInfo error!", e } )
	}
};


exports.generateToken = async ( payload, secretSignature, tokenLife ) =>
{
	try
	{
		return await sign(
			{
				payload,
			},
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: tokenLife,
			},
		);
	} catch ( error )
	{
		console.log( `Error in generate access token:  + ${ error }` );
		return null;
	}
};

exports.sendMailPassword = async ( req, res ) =>
{
	try
	{
		const passwordData = req.body;
		
		const userUpdate = await User.findOne( { email: passwordData?.email } )
		console.log( '------------------ USER UPDATE', userUpdate );
		if ( userUpdate )
		{
			const newPass = makeid( 6 );
			userUpdate.password = bcrypt.hashSync( newPass, 12 );

			await userUpdate.save();

			let transporter = nodemailer.createTransport( { // config mail server
				host: 'smtp.gmail.com',
				port: 465,
				secure: true,
				// auth: {
				// 	user: 'lvtotnghiep123@gmail.com', //Tài khoản gmail vừa tạo
				// 	pass: 'rhgtundlonwrkhpa' //Mật khẩu tài khoản gmail vừa tạo
				// },
				auth: {
					user: 'nptdt4601@gmail.com', //Tài khoản gmail vừa tạo 
					pass: 'huuz zrbt jfcs yuaq' //Mật khẩu tài khoản gmail vừa tạo huuz zrbt jfcs yuaq
				},
				tls: {
					// do not fail on invalid certs
					rejectUnauthorized: false
				}
			} );
			let content = '';
			content += `
				<div style="background-color: #003375; margin: 0 auto; max-width: 600px; ">
					<div style="padding: 10px; background-color: white;">
						<h4 style="color: #0d6efd">Xin chào, ${ passwordData.email }</h4>
						<p style="color: black">Mật khẩu của bạn đã được khởi tạo thành công. Vui lòng thay đổi lại mật khẩu</p>
						
						
						<span style="color: black">Mật khẩu: <b>${ newPass }</b></span><br>

						<p>Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu bổ sung nào, xin hãy liên hệ với chúng tôi qua số Hotline <b>0939.460.399</b> hoặc gửi email về địa chỉ haan.resort@gmail.com. Chúng tôi luôn sẵn lòng giúp đỡ bạn.</p>
						
						<p>Trân trọng,</p>
						<p><b>Haan Resort & Golf</b></p>
					</div>
				</div>
			`;
			let mainOptions = {
				from: '[Haan Resort & Golf] haan.resort@gmail.com', 
				to: passwordData.email,
				bcc: 'nptdt4601@gmail.com',
				subject: '[Password] Khởi tạo mật khẩu',
				html: content
			}
			transporter.sendMail( mainOptions, function ( err, info )
			{
				if ( err )
				{
					console.log( err );
				} else
				{
					console.log( ' SUCCESS ' + info.response );
				}
			} );
		} else
		{
			return res.json( { status: 400, message: "Không tìm thấy tài khoản!" } );
		}

		const response = {
			user: userUpdate
		}
		return res.status( 200 ).json( { data: response, status: 200 } );
	} catch ( e )
	{
		console.log(e);
		res.status( 501 );
		res.send( { error: "updateInfo error!", message: e?.message } )
	}
};


