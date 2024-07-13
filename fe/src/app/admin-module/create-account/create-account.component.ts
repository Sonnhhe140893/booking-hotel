import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthencationService } from '../../service/authencation.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
     constructor(
        private authenticationService: AuthencationService,
        private builder : FormBuilder,
        private Router :Router,
        private toast :ToastrService
     ){}
     createForm =  this.builder.group({
        name: this.builder.control(null),
        email:this.builder.control(null),
        password: this.builder.control(null),
        sex:  this.builder.control('male',),
        birthday: this.builder.control(null),
        type:this.builder.control('ADMIN',),
        status:this.builder.control(null),
        phone: this.builder.control(null),
        avatar: this.builder.control(null),
     })

     onclick(){
        if(this.createForm.valid){
            this.authenticationService.createAdmin(this.createForm.value).subscribe((res:any)=>{
                console.log("ressssssssss", res);
                if(res?.status == 200){

                    this.toast.success("Create Account success");
                    this.Router.navigate(['/managerusers/admin']);
                }else{
                    this.toast.error("Create Account False!!!");
                }
            })
        }
     }
}
