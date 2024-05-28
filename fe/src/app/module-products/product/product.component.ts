import { Component } from '@angular/core';
import { ProductRoomService } from '../../service/product-room.service';
import { HelperSeriveService } from '../../service/common/helper-serive.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
})
export class ProductComponent {
    listRooms: any;
    paging: any = {
        total: 0,
        page: 1,
        page_size: 8,
    };
    constructor(
        private productService: ProductRoomService,
        public helperService: HelperSeriveService
    ) {}

    ngOnInit(): void {
        this.getListData({ ...this.paging });
    }

    getListData(filters: any) {
        this.productService.getAll(filters).subscribe((res: any) => {
            console.log('res===========>', res);
            if (res?.status == 200) {
                this.listRooms = res?.data?.rooms || [];
                this.paging.page = res.meta?.current_page;
                this.paging.total = res.meta?.total;
                console.log("paging---------> ", this.paging);
            }
        });
    }
}
