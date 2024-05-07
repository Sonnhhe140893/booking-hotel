const DiscountModel = require("../../models/Discount.model");
const RoomModel = require("../../models/Room.model");
const Booking = require("./../../models/Booking.model");
const User = require("./../../models/User.model");
const moment = require("moment");
exports.index = async (req, res) => {
    const page = req.query?.page || 1; const page_size = req.query?.page_size || 10;
    try {
        // execute query with page and limit values
        const condition = {};
        if (req.query.user_id) condition.user_id = req.query.user_id;
        if (req.query.room_id) condition.room_id = req.query.room_id;
        if (req.query.status) condition.status = req.query.status;
        if (req.query.status_payment) condition.status_payment = req.query.status_payment;
        if (req.query.email) {
			condition.customer_email = {$regex : '.*'+ req.query.email + '.*'};
		}
		if(req.query.room_name) {
			let room = await RoomModel.findOne({name: {$regex : '.*'+ req.query.room_name + '.*'}});
			if(!room) {
				return res.json({
					data: {
						bookings: []
					},
					meta:{
						current_page: 1,
						page_size: req?.query.page_size,
						total: 0
					},
					status: 200
				});
			}
			condition.room_id = room.id;
		}


        const bookings = await Booking.find()
            .where(condition)
            .limit(page_size)
            .skip((page - 1) * page_size)
            .populate( [ 'room', 'discount_info' ] )
            .sort({ created_at: 'desc' })
            .exec();
 
			if(bookings?.length > 0) {
				for(let item of bookings) {
					if(item.updated_by) {
						item.admin = await User.findById(item.updated_by);
					}
				}
			}

        // get total documents in the Posts collection
        const count = await Booking.find().where(condition).count();

        // return response with posts, total pages, and current page
        const meta = {
            total_page: Math.ceil(count / page_size),
            total: count,
            current_page: parseInt(page),
            page_size: parseInt(page_size)
        }
        const status = 200;
        const data = {
            bookings: bookings
        }
        return res.status(200).json({
            data,
            meta,
            status
        });
    } catch (err) {
        console.error('error--------booking> ', err);
		return res.json({
			data: {
				bookings: []
			},
			meta:{
				current_page: 1,
				page_size: req?.query.page_size,
				total: 0
			},
			status: 200
		});
    }
};

exports.show = async (req, res) => {
    try {
        const service = await Booking.findOne({ _id: req.params.id })
        return res.status(200).json({ data: service, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Booking doesn't exist!" })
    }
};

exports.delete = async (req, res) => {
    try {
        await Booking.deleteOne({ _id: req.params.id })
        return res.status(200).json({ data: [], status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Booking doesn't exist!" })
    }
};


exports.update = async (req, res) => {
    try {
        const data = req.body;
		const admin = req.user;
        let booking = await Booking.findOne({ _id: req.params.id })

        if (data?.status) {
            booking.status = data.status;
        }

        if (data.check_out) {
            booking.check_out = moment(data.check_out);
        }

        if (data.check_out) {
            booking.check_in = moment(data.check_in);
        }

        if (data.amount_of_people) {
            booking.amount_of_people = Number(data.amount_of_people);
        }
        if (data.status_payment) {
            booking.status_payment = data.status_payment;
        }
        if (data.customer_name) {
            booking.customer_name = data.customer_name;
        }
        if (data.customer_email) {
            booking.customer_email = data.customer_email;
        }
        if (data.customer_phone) {
            booking.customer_phone = data.customer_phone;
        }

        if (data.payment_type) booking.payment_type = Number(data?.payment_type)

        // xử lý thời gian
        let now = moment(booking.check_out); //todays date
        let end = moment(booking.check_in); // another date
        let duration = moment.duration(now.diff(end));
        let days = duration.asDays();

        let roomID = data.room_id;
        let room = await RoomModel.findById({ _id: roomID });
        if (!room?.category_id) room.category_id = 0;
        if (data.status !== 'TỪ CHỐI' && data.status !== 'HỦY' && data.status !== 'HOÀN THÀNH') {
            room.status = "CHO THUÊ";
        } else {
            room.status = "EMPTY";
        }
        room.save();

        booking.room = roomID;
        booking.room_id = roomID;
        booking.price = room.price;
        booking.total_money = room.price * days;


		// check discount
        if (data.discount_id) {
            let codeDiscount = await DiscountModel.findById({ _id: data.discount_id });
            if (codeDiscount) {
                booking.discount_id = data.discount_id;
                booking.discount = codeDiscount.price;
                booking.total_money -= codeDiscount.price;
                if (booking.total_money < 0) booking.total_money = 0;
				booking.discount_code = data.discount_code;
            }
        }

		booking.updated_by = admin?._id || 0;

        await booking.save();
        return res.status(200).json({ data: booking, status: 200 });
    } catch (e) {
        console.log('booking update error--------> ', e);
        res.status(404)
        res.send({ error: "Booking doesn't exist!", message: e?.message || "Booking doesn't exist!" })
    }
};
