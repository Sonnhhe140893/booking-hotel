const { buildResponsePaging, buildParamPaging } = require( "../../helpers/buildData.helper" );
const Room = require("./../../models/Room.model")
const Category = require("./../../models/Category.model")
const User = require("./../../models/User.model")

exports.index = async (req, res) => {

    try {
        // execute query with page and limit values
		let condition = {}
		if(req.query.size) condition.size = req.query.size;
		if(req.query.bed) condition.bed = req.query.bed;
		if(req.query.name) condition.name = {$regex : '.*'+ req.query.name + '.*'};
		if(req.query.price) condition.price = req.query.price;
		if(req.query.floors) condition.floors = req.query.floors;
		if(req.query.category_id) condition.category_id = req.query.category_id;
		if(req.query.status) condition.status = req.query.status;

		const paging = buildParamPaging( req.query );
		const rooms = await Room.find()
		.where( condition )
		.limit( paging.page_size )
		.skip( ( paging.page - 1 ) * paging.page_size )
        .populate(['category'])
		.exec();

		if(rooms?.length > 0) {
			for(let item of rooms) {
				if(item.updated_by) {
					item.admin = await User.findById(item.updated_by);
				}
			}
		}


	// get total documents in the Posts collection
	const count = await Room.count().where(condition);

        // return response with posts, total pages, and current page
        const meta = buildResponsePaging( paging.page, paging.page_size, count )
        const status =  200;
        const data = {
            rooms: rooms
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
        const room = await Room.findOne({ _id: req.params.id })
        return res.status(200).json({ data: room, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Room doesn't exist!" })
    }
};

exports.store = async (req, res) => {
    const category = await Category.findById(req.body.category_id);
    const room = new Room({
        name: req.body.name,
        avatar: req.body.avatar || null,
        description: req.body.description,
        room_content: req.body.room_content,
        price: req.body.price,
        size: req.body.size,
        bed: req.body.bed,
		customer: req.body.customer,
		albums: req.body.albums,
        room_code: req.body.room_code,
        floors: req.body.floors,
        category: category,
        category_id: req.body.category_id
    })
    await room.save()
    return res.status(200).json({ data: room, status : 200 });
};

exports.update = async (req, res) => {
    try {
        const room = await Room.findOne({ _id: req.params.id })
        const category = await Category.findById(req.body.category_id);
        if (req.body.name) {
            room.name = req.body.name;
        }
        if (req.body.avatar) {
            room.avatar = req.body.avatar;
        }

		if (req.body.customer) {
            room.customer = req.body.customer;
        }
		if (req.body.albums) {
            room.albums = req.body.albums;
        }
        if (req.body.description) {
            room.description = req.body.description;
        }
        if (req.body.room_content) {
            room.room_content = req.body.room_content;
        }

        if (req.body.price) {
            room.price = req.body.price;
        }

        if (req.body.category_id) {
            room.category_id = req.body.category_id;
            room.category = category;
        }

        if (req.body.size) {
            room.size = req.body.size;
        }

        if (req.body.bed) {
            room.bed = req.body.bed;
        }

        if (req.body.room_code) {
            room.room_code = req.body.room_code;
        }

        if (req.body.floors) {
            room.floors = req.body.floors;
        }

		if(req.body.status) room.status = req.body.status;

		const admin = req.user;

		room.updated_by = admin._id;

        await room.save();
        return res.status(200).json({ data: room, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Room doesn't exist!" })
    }
};

exports.delete = async (req, res) => {
    try {
        await Room.deleteOne({ _id: req.params.id })
        return res.status(200).json({ data: [], status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Room doesn't exist!" })
    }
};

exports.updateVoting = async ( data, number ) =>
{
	try
	{
		const room = await Room.findOne( { _id: data.room_id } );
		if ( room )
		{

			room.total_vote = room.total_vote ? Number( room.total_vote ) + number : number;
			room.total_star = room.total_star ? Number( room.total_star ) + Number( data.vote_number ) : Number( data.vote_number );
			await room.save();
		}
	} catch ( e )
	{
		throw e;
	}
};
