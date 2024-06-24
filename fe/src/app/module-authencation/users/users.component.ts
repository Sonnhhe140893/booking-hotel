import { Component, OnInit } from '@angular/core';
import { AuthencationService } from '../../service/authencation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
    user: any = {};

    userForm : FormGroup;

    constructor(
        private authentication: AuthencationService,
        private formbuilder: FormBuilder,
        private router: Router,
        private toastr :ToastrService
    ){
        this.userForm = this.formbuilder.group({
            name: this.formbuilder.control(null),
            phone: this.formbuilder.control(null),
            birthday : this.formbuilder.control(null)

        })
    }


    ngOnInit():void {
        this.getUser();
    }


    getUser(){
        this.authentication.getUser().subscribe((res:any)=>{
            this.user = res?.data.user;
            console.log("userrrrrrrrrrrr: ",this.user);
            this.userForm.patchValue(this.user);
            console.log("UserFormmmmmmmm" , this.userForm.value);
        })
    }
    onSubmit(){
        if(this.userForm.valid){
            this.authentication.updateProfile(this.userForm.value).subscribe((res:any)=>{
                console.log('User updated successfully!', res);
                if(res?.status==200){
                    this.toastr.success("Update Success")
                }else{
                    this.toastr.error("Update False!!!!!!!!")
                }


            }
        )
        }
    }
}
