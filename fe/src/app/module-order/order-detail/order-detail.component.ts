import { Component } from '@angular/core';
import { HelperSeriveService } from '../../service/common/helper-serive.service';
import { OrderService } from '../../service/order.service';
import { Booking } from '../../interface/booking';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
    constructor(
        private helperService: HelperSeriveService,
        private orderSevice: OrderService
    ) {}


    rooms: any;

    ngOnInit() {

         this.getOrderDetails()
    }
    getOrderDetails() {

        let user = this.helperService.getItems('user');
        console.log('user===', user);
        let user_id = user?._id;
        console.log('id=',user_id);

        this.orderSevice.getAll({user_id}).subscribe((res:any)=>{
            this.rooms = res?.data?.bookings;
            console.log('resssssssssss:',res);

        })
    }
}

