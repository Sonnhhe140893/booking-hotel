const Booking = require("./../../models/Booking.model");
const Room = require("./../../models/Room.model");
const Discount = require("./../../models/Discount.model");

const nodemailer = require('nodemailer');
const moment = require("moment");
const axios = require("axios");
const RoomModel = require("./../../models/Room.model");

exports.webhook = async (req, res) => {
    let _id = req.query.vnp_TxnRef;
    if (req.query.vnp_ResponseCode !== "00") { // req.query.vnp_ResponseCode === "00" thanh toán thành công
        const booking = await Booking.findById({ _id: _id });
        if (booking) {
            let room = await RoomModel.findById(booking.room_id);
            if (room) {
                // tiến hành gủi email
                var transporter = nodemailer.createTransport({ // config mail server
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'nptdt4601@gmail.com',
                        pass: 'huuz zrbt jfcs yuaq' //Mật khẩu tài khoản gmail vừa tạo huuz zrbt jfcs yuaq
                    },
                    tls: {
                        // do not fail on invalid certs
                        rejectUnauthorized: false
                    }
                });
                var content = '';
                content += `
					<div style="background-color: #003375; margin: 0 auto; max-width: 600px; ">
						<div style="padding: 10px; background-color: white;">
							<h4 style="color: #0d6efd">Xin chào ${booking.customer_name}</h4>
							<p style="color: black">Haan Resort & Golf xin chân thành cảm ơn bạn đã chọn chúng tôi là địa điểm lưu trú trong chuyến đi của bạn. Chúng tôi xin gửi đến bạn một email về việc đặt phòng của bạn đã được xác nhận và thanh toán thành công. 
                                                    Dưới đây là thông tin chi tiết về đặt phòng của bạn:</p>
							<span style="color: black">Tên khách hàng: <b>${booking.customer_name}</b></span> <br>
							<span style="color: black">Ngày nhận phòng: <b>${booking.check_in}</b></span> <br>
							<span style="color: black">Ngày trả phòng: <b>${booking.check_out}</b></span><br>
							<span style="color: black">Hạng phòng: <b>${room.name}</b></span> <br>
							<span style="color: black">Số lượng khách: <b>${booking.amount_of_people}</b></span><br>
							<span style="color: black">Tổng tiền: <b>${booking.total_money} VNĐ</b></span><br>
							<span style="color: black">Phương thức thanh toán: <b>Chuyển khoản</b></span><br>
							<p>Vui lòng kiểm tra thông tin trên và đảm bảo rằng chúng là chính xác. Nếu có bất kỳ sai sót nào hoặc bạn có bất kỳ yêu cầu nào khác, xin hãy liên hệ với chúng tôi ngay để chúng tôi có thể hỗ trợ bạn tốt nhất.</p>
							<p>Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu bổ sung nào, xin hãy liên hệ với chúng tôi bằng cách gọi số điện thoại <b>0939460399</b> hoặc gửi email về địa chỉ haan.resort@gmail.com. Chúng tôi luôn sẵn lòng giúp đỡ bạn.</p>
							<p>
								<img src="https://i.pinimg.com/564x/78/db/69/78db6917bb15faf5ac2158ed2b1a9061.jpg" style="width: 150px;height: auto" alt="">
							</p>
							<p>Vui lòng đưa mã QR này tại quầy lễ tân để làm thủ tục nhận phòng.</p>
                            <p>Chúng tôi hy vọng bạn sẽ có những trải nghiệm tuyệt vời tại HAAN Resort & Golf.</p>
							<p>Trân trọng,</p>
							<p><b>HAAN Resort & Golf</b></p>
						</div>
					</div>
				`;
                var mainOptions = {
                    from: '[Haan Resort & Golf] haan.resort@gmail.com',
                    to: booking.customer_email || 'nptdt4601@gmail.com',
                    bcc: 'nptdt4601@gmail.com',
                    subject: '[BOOKING] Đặt phòng và thanh toán thành công',
                    html: content
                }
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(' SUCCESS ' + info.response);
                    }
                });
            }
            booking.status_payment = "ĐÃ THANH TOÁN";
            booking.save();
        }

        return res.redirect('http://localhost:3015/payment/success');
    }

    return res.redirect('http://localhost:3015/payment/error');
    // return res.status(200).json({ data: req.query, status: 200 });
}

// const axios = require("axios").create({baseUrl: "https://123code.net/"});
exports.index = async (req, res) => {
    const page = req.query.page || 1;
    const page_size = req.query.page_size || 10;
    try {
        // execute query with page and limit values
        const condition = {};
        if (req.query.room_id) condition.room_id = req.query.room_id;
        if (req.query.user_id) condition.user_id = req.query.user_id;


        const bookings = await Booking.find()
            .where(condition)
            .limit(page_size)
            .populate(['room'])
            .skip((page - 1) * page_size)
            .sort({ created_at: 'desc' })
            .exec();

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
        res.json({
            data,
            meta,
            status
        });
    } catch (err) {
        console.error('booking list--------> ', err.message);
        res.send({ error: "Booking doesn't exist!" })
    }
};

exports.show = async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id });
        return res.status(200).json({ data: booking, status: 200 });
    } catch {
        res.status(404)
        res.send({ error: "Booking doesn't exist!" })
    }
};

exports.cancel = async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id });
        booking.status = 'HỦY';

        let room = await Room.findById({ _id: booking.room_id });
        room.status = "EMPTY";
        room.save();

        await booking.save();
        return res.status(200).json({ data: booking, status: 200 });
    } catch (e) {
        console.log('------------------ e', e);
        res.status(404)
        res.send({ error: "Booking doesn't exist!" })
    }
};

exports.add = async (req, res) => {
    try {
        let data = req.body;
        console.log('data--------> ', data);
        // xử lý thời gian
        var now = moment(data.check_out); //todays date
        var end = moment(data.check_in); // another date
        var duration = moment.duration(now.diff(end));
        var days = duration.asDays();

        let roomID = data.room_id;
        let room = await Room.findById({ _id: roomID });
        room.status = "CHO THUÊ";
        room.save();

        data.room = roomID;
        data.price = room.price;
        data.total_money = room.price * days;


        // check discount
        if (data.discount_id) {
            let codeDiscount = await Discount.findById({ _id: data.discount_id });
            if (codeDiscount) {
                console.log('-------------- codeDiscount: ', codeDiscount);
                console.log('-------------- check: ', codeDiscount.max_use > codeDiscount.max_process);
                if (codeDiscount.max_use && codeDiscount.max_use > codeDiscount.max_process) {
                    console.log('---------- OK VÀO ĐÂY RỒI');
                    data.discount = codeDiscount.price;
                    data.total_money -= codeDiscount.price;
                    if (data.total_money < 0) data.total_money = 0;

                    codeDiscount.max_process += 1;
                    codeDiscount.save();

                }else {
                    return res.status(200).json({ message: "Không tồn tại mã giảm giá hoạc mã giảm giá đã hết lượt sử dụng", status: 500 });
                }

            } else {
				data.discount_id = null;
				data.discount_code = null;
			}

        }

        const booking = new Booking(data);
        await booking.save();

        if (data.payment_type === 2) {
            try {
                let newData = {
                    order_id: booking._id,
                    url_return: 'http://localhost:3053/api/v1/booking/callback',
                    amount: data.total_money,
                    service_code: "hotel",
                    url_callback: 'http://localhost:3053/api/v1/booking/callback'
                }
                const response = await axios.post("https://123code.net/api/v1/payment/add", newData);
                if (response.data.link) {
                    data.link = response.data.link;
                }

            } catch (err) {
                res.status(500).json({ message: err });
            }
        }
        return res.status(200).json({ data: data, status: 200 });
    } catch (e) {
        res.status(501)
        res.send({ error: e })
    }
};
