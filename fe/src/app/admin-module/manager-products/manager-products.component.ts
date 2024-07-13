import { Component } from '@angular/core';
import { ProductRoomService } from '../../service/product-room.service';
import { HelperSeriveService } from '../../service/common/helper-serive.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-products',
  templateUrl: './manager-products.component.html',
  styleUrl: './manager-products.component.scss'
})
export class ManagerProductsComponent {
    id :any;
    search :string='';
    listRooms: any;
    paging: any = {
        total: 0,
        page: 1,
        page_size: 8,
    };
    constructor(
        private productService: ProductRoomService,
        public helperService: HelperSeriveService,
        private activeRoute: ActivatedRoute,
        private toastr :ToastrService,
        private router : Router

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
        console.log("filtersType", filters, typeof filters);
    }


    handleSearch(event:any){
        console.log("resssssss", event, typeof event);
        this.search= event;
        this.getListData({name: event});


    }

    clickDelete(id:any):void{
        this.productService.deleteProduct(id).subscribe(()=>{
            this.getListData({...this.paging});
        })
    }
}
