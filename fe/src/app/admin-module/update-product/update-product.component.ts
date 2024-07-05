import { Component } from '@angular/core';
import { ProductRoomService } from '../../service/product-room.service';
import { HelperSeriveService } from '../../service/common/helper-serive.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
    productForm : FormGroup;
    product: any;
    id : any;
    constructor(private productService: ProductRoomService
        ,private helperService: HelperSeriveService,
        private formBuilder: FormBuilder,
        private activeRoute: ActivatedRoute,
        private toastr :ToastrService,
        private router: Router
    ){
        this.productForm = this.formBuilder.group({
            name : this.formBuilder.control(null),
             avatar : this.formBuilder.control(null),
            bed : this.formBuilder.control(null),
            room_content : this.formBuilder.control(null),
            description : this.formBuilder.control(null),
            price : this.formBuilder.control(null),
            size : this.formBuilder.control(null),


        })
    }

    ngOnInit():void{
        this.getProductById();
    }

    getProductById(){
       this.activeRoute.params.subscribe((params:any)=>{
        if(params?.id){
             this.id = params.id;

            this.productService.getProductDetail(this.id).subscribe((res:any)=>{
                this.product =res?.data;
                console.log("product=====", this.product);
                this.productForm.patchValue(this.product)
                console.log("formmmproduct", this.productForm.value);
            })
        }
       })
    }

    onClick(){
        if(this.productForm.valid){
            this.productService.updateProduct(this.id,this.productForm.value).subscribe((res:any)=>{
                if(res?.status == 200){
                    this.toastr.success("Update Success")
                    this.router.navigate(['/managerproducts/admin'])
                }else{
                    this.toastr.error("Update Error", "Please Check Valid!!!")
                }
            })
        }
    }

}
