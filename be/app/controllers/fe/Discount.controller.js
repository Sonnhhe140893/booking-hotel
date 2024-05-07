const { buildParamPaging, buildResponsePaging } = require( "../../helpers/buildData.helper" );
const Discount = require( "./../../models/Discount.model" )

exports.index = async ( req, res ) =>
{
	const paging = buildParamPaging( req.query );

	try
	{
		// execute query with page and limit values
		const conditions = {};
		if ( req.query.status )
		{
			conditions.status = req.query.status
		}
		if ( req.query.code )
		{
			conditions.code = req.query.code
		}
		const discounts = await Discount.find()
			.where( conditions )
			.limit( paging.page_size )
			.skip( ( paging.page - 1 ) * paging.page_size )
			.exec();

		// get total documents in the Posts collection
		const count = await Discount.count().where( conditions );

		// return response with posts, total pages, and current page
		const meta = buildResponsePaging( paging.page, paging.page_size, count );
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
		console.error( err.message );
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
