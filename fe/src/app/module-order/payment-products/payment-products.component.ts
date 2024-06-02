import { ProductRoomService } from './../../service/product-room.service';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderService } from './../../service/order.service';
import { Component } from '@angular/core';
import moment from 'moment';
import { Router } from '@angular/router';
@Component({
    selector: 'app-payment-products',
    templateUrl: './payment-products.component.html',
    styleUrl: './payment-products.component.scss',
})
export class PaymentProductsComponent {
    dataBooking = new FormGroup({
        user_id: new FormControl(null),
        room_id: new FormControl(null),
        // discount_id:
        // discount_code:
        // discount:number;
        // status:
        // status_payment:
        price: new FormControl(0),
        total_money: new FormControl(0),
        amount_of_people: new FormControl(null),
        payment_type: new FormControl(null),
        note: new FormControl(null),
        check_in: new FormControl(null),
        check_out: new FormControl(null),
        customer_name: new FormControl(null),
        customer_email: new FormControl(null),
        customer_phone: new FormControl(null),
        // updated_by:
    });
    rooms: any;

    constructor(
        private OrderService: OrderService,
        private ProductRoomService: ProductRoomService,
        private Router : Router,
    ) {
        console.log('Cách Lấy giá trị trừ form group---------> ');
        console.log('Giá trị form group---------> ', this.dataBooking.value);
        console.log('========================================');

        /***
         *
         * Cách truyền giá trị vào formGroup:
         * FormGroup là 1 object trong chứa các formControl (key: value);
         *      dataBooking.patchValue({
         *          price: 1,
         *          user_id: 1
         *      })
         *
         *
         */

        /**==========LUỒNG BOOKING ===================
         * CT: total_money = (checkout - checkin) * price
         * - Khi change value của checkin hoặc check out sẽ tính lại tính lại total_money = checkout - checkin * price
         * - Khi change value của select ( chọn option) sẽ patchvalue giá trị room_id và price vào form,
         * rồi tính total_money theo công thức trên
         */
    }

    ngOnInit(): void {
        this.getRooms({});
    }

    handleSubmit() {
        console.log(
            'Giá trị form group khi submit---------> ',
            this.dataBooking.value

        );
        this.OrderService.bookingsRooms(this.dataBooking.value).subscribe(
            (res: any) => {
                this.dataBooking = res;
                console.log('resssssssssssssssssssssssss= ', res);
                this.Router.navigate(['/product']);

            }

        );


    }

    totalRoom() {
        let price = this.dataBooking.get('price')?.value;
        if (
            this.dataBooking.value.check_in &&
            this.dataBooking.value.check_out &&
            price
        ) {
            let check_in = moment(this.dataBooking.value.check_in);
            let check_out = moment(this.dataBooking.value.check_out);
            let days = check_out.diff(check_in, 'days');
            console.log('days------------>', days);
            let total = days * price;
            console.log('totalllllllll', total);
            this.dataBooking.patchValue({ total_money: total });
        }
    }

    //mỗi skien change của htmlElment : select,input ,,, chỉ nhận 1 event
    onDateChange(event:any){
        this.totalRoom();
    }

    onRoomChange(event: any) {
        if (event) {

            let roomId = event.target.value;
            console.log('value event change room ID--------', roomId);
            let room: any = this.rooms.find((room: any) => room._id === roomId);
            let price = room?.price;

            console.log('priceId=======================', price);
            console.log('roommmmmmm', room);
            this.dataBooking.patchValue({
                room_id: roomId,
                price: price,

            });

            this.totalRoom();
        }
    }

    getRooms(filters: any) {
        this.ProductRoomService.getAll(filters).subscribe((res: any) => {
            this.rooms = res?.data?.rooms;
            console.log('=========ầdadfs======', res);
        });
    }
}
