const { buildParamPaging, buildResponsePaging } = require( "../../helpers/buildData.helper" );
const Menu = require("../../models/Menu.model");

exports.index = async (req, res) => {
    // destructure page and limit and set default values

    try {
        const condition = {};
		const paging = buildParamPaging( req.query );
        // execute query with page and limit values
        const menus = await Menu.find()
            .where(condition)
            .limit( paging.page_size )
			.skip( ( paging.page - 1 ) * paging.page_size )
			.exec();

        // get total documents in the Posts collection
        const count = await Menu.count().where(condition);

        // return response with posts, total pages, and current page
        const meta = buildResponsePaging( paging.page, paging.page_size, count )
        const status =  200;
        const data = {
            menus: menus
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
        const menu = await Menu.findOne({ _id: req.params.id })
        return res.status(200).json({ data: menu, status : 200 });
    } catch {
        res.status(404)
        res.send({ error: "Menu doesn't exist!" })
    }
};
