import { Component } from '@angular/core';
import { HelperSeriveService } from '../../service/common/helper-serive.service';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-manager-booking',
  templateUrl: './manager-booking.component.html',
  styleUrl: './manager-booking.component.scss'
})
export class ManagerBookingComponent {
    constructor(
        private helperService: HelperSeriveService,
        private orderSevice: OrderService
    ) {}

    paging: any = {
        total: 0,
        page: 1,
        page_size: 8,
    };
    rooms: any;

    ngOnInit() {

         this.getOrderDetails({...this.paging});
    }

    getOrderDetails(filters:any) {

        this.orderSevice.getBookings({}).subscribe((res:any)=>{
            console.log("bookings ==========>",res);
            this.rooms = res?.data.bookings;
            console.log("rooms =========> ", this.rooms);

        })
    }


}
