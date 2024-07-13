import { Component } from '@angular/core';
import { ProductRoomService } from '../../service/product-room.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent {
    category :any;
    id : any;
    constructor(private productService: ProductRoomService,
                private toast :ToastrService,
                private builder :FormBuilder,
                private activeRoute : ActivatedRoute,

    ){}
    categoryForm = this.builder.group({
        name : this.builder.control('null'),
    })
    ngOnInit():void{
        this.getCategoryById();
    }

    getCategoryById(){
        this.activeRoute.params.subscribe((params:any)=>{
            console.log("parmas", params);
            if(params?.id){
                this.id = params?.id;
                console.log("id", this.id);
                this.productService.getCategoryDetailAdmin(this.id).subscribe((res:any)=>{

                    this.category = res?.data;
                    console.log("categoryDetail==========>", this.category);
                    this.categoryForm.patchValue(this.category);
                })
            }
        })
    }
    onClick(){
      if(this.categoryForm.valid){
        this.productService.UpdateCategory(this.id,this.categoryForm.value).subscribe((res:any)=>{
            if(res?.status == 200){
                this.toast.success("Update Successfully")
                this.getCategoryById();
            }else{
                this.toast.error("Update False!!!")
            }
        })
      }
    }
}
