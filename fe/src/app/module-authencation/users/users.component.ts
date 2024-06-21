import { Component, OnInit } from '@angular/core';
import { AuthencationService } from '../../service/authencation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
    user: any = {};


    constructor(
        private authentication: AuthencationService,
        private formbuilder: FormBuilder,
        private router: Router
    ){

    }


    ngOnInit():void {
        this.getUser();
    }


    getUser(){
        this.authentication.getUser().subscribe((res:any)=>{
            this.user = res?.data.user;
            console.log("userrrrrrrrrrrr: ",this.user);

        })
    }

    navigate() {
        this.router.navigate(['/update-user/' + this.user?._id + '/edit'])
    }
}
