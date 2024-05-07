const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookingSchema = new Schema(
	{
		user_id: { type: String },
		room_id: { type: String, required: 'room_id cannot be blank' },
		discount_id: { type: String },
		discount_code: { type: String },
		discount: { type: Number },
		status: { type: String, default: "ĐANG XỬ LÝ" },
		status_payment: { type: String, default: "ĐÃ THANH TOÁN" },
		price: { type: Number, required: 'room_id cannot be blank' },
		total_money: { type: Number, required: 'room_id cannot be blank' },
		amount_of_people: { type: Number, required: 'room_id cannot be blank' },
		payment_type: { type: Number, required: 'payment_type cannot be blank' },
		note: { type: String },
		check_in: { type: Date, required: 'room_id cannot be blank' },
		check_out: { type: Date, required: 'room_id cannot be blank' },
		customer_name: { type: String },
		customer_email: { type: String },
		customer_phone: { type: String },
		updated_by: { type: String },
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Room"
		},
		discount_info: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "discount"
		},
		created_at: { type: Date, default: Date.now }
	},
	{ collection: 'bookings' }
);

module.exports = mongoose.model('Booking', bookingSchema);
