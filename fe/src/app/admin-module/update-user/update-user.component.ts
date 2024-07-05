import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AuthencationService } from '../../service/authencation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {

    id : any;
    user: any;
    userForm: FormGroup;
    constructor(
        private authencationService: AuthencationService,
        private formBuilder:FormBuilder,
        private activeRoute: ActivatedRoute,
        private toastr :ToastrService,
        private router: Router
    ){
        this.userForm = this.formBuilder.group({
            name : this.formBuilder.control(null),
            email : this.formBuilder.control(null),
            birthday : this.formBuilder.control(null),
            sex : this.formBuilder.control(null),
            type : this.formBuilder.control(null),
            phone : this.formBuilder.control(null),
        })
    }

    ngOnInit():void{
        this.getUserById();
    }
    getUserById(){
        this.activeRoute.params.subscribe((params:any)=>{
            if(params?.id){
                this.id = params?.id;

                console.log("id = ", this.id);
                // this.authencationService.getUserById(this.id).subscribe((res:any)=>{
                //     this.user = res?.data;
                //     console.log("User", this.user);
                //     this.userForm.patchValue(this.user);
                //     console.log("userForm", this.userForm.value);
                // })
            }
        })
    }

    onClick(){}
}
