
exports.buildParamPaging = ( queryParam ) =>
{
	return {
		page: queryParam.page || 1,
		page_size: queryParam.page_size || 10,
	}
}

exports.buildResponsePaging = ( page, page_size, total ) =>
{
	return {
		total_page: Math.ceil( total / page_size ),
		total: total,
		current_page: parseInt( page ),
		page_size: parseInt( page_size )
	}
}

exports.makeid = ( length = 5 ) =>
{
	let result = '';
	let characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	for ( let i = 0; i < length; i++ )
	{
		result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
	}
	return result;
}