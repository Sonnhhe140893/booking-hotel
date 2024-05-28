import { Component } from '@angular/core';
import { HelperSeriveService } from '../../service/common/helper-serive.service';
import { ProductRoomService } from '../../service/product-room.service';
import { ActivatedRoute } from '@angular/router';
import { IRoom } from '../../interface/iroom';



@Component({
    selector: 'app-categories-by-id',
    templateUrl: './categories-by-id.component.html',
    styleUrl: './categories-by-id.component.scss',
})
export class CategoriesByIdComponent {
    listProduct: IRoom[] = [];
    category_id: string = '';
    pageNum: number =0 ;
    paging: any = {
        total: 0,
        page: 1,
        page_size: 8,
    };
    constructor(
        public helperService: HelperSeriveService,
        private productService: ProductRoomService,
        private activeRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activeRoute.params.subscribe((res: any) => {
            console.log('res_categories_id=======', res);
            this.category_id = res.id;
            let filters = {
                //'...'tạo 1 obj mới chứa các giá trị của 1  obj khác mà không thay đổi giá trị obj cũ
                ...this.paging,

                category_id: this.category_id
                // category_id: this.category_id : đây là custom lại obj paging , thêm 1 trường dữ liệu
            }
            this.productById(filters);
        });
    }

    productById(filters: any) {
        console.log("filter------------> ", filters);
        this.productService.getAll(filters).subscribe((res: any) => {
            console.log('ressss=======>', res);
            this.listProduct = res?.data?.rooms;
            console.log('listProduct=>>>>>>>>>>>> ', this.listProduct);
        });
    }

    // nextPage(p = 1){
    //     this.pageNum = p;
    //     let filters = {
    //         ...this.paging,
    //         category_id : this.category_id,
    //     };
    //     this.productById(filters);
    // }

}
