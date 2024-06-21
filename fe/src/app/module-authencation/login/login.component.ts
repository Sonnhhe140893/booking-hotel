import { Router } from '@angular/router';
import { HelperSeriveService } from './../../service/common/helper-serive.service';
import { AuthencationService } from './../../service/authencation.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    userdata: any;
    constructor(
        private Authentication: AuthencationService,
        private HelperSeriveService: HelperSeriveService,
        private Router: Router,
        private builder: FormBuilder,
        private ToastrService: ToastrService
    ) {}

    loginForm = this.builder.group({
        email: this.builder.control(''),
        password: this.builder.control(''),
    });

    proceedlogin() {
        console.log('logiloginForm :===', this.loginForm);
        console.log('logiloginForm.valuefrom :===', this.loginForm.value);
        if (this.loginForm.valid) {
            this.Authentication.login(this.loginForm.value).subscribe(
                (res: any) => {
                    console.log('ressssssss', res);
                    this.userdata = res?.data;
                    console.log('data userrrrrr', this.userdata);
                    if (this.userdata) {
                        this.HelperSeriveService.setItem(
                            'accessToken',
                            this.userdata.accessToken
                        );

                        this.HelperSeriveService.setItem(
                            'user',
                            this.userdata.user
                        );
                        window.location.href = '/';
                    } else {
                        this.ToastrService.error(
                            'Please contract admin',
                            'In active user'
                        );
                    }
                }
            );
        }
    }
}
