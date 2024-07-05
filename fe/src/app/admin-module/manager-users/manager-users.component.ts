import { Component } from '@angular/core';
import { AuthencationService } from '../../service/authencation.service';
import { HelperSeriveService } from '../../service/common/helper-serive.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrl: './manager-users.component.scss'
})
export class ManagerUsersComponent {

    userlisting:any ;

    paging: any = {
        total: 0,
        page: 1,
        page_size: 8,
    };

    constructor(private authencationService: AuthencationService,
                public helperService: HelperSeriveService,
                private toastr :ToastrService
    ) {}


    ngOnInit():void{
        this.getUsers({ ...this.paging });
    }


    getUsers(filters:any){
         this.authencationService.getAll(filters).subscribe((res:any)=>{
            console.log("ressssssss" , res);
            if(res?.status == 200){
                this.userlisting =res?.data.users;
                this.paging.page = res.meta?.current_page;
                this.paging.total = res.meta?.total;
            }else{
                this.toastr.error('Manager Error!!!!!!')
            }

         })
    }
}
