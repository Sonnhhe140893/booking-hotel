import { ToastrService } from 'ngx-toastr';
import { ProductRoomService } from './../../service/product-room.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-category',
  templateUrl: './manager-category.component.html',
  styleUrl: './manager-category.component.scss'
})
export class ManagerCategoryComponent {
    categories:any;
    paging: any = {
        total: 0,
        page: 1,
        page_size: 8,
    };
    constructor(
        private productService:ProductRoomService,
        private toast :ToastrService

    ){}
    ngOnInit():void{
        this.getCategories({...this.paging});
    }
    getCategories(filters:any){
        this.productService.getCategoriesAdmin({}).subscribe((res:any)=>{
            console.log("res=============>", res);
            this.categories = res?.data.categories;

        })
    }

    clickDelete(id:any){
        this.productService.deleteCategory(id).subscribe((res:any)=>{
            this.toast.success("Delete Success!!")
            this.getCategories({...this.paging});

        })
    }
}
