import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { ProductRoomService } from '../../service/product-room.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss'
})
export class CreateRoomComponent {

    createform:  FormGroup;

    constructor(private productService:ProductRoomService,
        private router: Router,
        private toast: ToastrService,
        private formbuilder: FormBuilder
    ){
        this.createform = this.formbuilder.group({
            name: this.formbuilder.control(null),
            avatar: this.formbuilder.control(null),
            room_code: this.formbuilder.control(null),
            status: this.formbuilder.control(null),
            price: this.formbuilder.control(null),
            size: this.formbuilder.control(null),
            bed: this.formbuilder.control(null),
            description: this.formbuilder.control(null) ,
            room_content: this.formbuilder.control(null),
            albums: this.formbuilder.control(null),
            category: this.formbuilder.control(null),
        })
    }


    ngOnInit():void{}

    onSubmit(){
        if(this.createform.valid){
            this.productService.createProduct(this.createform.value).subscribe((res:any)=>{
                  console.log('ressss',res);
                  if(res?.status == 200){
                    this.toast.success('Create Success','Create Successfully');
                    this.router.navigate(['/managerproducts/admin']);
                  }else{
                    this.toast.error("Create error!!! Please Create again!!!");
                  }

            })
        }
    }
}
