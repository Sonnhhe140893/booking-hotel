const User = require( "../../models/User.model" );
const Discount = require( "./../../models/Discount.model" );
const nodemailer = require( 'nodemailer' );


exports.index = async ( req, res ) =>
{
	const page = req.query.page || 1; const page_size = req.query.page_size || 10;

	try
	{
		// execute query with page and limit values
		const condition = {};
		if ( req.query.code ) condition.code = req.query.code;
		const discounts = await Discount.find()
			.where( condition )
			.limit( page_size )
			.skip( ( page - 1 ) * page_size )
			.exec();

		// get total documents in the Posts collection
		const count = await Discount.count();

		// return response with posts, total pages, and current page
		const meta = {
			total_page: Math.ceil( count / page_size ),
			total: count,
			current_page: parseInt( page ),
			page_size: parseInt( page_size )
		}
		const status = 200;
		const data = {
			discounts: discounts
		}
		res.json( {
			data,
			meta,
			status
		} );
	} catch ( err )
	{
		console.error('discount------->', err.message );
	}
};

exports.show = async ( req, res ) =>
{
	try
	{
		const discounts = await Discount.findOne( { _id: req.params.id } )
		return res.status( 200 ).json( { data: discounts, status: 200 } );
	} catch {
		res.status( 404 )
		res.send( { error: "Discount doesn't exist!" } )
	}
};

exports.store = async ( req, res ) =>
{
	const discount = new Discount( {
		name: req.body.name,
		price: req.body.price || 0,
		status: req.body.status,
		code: req.body.code,
		max_use: req.body.max_use,
	} )
	await discount.save()
	return res.status( 200 ).json( { data: discount, status: 200 } );
};

exports.update = async ( req, res ) =>
{
	try
	{
		const discount = await Discount.findOne( { _id: req.params.id } )
		if ( discount )
		{
			if ( req.body.name )
			{
				discount.name = req.body.name;
			}
			discount.price = req.body.price;
			discount.code = req.body.code;
			discount.status = req.body.status;
			discount.max_use = req.body.max_use;

			await discount.save();
			return res.status( 200 ).json( { data: discount, status: 200 } );
		}

	} catch ( error )
	{
		res.status( 404 )
		res.send( { error: error.message || 'Mã giảm giá không tồn tại.' } )
	}
};

exports.delete = async ( req, res ) =>
{
	try
	{
		await Discount.deleteOne( { _id: req.params.id } )
		return res.status( 200 ).json( { data: [], status: 200 } );
	} catch {
		res.status( 404 )
		res.send( { error: "Discount doesn't exist!" } )
	}
};

exports.sendMail = async ( req, res ) =>
{
	try
	{
		const discounts = await Discount.findOne( { _id: req.params.id } );
		if ( !discounts )
		{
			throw { message: 'Mã giảm giá không tồn tại' };
		}
		console.log( discounts );
		const users = await User.find()

			.select( [ 'email', 'name', 'phone' ] )
			.where( {
				type: 'USER'
			} );
		if ( users?.length > 0 )
		{
			users.map( item =>
			{
				let data = {
					email: item.email,
					name: item.name,
					code: discounts.code,
					price: discounts.price.toFixed( 0 ).replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' )
				}
				this.sendMailUser( data );
			} );
			return res.status( 200 ).json( { data: [], status: 200 } );

		}


	} catch ( error )
	{
		return {
			status: 400,
			message: error?.message || 'Có lỗi xảy ra'
		}
	}
}

exports.sendMailUser = async ( data ) =>
{
	console.log( 'user data send-------> ', data );
	let transporter = nodemailer.createTransport( { // config mail server
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,

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
				<h3 style="color: #0d6efd">Xin chào, ${ data.name }</h3>
				<p style="color: black">
					<b>Chúng tôi có mã giảm giá mới gửi đến bạn:</b>
				</p>

				<p style="color: black">Mã Code: <b>${ data.code }</b></p>
				<p style="color: black">Giảm giá: <b>${ data.price }đ</b></p>
				<p>
				Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu bổ sung nào, 
				xin hãy liên hệ với chúng tôi qua số Hotline <b>0939.460.399</b> 
				hoặc gửi email về địa chỉ haan.resort@gmail.com. 
				Chúng tôi luôn sẵn lòng giúp đỡ bạn.
				</p>
				
				<p>Trân trọng,</p>
				<p><b>Haan Resort & Golf</b></p>
			</div>
		</div>
	`;
	let mainOptions = {
		from: '[Haan Resort & Golf] haan.resort@gmail.com',
		to: data.email,
		bcc: 'nptdt4601@gmail.com',
		subject: `[Discount] Mã giảm giá ${ data.code }`,
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
}
