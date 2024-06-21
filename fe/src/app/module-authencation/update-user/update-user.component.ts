import { ActivatedRoute,  } from '@angular/router';
import { Component } from '@angular/core';
import { HelperSeriveService } from '../../service/common/helper-serive.service';
import { AuthencationService } from '../../service/authencation.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
    name: string ='';
    phone: string='';
    birthday: string='';
    user:any;
    user_id: any;

    constructor(
        private helperService : HelperSeriveService,
        private AuthenticationService: AuthencationService ,
        private activatedRoute :ActivatedRoute
){

}
    ngOnInit():void{
        this.user_id = this.activatedRoute.snapshot.paramMap.get('_id');
        this.getUser();
    }

    getUser(){
        this.AuthenticationService.getUser().subscribe((res:any)=>{
            this.user = res?.data.user;
            console.log("userrrrrrrrrrrr: ",this.user);

        })
    }

    updateUser(){

     }



}

