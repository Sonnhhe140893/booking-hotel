import { Route, Router } from '@angular/router';
import { AuthencationService } from './../../service/authencation.service';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {

    constructor(private builder : FormBuilder,
                private AuthencationService:AuthencationService,
                private Router : Router,
                private toastrService: ToastrService
    ) {}
    registerForm = this.builder.group({
        name: this.builder.control(null),
        email:this.builder.control(null),
        password: this.builder.control(null),
        sex:  this.builder.control('male',),
        birthday: this.builder.control(null),
        type:this.builder.control('USER',),
        status:this.builder.control(null),
        phone: this.builder.control(null),
        avatar: this.builder.control(null),
    })

    proceedRegisteration() {
        console.log("register:" , this.registerForm.value);
        console.log("register:" , this.registerForm);
        if(this.registerForm.valid){
            this.AuthencationService.RegisterUser(this.registerForm.value).subscribe((res)=>{
                console.log('resssssssssssssss',res);
                this.toastrService.success('please wait admin accept','Register Successfully')
                this.Router.navigate(['login']);
            })
        }else{
            this.toastrService.warning('please enter valid data.');
        }
    }
}
