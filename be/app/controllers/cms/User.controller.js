const User = require( "./../../models/User.model" ) // new

exports.index = async ( req, res ) =>
{
	// destructure page and limit and set default values
	const page = req.query.page || 1; const page_size = req.query.page_size || 10;

	try
	{
		const condition = {};
		condition.type = 'USER';
		// execute query with page and limit values
		const users = await User.find()
			.where( condition )
			.limit( page_size )
			.skip( ( page - 1 ) * page_size )
			.exec();

		// get total documents in the Posts collection
		const count = await User.count();

		// return response with posts, total pages, and current page
		const meta = {
			total_page: Math.ceil( count / page_size ),
			total: count,
			current_page: parseInt( page ),
			page_size: parseInt( page_size )
		}
		const status = 200;
		const data = {
			users: users
		}
		res.json( {
			data,
			meta,
			status
		} );
	} catch ( err )
	{
		console.error( err.message );
	}
};

exports.show = async ( req, res ) =>
{
	try
	{
		const user = await User.findOne( { _id: req.params.id } )
		return res.status( 200 ).json( { data: user, status: 200 } );
	} catch {
		res.status( 404 )
		res.send( { error: "Article doesn't exist!" } )
	}
};

exports.store = async ( req, res ) =>
{
	const checkUser = await User.findOne( { email: req.body.email } );
	if ( checkUser ) return res.status( 200 ).json( { message: 'Email này đã được sử dụng', status: 400 } );
	const user = new User( {
		name: req.body.name,
		avatar: req.body.avatar || null,
		email: req.body.email,
		phone: req.body.phone,
		birthday: req.body.birthday,
		sex: req.body.sex,
		status: req.body.status || 1,

	} )
	await user.save();
	return res.status( 200 ).json( { data: user, status: 200 } );
};

exports.update = async ( req, res ) =>
{
	try
	{
		const user = await User.findOne( { _id: req.params.id } )

		if ( req.body.name )
		{
			user.name = req.body.name;
		}
		if ( req.body.phone )
		{
			user.phone = req.body.phone;
		}
		if ( req.body.avatar )
		{
			user.avatar = req.body.avatar;
		}
		if ( req.body.email )
		{
			user.email = req.body.email;
		}
		if ( req.body.sex )
		{
			user.sex = req.body.sex;
		}
		if ( req.body.birthday )
		{
			user.birthday = req.body.birthday;
		}

		await user.save();
		return res.status( 200 ).json( { data: user, status: 200 } );
	} catch {
		res.status( 404 )
		res.send( { error: "User doesn't exist!" } )
	}
};

exports.delete = async ( req, res ) =>
{
	try
	{
		await User.deleteOne( { _id: req.params.id } )
		return res.status( 200 ).json( { data: [], status: 200 } );
	} catch {
		res.status( 404 )
		res.send( { error: "User doesn't exist!" } )
	}
};
